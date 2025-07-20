import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock JWT utility functions
const decodeToken = (token: string): any => {
  if (!token) {
    throw new Error('Token is required');
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }

  try {
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (error) {
    throw new Error('Failed to decode token');
  }
};

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decodeToken(token);
    if (!decoded.exp) {
      return false; // No expiration claim
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true; // Invalid token is considered expired
  }
};

const getTokenExpirationTime = (token: string): Date | null => {
  try {
    const decoded = decodeToken(token);
    if (!decoded.exp) {
      return null;
    }
    return new Date(decoded.exp * 1000);
  } catch (error) {
    return null;
  }
};

const getUserFromToken = (token: string): any => {
  try {
    const decoded = decodeToken(token);
    return {
      id: decoded.sub || decoded.userId,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name,
    };
  } catch (error) {
    return null;
  }
};

const isValidTokenFormat = (token: string): boolean => {
  if (!token || typeof token !== 'string') {
    return false;
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }

  // Check if each part is base64url encoded
  const base64UrlRegex = /^[A-Za-z0-9_-]+$/;
  return parts.every((part) => base64UrlRegex.test(part));
};

const getTokenTimeRemaining = (token: string): number => {
  try {
    const decoded = decodeToken(token);
    if (!decoded.exp) {
      return Infinity; // No expiration
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const timeRemaining = decoded.exp - currentTime;
    return Math.max(0, timeRemaining);
  } catch (error) {
    return 0;
  }
};

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('JWT Utility Functions', () => {
  // Sample JWT tokens for testing
  const validToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTksImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInJvbGUiOiJQQVRJRU5UIn0.invalid-signature';
  const expiredToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInJvbGUiOiJQQVRJRU5UIn0.invalid-signature';
  const invalidToken = 'invalid.token';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('decodeToken', () => {
    it('should decode a valid JWT token', () => {
      const decoded = decodeToken(validToken);

      expect(decoded).toHaveProperty('sub', '1234567890');
      expect(decoded).toHaveProperty('name', 'John Doe');
      expect(decoded).toHaveProperty('email', 'john@example.com');
      expect(decoded).toHaveProperty('role', 'PATIENT');
    });

    it('should throw error for empty token', () => {
      expect(() => decodeToken('')).toThrow('Token is required');
    });

    it('should throw error for invalid token format', () => {
      expect(() => decodeToken('invalid-token')).toThrow(
        'Invalid token format'
      );
    });

    it('should throw error for malformed token', () => {
      expect(() => decodeToken('header.invalid-payload.signature')).toThrow(
        'Failed to decode token'
      );
    });
  });

  describe('isTokenExpired', () => {
    it('should return false for valid non-expired token', () => {
      expect(isTokenExpired(validToken)).toBe(false);
    });

    it('should return true for expired token', () => {
      expect(isTokenExpired(expiredToken)).toBe(true);
    });

    it('should return true for invalid token', () => {
      expect(isTokenExpired(invalidToken)).toBe(true);
    });

    it('should return false for token without expiration', () => {
      const tokenWithoutExp =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.invalid-signature';
      expect(isTokenExpired(tokenWithoutExp)).toBe(false);
    });
  });

  describe('getTokenExpirationTime', () => {
    it('should return expiration date for valid token', () => {
      const expirationTime = getTokenExpirationTime(validToken);
      expect(expirationTime).toBeInstanceOf(Date);
      expect(expirationTime?.getTime()).toBeGreaterThan(Date.now());
    });

    it('should return null for token without expiration', () => {
      const tokenWithoutExp =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.invalid-signature';
      expect(getTokenExpirationTime(tokenWithoutExp)).toBeNull();
    });

    it('should return null for invalid token', () => {
      expect(getTokenExpirationTime(invalidToken)).toBeNull();
    });
  });

  describe('getUserFromToken', () => {
    it('should extract user information from token', () => {
      const user = getUserFromToken(validToken);

      expect(user).toEqual({
        id: '1234567890',
        email: 'john@example.com',
        role: 'PATIENT',
        name: 'John Doe',
      });
    });

    it('should return null for invalid token', () => {
      expect(getUserFromToken(invalidToken)).toBeNull();
    });

    it('should handle token with userId instead of sub', () => {
      const tokenWithUserId =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ODc2NTQzMjEwIiwibmFtZSI6IkphbmUgRG9lIiwiZW1haWwiOiJqYW5lQGV4YW1wbGUuY29tIiwicm9sZSI6IkRPQ1RPUiJ9.invalid-signature';
      const user = getUserFromToken(tokenWithUserId);

      expect(user?.id).toBe('9876543210');
      expect(user?.role).toBe('DOCTOR');
    });
  });

  describe('isValidTokenFormat', () => {
    it('should return true for valid token format', () => {
      expect(isValidTokenFormat(validToken)).toBe(true);
    });

    it('should return false for invalid formats', () => {
      expect(isValidTokenFormat('')).toBe(false);
      expect(isValidTokenFormat('invalid')).toBe(false);
      expect(isValidTokenFormat('header.payload')).toBe(false);
      expect(isValidTokenFormat('header.payload.signature.extra')).toBe(false);
    });

    it('should return false for non-string input', () => {
      expect(isValidTokenFormat(null as any)).toBe(false);
      expect(isValidTokenFormat(undefined as any)).toBe(false);
      expect(isValidTokenFormat(123 as any)).toBe(false);
    });

    it('should validate base64url encoding', () => {
      const invalidBase64Token = 'header!.payload@.signature#';
      expect(isValidTokenFormat(invalidBase64Token)).toBe(false);
    });
  });

  describe('getTokenTimeRemaining', () => {
    it('should return time remaining for valid token', () => {
      const timeRemaining = getTokenTimeRemaining(validToken);
      expect(timeRemaining).toBeGreaterThan(0);
    });

    it('should return 0 for expired token', () => {
      expect(getTokenTimeRemaining(expiredToken)).toBe(0);
    });

    it('should return 0 for invalid token', () => {
      expect(getTokenTimeRemaining(invalidToken)).toBe(0);
    });

    it('should return Infinity for token without expiration', () => {
      const tokenWithoutExp =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.invalid-signature';
      expect(getTokenTimeRemaining(tokenWithoutExp)).toBe(Infinity);
    });
  });

  describe('Token Storage Integration', () => {
    const TOKEN_KEY = 'auth_token';

    const setToken = (token: string): void => {
      localStorage.setItem(TOKEN_KEY, token);
    };

    const getToken = (): string | null => {
      return localStorage.getItem(TOKEN_KEY);
    };

    const removeToken = (): void => {
      localStorage.removeItem(TOKEN_KEY);
    };

    const isAuthenticated = (): boolean => {
      const token = getToken();
      if (!token) return false;
      return !isTokenExpired(token);
    };

    it('should store and retrieve token', () => {
      mockLocalStorage.setItem.mockImplementation((key, value) => {
        expect(key).toBe(TOKEN_KEY);
        expect(value).toBe(validToken);
      });

      mockLocalStorage.getItem.mockReturnValue(validToken);

      setToken(validToken);
      const retrievedToken = getToken();

      expect(retrievedToken).toBe(validToken);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        TOKEN_KEY,
        validToken
      );
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(TOKEN_KEY);
    });

    it('should remove token', () => {
      removeToken();
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(TOKEN_KEY);
    });

    it('should check authentication status', () => {
      // Valid token
      mockLocalStorage.getItem.mockReturnValue(validToken);
      expect(isAuthenticated()).toBe(true);

      // Expired token
      mockLocalStorage.getItem.mockReturnValue(expiredToken);
      expect(isAuthenticated()).toBe(false);

      // No token
      mockLocalStorage.getItem.mockReturnValue(null);
      expect(isAuthenticated()).toBe(false);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle tokens with special characters', () => {
      const tokenWithSpecialChars =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkrDtGhuIERvZSIsImVtYWlsIjoidGVzdCtlbWFpbEBleGFtcGxlLmNvbSJ9.invalid-signature';
      expect(() => decodeToken(tokenWithSpecialChars)).not.toThrow();
    });

    it('should handle very long tokens', () => {
      const longPayload = btoa(
        JSON.stringify({
          sub: '1234567890',
          name: 'A'.repeat(1000),
          email: 'test@example.com',
          role: 'PATIENT',
          exp: 9999999999,
        })
      );
      const longToken = `header.${longPayload}.signature`;

      expect(() => decodeToken(longToken)).not.toThrow();
    });

    it('should handle tokens with missing claims', () => {
      const minimalToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.invalid-signature';
      const user = getUserFromToken(minimalToken);

      expect(user?.id).toBe('1234567890');
      expect(user?.email).toBeUndefined();
      expect(user?.name).toBeUndefined();
      expect(user?.role).toBeUndefined();
    });

    it('should handle malformed JSON in payload', () => {
      const malformedToken = 'header.bWFsZm9ybWVkLWpzb24.signature';
      expect(() => decodeToken(malformedToken)).toThrow(
        'Failed to decode token'
      );
    });
  });
});
