import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IResponseRedux } from "@/types/apiResponse";
import { ISchedule } from "@/types/schedule";

export const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSchedule: build.mutation({
      query: (data) => ({
        url: "/schedule",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.schedule],
    }),
    getAllSchedules: build.query<
      IResponseRedux<ISchedule[]>,
      Record<string, unknown> | undefined
    >({
      query: (arg) => {
        return {
          url: "/schedule",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.schedule],
    }),
    getAllDoctorSchedules: build.query<
      IResponseRedux<ISchedule[]>,
      {
        params?: Record<string, any>;
        email: string;
      }
    >({
      query: ({ params, email }) => {
        return {
          url: `/schedule/doctor/${email}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: [tagTypes.schedule],
    }),

    deleteSchedule: build.mutation({
      query: (id) => ({
        url: `/schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.schedule],
    }),
  }),
});

export const {
  useCreateScheduleMutation,
  useGetAllSchedulesQuery,
  useDeleteScheduleMutation,
  useGetAllDoctorSchedulesQuery,
} = scheduleApi;
