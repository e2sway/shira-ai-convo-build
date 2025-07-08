// Navigation Configuration for Shira AI Conversation Builder
// This will be implemented when adding React Navigation

// export * from './AppNavigator'; // Uncomment when AppNavigator is created

// TODO: Implement navigation configuration
// - Stack Navigator for main app flow
// - Tab Navigator for bottom navigation
// - Drawer Navigator (if needed)
// - Deep linking configuration
// - Authentication flow

// Placeholder export to prevent module errors
export const NavigationPlaceholder = 'Navigation setup pending';

// Navigation exports for Shira AI Conversation Builder

export { default as AppNavigationContainer } from './NavigationContainer';
export { default as AppNavigator, type RootStackParamList } from './AppNavigator';

// Navigation types and utilities can be added here as the app grows
export type NavigationStackParamList = {
  Home: undefined;
  Conversation: { conversationId?: string };
  Settings: undefined;
  History: undefined;
  Onboarding: undefined;
};
