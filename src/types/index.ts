// Common Types for Shira AI Conversation Builder

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

export interface IMessage {
  id: string;
  content: string;
  userId: string;
  timestamp: Date;
  type: 'user' | 'ai';
  isRead: boolean;
}

export interface IConversation {
  id: string;
  title: string;
  messages: IMessage[];
  participants: IUser[];
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'archived' | 'deleted';
}

export interface IAIResponse {
  message: string;
  confidence: number;
  suggestions?: string[];
  metadata?: Record<string, unknown>;
}

export type TApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type TNavigationParams = {
  Home: undefined;
  Chat: { conversationId?: string };
  Profile: { userId: string };
  Settings: undefined;
};

export interface IApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Task Master AI Integration Types
export interface ITaskMasterTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: string;
  dueDate?: Date;
  tags: string[];
}

export interface IPRDContext {
  version: string;
  features: string[];
  requirements: string[];
  constraints: string[];
}

// Audio Processing Types
export interface IAudioChunk {
  id: string;
  path: string;
  duration: number;
  size: number;
  timestamp: number;
  conversationId: string;
  sequenceNumber: number;
}

export interface IRecordingOptions {
  conversationId: string;
  chunkDuration?: number; // in milliseconds, default 2000 (2 seconds)
  quality?: 'low' | 'medium' | 'high';
  enableNoiseSuppression?: boolean;
}

export interface IRecordingSession {
  id: string;
  conversationId: string;
  startTime: number;
  chunks: IAudioChunk[];
  status: 'recording' | 'paused' | 'stopped';
  totalDuration: number;
}

export interface IAudioChunkMetadata {
  id: number;
  chunk_id: string;
  conversation_id: number;
  storage_path: string;
  sequence_number: number;
  duration_ms: number;
  file_size: number;
  timestamp: string;
  created_at: string;
}

export type TAudioQuality = 'low' | 'medium' | 'high';
export type TRecordingStatus = 'recording' | 'paused' | 'stopped' | 'idle';

// Live Session Types
export interface ILiveSessionInitRequest {
  sessionType: 'practice' | 'assessment' | 'free_talk';
  languagePair: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  duration?: number;
}

export interface ILiveSessionResponse {
  conversationId: number;
  sessionType: string;
  languagePair: string;
  difficultyLevel: string;
  systemPrompt: string;
  metadata: Record<string, unknown>;
}

// Database Types (Supabase)
export * from './database';
