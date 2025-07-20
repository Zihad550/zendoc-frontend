'use client';

import PHForm from '@/components/Forms/PHForm';
import PHInput from '@/components/Forms/PHInput';
import PHSelectField from '@/components/Forms/PHSelectField';
import PHModal from '@/components/Shared/PHModal/PHModal';
import { USER_ROLE } from '@/contants/role';
import { useGetAllSpecialtiesQuery } from '@/redux/features/specialties/specialtiesApi';
import {
  useCheckEmailUniquenessQuery,
  useCreateUserMutation,
} from '@/redux/features/user/userApi';
import { CreateUserData, DoctorSpecificInfo } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  Chip,
  DialogActions,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  Switch,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
  onUserCreated?: () => void;
}

const steps = [
  'Basic Information',
  'Role-Specific Details',
  'Account Settings',
];

// Validation schemas
const basicInfoSchema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  role: z.enum(['super_admin', 'admin', 'doctor', 'patient']),
  contactNumber: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; // Optional field
      return /^[\+]?[1-9][\d]{0,15}$/.test(val);
    }, 'Invalid phone number format'),
  address: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; // Optional field
      return val.length <= 500;
    }, 'Address cannot exceed 500 characters'),
});

const doctorInfoSchema = z.object({
  qualification: z.string().min(1, 'Qualification is required'),
  experience: z
    .number()
    .min(0, 'Experience must be 0 or greater')
    .max(50, 'Experience cannot exceed 50 years'),
  appointmentFee: z
    .number()
    .min(0, 'Fee must be 0 or greater')
    .max(10000, 'Fee cannot exceed 10,000'),
  registrationNumber: z
    .string()
    .min(1, 'Registration number is required')
    .regex(/^[A-Z0-9-]+$/, 'Invalid registration number format'),
  currentWorkingPlace: z.string().optional(),
  designation: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  specialties: z.array(z.string()).min(1, 'At least one specialty is required'),
});

