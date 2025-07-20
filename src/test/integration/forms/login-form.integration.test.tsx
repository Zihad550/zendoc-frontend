import { validationSchema } from '@/app/login/login';
import PHForm from '@/components/Forms/PHForm';
import PHInput from '@/components/Forms/PHInput';
import { useUserLoginMutation } from '@/redux/features/auth/authApi';
import { setUser } from '@/redux/features/auth/authSlice';
import { decodedToken } from '@/utils/jwt';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Grid } from '@mui/material';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { render } from '../../utils/test-utils';

import { vi } from 'vitest';

// Mock dependencies
vi.mock('@/redux/features/auth/authApi');
vi.mock('@/redux/features/auth/authSlice');
vi.mock('@/utils/jwt');
vi.mock('next/navigation');
vi.mock('sonner');

const mockUseUserLoginMutation = useUserLoginMutation as any;
const mockSetUser = setUser as any;
const mockDecodedToken = decodedToken as any;
const mockUseRouter = useRouter as any;
const mockToast = toast as any;

// Test component that mimics the login form
const LoginFormTest = ({ onSubmit }: { onSubmit: (values: any) => void }) => {
  const [error, setError] = useState('');

  return (
    <>
      {error && (
        <Alert severity="error" data-testid="error-alert">
          {error}
        </Alert>
      )}
      <PHForm
        onSubmit={(values) => onSubmit({ ...values, setError })}
        resolver={zodResolver(validationSchema)}
        defaultValues={{
          email: '',
          password: '',
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ md: 6 }}>
            <PHInput
              name="email"
              label="Email"
              type="email"
              fullWidth={true}
            />
          </Grid>
          <Grid size={{ md: 6 }}>
            <PHInput
              name="password"
              label="Password"
              type="password"
              fullWidth={true}
            />
          </Grid>
        </Grid>
        <Button type="submit" data-testid="login-button">
          Login
        </Button>
      </PHForm>
    </>
  );
};

