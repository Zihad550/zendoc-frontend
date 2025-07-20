import { server } from '@/test/mocks/server';
import { http, HttpResponse } from 'msw';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

// Mock API functions
const mockApiCall = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
    }${endpoint}`,
    options
  );
  if (!response.ok) {
    throw new Error(`API call failed: ${response.status}`);
  }
  return response.json();
};

const mockAuthenticatedApiCall = async (
  endpoint: string,
  token: string,
  options?: RequestInit
) => {
  return mockApiCall(endpoint, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

describe('API Integration Tests', () => {
  beforeEach(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  describe('Authentication API', () => {
    it('should login successfully with valid credentials', async () => {
      server.use(
        http.post('*/api/auth/login', () => {
          return HttpResponse.json({
            success: true,
            data: {
              user: {
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                role: 'PATIENT',
              },
              token: 'jwt-token-123',
            },
          });
        })
      );

      const result = await mockApiCall('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'john@example.com',
          password: 'password123',
        }),
      });

      expect(result.success).toBe(true);
      expect(result.data.user.email).toBe('john@example.com');
      expect(result.data.token).toBe('jwt-token-123');
    });

    it('should handle login failure with invalid credentials', async () => {
      server.use(
        http.post('*/api/auth/login', () => {
          return HttpResponse.json(
            {
              success: false,
              message: 'Invalid credentials',
            },
            { status: 401 }
          );
        })
      );

      await expect(
        mockApiCall('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'invalid@example.com',
            password: 'wrongpassword',
          }),
        })
      ).rejects.toThrow('API call failed: 401');
    });

    it('should register new user successfully', async () => {
      server.use(
        http.post('*/api/auth/register', () => {
          return HttpResponse.json({
            success: true,
            data: {
              user: {
                id: '2',
                name: 'Jane Smith',
                email: 'jane@example.com',
                role: 'PATIENT',
              },
              token: 'jwt-token-456',
            },
          });
        })
      );

      const result = await mockApiCall('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Jane Smith',
          email: 'jane@example.com',
          password: 'password123',
          role: 'PATIENT',
        }),
      });

      expect(result.success).toBe(true);
      expect(result.data.user.name).toBe('Jane Smith');
    });
  });

  describe('Doctors API', () => {
    it('should fetch doctors list', async () => {
      server.use(
        http.get('*/api/doctors', () => {
          return HttpResponse.json({
            success: true,
            data: [
              {
                id: '1',
                name: 'Dr. John Smith',
                specialties: ['Cardiology'],
                experience: 10,
              },
              {
                id: '2',
                name: 'Dr. Jane Doe',
                specialties: ['Neurology'],
                experience: 8,
              },
            ],
          });
        })
      );

      const result = await mockApiCall('/doctors');

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.data[0].name).toBe('Dr. John Smith');
    });

    it('should fetch single doctor by ID', async () => {
      server.use(
        http.get('*/api/doctors/1', () => {
          return HttpResponse.json({
            success: true,
            data: {
              id: '1',
              name: 'Dr. John Smith',
              specialties: ['Cardiology'],
              experience: 10,
              bio: 'Experienced cardiologist',
            },
          });
        })
      );

      const result = await mockApiCall('/doctors/1');

      expect(result.success).toBe(true);
      expect(result.data.id).toBe('1');
      expect(result.data.name).toBe('Dr. John Smith');
    });

    it('should handle doctor not found', async () => {
      server.use(
        http.get('*/api/doctors/999', () => {
          return HttpResponse.json(
            {
              success: false,
              message: 'Doctor not found',
            },
            { status: 404 }
          );
        })
      );

      await expect(mockApiCall('/doctors/999')).rejects.toThrow(
        'API call failed: 404'
      );
    });
  });

  describe('Appointments API', () => {
    const mockToken = 'jwt-token-123';

    it('should create appointment with authentication', async () => {
      server.use(
        http.post('*/api/appointments', () => {
          return HttpResponse.json({
            success: true,
            data: {
              id: '1',
              doctorId: '1',
              patientId: '1',
              date: '2024-01-15',
              time: '10:00',
              status: 'SCHEDULED',
            },
          });
        })
      );

      const result = await mockAuthenticatedApiCall(
        '/appointments',
        mockToken,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            doctorId: '1',
            date: '2024-01-15',
            time: '10:00',
          }),
        }
      );

      expect(result.success).toBe(true);
      expect(result.data.status).toBe('SCHEDULED');
    });

    it('should fetch user appointments', async () => {
      server.use(
        http.get('*/api/appointments', () => {
          return HttpResponse.json({
            success: true,
            data: [
              {
                id: '1',
                doctorName: 'Dr. John Smith',
                date: '2024-01-15',
                time: '10:00',
                status: 'SCHEDULED',
              },
            ],
          });
        })
      );

      const result = await mockAuthenticatedApiCall('/appointments', mockToken);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].doctorName).toBe('Dr. John Smith');
    });

    it('should handle unauthorized appointment access', async () => {
      server.use(
        http.get('*/api/appointments', () => {
          return HttpResponse.json(
            {
              success: false,
              message: 'Unauthorized',
            },
            { status: 401 }
          );
        })
      );

      await expect(mockApiCall('/appointments')).rejects.toThrow(
        'API call failed: 401'
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors', async () => {
      server.use(
        http.get('*/api/doctors', () => {
          return HttpResponse.error();
        })
      );

      await expect(mockApiCall('/doctors')).rejects.toThrow();
    });

    it('should handle server errors', async () => {
      server.use(
        http.get('*/api/doctors', () => {
          return HttpResponse.json(
            {
              success: false,
              message: 'Internal server error',
            },
            { status: 500 }
          );
        })
      );

      await expect(mockApiCall('/doctors')).rejects.toThrow(
        'API call failed: 500'
      );
    });

    it('should handle malformed JSON responses', async () => {
      server.use(
        http.get('*/api/doctors', () => {
          return new Response('Invalid JSON', {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        })
      );

      await expect(mockApiCall('/doctors')).rejects.toThrow();
    });
  });

  describe('Request/Response Validation', () => {
    it('should validate request headers', async () => {
      server.use(
        http.post('*/api/appointments', ({ request }) => {
          const authHeader = request.headers.get('Authorization');
          if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return HttpResponse.json(
              {
                success: false,
                message: 'Missing or invalid authorization header',
              },
              { status: 401 }
            );
          }
          return HttpResponse.json({ success: true, data: {} });
        })
      );

      // Test with valid token
      const validResult = await mockAuthenticatedApiCall(
        '/appointments',
        'valid-token',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        }
      );
      expect(validResult.success).toBe(true);

      // Test without token
      await expect(
        mockApiCall('/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        })
      ).rejects.toThrow('API call failed: 401');
    });

    it('should validate request body', async () => {
      server.use(
        http.post('*/api/auth/register', async ({ request }) => {
          const body = (await request.json()) as any;
          if (!body?.email || !body?.password) {
            return HttpResponse.json(
              { success: false, message: 'Email and password are required' },
              { status: 400 }
            );
          }
          return HttpResponse.json({ success: true, data: {} });
        })
      );

      // Test with valid data
      const validResult = await mockApiCall('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123',
        }),
      });
      expect(validResult.success).toBe(true);

      // Test with invalid data
      await expect(
        mockApiCall('/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'test@example.com' }),
        })
      ).rejects.toThrow('API call failed: 400');
    });
  });
});