const accountSettingsSchema = z
  .object({
    sendWelcomeEmail: z.boolean(),
    generatePassword: z.boolean(),
    customPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.generatePassword && !data.customPassword) {
        return false;
      }
      if (
        !data.generatePassword &&
        data.customPassword &&
        data.customPassword.length < 6
      ) {
        return false;
      }
      return true;
    },
    {
      message:
        'Either generate password or provide a custom password (min 6 characters)',
      path: ['customPassword'],
    }
  );

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  open,
  onClose,
  onUserCreated,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<Partial<CreateUserData>>({
    sendWelcomeEmail: true,
    generatePassword: true,
  });
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [emailToCheck, setEmailToCheck] = useState<string>('');

  // API hooks
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const { data: specialtiesData } = useGetAllSpecialtiesQuery(undefined);
  const { data: emailCheckData, isLoading: isCheckingEmail } =
    useCheckEmailUniquenessQuery(emailToCheck, {
      skip: !emailToCheck || emailToCheck.length < 3,
    });

  const specialties = specialtiesData?.data || [];

  // Form methods for each step
  const basicInfoMethods = useForm({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      email: '',
      name: '',
      role: 'patient',
      contactNumber: '',
      address: '',
    },
  });

  const doctorInfoMethods = useForm({
    resolver: zodResolver(doctorInfoSchema),
    defaultValues: {
      qualification: '',
      experience: 0,
      appointmentFee: 0,
      registrationNumber: '',
      currentWorkingPlace: '',
      designation: '',
      gender: 'MALE',
      specialties: [],
    },
  });

  const accountSettingsMethods = useForm({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      sendWelcomeEmail: true,
      generatePassword: true,
      customPassword: '',
    },
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setActiveStep(0);
      setFormData({
        sendWelcomeEmail: true,
        generatePassword: true,
      });
      setSelectedSpecialties([]);
      setEmailToCheck('');
      basicInfoMethods.reset();
      doctorInfoMethods.reset();
      accountSettingsMethods.reset();
    }
  }, [open, basicInfoMethods, doctorInfoMethods, accountSettingsMethods]);

  // Email uniqueness check with debounce
  useEffect(() => {
    const email = basicInfoMethods.watch('email');
    const timeoutId = setTimeout(() => {
      if (email && email.includes('@')) {
        setEmailToCheck(email);
      }
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [basicInfoMethods]);

  const handleNext = async () => {
    let isValid = false;

    if (activeStep === 0) {
      isValid = await basicInfoMethods.trigger();
      if (isValid) {
        const data = basicInfoMethods.getValues();
        setFormData((prev) => ({
          ...prev,
          email: data.email,
          role: data.role as any,
          basicInfo: {
            name: data.name,
            contactNumber: data.contactNumber,
            address: data.address,
          },
        }));
      }
    } else if (activeStep === 1) {
      const role = formData.role;
      if (role === 'DOCTOR') {
        isValid = await doctorInfoMethods.trigger();
        if (isValid) {
          const data = doctorInfoMethods.getValues();
          setFormData((prev) => ({
            ...prev,
            roleSpecificInfo: {
              ...data,
              specialties: selectedSpecialties,
            } as DoctorSpecificInfo,
          }));
        }
      } else {
        // For non-doctor roles, skip role-specific info
        isValid = true;
      }
    }

    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSpecialtyChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedSpecialties(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleSubmit = async (data: FieldValues) => {
    try {
      // Final validation before submission
      if (emailToCheck && emailCheckData && !emailCheckData.isUnique) {
        toast.error(
          'Email is already registered. Please use a different email.'
        );
        return;
      }

      const finalData: CreateUserData = {
        ...formData,
        sendWelcomeEmail: data.sendWelcomeEmail,
        generatePassword: data.generatePassword,
        customPassword: data.generatePassword ? undefined : data.customPassword,
      } as CreateUserData;

      // Validate required fields
      if (!finalData.email || !finalData.basicInfo?.name || !finalData.role) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Additional validation for doctor role
      if (finalData.role === 'DOCTOR' && finalData.roleSpecificInfo) {
        const doctorInfo = finalData.roleSpecificInfo as DoctorSpecificInfo;
        if (!doctorInfo.specialties || doctorInfo.specialties.length === 0) {
          toast.error('Please select at least one specialty for the doctor');
          return;
        }
      }

      await createUser(finalData).unwrap();

      // Success feedback with detailed message
      const roleText = finalData.role.replace('_', ' ').toLowerCase();
      toast.success(
        `${
          roleText.charAt(0).toUpperCase() + roleText.slice(1)
        } account created successfully!${
          finalData.sendWelcomeEmail ? ' Welcome email sent.' : ''
        }`
      );

      // Trigger user list refresh
      onUserCreated?.();
      onClose();
    } catch (error: any) {
      // Enhanced error handling with specific error messages
      let errorMessage = 'Failed to create user';

      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.status === 400) {
        errorMessage = 'Invalid user data provided';
      } else if (error?.status === 409) {
        errorMessage = 'Email already exists in the system';
      } else if (error?.status === 422) {
        errorMessage = 'Validation failed. Please check all fields';
      } else if (error?.status >= 500) {
        errorMessage = 'Server error. Please try again later';
      }

      toast.error(errorMessage);
      console.error('User creation error:', error);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <PHForm onSubmit={() => {}} resolver={zodResolver(basicInfoSchema)}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <PHInput
                  name="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  required
                />
                {emailToCheck && emailCheckData && !emailCheckData.isUnique && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    This email is already registered
                  </Alert>
                )}
                {isCheckingEmail && (
                  <Typography variant="caption" color="text.secondary">
                    Checking email availability...
                  </Typography>
                )}
              </Grid>
              <Grid size={12}>
                <PHInput name="name" label="Full Name" fullWidth required />
              </Grid>
              <Grid size={12}>
                <PHSelectField
                  name="role"
                  label="User Role"
                  items={[
                    USER_ROLE.PATIENT,
                    USER_ROLE.DOCTOR,
                    USER_ROLE.ADMIN,
                    USER_ROLE.SUPER_ADMIN,
                  ]}
                  required
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                }}
              >
                <PHInput
                  name="contactNumber"
                  label="Contact Number"
                  fullWidth
                />
              </Grid>
              <Grid size={12}>
                <PHInput name="address" label="Address" fullWidth />
              </Grid>
            </Grid>
          </PHForm>
        );

      case 1:
        const selectedRole = formData.role;

        if (selectedRole === 'DOCTOR') {
          return (
            <PHForm
              onSubmit={() => {}}
              resolver={zodResolver(doctorInfoSchema)}
            >
              <Grid container spacing={2}>
                <Grid size={12}>
                  <PHInput
                    name="qualification"
                    label="Qualification"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    sm: 6,
                  }}
                >
                  <PHInput
                    name="experience"
                    label="Experience (years)"
                    type="number"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    sm: 6,
                  }}
                >
                  <PHInput
                    name="appointmentFee"
                    label="Appointment Fee"
                    type="number"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid size={12}>
                  <PHInput
                    name="registrationNumber"
                    label="Medical Registration Number"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    sm: 6,
                  }}
                >
                  <PHInput
                    name="currentWorkingPlace"
                    label="Current Working Place"
                    fullWidth
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    sm: 6,
                  }}
                >
                  <PHInput name="designation" label="Designation" fullWidth />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    sm: 6,
                  }}
                >
                  <PHSelectField
                    name="gender"
                    label="Gender"
                    items={['MALE', 'FEMALE', 'OTHER']}
                    required
                  />
                </Grid>
                <Grid size={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Specialties</InputLabel>
                    <Select
                      multiple
                      value={selectedSpecialties}
                      onChange={handleSpecialtyChange}
                      input={<OutlinedInput label="Specialties" />}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                          {selected.map((value) => {
                            const specialty = specialties.find(
                              (s: any) => s.id === value
                            );
                            return (
                              <Chip
                                key={value}
                                label={specialty?.title || value}
                                size="small"
                              />
                            );
                          })}
                        </Box>
                      )}
                    >
                      {specialties.map((specialty: any) => (
                        <MenuItem key={specialty.id} value={specialty.id}>
                          {specialty.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </PHForm>
          );
        } else {
          return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" gutterBottom>
                No additional information required
              </Typography>
              <Typography color="text.secondary">
                {selectedRole === 'PATIENT' &&
                  'Patient accounts only require basic information.'}
                {selectedRole === 'ADMIN' &&
                  'Admin accounts only require basic information.'}
                {selectedRole === 'SUPER_ADMIN' &&
                  'Super admin accounts only require basic information.'}
              </Typography>
            </Box>
          );
        }

      case 2:
        return (
          <PHForm
            onSubmit={handleSubmit}
            resolver={zodResolver(accountSettingsSchema)}
          >
            <Grid container spacing={3}>
              <Grid size={12}>
                <FormControlLabel
                  control={
                    <Switch
                      {...accountSettingsMethods.register('sendWelcomeEmail')}
                      defaultChecked={true}
                    />
                  }
                  label="Send welcome email to user"
                />
              </Grid>
              <Grid size={12}>
                <FormControlLabel
                  control={
                    <Switch
                      {...accountSettingsMethods.register('generatePassword')}
                      defaultChecked={true}
                      onChange={(e) => {
                        if (e.target.checked) {
                          accountSettingsMethods.setValue('customPassword', '');
                        }
                      }}
                    />
                  }
                  label="Generate secure password automatically"
                />
              </Grid>
              {!accountSettingsMethods.watch('generatePassword') && (
                <Grid size={12}>
                  <PHInput
                    name="customPassword"
                    label="Custom Password"
                    type="password"
                    fullWidth
                    required
                  />
                </Grid>
              )}
              <Grid size={12}>
                <Alert severity="info">
                  {formData.generatePassword ||
                  accountSettingsMethods.watch('generatePassword')
                    ? 'A secure password will be generated and sent to the user via email.'
                    : 'The user will receive the custom password via email.'}
                </Alert>
              </Grid>
            </Grid>
          </PHForm>
        );

      default:
        return null;
    }
  };

  const isEmailInvalid =
    emailToCheck && emailCheckData && !emailCheckData.isUnique;
  const canProceed =
    activeStep === 0 ? !isEmailInvalid && !isCheckingEmail : true;

  return (
    <PHModal
      open={open}
      setOpen={() => onClose()}
      title="Create New User"
      sx={{ '& .MuiDialog-paper': { maxWidth: 600, width: '100%' } }}
    >
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ minHeight: 400 }}>{renderStepContent(activeStep)}</Box>

        <DialogActions sx={{ mt: 3, px: 0 }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={accountSettingsMethods.handleSubmit(handleSubmit)}
              disabled={isCreating}
            >
              {isCreating ? 'Creating...' : 'Create User'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!canProceed}
            >
              Next
            </Button>
          )}
        </DialogActions>
      </Box>
    </PHModal>
  );
};

export default CreateUserModal;
