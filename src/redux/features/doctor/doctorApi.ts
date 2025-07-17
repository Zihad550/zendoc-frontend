import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IResponseRedux } from "@/types/apiResponse";
import { Doctor } from "@/types/doctor";
import generateUrlParams from "@/utils/generateUrlParams";

export const doctorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDoctor: build.mutation({
      query: (data) => ({
        url: "/user/create-doctor",
        method: "POST",
        contentType: "multipart/form-data",
        body: data,
      }),
      invalidatesTags: [tagTypes.doctor],
    }),

    getAllDoctors: build.query<
      IResponseRedux<Doctor[]>,
      Record<string, unknown> | undefined
    >({
      query: (args) => ({
        url: "/doctor",
        method: "GET",
        params: generateUrlParams(args),
      }),
      providesTags: [tagTypes.doctor],
    }),

    deleteDoctor: build.mutation({
      query: (id) => ({
        url: `/doctor/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.doctor],
    }),
    //get single doctor
    getDoctor: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/doctor/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.doctor],
    }),
    // update a doctor
    updateDoctor: build.mutation({
      query: (data) => {
        return {
          url: `/doctor/${data.id}`,
          method: "PATCH",
          body: data.body,
        };
      },
      invalidatesTags: [tagTypes.doctor, tagTypes.user],
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useGetAllDoctorsQuery,
  useDeleteDoctorMutation,
  useGetDoctorQuery,
  useUpdateDoctorMutation,
} = doctorApi;
