import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { useGetAllReviewQuery } from "@/Redux/api/review/reviewApi"

export function Testimonials() {
    const { data } = useGetAllReviewQuery({})
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-4">What Our Users Say</h2>
                    <p className="text-lg text-muted-foreground">Real experiences from hosts and influencers.</p>
                </div>

                <div className="grid md:grid-cols-4 gap-5">
                    {data?.data?.reviews?.slice(0, 4)?.map((review: any) => (
                        <Card
                            key={review?._id}
                            className="p-5 bg-white border border-gray-200 shadow-md hover:shadow-lg rounded-2xl hover:scale-105 transition-transform duration-300"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(review?.rating || 0)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-foreground mb-6 italic">"{review?.comment}"</p>
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={review?.reviewerId?.image} alt={review?.reviewerId?.name} />
                                    <AvatarFallback>{review?.reviewerId?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold text-foreground">{review?.reviewerId?.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {review?.reviewType === "host_to_influencer" ? "Host" : "Influencer"}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
