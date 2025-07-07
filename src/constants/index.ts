// Design System Constants for Shira AI Conversation Builder

// Color Palette
export const COLORS = {
  // Primary Brand Colors
  PRIMARY: '#007AFF', // Bright blue - main brand color
  PRIMARY_LIGHT: '#4DA3FF',
  PRIMARY_DARK: '#0056CC',
  SECONDARY: '#FF9500', // Green - success/positive actions
  SECONDARY_LIGHT: '#FFB84D',
  SECONDARY_DARK: '#CC7700',
  ACCENT: '#e74c3c', // Red - alerts/important actions

  // Neutral Colors
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY_LIGHT: '#F2F2F7',
  GRAY_MEDIUM: '#8E8E93',
  GRAY_DARK: '#48484A',

  // Background Colors
  BACKGROUND_PRIMARY: '#f8f9fa',
  BACKGROUND_SECONDARY: '#ffffff',
  BACKGROUND_TERTIARY: '#ecf0f1',
  BACKGROUND: '#FFFFFF', // Default background
  CARD_BACKGROUND: '#F8F9FA', // Card background

  // Text Colors
  TEXT_PRIMARY: '#000000',
  TEXT_SECONDARY: '#6C757D',
  TEXT_TERTIARY: '#7f8c8d',
  TEXT_INVERSE: '#ffffff',
  TEXT_MUTED: '#ADB5BD',

  // Status Colors
  SUCCESS: '#28A745',
  WARNING: '#FFC107',
  ERROR: '#DC3545',
  INFO: '#17A2B8',

  // Spanish Learning Theme Colors
  SPANISH_ORANGE: '#e67e22',
  CULTURAL_WARM: '#d35400',

  // Audio visualization colors
  AUDIO_LOW: '#10B981',
  AUDIO_MEDIUM: '#F59E0B',
  AUDIO_HIGH: '#EF4444',
  AUDIO_BACKGROUND: '#1F2937',
} as const;

// Spacing Scale (based on 4px grid)
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
  XXXL: 48,
} as const;

// Typography Scale
export const FONT_SIZES = {
  XS: 12,
  SM: 14,
  MD: 16,
  LG: 18,
  XL: 24,
  XXL: 32,
  XXXL: 40,
  HEADING: 28,
  TITLE: 24,
  SUBTITLE: 18,
  BODY: 16,
  CAPTION: 14,
} as const;

// Font Weights
export const FONT_WEIGHTS = {
  LIGHT: '300',
  REGULAR: '400',
  MEDIUM: '500',
  SEMIBOLD: '600',
  BOLD: '700',
} as const;

// Border Radius Scale
export const BORDER_RADIUS = {
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 16,
  XXL: 24,
  ROUND: 999,
} as const;

// Animation Durations
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Screen Breakpoints
export const BREAKPOINTS = {
  SMALL: 320,
  MEDIUM: 768,
  LARGE: 1024,
} as const;

// Z-Index Scale
export const Z_INDEX = {
  MODAL: 1000,
  OVERLAY: 900,
  DROPDOWN: 800,
  HEADER: 700,
  TOOLTIP: 600,
} as const;

// API Configuration
export const API_ENDPOINTS = {
  BASE_URL:
    process.env['EXPO_PUBLIC_API_BASE_URL'] || 'https://api.shira-ai.com',
  AUTH: '/auth',
  CONVERSATIONS: '/conversations',
  USERS: '/users',
  ANALYTICS: '/analytics',
} as const;

// Application Configuration
export const APP_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
  DEFAULT_LANGUAGE: 'es', // Spanish
  SUPPORTED_LANGUAGES: ['es', 'en'],
  VERSION: '1.0.0',
  ENVIRONMENT: process.env['NODE_ENV'] || 'development',
  DEBUG: __DEV__,
} as const;

// Shadow constants
export const SHADOWS = {
  SMALL: {
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  MEDIUM: {
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  LARGE: {
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
} as const;

// Audio Configuration
export const AUDIO_CONFIG = {
  SAMPLE_RATE: 44100,
  BIT_DEPTH: 16,
  CHANNELS: 1,
  BUFFER_SIZE: 4096,
} as const;

// Export default constants object
export default {
  COLORS,
  SPACING,
  FONT_SIZES,
  FONT_WEIGHTS,
  BORDER_RADIUS,
  SHADOWS,
  ANIMATION,
  BREAKPOINTS,
  Z_INDEX,
  API_ENDPOINTS,
  APP_CONFIG,
  AUDIO_CONFIG,
} as const;
