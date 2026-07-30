import { VideoStudyPackage, VideoMetadata } from '../types';

export async function fetchVideoMetadata(url: string): Promise<VideoMetadata> {
  const response = await fetch('/api/video/metadata', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to fetch video details.');
  }
  return response.json();
}

export async function analyzeYouTubeVideo(url: string, collectionId?: string): Promise<VideoStudyPackage> {
  const response = await fetch('/api/video/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, collectionId }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to analyze YouTube video.');
  }
  return response.json();
}

export async function sendTutorChatMessage(params: {
  videoTitle: string;
  videoContext: string;
  message: string;
  chatHistory: { sender: string; text: string }[];
}): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!response.ok) {
    throw new Error('Failed to send tutor message.');
  }
  const data = await response.json();
  return data.text;
}
