import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/auth/userSlice";
import { authApiSlice } from "./features/auth/api/authapislice";
import { apiSlice } from "./features/api/apiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware,
      authApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

