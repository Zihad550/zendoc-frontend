import { registerDefaultValues } from '@/app/register/register';
import PHForm from '@/components/Forms/PHForm';
import PHInput from '@/components/Forms/PHInput';
import { useUserLoginMutation } from '@/redux/features/auth/authApi';
import { setUser } from '@/redux/features/auth/authSlice';
import { registerPatient } from '@/services/actions/registerPatient';
import { decodedToken } from '@/utils/jwt';
import { modifyPayload } from '@/utils/modifyPayload';
import { registerValidationSchema } from '@/validations/register.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid } from '@mui/material';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { render } from '../../utils/test-utils';

import { vi } from 'vitest';

// Mock dependencies
vi.mock('@/services/actions/registerPatient');
vi.mock('@/redux/features/auth/authApi');
vi.mock('@/redux/features/auth/authSlice');
vi.mock('@/utils/jwt');
vi.mock('@/utils/modifyPayload');
vi.mock('next/navigation');
vi.mock('sonner');

const mockRegisterPatient = registerPatient as any;
const mockUseUserLoginMutation = useUserLoginMutation as any;
const mockSetUser = setUser as any;
const mockDecodedToken = decodedToken as any;
const mockModifyPayload = modifyPayload as any;
const mockUseRouter = useRouter as any;
const mockToast = toast as any;

// Test component that mimics the registration form
const RegistrationFormTest = ({ onSubmit }: { onSubmit: (values: any) => void }) => {
  return (
    <PHForm
      onSubmit={onSubmit}
      resolver={zodResolver(registerValidationSchema)}
      defaultValues={registerDefaultValues}
    >
      <Grid container spacing={2}>
        <Grid size={{ md: 12 }}>
          <PHInput label="Name" fullWidth={true} name="patient.name" />
        </Grid>
        <Grid size={{ md: 12 }}>
          <PHInput
            label="Email"
            type="email"
            fullWidth={true}
            name="patient.email"
          />
        </Grid>
        <Grid size={{ md: 6 }}>
          <PHInput
            label="Password"
            type="password"
            fullWidth={true}
            name="password"
          />
        </Grid>
        <Grid size={{ md: 6 }}>
          <PHInput
            label="Contact Number"
            type="tel"
            fullWidth={true}
            name="patient.contactNumber"
          />
        </Grid>
        <Grid size={{ md: 6 }}>
          <PHInput
            label="Address"
            fullWidth={true}
            name="patient.address"
          />
        </Grid>
      </Grid>
      <Button type="submit" data-testid="register-button">
        Register
      </Button>
    </PHForm>
  );
};

