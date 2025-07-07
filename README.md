# 🎙️ Shira AI Conversation Builder

[![CI/CD Pipeline](https://github.com/e2sway/shira-ai-convo-build/actions/workflows/ci.yml/badge.svg)](https://github.com/e2sway/shira-ai-convo-build/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)](https://expo.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A React Native mobile application for AI-powered conversations with real-time audio processing, built with Expo and TypeScript.

## ✨ Features

- 🎤 **Real-time Audio Processing** - High-quality audio recording and playback
- 🤖 **AI Conversation Interface** - Seamless AI interaction with natural conversation flow
- 📱 **Cross-Platform** - Runs on both iOS and Android
- 🔧 **TypeScript** - Full type safety and excellent developer experience
- 🧪 **Comprehensive Testing** - Unit and integration tests with 70% coverage
- 🛡️ **Error Handling** - Robust error boundaries and logging
- ⚡ **Performance Optimized** - React.memo, useCallback, and efficient state management

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or 20.x
- npm or yarn
- Expo CLI
- iOS Simulator (macOS) or Android Emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/e2sway/shira-ai-convo-build.git
cd shira-ai-convo-build

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running on Simulators

```bash
# iOS Simulator (macOS only)
npx expo start --ios

# Android Emulator
npx expo start --android

# Web browser (for testing)
npx expo start --web
```

## 🏗️ Architecture

### Tech Stack

- **Framework**: React Native with Expo managed workflow
- **Language**: TypeScript with strict mode
- **Navigation**: React Navigation 6
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Audio**: Expo AV
- **Testing**: Jest + React Native Testing Library
- **CI/CD**: GitHub Actions

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── ErrorBoundary.tsx
│   └── __tests__/
├── screens/            # Application screens
│   ├── ConversationScreen.tsx
│   ├── HistoryScreen.tsx
│   ├── OnboardingScreen.tsx
│   ├── SettingsScreen.tsx
│   └── __tests__/
├── navigation/         # Navigation configuration
├── services/          # API services and business logic
├── stores/           # Zustand state management
├── hooks/            # Custom React hooks
├── utils/            # Utility functions and helpers
├── types/            # TypeScript type definitions
└── constants/        # App constants and theme
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests for CI
npm run test:ci
```

### Test Coverage

- Unit tests for all components
- Integration tests for screens
- Navigation flow testing
- Error boundary testing
- Current coverage: 70% minimum threshold

## 🔧 Development

### Available Scripts

```bash
npm start           # Start Expo development server
npm test            # Run test suite
npm run lint        # Run ESLint
npm run type-check  # Run TypeScript compiler check
npm run quality-check # Run full quality pipeline (lint + type-check + test)
```

### Code Quality

- **ESLint** with TypeScript rules
- **TypeScript** strict mode enabled
- **Prettier** for code formatting
- **Husky** for pre-commit hooks (planned)
- **Jest** for testing with coverage reports

## 📱 Features Overview

### Current Implementation

- ✅ Project scaffolding with TypeScript
- ✅ React Navigation setup
- ✅ Core dependencies installed (Expo AV, Zustand, React Query)
- ✅ Placeholder screens with navigation
- ✅ Error handling and logging system
- ✅ Comprehensive testing infrastructure
- ✅ CI/CD pipeline with GitHub Actions

### Planned Features

- 🔄 Real-time audio conversation implementation
- 🔄 AI backend integration
- 🔄 Voice recognition and synthesis
- 🔄 Conversation history and persistence
- 🔄 User preferences and settings
- 🔄 Offline capability
- 🔄 Push notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Write tests for new features
- Maintain code coverage above 70%
- Use conventional commit messages
- Ensure all CI checks pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support, email [your-email@example.com] or create an issue on GitHub.

## 🔗 Related Links

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Native](https://reactnative.dev/)

---

**Built with ❤️ using React Native and TypeScript**
