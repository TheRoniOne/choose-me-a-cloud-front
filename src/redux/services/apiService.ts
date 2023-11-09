import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setAuth, logout } from "@/redux/slices/authSlice";
import { Mutex } from "async-mutex";

const mutex = new Mutex();
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND ?? "http://localhost:8000/";
const baseQuery = fetchBaseQuery({
  baseUrl: `${BACKEND_URL}api/`,
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          { url: "jwt/refresh/", method: "POST" },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          api.dispatch(setAuth());
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiService = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
