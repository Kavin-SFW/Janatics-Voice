const DATA_API_URL = import.meta.env.VITE_NEON_DATA_API_URL || '';

export interface ApiError {
  message: string;
  code?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = DATA_API_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const apiKey = import.meta.env.VITE_NEON_API_KEY || '';
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'apikey': apiKey,
      ...options.headers,
    };

    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

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

  // Meeting methods
  async getMeetings() {
    return this.request<any[]>(
      '/meetings?select=*&order=created_at.desc'
    );
  }

  async getMeeting(id: string) {
    return this.request<any>(
      `/meetings?id=eq.${id}&select=*`
    ).then((data) => data[0] || null);
  }

  async createMeeting(data: {
    title: string;
    scheduled_at?: string;
    status?: string;
  }) {
    return this.request<any>('/meetings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateMeeting(id: string, data: Partial<any>) {
    return this.request<any>(`/meetings?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteMeeting(id: string) {
    return this.request(`/meetings?id=eq.${id}`, {
      method: 'DELETE',
    });
  }

  // Participants
  async getMeetingParticipants(meetingId: string) {
    return this.request<any[]>(
      `/meeting_participants?meeting_id=eq.${meetingId}&select=*`
    );
  }

  async addParticipant(meetingId: string, name: string, email?: string) {
    return this.request<any>('/meeting_participants', {
      method: 'POST',
      body: JSON.stringify({ meeting_id: meetingId, name, email }),
    });
  }

  // Transcripts
  async getTranscripts(meetingId: string) {
    return this.request<any[]>(
      `/transcripts?meeting_id=eq.${meetingId}&select=*&order=timestamp_seconds.asc`
    );
  }

  async addTranscript(meetingId: string, speaker: string, text: string, timestampSeconds: number) {
    return this.request<any>('/transcripts', {
      method: 'POST',
      body: JSON.stringify({
        meeting_id: meetingId,
        speaker,
        text,
        timestamp_seconds: timestampSeconds,
      }),
    });
  }

  // Action Items
  async getActionItems(meetingId: string) {
    return this.request<any[]>(
      `/action_items?meeting_id=eq.${meetingId}&select=*&order=created_at.asc`
    );
  }

  async createActionItem(meetingId: string, task: string, owner: string, deadline?: string) {
    return this.request<any>('/action_items', {
      method: 'POST',
      body: JSON.stringify({
        meeting_id: meetingId,
        task,
        owner,
        deadline,
      }),
    });
  }

  async updateActionItem(id: string, updates: Partial<any>) {
    return this.request<any>(`/action_items?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  // Decisions
  async getDecisions(meetingId: string) {
    return this.request<any[]>(
      `/decisions?meeting_id=eq.${meetingId}&select=*&order=created_at.asc`
    );
  }

  async createDecision(meetingId: string, decision: string) {
    return this.request<any>('/decisions', {
      method: 'POST',
      body: JSON.stringify({
        meeting_id: meetingId,
        decision,
      }),
    });
  }
}

export const api = new ApiClient();
