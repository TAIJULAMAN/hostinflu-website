"use client";

import Link from "next/link";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";

const influencerData = {
    id: 1,
    name: "Sarah Mitchell",
    location: "Dubai, UAE",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    about: "Hi! I'm Sarah, a travel and lifestyle content creator based in Dubai. With over 5 years of experience in digital storytelling, I collaborate with content creators to showcase beautiful stays and unique travel experiences. My content focuses on authentic travel experiences, luxury accommodations, and hidden gems around the world. I'm passionate about creating engaging visual stories that inspire wanderlust and connect brands with their ideal audience through my platforms. My audience is predominantly millennials and Gen Z travelers who value authenticity and unique experiences.",
    reviews: [
        {
            id: 1,
            name: "Michael Chen",
            avatar: "https://avatar.iran.liara.run/public/42",
            rating: 5,
            date: "2 weeks ago",
            comment: "Sarah delivered all of expectations! Her content was stunning, delivered on time, and generated incredible engagement for our resort. Professional, creative, and a pleasure to work with. Highly recommend!",
            verified: true,
        },
        {
            id: 2,
            name: "David Margrave",
            avatar: "https://avatar.iran.liara.run/public/33",
            rating: 5,
            date: "1 month ago",
            comment: "Working with Sarah was fantastic! Her professionalism and brand-dated services and created authentic content for our resort. The ROI was excellent. The ROI was excellent!",
            verified: true,
        },
        {
            id: 3,
            name: "James Wilson",
            avatar: "https://avatar.iran.liara.run/public/28",
            rating: 5,
            date: "3 months ago",
            comment: "EXCELLENT WORK! Sarah delivered on all of expectations! Her content was stunning, delivered on time, and generated incredible engagement for our resort. Professional, creative, and a pleasure to work with. Highly recommend!",
            verified: true,
        },
        {
            id: 4,
            name: "Robert Taylor",
            avatar: "https://avatar.iran.liara.run/public/19",
            rating: 5,
            date: "4 months ago",
            comment: "Sarah was amazing to work with! Her content perfectly captured the essence of our resort and the ROI was excellent. She delivered on time and was very professional throughout the entire collaboration process. Will definitely work with her again!",
            verified: true,
        },
    ],
};

export default function InfluencerProfilePage({ params }: { params: { id: string } }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow pb-12">
                <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
                    {/* Header Card */}
                    <Card className="border-gray-200 shadow-sm overflow-hidden">
                        <CardContent className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-white shadow-md">
                                    <AvatarImage src={influencerData.avatar} className="object-cover" />
                                    <AvatarFallback>{influencerData.name[0]}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1 space-y-2">
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                        {influencerData.name}
                                    </h1>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="w-4 h-4 text-red-500" />
                                        {influencerData.location}
                                    </div>
                                </div>

                                <Link href={`/collaboration-request/${params.id}`}>
                                    <Button className="bg-[#fc826f] hover:bg-[#fc826f]/90 text-white font-semibold rounded-lg px-6 h-11 shadow-sm">
                                        Send Collaboration Request
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* About Me Section */}
                    <Card className="border-gray-200 shadow-sm">
                        <CardContent className="p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {influencerData.about}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Reviews Section */}
                    <Card className="border-gray-200 shadow-sm">
                        <CardContent className="p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews</h2>

                            <div className="space-y-6">
                                {influencerData.reviews.map((review) => (
                                    <div key={review.id} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0">
                                        <Avatar className="w-12 h-12 flex-shrink-0">
                                            <AvatarImage src={review.avatar} className="object-cover" />
                                            <AvatarFallback>{review.name[0]}</AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-gray-900">{review.name}</h3>
                                            </div>

                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(review.rating)].map((_, i) => (
                                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                    ))}
                                                </div>
                                                <span className="text-xs text-gray-500">{review.date}</span>
                                            </div>

                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {review.comment}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 text-center">
                                <Button variant="outline">
                                    Load More Reviews
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Footer />
        </div>
    );
}
