import '@testing-library/jest-native/extend-expect';
import { jest, beforeAll, afterAll } from '@jest/globals';

// Mock React Native modules
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

// Mock Expo modules
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      extra: {
        apiUrl: 'https://test-api.example.com',
      },
    },
  },
}));

jest.mock('expo-av', () => ({
  Audio: {
    requestPermissionsAsync: jest.fn(() => Promise.resolve({ granted: true })),
    setAudioModeAsync: jest.fn(() => Promise.resolve()),
    Recording: jest.fn(() => ({
      prepareToRecordAsync: jest.fn(),
      startAsync: jest.fn(),
      stopAndUnloadAsync: jest.fn(),
      getURI: jest.fn(() => 'mock-recording-uri'),
    })),
    Sound: jest.fn(() => ({
      loadAsync: jest.fn(),
      playAsync: jest.fn(),
      stopAsync: jest.fn(),
      unloadAsync: jest.fn(),
    })),
  },
}));

// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  NavigationContainer: ({ children }: { children: React.ReactNode }) =>
    children,
}));

// Mock Zustand store
jest.mock('./stores/appStore', () => ({
  useAppStore: () => ({
    audio: {
      isRecording: false,
      isPlaying: false,
      isConnected: false,
      conversationId: null,
      volume: 0.8,
      microphoneEnabled: true,
    },
    preferences: {
      theme: 'system',
      language: 'en',
      audioQuality: 'high',
      autoPlay: true,
      pushNotifications: true,
      hasCompletedOnboarding: false,
      onboardingVersion: '1.0.0',
    },
    isLoading: false,
    error: null,
    setAudioState: jest.fn(),
    setPreferences: jest.fn(),
    setLoading: jest.fn(),
    setError: jest.fn(),
    clearError: jest.fn(),
    startRecording: jest.fn(),
    stopRecording: jest.fn(),
    startPlayback: jest.fn(),
    stopPlayback: jest.fn(),
    toggleMicrophone: jest.fn(),
    setVolume: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
    resetAudioState: jest.fn(),
    resetApp: jest.fn(),
  }),
  useAudioState: () => ({
    isRecording: false,
    isPlaying: false,
    isConnected: false,
    conversationId: null,
    volume: 0.8,
    microphoneEnabled: true,
  }),
  usePreferences: () => ({
    theme: 'system',
    language: 'en',
    audioQuality: 'high',
    autoPlay: true,
    pushNotifications: true,
    hasCompletedOnboarding: false,
    onboardingVersion: '1.0.0',
  }),
  useLoadingState: () => false,
  useErrorState: () => null,
}));

// Mock React Query
jest.mock('@tanstack/react-query', () => ({
  QueryClient: jest.fn(() => ({
    clear: jest.fn(),
    invalidateQueries: jest.fn(),
  })),
  QueryClientProvider: ({ children }: { children: React.ReactNode }) =>
    children,
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

// Global test utilities
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};

// Silence warnings in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is deprecated')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
