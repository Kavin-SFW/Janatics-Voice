# Speech-to-Text & Summarization Setup

## Overview

The application now uses:
- **Browser's Web Speech API** for real-time speech recognition
- **Groq API** for AI-powered summarization using `llama-3.3-70b-versatile`

## Environment Variables

Add your Groq API key to `.env.local`:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### Getting a Groq API Key

1. Sign up at [console.groq.com](https://console.groq.com)
2. Navigate to API Keys section
3. Create a new API key
4. Copy it to your `.env.local` file

## Features

### Real-Time Speech Recognition
- Uses browser's built-in Web Speech API
- Works in Chrome, Edge, and Safari
- Real-time transcription as you speak
- No external services needed for transcription

### AI Summarization
- Uses Groq's `llama-3.3-70b-versatile` model
- Generates comprehensive summaries after speech ends
- Streaming response for real-time summary generation
- Focuses on key points, decisions, and action items

## How It Works

1. **Start Recording**: Click the microphone button
2. **Speak**: Your speech is transcribed in real-time using the browser's Web Speech API
3. **Stop Recording**: Click the stop button
4. **Summary Generation**: The full transcript is sent to Groq API for summarization
5. **View Summary**: The summary appears in the right sidebar

## Browser Compatibility

The Web Speech API is supported in:
- ✅ Chrome/Edge (Chromium-based)
- ✅ Safari (macOS/iOS)
- ❌ Firefox (not supported)

## Troubleshooting

### "Speech recognition is not supported"
- Use Chrome, Edge, or Safari
- Ensure microphone permissions are granted

### "Failed to generate summary"
- Check that `VITE_GROQ_API_KEY` is set in `.env.local`
- Verify your Groq API key is valid
- Check browser console for detailed error messages

### No transcription appearing
- Grant microphone permissions when prompted
- Check that your microphone is working
- Ensure you're speaking clearly

## API Usage

### Groq Models Used
- **Transcription**: `whisper-large-v3-turbo` (for future audio file support)
- **Summarization**: `llama-3.3-70b-versatile`

### Rate Limits
- Groq API has rate limits based on your plan
- Free tier: Check Groq console for current limits
- Paid tiers: Higher rate limits available
