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
        })
    }),
});

export const {
    useGetAllCollaborationsQuery,
} = collaborationApi;