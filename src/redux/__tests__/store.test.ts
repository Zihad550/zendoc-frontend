import { describe, expect, it } from 'vitest';
import { logout, setCredentials } from '../features/auth/authSlice';
import { store } from '../store';

describe('Redux Store', () => {
  it('should have initial state', () => {
    const state = store.getState();

    expect(state).toHaveProperty('auth');
    expect(state.auth).toEqual({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  });

  it('should handle auth actions', () => {
    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'PATIENT',
    };
    const token = 'jwt-token-123';

    // Test setCredentials
    store.dispatch(setCredentials({ user, token }));
    let state = store.getState();

    expect(state.auth.user).toEqual(user);
    expect(state.auth.token).toBe(token);
    expect(state.auth.isAuthenticated).toBe(true);

    // Test logout
    store.dispatch(logout());
    state = store.getState();

    expect(state.auth.user).toBeNull();
    expect(state.auth.token).toBeNull();
    expect(state.auth.isAuthenticated).toBe(false);
  });

  it('should have proper middleware setup', () => {
    // Test that the store has RTK Query middleware
    const state = store.getState();
    expect(state).toHaveProperty('api');
  });

  it('should handle multiple dispatches', () => {
    const user1 = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'PATIENT',
    };
    const user2 = {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'DOCTOR',
    };

    store.dispatch(setCredentials({ user: user1, token: 'token1' }));
    let state = store.getState();
    expect(state.auth.user).toEqual(user1);

    store.dispatch(setCredentials({ user: user2, token: 'token2' }));
    state = store.getState();
    expect(state.auth.user).toEqual(user2);
    expect(state.auth.token).toBe('token2');
  });

  it('should maintain state consistency', () => {
    const initialState = store.getState();

    // Perform some actions
    store.dispatch(
      setCredentials({
        user: {
          id: '1',
          name: 'Test',
          email: 'test@example.com',
          role: 'PATIENT',
        },
        token: 'test-token',
      })
    );
    store.dispatch(logout());

    const finalState = store.getState();

    // Should return to initial state after logout
    expect(finalState.auth).toEqual(initialState.auth);
  });

  it('should handle invalid actions gracefully', () => {
    const initialState = store.getState();

    // Dispatch an unknown action
    store.dispatch({ type: 'UNKNOWN_ACTION' });

    const state = store.getState();

    // State should remain unchanged
    expect(state).toEqual(initialState);
  });
});
