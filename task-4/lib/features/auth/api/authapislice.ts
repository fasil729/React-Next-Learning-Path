import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const authApiSlice = createApi({
  reducerPath: "authapi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://akil-backend.onrender.com" }),
  endpoints: (builder) => ({
    signup: builder.mutation<{ success: boolean; message: string }, SignupRequest>({
      query: (userData) => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
      query: (data) => ({
        url: '/verify-email',
        method: 'POST',
        body: data,
      }),
    }),
    signin: builder.mutation<VerifyEmailResponse, {email: string, password: string}>({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useSignupMutation, useVerifyEmailMutation, useSigninMutation } = authApiSlice;
export default authApiSlice.reducer;
