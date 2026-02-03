import { baseApi } from "../../baseApi";

export const dealsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllDeals: builder.query({
            query: (params) => ({
                url: `deal/my-all-deals`,
                method: "GET",
                params,
            }),
            providesTags: ["deals"],
        }),
        getSingleDeal: builder.query({
            query: (id) => ({
                url: `deal/get-single-deal/${id}`,
                method: "GET",
            }),
            providesTags: ["deals"],
        }),
        createDeal: builder.mutation({
            query: (data) => ({
                url: "deal/create-deal",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["deals"],
        }),
        updateDeal: builder.mutation({
            query: ({ id, data }) => ({
                url: `deal/update-deal/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["deals"],
        }),
        deleteDeal: builder.mutation({
            query: ({ id }) => ({
                url: `deal/delete-deal/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["deals"],
        }),
        searchList: builder.query({
            query: (params) => ({
                url: `search/specific`,
                method: "GET",
                params,
            }),
            providesTags: ["deals"],
        }),

    }),
});

export const {
    useGetAllDealsQuery,
    useGetSingleDealQuery,
    useCreateDealMutation,
    useUpdateDealMutation,
    useDeleteDealMutation,
    useSearchListQuery,
} = dealsApi;