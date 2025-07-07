// Design System Constants for Shira AI Conversation Builder

// Color Palette
export const COLORS = {
  // Primary Brand Colors
  PRIMARY: '#3498db',     // Bright blue - main brand color
  SECONDARY: '#2ecc71',   // Green - success/positive actions
  ACCENT: '#e74c3c',      // Red - alerts/important actions

  // Neutral Colors
  WHITE: '#ffffff',
  BLACK: '#000000',
  GRAY_LIGHT: '#ecf0f1',
  GRAY_MEDIUM: '#95a5a6',
  GRAY_DARK: '#2c3e50',

  // Background Colors
  BACKGROUND_PRIMARY: '#f8f9fa',
  BACKGROUND_SECONDARY: '#ffffff',
  BACKGROUND_TERTIARY: '#ecf0f1',
  BACKGROUND: '#f8f9fa',           // Default background
  CARD_BACKGROUND: '#ffffff',      // Card background

  // Text Colors
  TEXT_PRIMARY: '#2c3e50',
  TEXT_SECONDARY: '#34495e',
  TEXT_TERTIARY: '#7f8c8d',
  TEXT_INVERSE: '#ffffff',

  // Status Colors
  SUCCESS: '#27ae60',
  WARNING: '#f39c12',
  ERROR: '#e74c3c',
  INFO: '#3498db',

  // Spanish Learning Theme Colors
  SPANISH_ORANGE: '#e67e22',
  CULTURAL_WARM: '#d35400',
} as const;

// Spacing Scale (based on 4px grid)
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 40,
  XXXL: 48,
} as const;

// Typography Scale
export const FONT_SIZES = {
  XS: 12,
  SM: 14,
  MD: 16,
  LG: 18,
  XL: 20,
  XXL: 24,
  XXXL: 32,
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
  ROUND: 50,
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
  BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.shira-ai.com',
  AUTH: '/auth',
  CONVERSATIONS: '/conversations',
  USERS: '/users',
  ANALYTICS: '/analytics',
} as const;

// Application Configuration
export const APP_CONFIG = {
  TIMEOUT: 10000,                    // 10 seconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,                 // 1 second
  DEFAULT_LANGUAGE: 'es',            // Spanish
  SUPPORTED_LANGUAGES: ['es', 'en'],
  VERSION: '1.0.0',
  ENVIRONMENT: process.env.NODE_ENV || 'development',
} as const; 