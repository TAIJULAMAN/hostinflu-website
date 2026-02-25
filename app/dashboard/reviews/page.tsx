"use client";

import { useSelector } from "react-redux";
import { Star } from "lucide-react";
import { useGetReviewByIdQuery } from "@/Redux/api/review/reviewApi";
import Loader from "@/components/commom/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { imgUrl } from "@/config/envConfig";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReviewsPage() {
    const { user } = useSelector((state: any) => state.auth);
    const userId = user?._id || user?.id;

    const { data: reviewsResponse, isLoading, isError } = useGetReviewByIdQuery(userId, {
        skip: !userId,
    });

    const reviews = reviewsResponse?.data?.reviews || [];
    if (isLoading) return <Loader />;

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-red-500 font-medium">Failed to load reviews. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-[2.5rem] bg-white overflow-hidden">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Client Reviews
                    </CardTitle>
                    <p className="text-gray-500 mt-2 font-medium">
                        What others are saying about your work and profile.
                    </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                    <div className="space-y-8 mt-6">
                        {reviews.length > 0 ? (
                            reviews.map((review: any) => (
                                <div key={review._id} className="flex flex-col sm:flex-row gap-6 p-6 rounded-3xl bg-[#F8F9FA] transition-all hover:shadow-md border border-transparent hover:border-teal-100 group">
                                    <Avatar className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 border-2 border-white shadow-sm">
                                        <AvatarImage
                                            src={review?.reviewerId?.image ? (review?.reviewerId?.image.startsWith('http') ? review?.reviewerId?.image : `${imgUrl}${review?.reviewerId?.image}`) : ""}
                                            className="object-cover"
                                        />
                                        <AvatarFallback className="bg-teal-50 text-teal-600 font-bold text-lg">
                                            {review?.reviewerId?.name?.[0] || "U"}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg group-hover:text-teal-600 transition-colors">
                                                    {review?.reviewerId?.name || "Anonymous User"}
                                                </h3>
                                                <div className="flex items-center gap-1 mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm">
                                                {review.createdAt ? format(new Date(review.createdAt), "PP") : "N/A"}
                                            </span>
                                        </div>

                                        <p className="text-gray-600 leading-relaxed font-medium italic">
                                            "{review.comment}"
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <Star className="w-10 h-10 text-gray-200" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">No reviews yet</h3>
                                <p className="text-gray-500 mt-1 max-w-xs">When clients leave you a review, they will appear here on your dashboard.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
