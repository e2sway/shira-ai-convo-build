import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabaseClient } from "../_shared/supabaseClient.ts";

interface LiveSessionRequest {
  userId?: string;
  sessionType?: 'practice' | 'assessment' | 'conversation';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
}

interface LiveSessionResponse {
  conversationId: string;
  prompt: {
    id: string;
    title: string;
    content: string;
    category: string;
    difficulty: string;
  };
  message: string;
}

serve(async (req) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Parse request body
    const requestBody: LiveSessionRequest = await req.json();
    
    // Get user from Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid authorization header' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Extract JWT token and verify user
    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const userId = userData.user.id;

    // Set default values for session parameters
    const sessionType = requestBody.sessionType || 'conversation';
    const difficulty = requestBody.difficulty || 'beginner';
    const category = requestBody.category || 'general';

    // Step 1: Select an appropriate prompt from the database
    const { data: prompts, error: promptError } = await supabaseClient
      .from('prompts')
      .select('id, title, content, category, difficulty')
      .eq('category', category)
      .eq('difficulty', difficulty)
      .limit(10);

    if (promptError) {
      console.error('Error fetching prompts:', promptError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch conversation prompts' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!prompts || prompts.length === 0) {
      // Fallback: get any prompt if no specific match found
      const { data: fallbackPrompts, error: fallbackError } = await supabaseClient
        .from('prompts')
        .select('id, title, content, category, difficulty')
        .limit(5);

      if (fallbackError || !fallbackPrompts || fallbackPrompts.length === 0) {
        return new Response(
          JSON.stringify({ error: 'No conversation prompts available' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      prompts.push(...fallbackPrompts);
    }

    // Randomly select a prompt from available options
    const selectedPrompt = prompts[Math.floor(Math.random() * prompts.length)];

    // Step 2: Create a new conversation record
    const { data: conversation, error: conversationError } = await supabaseClient
      .from('conversations')
      .insert({
        user_id: userId,
        prompt_id: selectedPrompt.id,
        session_type: sessionType,
        status: 'active',
        metadata: {
          difficulty,
          category,
          startedAt: new Date().toISOString()
        }
      })
      .select('id')
      .single();

    if (conversationError || !conversation) {
      console.error('Error creating conversation:', conversationError);
      return new Response(
        JSON.stringify({ error: 'Failed to create conversation session' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Step 3: Return the session details
    const response: LiveSessionResponse = {
      conversationId: conversation.id,
      prompt: {
        id: selectedPrompt.id,
        title: selectedPrompt.title,
        content: selectedPrompt.content,
        category: selectedPrompt.category,
        difficulty: selectedPrompt.difficulty
      },
      message: 'Live session initiated successfully'
    };

    return new Response(
      JSON.stringify(response),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
        } 
      }
    );

  } catch (error) {
    console.error('Unexpected error in initiateLiveSession:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}); 