# **1\. Executive Summary & Vision**

## **1.1 Problem Statement**

Language learners face a critical gap between classroom knowledge and real-world conversational confidence. While existing apps like Duolingo excel at vocabulary acquisition and grammar drills, they fail to address the primary barrier preventing fluency: **emotional and psychological obstacles to spontaneous speaking**.

### **The Real Problem Isn't Cognitive \- It's Emotional**

Our user research reveals that learners consistently struggle with:

- **Speaking Anxiety**: Fear of sounding "dumb" or being judged for pronunciation errors
- **Cultural Disconnection**: Lack of context for when, where, and how to use phrases appropriately
- **Artificial Practice**: Textbook scenarios that don't match real-world conversations
- **Isolation**: No safe space to practice speaking without embarrassment

**Key Insight**: _"People don't want to feel stupid"_ \- Users understand language concepts but freeze when it's time to speak in real situations.

### **Target User Pain Points**

**Study Abroad Students (18-22)**: _"I've been using Duolingo for 2 years, but I still panic when ordering food in Madrid."_

**Cultural Reconnectors (20-28)**: _"I understand everything my grandparents say, but I can't get the words out. It's embarrassing."_

**Business Professionals Relocating (25-45)**: _"I can read Spanish emails fine, but I freeze up in client meetings. I need to sound competent, not like a beginner."_

## **1.2 Solution Overview**

Shira is an AI-powered conversational Spanish tutor that helps users overcome emotional barriers to speaking through **emotionally supportive, culturally authentic conversation practice** using cutting-edge real-time speech-to-speech AI technology.

### **Core Solution Elements**

**AI Conversation Partner**: Shira the Sheep \- a patient, encouraging AI tutor who provides judgment-free speaking practice anytime, anywhere through natural, real-time voice conversations.

**Live Audio Conversation Technology**: Powered by Google's Gemini Live API for direct speech-to-speech interactions, eliminating the latency and artificiality of traditional text-based language learning apps.

**Emotional Support System**: Built-in detection of user frustration with adaptive responses that reduce anxiety and build confidence gradually.

**Cultural Context Integration**: Real-world scenarios and cultural nuances that prepare users for authentic conversations, not just textbook exchanges.

**Speech-First Learning**: Primary interaction through real-time voice conversation rather than passive content consumption, creating a more natural and engaging learning experience.

**Scalable Language Platform**: Starting with Spanish as our foundation, Shira's AI conversation system is designed to expand to additional languages based on user demand and cultural expertise.

## **1.3 Core Value Proposition**

### **"Build conversational confidence through emotional support and cultural authenticity"**

Shira transforms language learning from academic exercise to **confidence-building conversation practice** by addressing the emotional barriers that traditional apps ignore. Shira focuses on teaching high-utility key phrases and conversational chunks that learners can immediately apply in real-world interactions, moving beyond isolated vocabulary memorization.

### **The "3 C's" Framework**

1. **Conversational Fluency**: Practice speaking in real-time with AI feedback
2. **Cultural Immersion**: Learn not just what to say, but when and how to say it
3. **Confidence Building**: Emotional support system that reduces anxiety and celebrates progress

## **1.4 Key Differentiators**

### **Unique Differentiators**

1. **Emotional Intelligence**: APL-003 system detects user frustration and shifts to ultra-supportive mode
2. **Cultural Authenticity**: Spanish-specific nuances (tú vs. usted, regional differences, social norms)
3. **Scenario-Based Learning**: Practice conversations you'll actually have (dating, travel, family)
4. **Judgment-Free Environment**: AI partner designed specifically to build confidence, not test knowledge

# **2\. Target Users & Market**

## **2.1 Primary ICPs (Ideal Customer Profiles)**

**Shira serves mobile-native learners committed to achieving conversational fluency, unified by a common emotional barrier: speaking anxiety in real-world situations. While their contexts differ, all three segments struggle with the gap between passive language understanding and active conversation confidence.**

### **Primary Segments**

**Study Abroad Students | Cultural Reconnectors | Business Professionals**

- **Ages 18-22 | Ages 20-28 | Ages 25-45**
- **High urgency (trip deadline) | High emotional stakes (identity) | High consequences (career)**
- **Clear ROI measurement | Deep personal motivation | Professional credibility needs**

## **2.2 User Personas & Pain Points**

### **Persona 1: The Immersive Study Abroad Student**

**Demographics:**

- **Age: 18-22**
- **Location: US-based, preparing for or returning from study abroad**
- **Education: Undergraduate**
- **Language Level: Beginner to Intermediate Spanish**

**Emotional Drivers:**

- **Desire for independence while abroad**
- **Fear of sounding "dumb" or "off" when speaking**
- **Excitement about cultural immersion**

**Pain Points:**

- **Embarrassment over mispronunciations in public**
- **Anxiety about being misunderstood in critical situations**
- **Duolingo taught them "The owl eats bread" but not "Can you help me find the bathroom?"**
- **Traditional apps don't match real-world scenarios they'll actually encounter**

**Success Metrics: "Did this help me survive my first week in Madrid without constantly using Google Translate?"**

### **Persona 2: The Cultural Reconnector**

**Demographics:**

- **Age: 20-28**
- **Location: Urban US with diasporic roots (Latinx, etc.)**
- **Education: Some college to graduate degree**
- **Language Level: Understands heritage language but struggles to speak fluently**

**Emotional Drivers:**

- **Longing to feel closer to heritage/family**
- **Desire to pass language onto future generations**
- **Pride in cultural identity restoration**

**Pain Points:**

- **Shame from "losing" childhood fluency**
- **Fear of being judged by fluent relatives for "weird" pronunciation**
- **Feeling like an outsider in both cultures (not "American enough" or "Latino enough")**
- **Traditional apps don't understand the emotional weight of heritage language recovery**

**Success Metrics: "Can I have a meaningful conversation with my abuela without switching to English?"**

### **Persona 3: The Career-Focused Professional**

**Demographics:**

- **Age: 25-45**
- **Location: Global cities, often relocating for work**
- **Education: Bachelor's degree or higher**
- **Language Level: Intermediate reading/writing, beginner speaking**

