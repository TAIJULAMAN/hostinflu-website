import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "auth/my-profile",
      providesTags: ["profile"],
    }),
    shareProfile: builder.mutation({
      query: () => ({
        url: `auth/share-profile`,
        method: "GET",
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useShareProfileMutation,
} = profileApi;
