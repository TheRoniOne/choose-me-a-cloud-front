import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/redux/slices/authSlice";
import { apiService } from "@/app/redux/services/apiService";

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
