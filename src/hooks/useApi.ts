// Custom Hook for API calls with state management

import { useState, useCallback } from 'react';
import { TApiResponse } from '../types';

interface IUseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface IUseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<TApiResponse<T>>;
  reset: () => void;
}

/**
 * Custom hook for managing API call state
 */
export const useApi = <T>(
  apiFunction: (...args: any[]) => Promise<TApiResponse<T>>
): IUseApiReturn<T> => {
  const [state, setState] = useState<IUseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<TApiResponse<T>> => {
             setState((prev: IUseApiState<T>) => ({
         ...prev,
         loading: true,
         error: null,
       }));

      try {
        const response = await apiFunction(...args);

        if (response.success) {
          setState({
            data: response.data || null,
            loading: false,
            error: null,
          });
        } else {
          setState({
            data: null,
            loading: false,
            error: response.error || 'An error occurred',
          });
        }

        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        
        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });

        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    execute,
    reset,
  };
}; 