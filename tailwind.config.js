/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Shira AI brand colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        // Audio visualization colors
        audio: {
          low: '#10b981',
          medium: '#f59e0b',
          high: '#ef4444',
          background: '#1f2937',
        },
        // Dark mode optimized colors
        dark: {
          background: '#0f172a',
          surface: '#1e293b',
          border: '#334155',
          text: '#f1f5f9',
          textSecondary: '#94a3b8',
        },
        // Light mode optimized colors
        light: {
          background: '#ffffff',
          surface: '#f8fafc',
          border: '#e2e8f0',
          text: '#0f172a',
          textSecondary: '#64748b',
        },
      },
      fontFamily: {
        // Custom fonts for React Native
        sans: ['System', 'ui-sans-serif'],
        mono: ['Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      spacing: {
        // Additional spacing for mobile layouts
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      borderRadius: {
        // Mobile-friendly border radius
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        // React Native compatible shadows
        audio: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        conversation: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        // Audio visualization animations
        'pulse-audio': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        wave: 'wave 2s ease-in-out infinite',
        recording: 'recording 1s ease-in-out infinite alternate',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.5)' },
        },
        recording: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
  // NativeWind compatibility
  corePlugins: {
    // Disable plugins that don't work well with React Native
    preflight: false,
  },
};
