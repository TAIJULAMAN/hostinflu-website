import { baseApi } from "../baseApi";

export const dealsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllDeals: builder.query({
            query: (params) => ({
                url: "deal/get-all-deals",
                method: "GET",
                params,
            }),
            providesTags: ["deals"],
        })
    }),
});

export const {
    useGetAllDealsQuery,
} = dealsApi;