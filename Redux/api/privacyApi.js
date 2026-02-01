import { baseApi } from "./baseApi";

const privacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => ({
        url: "legalDoc/get-doc/privacyPolicy",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),

    createPrivacy: builder.mutation({
      query: ({ description }) => ({
        url: "legalDoc/create-doc/privacyPolicy",
        method: "PATCH",
        body: { description },
      }),
      invalidatesTags: ["privacy"],
    }),
  }),
});

export const { useGetPrivacyQuery, useCreatePrivacyMutation } = privacyApi;
