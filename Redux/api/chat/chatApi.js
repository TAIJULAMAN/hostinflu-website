import { baseApi } from "../baseApi";

export const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllConversations: builder.query({
            query: (params) => ({
                url: "message/get-all-conversations",
                method: "GET",
                params,
            }),
            providesTags: ["chat"],
        }),
        getMessagesByReceiverId: builder.query({
            query: (receiverId) => ({
                url: `message/get-message-by-receiverId/${receiverId}`,
                method: "GET",
            }),
            providesTags: ["chat"],
        }),
    }),
});

export const { useGetAllConversationsQuery, useGetMessagesByReceiverIdQuery } = chatApi;