**Emotional Drivers:**

- **Professional credibility and advancement**
- **Adaptability in high-stakes environments**
- **Networking effectiveness with colleagues and clients**

**Pain Points:**

- **Fear of saying something inappropriate in formal work settings**
- **Feeling less competent than monolingual peers**
- **Cultural misunderstandings that could impact business relationships**
- **Existing apps teach casual conversation, not professional Spanish**

**Success Metrics: "Can I lead a client meeting in Spanish without switching to English?"**

# **3\. Product Architecture & Core Features**

## **3.1 Three-Tab Learning Architecture**

### **Learning Track Tab (Structured)**

- **Pre-built Live Audio API sessions organized by category (Dating, Travel, Business)**
- **Sequential unlocking: Complete one conversation to access the next**
- **Initial session configuration: Each conversation begins with a comprehensive system prompt that includes target phrase concepts and cultural context**
- **Target users: Beginners and study abroad students needing systematic preparation**
- **Database:** For example, a 'Conversation' within 'Travel' might focus on the Target_Phrase_Concept of 'Asking for directions to the hotel' or 'Checking into a flight'.

### **Explore Tab (Dynamic)**

- **Keyword-driven Live Audio API session generation: User selects category → keyword → AI generates initial session configuration**
- **Real-time session creation: Supabase Edge Function assembles initial system prompt and initiates Live Audio API session**
- **Target users: Intermediate learners with specific scenario needs**
- **Example flow: "Ordering Food" → "Splitting the bill" → Custom roleplay Live Audio conversation**

### **Graze Mode (Freeform)**

- **Open-ended Live Audio API sessions: User describes real-life scenario ("I blanked when my crush...") → AI creates personalized session**
- **Emotional support integration: AI validates feelings and creates practice scenario through natural voice conversation**
- **Persistent context: Live Audio API session state maintained across sessions using session resumption features**
- **Content guardrails: Initial system prompt configuration redirects off-topic requests to language practice**

## **3.2 Unified Live Conversation Interface & Feedback System**

**All tabs feed into a single Live Audio API conversation session:**

**Core Flow:**

1. **Session initiation: Comprehensive system prompt assembled (SYS + APL + initial CFS/GRZ task logic) and Live Audio API session started**
2. **User speaks → Shira speaks: Real-time audio conversation with live transcript display**
3. **Feedback approach (MVP Decision Point):**
   - **Option A**: Primarily spoken feedback by Shira during live conversation (guided by initial system prompt)
   - **Option B (Hybrid)**: Live spoken interaction + optional detailed textual feedback via separate text-based Gemini call (CFS-002 style)

**Key Features:**

- **Real-time spoken responses: Natural conversation flow with minimal latency**
- **Live transcript display: Visual feedback of conversation in real-time**
- **Hint system: Contextual scaffolding delivered through spoken or text prompts**
- **Alternative responses: Multiple ways to express ideas provided through voice**
- **Spoken pronunciation guidance: Real-time voice corrections and encouragement**
- **Optional detailed textual analysis: Post-turn grammar and cultural feedback (if hybrid approach)**

## **3.3 Shira AI Personality System**

**Core Traits (SYS-001):**

- **Patient & encouraging: Never frustrated, celebrates effort over perfection**
- **Culturally authentic: Uses natural Spanish expressions, informal "tú" form**
- **Emotionally intelligent: Detects frustration and provides appropriate support**

**Adaptive Behavior:**

- **Difficulty adjustment (APL-002): Language complexity scales with user performance, primarily influences initial system prompt configuration for new Live Audio API sessions**
- **Emotional support mode (APL-003): Activates after detecting user frustration, adjusts ongoing session behavior or configures new session prompts for extra scaffolding and encouragement**
- **Error handling (SYS-003): Graceful responses to confusion or technical issues within Live Audio conversations**

## **3.4 Personalization & Context Management**

**Context Persistence:**

- **Learning Track: Maintained within single Live Audio API session, resets between conversations**
- **Explore: Session-based with Live Audio API, resets with new keyword selection**
- **Graze Mode: Persistent across Live Audio API sessions using two mechanisms:**
  - **Session Resumption**: Live Audio API session resumption features maintain active conversation state (dependent on actual Live API capabilities - to be validated during Week 1)
  - **Cross-session Summaries**: When sessions end, Edge Functions generate conversation summaries that are included in the initial system prompt of new Graze Mode sessions to maintain emotional and contextual continuity (fallback approach if true session resumption unavailable)

**Global User State:**

- **Language proficiency level, emotional support status, speaking confidence metrics**
- **Maintained across all tabs for consistent AI behavior and initial system prompt configuration**

# **4\. Technical Architecture**

## **4.1 System Overview & Data Flow**

graph LR  
 A\[User \<br/\> (React Native App)\] \-- 1\. Live Audio Stream \--\> F\[Gemini Live Audio API\];  
 F \-- 2\. Live Audio Response \--\> A;  
 A \-- 3\. Session Setup Request \--\> B{Supabase Edge Function \<br/\> (initiateLiveSession)};  
 B \-- 4\. Fetch User State \--\> D\[Supabase Database \<br/\> (Users, Conversations, Progress)\];  
 D \-- 5\. User State \--\> B;  
 B \-- 6\. Fetch Prompt Templates \--\> E\[Supabase Storage \<br/\> (System Prompt Templates)\];  
 E \-- 7\. Templates \--\> B;  
 B \-- 8\. Initial System Prompt \--\> F;  
 subgraph Auxiliary Services  
 B \-- 9\. Text-based Calls \--\> G\[Gemini Text API\];  
 G \-- 10\. Setup/Feedback Responses \--\> B;  
 B \-- 11\. Optional Detailed Analysis \--\> C\[Google Cloud STS API\];  
 C \-- 12\. Word Confidences \--\> B;  
 end  
 B \-- 13\. Update User Metrics \--\> D;

    style A fill:\#DAE8FC,stroke:\#6C8EBF,stroke-width:2px
    style B fill:\#D5E8D4,stroke:\#82B366,stroke-width:2px
    style C fill:\#FFE6CC,stroke:\#D79B00,stroke-width:2px
    style D fill:\#E1D5E7,stroke:\#9673A6,stroke-width:2px
    style E fill:\#E1D5E7,stroke:\#9673A6,stroke-width:2px
    style F fill:\#FFF2CC,stroke:\#D6B656,stroke-width:3px
    style G fill:\#FFF2CC,stroke:\#D6B656,stroke-width:2px