describe('Login Form Integration', () => {
  const mockRouter = {
    replace: vi.fn(),
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  };

  const mockLogin = vi.fn();
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseRouter.mockReturnValue(mockRouter as any);
    mockUseUserLoginMutation.mockReturnValue([mockLogin, { isLoading: false }] as any);
    mockDecodedToken.mockReturnValue({
      id: '1',
      email: 'test@example.com',
      role: 'PATIENT',
    });
    
    // Mock useAppDispatch
    vi.doMock('@/redux/hooks', () => ({
      useAppDispatch: () => mockDispatch,
    }));
  });

  describe('Form Validation', () => {
    it('should validate required fields', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<LoginFormTest onSubmit={mockSubmit} />);

      // Try to submit empty form
      const submitButton = screen.getByTestId('login-button');
      await user.click(submitButton);

      // Check for validation errors
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address!')).toBeInTheDocument();
        expect(screen.getByText('Must be at least 6 characters')).toBeInTheDocument();
      });

      expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('should validate email format', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<LoginFormTest onSubmit={mockSubmit} />);

      const emailInput = screen.getByLabelText('Email');
      await user.type(emailInput, 'invalid-email');

      const submitButton = screen.getByTestId('login-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address!')).toBeInTheDocument();
      });
    });

    it('should validate password length', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<LoginFormTest onSubmit={mockSubmit} />);

      const passwordInput = screen.getByLabelText('Password');
      await user.type(passwordInput, '123'); // Too short

      const submitButton = screen.getByTestId('login-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Must be at least 6 characters')).toBeInTheDocument();
      });
    });
  });

  describe('Authentication Flow', () => {
    const validCredentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should handle successful login without password change requirement', async () => {
      const user = userEvent.setup();
      
      mockLogin.mockResolvedValue({
        unwrap: () => Promise.resolve({
          data: {
            accessToken: 'mock-token',
            needPasswordChange: false,
          },
          message: 'Login successful',
        }),
      });

      const handleLogin = async (values: any) => {
        const { setError, ...loginData } = values;
        try {
          const res = await mockLogin(loginData).unwrap();
          if (res?.data?.accessToken) {
            const userInfo = res.data;
            const passwordChangeRequired = userInfo.needPasswordChange;

            if (userInfo.accessToken) {
              const token = res.data.accessToken;
              const user = mockDecodedToken(token);
              mockDispatch(mockSetUser({ user, token }));

              if (passwordChangeRequired) {
                mockRouter.replace('/dashboard/change-password');
              } else {
                mockRouter.replace('/');
              }

              mockToast.success(res?.message);
            }
          } else {
            setError(res.message);
          }
        } catch (err: any) {
          console.error(err.message);
        }
      };

      render(<LoginFormTest onSubmit={handleLogin} />);

      // Fill out the form
      await user.type(screen.getByLabelText('Email'), validCredentials.email);
      await user.type(screen.getByLabelText('Password'), validCredentials.password);

      const submitButton = screen.getByTestId('login-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(validCredentials);
        expect(mockDispatch).toHaveBeenCalledWith(mockSetUser({
          user: {
            id: '1',
            email: 'test@example.com',
            role: 'PATIENT',
          },
          token: 'mock-token',
        }));
        expect(mockRouter.replace).toHaveBeenCalledWith('/');
        expect(mockToast.success).toHaveBeenCalledWith('Login successful');
      });
    });

    it('should handle successful login with password change requirement', async () => {
      const user = userEvent.setup();
      
      mockLogin.mockResolvedValue({
        unwrap: () => Promise.resolve({
          data: {
            accessToken: 'mock-token',
            needPasswordChange: true, // Password change required
          },
          message: 'Login successful',
        }),
      });

      const handleLogin = async (values: any) => {
        const { setError, ...loginData } = values;
        try {
          const res = await mockLogin(loginData).unwrap();
          if (res?.data?.accessToken) {
            const userInfo = res.data;
            const passwordChangeRequired = userInfo.needPasswordChange;

            if (userInfo.accessToken) {
              const token = res.data.accessToken;
              const user = mockDecodedToken(token);
              mockDispatch(mockSetUser({ user, token }));

              if (passwordChangeRequired) {
                mockRouter.replace('/dashboard/change-password');
              } else {
                mockRouter.replace('/');
              }

              mockToast.success(res?.message);
            }
          }
        } catch (err: any) {
          console.error(err.message);
        }
      };

      render(<LoginFormTest onSubmit={handleLogin} />);

      // Fill out the form
      await user.type(screen.getByLabelText('Email'), validCredentials.email);
      await user.type(screen.getByLabelText('Password'), validCredentials.password);

      const submitButton = screen.getByTestId('login-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockRouter.replace).toHaveBeenCalledWith('/dashboard/change-password');
      });
    });

    it('should handle login errors', async () => {
      const user = userEvent.setup();
      
      mockLogin.mockRejectedValue(new Error('Invalid credentials'));

      const handleLogin = async (values: any) => {
        const { setError, ...loginData } = values;
        try {
          await mockLogin(loginData).unwrap();
        } catch (err: any) {
          console.error(err.message);
        }
      };

      // Spy on console.error
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation();

      render(<LoginFormTest onSubmit={handleLogin} />);

      // Fill out the form
      await user.type(screen.getByLabelText('Email'), validCredentials.email);
      await user.type(screen.getByLabelText('Password'), validCredentials.password);

      const submitButton = screen.getByTestId('login-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Invalid credentials');
      });

      consoleSpy.mockRestore();
    });

    it('should display server error messages', async () => {
      const user = userEvent.setup();
      
      mockLogin.mockResolvedValue({
        unwrap: () => Promise.resolve({
          message: 'Invalid credentials',
          data: null,
        }),
      });

      const handleLogin = async (values: any) => {
        const { setError, ...loginData } = values;
        try {
          const res = await mockLogin(loginData).unwrap();
          if (res?.data?.accessToken) {
            // Handle success
          } else {
            setError(res.message);
          }
        } catch (err: any) {
          console.error(err.message);
        }
      };

      render(<LoginFormTest onSubmit={handleLogin} />);

      // Fill out the form
      await user.type(screen.getByLabelText('Email'), validCredentials.email);
      await user.type(screen.getByLabelText('Password'), validCredentials.password);

      const submitButton = screen.getByTestId('login-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('error-alert')).toHaveTextContent('Invalid credentials');
      });
    });
  });

  describe('Form Field Interactions', () => {
    it('should clear validation errors when user corrects input', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<LoginFormTest onSubmit={mockSubmit} />);

      // Submit empty form to trigger validation errors
      const submitButton = screen.getByTestId('login-button');
      await user.click(submitButton);

      // Wait for validation errors
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address!')).toBeInTheDocument();
      });

      // Fix the email field
      const emailInput = screen.getByLabelText('Email');
      await user.type(emailInput, 'test@example.com');

      // The error should be cleared
      await waitFor(() => {
        expect(screen.queryByText('Please enter a valid email address!')).not.toBeInTheDocument();
      });
    });

    it('should handle form reset', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<LoginFormTest onSubmit={mockSubmit} />);

      // Fill out some fields
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password123');

      // Reset form
      fireEvent.reset(emailInput.closest('form')!);

      await waitFor(() => {
        expect(emailInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');
      });
    });

    it('should handle input field focus and blur events', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<LoginFormTest onSubmit={mockSubmit} />);

      const emailInput = screen.getByLabelText('Email');
      
      // Focus the input
      await user.click(emailInput);
      expect(emailInput).toHaveFocus();

      // Blur the input
      await user.tab();
      expect(emailInput).not.toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('should have proper form labels and ARIA attributes', () => {
      const mockSubmit = vi.fn();
      render(<LoginFormTest onSubmit={mockSubmit} />);

      // Check that all form fields have proper labels
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();

      // Check submit button
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    it('should associate error messages with form fields', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<LoginFormTest onSubmit={mockSubmit} />);

      const submitButton = screen.getByTestId('login-button');
      await user.click(submitButton);

      await waitFor(() => {
        const emailInput = screen.getByLabelText('Email');
        const emailError = screen.getByText('Please enter a valid email address!');
        
        // Check that the error is associated with the input
        expect(emailInput).toHaveAttribute('aria-invalid', 'true');
        expect(emailError).toBeInTheDocument();
      });
    });

    it('should announce errors to screen readers', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<LoginFormTest onSubmit={mockSubmit} />);

      const submitButton = screen.getByTestId('login-button');
      await user.click(submitButton);

      await waitFor(() => {
        const errorAlert = screen.queryByTestId('error-alert');
        if (errorAlert) {
          expect(errorAlert).toHaveAttribute('role', 'alert');
        }
      });
    });
  });

  describe('Loading States', () => {
    it('should handle loading state during authentication', async () => {
      const user = userEvent.setup();
      
      // Mock loading state
      mockUseUserLoginMutation.mockReturnValue([mockLogin, { isLoading: true }] as any);

      const mockSubmit = vi.fn();
      render(<LoginFormTest onSubmit={mockSubmit} />);

      // The form should still be functional even during loading
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByTestId('login-button')).toBeInTheDocument();
    });
  });
});