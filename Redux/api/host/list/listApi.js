import { baseApi } from "../../baseApi";

export const listApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllLists: builder.query({
            query: (params) => ({
                url: `listing/my-listings`,
                method: "GET",
                params,
            }),
            providesTags: ["list"],
        }),
        getSingleListing: builder.query({
            query: (id) => ({
                url: `listing/single-listing/${id}`,
                method: "GET",
            }),
            providesTags: ["list"],
        }),
        createList: builder.mutation({
            query: (data) => ({
                url: "listing/create-listing",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["list"],
        }),
        updateList: builder.mutation({
            query: ({ id, data }) => ({
                url: `listing/update-listing/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["list"],
        }),
        deleteList: builder.mutation({
            query: ({ id }) => ({
                url: `listing/delete-listing/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["list"],
        }),
        searchList: builder.query({
            query: (params) => ({
                url: `search/specific`,
                method: "GET",
                params,
            }),
            providesTags: ["list"],
        }),
        myVerifiedListings: builder.query({
            query: () => ({
                url: `listing/user-personal-verify`,
                method: "GET",
            }),
            providesTags: ["list"],
        }),
        getAllListingsByHostId: builder.query({
            query: (id) => ({
                url: `listing/user-total-listings/${id}`,
                method: "GET",
            }),
            providesTags: ["list"],
        }),

    }),
});

export const {
    useGetAllListsQuery,
    useGetSingleListingQuery,
    useCreateListMutation,
    useUpdateListMutation,
    useDeleteListMutation,
    useSearchListQuery,
    useMyVerifiedListingsQuery,
    useGetAllListingsByHostIdQuery,
} = listApi;