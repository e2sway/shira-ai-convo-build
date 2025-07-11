// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { corsHeaders } from "../_shared/cors";
import { supabaseClient } from "../_shared/supabaseClient";
import { Database } from "../_shared/database";

type Prompt = Database['public']['Tables']['prompts']['Row'];

interface SessionRequest {
  userId: string;
  sessionType: "LEARNING_TRACK" | "EXPLORE" | "GRAZE_MODE";
  // conversationContext could be used to resume a session or provide initial state
  conversationContext?: Record<string, unknown>;
}

console.log("🚀 initiate-live-session function initialized");

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { userId, sessionType, conversationContext }: SessionRequest = await req.json();
    console.log(`Received request for sessionType: ${sessionType} from userId: ${userId}`);

    if (!userId || !sessionType) {
      return new Response(JSON.stringify({ error: "Missing required fields: userId and sessionType" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // 1. Fetch user data (optional, but good practice)
    // Note: Corrected to use 'id' column for matching the user.
    const { data: user, error: userError } = await supabaseClient
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (userError) {
      console.error("Error fetching user:", userError);
      // We can proceed without user data, but log the error.
      // Depending on business logic, you might want to return an error here.
    } else {
      console.log("User state fetched:", user);
    }
    
    // 2. Fetch system prompts from the database
    const { data: prompts, error: promptsError } = await supabaseClient
      .from("prompts")
      .select("title, content")
      .in("title", ["SYS-001", "SYS-002", "SYS-003"]);

    if (promptsError) {
      console.error("Error fetching system prompts:", promptsError);
      return new Response(JSON.stringify({ error: "Failed to fetch system prompts" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    if (!prompts || prompts.length < 3) {
      console.error("One or more system prompts are missing from the database.");
      return new Response(JSON.stringify({ error: "Core system prompts are missing." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }
    
    // 3. Assemble the initial system prompt from fetched content
    // Order them correctly to ensure persona is established first.
    const orderedPrompts = ["SYS-001", "SYS-002", "SYS-003"];
    const systemPrompt = orderedPrompts
      .map(title => prompts.find((p: Prompt) => p.title === title)?.content)
      .join("\\n\\n---\\n\\n");

    console.log("Assembled system prompt successfully.");

    // 4. Create a new conversation record in the database
    const { data: newConversation, error: conversationError } = await supabaseClient
      .from("conversations")
      .insert({
        user_id: userId,
        title: `New ${sessionType} session at ${new Date().toISOString()}`,
        scenario_type: sessionType,
        difficulty_level: 'beginner', // TODO: This could come from user profile
        status: 'active',
        // transcript can be built up over the session
      })
      .select()
      .single();

    if (conversationError) {
      console.error("Error creating new conversation:", conversationError);
      return new Response(JSON.stringify({ error: "Failed to create a new conversation session." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    console.log(`New conversation created with ID: ${newConversation.id}`);

    const responseData = {
      conversationId: newConversation.id,
      initialTranscript: "¡Hola! ¿Listo para empezar?", // This can be dynamic later
      systemPrompt, // for debugging on the client
    };

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("An unexpected error occurred:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/initiate-live-session' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
