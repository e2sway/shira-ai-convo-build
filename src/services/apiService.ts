// API Service for Shira AI Conversation Builder

import { API_ENDPOINTS, APP_CONFIG } from '../constants';
import { TApiResponse, IApiError } from '../types';

class ApiService {
  private baseURL: string;
  private timeout: number;
  private authToken: string | null = null;

  constructor() {
    this.baseURL = API_ENDPOINTS.BASE_URL;
    this.timeout = APP_CONFIG.TIMEOUT;
  }

  /**
   * Sets the authentication token
   */
  setAuthToken(token: string): void {
    this.authToken = token;
  }

  /**
   * Removes the authentication token
   */
  clearAuthToken(): void {
    this.authToken = null;
  }

  /**
   * Creates request headers
   */
  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  /**
   * Makes a HTTP request
   */
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<TApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
        // Note: React Native doesn't support timeout in fetch directly
        // You might want to add a timeout wrapper here
      });

      const data = await response.json();

      if (!response.ok) {
        const error: IApiError = {
          code: response.status.toString(),
          message: data.message || 'An error occurred',
          details: data,
        };
               return {
         success: false,
         error: error.message,
       };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string): Promise<TApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: any): Promise<TApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<TApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<TApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'DELETE',
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: any): Promise<TApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// Export a singleton instance
export const apiService = new ApiService();
export default apiService; 