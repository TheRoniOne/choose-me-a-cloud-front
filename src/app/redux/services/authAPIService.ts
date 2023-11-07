import { apiService } from "@/app/redux/services/apiService";

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface SocialAuthArgs {
  provider: string;
  state: string;
  code: string;
}

interface SocialAuthResponse {
  success: boolean;
  user: User;
}

interface LoginArgs {
  username: string;
  password: string;
}

const authAPIService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    retrieveUser: builder.query<User, void>({
      query: () => "/users/me/",
    }),
    socialAuthenticate: builder.mutation<SocialAuthResponse, SocialAuthArgs>({
      query: ({ provider, state, code }) => ({
        url: `/o/${provider}/?state=${encodeURIComponent(
          state
        )}&code=${encodeURIComponent(code)}`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
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
  useSocialAuthenticateMutation,
  useLoginMutation,
  useVerifyMutation,
  useLogoutMutation,
} = authAPIService;