**Core Flow**:

1. **Primary Interaction Path**: App ↔ Gemini Live Audio API for real-time voice conversations
2. **Session Orchestration**: Edge Function assembles initial system prompt and initiates Live Audio session
3. **Auxiliary Support**: Edge Functions handle user state management, optional textual feedback generation, and supplementary analysis

## **4.2 Supabase Backend Architecture**

### **Edge Functions (Live Audio Session Orchestration)**

**Primary Function**: `initiateLiveSession`

- **Input**: `userId`, `sessionType` (LEARNING_TRACK, EXPLORE, GRAZE_MODE), `conversationContext`
- **Process**: Fetch user state → Determine APL overlays → Assemble initial system prompt → Initiate Live Audio session
- **Output**: `liveSessionHandle`, `initialTranscript`

**Secondary Functions**:

- `generateAuxiliaryFeedback`: Optional detailed textual analysis using text-based Gemini
- `updateUserProgress`: Asynchronous user state and metrics updates

**Initial System Prompt Assembly Logic**:

javascript

// Construct comprehensive initial system prompt for Live Audio API session  
const initialSystemPrompt \=  
 SYS-001_text \+  
 SYS-002_Spanish_text \+  
 (emotionalSupportActive ? APL-003_guidelines : APL-002_guidelines) \+  
 taskSpecificInstructions_text \+  
 sessionContextSummary \+  
 conversationGoalsAndScenario

### **Database Schema**

**Users Table**:

sql

users: {  
 user_id, language_level, points, emotional_support_active,  
 current_apl_modifier, last_conversation_context  
}

**Conversations Table**:

sql

conversations: {  
 conversation_id, category, target_phrase_concept,  
 scenario_description, expected_response_pattern  
}

**Progress Tracking**:

sql

user_progress: {  
 user_id, conversation_id, completion_status,  
 performance_metrics, timestamp  
}

### **Storage Architecture**

**Prompt Templates**: `/prompts/SYS-001.txt`, `/prompts/CFS-002_Spanish.txt` **Conversation Data**: Pre-built Learning Track conversations stored as JSON **User Context**: Recent conversation history for Graze Mode persistence

## **4.3 AI Integration Stack**

### **Gemini Live Audio API Integration**

**Primary Integration**: Real-time speech-to-speech conversations

**Session Configuration**:

javascript

{  
 model: "gemini-2.0-flash-live-001",  
 config: {  
 response_modalities: ["AUDIO", "TEXT"],  
 system_instruction: assembledSystemPrompt,  
 generation_config: {  
 temperature: 0.7,  
 speech_config: {  
 voice_config: {  
 prebuilt_voice_config: {  
 voice_name: "VOICE_A"  
 }  
 }  
 }  
 }  
 }  
}

**Real-time Audio Processing**:

javascript

// Initiate Live Audio session
const session = await client.aio.live.connect(model, config);
// Stream audio bidirectionally
await session.send_realtime_input(audioBlob);
// Receive live responses
for await (const response of session.receive()) {
if (response.data) displayTranscript(response.data);
}

### **Text-based Gemini API Integration**

**Auxiliary Use Cases**:

- Initial Graze/Explore setup prompts
- Optional detailed CFS-002 textual feedback generation
- FUT cultural context prompts

**Request Structure**:

javascript

{  
 model: "gemini-pro",  
 prompt: specificTaskPrompt,  
 temperature: 0.7,  
 max_tokens: 500  
}

### **Google Speech-to-Text (Supplementary)**

**Reduced Role**: Optional asynchronous analysis only

**Use Cases**:

- **Detailed pronunciation analysis**: When Live API transcripts lack sufficient word-confidence granularity
- **Fallback transcription**: If Live Audio API connection fails
- **Offline analysis**: Post-session detailed speech quality metrics

**Configuration** (when used):

javascript

SIGNIFICANT_MISPRONUNCIATION: confidence \< 0.65  
MINOR_MISPRONUNCIATION: 0.65 \<= confidence \< 0.85  
ACCEPTABLE: confidence \>= 0.85

## **4.4 Mobile App (Expo React Native)**

### **Core Tech Stack**

- **Framework**: Expo managed workflow
- **Navigation**: React Navigation (tab \+ stack)
- **Audio**: expo-av for recording/playback
- **State**: React Query for server state, Zustand for local state
- **Styling**: NativeWind (Tailwind for React Native)

### **Key Components**

- **ConversationScreen**: Unified interface for all three tabs
- **LiveAudioSession**: Real-time audio streaming with session management
- **ShiraMessage**: Spanish text + English translation display
- **TranscriptDisplay**: Live conversation transcript with basic visual feedback

## **4.5 Live Audio Processing Pipeline**

### **Real-time Audio Streaming**

javascript

// Client-side Live Audio streaming  
const liveSession = await initiateLiveAudioSession(userId, sessionType);  
const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

// Stream audio directly to Live API
await liveSession.streamAudio(audioStream);

// Receive real-time responses
liveSession.onAudioResponse((audioData, transcript) => {  
 playAudio(audioData);  
 displayTranscript(transcript);  
});

### **Dramatically Improved Latency**

1. **Audio → Live API**: \~200-500ms for real-time processing
2. **Initial System Prompt Setup**: \~200ms one-time session configuration
3. **Live Audio Response**: \~500ms-1s for natural speech generation
4. **Transcript Display**: Real-time streaming text updates
5. **Total Latency**: \~1-2 seconds from speech to response (versus 4-7 seconds previously)

### **Enhanced Fallback Strategies**

- **Live API Connection Issues**: Automatic reconnection with session resumption
- **Audio Quality Problems**: Real-time feedback with retry prompts
- **Network Interruptions**: Session state preservation for seamless reconnection
- **Backup STS Integration**: Optional fallback if Live API transcription fails

