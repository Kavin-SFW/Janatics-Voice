const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1';

export interface GroqError {
  message: string;
  type?: string;
}

class GroqClient {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = GROQ_API_KEY;
    this.baseUrl = GROQ_API_URL;

    if (!this.apiKey) {
      console.warn(
        "[GroqClient] VITE_GROQ_API_KEY is not set. Transcription and summarization will fail until it is configured."
      );
    } else {
      // Debug: Show first 10 chars and length (don't log full key for security)
      console.log(
        `[GroqClient] API key loaded: ${this.apiKey.substring(0, 10)}... (length: ${this.apiKey.length})`
      );
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    if (!this.apiKey) {
      throw new Error('Groq API key not configured. Set VITE_GROQ_API_KEY in .env.local');
    }

    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Authorization': `Bearer ${this.apiKey}`,
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: response.statusText,
      }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Transcribe audio using Whisper Large V3 Turbo
  async transcribeAudio(audioBlob: Blob, language?: string): Promise<string> {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.webm');
    formData.append('model', 'whisper-large-v3-turbo');
    formData.append('response_format', 'text');
    
    if (language) {
      formData.append('language', language);
    }

    const response = await fetch(`${this.baseUrl}/audio/transcriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: response.statusText,
      }));
      throw new Error(error.message || 'Failed to transcribe audio');
    }

    return response.text();
  }

  // Summarize text using llama-3.3-70b-versatile
  async summarizeText(text: string): Promise<string> {
    const response = await this.request<any>('/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that provides concise, well-structured summaries of meeting transcripts. Focus on key points, decisions, and action items.',
          },
          {
            role: 'user',
            content: `Please provide a comprehensive summary of the following meeting transcript:\n\n${text}`,
          },
        ],
        temperature: 1,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false,
      }),
    });

    return response.choices[0]?.message?.content || 'No summary generated';
  }

  // Stream summarization
  async *summarizeTextStream(text: string): AsyncGenerator<string, void, unknown> {
    if (!this.apiKey) {
      throw new Error(
        "Groq API key not configured. Set VITE_GROQ_API_KEY in your .env (e.g. .env.local) and restart the dev server."
      );
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that provides concise, well-structured summaries of meeting transcripts. Focus on key points, decisions, and action items.',
          },
          {
            role: 'user',
            content: `Please provide a comprehensive summary of the following meeting transcript:\n\n${text}`,
          },
        ],
        temperature: 1,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: true,
      }),
    });

    if (!response.ok) {
      let message = 'Failed to generate summary';
      let errorDetails: any = null;

      try {
        const errorBody = await response.json();
        errorDetails = errorBody;
        console.error('[GroqClient] API Error Response:', errorBody);
        
        if (errorBody?.error?.message) {
          message = errorBody.error.message;
        } else if (errorBody?.message) {
          message = errorBody.message;
        }
      } catch {
        // ignore JSON parse errors and fall back to status text
        console.error(`[GroqClient] HTTP ${response.status}: ${response.statusText}`);
        if (response.status === 401 || response.status === 403) {
          message =
            'Unauthorized request to Groq. Please verify that VITE_GROQ_API_KEY is set correctly and that the key is valid.';
        } else if (response.statusText) {
          message = response.statusText;
        }
      }

      // Log helpful debugging info
      if (response.status === 401 || response.status === 403) {
        console.error(
          '[GroqClient] Authentication failed. Check:',
          '\n1. Is VITE_GROQ_API_KEY set in .env file?',
          '\n2. Did you restart the dev server after adding the key?',
          '\n3. Is the key from Groq (not OpenAI/Anthropic)?',
          '\n4. Is the key valid and not expired?',
          '\n5. Key prefix (first 4 chars):',
          this.apiKey ? this.apiKey.substring(0, 4) : 'NOT SET'
        );
      }

      throw new Error(message);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('No response body');
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() && line.startsWith('data: '));

      for (const line of lines) {
        try {
          const data = JSON.parse(line.slice(6));
          const content = data.choices[0]?.delta?.content || '';
          if (content) {
            yield content;
          }
        } catch (e) {
          // Skip invalid JSON
        }
      }
    }
  }
}

export const groq = new GroqClient();
