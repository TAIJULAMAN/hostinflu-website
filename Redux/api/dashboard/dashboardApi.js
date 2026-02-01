import { baseApi } from "../baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDashboard: builder.query({
      query: (params) => ({
        url: "dashboard",
        method: "GET",
        params,
      }),
      providesTags: ["dashboard"],
    }),
    userGrowth: builder.query({
      query: ({ year } = {}) => ({
        url: "user/user-growth",
        method: "GET",
        params: { year },
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetAllDashboardQuery, useUserGrowthQuery } =
  dashboardApi;
