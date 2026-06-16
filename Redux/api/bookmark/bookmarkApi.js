import { baseApi } from "../baseApi";

export const bookmarkApi = baseApi.injectEndpoints({
    overrideExisting: true,
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
        createFavouriteList: builder.mutation({
            query: ({ listingId, data }) => ({
                url: `listing/create-favorite/${listingId}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["favorite", "list"],
        }),
        getFavouriteList: builder.query({
            query: (data) => ({
                url: `listing/my-favorites`,
                method: "GET",
                params: data,
            }),
            providesTags: ["favorite"],
        }),
    }),
});

export const { useCreateFavoriteMutation, useGetMyFavoritesQuery, useCreateFavouriteListMutation, useGetFavouriteListQuery } = bookmarkApi;
