import { baseApi } from "../baseApi";

export const listApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllLists: builder.query({
            query: (params) => ({
                url: "listing/all-listings",
                method: "GET",
                params,
            }),
            providesTags: ["list"],
        })
    }),
});

export const {
    useGetAllListsQuery,
} = listApi;