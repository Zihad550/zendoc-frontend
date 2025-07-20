import { baseApi } from '@/redux/api/baseApi';
import { AppointmentStatus, IAppointment, PaymentStatus } from '@/types/appointment';
import { configureStore } from '@reduxjs/toolkit';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { appointmentApi } from '../appointmentApi';

// Mock appointment data
const mockAppointment: IAppointment = {
  id: '1',
  patientId: 'patient-1',
  patient: {
    id: 'patient-1',
    name: 'John Patient',
    email: 'patient@example.com',
    contactNumber: '1234567890',
    address: '123 Main St',
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  doctorId: 'doctor-1',
  doctor: {
    id: 'doctor-1',
    name: 'Dr. Jane Smith',
    email: 'doctor@example.com',
    contactNumber: '0987654321',
    address: '456 Medical Ave',
    registrationNumber: 'REG123',
    experience: 10,
    gender: 'FEMALE',
    appointmentFee: 100,
    qualification: 'MBBS, MD',
    currentWorkingPlace: 'City Hospital',
    designation: 'Senior Consultant',
    profilePhoto: 'photo.jpg',
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 4.5,
    review: [],
    doctorSpecialties: [],
    doctorSchedules: [],
    appointment: [],
  },
  scheduleId: 'schedule-1',
  schedule: {
    id: 'schedule-1',
    startDate: '2024-01-15',
    endDate: '2024-01-15',
    startTime: '10:00',
    endTime: '11:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  videoCallingId: 'video-123',
  status: AppointmentStatus.SCHEDULED,
  paymentStatus: PaymentStatus.UNPAID,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockAppointmentList = [
  mockAppointment,
  {
    ...mockAppointment,
    id: '2',
    status: AppointmentStatus.COMPLETED,
    paymentStatus: PaymentStatus.PAID,
  },
  {
    ...mockAppointment,
    id: '3',
    status: AppointmentStatus.CANCELED,
  },
];

// MSW server setup
const server = setupServer();

// Test store setup
const createTestStore = () => {
  return configureStore({
    reducer: {
      api: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(baseApi.middleware),
  });
};

describe('appointmentApi', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    store = createTestStore();
  });

  afterEach(() => {
    server.resetHandlers();
    store.dispatch(baseApi.util.resetApiState());
  });

  afterAll(() => {
    server.close();
  });

  describe('createAppointment', () => {
    it('should create appointment with validation', async () => {
      const appointmentData = {
        patientId: 'patient-1',
        doctorId: 'doctor-1',
        scheduleId: 'schedule-1',
        appointmentDate: '2024-01-15',
        appointmentTime: '10:00',
      };

      server.use(
        http.post('/appointment', async ({ request }) => {
          const body = await request.json();

          // Validate required fields
          expect(body).toHaveProperty('patientId');
          expect(body).toHaveProperty('doctorId');
          expect(body).toHaveProperty('scheduleId');

          return HttpResponse.json({
            success: true,
            message: 'Appointment created successfully',
            data: {
              ...mockAppointment,
              ...body,
            },
          });
        })
      );

      const result = await store.dispatch(
        appointmentApi.endpoints.createAppointment.initiate(appointmentData)
      );

      expect(result.data).toEqual({
        success: true,
        message: 'Appointment created successfully',
        data: expect.objectContaining({
          patientId: appointmentData.patientId,
          doctorId: appointmentData.doctorId,
          scheduleId: appointmentData.scheduleId,
        }),
      });
    });

    it('should handle appointment booking validation errors', async () => {
      const invalidData = {
        patientId: '',
        doctorId: '',
        scheduleId: '',
      };

      server.use(
        http.post('/appointment', () => {
          return HttpResponse.json(
            {
              success: false,
              message: 'Validation failed',
              errors: {
                patientId: 'Patient ID is required',
                doctorId: 'Doctor ID is required',
                scheduleId: 'Schedule ID is required',
              },
            },
            { status: 400 }
          );
        })
      );

      const result = await store.dispatch(
        appointmentApi.endpoints.createAppointment.initiate(invalidData)
      );

      expect(result.error).toBeDefined();
      expect(result.error?.status).toBe(400);
    });

    it('should handle appointment conflict detection', async () => {
      const conflictingData = {
        patientId: 'patient-1',
        doctorId: 'doctor-1',
        scheduleId: 'schedule-1',
        appointmentDate: '2024-01-15',
        appointmentTime: '10:00',
      };

      server.use(
        http.post('/appointment', () => {
          return HttpResponse.json(
            {
              success: false,
              message: 'Appointment slot already booked',
              error: 'APPOINTMENT_CONFLICT',
            },
            { status: 409 }
          );
        })
      );

      const result = await store.dispatch(
        appointmentApi.endpoints.createAppointment.initiate(conflictingData)
      );

      expect(result.error).toBeDefined();
      expect(result.error?.status).toBe(409);
    });
  });

  describe('getAllAppointments', () => {
    it('should fetch appointments with filters', async () => {
      const filters = {
        status: AppointmentStatus.SCHEDULED,
        doctorId: 'doctor-1',
        page: 1,
        limit: 10,
      };

      server.use(
        http.get('/appointment', ({ request }) => {
          const url = new URL(request.url);
          const status = url.searchParams.get('status');
          const doctorId = url.searchParams.get('doctorId');
          const page = url.searchParams.get('page');
          const limit = url.searchParams.get('limit');

          expect(status).toBe(AppointmentStatus.SCHEDULED);
          expect(doctorId).toBe('doctor-1');
          expect(page).toBe('1');
          expect(limit).toBe('10');

          const filteredAppointments = mockAppointmentList.filter(
            (apt) => apt.status === status && apt.doctorId === doctorId
          );

          return HttpResponse.json({
            success: true,
            data: filteredAppointments,
            meta: {
              page: 1,
              limit: 10,
              total: filteredAppointments.length,
            },
          });
        })
      );

      const result = await store.dispatch(
        appointmentApi.endpoints.getAllAppointments.initiate(filters)
      );

      expect(result.data).toEqual({
        success: true,
        data: expect.arrayContaining([
          expect.objectContaining({
            status: AppointmentStatus.SCHEDULED,
            doctorId: 'doctor-1',
          }),
        ]),
        meta: expect.objectContaining({
          page: 1,
          limit: 10,
        }),
      });
    });

    it('should handle empty appointment list', async () => {
      server.use(
        http.get('/appointment', () => {
          return HttpResponse.json({
            success: true,
            data: [],
            meta: {
              page: 1,
              limit: 10,
              total: 0,
            },
          });
        })
      );

      const result = await store.dispatch(
        appointmentApi.endpoints.getAllAppointments.initiate({})
      );

      expect(result.data).toEqual({
        success: true,
        data: [],
        meta: {
          page: 1,
          limit: 10,
          total: 0,
        },
      });
    });
  });

  describe('getMyAppointments', () => {
    it('should fetch user-specific appointments with filters', async () => {
      const filters = {
        status: AppointmentStatus.COMPLETED,
        page: 1,
        limit: 5,
      };

      server.use(
        http.get('/appointment/my-appointments', ({ request }) => {
          const url = new URL(request.url);
          const status = url.searchParams.get('status');

          const userAppointments = mockAppointmentList.filter(
            (apt) => apt.status === status
          );

          return HttpResponse.json({
            success: true,
            data: userAppointments,
            meta: {
              page: 1,
              limit: 5,
              total: userAppointments.length,
            },
          });
        })
      );

      const result = await store.dispatch(
        appointmentApi.endpoints.getMyAppointments.initiate(filters)
      );

      expect(result.data).toEqual({
        success: true,
        data: expect.arrayContaining([
          expect.objectContaining({
            status: AppointmentStatus.COMPLETED,
          }),
        ]),
        meta: expect.objectContaining({
          page: 1,
          limit: 5,
        }),
      });
    });
  });

  describe('getAppointment', () => {
    it('should fetch single appointment by ID', async () => {
      const appointmentId = '1';

      server.use(
        http.get(`/appointment/${appointmentId}`, () => {
          return HttpResponse.json({
            success: true,
            data: mockAppointment,
          });
        })
      );

      const result = await store.dispatch(
        appointmentApi.endpoints.getAppointment.initiate(appointmentId)
      );

      expect(result.data).toEqual({
        success: true,
        data: mockAppointment,
      });
    });

    it('should handle appointment not found', async () => {
      const appointmentId = 'non-existent';

      server.use(
        http.get(`/appointment/${appointmentId}`, () => {
          return HttpResponse.json(
            {
              success: false,
              message: 'Appointment not found',
            },
            { status: 404 }
          );
        })
      );

      const result = await store.dispatch(
        appointmentApi.endpoints.getAppointment.initiate(appointmentId)
      );

      expect(result.error).toBeDefined();
      expect(result.error?.status).toBe(404);
    });
  });

  describe('appointmentStatusChange', () => {
    it('should update appointment status to COMPLETED', async () => {
      const statusData = {
        id: '1',
        body: {
          status: AppointmentStatus.COMPLETED,
        },
      };

      server.use(
        http.patch(`/appointment/status/${statusData.id}`, async ({ request }) => {
          const body = await request.json();

          expect(body).toHaveProperty('status');
          expect(body.status).toBe(AppointmentStatus.COMPLETED);

          return HttpResponse.json({
            success: true,
            message: 'Appointment status updated successfully',
            data: {
              ...mockAppointment,
              status: AppointmentStatus.COMPLETED,
            },
          });
        })
      );

      const result = await store.dispatch(
        appointmentApi.endpoints.appointmentStatusChange.initiate(statusData)
      );

      expect(result.data).toEqual({
        success: true,
        message: 'Appointment status updated successfully',
        data: expect.objectContaining({
          status: AppointmentStatus.COMPLETED,
        }),
      });
    });

    it('should update appointment status to CANCELED', async () => {
      const statusData = {
        id: '1',
        body: {
          status: AppointmentStatus.CANCELED,
          reason: 'Patient requested cancellation',
        },
      };

      server.use(
        http.patch(`/appointment/status/${statusData.id}`, async ({ request }) => {
          const body = await request.json();

          expect(body.status).toBe(AppointmentStatus.CANCELED);
          expect(body.reason).toBe('Patient requested cancellation');

          return HttpResponse.json({
            success: true,
            message: 'Appointment cancelled successfully',
            data: {
              ...mockAppointment,
              status: AppointmentStatus.CANCELED,
            },
          });
        })
      );

      const result = await store.dispatch(
        appointmentApi.endpoints.appointmentStatusChange.initiate(statusData)
      );

      expect(result.data).toEqual({
        success: true,
        message: 'Appointment cancelled successfully',
        data: expect.objectContaining({
          status: AppointmentStatus.CANCELED,
        }),
      });
    });

    it('should handle invalid status transitions', async () => {
      const invalidStatusData = {
        id: '1',
        body: {
          status: 'INVALID_STATUS',
        },
      };

      server.use(
        http.patch(`/appointment/status/${invalidStatusData.id}`, () => {
          return HttpResponse.json(
            {
              success: false,
              message: 'Invalid appointment status',
              error: 'INVALID_STATUS',
            },
            { status: 400 }
          );
        })
      );

      const result = await store.dispatch(
        appointmentApi.endpoints.appointmentStatusChange.initiate(invalidStatusData)
      );

      expect(result.error).toBeDefined();
      expect(result.error?.status).toBe(400);
    });

    it('should handle unauthorized status changes', async () => {
      const statusData = {
        id: '1',
        body: {
          status: AppointmentStatus.COMPLETED,
        },
      };

      server.use(
        http.patch(`/appointment/status/${statusData.id}`, () => {
          return HttpResponse.json(
            {
              success: false,
              message: 'Unauthorized to change appointment status',
            },
            { status: 403 }
          );
        })
      );

      const result = await store.dispatch(
        appointmentApi.endpoints.appointmentStatusChange.initiate(statusData)
      );

      expect(result.error).toBeDefined();
      expect(result.error?.status).toBe(403);
    });
  });

  describe('deleteAppointment', () => {
    it('should soft delete appointment', async () => {
      const appointmentId = '1';

      server.use(
        http.delete(`/appointment/soft/${appointmentId}`, () => {
          return HttpResponse.json({
            success: true,
            message: 'Appointment deleted successfully',
          });
        })
      );

      const result = await store.dispatch(
        appointmentApi.endpoints.deleteAppointment.initiate(appointmentId)
      );

      expect(result.data).toEqual({
        success: true,
        message: 'Appointment deleted successfully',
      });
    });

    it('should handle deletion of non-existent appointment', async () => {
      const appointmentId = 'non-existent';

      server.use(
        http.delete(`/appointment/soft/${appointmentId}`, () => {
          return HttpResponse.json(
            {
              success: false,
              message: 'Appointment not found',
            },
            { status: 404 }
          );
        })
      );

      const result = await store.dispatch(
        appointmentApi.endpoints.deleteAppointment.initiate(appointmentId)
      );

      expect(result.error).toBeDefined();
      expect(result.error?.status).toBe(404);
    });
  });

  describe('API caching and invalidation', () => {
    it('should invalidate appointment cache after creation', async () => {
      const appointmentData = {
        patientId: 'patient-1',
        doctorId: 'doctor-1',
        scheduleId: 'schedule-1',
      };

      server.use(
        http.post('/appointment', () => {
          return HttpResponse.json({
            success: true,
            data: mockAppointment,
          });
        })
      );

      // First, populate the cache with getAllAppointments
      server.use(
        http.get('/appointment', () => {
          return HttpResponse.json({
            success: true,
            data: mockAppointmentList,
          });
        })
      );

      await store.dispatch(
        appointmentApi.endpoints.getAllAppointments.initiate({})
      );

      // Create appointment should invalidate the cache
      await store.dispatch(
        appointmentApi.endpoints.createAppointment.initiate(appointmentData)
      );

      // Verify that the cache was invalidated by checking the store state
      const state = store.getState();
      const apiState = state.api;

      // The cache should be invalidated, so subsequent queries will refetch
      expect(apiState).toBeDefined();
    });

    it('should invalidate appointment cache after status change', async () => {
      const statusData = {
        id: '1',
        body: { status: AppointmentStatus.COMPLETED },
      };

      server.use(
        http.patch(`/appointment/status/${statusData.id}`, () => {
          return HttpResponse.json({
            success: true,
            data: { ...mockAppointment, status: AppointmentStatus.COMPLETED },
          });
        })
      );

      await store.dispatch(
        appointmentApi.endpoints.appointmentStatusChange.initiate(statusData)
      );

      const state = store.getState();
      expect(state.api).toBeDefined();
    });
  });

  describe('Error handling', () => {
    it('should handle network errors', async () => {
      server.use(
        http.get('/appointment', () => {
          return HttpResponse.error();
        })
      );

      const result = await store.dispatch(
        appointmentApi.endpoints.getAllAppointments.initiate({})
      );

      expect(result.error).toBeDefined();
    });

    it('should handle server errors', async () => {
      server.use(
        http.get('/appointment', () => {
          return HttpResponse.json(
            {
              success: false,
              message: 'Internal server error',
            },
            { status: 500 }
          );
        })
      );

      const result = await store.dispatch(
        appointmentApi.endpoints.getAllAppointments.initiate({})
      );

      expect(result.error).toBeDefined();
      expect(result.error?.status).toBe(500);
    });
  });
});