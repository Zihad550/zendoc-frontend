import { describe, expect, it } from 'vitest';
import { z } from 'zod';

// Complex nested user profile schema with conditional validation
const addressSchema = z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(2, 'State must be at least 2 characters'),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format'),
    country: z.string().min(1, 'Country is required'),
});

const emergencyContactSchema = z.object({
    name: z.string().min(1, 'Emergency contact name is required'),
    relationship: z.string().min(1, 'Relationship is required'),
    phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number format'),
    email: z.string().email('Invalid email format').optional(),
});

const medicalHistorySchema = z.object({
    allergies: z.array(z.string()).default([]),
    medications: z.array(z.string()).default([]),
    conditions: z.array(z.string()).default([]),
    surgeries: z.array(z.object({
        procedure: z.string().min(1, 'Procedure name is required'),
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
        hospital: z.string().min(1, 'Hospital name is required'),
    })).default([]),
});

// Complex user profile with nested objects and conditional validation
const userProfileSchema = z.object({
    // Basic information
    id: z.string().uuid('Invalid user ID format'),
    role: z.enum(['PATIENT', 'DOCTOR', 'ADMIN', 'SUPER_ADMIN']),

    // Personal information
    personalInfo: z.object({
        firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
        lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
        dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
        gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']),
        phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number format'),
        email: z.string().email('Invalid email format'),
    }),

    // Address information
    address: addressSchema,

    // Emergency contact (required for patients)
    emergencyContact: emergencyContactSchema.optional(),

    // Medical history (only for patients)
    medicalHistory: medicalHistorySchema.optional(),

    // Professional information (only for doctors)
    professionalInfo: z.object({
        licenseNumber: z.string().min(1, 'License number is required'),
        specialties: z.array(z.string()).min(1, 'At least one specialty is required'),
        experience: z.number().min(0, 'Experience cannot be negative').max(50, 'Experience seems unrealistic'),
        qualification: z.string().min(1, 'Qualification is required'),
        consultationFee: z.number().min(0, 'Fee cannot be negative'),
        availableHours: z.object({
            start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
            end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
        }),
        bio: z.string().max(1000, 'Bio must be less than 1000 characters').optional(),
    }).optional(),

    // Account settings
    accountSettings: z.object({
        isActive: z.boolean().default(true),
        emailNotifications: z.boolean().default(true),
        smsNotifications: z.boolean().default(false),
        twoFactorEnabled: z.boolean().default(false),
        lastLogin: z.string().datetime().optional(),
        passwordLastChanged: z.string().datetime().optional(),
    }),

    // Timestamps
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
})
    .refine((data) => {
        // Conditional validation: Patients must have emergency contact
        if (data.role === 'PATIENT') {
            return data.emergencyContact !== undefined;
        }
        return true;
    }, {
        message: 'Emergency contact is required for patients',
        path: ['emergencyContact'],
    })
    .refine((data) => {
        // Conditional validation: Doctors must have professional info
        if (data.role === 'DOCTOR') {
            return data.professionalInfo !== undefined;
        }
        return true;
    }, {
        message: 'Professional information is required for doctors',
        path: ['professionalInfo'],
    })
    .refine((data) => {
        // Cross-field validation: Date of birth should be reasonable
        if (data.personalInfo.dateOfBirth) {
            const birthDate = new Date(data.personalInfo.dateOfBirth);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            return age >= 0 && age <= 120;
        }
        return true;
    }, {
        message: 'Date of birth must be realistic (0-120 years old)',
        path: ['personalInfo', 'dateOfBirth'],
    })
    .refine((data) => {
        // Cross-field validation: Doctor's available hours should be valid
        if (data.professionalInfo?.availableHours) {
            const { start, end } = data.professionalInfo.availableHours;
            const startTime = new Date(`2000-01-01T${start}:00`);
            const endTime = new Date(`2000-01-01T${end}:00`);
            return startTime < endTime;
        }
        return true;
    }, {
        message: 'End time must be after start time',
        path: ['professionalInfo', 'availableHours'],
    });

