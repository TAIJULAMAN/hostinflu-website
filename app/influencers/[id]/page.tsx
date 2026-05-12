"use client";

import Link from "next/link";
import { use } from "react";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Sun, User } from "lucide-react";
import { useGetUserByIdQuery } from "@/Redux/api/user/userApi";
import { useGetReviewByIdQuery } from "@/Redux/api/review/reviewApi";
import Loader from "@/components/commom/loader";
import { imgUrl } from "@/config/envConfig";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Users, Video, Calendar } from "lucide-react";
import { SocialIcon } from "@/components/influencer/social-icon";
import { FollowerCount } from "@/components/influencer/follower-count";
import { InfluencerReviews } from "@/components/influencer/influencer-reviews";



export default function InfluencerProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data: userResponse, isLoading: isUserLoading, isError: isUserError } = useGetUserByIdQuery(id);
    const { data: reviewsResponse, isLoading: isReviewsLoading } = useGetReviewByIdQuery(id);
    const influencerData = userResponse?.data;
    const reviews = reviewsResponse?.data || [];

    if (isUserLoading || isReviewsLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <Loader />
            </div>
        );
    }
    if (isUserError || !influencerData) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold text-red-500">Failed to load profile. Please try again.</h2>
            </div>
        );
    }

    const name = influencerData?.name || "N/A";
    const userName = influencerData?.userName ? `@${influencerData.userName}` : "@username";
    const location = influencerData?.fullAddress || "No Location";
    const about = influencerData?.aboutMe || "No information provided.";
    const image = influencerData?.image
        ? `${imgUrl}${influencerData.image}`
        : "/placeholder-user.jpg";

    const nightCredits = influencerData?.nightCredits || 0;
    const averageRating = influencerData?.averageRating ? Number(influencerData.averageRating).toFixed(1) : "0.0";
    const collaborations = influencerData?.collaborationsTotal || 0;
    const joinedYear = influencerData?.createdAt ? new Date(influencerData.createdAt).getFullYear() : "N/A";
    const isVerified = influencerData?.status === 'active';
    const isFounder = influencerData?.isFounderMember;


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow py-12">
                <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
                    {/* Header*/}
                    <Card className="border-gray-200 shadow-sm overflow-hidden">
                        <CardContent className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-white shadow-md">
                                    <AvatarImage src={image} className="object-cover" />
                                    <AvatarFallback>{name[0]}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                            {name}
                                        </h1>
                                        {isVerified && (
                                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-normal">
                                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                                Verified Influencer
                                            </Badge>
                                        )}
                                        {isFounder && (
                                            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none font-normal">
                                                👑 Founder Member
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1.5">
                                            <User className="w-4 h-4 text-blue-500" />
                                            {userName}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-4 h-4 text-red-500" />
                                            {location}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-orange-400" />
                                            Joined {joinedYear}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 mt-3">
                                        {influencerData?.socialMediaLinks && influencerData?.socialMediaLinks?.length > 0 ? (
                                            influencerData.socialMediaLinks.map((link: any) => (
                                                <a
                                                    key={link._id}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-xs font-medium text-gray-600 group/link"
                                                >
                                                    <SocialIcon platform={link.platform} />
                                                    <FollowerCount count={link.followers} />
                                                </a>
                                            ))
                                        ) : (
                                            <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg text-xs font-medium text-gray-600">
                                                <Users className="w-3.5 h-3.5 text-gray-400" />
                                                <span>0</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg text-xs font-medium text-gray-600">
                                            <Sun className="w-3.5 h-3.5 text-gray-400" />
                                            <span>{nightCredits}</span>
                                        </div>
                                    </div>
                                </div>


                                <Link href={`/collaboration-request/${id}?nightCredits=${nightCredits}`}>
                                    <Button className="bg-[#fc826f] hover:bg-[#fc826f]/90 text-white font-semibold rounded-lg px-6 h-11 shadow-sm">
                                        Send Collaboration Request
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        <Card className="border-gray-200 shadow-sm">
                            <CardContent className="p-6">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-3">
                                    <Video className="w-5 h-5" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    {collaborations}
                                </div>
                                <div className="text-sm text-gray-500">Completed Collaborations</div>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-200 shadow-sm">
                            <CardContent className="p-6">
                                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 mb-3">
                                    <Star className="w-5 h-5" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    {averageRating}
                                </div>
                                <div className="text-sm text-gray-500">Average Rating</div>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-200 shadow-sm">
                            <CardContent className="p-6">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-3">
                                    <Sun className="w-5 h-5" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    {nightCredits}
                                </div>
                                <div className="text-sm text-gray-500">Night Credits</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* About Me Section */}
                    <Card className="border-gray-200 shadow-sm">
                        <CardContent className="p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {about}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Reviews Section */}
                    <InfluencerReviews reviews={reviews} />
                </div>
            </div>
            <Footer />
        </div>
    );
}
