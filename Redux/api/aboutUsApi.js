import { baseApi } from "./baseApi";

const aboutUsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAboutUs: builder.query({
            query: () => ({
                url: "legalDoc/get-doc/aboutUs",
                method: "GET",
            }),
            providesTags: ["aboutUs"],
        }),

        createAboutUs: builder.mutation({
            query: ({ description }) => ({
                url: "legalDoc/create-doc/aboutUs",
                method: "PATCH",
                body: { description },
            }),
            invalidatesTags: ["aboutUs"],
        }),
    }),
});

export const { useGetAboutUsQuery, useCreateAboutUsMutation } = aboutUsApi;
