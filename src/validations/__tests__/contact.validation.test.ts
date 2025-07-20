import { describe, expect, it } from 'vitest';
import { validationSchema, type ContactFormValues } from '../../app/(public)/contact-us/contact';

describe('Contact Form Validation Schema', () => {
    const validContactData: ContactFormValues = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        subject: 'General Inquiry',
        message: 'I would like to know more about your services.',
    };

    describe('Valid Data', () => {
        it('should validate correct contact form data', () => {
            const result = validationSchema.safeParse(validContactData);
            expect(result.success).toBe(true);
        });

        it('should validate with minimum valid values', () => {
            const minimalData = {
                name: 'Jo',
                email: 'a@b.co',
                phone: '1234567890',
                subject: '12345',
                message: '1234567890',
            };
            const result = validationSchema.safeParse(minimalData);
            expect(result.success).toBe(true);
        });

        it('should validate with longer values', () => {
            const extendedData = {
                name: 'Dr. Jonathan Alexander Smith-Johnson',
                email: 'jonathan.alexander.smith-johnson@healthcare-center.example.com',
                phone: '12345678901234567890',
                subject: 'Comprehensive Healthcare Consultation and Treatment Planning',
                message: 'I am writing to inquire about comprehensive healthcare services including preventive care, diagnostic testing, treatment planning, and ongoing health management. I would appreciate detailed information about your services, availability, and scheduling process.',
            };
            const result = validationSchema.safeParse(extendedData);
            expect(result.success).toBe(true);
        });
    });

    describe('Name Validation', () => {
        it('should reject empty name', () => {
            const invalidData = {
                ...validContactData,
                name: '',
            };
            const result = validationSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe('Name must be at least 2 characters');
            }
        });

        it('should reject single character name', () => {
            const invalidData = {
                ...validContactData,
                name: 'J',
            };
            const result = validationSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe('Name must be at least 2 characters');
            }
        });

        it('should accept various valid names', () => {
            const validNames = [
                'Jo',
                'John',
                'John Doe',
                'Dr. John Smith',
                'Mary-Jane Watson',
                'José María García',
                '李小明',
                'محمد أحمد',
            ];

            validNames.forEach((name) => {
                const data = { ...validContactData, name };
                const result = validationSchema.safeParse(data);
                expect(result.success).toBe(true);
            });
        });
    });

    describe('Email Validation', () => {
        it('should reject invalid email formats', () => {
            const invalidEmails = [
                'invalid-email',
                'test@',
                '@example.com',
                'test.example.com',
                'test@.com',
                'test@domain.',
                '',
                'test space@example.com',
            ];

            invalidEmails.forEach((email) => {
                const invalidData = { ...validContactData, email };
                const result = validationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe('Please enter a valid email');
                }
            });
        });

        it('should accept valid email formats', () => {
            const validEmails = [
                'test@example.com',
                'user.name@domain.co.uk',
                'test+tag@example.org',
                'user123@test-domain.com',
                'a@b.co',
                'very.long.email.address@very-long-domain-name.example.com',
                'user_name@example-domain.org',
            ];

            validEmails.forEach((email) => {
                const data = { ...validContactData, email };
                const result = validationSchema.safeParse(data);
                expect(result.success).toBe(true);
            });
        });
    });

    describe('Phone Validation', () => {
        it('should reject phone number shorter than 10 characters', () => {
            const invalidData = {
                ...validContactData,
                phone: '123456789',
            };
            const result = validationSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe('Phone number must be at least 10 characters');
            }
        });

        it('should reject empty phone number', () => {
            const invalidData = {
                ...validContactData,
                phone: '',
            };
            const result = validationSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe('Phone number must be at least 10 characters');
            }
        });

        it('should accept valid phone numbers', () => {
            const validPhones = [
                '1234567890',
                '12345678901',
                '+1234567890',
                '(123) 456-7890',
                '123-456-7890',
                '123.456.7890',
                '+1 (123) 456-7890',
                '1234567890123456789',
            ];

            validPhones.forEach((phone) => {
                const data = { ...validContactData, phone };
                const result = validationSchema.safeParse(data);
                expect(result.success).toBe(true);
            });
        });
    });

    describe('Subject Validation', () => {
        it('should reject subject shorter than 5 characters', () => {
            const invalidData = {
                ...validContactData,
                subject: '1234',
            };
            const result = validationSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe('Subject must be at least 5 characters');
            }
        });

        it('should reject empty subject', () => {
            const invalidData = {
                ...validContactData,
                subject: '',
            };
            const result = validationSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe('Subject must be at least 5 characters');
            }
        });

        it('should accept valid subjects', () => {
            const validSubjects = [
                '12345',
                'Hello',
                'General Inquiry',
                'Appointment Request',
                'Technical Support',
                'Billing Question',
                'Emergency Medical Consultation Request',
                'Follow-up on Previous Consultation',
            ];

            validSubjects.forEach((subject) => {
                const data = { ...validContactData, subject };
                const result = validationSchema.safeParse(data);
                expect(result.success).toBe(true);
            });
        });
    });

    describe('Message Validation', () => {
        it('should reject message shorter than 10 characters', () => {
            const invalidData = {
                ...validContactData,
                message: '123456789',
            };
            const result = validationSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe('Message must be at least 10 characters');
            }
        });

        it('should reject empty message', () => {
            const invalidData = {
                ...validContactData,
                message: '',
            };
            const result = validationSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe('Message must be at least 10 characters');
            }
        });

        it('should accept valid messages', () => {
            const validMessages = [
                '1234567890',
                'Hello there',
                'I need help with my account.',
                'Please provide more information about your services.',
                'I would like to schedule an appointment for next week.',
                'This is a very long message that contains detailed information about my medical condition and the specific type of consultation I am seeking. I hope this provides enough context for you to understand my needs.',
            ];

            validMessages.forEach((message) => {
                const data = { ...validContactData, message };
                const result = validationSchema.safeParse(data);
                expect(result.success).toBe(true);
            });
        });
    });

    describe('Complete Form Validation', () => {
        it('should reject form with multiple missing fields', () => {
            const invalidData = {
                name: '',
                email: 'invalid-email',
                phone: '123',
                subject: '123',
                message: '123',
            };
            const result = validationSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.length).toBeGreaterThan(1);
            }
        });

        it('should validate form with all fields at minimum requirements', () => {
            const minimalValidData = {
                name: 'Jo',
                email: 'a@b.co',
                phone: '1234567890',
                subject: '12345',
                message: '1234567890',
            };
            const result = validationSchema.safeParse(minimalValidData);
            expect(result.success).toBe(true);
        });

        it('should handle special characters in all fields', () => {
            const specialCharData = {
                name: 'José María O\'Connor-Smith',
                email: 'jose.maria@example.com', // Use ASCII email for validation
                phone: '+1 (555) 123-4567',
                subject: 'Consulta médica - Urgente!',
                message: 'Necesito una cita médica urgente. ¿Pueden ayudarme? Gracias.',
            };
            const result = validationSchema.safeParse(specialCharData);
            expect(result.success).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        it('should handle whitespace-only fields', () => {
            const whitespaceData = {
                name: '   ',
                email: '   ',
                phone: '   ',
                subject: '   ',
                message: '   ',
            };
            const result = validationSchema.safeParse(whitespaceData);
            expect(result.success).toBe(false);
        });

        it('should handle fields with leading/trailing whitespace', () => {
            const whitespaceData = {
                name: '  John Doe  ',
                email: '  john@example.com  ',
                phone: '  1234567890  ',
                subject: '  General Inquiry  ',
                message: '  I need help with something  ',
            };
            const result = validationSchema.safeParse(whitespaceData);
            // Note: The current validation schema doesn't trim whitespace, so this may fail
            // This test documents the current behavior
            expect(result.success).toBe(false);
        });

        it('should handle very long valid inputs', () => {
            const longData = {
                name: 'A'.repeat(100),
                email: `${'a'.repeat(50)}@${'b'.repeat(50)}.com`,
                phone: '1'.repeat(20),
                subject: 'S'.repeat(200),
                message: 'M'.repeat(1000),
            };
            const result = validationSchema.safeParse(longData);
            expect(result.success).toBe(true);
        });
    });
});