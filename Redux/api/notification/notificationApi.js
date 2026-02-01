import { baseApi } from "../baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: (params) => ({
        url: "notification/list",
        method: "GET",
        params,
      }),
      providesTags: ["notification"],
    }),
    updateSingleNotification: builder.mutation({
      query: (id) => ({
        url: `notification/mark/${id}`,
        method: "PATCH",
        body: { isRead: "true" },
      }),
      invalidatesTags: ["notification"],
    }),
    updateAllNotification: builder.mutation({
      query: () => ({
        url: "notification/mark-all",
        method: "PATCH",
        body: { isRead: "true" },
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const { useGetAllNotificationQuery, useUpdateSingleNotificationMutation, useUpdateAllNotificationMutation } =
  notificationApi;

export default notificationApi;
