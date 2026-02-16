import { baseApi } from "../baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllReview: builder.query({
            query: () => ({
                url: "review/all-reviews",
                method: "GET",
            }),
            providesTags: ["review"],
        }),
        getReviewById: builder.query({
            query: (id) => ({
                url: `review/user/${id}`,
                method: "GET",
            }),
            providesTags: ["review"],
        }),
        createReview: builder.mutation({
            query: ({ data }) => ({
                url: "review/user-personal",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["review"],
        }),
    }),
});

export const { useGetAllReviewQuery, useGetReviewByIdQuery, useCreateReviewMutation } = reviewApi;
