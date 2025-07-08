import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase, getCurrentSession } from '../services/supabaseClient';
import { AuthService, SignUpData, SignInData } from '../services/authService';
import { logger } from '../utils';

// Types
export interface IUserProfile {
  id: string;
  email: string;
  full_name: string;
  learning_goals: string[];
  preferences: Record<string, any>;
  created_at: string;
  last_active: string;
}

export interface IAuthResponse {
  success: boolean;
  error?: AuthError | null;
}

export interface IAuthContext {
  // State
  user: User | null;
  userProfile: IUserProfile | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;

  // Methods
  signUp: (data: SignUpData) => Promise<IAuthResponse>;
  signIn: (data: SignInData) => Promise<IAuthResponse>;
  signOut: () => Promise<IAuthResponse>;
  resetPassword: (email: string) => Promise<IAuthResponse>;
  refreshProfile: () => Promise<void>;
}

// Create context
const AuthContext = createContext<IAuthContext | undefined>(undefined);

// Provider component
interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user && !!session;

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);

        // Get current session
        const currentSession = await getCurrentSession();
        setSession(currentSession);

        if (currentSession?.user) {
          setUser(currentSession.user);
          
          // Load user profile
          const profile = await AuthService.getUserProfile(currentSession.user.id);
          setUserProfile(profile);
        }
      } catch (error) {
        logger.error('Failed to initialize auth state', error as Error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Listen for auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        logger.info('Auth state changed', { event, hasSession: !!session });
        
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Load user profile when user signs in
          const profile = await AuthService.getUserProfile(session.user.id);
          setUserProfile(profile);
        } else {
          // Clear profile when user signs out
          setUserProfile(null);
        }

        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Sign up method
  const signUp = async (data: SignUpData): Promise<IAuthResponse> => {
    try {
      setLoading(true);
      const response = await AuthService.signUp(data);
      
      if (response.success && response.user) {
        logger.info('User signed up successfully', { email: data.email });
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      logger.error('Sign up error', error as Error);
      return { success: false, error: error as AuthError };
    } finally {
      setLoading(false);
    }
  };

  // Sign in method
  const signIn = async (data: SignInData): Promise<IAuthResponse> => {
    try {
      setLoading(true);
      const response = await AuthService.signIn(data);
      
      if (response.success && response.user) {
        logger.info('User signed in successfully', { email: data.email });
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      logger.error('Sign in error', error as Error);
      return { success: false, error: error as AuthError };
    } finally {
      setLoading(false);
    }
  };

  // Sign out method
  const signOut = async (): Promise<IAuthResponse> => {
    try {
      setLoading(true);
      const response = await AuthService.signOut();
      
      if (response.success) {
        logger.info('User signed out successfully');
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      logger.error('Sign out error', error as Error);
      return { success: false, error: error as AuthError };
    } finally {
      setLoading(false);
    }
  };

  // Reset password method
  const resetPassword = async (email: string): Promise<IAuthResponse> => {
    try {
      const response = await AuthService.resetPassword(email);
      
      if (response.success) {
        logger.info('Password reset email sent', { email });
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      logger.error('Password reset error', error as Error);
      return { success: false, error: error as AuthError };
    }
  };

  // Refresh user profile
  const refreshProfile = async () => {
    if (!user) return;

    try {
      const profile = await AuthService.getUserProfile(user.id);
      setUserProfile(profile);
    } catch (error) {
      logger.error('Failed to refresh user profile', error as Error);
    }
  };

  const value: IAuthContext = {
    // State
    user,
    userProfile,
    session,
    loading,
    isAuthenticated,

    // Methods
    signUp,
    signIn,
    signOut,
    resetPassword,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}; 