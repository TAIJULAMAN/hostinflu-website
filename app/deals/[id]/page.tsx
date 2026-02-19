"use client";

import React from "react";
import { PageHeading } from "@/components/commom/pageHeading";
import { Button } from "@/components/ui/button";
import { use } from "react";
import { useGetSingleListingQuery } from "@/Redux/api/host/list/listApi";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import Loader from "@/components/commom/loader";
import { ListingDetails } from "@/components/commom/listing-details";
import Link from "next/link";

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

                    <ListingDetails listing={listing} />

                    <div className="container max-w-5xl mx-auto flex justify-end gap-4 mt-6">
                        <Link href="/deals">
                            <Button variant="outline">Back to Deals</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
