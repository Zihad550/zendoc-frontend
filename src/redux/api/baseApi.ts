import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000/api/v1",
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
