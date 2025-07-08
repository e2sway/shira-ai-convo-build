import { supabase } from './supabaseClient';
import { logger } from '../utils';
import { User, AuthError } from '@supabase/supabase-js';

export interface AuthResponse {
  user: User | null;
  error: AuthError | null;
  success: boolean;
}

export interface SignUpData {
  email: string;
  password: string;
  fullName?: string;
  learningGoals?: string[];
}

export interface SignInData {
  email: string;
  password: string;
}

/**
 * Authentication Service
 * Handles user sign up, sign in, sign out, and session management
 */
export class AuthService {
  /**
   * Sign up a new user with email and password
   */
  static async signUp({ email, password, fullName, learningGoals }: SignUpData): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            learning_goals: learningGoals || [],
          },
        },
      });

      if (error) {
        logger.error('Sign up failed:', new Error(error.message));
        return { user: null, error, success: false };
      }

      if (data.user) {
        logger.info('User signed up successfully', { email: data.user.email });
        
        // Create user profile in our users table
        await this.createUserProfile(data.user.id, {
          email: data.user.email!,
          fullName: fullName || '',
          learningGoals: learningGoals || [],
        });
      }

      return { user: data.user, error: null, success: true };
    } catch (error) {
      const authError = error as AuthError;
      logger.error('Unexpected error during sign up:', authError);
      return { user: null, error: authError, success: false };
    }
  }

  /**
   * Sign in existing user with email and password
   */
  static async signIn({ email, password }: SignInData): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        logger.error('Sign in failed:', new Error(error.message));
        return { user: null, error, success: false };
      }

      logger.info('User signed in successfully', { email: data.user.email });
      return { user: data.user, error: null, success: true };
    } catch (error) {
      const authError = error as AuthError;
      logger.error('Unexpected error during sign in:', authError);
      return { user: null, error: authError, success: false };
    }
  }

  /**
   * Sign out current user
   */
  static async signOut(): Promise<{ success: boolean; error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        logger.error('Sign out failed:', error);
        return { success: false, error };
      }

      logger.info('User signed out successfully');
      return { success: true, error: null };
    } catch (error) {
      const authError = error as AuthError;
      logger.error('Unexpected error during sign out:', authError);
      return { success: false, error: authError };
    }
  }

  /**
   * Reset password for user
   */
  static async resetPassword(email: string): Promise<{ success: boolean; error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'exp://localhost:8081/reset-password',
      });

      if (error) {
        logger.error('Password reset failed:', error);
        return { success: false, error };
      }

      logger.info('Password reset email sent', { email });
      return { success: true, error: null };
    } catch (error) {
      const authError = error as AuthError;
      logger.error('Unexpected error during password reset:', authError);
      return { success: false, error: authError };
    }
  }

  /**
   * Create user profile in our users table
   */
  private static async createUserProfile(
    userId: string,
    profile: { email: string; fullName: string; learningGoals: string[] }
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('users')
        .insert([
          {
            id: userId,
            email: profile.email,
            full_name: profile.fullName,
            learning_goals: profile.learningGoals,
            preferences: {
              language: 'en',
              difficulty_level: 'beginner',
              session_length: 15,
            },
            created_at: new Date().toISOString(),
            last_active: new Date().toISOString(),
          },
        ]);

      if (error) {
        logger.error('Failed to create user profile:', error);
        throw error;
      }

      logger.info('User profile created successfully', { email: profile.email });
    } catch (error) {
      logger.error('Error creating user profile:', error);
      // Don't throw - sign up was successful even if profile creation failed
    }
  }

  /**
   * Get current user profile from our users table
   */
  static async getUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        logger.error('Failed to get user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      logger.error('Error getting user profile:', error);
      return null;
    }
  }

  /**
   * Update user profile
   */
  static async updateUserProfile(
    userId: string,
    updates: Partial<{
      fullName: string;
      learningGoals: string[];
      preferences: Record<string, any>;
    }>
  ) {
    try {
      const updateData: any = {};
      
      if (updates.fullName !== undefined) updateData.full_name = updates.fullName;
      if (updates.learningGoals !== undefined) updateData.learning_goals = updates.learningGoals;
      if (updates.preferences !== undefined) updateData.preferences = updates.preferences;
      
      updateData.last_active = new Date().toISOString();

      const { data, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        logger.error('Failed to update user profile:', error);
        return null;
      }

      logger.info('User profile updated successfully');
      return data;
    } catch (error) {
      logger.error('Error updating user profile:', error);
      return null;
    }
  }
} 