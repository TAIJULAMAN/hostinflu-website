"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Search, Star, Users, Video } from "lucide-react";
import { useGetAllUsersQuery } from "@/Redux/api/user/userApi";
import { imgUrl } from "@/config/envConfig";
import Loader from "@/components/commom/loader";
import { CustomPagination } from "@/components/commom/custom-pagination";
import { useDebounce } from "@/hooks/useDebounce";
import { SocialIcon } from "@/components/influencer/social-icon";
import { FollowerCount } from "@/components/influencer/follower-count";
import { useCreateFavoriteMutation } from "@/Redux/api/bookmark/bookmarkApi";
import { toast } from "sonner";


export default function InfluencersPage() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 500);

    useEffect(() => {
        setPage(1);
    }, [searchTerm]);

    const { data, isLoading, isError } = useGetAllUsersQuery({
        role: "influencer",
        page,
        limit: 10,
        search: debouncedSearch
    });

    const [createFavorite] = useCreateFavoriteMutation();
    const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);


    const influencersData = data?.data?.filter((user: any) => {
        const matchesRole = user.role === "influencer";
        const matchesSearch = searchTerm
            ? user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
        return matchesRole && matchesSearch;
    }) || [];
    const pagination = data?.pagination;




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
                    <div className="flex justify-end mb-8">
                        <div className="relative w-64">
                            <input
                                type="text"
                                placeholder="Search influencers"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                        </div>
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
                                    : "/placeholder-user.jpg";
                                const rating = influencer?.averageRating ? Number(influencer.averageRating).toFixed(1) : "0.0";
                                const isFounder = influencer?.isFounderMember;
                                const isVerified = influencer?.status === 'active';
                                const collaborations = influencer?.collaborationsTotal || influencer?.completeDealsTotal || 0;

                                return (
                                    <div
                                        key={influencer._id}
                                        className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
                                    >
                                        <div className="relative w-full aspect-[4/3] overflow-hidden">
                                            <Image
                                                src={image}
                                                alt={name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                                            {isFounder && (
                                                <div className="absolute top-3 right-3 z-10">
                                                    <Badge className="bg-white/90 backdrop-blur-md text-orange-600 border-none shadow-sm font-medium text-xs px-2.5 py-1">
                                                        <span className="mr-1">👑</span> Founder Member
                                                    </Badge>
                                                </div>
                                            )}

                                            <button
                                                className="absolute top-4 left-4 z-10 p-2 rounded-full bg-black/10 backdrop-blur-md border border-white/20 transition-all duration-300 shadow-sm"
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    const isBookmarked = bookmarkedIds.includes(influencer._id);
                                                    try {
                                                        const res = await createFavorite(influencer._id).unwrap();
                                                        if (isBookmarked) {
                                                            setBookmarkedIds((prev) => prev.filter((id) => id !== influencer._id));
                                                        } else {
                                                            setBookmarkedIds((prev) => [...prev, influencer._id]);
                                                        }
                                                        toast.success(res?.message || (isBookmarked ? "Influencer saved to favorites" : "Removed from favorites"));
                                                    } catch (error: any) {
                                                        toast.error(error?.data?.message || "Failed to update favorites");
                                                    }
                                                }}
                                                aria-label='add-to-wishlist'
                                            >
                                                <Heart
                                                    className={`w-6 h-6 transition-all duration-500 cursor-pointer ${bookmarkedIds.includes(influencer._id)
                                                        ? "text-red-500 fill-red-500"
                                                        : "text-white hover:text-red-500"
                                                        }`}
                                                />
                                            </button>


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
                                                                    <SocialIcon platform={link.platform} />
                                                                    <FollowerCount count={link.followers} />
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

                    {/* Pagination */}
                    {pagination && (
                        <CustomPagination
                            page={page}
                            totalPages={pagination.totalPages}
                            setPage={setPage}
                        />
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
