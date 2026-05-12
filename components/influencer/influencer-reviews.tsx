"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { format } from "date-fns";
import { imgUrl } from "@/config/envConfig";

interface Review {
    _id: string;
    user?: {
        name?: string;
        image?: string;
    };
    rating: number;
    createdAt?: string;
    comment: string;
}

interface InfluencerReviewsProps {
    reviews: Review[];
}

export const InfluencerReviews = ({ reviews }: InfluencerReviewsProps) => {
    return (
        <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews</h2>

                <div className="space-y-6">
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review._id} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0">
                                <Avatar className="w-12 h-12 flex-shrink-0">
                                    <AvatarImage
                                        src={review.user?.image ? `${imgUrl}${review.user.image}` : `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 50)}`}
                                        className="object-cover"
                                    />
                                    <AvatarFallback>{review.user?.name?.[0] || "U"}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-gray-900">{review.user?.name || "Anonymous"}</h3>
                                    </div>

                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {review.createdAt ? format(new Date(review.createdAt), "PP") : "N/A"}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {review.comment}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No reviews yet.</p>
                    )}
                </div>

                {reviews.length > 5 && (
                    <div className="mt-6 text-center">
                        <Button variant="outline">
                            Load More Reviews
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
