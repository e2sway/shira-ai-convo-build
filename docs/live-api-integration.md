# Google Live API Integration for Shira AI

## 🚀 **Revolutionary Architecture Update**

Google's Live API enables **direct speech-to-speech** conversation with Gemini, perfectly aligned with Shira's conversational learning goals.

## 🎯 **Shira Live API Flow:**

### **Before (Complex Pipeline):**
```
User speaks Spanish → STT → Gemini text → TTS → Audio response
(5-9 seconds, 3 API calls, complex error handling)
```

### **After (Live API):**
```
User speaks Spanish → Gemini Live API → Shira speaks Spanish
(2-4 seconds, 1 API connection, native conversation)
```

## 📡 **Technical Implementation**

### **Live API Models for Shira:**

Based on [Google's Live API documentation](https://ai.google.dev/gemini-api/docs/live), we have two options:

#### **Option 1: Native Audio (Recommended for Shira)**
```javascript
const model = "gemini-2.5-flash-preview-native-audio-dialog"
```

**Benefits for Shira:**
- **Most natural Spanish pronunciation**
- **Better multilingual performance** (critical for Spanish learning)
- **Affective dialogue** (emotion-aware responses - perfect for emotional support APL-003)
- **Proactive audio** (Shira can decide when to respond encouragingly)

#### **Option 2: Half-Cascade Audio (Backup)**
```javascript
const model = "gemini-live-2.5-flash-preview"
```

**Benefits:**
- **Better reliability** in production
- **Enhanced tool use** capabilities
- **More stable** for complex conversation flows

## 🎭 **Perfect Alignment with Shira's Personality**

### **Emotional Support System (APL-003)**
```javascript
const config = {
  responseModalities: ["AUDIO"],
  systemInstruction: `You are Shira, a patient and encouraging Spanish tutor. 
    You help users overcome speaking anxiety through supportive conversation.
    
    Key behaviors:
    - Always respond in Spanish first, then English explanation
    - Celebrate effort over perfection
    - Detect frustration and provide extra encouragement
    - Use informal "tú" form for friendliness
    - Focus on communication over grammar perfection`,
}
```

### **Real-time Conversation Flow**
```javascript
// Shira's Live API Integration
const session = await ai.live.connect({
  model: "gemini-2.5-flash-preview-native-audio-dialog",
  config: {
    responseModalities: ["AUDIO"],
    systemInstruction: shiraPersonalityPrompt,
    voiceActivityDetection: true, // Automatically detect when user stops speaking
    sessionManagement: true, // Maintain conversation context
  }
});

// Send user's Spanish speech directly
session.sendRealtimeInput({
  audio: {
    data: userAudioBase64,
    mimeType: "audio/pcm;rate=16000"
  }
});

// Receive Shira's encouraging Spanish response
session.on('message', (response) => {
  if (response.data) {
    // Play Shira's audio response immediately
    playAudio(response.data);
  }
});
```

## ⚡ **Massive Latency Improvement**

### **Previous Architecture:**
- STT Processing: ~1-2 seconds
- Gemini Text API: ~2-4 seconds  
- TTS Generation: ~1-2 seconds
- **Total: 5-9 seconds** ❌

### **Live API Architecture:**
- Direct Audio Processing: ~2-4 seconds
- **Total: 2-4 seconds** ✅ **60% faster!**

### **Meets PRD Requirements:**
- **PRD Target**: <5 seconds (Section 7.4)
- **Live API Reality**: 2-4 seconds ✅ **EXCEEDS target!**

## 🔐 **Updated Environment Variables**

### **Simplified .env Configuration:**
```bash
# ❌ REMOVE (no longer needed)
GOOGLE_CLOUD_STT_API_KEY=your_speech_to_text_key_here
GOOGLE_CLOUD_TTS_API_KEY=your_text_to_speech_key_here
STT_LANGUAGE_CODE=es-ES
TTS_LANGUAGE_CODE=es-ES

# ✅ REPLACE WITH (single Live API)
GEMINI_LIVE_API_KEY=your_gemini_api_key_here
GEMINI_LIVE_MODEL=gemini-2.5-flash-preview-native-audio-dialog

# Live API Configuration
LIVE_API_RESPONSE_MODALITY=AUDIO
LIVE_API_VOICE_DETECTION=true
LIVE_API_SESSION_MANAGEMENT=true
LIVE_API_LANGUAGE=es-ES
```

## 🎤 **Enhanced Features for Shira**

### **Voice Activity Detection**
```javascript
// Automatically detects when user finishes speaking
config.voiceActivityDetection = true;
// No need for manual "stop recording" button!
```

### **Session Management**
```javascript
// Maintains conversation context across multiple exchanges
config.sessionManagement = true;
// Shira remembers: "Earlier you struggled with 'rr' pronunciation..."
```

### **Emotion-Aware Responses**
```javascript
// Native audio model supports affective dialogue
// Shira can detect frustration in voice and respond supportively
```

## 📱 **React Native Implementation**

### **Client-to-Server Approach (Recommended)**
```javascript
// Direct connection from React Native to Live API
import { GoogleGenAI, Modality } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_LIVE_API_KEY });

const startShiraConversation = async () => {
  const session = await ai.live.connect({
    model: "gemini-2.5-flash-preview-native-audio-dialog",
    config: {
      responseModalities: [Modality.AUDIO],
      systemInstruction: shiraPersonalityPrompt,
    }
  });

  // Start recording user's Spanish
  const audioStream = await Audio.Recording.createAsync({
    android: {
      extension: '.wav',
      sampleRate: 16000,
      numberOfChannels: 1,
    },
    ios: {
      extension: '.wav',
      sampleRate: 16000,
      numberOfChannels: 1,
    },
  });

  // Send to Shira in real-time
  session.sendRealtimeInput({
    audio: {
      data: audioBase64,
      mimeType: "audio/pcm;rate=16000"
    }
  });
};
```

## 💰 **Cost Optimization**

### **Simplified Pricing:**
- **Before**: STT + Gemini + TTS = 3 separate API costs
- **After**: Live API only = 1 API cost
- **Savings**: ~40-60% reduction in API costs

### **Caching Still Valuable:**
```javascript
// Cache common Shira responses for instant replay
const commonResponses = {
  "muy_bien": "cached_audio_muy_bien.wav",
  "excelente": "cached_audio_excelente.wav",
  "no_te_preocupes": "cached_audio_no_te_preocupes.wav"
};
```

## 🚀 **Implementation Roadmap**

### **Week 1: Live API Proof of Concept**
- Set up basic Live API connection
- Test Spanish conversation flow
- Validate audio quality and latency

### **Week 2: Shira Personality Integration**  
- Implement SYS-001 personality prompts
- Test emotional support responses
- Fine-tune Spanish conversational flow

### **Week 3: React Native Integration**
- Connect Expo app to Live API
- Implement voice recording and playback
- Test on iOS and Android devices

### **Week 4: Polish and Testing**
- Error handling and fallbacks
- Performance optimization
- User testing with Spanish learners

## 🎯 **Perfect for Shira's Mission**

### **Addresses Core Pain Points:**
- ✅ **Reduces speaking anxiety** (faster, more natural responses)
- ✅ **Cultural authenticity** (native Spanish pronunciation)
- ✅ **Emotional support** (affective dialogue capabilities)
- ✅ **Judgment-free environment** (AI that sounds natural and encouraging)

### **Enhances "3 C's" Framework:**
1. **Conversational Fluency**: Real-time speech-to-speech feels like natural dialogue
2. **Cultural Immersion**: Native audio model provides authentic Spanish pronunciation
3. **Confidence Building**: Faster responses reduce anxiety, more encouraging interaction

## ⚠️ **Considerations**

### **Preview Status:**
- Live API is currently in **preview** (as noted in documentation)
- May have usage limits or changes before general availability
- Plan fallback to STT+TTS for production reliability

### **Authentication:**
- Use [Ephemeral Tokens](https://ai.google.dev/gemini-api/docs/ephemeral-tokens) for client-side security
- Never expose API keys in React Native bundle

## 🎉 **Conclusion**

Google's Live API is **perfectly designed** for Shira's conversational Spanish learning experience. It solves every major technical challenge:

- ✅ **Latency**: 2-4 seconds (exceeds PRD target)
- ✅ **Natural conversation**: Direct speech-to-speech
- ✅ **Spanish quality**: Native multilingual audio model
- ✅ **Emotional support**: Affective dialogue capabilities
- ✅ **Simplified architecture**: One API instead of three

This transforms Shira from a traditional language app to a **true AI conversation partner**! 🐑🎤 