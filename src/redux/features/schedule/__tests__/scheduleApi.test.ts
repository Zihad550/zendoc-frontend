import { baseApi } from '@/redux/api/baseApi';
import authReducer, { IAuthState } from '@/redux/features/auth/authSlice';
import { IResponseRedux } from '@/types/apiResponse';
import { ISchedule } from '@/types/schedule';
import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { scheduleApi } from '../scheduleApi';

// Mock fetch globally
global.fetch = vi.fn();

// Mock data factories
const createMockSchedule = (overrides?: Partial<ISchedule>): ISchedule => ({
    id: 'schedule-1',
    startDateTime: new Date('2024-01-15T09:00:00Z'),
    endDateTime: new Date('2024-01-15T10:00:00Z'),
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    doctorSchedules: [
        {
            id: 'doctor-schedule-1',
            doctorId: 'doctor-1',
            scheduleId: 'schedule-1',
            isBooked: false,
            doctor: {
                id: 'doctor-1',
                name: 'Dr. John Doe',
                email: 'doctor@example.com',
                specialties: ['Cardiology'],
            },
        },
    ],
    ...overrides,
});

const createMockApiResponse = <T>(data: T, meta?: any): IResponseRedux<T> => ({
    success: true,
    message: 'Success',
    data,
    meta: meta || {
        page: 1,
        limit: 10,
        total: 1,
    },
});

const createMockScheduleData = (overrides?: any) => ({
    startDateTime: '2024-01-15T09:00:00Z',
    endDateTime: '2024-01-15T10:00:00Z',
    doctorId: 'doctor-1',
    isRecurring: false,
    ...overrides,
});

// Test store setup
const createTestStore = (initialAuthState?: Partial<IAuthState>) => {
    const defaultAuthState: IAuthState = {
        user: {
            email: 'admin@example.com',
            role: 'ADMIN',
            iat: Date.now(),
            exp: Date.now() + 3600000,
        },
        token: 'mock-admin-token',
        isAuthenticated: true,
    };

    return configureStore({
        reducer: {
            auth: authReducer,
            [baseApi.reducerPath]: baseApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }).concat(baseApi.middleware),
        preloadedState: {
            auth: { ...defaultAuthState, ...initialAuthState },
        },
    });
};