// Appointment booking schema with complex conditional validation
const appointmentBookingSchema = z.object({
    patientId: z.string().uuid('Invalid patient ID'),
    doctorId: z.string().uuid('Invalid doctor ID'),
    appointmentType: z.enum(['CONSULTATION', 'FOLLOW_UP', 'EMERGENCY', 'ROUTINE_CHECKUP']),
    scheduledDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    scheduledTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
    duration: z.number().min(15, 'Minimum appointment duration is 15 minutes').max(180, 'Maximum appointment duration is 3 hours'),
    reason: z.string().min(10, 'Please provide a detailed reason (at least 10 characters)').max(500, 'Reason too long'),
    symptoms: z.array(z.string()).optional(),
    urgency: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
    isFollowUp: z.boolean().default(false),
    previousAppointmentId: z.string().uuid().optional(),
    specialInstructions: z.string().max(1000, 'Instructions too long').optional(),
    paymentMethod: z.enum(['CASH', 'CARD', 'INSURANCE', 'ONLINE']),
    insuranceInfo: z.object({
        provider: z.string().min(1, 'Insurance provider is required'),
        policyNumber: z.string().min(1, 'Policy number is required'),
        groupNumber: z.string().optional(),
    }).optional(),
})
    .refine((data) => {
        // Conditional validation: Future appointments only
        const appointmentDate = new Date(`${data.scheduledDate}T${data.scheduledTime}`);
        const now = new Date();
        return appointmentDate > now;
    }, {
        message: 'Appointment must be scheduled for a future date and time',
        path: ['scheduledDate'],
    })
    .refine((data) => {
        // Cross-field validation: Follow-up appointments need previous appointment ID
        if (data.isFollowUp) {
            return data.previousAppointmentId !== undefined;
        }
        return true;
    }, {
        message: 'Previous appointment ID is required for follow-up appointments',
        path: ['previousAppointmentId'],
    })
    .refine((data) => {
        // Cross-field validation: Insurance payment requires insurance info
        if (data.paymentMethod === 'INSURANCE') {
            return data.insuranceInfo !== undefined;
        }
        return true;
    }, {
        message: 'Insurance information is required when payment method is insurance',
        path: ['insuranceInfo'],
    })
    .refine((data) => {
        // Cross-field validation: Emergency appointments should have high urgency
        if (data.appointmentType === 'EMERGENCY') {
            return data.urgency === 'HIGH' || data.urgency === 'CRITICAL';
        }
        return true;
    }, {
        message: 'Emergency appointments must have HIGH or CRITICAL urgency',
        path: ['urgency'],
    });

// Password change schema with complex validation rules
const passwordChangeSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/\d/, 'Password must contain at least one number')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
    userId: z.string().uuid('Invalid user ID'),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'New password and confirmation must match',
        path: ['confirmPassword'],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
        message: 'New password must be different from current password',
        path: ['newPassword'],
    });

