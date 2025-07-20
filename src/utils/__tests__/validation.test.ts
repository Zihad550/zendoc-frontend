import { describe, expect, it } from 'vitest';
import { z } from 'zod';

// Common validation schemas used in the app
const emailSchema = z.string().email('Invalid email format');
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters');
const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s-()]+$/, 'Invalid phone number format');
const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters');

// User registration schema
const userRegistrationSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    phone: phoneSchema.optional(),
    role: z.enum(['PATIENT', 'DOCTOR', 'ADMIN']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Doctor profile schema
const doctorProfileSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  specialties: z.array(z.string()).min(1, 'At least one specialty is required'),
  experience: z
    .number()
    .min(0, 'Experience cannot be negative')
    .max(50, 'Experience seems too high'),
  qualification: z.string().min(1, 'Qualification is required'),
  consultationFee: z.number().min(0, 'Fee cannot be negative'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
});

// Appointment booking schema
const appointmentSchema = z.object({
  doctorId: z.string().min(1, 'Doctor selection is required'),
  date: z.string().refine((date) => {
    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointmentDate >= today;
  }, 'Appointment date cannot be in the past'),
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  reason: z
    .string()
    .min(10, 'Please provide a detailed reason (at least 10 characters)')
    .max(200, 'Reason must be less than 200 characters'),
});

