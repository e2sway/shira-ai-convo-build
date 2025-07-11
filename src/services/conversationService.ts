import { supabase } from './supabaseClient';
import { logger } from '../utils';

export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  difficulty: string;
}

export interface LiveSessionResponse {
  conversationId: string;
  prompt: Prompt;
  message: string;
}

export const conversationService = {
  async initiateLiveSession(options: {
    userId:string;
    sessionType?: 'practice' | 'assessment' | 'conversation';
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    category?: string;
  }): Promise<LiveSessionResponse> {
    
    logger.info(`Starting session initiation for user ${options.userId}`);

    const { 
      userId,
      sessionType = 'conversation', 
      difficulty = 'beginner', 
      category = 'general' 
    } = options;

    try {
      // 1. Fetch a suitable prompt
      const { data: prompts, error: promptError } = await supabase
        .from('prompts')
        .select('id, title, content, category, difficulty')
        .eq('category', category)
        .eq('difficulty', difficulty)
        .limit(10);

      if (promptError) {
        logger.error('Failed to fetch prompts', promptError);
        throw new Error(`Failed to fetch prompts: ${promptError.message}`);
      }

      let selectedPrompt: Prompt | undefined;
      if (!prompts || prompts.length === 0) {
        const { data: fallbackPrompts, error: fallbackError } = await supabase
          .from('prompts')
          .select('id, title, content, category, difficulty')
          .limit(1);
          
        if (fallbackError) {
          logger.error('No prompts available in database', fallbackError);
          throw new Error("No conversation prompts available in the database.");
        }
        if (!fallbackPrompts || fallbackPrompts.length === 0) {
          throw new Error("No conversation prompts available in the database (no fallback).");
        }
        selectedPrompt = fallbackPrompts[0];
      } else {
        selectedPrompt = prompts[Math.floor(Math.random() * prompts.length)];
      }

      if (!selectedPrompt) {
        // This should be unreachable, but as a safeguard:
        throw new Error("Could not select a prompt.");
      }

      logger.info(`Prompt selected: ${selectedPrompt.id}`);

      // 2. Create a new conversation record
      const { data: conversation, error: conversationError } = await supabase
        .from('conversations')
        .insert({
          user_id: userId,
          prompt_id: selectedPrompt.id,
          session_type: sessionType,
          status: 'active',
          metadata: { difficulty, category, startedAt: new Date().toISOString() }
        })
        .select('id')
        .single();

      if (conversationError || !conversation) {
        logger.error('Failed to create conversation', conversationError);
        throw new Error(`Failed to create conversation session: ${conversationError?.message}`);
      }
      
      logger.info(`Conversation created: ${conversation.id}`);

      return {
        conversationId: conversation.id,
        prompt: selectedPrompt,
        message: 'Live session initiated successfully',
      };

    } catch (error) {
      logger.error('Error in initiateLiveSession', error as Error);
      throw error;
    }
  }
}; 