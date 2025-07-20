import { baseApi } from '@/redux/api/baseApi';
import authReducer, { IAuthState } from '@/redux/features/auth/authSlice';
import { IResponseRedux } from '@/types/apiResponse';
import { Doctor, DoctorSpecialty, ISpecialties } from '@/types/doctor';
import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { doctorApi } from '../doctorApi';

// Mock fetch globally
global.fetch = vi.fn();

// Mock data factories
const createMockSpecialty = (overrides?: Partial<ISpecialties>): ISpecialties => ({
  id: 'specialty-1',
  title: 'Cardiology',
  icon: 'heart-icon',
  ...overrides,
});

const createMockDoctorSpecialty = (overrides?: Partial<DoctorSpecialty>): DoctorSpecialty => ({
  specialtiesId: 'specialty-1',
  doctorId: 'doctor-1',
  specialties: createMockSpecialty(),
  ...overrides,
});

const createMockDoctor = (overrides?: Partial<Doctor>): Doctor => ({
  id: 'doctor-1',
  email: 'doctor@example.com',
  name: 'Dr. John Doe',
  profilePhoto: 'https://example.com/photo.jpg',
  contactNumber: '+1234567890',
  address: '123 Medical Center St',
  registrationNumber: 'REG123456',
  experience: 10,
  gender: 'MALE',
  apointmentFee: 150,
  qualification: 'MBBS, MD Cardiology',
  currentWorkingPlace: 'City General Hospital',
  designation: 'Senior Cardiologist',
  isDeleted: false,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  averageRating: 4.5,
  review: [],
  doctorSpecialties: [createMockDoctorSpecialty()],
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

// Test store setup
const createTestStore = (initialAuthState?: Partial<IAuthState>) => {
  const defaultAuthState: IAuthState = {
    user: {
      email: 'test@example.com',
      role: 'ADMIN',
      iat: Date.now(),
      exp: Date.now() + 3600000,
    },
    token: 'mock-token',
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

describe('doctorApi', () => {
  let store: ReturnType<typeof createTestStore>;
  const mockFetch = fetch as vi.MockedFunction<typeof fetch>;

  beforeEach(() => {
    store = createTestStore();
    vi.clearAllMocks();
  });

  describe('getAllDoctors', () => {
    it('should fetch doctors with default parameters', async () => {
      const mockDoctors = [createMockDoctor(), createMockDoctor({ id: 'doctor-2', name: 'Dr. Jane Smith' })];
      const mockResponse = createMockApiResponse(mockDoctors, { page: 1, limit: 10, total: 2 });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await store.dispatch(doctorApi.endpoints.getAllDoctors.initiate(undefined));

      expect(result.data).toEqual(mockResponse);
      expect(result.data?.data).toHaveLength(2);
      expect(result.data?.data[0].name).toBe('Dr. John Doe');
      expect(result.data?.data[1].name).toBe('Dr. Jane Smith');
    });

    it('should fetch doctors with filtering parameters', async () => {
      const mockDoctors = [createMockDoctor({ name: 'Dr. Cardiologist' })];
      const mockResponse = createMockApiResponse(mockDoctors);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const queryParams = {
        specialty: 'cardiology',
        searchTerm: 'heart',
      };

      const result = await store.dispatch(doctorApi.endpoints.getAllDoctors.initiate(queryParams));

      expect(result.data).toEqual(mockResponse);
      expect(result.data?.data[0].name).toBe('Dr. Cardiologist');
      
      // Verify the URL contains query parameters
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('specialty=cardiology'),
        expect.any(Object)
      );
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('searchTerm=heart'),
        expect.any(Object)
      );
    });

    it('should handle pagination parameters', async () => {
      const mockDoctors = [createMockDoctor()];
      const mockResponse = createMockApiResponse(mockDoctors, { page: 2, limit: 5, total: 10 });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const queryParams = {
        page: 2,
        limit: 5,
      };

      const result = await store.dispatch(doctorApi.endpoints.getAllDoctors.initiate(queryParams));

      expect(result.data?.meta.page).toBe(2);
      expect(result.data?.meta.limit).toBe(5);
      expect(result.data?.meta.total).toBe(10);
      
      // Verify pagination parameters in URL
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('page=2'),
        expect.any(Object)
      );
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('limit=5'),
        expect.any(Object)
      );
    });

    it('should handle API errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ success: false, message: 'Internal server error' }),
      } as Response);

      const result = await store.dispatch(doctorApi.endpoints.getAllDoctors.initiate(undefined));

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await store.dispatch(doctorApi.endpoints.getAllDoctors.initiate(undefined));

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });
  });

  describe('createDoctor', () => {
    it('should create a new doctor successfully', async () => {
      const newDoctorData = {
        name: 'Dr. New Doctor',
        email: 'newdoctor@example.com',
        contactNumber: '+1234567890',
        qualification: 'MBBS',
        experience: 5,
        specialties: ['cardiology'],
      };

      const mockCreatedDoctor = createMockDoctor({
        id: 'new-doctor-id',
        name: newDoctorData.name,
        email: newDoctorData.email,
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Doctor created successfully',
          data: mockCreatedDoctor,
        }),
      } as Response);

      const result = await store.dispatch(doctorApi.endpoints.createDoctor.initiate(newDoctorData));

      expect(result.data?.success).toBe(true);
      expect(result.data?.data.name).toBe(newDoctorData.name);
      expect(result.data?.data.email).toBe(newDoctorData.email);
      
      // Verify POST method and multipart/form-data
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/user/create-doctor'),
        expect.objectContaining({
          method: 'POST',
        })
      );
    });

    it('should handle validation errors during doctor creation', async () => {
      const invalidDoctorData = {
        name: '',
        email: 'invalid-email',
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          success: false,
          message: 'Validation failed',
          errors: {
            name: 'Name is required',
            email: 'Invalid email format',
          },
        }),
      } as Response);

      const result = await store.dispatch(doctorApi.endpoints.createDoctor.initiate(invalidDoctorData));

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });

    it('should handle file upload in doctor creation', async () => {
      const doctorDataWithFile = {
        name: 'Dr. With Photo',
        email: 'withphoto@example.com',
        profilePhoto: new File(['photo'], 'photo.jpg', { type: 'image/jpeg' }),
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Doctor created with photo',
          data: createMockDoctor({
            name: doctorDataWithFile.name,
            profilePhoto: 'https://example.com/uploaded-photo.jpg',
          }),
        }),
      } as Response);

      const result = await store.dispatch(doctorApi.endpoints.createDoctor.initiate(doctorDataWithFile));

      expect(result.data?.success).toBe(true);
      expect(result.data?.data.profilePhoto).toBe('https://example.com/uploaded-photo.jpg');
    });
  });

  describe('getDoctor', () => {
    it('should fetch a single doctor by ID', async () => {
      const doctorId = 'doctor-123';
      const mockDoctor = createMockDoctor({ id: doctorId });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: mockDoctor,
        }),
      } as Response);

      const result = await store.dispatch(doctorApi.endpoints.getDoctor.initiate(doctorId));

      expect(result.data?.success).toBe(true);
      expect(result.data?.data.id).toBe(doctorId);
      expect(result.data?.data.name).toBe(mockDoctor.name);
      
      // Verify correct endpoint
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`/doctor/${doctorId}`),
        expect.any(Object)
      );
    });

    it('should handle doctor not found', async () => {
      const doctorId = 'non-existent-doctor';

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({
          success: false,
          message: 'Doctor not found',
        }),
      } as Response);

      const result = await store.dispatch(doctorApi.endpoints.getDoctor.initiate(doctorId));

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });

    it('should handle array of IDs', async () => {
      const doctorIds = ['doctor-1', 'doctor-2'];
      const mockDoctor = createMockDoctor({ id: 'doctor-1' });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: mockDoctor,
        }),
      } as Response);

      const result = await store.dispatch(doctorApi.endpoints.getDoctor.initiate(doctorIds));

      expect(result.data?.success).toBe(true);
      expect(result.data?.data).toBeDefined();
      
      // Verify array handling in URL
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/doctor/doctor-1,doctor-2'),
        expect.any(Object)
      );
    });
  });

  describe('updateDoctor', () => {
    it('should update doctor profile successfully', async () => {
      const doctorId = 'doctor-123';
      const updateData = {
        name: 'Dr. Updated Name',
        qualification: 'MBBS, MD, PhD',
        experience: 15,
      };

      const updatedDoctor = createMockDoctor({
        id: doctorId,
        ...updateData,
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Doctor updated successfully',
          data: updatedDoctor,
        }),
      } as Response);

      const result = await store.dispatch(
        doctorApi.endpoints.updateDoctor.initiate({
          id: doctorId,
          body: updateData,
        })
      );

      expect(result.data?.success).toBe(true);
      expect(result.data?.data.name).toBe(updateData.name);
      expect(result.data?.data.qualification).toBe(updateData.qualification);
      expect(result.data?.data.experience).toBe(updateData.experience);
      
      // Verify PATCH method and endpoint
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`/doctor/${doctorId}`),
        expect.objectContaining({
          method: 'PATCH',
        })
      );
    });

    it('should handle specialty updates', async () => {
      const doctorId = 'doctor-123';
      const updateData = {
        specialties: ['cardiology', 'neurology'],
      };

      const updatedDoctor = createMockDoctor({
        id: doctorId,
        doctorSpecialties: [
          createMockDoctorSpecialty({ specialties: createMockSpecialty({ title: 'Cardiology' }) }),
          createMockDoctorSpecialty({ 
            specialtiesId: 'specialty-2',
            specialties: createMockSpecialty({ id: 'specialty-2', title: 'Neurology' })
          }),
        ],
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Doctor specialties updated',
          data: updatedDoctor,
        }),
      } as Response);

      const result = await store.dispatch(
        doctorApi.endpoints.updateDoctor.initiate({
          id: doctorId,
          body: updateData,
        })
      );

      expect(result.data?.success).toBe(true);
      expect(result.data?.data.doctorSpecialties).toHaveLength(2);
      expect(result.data?.data.doctorSpecialties[0].specialties.title).toBe('Cardiology');
      expect(result.data?.data.doctorSpecialties[1].specialties.title).toBe('Neurology');
    });

    it('should handle availability and schedule updates', async () => {
      const doctorId = 'doctor-123';
      const updateData = {
        availability: {
          monday: { start: '09:00', end: '17:00' },
          tuesday: { start: '09:00', end: '17:00' },
          wednesday: { start: '09:00', end: '17:00' },
        },
        appointmentDuration: 30,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Doctor availability updated',
          data: createMockDoctor({ id: doctorId }),
        }),
      } as Response);

      const result = await store.dispatch(
        doctorApi.endpoints.updateDoctor.initiate({
          id: doctorId,
          body: updateData,
        })
      );

      expect(result.data?.success).toBe(true);
    });

    it('should handle update validation errors', async () => {
      const doctorId = 'doctor-123';
      const invalidUpdateData = {
        experience: -5, // Invalid negative experience
        apointmentFee: -100, // Invalid negative fee
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          success: false,
          message: 'Validation failed',
          errors: {
            experience: 'Experience cannot be negative',
            apointmentFee: 'Appointment fee cannot be negative',
          },
        }),
      } as Response);

      const result = await store.dispatch(
        doctorApi.endpoints.updateDoctor.initiate({
          id: doctorId,
          body: invalidUpdateData,
        })
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });
  });

  describe('deleteDoctor', () => {
    it('should soft delete a doctor successfully', async () => {
      const doctorId = 'doctor-123';

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Doctor deleted successfully',
        }),
      } as Response);

      const result = await store.dispatch(doctorApi.endpoints.deleteDoctor.initiate(doctorId));

      expect(result.data?.success).toBe(true);
      expect(result.data?.message).toBe('Doctor deleted successfully');
      
      // Verify DELETE method and soft delete endpoint
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`/doctor/soft/${doctorId}`),
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });

    it('should handle delete errors', async () => {
      const doctorId = 'non-existent-doctor';

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({
          success: false,
          message: 'Doctor not found',
        }),
      } as Response);

      const result = await store.dispatch(doctorApi.endpoints.deleteDoctor.initiate(doctorId));

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });

    it('should handle authorization errors for delete', async () => {
      const doctorId = 'doctor-123';

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: async () => ({
          success: false,
          message: 'Unauthorized',
        }),
      } as Response);

      const result = await store.dispatch(doctorApi.endpoints.deleteDoctor.initiate(doctorId));

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });
  });

  describe('Cache invalidation and tags', () => {
    it('should provide correct tags for getAllDoctors', () => {
      const endpoint = doctorApi.endpoints.getAllDoctors;
      expect(endpoint.providesTags).toEqual(['doctor']);
    });

    it('should invalidate correct tags on createDoctor', () => {
      const endpoint = doctorApi.endpoints.createDoctor;
      expect(endpoint.invalidatesTags).toEqual(['doctor']);
    });

    it('should invalidate correct tags on updateDoctor', () => {
      const endpoint = doctorApi.endpoints.updateDoctor;
      expect(endpoint.invalidatesTags).toEqual(['doctor', 'user']);
    });

    it('should invalidate correct tags on deleteDoctor', () => {
      const endpoint = doctorApi.endpoints.deleteDoctor;
      expect(endpoint.invalidatesTags).toEqual(['doctor']);
    });

    it('should provide correct tags for getDoctor', () => {
      const endpoint = doctorApi.endpoints.getDoctor;
      expect(endpoint.providesTags).toEqual(['doctor']);
    });
  });

  describe('Hook generation', () => {
    it('should generate correct hooks', () => {
      expect(doctorApi.useCreateDoctorMutation).toBeDefined();
      expect(doctorApi.useGetAllDoctorsQuery).toBeDefined();
      expect(doctorApi.useDeleteDoctorMutation).toBeDefined();
      expect(doctorApi.useGetDoctorQuery).toBeDefined();
      expect(doctorApi.useUpdateDoctorMutation).toBeDefined();
    });

    it('should generate hooks with correct types', () => {
      // Test that hooks are functions
      expect(typeof doctorApi.useCreateDoctorMutation).toBe('function');
      expect(typeof doctorApi.useGetAllDoctorsQuery).toBe('function');
      expect(typeof doctorApi.useDeleteDoctorMutation).toBe('function');
      expect(typeof doctorApi.useGetDoctorQuery).toBe('function');
      expect(typeof doctorApi.useUpdateDoctorMutation).toBe('function');
    });
  });

  describe('Edge cases and error scenarios', () => {
    it('should handle empty response data', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: [],
          meta: { page: 1, limit: 10, total: 0 },
        }),
      } as Response);

      const result = await store.dispatch(doctorApi.endpoints.getAllDoctors.initiate(undefined));

      expect(result.data?.data).toEqual([]);
      expect(result.data?.meta.total).toBe(0);
    });

    it('should handle malformed response data', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          // Missing required fields
          data: null,
        }),
      } as Response);

      const result = await store.dispatch(doctorApi.endpoints.getAllDoctors.initiate(undefined));

      expect(result.data?.data).toBeNull();
    });

    it('should handle timeout errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Request timeout'));

      const result = await store.dispatch(doctorApi.endpoints.getAllDoctors.initiate(undefined));

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });

    it('should handle JSON parsing errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      } as Response);

      const result = await store.dispatch(doctorApi.endpoints.getAllDoctors.initiate(undefined));

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });
  });

  describe('URL parameter generation', () => {
    it('should handle complex query parameters', async () => {
      const complexParams = {
        specialty: 'cardiology',
        searchTerm: 'heart specialist',
        page: 1,
        limit: 20,
        sortBy: 'experience',
        sortOrder: 'desc',
        minExperience: 5,
        maxFee: 200,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => createMockApiResponse([]),
      } as Response);

      await store.dispatch(doctorApi.endpoints.getAllDoctors.initiate(complexParams));

      // Verify all parameters are included in the URL
      const callUrl = mockFetch.mock.calls[0][0] as string;
      expect(callUrl).toContain('specialty=cardiology');
      expect(callUrl).toContain('searchTerm=heart%20specialist');
      expect(callUrl).toContain('page=1');
      expect(callUrl).toContain('limit=20');
      expect(callUrl).toContain('sortBy=experience');
      expect(callUrl).toContain('sortOrder=desc');
      expect(callUrl).toContain('minExperience=5');
      expect(callUrl).toContain('maxFee=200');
    });

    it('should handle undefined and null parameters', async () => {
      const paramsWithNulls = {
        specialty: 'cardiology',
        searchTerm: undefined,
        page: null,
        limit: 10,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => createMockApiResponse([]),
      } as Response);

      await store.dispatch(doctorApi.endpoints.getAllDoctors.initiate(paramsWithNulls));

      const callUrl = mockFetch.mock.calls[0][0] as string;
      expect(callUrl).toContain('specialty=cardiology');
      expect(callUrl).toContain('limit=10');
      // Should not contain undefined or null parameters
      expect(callUrl).not.toContain('searchTerm=');
      expect(callUrl).not.toContain('page=');
    });
  });

  describe('Authentication integration', () => {
    it('should include authorization header when token is present', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => createMockApiResponse([]),
      } as Response);

      await store.dispatch(doctorApi.endpoints.getAllDoctors.initiate(undefined));

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            authorization: 'mock-token',
          }),
        })
      );
    });

    it('should handle requests without token', async () => {
      const storeWithoutToken = createTestStore({ token: null, isAuthenticated: false });
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => createMockApiResponse([]),
      } as Response);

      await storeWithoutToken.dispatch(doctorApi.endpoints.getAllDoctors.initiate(undefined));

      expect(mockFetch).toHaveBeenCalled();
      // Should still make the request even without token
    });
  });
});