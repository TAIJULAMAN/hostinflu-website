import { baseApi } from "../baseApi";

export const influencerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getInfluencerDashboard: builder.query({
            query: (params) => ({
                url: `dashboard/user-dashboard`,
                method: "GET",
                params,
            }),
            providesTags: ["dashboard"],
        }),
        getInfluencerEarningGrowth: builder.query({
            query: (params) => ({
                url: `earnings/influencer-growth`,
                method: "GET",
                params,
            }),
            providesTags: ["dashboard"],
        }),
    }),
});

export const {
    useGetInfluencerDashboardQuery,
    useGetInfluencerEarningGrowthQuery
} = influencerApi;
