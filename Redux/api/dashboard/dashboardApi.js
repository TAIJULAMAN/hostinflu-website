import { baseApi } from "../baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTotalOfDashboard: builder.query({
      query: (params) => ({
        url: "dashboard/user-dashboard",
        method: "GET",
        params,
      }),
      providesTags: ["dashboard"],
    }),
    userCollaborationGrowth: builder.query({
      query: ({ year } = {}) => ({
        url: "collaboration/user-personal-collaborations-growth",
        method: "GET",
        params: { year },
      }),
      providesTags: ["dashboard"],
    }),
    userListingGrowth: builder.query({
      query: ({ year } = {}) => ({
        url: "listing/personal-listings-growth",
        method: "GET",
        params: { year },
      }),
      providesTags: ["dashboard"],
    }),
    userSpendingGrowth: builder.query({
      query: ({ year } = {}) => ({
        url: "payment/user-spending-growth",
        method: "GET",
        params: { year },
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetAllTotalOfDashboardQuery, useUserCollaborationGrowthQuery, useUserListingGrowthQuery, useUserSpendingGrowthQuery } = dashboardApi;