## **4.6 Performance & Scalability**

### **Optimization Strategies**

- **Prompt Template Caching**: Load frequently used templates into Edge Function memory
- **User State Caching**: Redis layer for active user sessions
- **Audio Compression**: Client-side compression before upload
- **Response Streaming**: Stream Gemini responses for faster perceived performance

# **5\. User Experience & Interface Design**

## **5.1 Onboarding Flow**

### **Welcome & Value Proposition (3 screens)**

1. **Hook**: "Practice Spanish with someone who'll never judge you"
2. **Problem validation**: "Tired of freezing up in real conversations?"
3. **Solution preview**: Brief demo of Shira conversation

### **User Setup (2 screens)**

1. **Language level selection**: Beginner/Intermediate/Advanced with example phrases
2. **Goals & motivation**: "Why are you learning Spanish?" (Study abroad/Family/Work/Travel)

### **First Conversation (Guided)**

- **Learning Track introduction**: Simple "introducing yourself" conversation
- **Voice permission request**: Integrated naturally into first practice
- **Success celebration**: Immediate positive reinforcement regardless of performance

## **5.2 Core Conversation Interface**

### **Chat-Style Layout**

\[Shira Avatar\] "¡Hola\! ¿Cómo te llamas?"  
 "Hi\! What's your name?"  
\[Hint Card\] "Try: 'Me llamo \[your name\]'" \[Optional, collapsible\]  
\[Voice Input Button\] 🎤 \[Tap to speak\]  
\[Your Response\] "Me llamo Sarah" \[After speaking\]  
 ✅ Green indicator  
\[Shira Response\] "¡Perfecto\! Muy bien..."

### **Voice Input Experience**

- **Recording state**: Animated waveform during speech
- **Processing state**: "Listening..." → "Thinking..." → Response
- **Replay option**: Hear your own audio back
- **Re-record button**: Easy retry without judgment

### **Feedback Integration**

- **Immediate visual**: Color-coded word highlighting during transcription
- **Detailed explanation**: Expandable English feedback below Spanish response
- **Alternative phrases**: Tap to reveal "Other ways to say this"
- **Cultural notes**: Contextual tips when relevant

## **5.3 Tab-Specific Interfaces**

## **Learning Track**

- **Progress visualization**: Linear path with completed/locked conversations
- **Category cards**: Visual themes (Dating 💕, Travel ✈️, Food 🍽️)
- **Difficulty indicators**: Beginner/Intermediate/Advanced badges
- **Achievement unlocks**: "¡Completaste Dating\!" celebration

### **Explore**

- **Category grid**: Large, visual category selection
- **Keyword tags**: Scrollable chips under each category
- **Loading state**: "Creating your conversation..." with Shira animation
- **Session reset**: "Start new topic" always visible

### **Graze Mode**

- **Text input prompt**: "What would you like to practice today?"
- **Example suggestions**: "I want to order coffee confidently" / "Practice talking to my grandmother"
- **Conversation history**: Previous topics accessible
- **Emotional check-in**: Subtle mood tracking integration

## **5.4 Accessibility & Inclusivity**

### **Audio Accessibility**

- **Visual transcription**: All audio content has text alternatives
- **Adjustable playback speed**: Slower speech for processing
- **High contrast mode**: For visual impairments
- **Large text support**: Respects iOS/Android accessibility settings

### **Language Support**

- **Interface language**: English primary, Spanish secondary option
- **Cultural sensitivity**: Inclusive avatar options and scenarios
- **Accent neutrality**: No "correct accent" messaging, focus on communication

## **5.5 Emotional Design**

### **Encouragement Patterns**

- **Micro-celebrations**: Confetti for first completions
- **Progress visualization**: Growing confidence meter
- **Effort recognition**: "Great attempt\!" messaging for all tries
- **Streak building**: Daily practice encouragement without guilt

### **Anxiety Reduction**

- **No timer pressure**: Users control conversation pace
- **Privacy emphasis**: "Only you and Shira can hear this"
- **Mistake normalization**: "Everyone makes mistakes while learning"
- **Safe retry**: Unlimited attempts without penalty

# **6\. AI Conversation System (Detailed)**

## **6.1 Live Audio API System Prompt Architecture**

### **Initial System Prompt Construction for Live Audio Sessions**

\[SYS-001: Global Persona\]  
\+ \[SYS-002: Spanish-Specific Behavior\]  
\+ \[APL-003: Emotional Support OR APL-002: Difficulty Adjustment\]  
\+ \[Embedded Task Instructions: CFS/GRZ behavioral guidelines\]  
\+ \[Session Context: User data, conversation goals, scenario setup\]

### **Live Audio Session Configuration Logic**

1. **Base Layer**: Shira's core personality embedded into Live API system prompt (patient, encouraging, culturally authentic)
2. **Language Layer**: Spanish-specific behavior instructions for Live API (tú form, regional neutrality, natural expressions)
3. **Adaptive Layer**: User state-driven session configuration (beginner simplification, emotional support mode)
4. **Embedded Task Layer**: CFS/GRZ behavioral instructions guide Gemini's responses throughout the entire live session (initiate, continue, help, manage flow)
5. **Session Context Layer**: Initial conversation goals, user history summaries, and scenario-specific context

### **Key Architecture Change**

**Previous Approach**: Assembled prompts for each conversational turn  
**Live API Approach**: Comprehensive initial system prompt configures Gemini's behavior for the entire live audio session, with task-specific instructions (CFS-001, CFS-003, CFS-004, GRZ patterns) embedded as behavioral guidelines rather than per-turn prompts.

### **Example: Learning Track "Ordering Coffee" Initial System Prompt**

