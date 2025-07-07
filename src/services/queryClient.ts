import { QueryClient } from '@tanstack/react-query';

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
      retry: 3,
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
      throwOnError: (error) => {
        console.error('Mutation Error:', error);
        return true; // Throw mutation errors for proper error boundaries
      },
    },
  },
});

export default queryClient;
