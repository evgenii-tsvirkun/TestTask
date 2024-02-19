import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/contants";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Exchange"],
  endpoints: (builder) => ({
    getRate: builder.query({
      query: (currency) => `latest/${currency}`,
    }),
  }),
});
export const { useGetRateQuery } = apiSlice;
