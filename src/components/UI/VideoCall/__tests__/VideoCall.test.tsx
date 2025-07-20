import { render, screen, waitFor } from '@/test/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import VideoCall from '../VideoCall';

// Mock the Redux hooks
const mockUseAppSelector = vi.fn();
vi.mock('@/redux/hooks', () => ({
  useAppSelector: () => mockUseAppSelector()
}));

// Mock the auth slice selector
vi.mock('@/redux/features/auth/authSlice', () => ({
  selectUser: vi.fn()
}));

// Mock Next.js router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  })
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, ...props }: any) => (
    <img src={src} alt={alt} width={width} height={height} {...props} />
  )
}));

// Mock AgoraUIKit
const mockEndCall = vi.fn();
vi.mock('agora-react-uikit', () => ({
  default: ({ rtcProps, callbacks }: any) => {
    // Store the EndCall callback for testing
    mockEndCall.mockImplementation(callbacks.EndCall);
    return (
      <div data-testid="agora-ui-kit">
        <div>Channel: {rtcProps.channel}</div>
        <div>App ID: {rtcProps.appId}</div>
        <button onClick={callbacks.EndCall} data-testid="end-call-button">
          End Call
        </button>
      </div>
    );
  }
}));

describe('VideoCall', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'PATIENT'
  };

  const videoCallingId = 'test-channel-123';

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAppSelector.mockReturnValue(mockUser);
    
    // Mock environment variable
    process.env.NEXT_PUBLIC_VIDEO_CALL_APP_ID = 'test-app-id';
  });

  describe('initial state', () => {
    it('should render start call button initially', () => {
      render(<VideoCall videoCallingId={videoCallingId} />);
      
      expect(screen.getByRole('button', { name: /start call/i })).toBeInTheDocument();
    });

    it('should render video call gif initially', () => {
      render(<VideoCall videoCallingId={videoCallingId} />);
      
      const gif = screen.getByRole('img', { name: /video call gif/i });
      expect(gif).toBeInTheDocument();
      expect(gif).toHaveAttribute('src', expect.stringContaining('giphy.gif'));
    });

    it('should not render Agora UI initially', () => {
      render(<VideoCall videoCallingId={videoCallingId} />);
      
      expect(screen.queryByTestId('agora-ui-kit')).not.toBeInTheDocument();
    });
  });

  describe('starting video call', () => {
    it('should start video call when button is clicked', async () => {
      const user = userEvent.setup();
      render(<VideoCall videoCallingId={videoCallingId} />);
      
      const startButton = screen.getByRole('button', { name: /start call/i });
      await user.click(startButton);
      
      expect(screen.getByTestId('agora-ui-kit')).toBeInTheDocument();
    });

    it('should hide start call interface when video call starts', async () => {
      const user = userEvent.setup();
      render(<VideoCall videoCallingId={videoCallingId} />);
      
      const startButton = screen.getByRole('button', { name: /start call/i });
      await user.click(startButton);
      
      expect(screen.queryByRole('button', { name: /start call/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('img', { name: /video call gif/i })).not.toBeInTheDocument();
    });
  });

  describe('Agora UI Kit integration', () => {
    it('should pass correct props to AgoraUIKit', async () => {
      const user = userEvent.setup();
      render(<VideoCall videoCallingId={videoCallingId} />);
      
      const startButton = screen.getByRole('button', { name: /start call/i });
      await user.click(startButton);
      
      expect(screen.getByText(`Channel: ${videoCallingId}`)).toBeInTheDocument();
      expect(screen.getByText('App ID: test-app-id')).toBeInTheDocument();
    });

    it('should handle missing app ID gracefully', async () => {
      delete process.env.NEXT_PUBLIC_VIDEO_CALL_APP_ID;
      const user = userEvent.setup();
      render(<VideoCall videoCallingId={videoCallingId} />);
      
      const startButton = screen.getByRole('button', { name: /start call/i });
      await user.click(startButton);
      
      expect(screen.getByText('App ID: test')).toBeInTheDocument();
    });
  });

  describe('ending video call', () => {
    it('should end call and redirect when EndCall callback is triggered', async () => {
      const user = userEvent.setup();
      render(<VideoCall videoCallingId={videoCallingId} />);
      
      // Start the call
      const startButton = screen.getByRole('button', { name: /start call/i });
      await user.click(startButton);
      
      // End the call
      const endButton = screen.getByTestId('end-call-button');
      await user.click(endButton);
      
      // Should redirect to dashboard
      expect(mockPush).toHaveBeenCalledWith('/dashboard/patient');
    });

    it('should return to start call interface after ending call', async () => {
      const user = userEvent.setup();
      render(<VideoCall videoCallingId={videoCallingId} />);
      
      // Start the call
      const startButton = screen.getByRole('button', { name: /start call/i });
      await user.click(startButton);
      
      // End the call
      const endButton = screen.getByTestId('end-call-button');
      await user.click(endButton);
      
      // Should show start call interface again
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /start call/i })).toBeInTheDocument();
      });
    });
  });

  describe('user role handling', () => {
    it('should redirect to correct dashboard based on user role', async () => {
      const doctorUser = { ...mockUser, role: 'DOCTOR' };
      mockUseAppSelector.mockReturnValue(doctorUser);
      
      const user = userEvent.setup();
      render(<VideoCall videoCallingId={videoCallingId} />);
      
      // Start and end the call
      const startButton = screen.getByRole('button', { name: /start call/i });
      await user.click(startButton);
      
      const endButton = screen.getByTestId('end-call-button');
      await user.click(endButton);
      
      expect(mockPush).toHaveBeenCalledWith('/dashboard/doctor');
    });

    it('should handle admin role', async () => {
      const adminUser = { ...mockUser, role: 'ADMIN' };
      mockUseAppSelector.mockReturnValue(adminUser);
      
      const user = userEvent.setup();
      render(<VideoCall videoCallingId={videoCallingId} />);
      
      // Start and end the call
      const startButton = screen.getByRole('button', { name: /start call/i });
      await user.click(startButton);
      
      const endButton = screen.getByTestId('end-call-button');
      await user.click(endButton);
      
      expect(mockPush).toHaveBeenCalledWith('/dashboard/admin');
    });
  });

  describe('accessibility', () => {
    it('should have accessible start call button', () => {
      render(<VideoCall videoCallingId={videoCallingId} />);
      
      const button = screen.getByRole('button', { name: /start call/i });
      expect(button).toBeInTheDocument();
    });

    it('should have accessible image with alt text', () => {
      render(<VideoCall videoCallingId={videoCallingId} />);
      
      const image = screen.getByRole('img', { name: /video call gif/i });
      expect(image).toHaveAttribute('alt', 'video call gif');
    });
  });

  describe('responsive layout', () => {
    it('should render with proper layout structure', () => {
      render(<VideoCall videoCallingId={videoCallingId} />);
      
      // Should render the main container elements
      expect(screen.getByRole('button', { name: /start call/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /video call gif/i })).toBeInTheDocument();
    });

    it('should handle full screen video call layout', async () => {
      const user = userEvent.setup();
      render(<VideoCall videoCallingId={videoCallingId} />);
      
      const startButton = screen.getByRole('button', { name: /start call/i });
      await user.click(startButton);
      
      const agoraKit = screen.getByTestId('agora-ui-kit');
      expect(agoraKit).toBeInTheDocument();
    });
  });

  describe('error handling', () => {
    it('should handle missing user gracefully', async () => {
      mockUseAppSelector.mockReturnValue(null);
      
      const user = userEvent.setup();
      render(<VideoCall videoCallingId={videoCallingId} />);
      
      const startButton = screen.getByRole('button', { name: /start call/i });
      await user.click(startButton);
      
      const endButton = screen.getByTestId('end-call-button');
      await user.click(endButton);
      
      // Should handle null user role gracefully
      expect(mockPush).toHaveBeenCalledWith('/dashboard/undefined');
    });

    it('should handle undefined user role', async () => {
      const userWithoutRole = { ...mockUser, role: undefined };
      mockUseAppSelector.mockReturnValue(userWithoutRole);
      
      const user = userEvent.setup();
      render(<VideoCall videoCallingId={videoCallingId} />);
      
      const startButton = screen.getByRole('button', { name: /start call/i });
      await user.click(startButton);
      
      const endButton = screen.getByTestId('end-call-button');
      await user.click(endButton);
      
      expect(mockPush).toHaveBeenCalledWith('/dashboard/undefined');
    });
  });

  describe('video calling ID', () => {
    it('should use provided video calling ID as channel', async () => {
      const customId = 'custom-channel-456';
      const user = userEvent.setup();
      render(<VideoCall videoCallingId={customId} />);
      
      const startButton = screen.getByRole('button', { name: /start call/i });
      await user.click(startButton);
      
      expect(screen.getByText(`Channel: ${customId}`)).toBeInTheDocument();
    });
  });
});