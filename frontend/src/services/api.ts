import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import type { TimelinePhase, VotingStep, ChatApiResponse, ApiResponse, VotingInfo } from '../types';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchTimeline(country = 'india'): Promise<TimelinePhase[]> {
  const { data } = await client.get<ApiResponse<TimelinePhase[]>>('/api/timeline', {
    params: { country },
  });
  return data.data ?? [];
}

export async function fetchVotingSteps(): Promise<VotingStep[]> {
  const { data } = await client.get<ApiResponse<VotingStep[]>>('/api/voting-steps');
  return data.data ?? [];
}

export async function sendChatMessage(message: string): Promise<string> {
  const { data } = await client.post<ChatApiResponse>('/api/ai/chat', { message });
  return data.reply;
}

export async function fetchVotingInfo(query: string): Promise<VotingInfo> {
  const { data } = await client.get<ApiResponse<VotingInfo>>('/api/voting-info', {
    params: { query },
  });
  if (!data.data) throw new Error('No data returned');
  return data.data;
}
