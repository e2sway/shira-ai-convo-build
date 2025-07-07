# Shira AI Conversation Builder

A React Native Expo TypeScript project for building intelligent conversation interfaces with AI integration.

## 🚀 Features

- **Modern React Native**: Built with Expo SDK and TypeScript
- **AI-Powered Conversations**: Intelligent conversation building capabilities
- **Task Management**: Integrated with Task Master AI for organized development
- **Cross-Platform**: Works on iOS, Android, and web
- **Type Safety**: Full TypeScript integration
- **Code Quality**: ESLint and Prettier configured
- **Modern UI**: Clean, responsive design with consistent styling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

For mobile development:
- [Expo Go](https://expo.dev/client) app on your mobile device
- Or iOS Simulator (Mac) / Android Emulator

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Shira_AI_Convo_build
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `i` for iOS simulator / `a` for Android emulator

## 📱 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start on Android device/emulator
- `npm run ios` - Start on iOS device/simulator
- `npm run web` - Start web version
- `npm run build` - Build the project

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Button.tsx
│   └── index.ts
├── screens/        # Screen components
│   ├── HomeScreen.tsx
│   └── index.ts
├── navigation/     # Navigation configuration
├── services/       # API and business logic
│   └── apiService.ts
├── hooks/          # Custom React hooks
│   └── useApi.ts
├── utils/          # Helper functions
│   └── index.ts
├── types/          # TypeScript type definitions
│   └── index.ts
└── constants/      # App constants
    └── index.ts
```

## 🎨 Styling

The project uses a consistent design system:
- **Colors**: Defined in `src/constants/index.ts`
- **Spacing**: Consistent spacing values
- **Typography**: Standardized font sizes and weights
- **Components**: Reusable styled components

## 🔧 Development Guidelines

Follow the rules defined in `.cursorrules`:
- Use TypeScript for all new files
- Follow component naming conventions (PascalCase)
- Use functional components with hooks
- Implement proper error handling
- Write self-documenting code

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test
```

## 🚀 Deployment

### Building for Production

```bash
# Build for all platforms
npm run build

# Platform-specific builds
npm run build:android
npm run build:ios
```

### Using EAS Build (Recommended)

1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Configure EAS:
   ```bash
   eas build:configure
   ```

3. Build for production:
   ```bash
   eas build --platform all
   ```

## 🤖 AI Integration

This project integrates with:
- **Task Master AI**: For project management and task organization
- **Conversation AI**: For intelligent conversation building

## 📚 Documentation

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Follow the coding guidelines in `.cursorrules`
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please contact the development team.

---

**Happy coding! 🎉** 