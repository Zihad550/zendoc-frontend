import { describe, expect, it } from 'vitest';
import {
    passwordChangeValidationSchema,
    passwordResetConfirmValidationSchema,
    passwordResetValidationSchema,
    strongPasswordValidationSchema,
    type PasswordChangeFormValues,
    type PasswordResetConfirmFormValues,
    type PasswordResetFormValues,
} from '../password.validation';

describe('Password Validation Schemas', () => {
    describe('passwordChangeValidationSchema', () => {
        const validPasswordChangeData: PasswordChangeFormValues = {
            oldPassword: 'currentPassword123',
            newPassword: 'newSecurePassword456',
        };

        describe('Valid Data', () => {
            it('should validate correct password change data', () => {
                const result = passwordChangeValidationSchema.safeParse(validPasswordChangeData);
                expect(result.success).toBe(true);
            });

            it('should validate with minimum length passwords', () => {
                const minimalData = {
                    oldPassword: '123456',
                    newPassword: 'abcdef',
                };
                const result = passwordChangeValidationSchema.safeParse(minimalData);
                expect(result.success).toBe(true);
            });
        });

        describe('Old Password Validation', () => {
            it('should reject old password shorter than 6 characters', () => {
                const invalidData = {
                    ...validPasswordChangeData,
                    oldPassword: '12345',
                };
                const result = passwordChangeValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(
                        'Old password must be at least 6 characters long'
                    );
                }
            });

            it('should reject empty old password', () => {
                const invalidData = {
                    ...validPasswordChangeData,
                    oldPassword: '',
                };
                const result = passwordChangeValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
            });
        });

        describe('New Password Validation', () => {
            it('should reject new password shorter than 6 characters', () => {
                const invalidData = {
                    ...validPasswordChangeData,
                    newPassword: '12345',
                };
                const result = passwordChangeValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(
                        'New password must be at least 6 characters long'
                    );
                }
            });

            it('should reject empty new password', () => {
                const invalidData = {
                    ...validPasswordChangeData,
                    newPassword: '',
                };
                const result = passwordChangeValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
            });

            it('should accept various valid new passwords', () => {
                const validPasswords = [
                    '123456',
                    'password',
                    'newSecurePassword123',
                    'P@ssw0rd!',
                    'very-long-password-with-special-characters-123!@#',
                ];

                validPasswords.forEach((newPassword) => {
                    const data = { ...validPasswordChangeData, newPassword };
                    const result = passwordChangeValidationSchema.safeParse(data);
                    expect(result.success).toBe(true);
                });
            });
        });
    });

    describe('passwordResetValidationSchema', () => {
        const validPasswordResetData: PasswordResetFormValues = {
            email: 'user@example.com',
        };

        describe('Valid Data', () => {
            it('should validate correct email for password reset', () => {
                const result = passwordResetValidationSchema.safeParse(validPasswordResetData);
                expect(result.success).toBe(true);
            });

            it('should validate various email formats', () => {
                const validEmails = [
                    'test@example.com',
                    'user.name@domain.co.uk',
                    'test+tag@example.org',
                    'user123@test-domain.com',
                    'a@b.co',
                ];

                validEmails.forEach((email) => {
                    const data = { email };
                    const result = passwordResetValidationSchema.safeParse(data);
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
                    '',
                ];

                invalidEmails.forEach((email) => {
                    const data = { email };
                    const result = passwordResetValidationSchema.safeParse(data);
                    expect(result.success).toBe(false);
                    if (!result.success) {
                        expect(result.error.issues[0].message).toBe('Please enter a valid email address');
                    }
                });
            });
        });
    });

    describe('passwordResetConfirmValidationSchema', () => {
        const validPasswordResetConfirmData: PasswordResetConfirmFormValues = {
            password: 'NewPassword123',
            confirmPassword: 'NewPassword123',
            token: 'reset-token-123456',
        };

        describe('Valid Data', () => {
            it('should validate correct password reset confirmation data', () => {
                const result = passwordResetConfirmValidationSchema.safeParse(validPasswordResetConfirmData);
                expect(result.success).toBe(true);
            });

            it('should validate with minimum requirements', () => {
                const minimalData = {
                    password: 'Pass123',
                    confirmPassword: 'Pass123',
                    token: 'token',
                };
                const result = passwordResetConfirmValidationSchema.safeParse(minimalData);
                expect(result.success).toBe(true);
            });
        });

        describe('Password Validation', () => {
            it('should reject password shorter than 6 characters', () => {
                const invalidData = {
                    ...validPasswordResetConfirmData,
                    password: 'Pass1',
                    confirmPassword: 'Pass1',
                };
                const result = passwordResetConfirmValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(
                        'Password must be at least 6 characters long'
                    );
                }
            });

            it('should reject password without lowercase letter', () => {
                const invalidData = {
                    ...validPasswordResetConfirmData,
                    password: 'PASSWORD123',
                    confirmPassword: 'PASSWORD123',
                };
                const result = passwordResetConfirmValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(
                        'Password must contain at least one lowercase letter, one uppercase letter, and one number'
                    );
                }
            });

            it('should reject password without uppercase letter', () => {
                const invalidData = {
                    ...validPasswordResetConfirmData,
                    password: 'password123',
                    confirmPassword: 'password123',
                };
                const result = passwordResetConfirmValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(
                        'Password must contain at least one lowercase letter, one uppercase letter, and one number'
                    );
                }
            });

            it('should reject password without number', () => {
                const invalidData = {
                    ...validPasswordResetConfirmData,
                    password: 'Password',
                    confirmPassword: 'Password',
                };
                const result = passwordResetConfirmValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(
                        'Password must contain at least one lowercase letter, one uppercase letter, and one number'
                    );
                }
            });

            it('should accept valid passwords with all requirements', () => {
                const validPasswords = [
                    'Password123',
                    'MySecure1',
                    'Test123Pass',
                    'Abc123def',
                ];

                validPasswords.forEach((password) => {
                    const data = {
                        ...validPasswordResetConfirmData,
                        password,
                        confirmPassword: password,
                    };
                    const result = passwordResetConfirmValidationSchema.safeParse(data);
                    expect(result.success).toBe(true);
                });
            });
        });

        describe('Password Confirmation Validation', () => {
            it('should reject when passwords do not match', () => {
                const invalidData = {
                    ...validPasswordResetConfirmData,
                    password: 'Password123',
                    confirmPassword: 'DifferentPassword123',
                };
                const result = passwordResetConfirmValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    const confirmPasswordError = result.error.issues.find(
                        (issue) => issue.path.includes('confirmPassword')
                    );
                    expect(confirmPasswordError?.message).toBe("Passwords don't match");
                }
            });

            it('should reject short confirm password', () => {
                const invalidData = {
                    ...validPasswordResetConfirmData,
                    confirmPassword: '12345',
                };
                const result = passwordResetConfirmValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
            });
        });

        describe('Token Validation', () => {
            it('should reject empty token', () => {
                const invalidData = {
                    ...validPasswordResetConfirmData,
                    token: '',
                };
                const result = passwordResetConfirmValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe('Reset token is required');
                }
            });

            it('should accept various token formats', () => {
                const validTokens = [
                    'token',
                    'reset-token-123456',
                    'jwt.token.here',
                    'very-long-token-with-special-characters-123!@#',
                ];

                validTokens.forEach((token) => {
                    const data = { ...validPasswordResetConfirmData, token };
                    const result = passwordResetConfirmValidationSchema.safeParse(data);
                    expect(result.success).toBe(true);
                });
            });
        });
    });

    describe('strongPasswordValidationSchema', () => {
        describe('Valid Passwords', () => {
            it('should validate strong passwords', () => {
                const validPasswords = [
                    'Password123!',
                    'MySecure1@',
                    'Test123#Pass',
                    'Abc123$def',
                    'StrongP@ssw0rd',
                    'Complex123!@#',
                ];

                validPasswords.forEach((password) => {
                    const result = strongPasswordValidationSchema.safeParse(password);
                    expect(result.success).toBe(true);
                });
            });
        });

        describe('Invalid Passwords', () => {
            it('should reject password shorter than 8 characters', () => {
                const shortPassword = 'Pass1!';
                const result = strongPasswordValidationSchema.safeParse(shortPassword);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(
                        'Password must be at least 8 characters long'
                    );
                }
            });

            it('should reject password without lowercase letter', () => {
                const password = 'PASSWORD123!';
                const result = strongPasswordValidationSchema.safeParse(password);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(
                        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
                    );
                }
            });

            it('should reject password without uppercase letter', () => {
                const password = 'password123!';
                const result = strongPasswordValidationSchema.safeParse(password);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(
                        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
                    );
                }
            });

            it('should reject password without number', () => {
                const password = 'Password!';
                const result = strongPasswordValidationSchema.safeParse(password);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(
                        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
                    );
                }
            });

            it('should reject password without special character', () => {
                const password = 'Password123';
                const result = strongPasswordValidationSchema.safeParse(password);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(
                        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
                    );
                }
            });

            it('should reject password with only some requirements', () => {
                const weakPasswords = [
                    'password', // Only lowercase
                    'PASSWORD', // Only uppercase
                    '12345678', // Only numbers
                    '!@#$%^&*', // Only special characters
                    'Password', // Missing number and special character
                    'password123', // Missing uppercase and special character
                ];

                weakPasswords.forEach((password) => {
                    const result = strongPasswordValidationSchema.safeParse(password);
                    expect(result.success).toBe(false);
                });
            });
        });

        describe('Special Characters', () => {
            it('should accept various special characters', () => {
                const specialChars = ['!', '@', '#', '$', '%', '*', '?', '&'];

                specialChars.forEach((char) => {
                    const password = `Password123${char}`;
                    const result = strongPasswordValidationSchema.safeParse(password);
                    expect(result.success).toBe(true);
                });
            });
        });
    });
});