```
You are Shira, a patient and encouraging Spanish tutor. You are playing the role of a friendly barista in a Spanish café.

SCENARIO SETUP (CFS-001 embedded):
Start the conversation by greeting the user warmly: "¡Hola! ¿Qué te gustaría tomar?"
The lesson goal is for the user to practice ordering coffee using "Quisiera un café..."
After they order successfully, ask "¿Para aquí o para llevar?"

CONVERSATION FLOW (CFS-003 embedded):
- If user orders correctly: Acknowledge positively and continue the conversation naturally
- If user seems unsure: Gently remind them "Puedes decir 'Quisiera...'"
- If user makes errors: Provide spoken corrections like "Try 'café con leche' instead"
- If user asks for help: Give direct examples in a supportive voice

SUPPORT BEHAVIOR (CFS-004 embedded):
- Always respond with patience and encouragement
- Break down phrases if user struggles: "Let's try just 'Quisiera' first"
- Celebrate any attempt: "¡Muy bien! You're doing great!"
- Keep conversation natural - you're a real barista, not obviously an AI tutor

SPANISH LANGUAGE GUIDELINES (SYS-002):
- Use informal "tú" form throughout
- Include natural expressions like "perfecto," "claro," "por supuesto"
- Speak at moderate pace with clear pronunciation
```

This shows how multiple CFS behavioral patterns are embedded into a single comprehensive system prompt for the Live Audio API session.

## **6.2 Core System Prompts for Live Audio API**

### **SYS-001: Global Persona (Live Audio Integrated)**

**Purpose**: Establishes Shira's personality within Live Audio API system prompt **Key behaviors translated to Live API**:

- Never frustrated, celebrates effort over perfection in real-time voice responses
- Focuses on communication over grammar perfection during live conversations
- Redirects off-topic requests back to Spanish practice through natural voice guidance
- Maintains encouraging tone across all live audio interactions

### **SYS-002: Spanish-Specific Behavior (Live Audio Optimized)**

**Purpose**: Defines culturally authentic Spanish usage for real-time speech **Key elements for Live API system prompt**:

- **Formality**: Primarily informal "tú" form for natural, friendly voice conversations
- **Regional approach**: Neutral Spanish pronunciation and vocabulary understandable across regions
- **Natural expressions**: "por favor," "gracias," conversational fillers ("bueno," "a ver") integrated into live speech patterns
- **Cultural sensitivity**: Acknowledges regional variations without preference in voice responses

### **SYS-003: Error Handling (Live Audio Context)**

**Purpose**: Graceful responses to confusion or technical issues during live conversations **Response patterns for Live API**:

- **Misunderstanding**: Natural voice responses like "No te preocupes, ¿podrías intentarlo de otra manera?"
- **Off-topic**: Gentle voice redirection to Spanish practice
- **Technical failure**: Encouraging voice prompts for retry with alternative phrasing

**Note**: These SYS prompts remain fundamentally valid as definitions of Shira's behavior but are now embedded within the Live Audio API's initial system prompt rather than assembled per-turn.

## **6.3 Conversational Fluency System (CFS) - Live Audio Integration**

### **CFS-001: AI Initiation (Live Audio System Prompt Component)**

**Purpose**: Informs how Shira should start specific lesson conversations within Live Audio API sessions

**Role in Live API**: CFS-001 logic is embedded within the initial system prompt, instructing Gemini how to begin conversations for different scenarios

**Input variables integrated into system prompt**: `Target_Phrase_Concept`, `Scenario_Description`, `User_Language_Level`

**Live Audio implementation**: Instead of structured output format, Shira naturally initiates conversations through voice based on system prompt instructions like:
_"Start the conversation by asking about swimming pool preferences in Spanish, then provide English translation support"_

### **CFS-002: Response Analysis & Feedback (Dual Approach)**

**Purpose**: Evaluate user speech and provide feedback through Live Audio API and optional textual analysis

**Dual Implementation Strategy:**

**Option A - Live Audio Primary:**

- **Real-time spoken feedback**: Gemini provides immediate voice feedback based on system prompt instructions
- **Analysis embedded in system prompt**: Guidelines for semantic correctness, grammar accuracy, pronunciation, cultural appropriateness
- **Natural voice responses**: "¡Muy bien!" or "Try saying 'prefiero' with more emphasis on the 'ie' sound"

**Option B - Hybrid Approach:**

- **Live spoken interaction**: Natural conversation flow through Live API
- **Supplementary textual feedback**: Separate text-based Gemini call using detailed CFS-002 prompt for structured analysis
- **UI integration**: Detailed grammar/pronunciation feedback displayed alongside live conversation

**Updated Analysis Dimensions:**

- **Live Audio capable**: Semantic correctness, natural conversation flow, cultural appropriateness
- **Text-based supplement**: Detailed grammar analysis, word-level pronunciation scoring, structured feedback

### **CFS-003: Conversation Continuation (Embedded in Live API System Prompt)**

**Purpose**: Behavioral instructions within Live API system prompt guide Gemini's responses throughout the session

**Live Audio Integration**: CFS-003 logic embedded as behavioral guidelines in initial system prompt:

- **CORRECT_AND_FLUENT**: "Offer alternative phrases naturally in voice or ask follow-up questions"
- **NEEDS_RETRY_MINOR**: "Provide gentle voice guidance with specific pronunciation help"
- **NEEDS_RETRY_SIGNIFICANT**: "Naturally re-prompt for the same task with encouragement"
- **STRUGGLING_REPEATEDLY**: "Break down phrases into smaller components through voice instruction"

**Key Change**: Instead of per-turn decision making, these behavioral patterns guide Gemini throughout the entire live session.

### **CFS-004: Help & Confusion Handling (Live API System Prompt Instructions)**

**Purpose**: Embedded instructions for how Shira should react when users signal confusion during live conversations

**Live Audio Implementation**: CFS-004 becomes part of the system prompt's behavioral instructions:

- **Task clarification**: "When users seem confused, naturally restate the goal in simple English through voice"
- **Phrase breakdown**: "Divide target responses into manageable parts using natural speech"
- **Direct modeling**: "Provide exact pronunciation guidance through voice demonstration"
- **Encouragement**: "Validate effort and reduce anxiety with supportive voice responses"

**Integration Note**: These support strategies are now reactive behaviors built into Gemini's Live API session rather than separate prompt-driven responses.

## **6.4 Adaptive Personalization Loops (APL) - Live Audio Session Configuration**

### **APL-002: Dynamic Difficulty Adjustment (Live Audio System Prompt Configuration)**

