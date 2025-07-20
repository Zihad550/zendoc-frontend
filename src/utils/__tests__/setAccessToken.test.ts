import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock Next.js modules
const mockCookieSet = vi.fn();
const mockRedirect = vi.fn();

vi.mock('next/headers', () => ({
  cookies: () => Promise.resolve({
    set: mockCookieSet
  })
}));

vi.mock('next/navigation', () => ({
  redirect: mockRedirect
}));

// Import after mocking
import { authKey } from '@/contants/authkey';
import setAccessToken from '../setAccessToken';

describe('setAccessToken', () => {
  const mockToken = 'mock-jwt-token';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should set access token in cookies', async () => {
    // Act
    await setAccessToken(mockToken);

    // Assert
    expect(mockCookieSet).toHaveBeenCalledWith(authKey, mockToken);
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it('should redirect to change password when passwordChangeRequired is true', async () => {
    // Arrange
    const options = {
      passwordChangeRequired: true,
      redirect: '/dashboard/patient'
    };

    // Act
    await setAccessToken(mockToken, options);

    // Assert
    expect(mockCookieSet).toHaveBeenCalledWith(authKey, mockToken);
    expect(mockRedirect).toHaveBeenCalledWith('/dashboard/change-password');
  });

  it('should redirect to custom path when passwordChangeRequired is false', async () => {
    // Arrange
    const options = {
      passwordChangeRequired: false,
      redirect: '/dashboard/patient'
    };

    // Act
    await setAccessToken(mockToken, options);

    // Assert
    expect(mockCookieSet).toHaveBeenCalledWith(authKey, mockToken);
    expect(mockRedirect).toHaveBeenCalledWith('/dashboard/patient');
  });

  it('should redirect to custom path when passwordChangeRequired is not set', async () => {
    // Arrange
    const options = {
      redirect: '/dashboard/admin'
    };

    // Act
    await setAccessToken(mockToken, options);

    // Assert
    expect(mockRedirect).toHaveBeenCalledWith('/dashboard/admin');
  });

  it('should not redirect when no redirect option provided', async () => {
    // Act
    await setAccessToken(mockToken, {});

    // Assert
    expect(mockCookieSet).toHaveBeenCalledWith(authKey, mockToken);
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it('should handle undefined options', async () => {
    // Act
    await setAccessToken(mockToken, undefined);

    // Assert
    expect(mockCookieSet).toHaveBeenCalledWith(authKey, mockToken);
    expect(mockRedirect).not.toHaveBeenCalled();
  });
});