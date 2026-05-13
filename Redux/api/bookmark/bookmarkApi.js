import { baseApi } from "../baseApi";

export const bookmarkApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createFavorite: builder.mutation({
            query: (id) => ({
                url: `auth/create-favorite/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["favorite"],
        }),
        getMyFavorites: builder.query({
            query: () => "auth/my-favorites",
            providesTags: ["favorite"],
        }),
    }),
});

export const { useCreateFavoriteMutation, useGetMyFavoritesQuery } = bookmarkApi;
