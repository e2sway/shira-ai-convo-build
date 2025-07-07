import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

/**
 * Audio conversation state types
 */
export interface IAudioState {
  isRecording: boolean;
  isPlaying: boolean;
  isConnected: boolean;
  conversationId: string | null;
  volume: number;
  microphoneEnabled: boolean;
}

/**
 * User preferences and app settings
 */
export interface IUserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  audioQuality: 'low' | 'medium' | 'high';
  autoPlay: boolean;
  pushNotifications: boolean;
  hasCompletedOnboarding: boolean;
  onboardingVersion: string;
}

/**
 * Main application state interface
 */
export interface IAppState {
  // Audio conversation state
  audio: IAudioState;

  // User preferences
  preferences: IUserPreferences;

  // Loading states
  isLoading: boolean;

  // Error handling
  error: string | null;

  // Actions
  setAudioState: (partialState: Partial<IAudioState>) => void;
  setPreferences: (partialPrefs: Partial<IUserPreferences>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Audio-specific actions
  startRecording: () => void;
  stopRecording: () => void;
  startPlayback: () => void;
  stopPlayback: () => void;
  toggleMicrophone: () => void;
  setVolume: (volume: number) => void;

  // Connection actions
  connect: () => void;
  disconnect: () => void;

  // Reset actions
  resetAudioState: () => void;
  resetApp: () => void;
}

/**
 * Initial state values
 */
const initialAudioState: IAudioState = {
  isRecording: false,
  isPlaying: false,
  isConnected: false,
  conversationId: null,
  volume: 0.8,
  microphoneEnabled: true,
};

const initialPreferences: IUserPreferences = {
  theme: 'system',
  language: 'en',
  audioQuality: 'high',
  autoPlay: true,
  pushNotifications: true,
  hasCompletedOnboarding: false,
  onboardingVersion: '1.0.0',
};

/**
 * Main Zustand store with subscribeWithSelector middleware for fine-grained subscriptions
 */
export const useAppStore = create<IAppState>()(
  subscribeWithSelector((set) => ({
    // Initial state
    audio: initialAudioState,
    preferences: initialPreferences,
    isLoading: false,
    error: null,

    // General actions
    setAudioState: (partialState) =>
      set((state) => ({
        audio: { ...state.audio, ...partialState },
      })),

    setPreferences: (partialPrefs) =>
      set((state) => ({
        preferences: { ...state.preferences, ...partialPrefs },
      })),

    setLoading: (loading) => set({ isLoading: loading }),

    setError: (error) => set({ error }),

    clearError: () => set({ error: null }),

    // Audio-specific actions
    startRecording: () =>
      set((state) => ({
        audio: { ...state.audio, isRecording: true },
        error: null,
      })),

    stopRecording: () =>
      set((state) => ({
        audio: { ...state.audio, isRecording: false },
      })),

    startPlayback: () =>
      set((state) => ({
        audio: { ...state.audio, isPlaying: true },
        error: null,
      })),

    stopPlayback: () =>
      set((state) => ({
        audio: { ...state.audio, isPlaying: false },
      })),

    toggleMicrophone: () =>
      set((state) => ({
        audio: {
          ...state.audio,
          microphoneEnabled: !state.audio.microphoneEnabled,
        },
      })),

    setVolume: (volume) =>
      set((state) => ({
        audio: { ...state.audio, volume: Math.max(0, Math.min(1, volume)) },
      })),

    // Connection actions
    connect: () =>
      set((state) => ({
        audio: { ...state.audio, isConnected: true },
        error: null,
      })),

    disconnect: () =>
      set((state) => ({
        audio: {
          ...state.audio,
          isConnected: false,
          isRecording: false,
          isPlaying: false,
        },
      })),

    // Reset actions
    resetAudioState: () =>
      set(() => ({
        audio: initialAudioState,
      })),

    resetApp: () =>
      set(() => ({
        audio: initialAudioState,
        preferences: initialPreferences,
        isLoading: false,
        error: null,
      })),
  }))
);

/**
 * Selector hooks for specific parts of the state
 */
export const useAudioState = () => useAppStore((state) => state.audio);
export const usePreferences = () => useAppStore((state) => state.preferences);
export const useLoadingState = () => useAppStore((state) => state.isLoading);
export const useErrorState = () => useAppStore((state) => state.error);

export default useAppStore;