**Purpose**: Provides guidelines used to configure the initial system prompt of each new Live Audio API session

**Live Audio Implementation**:

**Session Configuration Approach**:

- **Initial system prompt adaptation**: User performance data influences the complexity level embedded in the Live API session setup
- **Per-session calibration**: Each new conversation session configured with appropriate difficulty based on recent performance
- **Potential ongoing adjustment**: If Live API supports context updates mid-session, difficulty could be adjusted dynamically

**Trigger conditions translate to system prompt configuration**:

- **Success rate \>80%**: System prompt includes instructions for higher vocabulary/grammar complexity
- **Success rate \<40%**: System prompt configured for simplified language and increased scaffolding
- **Stable performance**: System prompt maintains current complexity with content variety

**Complexity scaling embedded in system prompts**:

- **Beginner prompts**: "Use present tense, 3-7 words, high-frequency vocabulary in responses"
- **Intermediate prompts**: "Include past/future tenses, 7-12 words, expanded vocabulary"
- **Advanced prompts**: "Use complex structures, 10-15+ words, idioms/cultural expressions naturally"

### **APL-003: Emotional Support Mode (Live Audio Session Behavior Modification)**

**Purpose**: Provides guidelines for configuring Live Audio API sessions when emotional support is needed

**Live Audio Implementation**:

**Session Configuration Approach**:

- **Emotional support system prompt**: When triggered, new Live Audio sessions initialized with ultra-supportive behavioral instructions
- **Ongoing session adjustment**: If Live API allows context updates, existing sessions could shift to support mode mid-conversation
- **Session resumption**: Support mode preferences maintained across session interruptions

**Activation triggers for system prompt modification**:

- **3+ consecutive errors**: Triggers supportive system prompt configuration for next session
- **User frustration signals**: Real-time detection leads to session behavioral adjustment
- **Explicit help requests**: Immediate system prompt modification for supportive responses

**Modified behaviors embedded in Live API system prompt**:

- **Ultra-patient tone**: "Respond with extra encouraging language and patience in all voice interactions"
- **Simplified tasks**: "Break complex phrases into micro-steps through natural voice guidance"
- **Increased scaffolding**: "Provide more hints and direct modeling through voice demonstration"
- **Effort celebration**: "Give positive reinforcement for any attempt, regardless of accuracy"
- **Pressure reduction**: "Include 'no rush, take your time' messaging naturally in voice responses"

**Key Integration**: APL-002 and APL-003 now primarily influence Live Audio API session initialization and potentially ongoing session context updates, rather than per-turn prompt modifications.

## **6.5 Live Audio Processing & Feedback Integration**

### **Live Audio API Integration (Primary)**

**Real-time audio processing**:

1. **Direct audio streaming**: Live microphone input streamed to Gemini Live API
2. **Real-time transcription**: Live API handles Spanish transcription automatically
3. **Live voice feedback**: Immediate spoken responses with natural pronunciation guidance
4. **Session-based context**: Continuous conversation flow maintained within Live API session

### **Supplementary STS Integration (Optional)**

**Reduced role for detailed analysis**:

- **Asynchronous pronunciation analysis**: Post-session detailed word-confidence scoring when Live API transcripts lack granularity
- **Fallback transcription**: Backup system if Live Audio API connection fails
- **Offline analysis**: Detailed speech quality metrics for progress tracking

**Confidence thresholds** (when STS is used):

javascript  
if (confidence \< 0.65) {  
 flag \= "SIGNIFICANT_MISPRONUNCIATION"  
} else if (confidence \< 0.85) {  
 flag \= "MINOR_MISPRONUNCIATION"  
} else {  
 flag \= "ACCEPTABLE"  
}

### **Live Audio Pronunciation Feedback**

**Real-time spoken feedback**:

- **Natural voice corrections**: "Try saying 'prefiero' like 'pre-FIE-ro'" delivered through Live API
- **Contextual spoken guidance**: Live audio comparisons and encouragement
- **Immediate affirmation**: "¡Perfecto!" or "Almost there!" in real-time voice responses
- **Cultural context**: "Native speakers sometimes struggle with this too" delivered naturally

### **Cultural Context Integration (FUT-002 Logic)**

**Two implementation approaches**:

- **Option A (Live Audio)**: Shira offers cultural insights contextually within live conversation based on system prompt instructions
- **Option B (Hybrid)**: On-demand cultural context provided via separate text-based FUT-002 prompts for detailed explanations

**Real-time cultural awareness**:

- **Register detection**: Formal vs. informal context awareness built into Live API system prompt
- **Natural cultural notes**: "In Mexico, you might also hear..." delivered through voice during live conversation
- **Contextual appropriateness**: When/where phrase usage guidance embedded in Live API behavioral instructions

# **7\. Success Metrics & Analytics**

## **7.1 Core KPIs**

### **Engagement Metrics**

- **DAU**: 80% of weekly users engage daily
- **Session Duration**: 5-10 minutes (quality over quantity)
- **Voice Interaction Rate**: % using speech vs. text fallbacks
- **Conversation Completion**: % of initiated conversations finished

### **Learning Effectiveness**

- **Pronunciation Improvement**: STS confidence score trends over time
- **Retry Reduction**: Fewer attempts needed for acceptable pronunciation
- **Conversation Fluency**: Response latency, hesitation frequency, vocabulary diversity
- **Cultural Context Retention**: Appropriate phrase usage in scenarios

## **7.2 Speech Confidence Tracking**

### **Objective Indicators**

- Voice vs. text preference shifts
- Speaking attempt frequency (willingness to retry)
- Error recovery resilience after corrections

### **Subjective Measures**

- Weekly confidence surveys (1-10 scale)
- Scenario readiness: "Would you feel comfortable ordering food in Spanish?"
- Self-reported real-world application success

### **Confidence Score Formula**

weighted_average(  
 pronunciation_improvement \* 0.3,  
 conversation_completion \* 0.25,  
 voice_usage_rate \* 0.25,  
 self_reported_confidence \* 0.2  
)

## **7.3 Emotional Support Effectiveness**

### **APL-003 Impact**

