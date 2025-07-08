import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
import { logger } from '../utils';
import { Database } from '../types/database';

// Environment variables with fallbacks for development
const supabaseUrl = process.env['EXPO_PUBLIC_SUPABASE_URL'];
const supabaseAnonKey = process.env['EXPO_PUBLIC_SUPABASE_ANON_KEY'];

// Debug environment variables
console.log('🔍 Environment Variables Debug:', {
  supabaseUrl: supabaseUrl ? 'LOADED' : 'MISSING',
  supabaseAnonKey: supabaseAnonKey ? 'LOADED' : 'MISSING',
  actualUrl: supabaseUrl,
  actualKeyLength: supabaseAnonKey?.length || 0
});

// Validate environment variables (but don't crash the app)
if (!supabaseUrl || !supabaseAnonKey) {
  const missingVars = [];
  if (!supabaseUrl) missingVars.push('EXPO_PUBLIC_SUPABASE_URL');
  if (!supabaseAnonKey) missingVars.push('EXPO_PUBLIC_SUPABASE_ANON_KEY');
  
  const errorMessage = `❌ Missing required environment variables: ${missingVars.join(', ')}. Please check your .env file.`;
  console.error(errorMessage);
  logger.error(errorMessage);
  
  // Don't throw error - let the app continue but mark Supabase as unavailable
}

// Create Supabase client with React Native configuration
// Use fallback values if environment variables are missing (will fail gracefully)
export const supabase: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl || 'https://fallback.supabase.co', 
  supabaseAnonKey || 'fallback-key', 
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

// Enhanced session management with error handling
export const getCurrentSession = async (): Promise<Session | null> => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      logger.error('Failed to get current session:', error);
      return null;
    }
    
    return session;
  } catch (error) {
    logger.error('Unexpected error getting session:', error instanceof Error ? error : new Error(String(error)));
    return null;
  }
};

// Enhanced user management
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      logger.error('Failed to get current user:', error);
      return null;
    }
    
    return user;
  } catch (error) {
    logger.error('Unexpected error getting user:', error instanceof Error ? error : new Error(String(error)));
    return null;
  }
};

// Sign out with error handling
export const signOut = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      logger.error('Failed to sign out:', error);
      return false;
    }
    
    logger.info('User signed out successfully');
    return true;
  } catch (error) {
    logger.error('Unexpected error during sign out:', error instanceof Error ? error : new Error(String(error)));
    return false;
  }
};

// Database health check
export const testConnection = async (): Promise<boolean> => {
  try {
    // Check if we have real environment variables first
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('❌ Cannot test connection - missing environment variables');
      return false;
    }
    
    const { data, error } = await supabase
      .from('_supabase_migrations')
      .select('version')
      .limit(1);
    
    if (error) {
      // If migrations table doesn't exist, try a simple query
      const { error: healthError } = await supabase.auth.getSession();
      if (healthError) {
        console.log('❌ Supabase connection failed:', healthError.message);
        logger.error('Supabase connection failed:', healthError);
        return false;
      }
    }
    
    console.log('✅ Supabase connection successful!');
    logger.info('Supabase connection successful');
    return true;
  } catch (error) {
    console.log('❌ Supabase connection test failed:', error);
    logger.error('Supabase connection test failed:', error instanceof Error ? error : new Error(String(error)));
    return false;
  }
};

// Log Supabase client initialization
console.log('🔧 Supabase client initialized', {
  url: supabaseUrl || 'MISSING',
  hasAnonKey: !!supabaseAnonKey,
});

logger.info('Supabase client initialized', {
  url: supabaseUrl,
  hasAnonKey: !!supabaseAnonKey,
}); 