describe('Registration Form Integration', () => {
  const mockRouter = {
    replace: vi.fn(),
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  };

  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseRouter.mockReturnValue(mockRouter as any);
    mockUseUserLoginMutation.mockReturnValue([mockLogin, { isLoading: false }] as any);
    mockModifyPayload.mockImplementation((data) => data);
    mockDecodedToken.mockReturnValue({
      id: '1',
      email: 'test@example.com',
      role: 'PATIENT',
    });
  });

  describe('Form Validation', () => {
    it('should validate required fields', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<RegistrationFormTest onSubmit={mockSubmit} />);

      // Try to submit empty form
      const submitButton = screen.getByTestId('register-button');
      await user.click(submitButton);

      // Check for validation errors
      await waitFor(() => {
        expect(screen.getByText('Please enter your name!')).toBeInTheDocument();
        expect(screen.getByText('Please enter a valid email address!')).toBeInTheDocument();
        expect(screen.getByText('Must be at least 6 characters')).toBeInTheDocument();
        expect(screen.getByText('Please provide a valid phone number!')).toBeInTheDocument();
        expect(screen.getByText('Please enter your address!')).toBeInTheDocument();
      });

      expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('should validate email format', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<RegistrationFormTest onSubmit={mockSubmit} />);

      const emailInput = screen.getByLabelText('Email');
      await user.type(emailInput, 'invalid-email');

      const submitButton = screen.getByTestId('register-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address!')).toBeInTheDocument();
      });
    });

    it('should validate phone number format', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<RegistrationFormTest onSubmit={mockSubmit} />);

      const phoneInput = screen.getByLabelText('Contact Number');
      await user.type(phoneInput, '123'); // Invalid phone number

      const submitButton = screen.getByTestId('register-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please provide a valid phone number!')).toBeInTheDocument();
      });
    });

    it('should validate password length', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<RegistrationFormTest onSubmit={mockSubmit} />);

      const passwordInput = screen.getByLabelText('Password');
      await user.type(passwordInput, '123'); // Too short

      const submitButton = screen.getByTestId('register-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Must be at least 6 characters')).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    const validFormData = {
      patient: {
        name: 'John Doe',
        email: 'john@example.com',
        contactNumber: '12345678901',
        address: '123 Main St',
      },
      password: 'password123',
    };

    it('should submit form with valid data', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<RegistrationFormTest onSubmit={mockSubmit} />);

      // Fill out the form
      await user.type(screen.getByLabelText('Name'), validFormData.patient.name);
      await user.type(screen.getByLabelText('Email'), validFormData.patient.email);
      await user.type(screen.getByLabelText('Password'), validFormData.password);
      await user.type(screen.getByLabelText('Contact Number'), validFormData.patient.contactNumber);
      await user.type(screen.getByLabelText('Address'), validFormData.patient.address);

      const submitButton = screen.getByTestId('register-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(validFormData);
      });
    });

    it('should handle successful registration and login flow', async () => {
      const user = userEvent.setup();
      
      // Mock successful registration
      mockRegisterPatient.mockResolvedValue({
        data: { id: '1' },
      });

      // Mock successful login
      mockLogin.mockResolvedValue({
        unwrap: () => Promise.resolve({
          data: {
            accessToken: 'mock-token',
            needPasswordChange: false,
          },
          message: 'Login successful',
        }),
      });

      const handleRegister = async (values: any) => {
        const data = mockModifyPayload(values);
        try {
          const res = await mockRegisterPatient(data);
          if (res?.data?.id) {
            const loginRes = await mockLogin({
              password: values.password,
              email: values.patient.email,
            }).unwrap();
            if (loginRes?.data?.accessToken) {
              const userInfo = loginRes.data;
              const passwordChangeRequired = userInfo.needPasswordChange;

              if (userInfo.accessToken) {
                const token = loginRes.data.accessToken;
                const user = mockDecodedToken(token);
                mockSetUser({ user, token });

                if (passwordChangeRequired) {
                  mockRouter.replace('/dashboard/change-password');
                } else {
                  mockRouter.replace('/');
                }

                mockToast.success(loginRes?.message);
              }
            }
          }
        } catch (err: any) {
          console.error(err.message);
        }
      };

      render(<RegistrationFormTest onSubmit={handleRegister} />);

      // Fill out the form
      await user.type(screen.getByLabelText('Name'), validFormData.patient.name);
      await user.type(screen.getByLabelText('Email'), validFormData.patient.email);
      await user.type(screen.getByLabelText('Password'), validFormData.password);
      await user.type(screen.getByLabelText('Contact Number'), validFormData.patient.contactNumber);
      await user.type(screen.getByLabelText('Address'), validFormData.patient.address);

      const submitButton = screen.getByTestId('register-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockRegisterPatient).toHaveBeenCalledWith(validFormData);
        expect(mockLogin).toHaveBeenCalledWith({
          password: validFormData.password,
          email: validFormData.patient.email,
        });
        expect(mockSetUser).toHaveBeenCalled();
        expect(mockRouter.replace).toHaveBeenCalledWith('/');
        expect(mockToast.success).toHaveBeenCalledWith('Login successful');
      });
    });

    it('should handle password change requirement after registration', async () => {
      const user = userEvent.setup();
      
      mockRegisterPatient.mockResolvedValue({
        data: { id: '1' },
      });

      mockLogin.mockResolvedValue({
        unwrap: () => Promise.resolve({
          data: {
            accessToken: 'mock-token',
            needPasswordChange: true, // Password change required
          },
          message: 'Login successful',
        }),
      });

      const handleRegister = async (values: any) => {
        const data = mockModifyPayload(values);
        const res = await mockRegisterPatient(data);
        if (res?.data?.id) {
          const loginRes = await mockLogin({
            password: values.password,
            email: values.patient.email,
          }).unwrap();
          if (loginRes?.data?.accessToken) {
            const userInfo = loginRes.data;
            const passwordChangeRequired = userInfo.needPasswordChange;

            if (userInfo.accessToken) {
              const token = loginRes.data.accessToken;
              const user = mockDecodedToken(token);
              mockSetUser({ user, token });

              if (passwordChangeRequired) {
                mockRouter.replace('/dashboard/change-password');
              } else {
                mockRouter.replace('/');
              }

              mockToast.success(loginRes?.message);
            }
          }
        }
      };

      render(<RegistrationFormTest onSubmit={handleRegister} />);

      // Fill out the form
      await user.type(screen.getByLabelText('Name'), validFormData.patient.name);
      await user.type(screen.getByLabelText('Email'), validFormData.patient.email);
      await user.type(screen.getByLabelText('Password'), validFormData.password);
      await user.type(screen.getByLabelText('Contact Number'), validFormData.patient.contactNumber);
      await user.type(screen.getByLabelText('Address'), validFormData.patient.address);

      const submitButton = screen.getByTestId('register-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockRouter.replace).toHaveBeenCalledWith('/dashboard/change-password');
      });
    });

    it('should handle registration errors', async () => {
      const user = userEvent.setup();
      
      mockRegisterPatient.mockRejectedValue(new Error('Registration failed'));

      const handleRegister = async (values: any) => {
        try {
          const data = mockModifyPayload(values);
          await mockRegisterPatient(data);
        } catch (err: any) {
          console.error(err.message);
        }
      };

      // Spy on console.error
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation();

      render(<RegistrationFormTest onSubmit={handleRegister} />);

      // Fill out the form
      await user.type(screen.getByLabelText('Name'), validFormData.patient.name);
      await user.type(screen.getByLabelText('Email'), validFormData.patient.email);
      await user.type(screen.getByLabelText('Password'), validFormData.password);
      await user.type(screen.getByLabelText('Contact Number'), validFormData.patient.contactNumber);
      await user.type(screen.getByLabelText('Address'), validFormData.patient.address);

      const submitButton = screen.getByTestId('register-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Registration failed');
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Form Field Interactions', () => {
    it('should clear validation errors when user corrects input', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<RegistrationFormTest onSubmit={mockSubmit} />);

      // Submit empty form to trigger validation errors
      const submitButton = screen.getByTestId('register-button');
      await user.click(submitButton);

      // Wait for validation errors
      await waitFor(() => {
        expect(screen.getByText('Please enter your name!')).toBeInTheDocument();
      });

      // Fix the name field
      const nameInput = screen.getByLabelText('Name');
      await user.type(nameInput, 'John Doe');

      // The error should be cleared
      await waitFor(() => {
        expect(screen.queryByText('Please enter your name!')).not.toBeInTheDocument();
      });
    });

    it('should handle form reset', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<RegistrationFormTest onSubmit={mockSubmit} />);

      // Fill out some fields
      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');
      
      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');

      expect(nameInput).toHaveValue('John Doe');
      expect(emailInput).toHaveValue('john@example.com');

      // Reset form (this would typically be done via a reset button or form method)
      fireEvent.reset(nameInput.closest('form')!);

      await waitFor(() => {
        expect(nameInput).toHaveValue('');
        expect(emailInput).toHaveValue('');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper form labels and ARIA attributes', () => {
      const mockSubmit = vi.fn();
      render(<RegistrationFormTest onSubmit={mockSubmit} />);

      // Check that all form fields have proper labels
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Contact Number')).toBeInTheDocument();
      expect(screen.getByLabelText('Address')).toBeInTheDocument();

      // Check submit button
      expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
    });

    it('should associate error messages with form fields', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<RegistrationFormTest onSubmit={mockSubmit} />);

      const submitButton = screen.getByTestId('register-button');
      await user.click(submitButton);

      await waitFor(() => {
        const nameInput = screen.getByLabelText('Name');
        const nameError = screen.getByText('Please enter your name!');
        
        // Check that the error is associated with the input
        expect(nameInput).toHaveAttribute('aria-invalid', 'true');
        expect(nameError).toBeInTheDocument();
      });
    });
  });
});