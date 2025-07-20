import { beforeEach, describe, expect, it, vi } from 'vitest';
import { logoutUser } from '../logoutUser';

// Mock the deleteCookies function
vi.mock('../../services/actions/deleteCookies', () => ({
  deleteCookies: vi.fn(),
}));

// Mock the authKey constant
vi.mock('@/contants/authkey', () => ({
  authKey: 'accessToken',
}));

import { deleteCookies } from '../../services/actions/deleteCookies';

describe('logoutUser', () => {
  const mockRouter = {
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should delete cookies and redirect to home page', async () => {
    await logoutUser(mockRouter as any);

    expect(deleteCookies).toHaveBeenCalledWith(['accessToken', 'refreshToken']);
    expect(mockRouter.push).toHaveBeenCalledWith('/');
    expect(mockRouter.refresh).toHaveBeenCalled();
  });

  it('should handle deleteCookies rejection gracefully', async () => {
    const mockError = new Error('Failed to delete cookies');
    (deleteCookies as any).mockRejectedValueOnce(mockError);

    await expect(logoutUser(mockRouter as any)).rejects.toThrow(
      'Failed to delete cookies'
    );

    // Router methods should not be called if deleteCookies fails
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(mockRouter.refresh).not.toHaveBeenCalled();
  });

  it('should call router methods in correct order', async () => {
    const callOrder: string[] = [];

    (deleteCookies as any).mockImplementation(() => {
      callOrder.push('deleteCookies');
      return Promise.resolve();
    });

    mockRouter.push.mockImplementation(() => {
      callOrder.push('push');
    });

    mockRouter.refresh.mockImplementation(() => {
      callOrder.push('refresh');
    });

    await logoutUser(mockRouter as any);

    expect(callOrder).toEqual(['deleteCookies', 'push', 'refresh']);
  });
});
