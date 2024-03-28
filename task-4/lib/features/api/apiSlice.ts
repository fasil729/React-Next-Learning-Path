import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define an API slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://akil-backend.onrender.com" }),
  endpoints: (builder) => ({
    getOpportunities: builder.query<OpportunityList, void>({
      query: () => "opportunities/search",
    }),
    getOpportunityById: builder.query<OpportunityDetail, String>({
      query: (id) => `opportunities/${id}`,
    }),
  }),
});

export const { useGetOpportunitiesQuery, useGetOpportunityByIdQuery } =
  apiSlice;