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
        sendMessage: builder.mutation({
            query: ({ receiverId, formData }) => ({
                url: `message/send-message/${receiverId}`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["chat"],
        }),
    }),
});

export const { useGetAllConversationsQuery, useGetMessagesByReceiverIdQuery, useSendMessageMutation } = chatApi;
