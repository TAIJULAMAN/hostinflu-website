import { baseApi } from "./baseApi";

const termsAndConditionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => ({
        url: "legalDoc/get-doc/termsAndCondition",
        method: "GET",
      }),
      providesTags: ["termsAndConditions"],
    }),
    createTerms: builder.mutation({
      query: ({ description }) => ({
        url: "legalDoc/create-doc/termsAndCondition",
        method: "PATCH",
        body: { description },
      }),
      invalidatesTags: ["termsAndConditions"],
    }),
  }),
});

export const { useGetTermsAndConditionsQuery, useCreateTermsMutation } =
  termsAndConditionsApi;
