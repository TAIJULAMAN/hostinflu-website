import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "admin/update-admin-personal-info",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["profile"],
    }),
    changeAdminPassword: builder.mutation({
      query: ({ currentPassword, newPassword, confirmPassword }) => ({
        url: "admin/change-password",
        method: "PUT",
        body: { currentPassword, newPassword, confirmPassword },
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useChangeAdminPasswordMutation,
} = profileApi;
