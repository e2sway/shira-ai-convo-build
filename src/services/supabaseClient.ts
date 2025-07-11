import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Supabase configuration - use environment variables if available, fallback to hardcoded values
const supabaseUrl = process.env['EXPO_PUBLIC_SUPABASE_URL'] || 'https://alnxcgbwtmpzjahtkshc.supabase.co';
const supabaseAnonKey = process.env['EXPO_PUBLIC_SUPABASE_ANON_KEY'] || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsbnhjZ2J3dG1wemplaHRrc2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzNTQ0NzMsImV4cCI6MjA1MTkzMDQ3M30.Y7OjzNqm5u0mvHOLCgOGqxFPdZVmZg6VJWOJYfE6-t4';

// Debug logging to see what values are being used
console.log('🔍 Supabase URL:', supabaseUrl);
console.log('🔍 Supabase Key (first 20 chars):', supabaseAnonKey?.substring(0, 20) + '...');

// Create Supabase client with AsyncStorage for session persistence
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase; 