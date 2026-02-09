import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "user/all-users",
        method: "GET",
        params,
      }),
      providesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    topHosts: builder.query({
      query: () => ({
        url: "user/discover-host",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    topInfluencers: builder.query({
      query: () => ({
        url: "user/top-influencer",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useTopHostsQuery,
  useTopInfluencersQuery
} = userApi;
