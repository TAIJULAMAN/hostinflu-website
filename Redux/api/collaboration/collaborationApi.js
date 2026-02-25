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
        getCollaborationByUserId: builder.query({
            query: ({ userId, ...params }) => ({
                url: `collaboration/get-collaboration-user/${userId}`,
                method: "GET",
                params,
            }),
            providesTags: ["collaborations"],
        }),
        updateCollaborationStatus: builder.mutation({
            query: ({ id, action }) => {
                console.log("RTK_QUERY_DEBUG: updating status", { id, action });
                return {
                    url: `collaboration/accept-or-reject-collaboration/${id}`,
                    method: "PATCH",
                    body: { action: action },
                };
            },
            invalidatesTags: ["collaborations"],
        }),
    }),
});

export const {
    useGetAllCollaborationsQuery,
    useGetAllMyCollaborationsQuery,
    useDeleteCollaborationMutation,
    useGetSingleCollaborationQuery,
    useGetCollaborationByUserIdQuery,
    useUpdateCollaborationStatusMutation,
} = collaborationApi;