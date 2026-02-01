import { baseApi } from "../baseApi";

export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllAdmins: builder.query({
            query: (params) => ({
                url: "admin/all-admins",
                method: "GET",
                params,
            }),
            providesTags: ["admins"],
        }),
        addAdmin: builder.mutation({
            query: (data) => ({
                url: "admin/create-admin",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["admins"],
        }),
        deleteAdmin: builder.mutation({
            query: (id) => ({
                url: `admin/delete-admin/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["admins"],
        })
    }),
});

export const {
    useGetAllAdminsQuery,
    useAddAdminMutation,
    useDeleteAdminMutation
} = adminApi;