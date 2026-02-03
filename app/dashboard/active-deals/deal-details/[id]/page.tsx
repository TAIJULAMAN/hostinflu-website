"use client";

import {
    Calendar,
    MapPin,
    ExternalLink,
    Camera,
    Music,
    Hash,
    Youtube,
    ArrowLeft,
    Moon,
    CheckCircle2,
    DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeading } from "@/components/commom/pageHeading";
import { useGetSingleDealQuery } from "@/Redux/api/host/deals/dealsApi";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/commom/loader";
import { imgUrl } from "@/config/envConfig";
import Link from "next/link";
import Image from "next/image";

export default function DealDetailsPage() {
    const { id } = useParams();
    console.log(id, "id");

    const router = useRouter();
    const { data: dealData, isLoading } = useGetSingleDealQuery(id);
    console.log(dealData, "dealData");

    const deal = dealData?.data?.deal[0]
    console.log(deal, "deal");


    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader />
            </div>
        );
    }

    if (!deal) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <p className="text-gray-500">Deal not found</p>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        );
    }

    const getPlatformIcon = (platform: string) => {
        switch (platform?.toLowerCase()) {
            case "instagram": return <Camera className="w-5 h-5 text-pink-600" />;
            case "tiktok": return <Music className="w-5 h-5 text-black" />;
            case "youtube": return <Youtube className="w-5 h-5 text-red-600" />;
            case "twitter":
            case "x": return <Hash className="w-5 h-5 text-blue-400" />; // approximating X with Hash
            default: return <Hash className="w-5 h-5 text-gray-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="top-0 bg-white border-b border-gray-200 p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <PageHeading title="Deal Overview" />
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto p-6 space-y-6">
                {/* Deal Title & Status */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {deal?.title?.title || "N/A"}
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                            Created on {deal.createdAt ? new Date(deal.createdAt).toLocaleDateString() : "N/A"}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500">Deal ID: #{deal._id?.slice(-6).toUpperCase()}</span>
                    </div>
                </div>

                {/* Campaign Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Listing Information */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <h3 className="font-semibold text-gray-900 mb-3">
                                Listing Information
                            </h3>
                            <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                                <Image
                                    src={deal.title?.images?.[0] ? `${imgUrl}${deal.title.images[0]}` : "/list.png"}
                                    alt={deal.title?.title || "Listing Image"}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h4 className="font-semibold text-gray-900">
                                {deal.title?.title}
                            </h4>
                            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                <MapPin className="w-4 h-4" />
                                <span>{deal.title?.location || "No Location"}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                {deal.title?.description || deal.description || "No description provided."}
                            </p>
                            {deal?.addAirbnbLink && (
                                <Button
                                    className="w-full mt-3 justify-center gap-2 bg-[#10B981CC] hover:bg-[#10B981] text-white"
                                    asChild
                                >
                                    <Link href={deal?.addAirbnbLink} target="_blank">
                                        View Listing on Airbnb
                                        <ExternalLink className="w-4 h-4" />
                                    </Link>
                                </Button>
                            )}
                        </div>

                        {/* Campaign Details - Simplified for now based on available data */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <h3 className="font-semibold text-gray-900 mb-6">
                                Campaign Timeline
                            </h3>
                            <div className="relative space-y-0">
                                {/* Start Date */}
                                <div className="flex gap-4 relative pb-8">
                                    <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gray-100"></div>
                                    <div className="relative z-10 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 border-4 border-white shadow-sm">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <div className="pt-2">
                                        <p className="font-semibold text-gray-900 text-sm">Start Date</p>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {deal.inTimeAndDate ? new Date(deal.inTimeAndDate).toLocaleDateString() : "TBD"}
                                        </p>
                                    </div>
                                </div>
                                {/* End Date */}
                                <div className="flex gap-4 relative">
                                    <div className="relative z-10 w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 border-4 border-white shadow-sm">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <div className="pt-2">
                                        <p className="font-semibold text-gray-900 text-sm">End Date</p>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {deal.outTimeAndDate ? new Date(deal.outTimeAndDate).toLocaleDateString() : "TBD"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                        {/* Deliverables */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-900">
                                    Deliverables
                                </h3>
                            </div>

                            <div className="space-y-3">
                                {deal.deliverables?.map((item: any, i: number) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200"
                                    >
                                        <div className="w-10 h-10 rounded flex items-center justify-center bg-white border border-gray-200 shadow-sm">
                                            {getPlatformIcon(item.platform)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {item.quantity} {item.contentType} on {item.platform}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Followers Required: {item.platformFollowers?.[item.platform]}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {(!deal.deliverables || deal.deliverables.length === 0) && (
                                    <p className="text-sm text-gray-500">No deliverables specified.</p>
                                )}
                            </div>
                        </div>

                        {/* Compensation / Payment Details */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <h3 className="font-semibold text-gray-900 mb-4">Compensation</h3>
                            <div className="space-y-3">
                                {deal.compensation?.directPayment && (
                                    <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100 transition-all hover:shadow-sm">
                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                                            <DollarSign className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-emerald-800">Payment Amount</p>
                                            <p className="text-2xl font-bold text-gray-900 font-mono tracking-tight">${deal.compensation.paymentAmount}</p>
                                        </div>
                                    </div>
                                )}
                                {deal.compensation?.nightCredits && (
                                    <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100 transition-all hover:shadow-sm">
                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                                            <Moon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-indigo-800">Night Credits</p>
                                            <p className="text-2xl font-bold text-gray-900 font-mono tracking-tight">{deal.compensation.numberOfNights} <span className="text-sm font-normal text-gray-500">Nights</span></p>
                                        </div>
                                    </div>
                                )}
                                {!deal.compensation?.directPayment && !deal.compensation?.nightCredits && (
                                    <p className="text-sm text-gray-500">No compensation details available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
