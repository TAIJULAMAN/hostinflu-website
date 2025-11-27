"use client";

import React from "react";
import { PageHeading } from "@/components/commom/pageHeading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Home, CheckCircle2 } from "lucide-react";
import { use } from "react";
import { lists } from "../../data";

export default function ListingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    // Find the listing by ID
    const listing = lists.find((item) => item.id === id);

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
                <PageHeading title={listing.name} />
            </div>

            <div className="max-w-5xl mx-auto space-y-6">
                {/* Status Badge */}
                <div className="flex justify-between items-center">
                    <span
                        className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${listing.status.toLowerCase() === "verified"
                            ? "text-green-800 bg-green-100"
                            : "text-amber-800 bg-amber-100"
                            }`}
                    >
                        {listing.status}
                    </span>
                    <Link href={`/dashboard/lists/edit/${listing.id}`}>
                        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                            Edit Listing
                        </Button>
                    </Link>
                </div>

                {/* Main Image */}
                <div className="rounded-xl overflow-hidden border border-gray-200">
                    <img
                        src={listing.image}
                        alt={listing.name}
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
                                        {listing.date}
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
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <Link href="/dashboard/lists">
                        <Button variant="outline">Back to Listings</Button>
                    </Link>
                    <Link href={`/dashboard/lists/edit/${listing.id}`}>
                        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                            Edit Listing
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
