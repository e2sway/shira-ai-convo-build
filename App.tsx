import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient } from './src/services/queryClient';
import { AppNavigationContainer } from './src/navigation/NavigationContainer';
import HomeScreen from './src/screens/HomeScreen';
// Temporarily disabled for debugging
// import { supabase, testConnection } from './src/services/supabaseClient';
import { logger } from './src/utils';

// NativeWind CSS import

/**
 * Main App Component
 * Provides all necessary context providers and navigation setup
 */
export default function App(): React.ReactElement {
  // Basic debugging - let's see if this code runs at all
  console.log('📱 App.tsx: App component is rendering');
  
  // Test Supabase connection on app startup
  useEffect(() => {
    console.log('🔥 App.tsx: useEffect is running');
    
    const initializeApp = async () => {
      console.log('🚀 App.tsx: initializeApp started');
      logger.info('🚀 App starting up...');
      
      // Check environment variables first
      console.log('🔍 Environment check:', {
        hasSupabaseUrl: !!process.env['EXPO_PUBLIC_SUPABASE_URL'],
        hasSupabaseKey: !!process.env['EXPO_PUBLIC_SUPABASE_ANON_KEY'],
        nodeEnv: process.env['NODE_ENV']
      });
      
      // Temporarily disabled for debugging
      // Test Supabase connection
      // const isConnected = await testConnection();
      // if (isConnected) {
      //   console.log('✅ Supabase connection successful!');
      //   logger.info('✅ Supabase connection successful!');
      // } else {
      //   console.log('❌ Supabase connection failed');
      //   logger.error('❌ Supabase connection failed - check your .env file');
      // }
      
      console.log('✅ Basic app initialization complete - Supabase disabled for debugging');
    };
    
    initializeApp().catch((error) => {
      console.error('💥 Error in initializeApp:', error);
    });
  }, []);

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
