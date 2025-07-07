import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient } from './src/services/queryClient';
import { AppNavigationContainer } from './src/navigation/NavigationContainer';
import HomeScreen from './src/screens/HomeScreen';

// NativeWind CSS import
import './global.css';

/**
 * Main App Component
 * Provides all necessary context providers and navigation setup
 */
export default function App(): React.ReactElement {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AppNavigationContainer>
          <StatusBar style="auto" />
          <HomeScreen />
        </AppNavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
} 