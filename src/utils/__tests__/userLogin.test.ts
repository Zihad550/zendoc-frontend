import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { decodedToken } from '../jwt';
import setAccessToken from '../setAccessToken';
import { userLoginV1 } from '../userLogin';

// Mock dependencies
vi.mock('../jwt');
vi.mock('../setAccessToken');

// Create a separate test environment without MSW
const originalFetch = global.fetch;

describe('userLogin', () => {
    const mockLoginData = {
        email: 'test@example.com',
        password: 'password123'
    };

    const mockSuccessResponse = {
        success: true,
        data: {
            accessToken: 'mock-access-token',
            needPasswordChange: false,
            user: {
                id: '1',
                email: 'test@example.com',
                role: 'PATIENT'
            }
        },
        message: 'Login successful'
    };

    const mockDecodedToken = {
        email: 'test@example.com',
        role: 'PATIENT',
        iat: 1234567890,
        exp: 1234567890 + 3600
    };

    beforeEach(() => {
        vi.clearAllMocks();
        process.env.NEXT_PUBLIC_BACKEND_API_URL = 'http://localhost:5000';

        // Mock fetch for this test suite
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.resetAllMocks();
        global.fetch = originalFetch;
    });

    describe('successful login scenarios', () => {
        it('should handle successful login without password change required', async () => {
            // Arrange
            const mockFetch = global.fetch as any;
            mockFetch.mockResolvedValueOnce({
                json: vi.fn().mockResolvedValue(mockSuccessResponse)
            });

            vi.mocked(decodedToken).mockReturnValue(mockDecodedToken);

            // Act
            const result = await userLoginV1(mockLoginData);

            // Assert
            expect(mockFetch).toHaveBeenCalledWith(
                'http://localhost:5000/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(mockLoginData),
                    credentials: 'include'
                }
            );

            expect(decodedToken).toHaveBeenCalledWith('mock-access-token');
            expect(setAccessToken).toHaveBeenCalledWith('mock-access-token', {
                redirect: '/'
            });
            expect(result).toEqual(mockSuccessResponse);
        });

        it('should handle successful login with password change required', async () => {
            // Arrange
            const responseWithPasswordChange = {
                ...mockSuccessResponse,
                data: {
                    ...mockSuccessResponse.data,
                    needPasswordChange: true
                }
            };

            const mockFetch = global.fetch as any;
            mockFetch.mockResolvedValueOnce({
                json: vi.fn().mockResolvedValue(responseWithPasswordChange)
            });

            vi.mocked(decodedToken).mockReturnValue(mockDecodedToken);

            // Act
            const result = await userLoginV1(mockLoginData);

            // Assert
            expect(setAccessToken).toHaveBeenCalledWith('mock-access-token', {
                redirect: '/dashboard/patient',
                passwordChangeRequired: true
            });
            expect(result).toEqual(responseWithPasswordChange);
        });

        it('should handle different user roles correctly', async () => {
            // Arrange
            const doctorToken = { ...mockDecodedToken, role: 'DOCTOR' };
            const responseWithDoctorRole = {
                ...mockSuccessResponse,
                data: {
                    ...mockSuccessResponse.data,
                    needPasswordChange: true
                }
            };

            const mockFetch = global.fetch as any;
            mockFetch.mockResolvedValueOnce({
                json: vi.fn().mockResolvedValue(responseWithDoctorRole)
            });

            vi.mocked(decodedToken).mockReturnValue(doctorToken);

            // Act
            await userLoginV1(mockLoginData);

            // Assert
            expect(setAccessToken).toHaveBeenCalledWith('mock-access-token', {
                redirect: '/dashboard/doctor',
                passwordChangeRequired: true
            });
        });
    });

    describe('failure scenarios', () => {
        it('should handle login failure without access token', async () => {
            // Arrange
            const failureResponse = {
                success: false,
                data: {},
                message: 'Invalid credentials'
            };

            const mockFetch = global.fetch as any;
            mockFetch.mockResolvedValueOnce({
                json: vi.fn().mockResolvedValue(failureResponse)
            });

            // Act
            const result = await userLoginV1(mockLoginData);

            // Assert
            expect(decodedToken).not.toHaveBeenCalled();
            expect(setAccessToken).not.toHaveBeenCalled();
            expect(result).toEqual(failureResponse);
        });

        it('should handle network errors', async () => {
            // Arrange
            const networkError = new Error('Network error');
            const mockFetch = global.fetch as any;
            mockFetch.mockRejectedValueOnce(networkError);

            // Act & Assert
            await expect(userLoginV1(mockLoginData)).rejects.toThrow('Network error');
            expect(decodedToken).not.toHaveBeenCalled();
            expect(setAccessToken).not.toHaveBeenCalled();
        });

        it('should handle invalid JSON response', async () => {
            // Arrange
            const mockFetch = global.fetch as any;
            mockFetch.mockResolvedValueOnce({
                json: vi.fn().mockRejectedValue(new Error('Invalid JSON'))
            });

            // Act & Assert
            await expect(userLoginV1(mockLoginData)).rejects.toThrow('Invalid JSON');
        });

        it('should handle malformed access token', async () => {
            // Arrange
            const responseWithInvalidToken = {
                ...mockSuccessResponse,
                data: {
                    ...mockSuccessResponse.data,
                    accessToken: 'invalid-token'
                }
            };

            const mockFetch = global.fetch as any;
            mockFetch.mockResolvedValueOnce({
                json: vi.fn().mockResolvedValue(responseWithInvalidToken)
            });

            vi.mocked(decodedToken).mockImplementation(() => {
                throw new Error('Invalid token');
            });

            // Act & Assert
            await expect(userLoginV1(mockLoginData)).rejects.toThrow('Invalid token');
        });
    });

    describe('edge cases', () => {
        it('should handle empty login data', async () => {
            // Arrange
            const emptyData = {};
            const mockFetch = global.fetch as any;
            mockFetch.mockResolvedValueOnce({
                json: vi.fn().mockResolvedValue({
                    success: false,
                    data: {},
                    message: 'Email and password are required'
                })
            });

            // Act
            const result = await userLoginV1(emptyData);

            // Assert
            expect(mockFetch).toHaveBeenCalledWith(
                'http://localhost:5000/auth/login',
                expect.objectContaining({
                    body: JSON.stringify(emptyData)
                })
            );
        });

        it('should handle missing environment variable', async () => {
            // Arrange
            delete process.env.NEXT_PUBLIC_BACKEND_API_URL;

            // Act & Assert
            await expect(userLoginV1(mockLoginData)).rejects.toThrow();
        });

        it('should handle null access token in response', async () => {
            // Arrange
            const responseWithNullToken = {
                success: true,
                data: {
                    accessToken: null,
                    needPasswordChange: false
                }
            };

            const mockFetch = global.fetch as any;
            mockFetch.mockResolvedValueOnce({
                json: vi.fn().mockResolvedValue(responseWithNullToken)
            });

            // Act
            const result = await userLoginV1(mockLoginData);

            // Assert
            expect(decodedToken).not.toHaveBeenCalled();
            expect(setAccessToken).not.toHaveBeenCalled();
            expect(result).toEqual(responseWithNullToken);
        });
    });

    describe('request configuration', () => {
        it('should include correct headers and credentials', async () => {
            // Arrange
            const mockFetch = global.fetch as any;
            mockFetch.mockResolvedValueOnce({
                json: vi.fn().mockResolvedValue(mockSuccessResponse)
            });

            // Act
            await userLoginV1(mockLoginData);

            // Assert
            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })
            );
        });

        it('should stringify request body correctly', async () => {
            // Arrange
            const complexData = {
                email: 'test@example.com',
                password: 'password123',
                rememberMe: true,
                metadata: { source: 'web' }
            };

            const mockFetch = global.fetch as any;
            mockFetch.mockResolvedValueOnce({
                json: vi.fn().mockResolvedValue(mockSuccessResponse)
            });

            // Act
            await userLoginV1(complexData);

            // Assert
            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    body: JSON.stringify(complexData)
                })
            );
        });
    });
});