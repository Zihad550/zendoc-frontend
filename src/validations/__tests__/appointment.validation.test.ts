import { describe, expect, it } from 'vitest';
import {
    appointmentBookingValidationSchema,
    appointmentRescheduleValidationSchema,
    appointmentUpdateValidationSchema,
    type AppointmentBookingFormValues,
    type AppointmentRescheduleFormValues,
    type AppointmentUpdateFormValues,
} from '../appointment.validation';

describe('Appointment Validation Schemas', () => {
    describe('appointmentBookingValidationSchema', () => {
        const validAppointmentData: AppointmentBookingFormValues = {
            symptoms: 'I have been experiencing severe headaches and dizziness for the past week.',
            duration: 'one-two-weeks',
            previousTreatments: 'Took over-the-counter pain medication',
            additionalNotes: 'No known allergies. Currently taking blood pressure medication.',
            doctorId: 'doctor-123',
            scheduleId: 'schedule-456',
            appointmentDate: '2024-02-15',
            appointmentTime: '10:00 AM',
        };

        describe('Valid Data', () => {
            it('should validate correct appointment booking data', () => {
                const result = appointmentBookingValidationSchema.safeParse(validAppointmentData);
                expect(result.success).toBe(true);
            });

            it('should validate without optional fields', () => {
                const minimalData = {
                    symptoms: 'Experiencing chest pain and shortness of breath',
                    duration: 'less-than-week',
                    doctorId: 'doctor-123',
                    scheduleId: 'schedule-456',
                    appointmentDate: '2024-02-15',
                    appointmentTime: '10:00 AM',
                };
                const result = appointmentBookingValidationSchema.safeParse(minimalData);
                expect(result.success).toBe(true);
            });

            it('should validate with empty optional fields', () => {
                const dataWithEmptyOptionals = {
                    ...validAppointmentData,
                    previousTreatments: '',
                    additionalNotes: '',
                };
                const result = appointmentBookingValidationSchema.safeParse(dataWithEmptyOptionals);
                expect(result.success).toBe(true);
            });
        });

        describe('Symptoms Validation', () => {
            it('should reject symptoms shorter than 10 characters', () => {
                const invalidData = {
                    ...validAppointmentData,
                    symptoms: 'headache',
                };
                const result = appointmentBookingValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(
                        'Please describe your symptoms in at least 10 characters'
                    );
                }
            });

            it('should reject symptoms longer than 1000 characters', () => {
                const longSymptoms = 'a'.repeat(1001);
                const invalidData = {
                    ...validAppointmentData,
                    symptoms: longSymptoms,
                };
                const result = appointmentBookingValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(
                        'Symptoms description cannot exceed 1000 characters'
                    );
                }
            });

            it('should accept symptoms at boundary lengths', () => {
                const boundarySymptoms = [
                    'a'.repeat(10), // Minimum length
                    'a'.repeat(500), // Mid-range
                    'a'.repeat(1000), // Maximum length
                ];

                boundarySymptoms.forEach((symptoms) => {
                    const data = { ...validAppointmentData, symptoms };
                    const result = appointmentBookingValidationSchema.safeParse(data);
                    expect(result.success).toBe(true);
                });
            });
        });

        describe('Duration Validation', () => {
            it('should accept all valid duration values', () => {
                const validDurations = [
                    'less-than-week',
                    'one-two-weeks',
                    'two-four-weeks',
                    'one-three-months',
                    'three-six-months',
                    'more-than-six-months',
                ] as const;

                validDurations.forEach((duration) => {
                    const data = { ...validAppointmentData, duration };
                    const result = appointmentBookingValidationSchema.safeParse(data);
                    expect(result.success).toBe(true);
                });
            });

            it('should reject invalid duration values', () => {
                const invalidData = {
                    ...validAppointmentData,
                    duration: 'invalid-duration' as any,
                };
                const result = appointmentBookingValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toContain('expected one of');
                }
            });
        });

        describe('Previous Treatments Validation', () => {
            it('should accept valid previous treatments', () => {
                const validTreatments = [
                    'None',
                    'Over-the-counter medication',
                    'Physical therapy and pain medication for 2 weeks',
                    'a'.repeat(500), // Maximum length
                ];

                validTreatments.forEach((previousTreatments) => {
                    const data = { ...validAppointmentData, previousTreatments };
                    const result = appointmentBookingValidationSchema.safeParse(data);
                    expect(result.success).toBe(true);
                });
            });

            it('should reject previous treatments longer than 500 characters', () => {
                const longTreatments = 'a'.repeat(501);
                const invalidData = {
                    ...validAppointmentData,
                    previousTreatments: longTreatments,
                };
                const result = appointmentBookingValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(
                        'Previous treatments description cannot exceed 500 characters'
                    );
                }
            });
        });

        describe('Additional Notes Validation', () => {
            it('should accept valid additional notes', () => {
                const validNotes = [
                    'No allergies',
                    'Allergic to penicillin. Taking daily vitamins.',
                    'a'.repeat(500), // Maximum length
                ];

                validNotes.forEach((additionalNotes) => {
                    const data = { ...validAppointmentData, additionalNotes };
                    const result = appointmentBookingValidationSchema.safeParse(data);
                    expect(result.success).toBe(true);
                });
            });

            it('should reject additional notes longer than 500 characters', () => {
                const longNotes = 'a'.repeat(501);
                const invalidData = {
                    ...validAppointmentData,
                    additionalNotes: longNotes,
                };
                const result = appointmentBookingValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(
                        'Additional notes cannot exceed 500 characters'
                    );
                }
            });
        });

        describe('Required Fields Validation', () => {
            it('should reject missing doctorId', () => {
                const invalidData = {
                    ...validAppointmentData,
                    doctorId: '',
                };
                const result = appointmentBookingValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe('Please select a doctor');
                }
            });

            it('should reject missing scheduleId', () => {
                const invalidData = {
                    ...validAppointmentData,
                    scheduleId: '',
                };
                const result = appointmentBookingValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe('Please select an appointment time');
                }
            });

            it('should reject missing appointmentDate', () => {
                const invalidData = {
                    ...validAppointmentData,
                    appointmentDate: '',
                };
                const result = appointmentBookingValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe('Please select an appointment date');
                }
            });

            it('should reject missing appointmentTime', () => {
                const invalidData = {
                    ...validAppointmentData,
                    appointmentTime: '',
                };
                const result = appointmentBookingValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe('Please select an appointment time');
                }
            });
        });
    });

    describe('appointmentUpdateValidationSchema', () => {
        it('should validate empty update object', () => {
            const result = appointmentUpdateValidationSchema.safeParse({});
            expect(result.success).toBe(true);
        });

        it('should validate partial updates', () => {
            const partialUpdate: Partial<AppointmentUpdateFormValues> = {
                symptoms: 'Updated symptoms description with more details',
                status: 'COMPLETED',
            };
            const result = appointmentUpdateValidationSchema.safeParse(partialUpdate);
            expect(result.success).toBe(true);
        });

        it('should validate status updates', () => {
            const validStatuses = ['SCHEDULED', 'INPROGRESS', 'COMPLETED', 'CANCELLED'] as const;

            validStatuses.forEach((status) => {
                const update = { status };
                const result = appointmentUpdateValidationSchema.safeParse(update);
                expect(result.success).toBe(true);
            });
        });

        it('should reject invalid status values', () => {
            const invalidUpdate = {
                status: 'INVALID_STATUS' as any,
            };
            const result = appointmentUpdateValidationSchema.safeParse(invalidUpdate);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('expected one of');
            }
        });

        it('should validate individual field updates', () => {
            const updates = [
                { symptoms: 'Updated symptoms with detailed description' },
                { duration: 'three-six-months' },
                { previousTreatments: 'Updated treatment history' },
                { additionalNotes: 'Updated additional notes' },
            ];

            updates.forEach((update) => {
                const result = appointmentUpdateValidationSchema.safeParse(update);
                expect(result.success).toBe(true);
            });
        });
    });

    describe('appointmentRescheduleValidationSchema', () => {
        const validRescheduleData: AppointmentRescheduleFormValues = {
            scheduleId: 'new-schedule-789',
            appointmentDate: '2024-02-20',
            appointmentTime: '2:00 PM',
            reason: 'Emergency came up, need to reschedule',
        };

        describe('Valid Data', () => {
            it('should validate correct reschedule data', () => {
                const result = appointmentRescheduleValidationSchema.safeParse(validRescheduleData);
                expect(result.success).toBe(true);
            });

            it('should validate without optional reason', () => {
                const dataWithoutReason = {
                    scheduleId: 'new-schedule-789',
                    appointmentDate: '2024-02-20',
                    appointmentTime: '2:00 PM',
                };
                const result = appointmentRescheduleValidationSchema.safeParse(dataWithoutReason);
                expect(result.success).toBe(true);
            });
        });

        describe('Required Fields Validation', () => {
            it('should reject missing scheduleId', () => {
                const invalidData = {
                    ...validRescheduleData,
                    scheduleId: '',
                };
                const result = appointmentRescheduleValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe('Please select a new appointment time');
                }
            });

            it('should reject missing appointmentDate', () => {
                const invalidData = {
                    ...validRescheduleData,
                    appointmentDate: '',
                };
                const result = appointmentRescheduleValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe('Please select a new appointment date');
                }
            });

            it('should reject missing appointmentTime', () => {
                const invalidData = {
                    ...validRescheduleData,
                    appointmentTime: '',
                };
                const result = appointmentRescheduleValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe('Please select a new appointment time');
                }
            });
        });

        describe('Reason Validation', () => {
            it('should accept valid reasons', () => {
                const validReasons = [
                    'Emergency',
                    'Schedule conflict with work',
                    'a'.repeat(200), // Maximum length
                ];

                validReasons.forEach((reason) => {
                    const data = { ...validRescheduleData, reason };
                    const result = appointmentRescheduleValidationSchema.safeParse(data);
                    expect(result.success).toBe(true);
                });
            });

            it('should reject reason shorter than 5 characters', () => {
                const invalidData = {
                    ...validRescheduleData,
                    reason: 'sick',
                };
                const result = appointmentRescheduleValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(
                        'Please provide a reason for rescheduling (at least 5 characters)'
                    );
                }
            });

            it('should reject reason longer than 200 characters', () => {
                const longReason = 'a'.repeat(201);
                const invalidData = {
                    ...validRescheduleData,
                    reason: longReason,
                };
                const result = appointmentRescheduleValidationSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe('Reason cannot exceed 200 characters');
                }
            });
        });
    });
});