describe('Validation Schemas', () => {
  describe('Email Validation', () => {
    it('should validate correct email formats', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'user123@test-domain.com',
      ];

      validEmails.forEach((email) => {
        expect(() => emailSchema.parse(email)).not.toThrow();
      });
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'user@',
        'user..name@example.com',
        'user@.com',
      ];

      invalidEmails.forEach((email) => {
        expect(() => emailSchema.parse(email)).toThrow();
      });
    });
  });

  describe('Password Validation', () => {
    it('should validate strong passwords', () => {
      const validPasswords = [
        'password123',
        'MySecurePass1',
        'complex_password_2024',
        '12345678',
      ];

      validPasswords.forEach((password) => {
        expect(() => passwordSchema.parse(password)).not.toThrow();
      });
    });

    it('should reject weak passwords', () => {
      const invalidPasswords = ['short', '1234567', '', '   '];

      invalidPasswords.forEach((password) => {
        expect(() => passwordSchema.parse(password)).toThrow();
      });
    });
  });

  describe('Phone Validation', () => {
    it('should validate correct phone formats', () => {
      const validPhones = [
        '+1234567890',
        '123-456-7890',
        '(123) 456-7890',
        '+880 1855-629170',
        '01234567890',
      ];

      validPhones.forEach((phone) => {
        expect(() => phoneSchema.parse(phone)).not.toThrow();
      });
    });

    it('should reject invalid phone formats', () => {
      const invalidPhones = [
        'abc123',
        '123abc456',
        '++123456789',
        'phone-number',
      ];

      invalidPhones.forEach((phone) => {
        expect(() => phoneSchema.parse(phone)).toThrow();
      });
    });
  });

  describe('Name Validation', () => {
    it('should validate proper names', () => {
      const validNames = [
        'John',
        'Jane Doe',
        'Dr. Smith',
        'Mary-Jane',
        'José García',
      ];

      validNames.forEach((name) => {
        expect(() => nameSchema.parse(name)).not.toThrow();
      });
    });

    it('should reject invalid names', () => {
      const invalidNames = ['A', '', 'A'.repeat(51), '   '];

      invalidNames.forEach((name) => {
        expect(() => nameSchema.parse(name)).toThrow();
      });
    });
  });

  describe('User Registration Schema', () => {
    it('should validate complete registration data', () => {
      const validRegistration = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        phone: '+1234567890',
        role: 'PATIENT' as const,
      };

      expect(() =>
        userRegistrationSchema.parse(validRegistration)
      ).not.toThrow();
    });

    it('should reject mismatched passwords', () => {
      const invalidRegistration = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'different123',
        role: 'PATIENT' as const,
      };

      expect(() => userRegistrationSchema.parse(invalidRegistration)).toThrow();
    });

    it('should validate without optional phone', () => {
      const validRegistration = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        role: 'PATIENT' as const,
      };

      expect(() =>
        userRegistrationSchema.parse(validRegistration)
      ).not.toThrow();
    });

    it('should reject invalid roles', () => {
      const invalidRegistration = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        role: 'INVALID_ROLE',
      };

      expect(() => userRegistrationSchema.parse(invalidRegistration)).toThrow();
    });
  });

  describe('Doctor Profile Schema', () => {
    it('should validate complete doctor profile', () => {
      const validProfile = {
        name: 'Dr. John Smith',
        email: 'dr.smith@hospital.com',
        specialties: ['Cardiology', 'Internal Medicine'],
        experience: 10,
        qualification: 'MBBS, MD',
        consultationFee: 150,
        bio: 'Experienced cardiologist with 10 years of practice.',
      };

      expect(() => doctorProfileSchema.parse(validProfile)).not.toThrow();
    });

    it('should reject profile without specialties', () => {
      const invalidProfile = {
        name: 'Dr. John Smith',
        email: 'dr.smith@hospital.com',
        specialties: [],
        experience: 10,
        qualification: 'MBBS, MD',
        consultationFee: 150,
      };

      expect(() => doctorProfileSchema.parse(invalidProfile)).toThrow();
    });

    it('should reject negative experience or fee', () => {
      const invalidProfile = {
        name: 'Dr. John Smith',
        email: 'dr.smith@hospital.com',
        specialties: ['Cardiology'],
        experience: -5,
        qualification: 'MBBS, MD',
        consultationFee: -100,
      };

      expect(() => doctorProfileSchema.parse(invalidProfile)).toThrow();
    });

    it('should validate without optional bio', () => {
      const validProfile = {
        name: 'Dr. John Smith',
        email: 'dr.smith@hospital.com',
        specialties: ['Cardiology'],
        experience: 10,
        qualification: 'MBBS, MD',
        consultationFee: 150,
      };

      expect(() => doctorProfileSchema.parse(validProfile)).not.toThrow();
    });
  });

  describe('Appointment Schema', () => {
    it('should validate future appointment', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const validAppointment = {
        doctorId: 'doctor-123',
        date: tomorrow.toISOString().split('T')[0],
        time: '14:30',
        reason: 'Regular checkup and consultation for ongoing health concerns.',
      };

      expect(() => appointmentSchema.parse(validAppointment)).not.toThrow();
    });

    it('should reject past appointment dates', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const invalidAppointment = {
        doctorId: 'doctor-123',
        date: yesterday.toISOString().split('T')[0],
        time: '14:30',
        reason: 'Regular checkup and consultation.',
      };

      expect(() => appointmentSchema.parse(invalidAppointment)).toThrow();
    });

    it('should reject invalid time format', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const invalidAppointment = {
        doctorId: 'doctor-123',
        date: tomorrow.toISOString().split('T')[0],
        time: '25:70',
        reason: 'Regular checkup and consultation.',
      };

      expect(() => appointmentSchema.parse(invalidAppointment)).toThrow();
    });

    it('should reject short reason', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const invalidAppointment = {
        doctorId: 'doctor-123',
        date: tomorrow.toISOString().split('T')[0],
        time: '14:30',
        reason: 'Checkup',
      };

      expect(() => appointmentSchema.parse(invalidAppointment)).toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty strings', () => {
      expect(() => emailSchema.parse('')).toThrow();
      expect(() => passwordSchema.parse('')).toThrow();
      expect(() => nameSchema.parse('')).toThrow();
    });

    it('should handle null and undefined values', () => {
      expect(() => emailSchema.parse(null)).toThrow();
      expect(() => emailSchema.parse(undefined)).toThrow();
      expect(() => passwordSchema.parse(null)).toThrow();
      expect(() => passwordSchema.parse(undefined)).toThrow();
    });

    it('should handle whitespace-only strings', () => {
      expect(() => nameSchema.parse('   ')).toThrow();
      expect(() => emailSchema.parse('   ')).toThrow();
    });

    it('should handle very long strings', () => {
      const longString = 'a'.repeat(1000);
      expect(() => nameSchema.parse(longString)).toThrow();
      expect(() =>
        doctorProfileSchema.parse({
          name: 'Dr. Smith',
          email: 'dr@example.com',
          specialties: ['Cardiology'],
          experience: 10,
          qualification: 'MBBS',
          consultationFee: 100,
          bio: longString,
        })
      ).toThrow();
    });
  });
});