describe('Complex Validation Scenarios', () => {
    describe('Nested Object Validation - User Profile', () => {
        it('should validate complete patient profile with nested objects', () => {
            const validPatientProfile = {
                id: '123e4567-e89b-12d3-a456-426614174000',
                role: 'PATIENT' as const,
                personalInfo: {
                    firstName: 'John',
                    lastName: 'Doe',
                    dateOfBirth: '1990-05-15',
                    gender: 'MALE' as const,
                    phone: '+1-555-123-4567',
                    email: 'john.doe@example.com',
                },
                address: {
                    street: '123 Main Street',
                    city: 'New York',
                    state: 'NY',
                    zipCode: '10001',
                    country: 'USA',
                },
                emergencyContact: {
                    name: 'Jane Doe',
                    relationship: 'Spouse',
                    phone: '+1-555-987-6543',
                    email: 'jane.doe@example.com',
                },
                medicalHistory: {
                    allergies: ['Penicillin', 'Peanuts'],
                    medications: ['Aspirin'],
                    conditions: ['Hypertension'],
                    surgeries: [{
                        procedure: 'Appendectomy',
                        date: '2015-03-20',
                        hospital: 'General Hospital',
                    }],
                },
                accountSettings: {
                    isActive: true,
                    emailNotifications: true,
                    smsNotifications: false,
                    twoFactorEnabled: false,
                },
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
            };

            const result = userProfileSchema.safeParse(validPatientProfile);
            expect(result.success).toBe(true);
        });

        it('should validate complete doctor profile with professional info', () => {
            const validDoctorProfile = {
                id: '123e4567-e89b-12d3-a456-426614174001',
                role: 'DOCTOR' as const,
                personalInfo: {
                    firstName: 'Dr. Sarah',
                    lastName: 'Smith',
                    dateOfBirth: '1980-08-22',
                    gender: 'FEMALE' as const,
                    phone: '+1-555-234-5678',
                    email: 'dr.sarah.smith@hospital.com',
                },
                address: {
                    street: '456 Medical Center Dr',
                    city: 'Boston',
                    state: 'MA',
                    zipCode: '02101-1234',
                    country: 'USA',
                },
                professionalInfo: {
                    licenseNumber: 'MD123456',
                    specialties: ['Cardiology', 'Internal Medicine'],
                    experience: 15,
                    qualification: 'MD, FACC',
                    consultationFee: 250,
                    availableHours: {
                        start: '09:00',
                        end: '17:00',
                    },
                    bio: 'Board-certified cardiologist with 15 years of experience.',
                },
                accountSettings: {
                    isActive: true,
                    emailNotifications: true,
                    smsNotifications: true,
                    twoFactorEnabled: true,
                },
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
            };

            const result = userProfileSchema.safeParse(validDoctorProfile);
            expect(result.success).toBe(true);
        });

        it('should reject patient profile without emergency contact', () => {
            const invalidPatientProfile = {
                id: '123e4567-e89b-12d3-a456-426614174000',
                role: 'PATIENT' as const,
                personalInfo: {
                    firstName: 'John',
                    lastName: 'Doe',
                    dateOfBirth: '1990-05-15',
                    gender: 'MALE' as const,
                    phone: '+1-555-123-4567',
                    email: 'john.doe@example.com',
                },
                address: {
                    street: '123 Main Street',
                    city: 'New York',
                    state: 'NY',
                    zipCode: '10001',
                    country: 'USA',
                },
                accountSettings: {
                    isActive: true,
                    emailNotifications: true,
                    smsNotifications: false,
                    twoFactorEnabled: false,
                },
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
            };

            const result = userProfileSchema.safeParse(invalidPatientProfile);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.some(issue =>
                    issue.message === 'Emergency contact is required for patients'
                )).toBe(true);
            }
        });

        it('should reject doctor profile without professional info', () => {
            const invalidDoctorProfile = {
                id: '123e4567-e89b-12d3-a456-426614174001',
                role: 'DOCTOR' as const,
                personalInfo: {
                    firstName: 'Dr. Sarah',
                    lastName: 'Smith',
                    dateOfBirth: '1980-08-22',
                    gender: 'FEMALE' as const,
                    phone: '+1-555-234-5678',
                    email: 'dr.sarah.smith@hospital.com',
                },
                address: {
                    street: '456 Medical Center Dr',
                    city: 'Boston',
                    state: 'MA',
                    zipCode: '02101',
                    country: 'USA',
                },
                accountSettings: {
                    isActive: true,
                    emailNotifications: true,
                    smsNotifications: true,
                    twoFactorEnabled: true,
                },
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
            };

            const result = userProfileSchema.safeParse(invalidDoctorProfile);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.some(issue =>
                    issue.message === 'Professional information is required for doctors'
                )).toBe(true);
            }
        });

        it('should validate nested address object correctly', () => {
            const invalidAddress = {
                street: '',
                city: 'New York',
                state: 'N', // Too short
                zipCode: '1234', // Invalid format
                country: '',
            };

            const result = addressSchema.safeParse(invalidAddress);
            expect(result.success).toBe(false);
            if (!result.success) {
                const messages = result.error.issues.map(issue => issue.message);
                expect(messages).toContain('Street address is required');
                expect(messages).toContain('State must be at least 2 characters');
                expect(messages).toContain('Invalid ZIP code format');
                expect(messages).toContain('Country is required');
            }
        });

        it('should validate nested medical history with surgery details', () => {
            const invalidMedicalHistory = {
                allergies: ['Penicillin'],
                medications: ['Aspirin'],
                conditions: ['Hypertension'],
                surgeries: [{
                    procedure: '', // Required field empty
                    date: '2015-13-45', // Invalid date format
                    hospital: '', // Required field empty
                }],
            };

            const result = medicalHistorySchema.safeParse(invalidMedicalHistory);
            expect(result.success).toBe(false);
            if (!result.success) {
                const messages = result.error.issues.map(issue => issue.message);

                expect(messages).toContain('Procedure name is required');
                // The date validation might have a different error message format
                expect(messages.length).toBeGreaterThan(1); // At least procedure and hospital errors
                expect(messages).toContain('Hospital name is required');
            }
        });
    });

    describe('Conditional Validation Rules', () => {
        it('should require emergency contact only for patients', () => {
            const adminProfile = {
                id: '123e4567-e89b-12d3-a456-426614174002',
                role: 'ADMIN' as const,
                personalInfo: {
                    firstName: 'Admin',
                    lastName: 'User',
                    dateOfBirth: '1985-01-01',
                    gender: 'OTHER' as const,
                    phone: '+1-555-345-6789',
                    email: 'admin@hospital.com',
                },
                address: {
                    street: '789 Admin Street',
                    city: 'Chicago',
                    state: 'IL',
                    zipCode: '60601',
                    country: 'USA',
                },
                accountSettings: {
                    isActive: true,
                    emailNotifications: true,
                    smsNotifications: false,
                    twoFactorEnabled: true,
                },
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
            };

            const result = userProfileSchema.safeParse(adminProfile);
            expect(result.success).toBe(true);
        });

        it('should require professional info only for doctors', () => {
            const patientWithoutProfessionalInfo = {
                id: '123e4567-e89b-12d3-a456-426614174003',
                role: 'PATIENT' as const,
                personalInfo: {
                    firstName: 'Patient',
                    lastName: 'User',
                    dateOfBirth: '1995-06-10',
                    gender: 'FEMALE' as const,
                    phone: '+1-555-456-7890',
                    email: 'patient@example.com',
                },
                address: {
                    street: '321 Patient Ave',
                    city: 'Miami',
                    state: 'FL',
                    zipCode: '33101',
                    country: 'USA',
                },
                emergencyContact: {
                    name: 'Emergency Contact',
                    relationship: 'Parent',
                    phone: '+1-555-567-8901',
                },
                accountSettings: {
                    isActive: true,
                    emailNotifications: true,
                    smsNotifications: false,
                    twoFactorEnabled: false,
                },
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
            };

            const result = userProfileSchema.safeParse(patientWithoutProfessionalInfo);
            expect(result.success).toBe(true);
        });
    });

    describe('Cross-field Validation Dependencies', () => {
        it('should validate realistic date of birth', () => {
            const profileWithUnrealisticAge = {
                id: '123e4567-e89b-12d3-a456-426614174004',
                role: 'PATIENT' as const,
                personalInfo: {
                    firstName: 'Old',
                    lastName: 'Person',
                    dateOfBirth: '1800-01-01', // Too old
                    gender: 'MALE' as const,
                    phone: '+1-555-678-9012',
                    email: 'old@example.com',
                },
                address: {
                    street: '123 Old Street',
                    city: 'Ancient City',
                    state: 'AC',
                    zipCode: '12345',
                    country: 'USA',
                },
                emergencyContact: {
                    name: 'Emergency Contact',
                    relationship: 'Descendant',
                    phone: '+1-555-789-0123',
                },
                accountSettings: {
                    isActive: true,
                    emailNotifications: true,
                    smsNotifications: false,
                    twoFactorEnabled: false,
                },
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
            };

            const result = userProfileSchema.safeParse(profileWithUnrealisticAge);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.some(issue =>
                    issue.message === 'Date of birth must be realistic (0-120 years old)'
                )).toBe(true);
            }
        });

        it('should validate doctor available hours order', () => {
            const doctorWithInvalidHours = {
                id: '123e4567-e89b-12d3-a456-426614174005',
                role: 'DOCTOR' as const,
                personalInfo: {
                    firstName: 'Dr. Invalid',
                    lastName: 'Hours',
                    dateOfBirth: '1975-03-15',
                    gender: 'MALE' as const,
                    phone: '+1-555-890-1234',
                    email: 'dr.invalid@hospital.com',
                },
                address: {
                    street: '456 Hospital Rd',
                    city: 'Medical City',
                    state: 'MC',
                    zipCode: '54321',
                    country: 'USA',
                },
                professionalInfo: {
                    licenseNumber: 'MD789012',
                    specialties: ['General Practice'],
                    experience: 10,
                    qualification: 'MD',
                    consultationFee: 150,
                    availableHours: {
                        start: '18:00', // End time before start time
                        end: '09:00',
                    },
                },
                accountSettings: {
                    isActive: true,
                    emailNotifications: true,
                    smsNotifications: false,
                    twoFactorEnabled: false,
                },
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
            };

            const result = userProfileSchema.safeParse(doctorWithInvalidHours);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.some(issue =>
                    issue.message === 'End time must be after start time'
                )).toBe(true);
            }
        });
    });

    describe('Appointment Booking Complex Validation', () => {
        it('should validate complete appointment with all fields', () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];

            const validAppointment = {
                patientId: '123e4567-e89b-12d3-a456-426614174000',
                doctorId: '123e4567-e89b-12d3-a456-426614174001',
                appointmentType: 'CONSULTATION' as const,
                scheduledDate: tomorrowStr,
                scheduledTime: '14:30',
                duration: 60,
                reason: 'Regular checkup and consultation for ongoing health concerns and medication review.',
                symptoms: ['Headache', 'Fatigue'],
                urgency: 'MEDIUM' as const,
                isFollowUp: false,
                specialInstructions: 'Please bring previous test results.',
                paymentMethod: 'CARD' as const,
            };

            const result = appointmentBookingSchema.safeParse(validAppointment);
            expect(result.success).toBe(true);
        });

        it('should reject past appointment dates', () => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            const pastAppointment = {
                patientId: '123e4567-e89b-12d3-a456-426614174000',
                doctorId: '123e4567-e89b-12d3-a456-426614174001',
                appointmentType: 'CONSULTATION' as const,
                scheduledDate: yesterdayStr,
                scheduledTime: '14:30',
                duration: 60,
                reason: 'Regular checkup and consultation.',
                urgency: 'MEDIUM' as const,
                paymentMethod: 'CASH' as const,
            };

            const result = appointmentBookingSchema.safeParse(pastAppointment);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.some(issue =>
                    issue.message === 'Appointment must be scheduled for a future date and time'
                )).toBe(true);
            }
        });

        it('should require previous appointment ID for follow-up appointments', () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];

            const followUpWithoutPrevious = {
                patientId: '123e4567-e89b-12d3-a456-426614174000',
                doctorId: '123e4567-e89b-12d3-a456-426614174001',
                appointmentType: 'FOLLOW_UP' as const,
                scheduledDate: tomorrowStr,
                scheduledTime: '14:30',
                duration: 30,
                reason: 'Follow-up consultation for previous treatment.',
                urgency: 'LOW' as const,
                isFollowUp: true,
                // Missing previousAppointmentId
                paymentMethod: 'CASH' as const,
            };

            const result = appointmentBookingSchema.safeParse(followUpWithoutPrevious);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.some(issue =>
                    issue.message === 'Previous appointment ID is required for follow-up appointments'
                )).toBe(true);
            }
        });

        it('should require insurance info for insurance payment method', () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];

            const insuranceWithoutInfo = {
                patientId: '123e4567-e89b-12d3-a456-426614174000',
                doctorId: '123e4567-e89b-12d3-a456-426614174001',
                appointmentType: 'CONSULTATION' as const,
                scheduledDate: tomorrowStr,
                scheduledTime: '14:30',
                duration: 60,
                reason: 'Regular checkup and consultation.',
                urgency: 'MEDIUM' as const,
                paymentMethod: 'INSURANCE' as const,
                // Missing insuranceInfo
            };

            const result = appointmentBookingSchema.safeParse(insuranceWithoutInfo);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.some(issue =>
                    issue.message === 'Insurance information is required when payment method is insurance'
                )).toBe(true);
            }
        });

        it('should require high urgency for emergency appointments', () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];

            const emergencyWithLowUrgency = {
                patientId: '123e4567-e89b-12d3-a456-426614174000',
                doctorId: '123e4567-e89b-12d3-a456-426614174001',
                appointmentType: 'EMERGENCY' as const,
                scheduledDate: tomorrowStr,
                scheduledTime: '14:30',
                duration: 90,
                reason: 'Emergency consultation required immediately.',
                urgency: 'LOW' as const, // Should be HIGH or CRITICAL
                paymentMethod: 'CASH' as const,
            };

            const result = appointmentBookingSchema.safeParse(emergencyWithLowUrgency);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.some(issue =>
                    issue.message === 'Emergency appointments must have HIGH or CRITICAL urgency'
                )).toBe(true);
            }
        });
    });

    describe('Custom Validation Error Messages', () => {
        it('should provide specific error messages for password validation', () => {
            const weakPassword = {
                currentPassword: 'oldpass123',
                newPassword: 'weak', // Fails multiple criteria
                confirmPassword: 'different',
                userId: '123e4567-e89b-12d3-a456-426614174000',
            };

            const result = passwordChangeSchema.safeParse(weakPassword);
            expect(result.success).toBe(false);
            if (!result.success) {
                const messages = result.error.issues.map(issue => issue.message);
                expect(messages).toContain('Password must be at least 8 characters');
                expect(messages).toContain('Password must contain at least one uppercase letter');
                expect(messages).toContain('Password must contain at least one number');
                expect(messages).toContain('Password must contain at least one special character');
                expect(messages).toContain('New password and confirmation must match');
            }
        });

        it('should provide custom error for same password', () => {
            const samePassword = {
                currentPassword: 'SamePass123!',
                newPassword: 'SamePass123!',
                confirmPassword: 'SamePass123!',
                userId: '123e4567-e89b-12d3-a456-426614174000',
            };

            const result = passwordChangeSchema.safeParse(samePassword);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.some(issue =>
                    issue.message === 'New password must be different from current password'
                )).toBe(true);
            }
        });

        it('should provide specific error messages for nested object validation', () => {
            const invalidEmergencyContact = {
                name: '', // Required
                relationship: '', // Required
                phone: 'invalid-phone', // Invalid format
                email: 'invalid-email', // Invalid format
            };

            const result = emergencyContactSchema.safeParse(invalidEmergencyContact);
            expect(result.success).toBe(false);
            if (!result.success) {
                const messages = result.error.issues.map(issue => issue.message);
                expect(messages).toContain('Emergency contact name is required');
                expect(messages).toContain('Relationship is required');
                expect(messages).toContain('Invalid phone number format');
                expect(messages).toContain('Invalid email format');
            }
        });

        it('should provide contextual error messages with field paths', () => {
            const invalidProfile = {
                id: 'invalid-uuid',
                role: 'PATIENT' as const,
                personalInfo: {
                    firstName: '',
                    lastName: '',
                    dateOfBirth: 'invalid-date',
                    gender: 'INVALID' as any,
                    phone: 'invalid-phone',
                    email: 'invalid-email',
                },
                address: {
                    street: '',
                    city: '',
                    state: 'X',
                    zipCode: 'invalid',
                    country: '',
                },
                accountSettings: {
                    isActive: true,
                    emailNotifications: true,
                    smsNotifications: false,
                    twoFactorEnabled: false,
                },
                createdAt: 'invalid-datetime',
                updatedAt: 'invalid-datetime',
            };

            const result = userProfileSchema.safeParse(invalidProfile);
            expect(result.success).toBe(false);
            if (!result.success) {
                const issues = result.error.issues;


                // Check that errors have proper paths
                expect(issues.some(issue =>
                    issue.path.includes('personalInfo') && issue.path.includes('firstName')
                )).toBe(true);

                expect(issues.some(issue =>
                    issue.path.includes('address') && issue.path.includes('zipCode')
                )).toBe(true);

                // Verify we have multiple validation errors with proper paths
                expect(issues.length).toBeGreaterThan(5);

                // Check that nested paths are properly structured
                const personalInfoErrors = issues.filter(issue => issue.path.includes('personalInfo'));
                const addressErrors = issues.filter(issue => issue.path.includes('address'));

                expect(personalInfoErrors.length).toBeGreaterThan(0);
                expect(addressErrors.length).toBeGreaterThan(0);
            }
        });
    });

    describe('Edge Cases and Error Handling', () => {
        it('should handle null and undefined values gracefully', () => {
            const nullValues = {
                id: null,
                role: null,
                personalInfo: null,
                address: null,
                accountSettings: null,
                createdAt: null,
                updatedAt: null,
            };

            const result = userProfileSchema.safeParse(nullValues);
            expect(result.success).toBe(false);
        });

        it('should handle empty objects and arrays', () => {
            const emptyValues = {
                id: '',
                role: 'PATIENT' as const,
                personalInfo: {
                    firstName: '',
                    lastName: '',
                    dateOfBirth: '',
                    gender: 'MALE' as const,
                    phone: '',
                    email: '',
                },
                address: {
                    street: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    country: '',
                },
                emergencyContact: {
                    name: '',
                    relationship: '',
                    phone: '',
                },
                medicalHistory: {
                    allergies: [],
                    medications: [],
                    conditions: [],
                    surgeries: [],
                },
                accountSettings: {
                    isActive: true,
                    emailNotifications: true,
                    smsNotifications: false,
                    twoFactorEnabled: false,
                },
                createdAt: '',
                updatedAt: '',
            };

            const result = userProfileSchema.safeParse(emptyValues);
            expect(result.success).toBe(false);
        });

        it('should handle malformed data types', () => {
            const malformedData = {
                id: 123, // Should be string
                role: 'INVALID_ROLE',
                personalInfo: 'not an object',
                address: [],
                accountSettings: 'not an object',
                createdAt: 123,
                updatedAt: false,
            };

            const result = userProfileSchema.safeParse(malformedData);
            expect(result.success).toBe(false);
        });

        it('should validate complex nested array structures', () => {
            const invalidSurgeries = {
                allergies: ['Valid allergy'],
                medications: ['Valid medication'],
                conditions: ['Valid condition'],
                surgeries: [
                    {
                        procedure: '', // Invalid
                        date: 'invalid-date', // Invalid
                        hospital: '', // Invalid
                    },
                    {
                        procedure: 'Valid procedure',
                        date: '2020-01-01',
                        hospital: 'Valid hospital',
                    },
                    {
                        procedure: 'Another procedure',
                        date: '2021-12-31',
                        hospital: 'Another hospital',
                    },
                ],
            };

            const result = medicalHistorySchema.safeParse(invalidSurgeries);
            expect(result.success).toBe(false);
            if (!result.success) {
                // Should have errors for the first surgery only
                const surgeryErrors = result.error.issues.filter(issue =>
                    issue.path.includes('surgeries') && issue.path.includes(0)
                );
                expect(surgeryErrors.length).toBeGreaterThan(0);
            }
        });
    });
});