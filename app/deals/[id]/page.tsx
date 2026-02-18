"use client";

import React from "react";
import { PageHeading } from "@/components/commom/pageHeading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Home, CheckCircle2, User, Mail } from "lucide-react";
import { use } from "react";
import { useGetSingleListingQuery } from "@/Redux/api/host/list/listApi";
import { imgUrl } from "@/config/envConfig";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import Loader from "@/components/commom/loader";

export default function DealDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data: listingData, isLoading } = useGetSingleListingQuery(id);
    const listing = listingData?.data?.listing?.[0] || listingData?.data;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <Loader />
                <Footer />
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex-grow container mx-auto pb-20 flex items-center justify-center">
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-semibold text-gray-800">Listing not found</h2>
                        <Link href="/deals">
                            <Button className="mt-4">Back to Deals</Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-grow pt-24 pb-20">
                <div className="container mx-auto">
                    <div className="mb-10">
                        <PageHeading title={listing?.title} />
                    </div>

                    <div className="max-w-5xl mx-auto space-y-6">
                        <div className="rounded-xl overflow-hidden border border-gray-200 relative aspect-video">
                            <img
                                src={listing?.images?.[0] ? `${imgUrl}${listing.images[0]}` : "/list.png"}
                                alt={listing?.title || "Listing Image"}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Property Information */}
                        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-lg space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Property Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-start gap-3">
                                        <Home className="h-5 w-5 text-teal-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-500">Property Type</p>
                                            <p className="text-base font-medium text-gray-900">
                                                {listing?.propertyType || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-teal-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-500">Location</p>
                                            <p className="text-base font-medium text-gray-900">
                                                {listing?.location || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Calendar className="h-5 w-5 text-teal-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-500">Date Added</p>
                                            <p className="text-base font-medium text-gray-900">
                                                {listing?.createdAt ? new Date(listing.createdAt).toLocaleDateString() : "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-500">Status</p>
                                            <p className="text-base font-medium text-gray-900 capitalize">
                                                {listing?.status || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Description
                                </h3>
                                <p className="text-gray-700 leading-relaxed">{listing?.description || "No description available."}</p>
                            </div>

                            {/* Amenities Section */}
                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Amenities
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {listing?.amenities && Object.entries(listing.amenities).map(([key, value]) => (
                                        value && (
                                            <div key={key} className="flex items-center gap-2 text-gray-700">
                                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                <span className="text-sm capitalize">
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </span>
                                            </div>
                                        )
                                    ))}
                                    {listing?.customAmenities?.map((amenity: string, index: number) => (
                                        <div key={`custom-${index}`} className="flex items-center gap-2 text-gray-700">
                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                            <span className="text-sm">{amenity}</span>
                                        </div>
                                    ))}
                                    {(!listing?.amenities || Object.values(listing.amenities).every(v => !v)) && (!listing?.customAmenities || listing.customAmenities.length === 0) && (
                                        <p className="text-gray-500 text-sm italic">No amenities listed.</p>
                                    )}
                                </div>
                            </div>

                            {/* Host Information */}
                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Host Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                        <User className="h-5 w-5 text-teal-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-500">Host Name</p>
                                            <p className="text-base font-medium text-gray-900">
                                                {listing?.userId?.name || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Mail className="h-5 w-5 text-teal-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="text-base font-medium text-gray-900">
                                                {listing?.userId?.email || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