describe('scheduleApi', () => {
    let store: ReturnType<typeof createTestStore>;
    const mockFetch = fetch as vi.MockedFunction<typeof fetch>;

    beforeEach(() => {
        store = createTestStore();
        vi.clearAllMocks();
    });

    describe('createSchedule', () => {
        it('should create a new schedule successfully', async () => {
            const scheduleData = createMockScheduleData();
            const createdSchedule = createMockSchedule({
                startDateTime: new Date(scheduleData.startDateTime),
                endDateTime: new Date(scheduleData.endDateTime),
            });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    message: 'Schedule created successfully',
                    data: createdSchedule,
                }),
            } as Response);

            const result = await store.dispatch(scheduleApi.endpoints.createSchedule.initiate(scheduleData));

            expect(result.data?.success).toBe(true);
            expect(result.data?.data.startDateTime).toEqual(createdSchedule.startDateTime);
            expect(result.data?.data.endDateTime).toEqual(createdSchedule.endDateTime);

            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/schedule'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify(scheduleData),
                })
            );
        });

        it('should create recurring schedule', async () => {
            const recurringScheduleData = createMockScheduleData({
                isRecurring: true,
                recurringPattern: {
                    frequency: 'weekly',
                    daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
                    endDate: '2024-12-31',
                },
            });

            const createdSchedules = [
                createMockSchedule({ id: 'schedule-1' }),
                createMockSchedule({ id: 'schedule-2' }),
                createMockSchedule({ id: 'schedule-3' }),
            ];

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    message: 'Recurring schedules created successfully',
                    data: createdSchedules,
                }),
            } as Response);

            const result = await store.dispatch(
                scheduleApi.endpoints.createSchedule.initiate(recurringScheduleData)
            );

            expect(result.data?.success).toBe(true);
            expect(Array.isArray(result.data?.data)).toBe(true);
            expect(result.data?.data).toHaveLength(3);
        });

        it('should handle schedule conflict errors', async () => {
            const conflictingScheduleData = createMockScheduleData();

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 409,
                json: async () => ({
                    success: false,
                    message: 'Schedule conflicts with existing appointment',
                    error: 'SCHEDULE_CONFLICT',
                    conflictingSchedules: [
                        {
                            id: 'existing-schedule-1',
                            startDateTime: '2024-01-15T09:30:00Z',
                            endDateTime: '2024-01-15T10:30:00Z',
                        },
                    ],
                }),
            } as Response);

            const result = await store.dispatch(
                scheduleApi.endpoints.createSchedule.initiate(conflictingScheduleData)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle invalid time range errors', async () => {
            const invalidScheduleData = createMockScheduleData({
                startDateTime: '2024-01-15T10:00:00Z',
                endDateTime: '2024-01-15T09:00:00Z', // End before start
            });

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                json: async () => ({
                    success: false,
                    message: 'End time must be after start time',
                    error: 'INVALID_TIME_RANGE',
                }),
            } as Response);

            const result = await store.dispatch(
                scheduleApi.endpoints.createSchedule.initiate(invalidScheduleData)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle doctor not found errors', async () => {
            const scheduleDataWithInvalidDoctor = createMockScheduleData({
                doctorId: 'non-existent-doctor',
            });

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                json: async () => ({
                    success: false,
                    message: 'Doctor not found',
                    error: 'DOCTOR_NOT_FOUND',
                }),
            } as Response);

            const result = await store.dispatch(
                scheduleApi.endpoints.createSchedule.initiate(scheduleDataWithInvalidDoctor)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle past date validation', async () => {
            const pastScheduleData = createMockScheduleData({
                startDateTime: '2023-01-15T09:00:00Z', // Past date
                endDateTime: '2023-01-15T10:00:00Z',
            });

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                json: async () => ({
                    success: false,
                    message: 'Cannot create schedule for past dates',
                    error: 'PAST_DATE_NOT_ALLOWED',
                }),
            } as Response);

            const result = await store.dispatch(
                scheduleApi.endpoints.createSchedule.initiate(pastScheduleData)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });
    });

    describe('getAllSchedules', () => {
        it('should fetch all schedules with default parameters', async () => {
            const mockSchedules = [
                createMockSchedule(),
                createMockSchedule({ id: 'schedule-2', startDateTime: new Date('2024-01-16T09:00:00Z') }),
            ];
            const mockResponse = createMockApiResponse(mockSchedules, { page: 1, limit: 10, total: 2 });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            const result = await store.dispatch(scheduleApi.endpoints.getAllSchedules.initiate(undefined));

            expect(result.data).toEqual(mockResponse);
            expect(result.data?.data).toHaveLength(2);
            expect(result.data?.data[0].id).toBe('schedule-1');
            expect(result.data?.data[1].id).toBe('schedule-2');
        });

        it('should fetch schedules with filtering parameters', async () => {
            const mockSchedules = [createMockSchedule()];
            const mockResponse = createMockApiResponse(mockSchedules);

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            const queryParams = {
                doctorId: 'doctor-1',
                startDate: '2024-01-15',
                endDate: '2024-01-20',
                isBooked: false,
            };

            const result = await store.dispatch(scheduleApi.endpoints.getAllSchedules.initiate(queryParams));

            expect(result.data?.data).toHaveLength(1);

            // Verify URL contains query parameters
            const callUrl = mockFetch.mock.calls[0][0] as string;
            expect(callUrl).toContain('doctorId=doctor-1');
            expect(callUrl).toContain('startDate=2024-01-15');
            expect(callUrl).toContain('endDate=2024-01-20');
            expect(callUrl).toContain('isBooked=false');
        });

        it('should handle pagination parameters', async () => {
            const mockSchedules = [createMockSchedule()];
            const mockResponse = createMockApiResponse(mockSchedules, { page: 2, limit: 5, total: 10 });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            const queryParams = {
                page: 2,
                limit: 5,
            };

            const result = await store.dispatch(scheduleApi.endpoints.getAllSchedules.initiate(queryParams));

            expect(result.data?.meta.page).toBe(2);
            expect(result.data?.meta.limit).toBe(5);
            expect(result.data?.meta.total).toBe(10);
        });

        it('should handle empty results', async () => {
            const mockResponse = createMockApiResponse([], { page: 1, limit: 10, total: 0 });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            const result = await store.dispatch(scheduleApi.endpoints.getAllSchedules.initiate(undefined));

            expect(result.data?.data).toEqual([]);
            expect(result.data?.meta.total).toBe(0);
        });
    });

    describe('getAllDoctorSchedules', () => {
        it('should fetch schedules for specific doctor', async () => {
            const doctorEmail = 'doctor@example.com';
            const mockSchedules = [
                createMockSchedule({
                    doctorSchedules: [
                        {
                            id: 'doctor-schedule-1',
                            doctorId: 'doctor-1',
                            scheduleId: 'schedule-1',
                            isBooked: false,
                            doctor: {
                                id: 'doctor-1',
                                name: 'Dr. John Doe',
                                email: doctorEmail,
                                specialties: ['Cardiology'],
                            },
                        },
                    ],
                }),
            ];
            const mockResponse = createMockApiResponse(mockSchedules);

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            const result = await store.dispatch(
                scheduleApi.endpoints.getAllDoctorSchedules.initiate({
                    email: doctorEmail,
                })
            );

            expect(result.data?.data).toHaveLength(1);
            expect(result.data?.data[0].doctorSchedules[0].doctor.email).toBe(doctorEmail);

            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining(`/schedule/doctor/${doctorEmail}`),
                expect.objectContaining({
                    method: 'GET',
                })
            );
        });

        it('should fetch doctor schedules with additional parameters', async () => {
            const doctorEmail = 'doctor@example.com';
            const params = {
                startDate: '2024-01-15',
                endDate: '2024-01-20',
                isBooked: false,
            };

            const mockSchedules = [createMockSchedule()];
            const mockResponse = createMockApiResponse(mockSchedules);

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            const result = await store.dispatch(
                scheduleApi.endpoints.getAllDoctorSchedules.initiate({
                    email: doctorEmail,
                    params,
                })
            );

            expect(result.data?.data).toHaveLength(1);

            // Verify URL contains query parameters
            const callUrl = mockFetch.mock.calls[0][0] as string;
            expect(callUrl).toContain(`/schedule/doctor/${doctorEmail}`);
            expect(callUrl).toContain('startDate=2024-01-15');
            expect(callUrl).toContain('endDate=2024-01-20');
            expect(callUrl).toContain('isBooked=false');
        });

        it('should handle doctor not found', async () => {
            const doctorEmail = 'nonexistent@example.com';

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                json: async () => ({
                    success: false,
                    message: 'Doctor not found',
                    error: 'DOCTOR_NOT_FOUND',
                }),
            } as Response);

            const result = await store.dispatch(
                scheduleApi.endpoints.getAllDoctorSchedules.initiate({
                    email: doctorEmail,
                })
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle invalid email format', async () => {
            const invalidEmail = 'invalid-email';

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                json: async () => ({
                    success: false,
                    message: 'Invalid email format',
                    error: 'INVALID_EMAIL_FORMAT',
                }),
            } as Response);

            const result = await store.dispatch(
                scheduleApi.endpoints.getAllDoctorSchedules.initiate({
                    email: invalidEmail,
                })
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });
    });

    describe('deleteSchedule', () => {
        it('should delete schedule successfully', async () => {
            const scheduleId = 'schedule-123';

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    message: 'Schedule deleted successfully',
                }),
            } as Response);

            const result = await store.dispatch(scheduleApi.endpoints.deleteSchedule.initiate(scheduleId));

            expect(result.data?.success).toBe(true);
            expect(result.data?.message).toBe('Schedule deleted successfully');

            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining(`/schedule/${scheduleId}`),
                expect.objectContaining({
                    method: 'DELETE',
                })
            );
        });

        it('should handle schedule not found', async () => {
            const scheduleId = 'non-existent-schedule';

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                json: async () => ({
                    success: false,
                    message: 'Schedule not found',
                    error: 'SCHEDULE_NOT_FOUND',
                }),
            } as Response);

            const result = await store.dispatch(scheduleApi.endpoints.deleteSchedule.initiate(scheduleId));

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle deletion of booked schedule', async () => {
            const scheduleId = 'booked-schedule-123';

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                json: async () => ({
                    success: false,
                    message: 'Cannot delete schedule with existing appointments',
                    error: 'SCHEDULE_HAS_APPOINTMENTS',
                    appointmentCount: 3,
                }),
            } as Response);

            const result = await store.dispatch(scheduleApi.endpoints.deleteSchedule.initiate(scheduleId));

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle unauthorized deletion', async () => {
            const scheduleId = 'schedule-123';

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 403,
                json: async () => ({
                    success: false,
                    message: 'Not authorized to delete this schedule',
                    error: 'UNAUTHORIZED_DELETE',
                }),
            } as Response);

            const result = await store.dispatch(scheduleApi.endpoints.deleteSchedule.initiate(scheduleId));

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });
    });

    describe('Cache invalidation and tags', () => {
        it('should provide correct tags for queries', () => {
            expect(scheduleApi.endpoints.getAllSchedules.providesTags).toEqual(['schedule']);
            expect(scheduleApi.endpoints.getAllDoctorSchedules.providesTags).toEqual(['schedule']);
        });

        it('should invalidate correct tags on mutations', () => {
            expect(scheduleApi.endpoints.createSchedule.invalidatesTags).toEqual(['schedule']);
            expect(scheduleApi.endpoints.deleteSchedule.invalidatesTags).toEqual(['schedule']);
        });
    });

    describe('Hook generation', () => {
        it('should generate correct hooks', () => {
            expect(scheduleApi.useCreateScheduleMutation).toBeDefined();
            expect(scheduleApi.useGetAllSchedulesQuery).toBeDefined();
            expect(scheduleApi.useDeleteScheduleMutation).toBeDefined();
            expect(scheduleApi.useGetAllDoctorSchedulesQuery).toBeDefined();

            expect(typeof scheduleApi.useCreateScheduleMutation).toBe('function');
            expect(typeof scheduleApi.useGetAllSchedulesQuery).toBe('function');
            expect(typeof scheduleApi.useDeleteScheduleMutation).toBe('function');
            expect(typeof scheduleApi.useGetAllDoctorSchedulesQuery).toBe('function');
        });
    });

    describe('Authentication and authorization', () => {
        it('should include authorization headers', async () => {
            const scheduleData = createMockScheduleData();

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    data: createMockSchedule(),
                }),
            } as Response);

            await store.dispatch(scheduleApi.endpoints.createSchedule.initiate(scheduleData));

            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        authorization: 'mock-admin-token',
                    }),
                })
            );
        });

        it('should handle role-based access control', async () => {
            const patientStore = createTestStore({
                user: {
                    email: 'patient@example.com',
                    role: 'PATIENT',
                    iat: Date.now(),
                    exp: Date.now() + 3600000,
                },
                token: 'patient-token',
                isAuthenticated: true,
            });

            const scheduleData = createMockScheduleData();

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 403,
                json: async () => ({
                    success: false,
                    message: 'Insufficient permissions to create schedule',
                    error: 'INSUFFICIENT_PERMISSIONS',
                }),
            } as Response);

            const result = await patientStore.dispatch(
                scheduleApi.endpoints.createSchedule.initiate(scheduleData)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });
    });

    describe('Error handling', () => {
        it('should handle network errors', async () => {
            mockFetch.mockRejectedValueOnce(new Error('Network error'));

            const result = await store.dispatch(scheduleApi.endpoints.getAllSchedules.initiate(undefined));

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle malformed JSON responses', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => {
                    throw new Error('Invalid JSON');
                },
            } as Response);

            const result = await store.dispatch(scheduleApi.endpoints.getAllSchedules.initiate(undefined));

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle server errors', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
                json: async () => ({
                    success: false,
                    message: 'Internal server error',
                }),
            } as Response);

            const result = await store.dispatch(scheduleApi.endpoints.getAllSchedules.initiate(undefined));

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });
    });

    describe('Schedule business logic scenarios', () => {
        it('should handle overlapping schedule detection', async () => {
            const overlappingScheduleData = createMockScheduleData({
                startDateTime: '2024-01-15T09:30:00Z',
                endDateTime: '2024-01-15T10:30:00Z',
            });

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 409,
                json: async () => ({
                    success: false,
                    message: 'Schedule overlaps with existing schedule',
                    error: 'SCHEDULE_OVERLAP',
                    overlappingSchedules: [
                        {
                            id: 'existing-schedule',
                            startDateTime: '2024-01-15T09:00:00Z',
                            endDateTime: '2024-01-15T11:00:00Z',
                        },
                    ],
                }),
            } as Response);

            const result = await store.dispatch(
                scheduleApi.endpoints.createSchedule.initiate(overlappingScheduleData)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle doctor availability validation', async () => {
            const scheduleData = createMockScheduleData({
                startDateTime: '2024-01-15T02:00:00Z', // 2 AM - outside normal hours
                endDateTime: '2024-01-15T03:00:00Z',
            });

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                json: async () => ({
                    success: false,
                    message: 'Schedule outside doctor working hours',
                    error: 'OUTSIDE_WORKING_HOURS',
                    workingHours: {
                        start: '08:00',
                        end: '18:00',
                    },
                }),
            } as Response);

            const result = await store.dispatch(scheduleApi.endpoints.createSchedule.initiate(scheduleData));

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle minimum schedule duration validation', async () => {
            const shortScheduleData = createMockScheduleData({
                startDateTime: '2024-01-15T09:00:00Z',
                endDateTime: '2024-01-15T09:05:00Z', // Only 5 minutes
            });

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                json: async () => ({
                    success: false,
                    message: 'Schedule duration must be at least 15 minutes',
                    error: 'MINIMUM_DURATION_NOT_MET',
                    minimumDuration: 15,
                }),
            } as Response);

            const result = await store.dispatch(
                scheduleApi.endpoints.createSchedule.initiate(shortScheduleData)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle maximum advance booking validation', async () => {
            const farFutureScheduleData = createMockScheduleData({
                startDateTime: '2025-01-15T09:00:00Z', // Too far in future
                endDateTime: '2025-01-15T10:00:00Z',
            });

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                json: async () => ({
                    success: false,
                    message: 'Cannot schedule more than 6 months in advance',
                    error: 'ADVANCE_BOOKING_LIMIT_EXCEEDED',
                    maxAdvanceDays: 180,
                }),
            } as Response);

            const result = await store.dispatch(
                scheduleApi.endpoints.createSchedule.initiate(farFutureScheduleData)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });
    });

    describe('Edge cases and boundary conditions', () => {
        it('should handle timezone considerations', async () => {
            const scheduleData = createMockScheduleData({
                startDateTime: '2024-01-15T09:00:00+05:30', // Different timezone
                endDateTime: '2024-01-15T10:00:00+05:30',
                timezone: 'Asia/Kolkata',
            });

            const createdSchedule = createMockSchedule();

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    data: createdSchedule,
                }),
            } as Response);

            const result = await store.dispatch(scheduleApi.endpoints.createSchedule.initiate(scheduleData));

            expect(result.data?.success).toBe(true);
        });

        it('should handle daylight saving time transitions', async () => {
            const dstScheduleData = createMockScheduleData({
                startDateTime: '2024-03-10T07:00:00Z', // DST transition day
                endDateTime: '2024-03-10T08:00:00Z',
                timezone: 'America/New_York',
            });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    data: createMockSchedule(),
                    warnings: ['Schedule created during DST transition'],
                }),
            } as Response);

            const result = await store.dispatch(scheduleApi.endpoints.createSchedule.initiate(dstScheduleData));

            expect(result.data?.success).toBe(true);
        });

        it('should handle leap year date validation', async () => {
            const leapYearScheduleData = createMockScheduleData({
                startDateTime: '2024-02-29T09:00:00Z', // Leap year date
                endDateTime: '2024-02-29T10:00:00Z',
            });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    data: createMockSchedule(),
                }),
            } as Response);

            const result = await store.dispatch(
                scheduleApi.endpoints.createSchedule.initiate(leapYearScheduleData)
            );

            expect(result.data?.success).toBe(true);
        });
    });
});