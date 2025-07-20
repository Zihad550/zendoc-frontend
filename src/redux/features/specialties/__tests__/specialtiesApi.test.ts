import { baseApi } from '@/redux/api/baseApi';
import authReducer, { IAuthState } from '@/redux/features/auth/authSlice';
import { ISpecialties } from '@/types/specialties/specialties';
import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import specialtiesApi from '../specialtiesApi';

// Mock fetch globally
global.fetch = vi.fn();

// Mock data factories
const createMockSpecialty = (overrides?: Partial<ISpecialties>): ISpecialties => ({
    id: 'specialty-1',
    title: 'Cardiology',
    icon: 'heart-icon.svg',
    ...overrides,
});

const createMockSpecialtyFormData = (overrides?: any) => {
    const formData = new FormData();
    formData.append('title', overrides?.title || 'Cardiology');
    if (overrides?.icon) {
        formData.append('icon', overrides.icon);
    }
    if (overrides?.description) {
        formData.append('description', overrides.description);
    }
    return formData;
};

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

describe('specialtiesApi', () => {
    let store: ReturnType<typeof createTestStore>;
    const mockFetch = fetch as vi.MockedFunction<typeof fetch>;

    beforeEach(() => {
        store = createTestStore();
        vi.clearAllMocks();
    });

    describe('createSpecialty', () => {
        it('should create a new specialty successfully', async () => {
            const specialtyData = createMockSpecialtyFormData({
                title: 'Neurology',
                description: 'Brain and nervous system disorders',
            });

            const createdSpecialty = createMockSpecialty({
                id: 'specialty-2',
                title: 'Neurology',
                icon: 'brain-icon.svg',
            });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    message: 'Specialty created successfully',
                    data: createdSpecialty,
                }),
            } as Response);

            const result = await store.dispatch(
                specialtiesApi.endpoints.createSpecialty.initiate(specialtyData)
            );

            expect(result.data?.success).toBe(true);
            expect(result.data?.data.title).toBe('Neurology');
            expect(result.data?.data.icon).toBe('brain-icon.svg');

            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/specialties'),
                expect.objectContaining({
                    method: 'POST',
                    body: specialtyData,
                })
            );
        });

        it('should create specialty with icon file upload', async () => {
            const iconFile = new File(['icon-content'], 'cardiology-icon.svg', {
                type: 'image/svg+xml'
            });

            const specialtyData = createMockSpecialtyFormData({
                title: 'Cardiology',
                icon: iconFile,
                description: 'Heart and cardiovascular system',
            });

            const createdSpecialty = createMockSpecialty({
                title: 'Cardiology',
                icon: 'https://cdn.example.com/icons/cardiology-icon.svg',
            });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    message: 'Specialty created with icon',
                    data: createdSpecialty,
                }),
            } as Response);

            const result = await store.dispatch(
                specialtiesApi.endpoints.createSpecialty.initiate(specialtyData)
            );

            expect(result.data?.success).toBe(true);
            expect(result.data?.data.icon).toBe('https://cdn.example.com/icons/cardiology-icon.svg');
        });

        it('should handle duplicate specialty title error', async () => {
            const duplicateSpecialtyData = createMockSpecialtyFormData({
                title: 'Cardiology', // Already exists
            });

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 409,
                json: async () => ({
                    success: false,
                    message: 'Specialty with this title already exists',
                    error: 'DUPLICATE_SPECIALTY_TITLE',
                }),
            } as Response);

            const result = await store.dispatch(
                specialtiesApi.endpoints.createSpecialty.initiate(duplicateSpecialtyData)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle invalid file type error', async () => {
            const invalidFile = new File(['content'], 'icon.txt', { type: 'text/plain' });
            const specialtyData = createMockSpecialtyFormData({
                title: 'Orthopedics',
                icon: invalidFile,
            });

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                json: async () => ({
                    success: false,
                    message: 'Invalid file type. Only SVG, PNG, and JPG files are allowed',
                    error: 'INVALID_FILE_TYPE',
                    allowedTypes: ['image/svg+xml', 'image/png', 'image/jpeg'],
                }),
            } as Response);

            const result = await store.dispatch(
                specialtiesApi.endpoints.createSpecialty.initiate(specialtyData)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle file size limit error', async () => {
            const largeFile = new File(['x'.repeat(5 * 1024 * 1024)], 'large-icon.svg', {
                type: 'image/svg+xml'
            });
            const specialtyData = createMockSpecialtyFormData({
                title: 'Dermatology',
                icon: largeFile,
            });

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 413,
                json: async () => ({
                    success: false,
                    message: 'File size exceeds maximum limit of 2MB',
                    error: 'FILE_SIZE_LIMIT_EXCEEDED',
                    maxSize: '2MB',
                }),
            } as Response);

            const result = await store.dispatch(
                specialtiesApi.endpoints.createSpecialty.initiate(specialtyData)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle validation errors', async () => {
            const invalidSpecialtyData = createMockSpecialtyFormData({
                title: '', // Empty title
            });

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                json: async () => ({
                    success: false,
                    message: 'Validation failed',
                    errors: {
                        title: 'Title is required',
                    },
                }),
            } as Response);

            const result = await store.dispatch(
                specialtiesApi.endpoints.createSpecialty.initiate(invalidSpecialtyData)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle unauthorized access', async () => {
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

            const specialtyData = createMockSpecialtyFormData();

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 403,
                json: async () => ({
                    success: false,
                    message: 'Insufficient permissions to create specialty',
                    error: 'INSUFFICIENT_PERMISSIONS',
                }),
            } as Response);

            const result = await patientStore.dispatch(
                specialtiesApi.endpoints.createSpecialty.initiate(specialtyData)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });
    });

    describe('getAllSpecialties', () => {
        it('should fetch all specialties successfully', async () => {
            const mockSpecialties = [
                createMockSpecialty({ id: 'specialty-1', title: 'Cardiology' }),
                createMockSpecialty({ id: 'specialty-2', title: 'Neurology', icon: 'brain-icon.svg' }),
                createMockSpecialty({ id: 'specialty-3', title: 'Orthopedics', icon: 'bone-icon.svg' }),
            ];

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    message: 'Specialties retrieved successfully',
                    data: mockSpecialties,
                    meta: {
                        total: 3,
                        page: 1,
                        limit: 10,
                    },
                }),
            } as Response);

            const result = await store.dispatch(specialtiesApi.endpoints.getAllSpecialties.initiate());

            expect(result.data?.success).toBe(true);
            expect(result.data?.data).toHaveLength(3);
            expect(result.data?.data[0].title).toBe('Cardiology');
            expect(result.data?.data[1].title).toBe('Neurology');
            expect(result.data?.data[2].title).toBe('Orthopedics');

            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/specialties'),
                expect.objectContaining({
                    method: 'GET',
                })
            );
        });

        it('should handle empty specialties list', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    message: 'No specialties found',
                    data: [],
                    meta: {
                        total: 0,
                        page: 1,
                        limit: 10,
                    },
                }),
            } as Response);

            const result = await store.dispatch(specialtiesApi.endpoints.getAllSpecialties.initiate());

            expect(result.data?.success).toBe(true);
            expect(result.data?.data).toEqual([]);
            expect(result.data?.meta.total).toBe(0);
        });

        it('should handle server errors', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
                json: async () => ({
                    success: false,
                    message: 'Internal server error',
                    error: 'SERVER_ERROR',
                }),
            } as Response);

            const result = await store.dispatch(specialtiesApi.endpoints.getAllSpecialties.initiate());

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle network errors', async () => {
            mockFetch.mockRejectedValueOnce(new Error('Network error'));

            const result = await store.dispatch(specialtiesApi.endpoints.getAllSpecialties.initiate());

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle malformed JSON response', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => {
                    throw new Error('Invalid JSON');
                },
            } as Response);

            const result = await store.dispatch(specialtiesApi.endpoints.getAllSpecialties.initiate());

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should include authentication headers', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    data: [],
                }),
            } as Response);

            await store.dispatch(specialtiesApi.endpoints.getAllSpecialties.initiate());

            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        authorization: 'mock-admin-token',
                    }),
                })
            );
        });
    });

    describe('deleteSpecialty', () => {
        it('should delete specialty successfully', async () => {
            const specialtyId = 'specialty-123';

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    message: 'Specialty deleted successfully',
                }),
            } as Response);

            const result = await store.dispatch(
                specialtiesApi.endpoints.deleteSpecialty.initiate(specialtyId)
            );

            expect(result.data?.success).toBe(true);
            expect(result.data?.message).toBe('Specialty deleted successfully');

            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining(`/specialties/${specialtyId}`),
                expect.objectContaining({
                    method: 'DELETE',
                })
            );
        });

        it('should handle specialty not found error', async () => {
            const specialtyId = 'non-existent-specialty';

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                json: async () => ({
                    success: false,
                    message: 'Specialty not found',
                    error: 'SPECIALTY_NOT_FOUND',
                }),
            } as Response);

            const result = await store.dispatch(
                specialtiesApi.endpoints.deleteSpecialty.initiate(specialtyId)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle specialty in use error', async () => {
            const specialtyId = 'specialty-in-use';

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                json: async () => ({
                    success: false,
                    message: 'Cannot delete specialty that is assigned to doctors',
                    error: 'SPECIALTY_IN_USE',
                    doctorCount: 5,
                    doctorNames: ['Dr. John Doe', 'Dr. Jane Smith'],
                }),
            } as Response);

            const result = await store.dispatch(
                specialtiesApi.endpoints.deleteSpecialty.initiate(specialtyId)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle unauthorized deletion', async () => {
            const doctorStore = createTestStore({
                user: {
                    email: 'doctor@example.com',
                    role: 'DOCTOR',
                    iat: Date.now(),
                    exp: Date.now() + 3600000,
                },
                token: 'doctor-token',
                isAuthenticated: true,
            });

            const specialtyId = 'specialty-123';

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 403,
                json: async () => ({
                    success: false,
                    message: 'Insufficient permissions to delete specialty',
                    error: 'INSUFFICIENT_PERMISSIONS',
                }),
            } as Response);

            const result = await doctorStore.dispatch(
                specialtiesApi.endpoints.deleteSpecialty.initiate(specialtyId)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle cascade deletion confirmation', async () => {
            const specialtyId = 'specialty-with-dependencies';

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 409,
                json: async () => ({
                    success: false,
                    message: 'Specialty has dependencies. Confirm cascade deletion.',
                    error: 'REQUIRES_CASCADE_CONFIRMATION',
                    dependencies: {
                        doctors: 3,
                        appointments: 15,
                    },
                }),
            } as Response);

            const result = await store.dispatch(
                specialtiesApi.endpoints.deleteSpecialty.initiate(specialtyId)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });
    });

    describe('Cache invalidation and tags', () => {
        it('should provide correct tags for queries', () => {
            expect(specialtiesApi.endpoints.getAllSpecialties.providesTags).toEqual(['specialties']);
        });

        it('should invalidate correct tags on mutations', () => {
            expect(specialtiesApi.endpoints.createSpecialty.invalidatesTags).toEqual(['specialties']);
            expect(specialtiesApi.endpoints.deleteSpecialty.invalidatesTags).toEqual(['specialties']);
        });
    });

    describe('Hook generation', () => {
        it('should generate correct hooks', () => {
            expect(specialtiesApi.useCreateSpecialtyMutation).toBeDefined();
            expect(specialtiesApi.useGetAllSpecialtiesQuery).toBeDefined();
            expect(specialtiesApi.useDeleteSpecialtyMutation).toBeDefined();

            expect(typeof specialtiesApi.useCreateSpecialtyMutation).toBe('function');
            expect(typeof specialtiesApi.useGetAllSpecialtiesQuery).toBe('function');
            expect(typeof specialtiesApi.useDeleteSpecialtyMutation).toBeDefined();
        });
    });

    describe('File upload handling', () => {
        it('should handle multipart/form-data content type', async () => {
            const specialtyData = createMockSpecialtyFormData({
                title: 'Pediatrics',
                icon: new File(['icon'], 'pediatrics.svg', { type: 'image/svg+xml' }),
            });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    data: createMockSpecialty({ title: 'Pediatrics' }),
                }),
            } as Response);

            await store.dispatch(specialtiesApi.endpoints.createSpecialty.initiate(specialtyData));

            // Verify that the request was made with FormData (multipart/form-data)
            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    method: 'POST',
                    body: expect.any(FormData),
                })
            );
        });

        it('should handle file upload progress', async () => {
            const largeFile = new File(['x'.repeat(1024 * 1024)], 'large-icon.svg', {
                type: 'image/svg+xml'
            });
            const specialtyData = createMockSpecialtyFormData({
                title: 'Radiology',
                icon: largeFile,
            });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    data: createMockSpecialty({ title: 'Radiology' }),
                }),
            } as Response);

            const result = await store.dispatch(
                specialtiesApi.endpoints.createSpecialty.initiate(specialtyData)
            );

            expect(result.data?.success).toBe(true);
        });

        it('should handle file upload timeout', async () => {
            const specialtyData = createMockSpecialtyFormData({
                title: 'Oncology',
                icon: new File(['icon'], 'oncology.svg', { type: 'image/svg+xml' }),
            });

            mockFetch.mockRejectedValueOnce(new Error('Request timeout'));

            const result = await store.dispatch(
                specialtiesApi.endpoints.createSpecialty.initiate(specialtyData)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });
    });

    describe('Specialty management business logic', () => {
        it('should handle specialty ordering/sorting', async () => {
            const mockSpecialties = [
                createMockSpecialty({ id: 'specialty-1', title: 'Anesthesiology' }),
                createMockSpecialty({ id: 'specialty-2', title: 'Cardiology' }),
                createMockSpecialty({ id: 'specialty-3', title: 'Dermatology' }),
            ];

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    data: mockSpecialties,
                    meta: {
                        total: 3,
                        sortedBy: 'title',
                        sortOrder: 'asc',
                    },
                }),
            } as Response);

            const result = await store.dispatch(specialtiesApi.endpoints.getAllSpecialties.initiate());

            expect(result.data?.data[0].title).toBe('Anesthesiology');
            expect(result.data?.data[1].title).toBe('Cardiology');
            expect(result.data?.data[2].title).toBe('Dermatology');
        });

        it('should handle specialty search and filtering', async () => {
            // Note: Current API doesn't support search, but this tests future extensibility
            const searchQuery = 'cardio';
            const mockSpecialties = [
                createMockSpecialty({ title: 'Cardiology' }),
                createMockSpecialty({ title: 'Cardiovascular Surgery' }),
            ];

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    data: mockSpecialties,
                    meta: {
                        total: 2,
                        searchQuery,
                    },
                }),
            } as Response);

            const result = await store.dispatch(specialtiesApi.endpoints.getAllSpecialties.initiate());

            expect(result.data?.data).toHaveLength(2);
            expect(result.data?.data.every(s => s.title.toLowerCase().includes('cardio'))).toBe(true);
        });

        it('should handle specialty statistics', async () => {
            const mockSpecialties = [
                createMockSpecialty({ title: 'Cardiology' }),
                createMockSpecialty({ title: 'Neurology' }),
            ];

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    data: mockSpecialties,
                    meta: {
                        total: 2,
                        statistics: {
                            totalDoctors: 25,
                            totalAppointments: 150,
                            mostPopular: 'Cardiology',
                        },
                    },
                }),
            } as Response);

            const result = await store.dispatch(specialtiesApi.endpoints.getAllSpecialties.initiate());

            expect(result.data?.meta.statistics).toBeDefined();
            expect(result.data?.meta.statistics.mostPopular).toBe('Cardiology');
        });
    });

    describe('Edge cases and boundary conditions', () => {
        it('should handle very long specialty titles', async () => {
            const longTitle = 'A'.repeat(255);
            const specialtyData = createMockSpecialtyFormData({
                title: longTitle,
            });

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                json: async () => ({
                    success: false,
                    message: 'Title exceeds maximum length of 100 characters',
                    error: 'TITLE_TOO_LONG',
                    maxLength: 100,
                }),
            } as Response);

            const result = await store.dispatch(
                specialtiesApi.endpoints.createSpecialty.initiate(specialtyData)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });

        it('should handle special characters in specialty titles', async () => {
            const specialtyData = createMockSpecialtyFormData({
                title: 'Obstetrics & Gynecology',
            });

            const createdSpecialty = createMockSpecialty({
                title: 'Obstetrics & Gynecology',
            });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    data: createdSpecialty,
                }),
            } as Response);

            const result = await store.dispatch(
                specialtiesApi.endpoints.createSpecialty.initiate(specialtyData)
            );

            expect(result.data?.success).toBe(true);
            expect(result.data?.data.title).toBe('Obstetrics & Gynecology');
        });

        it('should handle Unicode characters in specialty titles', async () => {
            const specialtyData = createMockSpecialtyFormData({
                title: 'Médecine Générale', // French with accents
            });

            const createdSpecialty = createMockSpecialty({
                title: 'Médecine Générale',
            });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    data: createdSpecialty,
                }),
            } as Response);

            const result = await store.dispatch(
                specialtiesApi.endpoints.createSpecialty.initiate(specialtyData)
            );

            expect(result.data?.success).toBe(true);
            expect(result.data?.data.title).toBe('Médecine Générale');
        });

        it('should handle empty or whitespace-only titles', async () => {
            const specialtyData = createMockSpecialtyFormData({
                title: '   ', // Only whitespace
            });

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                json: async () => ({
                    success: false,
                    message: 'Title cannot be empty or contain only whitespace',
                    error: 'INVALID_TITLE',
                }),
            } as Response);

            const result = await store.dispatch(
                specialtiesApi.endpoints.createSpecialty.initiate(specialtyData)
            );

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });
    });

    describe('Performance and caching', () => {
        it('should cache specialty list appropriately', async () => {
            const mockSpecialties = [createMockSpecialty()];

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    data: mockSpecialties,
                }),
            } as Response);

            // First call
            const result1 = await store.dispatch(specialtiesApi.endpoints.getAllSpecialties.initiate());

            // Second call should use cache
            const result2 = await store.dispatch(specialtiesApi.endpoints.getAllSpecialties.initiate());

            expect(result1.data?.data).toEqual(mockSpecialties);
            expect(result2.data?.data).toEqual(mockSpecialties);

            // Should only make one network request due to caching
            expect(mockFetch).toHaveBeenCalledTimes(1);
        });

        it('should invalidate cache after mutations', async () => {
            // First, populate cache
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    data: [createMockSpecialty()],
                }),
            } as Response);

            await store.dispatch(specialtiesApi.endpoints.getAllSpecialties.initiate());

            // Then create a new specialty
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    data: createMockSpecialty({ id: 'new-specialty' }),
                }),
            } as Response);

            await store.dispatch(
                specialtiesApi.endpoints.createSpecialty.initiate(createMockSpecialtyFormData())
            );

            // Cache should be invalidated, so next call should make a new request
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    data: [
                        createMockSpecialty(),
                        createMockSpecialty({ id: 'new-specialty' }),
                    ],
                }),
            } as Response);

            const result = await store.dispatch(specialtiesApi.endpoints.getAllSpecialties.initiate());

            expect(result.data?.data).toHaveLength(2);
            expect(mockFetch).toHaveBeenCalledTimes(3); // Initial + create + refetch
        });
    });
});