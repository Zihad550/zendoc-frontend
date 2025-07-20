import { baseApi } from '@/redux/api/baseApi';
import authReducer, { IAuthState } from '@/redux/features/auth/authSlice';
import { IResponseRedux } from '@/types/apiResponse';
import {
    BulkOperationResult,
    BulkUserOperation,
    CreateUserData,
    ExportAuditLog,
    ExportHistoryEntry,
    ExportUsersParams,
    ExtendedUser,
    GetAllUsersParams,
    UpdateUserData,
    UserStats,
    UserStatus,
} from '@/types/user';
import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { userApi } from '../userApi';

// Mock fetch globally
global.fetch = vi.fn();

// Mock the environment variable
vi.stubEnv('NEXT_PUBLIC_BACKEND_API_URL', 'http://localhost:3001/api/v1');

// Mock data factories
const createMockUser = (overrides?: Partial<ExtendedUser>): ExtendedUser => ({
    id: 'user-1',
    email: 'user@example.com',
    role: 'PATIENT',
    needPasswordChange: false,
    status: UserStatus.ACTIVE,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    displayName: 'Test User',
    lastLoginAt: new Date('2024-01-15'),
    appointmentCount: 5,
    profileCompleteness: 85,
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

const createMockUserStats = (): UserStats => ({
    totalUsers: 150,
    activeUsers: 120,
    newUsersThisMonth: 25,
    usersByRole: {
        PATIENT: 100,
        DOCTOR: 30,
        ADMIN: 15,
        SUPER_ADMIN: 5,
    },
    growthRate: 12.5,
});

// Test store setup
const createTestStore = (initialAuthState?: Partial<IAuthState>) => {
    const defaultAuthState: IAuthState = {
        user: {
            email: 'admin@example.com',
            role: 'SUPER_ADMIN',
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

describe('userApi', () => {
    let store: ReturnType<typeof createTestStore>;
    const mockFetch = fetch as vi.MockedFunction<typeof fetch>;

    beforeEach(() => {
        store = createTestStore();
        vi.clearAllMocks();
        // Reset the API state
        store.dispatch(baseApi.util.resetApiState());
    });

    describe('getSingleUser', () => {
        it('should fetch current user profile', async () => {
            const mockUser = createMockUser({ email: 'current@example.com' });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    success: true,
                    data: mockUser,
                }),
            } as Response);

            const result = await store.dispatch(userApi.endpoints.getSingleUser.initiate());

            expect(result.data?.success).toBe(true);
            expect(result.data?.data.email).toBe('current@example.com');
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/user/me'),
                expect.objectContaining({
                    method: 'GET',
                })
            );
        });

        it('should handle unauthorized access', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 401,
                json: async () => ({
                    success: false,
                    message: 'Unauthorized',
                }),
            } as Response);

            const result = await store.dispatch(userApi.endpoints.getSingleUser.initiate());

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });
    });

    describe('getAllUsers', () => {
        it('should fetch all users with default parameters', async () => {
            const mockUsers = [
                createMockUser(),
                createMockUser({ id: 'user-2', email: 'user2@example.com', role: 'DOCTOR' }),
            ];
            const mockResponse = createMockApiResponse(mockUsers, { page: 1, limit: 10, total: 2 });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: new Headers({ 'content-type': 'application/json' }),
                json: async () => mockResponse,
            } as Response);

            const result = await store.dispatch(userApi.endpoints.getAllUsers.initiate(undefined));

            expect(result.data).toEqual(mockResponse);
            expect(result.data?.data).toHaveLength(2);
            expect(result.data?.data[0].role).toBe('PATIENT');
            expect(result.data?.data[1].role).toBe('DOCTOR');
        });

        it('should fetch users with filtering parameters', async () => {
            const mockUsers = [createMockUser({ role: 'DOCTOR' })];
            const mockResponse = createMockApiResponse(mockUsers);

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            const queryParams: GetAllUsersParams = {
                roles: ['DOCTOR'],
                status: [UserStatus.ACTIVE],
                searchTerm: 'doctor',
                page: 1,
                limit: 20,
            };

            const result = await store.dispatch(userApi.endpoints.getAllUsers.initiate(queryParams));

            expect(result.data?.data[0].role).toBe('DOCTOR');

            // Verify URL contains query parameters
            const callUrl = mockFetch.mock.calls[0][0] as string;
            expect(callUrl).toContain('roles=DOCTOR');
            expect(callUrl).toContain('status=ACTIVE');
            expect(callUrl).toContain('searchTerm=doctor');
        });

        it('should handle sorting and date filtering', async () => {
            const mockUsers = [createMockUser()];
            const mockResponse = createMockApiResponse(mockUsers);

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            const queryParams: GetAllUsersParams = {
                sortBy: 'createdAt',
                sortOrder: 'desc',
                dateFrom: '2024-01-01',
                dateTo: '2024-12-31',
                lastLoginFrom: '2024-01-01',
                lastLoginTo: '2024-12-31',
            };

            await store.dispatch(userApi.endpoints.getAllUsers.initiate(queryParams));

            const callUrl = mockFetch.mock.calls[0][0] as string;
            expect(callUrl).toContain('sortBy=createdAt');
            expect(callUrl).toContain('sortOrder=desc');
            expect(callUrl).toContain('dateFrom=2024-01-01');
            expect(callUrl).toContain('dateTo=2024-12-31');
        });

        it('should cache results for 5 minutes', () => {
            const endpoint = userApi.endpoints.getAllUsers;
            expect(endpoint.keepUnusedDataFor).toBe(300);
        });
    });

    describe('updateUser', () => {
        it('should update user successfully', async () => {
            const userId = 'user-123';
            const updateData: UpdateUserData = {
                email: 'updated@example.com',
                status: UserStatus.ACTIVE,
                needPasswordChange: false,
            };

            const updatedUser = createMockUser({
                id: userId,
                email: updateData.email,
                status: updateData.status,
            });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => updatedUser,
            } as Response);

            const result = await store.dispatch(
                userApi.endpoints.updateUser.initiate({
                    id: userId,
                    data: updateData,
                })
            );

            expect(result.data?.email).toBe(updateData.email);
            expect(result.data?.status).toBe(updateData.status);

            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining(`/user/${userId}`),
                expect.objectContaining({
                    method: 'PATCH',
                    body: JSON.stringify(updateData),
                })
            );
        });

        it('should handle role changes', async () => {
            const userId = 'user-123';
            const updateData: UpdateUserData = {
                role: 'DOCTOR',
                doctor: {
                    qualification: 'MBBS',
                    experience: 5,
                    specialties: ['cardiology'],
                },
            };

            const updatedUser = createMockUser({
                id: userId,
                role: 'DOCTOR',
            });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => updatedUser,
            } as Response);

            const result = await store.dispatch(
                userApi.endpoints.updateUser.initiate({
                    id: userId,
                    data: updateData,
                })
            );

            expect(result.data?.role).toBe('DOCTOR');
        });

        it('should perform optimistic updates', async () => {
            const userId = 'user-123';
            const updateData: UpdateUserData = {
                email: 'optimistic@example.com',
            };

            // Mock successful response with delay
            mockFetch.mockImplementationOnce(
                () =>
                    new Promise((resolve) =>
                        setTimeout(
                            () =>
                                resolve({
                                    ok: true,
                                    json: async () => createMockUser({ id: userId, email: updateData.email }),
                                } as Response),
                            100
                        )
                    )
            );

            // Pre-populate cache with initial data
            store.dispatch(
                userApi.util.upsertQueryData('getAllUsers', undefined, {
                    success: true,
                    message: 'Success',
                    data: [createMockUser({ id: userId, email: 'old@example.com' })],
                    meta: { page: 1, limit: 10, total: 1 },
                })
            );

            const updatePromise = store.dispatch(
                userApi.endpoints.updateUser.initiate({
                    id: userId,
                    data: updateData,
                })
            );

            // Check that optimistic update was applied
            const cacheData = userApi.endpoints.getAllUsers.select(undefined)(store.getState());
            const updatedUserInCache = cacheData.data?.data?.find((user) => user.id === userId);
            expect(updatedUserInCache?.email).toBe('optimistic@example.com');

            await updatePromise;
        });

        it('should rollback optimistic updates on failure', async () => {
            const userId = 'user-123';
            const updateData: UpdateUserData = {
                email: 'failed@example.com',
            };

            // Mock failed response
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                json: async () => ({
                    success: false,
                    message: 'Validation failed',
                }),
            } as Response);

            // Pre-populate cache with initial data
            const originalEmail = 'original@example.com';
            store.dispatch(
                userApi.util.upsertQueryData('getAllUsers', undefined, {
                    success: true,
                    message: 'Success',
                    data: [createMockUser({ id: userId, email: originalEmail })],
                    meta: { page: 1, limit: 10, total: 1 },
                })
            );

            await store.dispatch(
                userApi.endpoints.updateUser.initiate({
                    id: userId,
                    data: updateData,
                })
            );

            // Check that rollback occurred
            const cacheData = userApi.endpoints.getAllUsers.select(undefined)(store.getState());
            const userInCache = cacheData.data?.data?.find((user) => user.id === userId);
            expect(userInCache?.email).toBe(originalEmail);
        });
    });

    describe('deleteUser', () => {
        it('should soft delete user successfully', async () => {
            const userId = 'user-123';

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({}),
            } as Response);

            const result = await store.dispatch(userApi.endpoints.deleteUser.initiate(userId));

            expect(result.isSuccess).toBe(true);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining(`/user/soft/${userId}`),
                expect.objectContaining({
                    method: 'DELETE',
                })
            );
        });

        it('should perform optimistic delete', async () => {
            const userId = 'user-123';

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({}),
            } as Response);

            // Pre-populate cache
            store.dispatch(
                userApi.util.upsertQueryData('getAllUsers', undefined, {
                    success: true,
                    message: 'Success',
                    data: [createMockUser({ id: userId, status: UserStatus.ACTIVE })],
                    meta: { page: 1, limit: 10, total: 1 },
                })
            );

            await store.dispatch(userApi.endpoints.deleteUser.initiate(userId));

            // Check that user status was updated optimistically
            const cacheData = userApi.endpoints.getAllUsers.select(undefined)(store.getState());
            const deletedUser = cacheData.data?.data?.find((user) => user.id === userId);
            expect(deletedUser?.status).toBe('DELETED');
        });
    });

    describe('resetUserPassword', () => {
        it('should reset user password successfully', async () => {
            const userId = 'user-123';
            const temporaryPassword = 'temp-password-123';

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    temporaryPassword,
                }),
            } as Response);

            const result = await store.dispatch(userApi.endpoints.resetUserPassword.initiate(userId));

            expect(result.data?.temporaryPassword).toBe(temporaryPassword);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining(`/user/${userId}/reset-password`),
                expect.objectContaining({
                    method: 'POST',
                })
            );
        });

        it('should handle unauthorized password reset', async () => {
            const userId = 'user-123';

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 403,
                json: async () => ({
                    success: false,
                    message: 'Insufficient permissions',
                }),
            } as Response);

            const result = await store.dispatch(userApi.endpoints.resetUserPassword.initiate(userId));

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });
    });

    describe('bulkUpdateUsers', () => {
        it('should perform bulk user operations successfully', async () => {
            const bulkOperation: BulkUserOperation = {
                userIds: ['user-1', 'user-2', 'user-3'],
                operation: 'suspend',
            };

            const bulkResult: BulkOperationResult = {
                successful: ['user-1', 'user-2'],
                failed: [
                    {
                        userId: 'user-3',
                        error: 'User not found',
                    },
                ],
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => bulkResult,
            } as Response);

            const result = await store.dispatch(userApi.endpoints.bulkUpdateUsers.initiate(bulkOperation));

            expect(result.data?.successful).toHaveLength(2);
            expect(result.data?.failed).toHaveLength(1);
            expect(result.data?.failed[0].error).toBe('User not found');

            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/user/bulk-update'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify(bulkOperation),
                })
            );
        });

        it('should handle role change bulk operations', async () => {
            const bulkOperation: BulkUserOperation = {
                userIds: ['user-1', 'user-2'],
                operation: 'changeRole',
                newRole: 'DOCTOR',
            };

            const bulkResult: BulkOperationResult = {
                successful: ['user-1', 'user-2'],
                failed: [],
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => bulkResult,
            } as Response);

            const result = await store.dispatch(userApi.endpoints.bulkUpdateUsers.initiate(bulkOperation));

            expect(result.data?.successful).toHaveLength(2);
            expect(result.data?.failed).toHaveLength(0);
        });
    });

    describe('getUserStats', () => {
        it('should fetch user statistics', async () => {
            const mockStats = createMockUserStats();

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockStats,
            } as Response);

            const result = await store.dispatch(userApi.endpoints.getUserStats.initiate());

            expect(result.data?.totalUsers).toBe(150);
            expect(result.data?.activeUsers).toBe(120);
            expect(result.data?.newUsersThisMonth).toBe(25);
            expect(result.data?.usersByRole.PATIENT).toBe(100);
            expect(result.data?.growthRate).toBe(12.5);

            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/user/stats'),
                expect.objectContaining({
                    method: 'GET',
                })
            );
        });

        it('should cache stats for 5 minutes', () => {
            const endpoint = userApi.endpoints.getUserStats;
            expect(endpoint.keepUnusedDataFor).toBe(300);
        });
    });

    describe('exportUsers', () => {
        it('should export users as CSV', async () => {
            const exportParams: ExportUsersParams = {
                format: 'csv',
                fields: ['name', 'email', 'role', 'createdAt'],
                filters: {
                    roles: ['PATIENT', 'DOCTOR'],
                    status: [UserStatus.ACTIVE],
                },
            };

            const mockBlob = new Blob(['csv,data'], { type: 'text/csv' });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                blob: async () => mockBlob,
            } as Response);

            const result = await store.dispatch(userApi.endpoints.exportUsers.initiate(exportParams));

            expect(result.data).toBeInstanceOf(Blob);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/user/export'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify(exportParams),
                })
            );
        });

        it('should export users as Excel', async () => {
            const exportParams: ExportUsersParams = {
                format: 'excel',
                fields: ['name', 'email', 'role'],
            };

            const mockBlob = new Blob(['excel,data'], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                blob: async () => mockBlob,
            } as Response);

            const result = await store.dispatch(userApi.endpoints.exportUsers.initiate(exportParams));

            expect(result.data).toBeInstanceOf(Blob);
        });

        it('should handle export failures', async () => {
            const exportParams: ExportUsersParams = {
                format: 'csv',
                fields: ['name', 'email'],
            };

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
                json: async () => ({
                    success: false,
                    message: 'Export failed',
                }),
            } as Response);

            const result = await store.dispatch(userApi.endpoints.exportUsers.initiate(exportParams));

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });
    });

    describe('verifyExportPassword', () => {
        it('should verify export password successfully', async () => {
            const password = 'secure-password';

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    verified: true,
                }),
            } as Response);

            const result = await store.dispatch(
                userApi.endpoints.verifyExportPassword.initiate({ password })
            );

            expect(result.data?.verified).toBe(true);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/user/verify-export-password'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify({ password }),
                })
            );
        });

        it('should handle incorrect password', async () => {
            const password = 'wrong-password';

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    verified: false,
                }),
            } as Response);

            const result = await store.dispatch(
                userApi.endpoints.verifyExportPassword.initiate({ password })
            );

            expect(result.data?.verified).toBe(false);
        });
    });

    describe('getExportHistory', () => {
        it('should fetch export history', async () => {
            const mockHistory: ExportHistoryEntry[] = [
                {
                    id: 'export-1',
                    timestamp: new Date('2024-01-15'),
                    userId: 'admin-1',
                    userName: 'Admin User',
                    format: 'csv',
                    recordCount: 100,
                    fieldsExported: ['name', 'email', 'role'],
                    hasSensitiveData: false,
                    status: 'completed',
                    ipAddress: '192.168.1.1',
                    userAgent: 'Mozilla/5.0',
                },
            ];

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockHistory,
            } as Response);

            const result = await store.dispatch(userApi.endpoints.getExportHistory.initiate());

            expect(result.data).toHaveLength(1);
            expect(result.data?.[0].format).toBe('csv');
            expect(result.data?.[0].recordCount).toBe(100);
            expect(result.data?.[0].status).toBe('completed');
        });

        it('should cache export history for 5 minutes', () => {
            const endpoint = userApi.endpoints.getExportHistory;
            expect(endpoint.keepUnusedDataFor).toBe(300);
        });
    });

    describe('logExportAction', () => {
        it('should log export action for audit', async () => {
            const auditLog: ExportAuditLog = {
                action: 'export_completed',
                userId: 'admin-1',
                exportId: 'export-123',
                format: 'csv',
                recordCount: 50,
                fieldsExported: ['name', 'email'],
                hasSensitiveData: false,
                securityVerified: true,
                ipAddress: '192.168.1.1',
                userAgent: 'Mozilla/5.0',
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({}),
            } as Response);

            const result = await store.dispatch(userApi.endpoints.logExportAction.initiate(auditLog));

            expect(result.isSuccess).toBe(true);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/user/export-audit'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify(auditLog),
                })
            );
        });
    });

    describe('createUser', () => {
        it('should create new user successfully', async () => {
            const userData: CreateUserData = {
                email: 'newuser@example.com',
                role: 'PATIENT',
                basicInfo: {
                    name: 'New User',
                    contactNumber: '+1234567890',
                    address: '123 Main St',
                },
                sendWelcomeEmail: true,
                generatePassword: true,
            };

            const createdUser = createMockUser({
                email: userData.email,
                role: userData.role,
                displayName: userData.basicInfo.name,
            });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => createdUser,
            } as Response);

            const result = await store.dispatch(userApi.endpoints.createUser.initiate(userData));

            expect(result.data?.email).toBe(userData.email);
            expect(result.data?.role).toBe(userData.role);
            expect(result.data?.displayName).toBe(userData.basicInfo.name);
        });

        it('should create doctor with specific info', async () => {
            const doctorData: CreateUserData = {
                email: 'newdoctor@example.com',
                role: 'DOCTOR',
                basicInfo: {
                    name: 'Dr. New Doctor',
                    contactNumber: '+1234567890',
                },
                roleSpecificInfo: {
                    specialties: ['cardiology'],
                    qualification: 'MBBS, MD',
                    experience: 8,
                    appointmentFee: 200,
                    registrationNumber: 'REG123',
                    gender: 'MALE',
                },
                sendWelcomeEmail: true,
                customPassword: 'custom-password',
            };

            const createdDoctor = createMockUser({
                email: doctorData.email,
                role: 'DOCTOR',
                displayName: doctorData.basicInfo.name,
            });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => createdDoctor,
            } as Response);

            const result = await store.dispatch(userApi.endpoints.createUser.initiate(doctorData));

            expect(result.data?.role).toBe('DOCTOR');
            expect(result.data?.email).toBe(doctorData.email);
        });
    });

    describe('checkEmailUniqueness', () => {
        it('should check if email is unique', async () => {
            const email = 'unique@example.com';

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    isUnique: true,
                }),
            } as Response);

            const result = await store.dispatch(userApi.endpoints.checkEmailUniqueness.initiate(email));

            expect(result.data?.isUnique).toBe(true);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining(`/user/check-email?email=${encodeURIComponent(email)}`),
                expect.objectContaining({
                    method: 'GET',
                })
            );
        });

        it('should handle non-unique email', async () => {
            const email = 'existing@example.com';

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    isUnique: false,
                }),
            } as Response);

            const result = await store.dispatch(userApi.endpoints.checkEmailUniqueness.initiate(email));

            expect(result.data?.isUnique).toBe(false);
        });
    });

    describe('Cache invalidation and tags', () => {
        it('should provide correct tags for queries', () => {
            expect(userApi.endpoints.getSingleUser.providesTags).toEqual(['user']);
            expect(userApi.endpoints.getAllUsers.providesTags).toEqual(['user']);
            expect(userApi.endpoints.getUserStats.providesTags).toEqual(['user']);
            expect(userApi.endpoints.getExportHistory.providesTags).toEqual(['exportHistory']);
        });

        it('should invalidate correct tags on mutations', () => {
            expect(userApi.endpoints.updateUser.invalidatesTags).toEqual([
                'user',
                'doctor',
                'patient',
                'admin',
            ]);
            expect(userApi.endpoints.deleteUser.invalidatesTags).toEqual(['user']);
            expect(userApi.endpoints.resetUserPassword.invalidatesTags).toEqual(['user']);
            expect(userApi.endpoints.bulkUpdateUsers.invalidatesTags).toEqual(['user']);
            expect(userApi.endpoints.createUser.invalidatesTags).toEqual(['user']);
            expect(userApi.endpoints.logExportAction.invalidatesTags).toEqual(['exportHistory']);
        });
    });

    describe('Hook generation', () => {
        it('should generate correct hooks', () => {
            expect(userApi.useGetSingleUserQuery).toBeDefined();
            expect(userApi.useGetAllUsersQuery).toBeDefined();
            expect(userApi.useUpdateUserMutation).toBeDefined();
            expect(userApi.useDeleteUserMutation).toBeDefined();
            expect(userApi.useResetUserPasswordMutation).toBeDefined();
            expect(userApi.useBulkUpdateUsersMutation).toBeDefined();
            expect(userApi.useGetUserStatsQuery).toBeDefined();
            expect(userApi.useExportUsersMutation).toBeDefined();
            expect(userApi.useCreateUserMutation).toBeDefined();
            expect(userApi.useCheckEmailUniquenessQuery).toBeDefined();
            expect(userApi.useVerifyExportPasswordMutation).toBeDefined();
            expect(userApi.useGetExportHistoryQuery).toBeDefined();
            expect(userApi.useLogExportActionMutation).toBeDefined();
        });
    });

    describe('Error handling', () => {
        it('should handle network errors', async () => {
            mockFetch.mockRejectedValueOnce(new Error('Network error'));

            const result = await store.dispatch(userApi.endpoints.getAllUsers.initiate(undefined));

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

            const result = await store.dispatch(userApi.endpoints.getAllUsers.initiate(undefined));

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

            const result = await store.dispatch(userApi.endpoints.getAllUsers.initiate(undefined));

            expect(result.isError).toBe(true);
            expect(result.error).toBeDefined();
        });
    });
});