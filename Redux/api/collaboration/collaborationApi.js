import { baseApi } from "../baseApi";

export const collaborationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCollaborations: builder.query({
            query: (params) => ({
                url: "collaboration/get-all-collaboration",
                method: "GET",
                params,
            }),
            providesTags: ["collaborations"],
        }),
        getAllMyCollaborations: builder.query({
            query: (params) => ({
                url: "collaboration/get-my-all-collaborations",
                method: "GET",
                params,
            }),
            providesTags: ["collaborations"],
        }),
        deleteCollaboration: builder.mutation({
            query: (id) => ({
                url: `collaboration/delete-collaboration/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["collaborations"],
        }),
        getSingleCollaboration: builder.query({
            query: (id) => ({
                url: `collaboration/get-single-collaboration/${id}`,
                method: "GET",
            }),
            providesTags: ["collaborations"],
        }),
    }),
});

export const {
    useGetAllCollaborationsQuery,
    useGetAllMyCollaborationsQuery,
    useDeleteCollaborationMutation,
    useGetSingleCollaborationQuery,
} = collaborationApi;