// Database type definitions for Supabase tables
// These match the schema we'll create in the Supabase dashboard

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name?: string;
          preferred_language?: string;
          learning_goals?: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string;
          preferred_language?: string;
          learning_goals?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          preferred_language?: string;
          learning_goals?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          scenario_type: string;
          difficulty_level: 'beginner' | 'intermediate' | 'advanced';
          audio_url?: string;
          transcript?: string;
          status: 'active' | 'completed' | 'paused';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          scenario_type: string;
          difficulty_level: 'beginner' | 'intermediate' | 'advanced';
          audio_url?: string;
          transcript?: string;
          status?: 'active' | 'completed' | 'paused';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          scenario_type?: string;
          difficulty_level?: 'beginner' | 'intermediate' | 'advanced';
          audio_url?: string;
          transcript?: string;
          status?: 'active' | 'completed' | 'paused';
          created_at?: string;
          updated_at?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          conversation_id: string;
          completion_percentage: number;
          achievements_unlocked: string[];
          streak_count: number;
          last_activity: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          conversation_id: string;
          completion_percentage?: number;
          achievements_unlocked?: string[];
          streak_count?: number;
          last_activity?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          conversation_id?: string;
          completion_percentage?: number;
          achievements_unlocked?: string[];
          streak_count?: number;
          last_activity?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      prompts: {
        Row: {
          id: string;
          title: string;
          content: string;
          category: string;
          difficulty_level: 'beginner' | 'intermediate' | 'advanced';
          language_pair: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          category: string;
          difficulty_level: 'beginner' | 'intermediate' | 'advanced';
          language_pair?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          category?: string;
          difficulty_level?: 'beginner' | 'intermediate' | 'advanced';
          language_pair?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Helper types for easier use
export type User = Database['public']['Tables']['users']['Row'];
export type Conversation = Database['public']['Tables']['conversations']['Row'];
export type UserProgress = Database['public']['Tables']['user_progress']['Row'];
export type Prompt = Database['public']['Tables']['prompts']['Row'];

export type InsertUser = Database['public']['Tables']['users']['Insert'];
export type InsertConversation = Database['public']['Tables']['conversations']['Insert'];
export type InsertUserProgress = Database['public']['Tables']['user_progress']['Insert'];
export type InsertPrompt = Database['public']['Tables']['prompts']['Insert'];

export type UpdateUser = Database['public']['Tables']['users']['Update'];
export type UpdateConversation = Database['public']['Tables']['conversations']['Update'];
export type UpdateUserProgress = Database['public']['Tables']['user_progress']['Update'];
export type UpdatePrompt = Database['public']['Tables']['prompts']['Update']; 