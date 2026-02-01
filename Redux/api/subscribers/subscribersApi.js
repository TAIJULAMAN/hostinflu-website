import { baseApi } from "../baseApi";

export const subscribersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSubscribers: builder.query({
            query: (params) => ({
                url: "current_subscription/current_subscribe_user",
                method: "GET",
                params,
            }),
            providesTags: ["subscribers"],
        })
    }),
});

export const {
    useGetAllSubscribersQuery,
} = subscribersApi;
