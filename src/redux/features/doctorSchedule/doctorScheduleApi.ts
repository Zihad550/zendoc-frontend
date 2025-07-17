import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IResponseRedux } from "@/types/apiResponse";
import { DoctorSchedule } from "@/types/doctorSchedules";

export const doctorScheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDoctorSchedule: build.mutation({
      query: (data) => ({
        url: "/doctor-schedule",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.doctorSchedule],
    }),
    getAllDocSchedules: build.query<
      IResponseRedux<DoctorSchedule[]>,
      Record<string, unknown> | undefined
    >({
      query: (arg) => {
        return {
          url: "/doctor-schedule",
          method: "GET",
          params: arg,
        };
      },

      providesTags: [tagTypes.doctorSchedule],
    }),
    getMySchedule: build.query({
      query: () => ({
        url: "/doctor-schedule/my-schedules",
        method: "GET",
      }),
      providesTags: [tagTypes.doctorSchedule],
    }),

    deleteDoctorSchedule: build.mutation({
      query: (id: string) => ({
        url: `/doctor-schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.doctorSchedule],
    }),
  }),
});

export const {
  useCreateDoctorScheduleMutation,
  useGetAllDocSchedulesQuery,
  useGetMyScheduleQuery,
  useDeleteDoctorScheduleMutation,
} = doctorScheduleApi;
