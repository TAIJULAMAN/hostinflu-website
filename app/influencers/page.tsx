"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Star, Twitter, Users, Video, Youtube } from "lucide-react";
import { useGetAllUsersQuery } from "@/Redux/api/user/userApi";
import { imgUrl } from "@/config/envConfig";
import Loader from "@/components/commom/loader";


export default function InfluencersPage() {
    const { data, isLoading, isError } = useGetAllUsersQuery({ role: "influencer" });
    const influencersData = data?.data?.filter((user: any) => user.role === "influencer") || [];

    const getSocialIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'facebook':
                return <Facebook className="w-3.5 h-3.5 text-gray-400 hover:text-[#1877F2] transition-colors" />;
            case 'instagram':
                return <Instagram className="w-3.5 h-3.5 text-gray-400 hover:text-[#E4405F] transition-colors" />;
            case 'twitter':
            case 'x':
                return <Twitter className="w-3.5 h-3.5 text-gray-400 hover:text-[#1DA1F2] transition-colors" />;
            case 'linkedin':
                return <Linkedin className="w-3.5 h-3.5 text-gray-400 hover:text-[#0A66C2] transition-colors" />;
            case 'youtube':
                return <Youtube className="w-3.5 h-3.5 text-gray-400 hover:text-[#FF0000] transition-colors" />;
            default:
                return <Users className="w-3.5 h-3.5 text-gray-400" />;
        }
    };

    const formatFollowers = (count: number) => {
        if (!count) return '0';
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
        if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
        return count.toString();
    };


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Top Influencers
                        </h1>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Connect with our verified influencers and showcase your property to their engaged audience.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center min-h-[400px]">
                            <Loader />
                        </div>
                    ) : isError ? (
                        <div className="text-center text-red-500">
                            <p>Failed to load influencers. Please try again later.</p>
                        </div>
                    ) : influencersData.length === 0 ? (
                        <div className="text-center text-gray-500">No influencers found.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {influencersData.map((influencer: any) => {
                                const name = influencer?.name || "N/A";
                                const role = influencer?.category || influencer?.role || "Lifestyle";
                                const image = influencer?.image
                                    ? `${imgUrl}${influencer.image}`
                                    : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80";
                                const rating = influencer?.averageRating ? Number(influencer.averageRating).toFixed(1) : "0.0";
                                const isFounder = influencer?.isFounderMember;
                                const isVerified = influencer?.status === 'active';

                                // Calculate total followers
                                const followersCount = influencer?.socialMediaLinks?.reduce((acc: number, link: any) => acc + (link.followers || 0), 0) || 0;
                                const collaborations = influencer?.collaborationsTotal || influencer?.dealsTotal || 0;

                                return (
                                    <div
                                        key={influencer._id}
                                        className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
                                    >
                                        {/* Influencer Image - Full Width */}
                                        <div className="relative w-full aspect-[4/3] overflow-hidden">
                                            <Image
                                                src={image}
                                                alt={name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                                            {isFounder && (
                                                <div className="absolute top-3 right-3">
                                                    <Badge className="bg-white/90 backdrop-blur-md text-orange-600 border-none shadow-sm font-medium text-xs px-2.5 py-1">
                                                        <span className="mr-1">👑</span> Founder Member
                                                    </Badge>
                                                </div>
                                            )}

                                            <div className="absolute bottom-3 left-3 text-white">
                                                <div className="flex items-center gap-1 text-xs font-medium bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                                                    <Video className="w-3 h-3" />
                                                    {role}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#fc826f] transition-colors">
                                                        {name}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-2 mt-3">
                                                        {influencer?.socialMediaLinks && influencer.socialMediaLinks.length > 0 ? (
                                                            influencer.socialMediaLinks.map((link: any, idx: number) => (
                                                                <div
                                                                    key={link._id || idx}
                                                                    className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg text-xs font-medium text-gray-600"
                                                                >
                                                                    {getSocialIcon(link.platform)}
                                                                    <span>{formatFollowers(link.followers)}</span>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg text-xs font-medium text-gray-600">
                                                                <Users className="w-3.5 h-3.5 text-gray-400" />
                                                                <span>0</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100">
                                                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                                    <span className="text-xs font-bold text-gray-900">{rating}</span>
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-sm text-gray-500 mb-5">
                                                <span>{collaborations} collaborations</span>
                                                {isVerified && (
                                                    <span className="text-[#fc826f] font-medium text-xs bg-[#fc826f]/10 px-2 py-1 rounded-full">Verified</span>
                                                )}
                                            </div>

                                            {/* Action Button */}
                                            <Link href={`/influencers/${influencer._id}`} className="mt-auto w-full">
                                                <Button className="w-full bg-white border-2 border-[#fc826f] text-[#fc826f] hover:bg-[#fc826f] hover:text-white font-semibold rounded-xl h-11 transition-all duration-300">
                                                    View Profile
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
