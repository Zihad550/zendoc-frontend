import { describe, expect, it } from 'vitest';
import {
    doctorProfileValidationSchema,
    doctorUpdateValidationSchema,
    type DoctorProfileFormValues,
    type DoctorUpdateFormValues,
} from '../doctor.validation';

describe('Doctor Validation Schemas', () => {
    describe('doctorProfileValidationSchema', () => {
        const validDoctorData: DoctorProfileFormValues = {
            doctor: {
                name: 'Dr. John Smith',
                email: 'john.smith@example.com',
                contactNumber: '1234567890',
                address: '123 Medical Center Drive, Healthcare City',
                registrationNumber: 'MD12345',
                gender: 'MALE',
                experience: 10,
                appointmentFee: 150,
                qualification: 'MD, Internal Medicine',
                currentWorkingPlace: 'City General Hospital',
                designation: 'Senior Physician',
                profilePhoto: 'https://example.com/photo.jpg',
            },
            password: 'securePassword123',
        };

        describe('Valid Data', () => {
            it('should validate correct doctor profile data', () => {
                const result = doctorProfileValidationSchema.safeParse(validDoctorData);
                expect(result.success).toBe(true);
            });

            it('should validate without optional profilePhoto', () => {
                const dataWithoutPhoto = {
                    ...validDoctorData,
                    doctor: {
                        ...validDoctorData.doctor,
                        profilePhoto: undefined,
                    },
                };
                const result = doctorProfileValidationSchema.safeParse(dataWithoutPhoto);
                expect(result.success).toBe(true);
            });

            it('should validate with minimum valid values', () => {
                const minimalData = {
                    doctor: {
                        name: 'Dr',
                        email: 'a@b.co',
                        contactNumber: '1234567890',
                        address: '12345',
                        registrationNumber: 'MD1',
                        gender: 'FEMALE' as const,
                        experience: 0,
                        appointmentFee: 0,
                        qualification: 'MD',
                        currentWorkingPlace: 'HC',
                        designation: 'Dr',
                    },
                    password: '123456',
                };
                const result = doctorProfileValidationSchema.safeParse(minimalData);
                expect(result.success).toBe(true);
            });
        });

        describe('Name Validation', () => {
            it('should reject empty name', () => {
                const invalidData = {
                    ...validDoctorData,
                    doctor: { ...validDoctorData.doctor, name: '' },
                };
                const result = doctorProfileValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe('Name must be at least 2 characters');
                }
            });

            it('should reject single character name', () => {
                const invalidData = {
                    ...validDoctorData,
                    doctor: { ...validDoctorData.doctor, name: 'D' },
                };
                const result = doctorProfileValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe('Name must be at least 2 characters');
                }
            });
        });

        describe('Email Validation', () => {
            it('should reject invalid email format', () => {
                const invalidData = {
                    ...validDoctorData,
                    doctor: { ...validDoctorData.doctor, email: 'invalid-email' },
                };
                const result = doctorProfileValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe('Please enter a valid email address');
                }
            });

            it('should reject email without domain', () => {
                const invalidData = {
                    ...validDoctorData,
                    doctor: { ...validDoctorData.doctor, email: 'test@' },
                };
                const result = doctorProfileValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
            });

            it('should accept valid email formats', () => {
                const validEmails = [
                    'test@example.com',
                    'user.name@domain.co.uk',
                    'test+tag@example.org',
                ];

                validEmails.forEach((email) => {
                    const data = {
                        ...validDoctorData,
                        doctor: { ...validDoctorData.doctor, email },
                    };
                    const result = doctorProfileValidationSchema.safeParse(data);
                    expect(result.success).toBe(true);
                });
            });
        });

        describe('Contact Number Validation', () => {
            it('should reject contact number with less than 10 digits', () => {
                const invalidData = {
                    ...validDoctorData,
                    doctor: { ...validDoctorData.doctor, contactNumber: '123456789' },
                };
                const result = doctorProfileValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(
                        'Please provide a valid phone number (10-15 digits)'
                    );
                }
            });

            it('should reject contact number with more than 15 digits', () => {
                const invalidData = {
                    ...validDoctorData,
                    doctor: { ...validDoctorData.doctor, contactNumber: '1234567890123456' },
                };
                const result = doctorProfileValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
            });

            it('should reject contact number with non-numeric characters', () => {
                const invalidData = {
                    ...validDoctorData,
                    doctor: { ...validDoctorData.doctor, contactNumber: '123-456-7890' },
                };
                const result = doctorProfileValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
            });

            it('should accept valid contact numbers', () => {
                const validNumbers = ['1234567890', '12345678901', '123456789012345'];

                validNumbers.forEach((contactNumber) => {
                    const data = {
                        ...validDoctorData,
                        doctor: { ...validDoctorData.doctor, contactNumber },
                    };
                    const result = doctorProfileValidationSchema.safeParse(data);
                    expect(result.success).toBe(true);
                });
            });
        });

        describe('Address Validation', () => {
            it('should reject address shorter than 5 characters', () => {
                const invalidData = {
                    ...validDoctorData,
                    doctor: { ...validDoctorData.doctor, address: '1234' },
                };
                const result = doctorProfileValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe('Address must be at least 5 characters');
                }
            });

            it('should accept valid addresses', () => {
                const validAddresses = [
                    '12345',
                    '123 Main Street',
                    '456 Healthcare Boulevard, Medical District, City 12345',
                ];

                validAddresses.forEach((address) => {
                    const data = {
                        ...validDoctorData,
                        doctor: { ...validDoctorData.doctor, address },
                    };
                    const result = doctorProfileValidationSchema.safeParse(data);
                    expect(result.success).toBe(true);
                });
            });
        });

        describe('Gender Validation', () => {
            it('should accept valid gender values', () => {
                const validGenders: Array<'MALE' | 'FEMALE' | 'OTHER'> = ['MALE', 'FEMALE', 'OTHER'];

                validGenders.forEach((gender) => {
                    const data = {
                        ...validDoctorData,
                        doctor: { ...validDoctorData.doctor, gender },
                    };
                    const result = doctorProfileValidationSchema.safeParse(data);
                    expect(result.success).toBe(true);
                });
            });

            it('should reject invalid gender values', () => {
                const invalidData = {
                    ...validDoctorData,
                    doctor: { ...validDoctorData.doctor, gender: 'INVALID' as any },
                };
                const result = doctorProfileValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toContain('expected one of');
                }
            });
        });

        describe('Experience Validation', () => {
            it('should reject negative experience', () => {
                const invalidData = {
                    ...validDoctorData,
                    doctor: { ...validDoctorData.doctor, experience: -1 },
                };
                const result = doctorProfileValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe('Experience cannot be negative');
                }
            });

            it('should reject experience over 50 years', () => {
                const invalidData = {
                    ...validDoctorData,
                    doctor: { ...validDoctorData.doctor, experience: 51 },
                };
                const result = doctorProfileValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe('Experience cannot exceed 50 years');
                }
            });

            it('should accept valid experience values', () => {
                const validExperiences = [0, 1, 25, 50];

                validExperiences.forEach((experience) => {
                    const data = {
                        ...validDoctorData,
                        doctor: { ...validDoctorData.doctor, experience },
                    };
                    const result = doctorProfileValidationSchema.safeParse(data);
                    expect(result.success).toBe(true);
                });
            });
        });

        describe('Appointment Fee Validation', () => {
            it('should reject negative appointment fee', () => {
                const invalidData = {
                    ...validDoctorData,
                    doctor: { ...validDoctorData.doctor, appointmentFee: -1 },
                };
                const result = doctorProfileValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe('Appointment fee cannot be negative');
                }
            });

            it('should reject appointment fee over $10,000', () => {
                const invalidData = {
                    ...validDoctorData,
                    doctor: { ...validDoctorData.doctor, appointmentFee: 10001 },
                };
                const result = doctorProfileValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe('Appointment fee cannot exceed $10,000');
                }
            });

            it('should accept valid appointment fees', () => {
                const validFees = [0, 50, 150, 500, 10000];

                validFees.forEach((appointmentFee) => {
                    const data = {
                        ...validDoctorData,
                        doctor: { ...validDoctorData.doctor, appointmentFee },
                    };
                    const result = doctorProfileValidationSchema.safeParse(data);
                    expect(result.success).toBe(true);
                });
            });
        });

        describe('Password Validation', () => {
            it('should reject password shorter than 6 characters', () => {
                const invalidData = {
                    ...validDoctorData,
                    password: '12345',
                };
                const result = doctorProfileValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe('Password must be at least 6 characters');
                }
            });

            it('should accept valid passwords', () => {
                const validPasswords = ['123456', 'password', 'securePassword123'];

                validPasswords.forEach((password) => {
                    const data = { ...validDoctorData, password };
                    const result = doctorProfileValidationSchema.safeParse(data);
                    expect(result.success).toBe(true);
                });
            });
        });
    });

    describe('doctorUpdateValidationSchema', () => {
        it('should validate empty update object', () => {
            const result = doctorUpdateValidationSchema.safeParse({});
            expect(result.success).toBe(true);
        });

        it('should validate partial updates', () => {
            const partialUpdate: Partial<DoctorUpdateFormValues> = {
                name: 'Updated Name',
                experience: 15,
            };
            const result = doctorUpdateValidationSchema.safeParse(partialUpdate);
            expect(result.success).toBe(true);
        });

        it('should validate individual field updates', () => {
            const updates = [
                { name: 'Dr. Updated Name' },
                { email: 'updated@example.com' },
                { contactNumber: '9876543210' },
                { experience: 20 },
                { appointmentFee: 200 },
            ];

            updates.forEach((update) => {
                const result = doctorUpdateValidationSchema.safeParse(update);
                expect(result.success).toBe(true);
            });
        });

        it('should reject invalid field values in updates', () => {
            const invalidUpdates = [
                { name: 'D' }, // Too short
                { email: 'invalid-email' }, // Invalid format
                { contactNumber: '123' }, // Too short
                { experience: -1 }, // Negative
                { appointmentFee: -50 }, // Negative
            ];

            invalidUpdates.forEach((update) => {
                const result = doctorUpdateValidationSchema.safeParse(update);
                expect(result.success).toBe(false);
            });
        });
    });
});