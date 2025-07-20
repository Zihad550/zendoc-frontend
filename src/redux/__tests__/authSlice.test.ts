import { describe, expect, it } from 'vitest';
import authSliceReducer, {
  logout,
  setCredentials,
} from '../features/auth/authSlice';

describe('authSlice', () => {
  const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
  };

  it('should return the initial state', () => {
    expect(authSliceReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle setCredentials', () => {
    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'PATIENT',
    };
    const token = 'jwt-token-123';

    const actual = authSliceReducer(
      initialState,
      setCredentials({ user, token })
    );

    expect(actual.user).toEqual(user);
    expect(actual.token).toBe(token);
    expect(actual.isAuthenticated).toBe(true);
  });

  it('should handle logout', () => {
    const authenticatedState = {
      user: {
        email: 'john@example.com',
        role: 'PATIENT' as any,
        iat: 1234567890,
        exp: 1234567890,
      },
      token: 'jwt-token-123',
      isAuthenticated: true,
    };

    const actual = authSliceReducer(authenticatedState, logout());

    expect(actual.user).toBeNull();
    expect(actual.token).toBeNull();
    expect(actual.isAuthenticated).toBe(false);
  });

  it('should handle partial user updates', () => {
    const authenticatedState = {
      user: {
        email: 'john@example.com',
        role: 'PATIENT' as any,
        iat: 1234567890,
        exp: 1234567890,
      },
      token: 'jwt-token-123',
      isAuthenticated: true,
    };

    const updatedUser = {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'PATIENT',
    };

    const actual = authSliceReducer(
      authenticatedState,
      setCredentials({ user: updatedUser, token: 'jwt-token-123' })
    );

    expect(actual.user).toEqual(updatedUser);
    expect(actual.token).toBe('jwt-token-123');
    expect(actual.isAuthenticated).toBe(true);
  });

  it('should handle setting credentials with different roles', () => {
    const doctorUser = {
      id: '2',
      name: 'Dr. Jane Smith',
      email: 'jane@example.com',
      role: 'DOCTOR',
    };

    const actual = authSliceReducer(
      initialState,
      setCredentials({ user: doctorUser, token: 'doctor-token' })
    );

    expect(actual.user?.role).toBe('DOCTOR');
    expect(actual.isAuthenticated).toBe(true);
  });
});
