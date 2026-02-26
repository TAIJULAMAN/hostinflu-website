import { baseApi } from "../baseApi";

export const referralApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createReferralCode: builder.mutation({
            query: () => ({
                url: "referral/generate-code",
                method: "POST",
            }),
            invalidatesTags: ["referral"],
        }),
    }),
});

export const {
    useCreateReferralCodeMutation
} = referralApi;