import { apiService } from "@/app/redux/services/apiService";

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export interface LoginArgs {
  username: string;
  password: string;
}

const authAPIService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    retrieveUser: builder.query<User, void>({
      query: () => "/users/me/",
    }),
    login: builder.mutation<void, LoginArgs>({
      query: ({ username, password }) => ({
        url: "/jwt/create/",
        method: "POST",
        body: { username, password },
      }),
    }),
    verify: builder.mutation({
      query: () => ({
        url: "/jwt/verify/",
        method: "POST",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout/",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRetrieveUserQuery,
  useLoginMutation,
  useVerifyMutation,
  useLogoutMutation,
} = authAPIService;
