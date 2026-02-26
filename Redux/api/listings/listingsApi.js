import { baseApi } from "../baseApi";

const listingsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllListings: builder.query({
            query: () => ({
                url: "listings/all-listings",
                method: "GET",
            }),
            providesTags: ["listings"],
        }),
    }),
});

export const { useGetAllListingsQuery } = listingsApi;
