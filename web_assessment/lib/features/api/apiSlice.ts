import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://hakimhub-api-dev-wtupbmwpnq-uc.a.run.app/api/v1/" }),
  endpoints: (builder) => ({
    getHospitalList: builder.query<HospitalListResponse, void>({
      query: () => ({
        url: "search",
        method: "POST",
        body: JSON.stringify({
          institutions: true,
          articles: false,
          doctors: false,
          from: 1,
          size: 3
        }),
      }),
    }),
    searchHospitals: builder.query<HospitalListResponse, string>({
      query: (keyword) => ({
        url: "search",
        method: "POST",
        body: JSON.stringify({
          keyword,
          institutions: true,
          articles: false,
          doctors: false
        }),
      }),
    }),
  }),
});

export const { useGetHospitalListQuery, useSearchHospitalsQuery } = apiSlice;
