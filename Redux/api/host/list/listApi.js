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

    }),
});

export const {
    useGetAllListsQuery,
    useCreateListMutation,
    useUpdateListMutation,
    useDeleteListMutation,
} = listApi;