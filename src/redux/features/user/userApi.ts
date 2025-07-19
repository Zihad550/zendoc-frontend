import { baseApi } from '@/redux/api/baseApi';
import { tagTypes } from '@/redux/tag-types';
import { IResponseRedux } from '@/types/apiResponse';
import {
  BulkOperationResult,
  BulkUserOperation,
  ExportAuditLog,
  ExportHistoryEntry,
  ExportUsersParams,
  ExtendedUser,
  GetAllUsersParams,
  UpdateUserData,
  UserStats,
} from '@/types/user';
import generateUrlParams from '@/utils/generateUrlParams';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleUser: build.query({
      query: () => ({
        url: '/user/me',
        method: 'GET',
      }),
      providesTags: [tagTypes.user],
    }),

    getAllUsers: build.query<
      IResponseRedux<ExtendedUser[]>,
      GetAllUsersParams | undefined
    >({
      query: (args) => ({
        url: '/user/all',
        method: 'GET',
        params: generateUrlParams(args),
      }),
      providesTags: [tagTypes.user],
      keepUnusedDataFor: 300, // 5 minutes cache
    }),

    updateUser: build.mutation<
      ExtendedUser,
      { id: string; data: UpdateUserData }
    >({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: [
        tagTypes.user,
        tagTypes.doctor,
        tagTypes.patient,
        tagTypes.admin,
      ],
      // Optimistic update
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData('getAllUsers', undefined, (draft) => {
            const userIndex = draft.data?.findIndex((user) => user.id === id);
            if (userIndex !== undefined && userIndex >= 0 && draft.data) {
              Object.assign(draft.data[userIndex], data);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: `/user/soft/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.user],
      // Optimistic update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData('getAllUsers', undefined, (draft) => {
            if (draft.data) {
              const userIndex = draft.data.findIndex((user) => user.id === id);
              if (userIndex >= 0) {
                draft.data[userIndex].status = 'DELETED' as any;
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    resetUserPassword: build.mutation<{ temporaryPassword: string }, string>({
      query: (id) => ({
        url: `/user/${id}/reset-password`,
        method: 'POST',
      }),
      invalidatesTags: [tagTypes.user],
    }),

    bulkUpdateUsers: build.mutation<BulkOperationResult, BulkUserOperation>({
      query: (data) => ({
        url: '/user/bulk-update',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    getUserStats: build.query<UserStats, void>({
      query: () => ({
        url: '/user/stats',
        method: 'GET',
      }),
      providesTags: [tagTypes.user],
      keepUnusedDataFor: 300, // 5 minutes cache
    }),

    exportUsers: build.mutation<Blob, ExportUsersParams>({
      query: (params) => ({
        url: '/user/export',
        method: 'POST',
        body: params,
        responseHandler: (response: Response) => response.blob(),
      }),
      // Add export audit logging
      async onQueryStarted(params, { queryFulfilled }) {
        try {
          await queryFulfilled;
          // Log export action for audit purposes
        } catch (error) {
          console.error('User export failed:', error);
        }
      },
    }),

    // Verify password for sensitive exports
    verifyExportPassword: build.mutation<
      { verified: boolean },
      { password: string }
    >({
      query: (data) => ({
        url: '/user/verify-export-password',
        method: 'POST',
        body: data,
      }),
    }),

    // Get export history for audit trail
    getExportHistory: build.query<ExportHistoryEntry[], void>({
      query: () => ({
        url: '/user/export-history',
        method: 'GET',
      }),
      providesTags: [tagTypes.exportHistory],
      keepUnusedDataFor: 300, // 5 minutes cache
    }),

    // Log export action for audit
    logExportAction: build.mutation<void, ExportAuditLog>({
      query: (data) => ({
        url: '/user/export-audit',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.exportHistory],
    }),

    createUser: build.mutation<ExtendedUser, any>({
      query: (data) => ({
        url: '/user/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    checkEmailUniqueness: build.query<{ isUnique: boolean }, string>({
      query: (email) => ({
        url: `/user/check-email?email=${encodeURIComponent(email)}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetSingleUserQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useResetUserPasswordMutation,
  useBulkUpdateUsersMutation,
  useGetUserStatsQuery,
  useExportUsersMutation,
  useCreateUserMutation,
  useCheckEmailUniquenessQuery,
  useVerifyExportPasswordMutation,
  useGetExportHistoryQuery,
  useLogExportActionMutation,
} = userApi;
