"use client";

import React, { useState } from "react";
import { useGetFavouriteListQuery, useCreateFavouriteListMutation, useGetMyFavoritesQuery, useCreateFavoriteMutation } from "@/Redux/api/bookmark/bookmarkApi";
import { imgUrl } from "@/config/envConfig";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Users, Star } from "lucide-react";
import { SocialIcon } from "@/components/influencer/social-icon";
import { FollowerCount } from "@/components/influencer/follower-count";
import { toast } from "sonner";
import Loader from "@/components/commom/loader";
import { CustomPagination } from "@/components/commom/custom-pagination";
import { useSelector } from "react-redux";

const ITEMS_PER_PAGE = 10;

export default function FavouritePage() {
    const [currentPage, setCurrentPage] = useState(1);
    const user = useSelector((state: any) => state.auth.user);

    const isHost = user?.role === "host";

    const { data: listingsResponse, isLoading: isLoadingListings, isError: isErrorListings } = useGetFavouriteListQuery({
        page: currentPage,
        limit: ITEMS_PER_PAGE
    }, { skip: isHost });

    const { data: influencersResponse, isLoading: isLoadingInfluencers, isError: isErrorInfluencers } = useGetMyFavoritesQuery(undefined, { skip: !isHost });

    const [createFavouriteList] = useCreateFavouriteListMutation();
    const [createFavorite] = useCreateFavoriteMutation();

    const favoritesData = isHost ? (influencersResponse?.data || []) : (listingsResponse?.data?.listings || []);
    const isLoading = isHost ? isLoadingInfluencers : isLoadingListings;
    const isError = isHost ? isErrorInfluencers : isErrorListings;
    
    const pagination = isHost ? (influencersResponse?.pagination || {}) : (listingsResponse?.pagination || {});
    const totalPages = pagination?.totalPages || 1;

    const handleToggleFavoriteListing = async (e: React.MouseEvent, listingId: string) => {
        e.preventDefault();
        try {
            const res = await createFavouriteList({ listingId, data: {} }).unwrap();
            toast.success(res?.message || "Removed from favorites");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update favorites");
        }
    };

    const handleToggleFavoriteInfluencer = async (e: React.MouseEvent, influencerId: string) => {
        e.preventDefault();
        try {
            const res = await createFavorite(influencerId).unwrap();
            toast.success(res?.message || "Removed from favorites");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update favorites");
        }
    };



    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">{isHost ? "Favourite Influencers" : "Favourite Listings"}</h1>
                <p className="text-gray-500">{isHost ? "Manage your saved Influencers and view their details." : "Manage your saved listings and view their details."}</p>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <Loader />
                </div>
            ) : isError ? (
                <div className="text-center text-red-500 py-10">
                    <p>Failed to load favourites. Please try again later.</p>
                </div>
            ) : favoritesData.length === 0 ? (
                <div className="text-center text-gray-500 py-10 bg-white rounded-xl border border-gray-100 shadow-sm">
                    {isHost ? "No favourite influencers found." : "No favourite listings found."}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favoritesData.map((item: any) => {
                            if (isHost) {
                                const influencer = item;
                                const name = influencer?.name || "N/A";
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
                                                onClick={(e) => handleToggleFavoriteInfluencer(e, influencer._id)}
                                                aria-label='remove-from-wishlist'
                                            >
                                                <Heart
                                                    className="w-6 h-6 transition-all duration-500 cursor-pointer text-red-500 fill-red-500 hover:text-white hover:fill-transparent"
                                                />
                                            </button>
                                        </div>

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

                                            <Link href={`/influencers/${influencer._id}`} className="mt-auto w-full">
                                                <Button className="w-full bg-white border-2 border-[#fc826f] text-[#fc826f] hover:bg-[#fc826f] hover:text-white font-semibold rounded-xl h-11 transition-all duration-300">
                                                    View Profile
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            } else {
                                const listing = item;
                                const title = listing?.title || "N/A";
                                const location = listing?.location || "N/A";
                                const image = listing?.images && listing.images.length > 0
                                    ? `${imgUrl}${listing.images[0]}`
                                    : "/placeholder-property.jpg";
                                const propertyType = listing?.propertyType || "Property";
                                const isVerified = listing?.status === 'verified';

                                return (
                                    <div
                                        key={listing._id}
                                        className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
                                    >
                                        <div className="relative w-full aspect-[4/3] overflow-hidden">
                                            <Image
                                                src={image}
                                                alt={title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                                            <div className="absolute top-3 right-3 z-10">
                                                <Badge className="bg-white/90 backdrop-blur-md text-gray-800 border-none shadow-sm font-medium text-xs px-2.5 py-1">
                                                    {propertyType}
                                                </Badge>
                                            </div>

                                            <button
                                                className="absolute top-4 left-4 z-10 p-2 rounded-full bg-black/10 backdrop-blur-md border border-white/20 transition-all duration-300 shadow-sm"
                                                onClick={(e) => handleToggleFavoriteListing(e, listing._id)}
                                                aria-label='remove-from-wishlist'
                                            >
                                                <Heart
                                                    className="w-6 h-6 transition-all duration-500 cursor-pointer text-red-500 fill-red-500 hover:text-white hover:fill-transparent"
                                                />
                                            </button>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#fc826f] transition-colors line-clamp-1">
                                                        {title}
                                                    </h3>
                                                    <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-500">
                                                        <MapPin className="w-4 h-4 text-gray-400" />
                                                        <span className="line-clamp-1">{location}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-sm text-gray-500 mb-5">
                                                {isVerified ? (
                                                    <span className="text-[#fc826f] font-medium text-xs bg-[#fc826f]/10 px-2 py-1 rounded-full">Verified</span>
                                                ) : (
                                                    <span className="text-gray-500 font-medium text-xs bg-gray-100 px-2 py-1 rounded-full">Unverified</span>
                                                )}
                                            </div>

                                            {/* Action Button */}
                                            <div className="flex gap-2 w-full mt-auto">
                                                <Link href={`/deals/${listing._id}`} className="w-full">
                                                    <Button className="w-full bg-white border-2 border-[#fc826f] text-[#fc826f] hover:bg-[#fc826f] hover:text-white font-semibold rounded-xl h-11 transition-all duration-300">
                                                        View Details
                                                    </Button>
                                                </Link>
                                                {user?.role === "influencer" && (
                                                    <Link href={`/collaboration-request/${listing.userId?._id || listing.userId}?listingId=${listing._id}&title=${encodeURIComponent(listing.title || "")}&description=${encodeURIComponent(listing.description || "")}`} className="w-full">
                                                        <Button className="w-full bg-[#10B981CC] hover:bg-[#10B981] text-white font-semibold rounded-xl h-11 transition-all duration-300">
                                                            Collaborate
                                                        </Button>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-8 flex justify-center">
                            <CustomPagination
                                page={currentPage}
                                totalPages={totalPages}
                                setPage={setCurrentPage}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
