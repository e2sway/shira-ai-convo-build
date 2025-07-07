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
  metadata?: Record<string, any>;
}

export type TApiResponse<T = any> = {
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
  details?: Record<string, any>;
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
