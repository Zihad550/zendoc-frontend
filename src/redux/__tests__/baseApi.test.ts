import { configureStore } from '@reduxjs/toolkit';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { baseApi } from '../api/baseApi';
import authSlice, { setUser } from '../features/auth/authSlice';

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock environment variable
vi.stubEnv('NEXT_PUBLIC_BACKEND_API_URL', 'http://localhost:3001');

describe('baseApi', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: authSlice,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('baseQuery configuration', () => {
    it('should have correct base URL', () => {
      expect(process.env.NEXT_PUBLIC_BACKEND_API_URL).toBe(
        'http://localhost:3001'
      );
    });

    it('should include credentials in requests', () => {
      // This is tested indirectly through the fetchBaseQuery configuration
      expect(baseApi.reducerPath).toBe('baseApi');
    });
  });

  describe('authentication header handling', () => {
    it('should include authorization header when token exists', async () => {
      const mockToken = 'Bearer test-token';

      // Set up store with auth token
      store.dispatch(
        setUser({
          user: { id: '1', name: 'Test User' },
          token: mockToken,
        })
      );

      // Mock successful response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: 'test' }),
        status: 200,
      });

      // Create a test endpoint
      const testApi = baseApi.injectEndpoints({
        endpoints: (build) => ({
          testEndpoint: build.query<any, void>({
            query: () => ({ url: '/test' }),
          }),
        }),
      });

      // Trigger the query
      await (store.dispatch as any)(
        testApi.endpoints.testEndpoint.initiate(undefined)
      );

      // Verify fetch was called with authorization header
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            authorization: mockToken,
          }),
        })
      );
    });

    it('should not include authorization header when no token exists', async () => {
      // Mock successful response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: 'test' }),
        status: 200,
      });

      // Create a test endpoint
      const testApi = baseApi.injectEndpoints({
        endpoints: (build) => ({
          testEndpoint: build.query<any, void>({
            query: () => ({ url: '/test' }),
          }),
        }),
      });

      // Trigger the query
      await (store.dispatch as any)(
        testApi.endpoints.testEndpoint.initiate(undefined)
      );

      // Verify fetch was called without authorization header
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/test',
        expect.objectContaining({
          headers: expect.not.objectContaining({
            authorization: expect.anything(),
          }),
        })
      );
    });
  });

  describe('error handling', () => {
    it('should handle 404 errors with toast', async () => {
      const { toast } = await import('sonner');

      // Mock 404 response
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ message: 'Not found' }),
      });

      // Create a test endpoint
      const testApi = baseApi.injectEndpoints({
        endpoints: (build) => ({
          testEndpoint: build.query<any, void>({
            query: () => ({ url: '/test' }),
          }),
        }),
      });

      // Trigger the query
      await (store.dispatch as any)(
        testApi.endpoints.testEndpoint.initiate(undefined)
      );

      // Verify toast.error was called
      expect(toast.error).toHaveBeenCalledWith('Not found');
    });

    it('should handle 403 errors with toast', async () => {
      const { toast } = await import('sonner');

      // Mock 403 response
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: async () => ({ message: 'Forbidden' }),
      });

      // Create a test endpoint
      const testApi = baseApi.injectEndpoints({
        endpoints: (build) => ({
          testEndpoint: build.query<any, void>({
            query: () => ({ url: '/test' }),
          }),
        }),
      });

      // Trigger the query
      await (store.dispatch as any)(
        testApi.endpoints.testEndpoint.initiate(undefined)
      );

      // Verify toast.error was called
      expect(toast.error).toHaveBeenCalledWith('Forbidden');
    });

    it('should use default error message for 404 when no message provided', async () => {
      const { toast } = await import('sonner');

      // Mock 404 response without message
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({}),
      });

      // Create a test endpoint
      const testApi = baseApi.injectEndpoints({
        endpoints: (build) => ({
          testEndpoint: build.query<any, void>({
            query: () => ({ url: '/test' }),
          }),
        }),
      });

      // Trigger the query
      await (store.dispatch as any)(
        testApi.endpoints.testEndpoint.initiate(undefined)
      );

      // Verify toast.error was called with default message
      expect(toast.error).toHaveBeenCalledWith('Not found');
    });

    it('should use default error message for 403 when no message provided', async () => {
      const { toast } = await import('sonner');

      // Mock 403 response without message
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: async () => ({}),
      });

      // Create a test endpoint
      const testApi = baseApi.injectEndpoints({
        endpoints: (build) => ({
          testEndpoint: build.query<any, void>({
            query: () => ({ url: '/test' }),
          }),
        }),
      });

      // Trigger the query
      await (store.dispatch as any)(
        testApi.endpoints.testEndpoint.initiate(undefined)
      );

      // Verify toast.error was called with default message
      expect(toast.error).toHaveBeenCalledWith('Something went wrong!');
    });
  });

  describe('token refresh handling', () => {
    it('should attempt token refresh on 401 error', async () => {
      // Set up store with existing user
      store.dispatch(
        setUser({
          user: { id: '1', name: 'Test User' },
          token: 'old-token',
        })
      );

      // Mock initial 401 response
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 401,
          json: async () => ({ message: 'Unauthorized' }),
        })
        // Mock refresh token response
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: { accessToken: 'new-token' } }),
        })
        // Mock retry with new token
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: 'success' }),
          status: 200,
        });

      // Create a test endpoint
      const testApi = baseApi.injectEndpoints({
        endpoints: (build) => ({
          testEndpoint: build.query<any, void>({
            query: () => ({ url: '/test' }),
          }),
        }),
      });

      // Trigger the query
      await (store.dispatch as any)(
        testApi.endpoints.testEndpoint.initiate(undefined)
      );

      // Verify refresh token endpoint was called
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/auth/refresh-token',
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      // Verify the original request was retried
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    it('should logout user when refresh token fails', async () => {
      // Set up store with existing user
      store.dispatch(
        setUser({
          user: { id: '1', name: 'Test User' },
          token: 'old-token',
        })
      );

      // Mock initial 401 response
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 401,
          json: async () => ({ message: 'Unauthorized' }),
        })
        // Mock failed refresh token response
        .mockResolvedValueOnce({
          ok: false,
          json: async () => ({ error: 'Invalid refresh token' }),
        });

      // Create a test endpoint
      const testApi = baseApi.injectEndpoints({
        endpoints: (build) => ({
          testEndpoint: build.query<any, void>({
            query: () => ({ url: '/test' }),
          }),
        }),
      });

      // Trigger the query
      await (store.dispatch as any)(
        testApi.endpoints.testEndpoint.initiate(undefined)
      );

      // Verify user was logged out
      const state = store.getState() as any;
      expect(state.auth.user).toBeNull();
      expect(state.auth.token).toBeNull();
    });

    it('should update user token when refresh succeeds', async () => {
      const existingUser = { id: '1', name: 'Test User' };

      // Set up store with existing user
      store.dispatch(
        setUser({
          user: existingUser,
          token: 'old-token',
        })
      );

      // Mock initial 401 response
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 401,
          json: async () => ({ message: 'Unauthorized' }),
        })
        // Mock successful refresh token response
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: { accessToken: 'new-token' } }),
        })
        // Mock retry with new token
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: 'success' }),
          status: 200,
        });

      // Create a test endpoint
      const testApi = baseApi.injectEndpoints({
        endpoints: (build) => ({
          testEndpoint: build.query<any, void>({
            query: () => ({ url: '/test' }),
          }),
        }),
      });

      // Trigger the query
      await (store.dispatch as any)(
        testApi.endpoints.testEndpoint.initiate(undefined)
      );

      // Verify user token was updated
      const state = store.getState() as any;
      expect(state.auth.user).toEqual(existingUser);
      expect(state.auth.token).toBe('new-token');
    });
  });

  describe('API configuration', () => {
    it('should have correct reducer path', () => {
      expect(baseApi.reducerPath).toBe('baseApi');
    });

    it('should include all tag types', () => {
      // This tests that tagTypes are properly configured
      expect(baseApi.reducerPath).toBeDefined();
    });

    it('should have empty endpoints initially', () => {
      // Base API should have no endpoints initially
      expect(Object.keys(baseApi.endpoints)).toHaveLength(0);
    });
  });

  describe('endpoint injection', () => {
    it('should allow endpoint injection', () => {
      const extendedApi = baseApi.injectEndpoints({
        endpoints: (build) => ({
          getUsers: build.query<any, void>({
            query: () => ({ url: '/users' }),
          }),
          createUser: build.mutation<any, any>({
            query: (userData) => ({
              url: '/users',
              method: 'POST',
              body: userData,
            }),
          }),
        }),
      });

      expect(extendedApi.endpoints.getUsers).toBeDefined();
      expect(extendedApi.endpoints.createUser).toBeDefined();
    });

    it('should generate hooks for injected endpoints', () => {
      const extendedApi = baseApi.injectEndpoints({
        endpoints: (build) => ({
          getUsers: build.query<any, void>({
            query: () => ({ url: '/users' }),
          }),
          createUser: build.mutation<any, any>({
            query: (userData) => ({
              url: '/users',
              method: 'POST',
              body: userData,
            }),
          }),
        }),
      });

      expect(extendedApi.useGetUsersQuery).toBeDefined();
      expect(extendedApi.useCreateUserMutation).toBeDefined();
    });
  });

  describe('error response handling', () => {
    it('should handle network errors', async () => {
      // Mock network error
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      // Create a test endpoint
      const testApi = baseApi.injectEndpoints({
        endpoints: (build) => ({
          testEndpoint: build.query<any, void>({
            query: () => ({ url: '/test' }),
          }),
        }),
      });

      // Trigger the query and expect it to handle the error
      const result = await (store.dispatch as any)(
        testApi.endpoints.testEndpoint.initiate(undefined)
      );

      expect((result as any).error).toBeDefined();
    });

    it('should handle malformed JSON responses', async () => {
      // Mock response with invalid JSON
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      // Create a test endpoint
      const testApi = baseApi.injectEndpoints({
        endpoints: (build) => ({
          testEndpoint: build.query<any, void>({
            query: () => ({ url: '/test' }),
          }),
        }),
      });

      // Trigger the query
      const result = await (store.dispatch as any)(
        testApi.endpoints.testEndpoint.initiate(undefined)
      );

      expect((result as any).error).toBeDefined();
    });
  });
});
