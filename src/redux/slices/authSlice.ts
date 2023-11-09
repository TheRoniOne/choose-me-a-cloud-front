import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState = {
  isAuthenticated: false,
  isLoading: true,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    startInitialLoad: (state) => {
      state.isLoading = true;
    },
    finishInitialLoad: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setAuth, logout, startInitialLoad, finishInitialLoad } =
  authSlice.actions;
export default authSlice.reducer;