- **Activation frequency**: How often support mode triggers
- **Recovery time**: Sessions needed to return to normal performance
- **Resolution rate**: Success after emotional support intervention

## **7.4 Success Thresholds (6-month targets)**

- **70%** report increased speaking confidence
- **50%** use practiced phrases in real conversations
- **40%** Day-30 retention rate
- **\<5 seconds** average response time
- **80%** successful recovery from emotional support mode

## **7.5 Key Event Tracking**

javascript

conversation_started, voice_input_attempted,  
feedback_received, emotional_support_triggered,  
conversation_completed

# **8\. Development Roadmap & Implementation**

## **8.1 1-Month MVP Scope (In Scope)**

### **Core Features (Must Have)**

- **Single Live Audio conversation flow**: Basic Live Audio API sessions with embedded CFS behavioral guidelines (initiation + spoken feedback only)
- **Learning Track ONLY**: 1 category ("Introductions"), 3 pre-built Live Audio conversations
- **Live Audio processing**: Gemini Live Audio API as primary interaction + real-time voice transcription
- **Minimal Shira AI**: SYS-001 personality + simplified Spanish responses delivered through Live Audio
- **Live conversation interface**: Real-time audio streaming with live transcript display

### **Technical Foundation**

- **Frontend**: Expo React Native with single tab (Learning Track) + Live Audio streaming capabilities
- **Backend**: 1 Supabase Edge Function for Live Audio session orchestration (initiateLiveSession)
- **Database**: Minimal schema (users, conversations, basic progress)
- **AI**: Gemini Live Audio API sessions with hardcoded/simpler initial system prompts (no dynamic assembly)

### **User Flow (Simplified)**

1. **Onboarding**: Name + language level selection only
2. **Single Live Audio conversation path**: Linear progression through 3 "Introduction" Live Audio sessions
3. **Live Audio interaction**: App initiates Live Audio session → User speaks → Shira responds in real-time → Live transcript displays
4. **No personalization**: Same experience for all users

### **Success Criteria**

- 10 internal testers complete all 3 Live Audio conversations
- Live Audio streaming and real-time voice interaction works reliably
- Conversation feels natural, immediate, and encouraging

## **8.2 Post-MVP Additions (Out of Scope)**

### **Deferred Features**

- **Explore Tab & Graze Mode**: Complex dynamic generation
- **APL System**: Difficulty adjustment and emotional support
- **Advanced speech feedback**: Pronunciation scoring, word-level analysis, color-coded feedback UI
- **Three-tab architecture**: Focus on single learning path
- **User accounts/auth**: Local storage only for MVP
- **Progress tracking**: No streaks, points, or achievements
- **Cultural context**: Basic Spanish only, no regional variations
- **Conversation persistence**: Fresh start each session

### **Technical Debt Accepted**

- **Hardcoded prompts**: No dynamic assembly system
- **Single conversation type**: No CFS-003 continuation logic
- **Basic error handling**: Minimal fallbacks
- **No user state management**: Stateless conversations
- **Simple UI**: No animations, minimal styling

## **8.3 1-Month Implementation Plan**

### **Week 1: Foundation**

**Developer 1 (Frontend)**:

- Expo setup with basic navigation
- Live Audio streaming components (WebRTC/WebSockets for real-time audio)
- Live conversation interface with real-time transcript display
- Cursor: Generate Live Audio UI components

**Developer 2 (Backend)**:

- Supabase project setup
- Basic Edge Function for Live Audio session orchestration (initiateLiveSession)
- Gemini Live Audio API integration and authentication
- Cursor: Generate Live Audio session management boilerplate

### **Week 2: Core Flow**

**Developer 1**:

- Connect Live Audio streaming to Gemini Live API
- Real-time transcript display and conversation state management
- Live Audio session lifecycle management (start/stop/error handling)
- Cursor: Debug React Native Live Audio streaming issues

**Developer 2**:

- Gemini Live Audio API session configuration
- 3 hardcoded initial system prompts for "Introduction" conversations
- Live Audio session response handling and parsing
- Cursor: Optimize Live Audio session prompts and configurations

### **Week 3: AI Integration**

**Both Developers (Pair Programming)**:

- End-to-end conversation testing
- Shira personality refinement
- Response quality validation
- Cursor: Collaborative debugging and testing

### **Week 4: Polish & Testing**

**Developer 1**:

- UI improvements and error states
- Audio quality optimization
- Basic onboarding flow

**Developer 2**:

- Performance optimization
- Error handling and fallbacks
- Deployment and testing infrastructure

## **8.4 Resource Constraints & Trade-offs**

### **What We're Optimizing For**

- **Speed to market**: Validate core conversation concept quickly
- **Technical feasibility**: Reduce complexity to ensure delivery
- **User feedback**: Get real conversation data to inform next phase
- **Learning**: Understand speech processing and AI conversation challenges

### **What We're Sacrificing**

- **Feature completeness**: No advanced personalization or multiple tabs
- **Scalability**: Hardcoded elements that will need refactoring
- **User retention**: Limited content and progression features
- **Monetization**: No premium features or user accounts

### **Post-MVP Roadmap (Months 2-3)**

1. **User accounts & progress tracking**
2. **Three-tab architecture implementation**
3. **APL personalization system**
4. **Advanced speech feedback**
5. **Content expansion to 15+ conversations**

## **8.5 1-Month Success Metrics**

### **Technical Validation**

- **Live Audio streaming works**: Real-time voice conversation with minimal latency (<2 seconds)
- **Live Audio transcription accuracy**: 90%+ transcription accuracy for clear Spanish audio
- **AI responds naturally**: Live Audio conversation feels encouraging, immediate, and helpful
- **Performance acceptable**: <2 second Live Audio response times
- **No critical bugs**: App doesn't crash during Live Audio sessions

### **User Validation**

- **Conversation completion**: 80% of testers complete all 3 conversations
- **Engagement quality**: Users speak multiple turns per conversation
- **Emotional response**: Positive feedback about Shira's encouraging tone
- **Learning value**: Users report feeling more confident after conversations

# **9\. Risk Management & Considerations**

## **9.1 Technical Risks & Mitigation (1-Month Timeline)**

