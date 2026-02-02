"use client";

import React from "react";
import { PageHeading } from "@/components/commom/pageHeading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Home, CheckCircle2, User, Mail, Wifi, Droplet } from "lucide-react";
import { use } from "react";
import { useSelector } from "react-redux";
import { useGetSingleListingQuery } from "@/Redux/api/host/list/listApi";
import { imgUrl } from "@/config/envConfig";

export default function ListingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const storedList = useSelector((state: any) => state.list.list);
    const { data: listingData, isLoading } = useGetSingleListingQuery(id);
    const listing = listingData?.data?.listing?.[0] || (storedList?._id === id ? storedList : null);

    if (isLoading && !listing) {
        return (
            <div className="container mx-auto pb-20">
                <div className="text-center py-20">
                    <h2 className="text-2xl font-semibold text-gray-800">Loading...</h2>
                </div>
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="container mx-auto pb-20">
                <div className="text-center py-20">
                    <h2 className="text-2xl font-semibold text-gray-800">Listing not found</h2>
                    <Link href="/dashboard/lists">
                        <Button className="mt-4">Back to Listings</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto pb-20">
            <div className="mb-10">
                <PageHeading title={listing?.title} />
            </div>

            <div className="max-w-5xl mx-auto space-y-6">
                {/* Status Badge */}
                <div className="flex justify-between items-center">
                    <span
                        className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${listing?.status?.toLowerCase() === "verified"
                            ? "text-green-800 bg-green-100"
                            : "text-amber-800 bg-amber-100"
                            }`}
                    >
                        {listing?.status || "Unknown"}
                    </span>
                    {/* <Link href={`/dashboard/lists/edit/${listing._id}`}>
                        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                            Edit Listing
                        </Button>
                    </Link> */}
                </div>

                {/* Main Image */}
                <div className="rounded-xl overflow-hidden border border-gray-200">
                    <img
                        src={listing.images?.[0] ? `${imgUrl}${listing.images[0]}` : "/list.png"}
                        alt={listing.title}
                        className="w-full h-96 object-cover"
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
                                        {listing.propertyType}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-teal-600 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Location</p>
                                    <p className="text-base font-medium text-gray-900">
                                        {listing.location}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Calendar className="h-5 w-5 text-teal-600 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Date Added</p>
                                    <p className="text-base font-medium text-gray-900">
                                        {new Date(listing.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <p className="text-base font-medium text-gray-900 capitalize">
                                        {listing.status}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Description
                        </h3>
                        <p className="text-gray-700 leading-relaxed">{listing.description}</p>
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
                        </div>
                    </div>

                    {/* User Information */}
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

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <Link href="/dashboard/lists">
                        <Button variant="outline">Back to Listings</Button>
                    </Link>
                    {/* <Link href={`/dashboard/lists/edit/${listing._id}`}>
                        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                            Edit Listing
                        </Button>
                    </Link> */}
                </div>
            </div>
        </div>
    );
}
