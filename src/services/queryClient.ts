import { QueryClient } from '@tanstack/react-query';
import { logger } from '../utils';

/**
 * React Query Client Configuration
 * Optimized for real-time audio applications with appropriate cache settings
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Reduce refetch frequency for better performance with audio streams
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime)
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      // Custom error handling for API failures
      throwOnError: (error) => {
        console.error('Query Error:', error);
        return false; // Don't throw errors, handle them in components
      },
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        logger.error(
          'Mutation failed:',
          error instanceof Error ? error : new Error(String(error))
        );
      },
      onSuccess: (data, variables) => {
        logger.info('Mutation succeeded', {
          hasData: !!data,
          hasVariables: !!variables,
        });
      },
    },
  },
});

export default queryClient;
