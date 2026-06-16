"use client";

import React, { useState } from "react";
import { useGetFavouriteListQuery, useCreateFavouriteListMutation } from "@/Redux/api/bookmark/bookmarkApi";
import { imgUrl } from "@/config/envConfig";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import Loader from "@/components/commom/loader";
import { CustomPagination } from "@/components/commom/custom-pagination";

const ITEMS_PER_PAGE = 10;

export default function FavouritePage() {
    const [currentPage, setCurrentPage] = useState(1);
    
    const { data: response, isLoading, isError } = useGetFavouriteListQuery({
        page: currentPage,
        limit: ITEMS_PER_PAGE
    });
    
    const [createFavouriteList] = useCreateFavouriteListMutation();

    const favoritesData = response?.data?.listings || [];
    const pagination = response?.pagination || {};
    const totalPages = pagination?.totalPages || 1;

    const handleToggleFavorite = async (e: React.MouseEvent, listingId: string) => {
        e.preventDefault();
        try {
            // Adjust the payload format if the mutation requires different arguments.
            const res = await createFavouriteList({ listingId, data: {} }).unwrap();
            toast.success(res?.message || "Removed from favorites");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update favorites");
        }
    };



    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Favourite Listings</h1>
                <p className="text-gray-500">Manage your saved listings and view their details.</p>
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
                    No favourite listings found.
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favoritesData.map((listing: any) => {
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
                                            onClick={(e) => handleToggleFavorite(e, listing._id)}
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
                                        <Link href={`/deals/${listing._id}`} className="mt-auto w-full">
                                            <Button className="w-full bg-white border-2 border-[#fc826f] text-[#fc826f] hover:bg-[#fc826f] hover:text-white font-semibold rounded-xl h-11 transition-all duration-300">
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            );
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