### **High-Risk Areas**

**Live Audio API Stability & Performance**

- **Risk**: Gemini Live Audio API connection instability, session drops, or high latency
- **Impact**: Core feature failure, unusable real-time conversation experience
- **Mitigation**:
  - Week 1 priority: Validate Live Audio API with Spanish conversation samples
  - Fallback: Text-based conversation mode if Live Audio fails
  - Implement robust session reconnection and error recovery
  - Cursor assistance: Use AI for debugging Live Audio API integration edge cases

**Complexity of Managing Live Audio Sessions**

- **Risk**: Difficulty managing Live Audio session lifecycle, context persistence, or system prompt configuration
- **Impact**: Poor user experience, conversation context loss, inability to guide Shira's behavior
- **Mitigation**:
  - Start with simple, hardcoded initial system prompts for MVP
  - Test session management extensively in Week 2
  - Build simple session state tracking and recovery mechanisms
  - Document Live Audio API session patterns for team reference

**Limitations in Getting Granular Feedback from Live API**

- **Risk**: Live Audio API may not provide detailed pronunciation analysis or word-level confidence scores
- **Impact**: Reduced ability to provide specific pronunciation feedback
- **Mitigation**:
  - Accept this limitation for MVP - focus on conversational flow over detailed feedback
  - Plan for optional asynchronous STS calls post-MVP for detailed analysis
  - Rely on Shira's spoken feedback guided by system prompt instructions

**Live Audio API Capability Discovery**

- **Risk**: Unknown capabilities regarding session management, context updates, transcript analysis, and session resumption
- **Impact**: May need to adjust architecture based on actual API limitations
- **Mitigation**:
  - Week 1 priority: Comprehensive Live API capability testing and documentation
  - Build flexible system prompt architecture that can adapt to API constraints
  - Prepare fallback strategies for each major assumed capability

**Expo/React Native Live Audio Streaming Issues**

- **Risk**: Device-specific real-time audio streaming problems, WebRTC compatibility, or permissions
- **Impact**: App unusable on certain devices, poor audio quality
- **Mitigation**:
  - Test on both iOS and Android early (Week 1)
  - Use WebRTC with fallback to native device streaming capabilities
  - Cursor help: Generate cross-platform Live Audio streaming code

### **Medium-Risk Areas**

**Supabase Edge Function Complexity**

- **Risk**: Serverless function timeout or deployment issues
- **Impact**: Backend failures, slow response times
- **Mitigation**: Keep functions simple, use Cursor for boilerplate generation

**Performance Under Load**

- **Risk**: Slow API responses or function timeouts
- **Impact**: Poor user experience
- **Mitigation**: Accept 10-second response times for MVP, optimize later

## **9.2 Scope Creep & Timeline Risks**

### **Developer Temptations (Avoid)**

- **Adding tabs**: "Explore mode would be easy to add"
- **Advanced UI**: "Let's make it look really polished"
- **Extra conversations**: "We should have at least 10 conversations"
- **User accounts**: "Authentication is important"

### **Mitigation Strategy**

- **Daily standups**: Strict scope review and feature freeze discipline
- **Cursor efficiency**: Use AI to generate boilerplate, not new features
- **Feature parking lot**: Document good ideas for post-MVP
- **Success metric focus**: Only build what's needed to validate core conversation flow

## **9.3 Content Moderation & Safety**

### **MVP Safety Measures**

**Limited Input Scope**

- **Advantage**: Pre-built conversations reduce inappropriate content risk
- **User input**: Only voice responses to specific prompts
- **AI guardrails**: SYS-001 personality keeps conversations on-topic

**Content Quality**

- **Risk**: Poor Spanish grammar or cultural inappropriateness in AI responses
- **Mitigation**: Manual review of all hardcoded conversation scripts
- **Fallback**: Template responses for common conversation turns

### **Deferred Safety Concerns**

- **Graze Mode moderation**: Open-ended input safety (post-MVP)
- **User-generated content**: No sharing features in MVP
- **Advanced content filtering**: Rely on Gemini's built-in safety

## **9.4 User Experience Risks**

### **First Impression Failures**

**Onboarding Complexity**

- **Risk**: Users confused about how to start conversations
- **Mitigation**: Single "Start Learning" button, minimal setup required

**Audio Quality Issues**

- **Risk**: Poor microphone setup leads to bad transcription
- **Mitigation**: Clear audio recording instructions, test recording feature

**Conversation Flow Confusion**

- **Risk**: Users don't understand when to speak or what to say
- **Mitigation**: Clear visual cues, simple conversation starters

### **Engagement Risks**

**Limited Content**

- **Risk**: Users complete 3 conversations and leave (nothing more to do)
- **Mitigation**: Clear messaging that this is early preview, more content coming

**Technical Frustration**

- **Risk**: Speech processing failures cause user abandonment
- **Mitigation**: Graceful error messages, easy retry options

## **9.6 Contingency Plans**

### **If Behind Schedule (Week 3 Check-in)**

**Priority Cuts**:

1. Remove conversation \#3 (ship with 2 conversations)
2. Hardcode AI responses (no Gemini API, pre-written scripts)
3. Text-only mode (remove speech processing entirely)

### **If Ahead of Schedule (Week 3 Check-in)**

**Safe Additions**:

1. Better UI polish and animations
2. Conversation \#4 and \#5 in same category
3. Basic progress indication (conversation completion tracking)

### **Critical Failure Points**

**Live Audio API Integration Doesn't Work**

- **Backup plan**: Traditional text-based conversation with typing interface + separate STS for voice input
- **Timeline impact**: -5 days development time (need to rebuild speech processing pipeline)

**Live Audio API Session Management Fails**

- **Backup plan**: Hardcoded conversation scripts with multiple response branches delivered via text-based Gemini calls
- **Timeline impact**: -7 days development time (revert to original prompt-assembly approach)

**Both Live Audio API and Fallback Text Approach Fail**

- **Minimum viable**: Text-based conversation practice with pre-written Spanish phrases and basic response validation
- **Value**: Still validates conversation-based learning approach, sets foundation for future Live Audio integration

---
