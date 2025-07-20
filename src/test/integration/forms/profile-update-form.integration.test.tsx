import { AnimatedContactForm, AnimatedFormField } from '@/components/animation';
import PHForm from '@/components/Forms/PHForm';
import PHInput from '@/components/Forms/PHInput';
import { zodResolver } from '@hookform/resolvers/zod';
import SaveIcon from '@mui/icons-material/Save';
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
} from '@mui/material';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { render } from '../../utils/test-utils';

import { vi } from 'vitest';

// Mock dependencies
vi.mock('sonner');
vi.mock('@/components/animation', () => ({
  AnimatedContactForm: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AnimatedFormField: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const mockToast = toast as any;

const validationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  zipCode: z.string().min(5, 'Zip code must be at least 5 characters'),
  emergencyContact: z
    .string()
    .min(10, 'Emergency contact must be at least 10 characters'),
  emergencyContactName: z
    .string()
    .min(2, 'Emergency contact name must be at least 2 characters'),
});

const mockUserData = {
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.johnson@example.com',
  phone: '+1 (555) 123-4567',
  dateOfBirth: '1990-05-15',
  gender: 'female',
  address: '123 Main Street',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  emergencyContact: '+1 (555) 987-6543',
  emergencyContactName: 'John Johnson',
};

// Test component that mimics the profile update form
const ProfileUpdateFormTest = ({ 
  onSubmit, 
  initialData = mockUserData,
  enableOptimisticUpdates = false 
}: { 
  onSubmit: (values: any) => Promise<void>;
  initialData?: typeof mockUserData;
  enableOptimisticUpdates?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [optimisticData, setOptimisticData] = useState(initialData);

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    
    // Optimistic update
    if (enableOptimisticUpdates) {
      setOptimisticData(values);
    }
    
    try {
      await onSubmit(values);
      mockToast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      // Rollback optimistic update on error
      if (enableOptimisticUpdates) {
        setOptimisticData(initialData);
      }
      mockToast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const displayData = enableOptimisticUpdates ? optimisticData : initialData;

  return (
    <Card data-testid="profile-form-card">
      <CardContent>
        <Typography variant="h5" data-testid="form-title">
          Account Information
        </Typography>
        
        <AnimatedContactForm delay={0.1}>
          <PHForm
            onSubmit={handleSubmit}
            defaultValues={displayData}
            resolver={zodResolver(validationSchema)}
          >
            <Grid container spacing={3}>
              {/* Personal Information */}
              <Grid size={12}>
                <Typography variant="h6">Personal Information</Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedFormField>
                  <PHInput
                    name="firstName"
                    label="First Name"
                    fullWidth
                    disabled={!isEditing}
                  />
                </AnimatedFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedFormField>
                  <PHInput
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    disabled={!isEditing}
                  />
                </AnimatedFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedFormField>
                  <PHInput
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    disabled={!isEditing}
                  />
                </AnimatedFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedFormField>
                  <PHInput
                    name="phone"
                    label="Phone Number"
                    fullWidth
                    disabled={!isEditing}
                  />
                </AnimatedFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedFormField>
                  <PHInput
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    disabled={!isEditing}
                  />
                </AnimatedFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedFormField>
                  <PHInput
                    name="gender"
                    label="Gender"
                    fullWidth
                    disabled={!isEditing}
                  />
                </AnimatedFormField>
              </Grid>

              {/* Address Information */}
              <Grid size={12}>
                <Typography variant="h6">Address Information</Typography>
              </Grid>

              <Grid size={12}>
                <AnimatedFormField>
                  <PHInput
                    name="address"
                    label="Street Address"
                    fullWidth
                    disabled={!isEditing}
                  />
                </AnimatedFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <AnimatedFormField>
                  <PHInput
                    name="city"
                    label="City"
                    fullWidth
                    disabled={!isEditing}
                  />
                </AnimatedFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <AnimatedFormField>
                  <PHInput
                    name="state"
                    label="State"
                    fullWidth
                    disabled={!isEditing}
                  />
                </AnimatedFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <AnimatedFormField>
                  <PHInput
                    name="zipCode"
                    label="Zip Code"
                    fullWidth
                    disabled={!isEditing}
                  />
                </AnimatedFormField>
              </Grid>

              {/* Emergency Contact */}
              <Grid size={12}>
                <Typography variant="h6">Emergency Contact</Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedFormField>
                  <PHInput
                    name="emergencyContactName"
                    label="Emergency Contact Name"
                    fullWidth
                    disabled={!isEditing}
                  />
                </AnimatedFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedFormField>
                  <PHInput
                    name="emergencyContact"
                    label="Emergency Contact Phone"
                    fullWidth
                    disabled={!isEditing}
                  />
                </AnimatedFormField>
              </Grid>

              {/* Action Buttons */}
              <Grid size={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  {isEditing ? (
                    <>
                      <Button
                        variant="outlined"
                        onClick={() => setIsEditing(false)}
                        disabled={isLoading}
                        data-testid="cancel-button"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        disabled={isLoading}
                        data-testid="save-button"
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => setIsEditing(true)}
                      data-testid="edit-button"
                    >
                      Edit Profile
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </PHForm>
        </AnimatedContactForm>
      </CardContent>
    </Card>
  );
};

describe('Profile Update Form Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Form Rendering and Initial State', () => {
    it('should render form with initial data in read-only mode', () => {
      const mockSubmit = vi.fn();
      render(<ProfileUpdateFormTest onSubmit={mockSubmit} />);

      // Check that form is rendered
      expect(screen.getByTestId('profile-form-card')).toBeInTheDocument();
      expect(screen.getByTestId('form-title')).toHaveTextContent('Account Information');

      // Check that fields are populated with initial data
      expect(screen.getByDisplayValue('Sarah')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Johnson')).toBeInTheDocument();
      expect(screen.getByDisplayValue('sarah.johnson@example.com')).toBeInTheDocument();

      // Check that fields are disabled initially
      expect(screen.getByLabelText('First Name')).toBeDisabled();
      expect(screen.getByLabelText('Last Name')).toBeDisabled();

      // Check that edit button is present
      expect(screen.getByTestId('edit-button')).toBeInTheDocument();
    });

    it('should enable editing mode when edit button is clicked', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();
      
      render(<ProfileUpdateFormTest onSubmit={mockSubmit} />);

      const editButton = screen.getByTestId('edit-button');
      await user.click(editButton);

      // Check that fields are now enabled
      expect(screen.getByLabelText('First Name')).not.toBeDisabled();
      expect(screen.getByLabelText('Last Name')).not.toBeDisabled();

      // Check that save and cancel buttons are present
      expect(screen.getByTestId('save-button')).toBeInTheDocument();
      expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
      expect(screen.queryByTestId('edit-button')).not.toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should validate required fields', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<ProfileUpdateFormTest onSubmit={mockSubmit} />);

      // Enable editing
      await user.click(screen.getByTestId('edit-button'));

      // Clear required fields
      const firstNameInput = screen.getByLabelText('First Name');
      await user.clear(firstNameInput);

      const emailInput = screen.getByLabelText('Email Address');
      await user.clear(emailInput);

      // Try to submit
      await user.click(screen.getByTestId('save-button'));

      // Check for validation errors
      await waitFor(() => {
        expect(screen.getByText('First name must be at least 2 characters')).toBeInTheDocument();
        expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      });

      expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('should validate email format', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<ProfileUpdateFormTest onSubmit={mockSubmit} />);

      // Enable editing
      await user.click(screen.getByTestId('edit-button'));

      // Enter invalid email
      const emailInput = screen.getByLabelText('Email Address');
      await user.clear(emailInput);
      await user.type(emailInput, 'invalid-email');

      // Try to submit
      await user.click(screen.getByTestId('save-button'));

      await waitFor(() => {
        expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      });
    });

    it('should validate phone number length', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<ProfileUpdateFormTest onSubmit={mockSubmit} />);

      // Enable editing
      await user.click(screen.getByTestId('edit-button'));

      // Enter short phone number
      const phoneInput = screen.getByLabelText('Phone Number');
      await user.clear(phoneInput);
      await user.type(phoneInput, '123');

      // Try to submit
      await user.click(screen.getByTestId('save-button'));

      await waitFor(() => {
        expect(screen.getByText('Phone number must be at least 10 characters')).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('should submit form with updated data', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn().mockResolvedValue(undefined);

      render(<ProfileUpdateFormTest onSubmit={mockSubmit} />);

      // Enable editing
      await user.click(screen.getByTestId('edit-button'));

      // Update some fields
      const firstNameInput = screen.getByLabelText('First Name');
      await user.clear(firstNameInput);
      await user.type(firstNameInput, 'Updated Name');

      const cityInput = screen.getByLabelText('City');
      await user.clear(cityInput);
      await user.type(cityInput, 'Updated City');

      // Submit form
      await user.click(screen.getByTestId('save-button'));

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            firstName: 'Updated Name',
            city: 'Updated City',
          })
        );
        expect(mockToast.success).toHaveBeenCalledWith('Profile updated successfully!');
      });

      // Check that form returns to read-only mode
      expect(screen.getByTestId('edit-button')).toBeInTheDocument();
      expect(screen.queryByTestId('save-button')).not.toBeInTheDocument();
    });

    it('should handle submission errors', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn().mockRejectedValue(new Error('Update failed'));

      render(<ProfileUpdateFormTest onSubmit={mockSubmit} />);

      // Enable editing
      await user.click(screen.getByTestId('edit-button'));

      // Submit form
      await user.click(screen.getByTestId('save-button'));

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith('Failed to update profile');
      });

      // Form should still be in editing mode
      expect(screen.getByTestId('save-button')).toBeInTheDocument();
      expect(screen.queryByTestId('edit-button')).not.toBeInTheDocument();
    });

    it('should show loading state during submission', async () => {
      const user = userEvent.setup();
      let resolveSubmit: () => void;
      const mockSubmit = vi.fn().mockImplementation(() => 
        new Promise<void>((resolve) => {
          resolveSubmit = resolve;
        })
      );

      render(<ProfileUpdateFormTest onSubmit={mockSubmit} />);

      // Enable editing
      await user.click(screen.getByTestId('edit-button'));

      // Submit form
      await user.click(screen.getByTestId('save-button'));

      // Check loading state
      await waitFor(() => {
        expect(screen.getByText('Saving...')).toBeInTheDocument();
        expect(screen.getByTestId('save-button')).toBeDisabled();
        expect(screen.getByTestId('cancel-button')).toBeDisabled();
      });

      // Resolve the promise
      resolveSubmit!();

      await waitFor(() => {
        expect(screen.getByText('Save Changes')).toBeInTheDocument();
      });
    });
  });

  describe('Optimistic Updates', () => {
    it('should show optimistic updates immediately', async () => {
      const user = userEvent.setup();
      let resolveSubmit: () => void;
      const mockSubmit = vi.fn().mockImplementation(() => 
        new Promise<void>((resolve) => {
          resolveSubmit = resolve;
        })
      );

      render(
        <ProfileUpdateFormTest 
          onSubmit={mockSubmit} 
          enableOptimisticUpdates={true}
        />
      );

      // Enable editing
      await user.click(screen.getByTestId('edit-button'));

      // Update a field
      const firstNameInput = screen.getByLabelText('First Name');
      await user.clear(firstNameInput);
      await user.type(firstNameInput, 'Optimistic Name');

      // Submit form
      await user.click(screen.getByTestId('save-button'));

      // The optimistic update should be visible immediately
      await waitFor(() => {
        expect(screen.getByDisplayValue('Optimistic Name')).toBeInTheDocument();
      });

      // Resolve the promise
      resolveSubmit!();

      await waitFor(() => {
        expect(mockToast.success).toHaveBeenCalledWith('Profile updated successfully!');
      });
    });

    it('should rollback optimistic updates on error', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn().mockRejectedValue(new Error('Update failed'));

      render(
        <ProfileUpdateFormTest 
          onSubmit={mockSubmit} 
          enableOptimisticUpdates={true}
        />
      );

      // Enable editing
      await user.click(screen.getByTestId('edit-button'));

      // Update a field
      const firstNameInput = screen.getByLabelText('First Name');
      await user.clear(firstNameInput);
      await user.type(firstNameInput, 'Failed Update');

      // Submit form
      await user.click(screen.getByTestId('save-button'));

      // Wait for error and rollback
      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith('Failed to update profile');
        // Should rollback to original value
        expect(screen.getByDisplayValue('Sarah')).toBeInTheDocument();
      });
    });
  });

  describe('Form Interactions', () => {
    it('should cancel editing and revert changes', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<ProfileUpdateFormTest onSubmit={mockSubmit} />);

      // Enable editing
      await user.click(screen.getByTestId('edit-button'));

      // Make changes
      const firstNameInput = screen.getByLabelText('First Name');
      await user.clear(firstNameInput);
      await user.type(firstNameInput, 'Changed Name');

      // Cancel editing
      await user.click(screen.getByTestId('cancel-button'));

      // Should return to read-only mode with original data
      expect(screen.getByTestId('edit-button')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Sarah')).toBeInTheDocument();
    });

    it('should clear validation errors when user corrects input', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<ProfileUpdateFormTest onSubmit={mockSubmit} />);

      // Enable editing
      await user.click(screen.getByTestId('edit-button'));

      // Create validation error
      const emailInput = screen.getByLabelText('Email Address');
      await user.clear(emailInput);
      await user.type(emailInput, 'invalid');

      // Try to submit to trigger validation
      await user.click(screen.getByTestId('save-button'));

      await waitFor(() => {
        expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      });

      // Fix the email
      await user.clear(emailInput);
      await user.type(emailInput, 'valid@example.com');

      // Error should be cleared
      await waitFor(() => {
        expect(screen.queryByText('Invalid email address')).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper form labels and ARIA attributes', () => {
      const mockSubmit = vi.fn();
      render(<ProfileUpdateFormTest onSubmit={mockSubmit} />);

      // Check that all form fields have proper labels
      expect(screen.getByLabelText('First Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
      expect(screen.getByLabelText('Emergency Contact Name')).toBeInTheDocument();

      // Check buttons
      expect(screen.getByRole('button', { name: 'Edit Profile' })).toBeInTheDocument();
    });

    it('should associate error messages with form fields', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest.fn();

      render(<ProfileUpdateFormTest onSubmit={mockSubmit} />);

      // Enable editing
      await user.click(screen.getByTestId('edit-button'));

      // Clear a required field
      const firstNameInput = screen.getByLabelText('First Name');
      await user.clear(firstNameInput);

      // Try to submit
      await user.click(screen.getByTestId('save-button'));

      await waitFor(() => {
        expect(firstNameInput).toHaveAttribute('aria-invalid', 'true');
        expect(screen.getByText('First name must be at least 2 characters')).toBeInTheDocument();
      });
    });
  });
});