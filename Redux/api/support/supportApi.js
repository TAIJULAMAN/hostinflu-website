import { baseApi } from "../baseApi";

const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHelpRequest: builder.query({
      query: (params) => ({
        url: "help_support/find_by_all_help_report",
        method: "GET",
        params,
      }),
      providesTags: ["support"],
    }),
    deleteHelpRequest: builder.mutation({
      query: ({ id }) => ({
        url: `help_support/find_by_all_help_support/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["support"],
    }),
  }),
});

export const { useGetAllHelpRequestQuery, useDeleteHelpRequestMutation } =
  supportApi;

export default supportApi;
