"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetAllDealsByInfluencerQuery } from "@/Redux/api/host/deals/dealsApi";
import { imgUrl } from "@/config/envConfig";

const deals = [];

export default function DealsPage() {
    const router = useRouter();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedDeal, setSelectedDeal] = useState<any>(null);

    const { data: dealsData, isLoading } = useGetAllDealsByInfluencerQuery({});
    const dealsList = dealsData?.data?.deals || [];
    console.log("dealsList", dealsList);

    const handleCollaboration = (deal: any) => {
        setSelectedDeal(deal);
        setShowSuccessModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-10">
                <div className="container mx-auto px-5 md:px-0 py-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Explore Deals
                        </h1>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Discover collaboration opportunities from Hosts near you
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {isLoading ? (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                Loading deals...
                            </div>
                        ) : dealsList.length === 0 ? (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                No deals found.
                            </div>
                        ) : (
                            dealsList?.map((deal: any) => (
                                <Card key={deal._id} className="group border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full bg-white rounded-xl">
                                    {/* Property Image & Badges */}
                                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                                        <Image
                                            src={deal?.title?.images?.[0] ? `${imgUrl}${deal.title.images[0]}` : "/list.png"}
                                            alt={deal?.title?.title || "Property"}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                                        {/* Top Badges */}
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            {deal?.title?.status === 'verified' && (
                                                <span className="bg-white/90 backdrop-blur-sm text-teal-600 text-xs font-bold px-2 py-1 rounded-sm shadow-sm flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Verified
                                                </span>
                                            )}
                                        </div>

                                        {/* Bottom Info on Image */}
                                        <div className="absolute bottom-3 left-3 right-3 text-white">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Avatar className="w-6 h-6 border border-white/50 shadow-sm">
                                                    <AvatarImage src={deal?.userId?.image ? `${imgUrl}${deal.userId.image}` : "https://avatar.iran.liara.run/public/42"} />
                                                    <AvatarFallback>{deal?.userId?.name?.[0] || "H"}</AvatarFallback>
                                                </Avatar>
                                                <span className="text-xs font-medium text-white/90 truncate">{deal?.userId?.name || "Host Name"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <CardContent className="p-5 flex flex-col flex-grow">
                                        {/* Location & Type */}
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {deal?.title?.location || "Unknown Location"}
                                            </span>
                                            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{deal?.title?.propertyType || "Property"}</span>
                                        </div>

                                        {/* Property Name */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-teal-600 transition-colors">
                                            {deal?.title?.title || "Property Name"}
                                        </h3>

                                        {/* Compensation Details */}
                                        <div className="bg-teal-50 rounded-lg p-3 mb-4 space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-teal-800 font-medium">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                                </svg>
                                                {deal?.compensation?.numberOfNights ? `${deal.compensation.numberOfNights} Nights Credit` : "Stay Negotiable"}
                                            </div>
                                            {deal?.compensation?.paymentAmount && Number(deal.compensation.paymentAmount) > 0 && (
                                                <div className="flex items-center gap-2 text-sm text-teal-800 font-medium">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    ${deal.compensation.paymentAmount} Payment
                                                </div>
                                            )}
                                        </div>

                                        {/* Deliverables / Platforms */}
                                        <div className="mt-auto">
                                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Platform</div>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {deal?.deliverables?.map((delItem: any, idx: number) => {
                                                    const platform = delItem.platform || "Instagram";
                                                    // Basic color mapping for platforms
                                                    const colors: Record<string, string> = {
                                                        Instagram: "bg-pink-100 text-pink-700 border-pink-200",
                                                        TikTok: "bg-black/5 text-black border-gray-200",
                                                        YouTube: "bg-red-100 text-red-700 border-red-200",
                                                        Facebook: "bg-blue-100 text-blue-700 border-blue-200",
                                                    };
                                                    const colorClass = colors[platform] || "bg-gray-100 text-gray-700 border-gray-200";

                                                    return (
                                                        <span key={idx} className={`text-xs px-2 py-1 rounded border ${colorClass} font-medium`}>
                                                            {platform}
                                                        </span>
                                                    );
                                                })}
                                                {(!deal.deliverables || deal.deliverables.length === 0) && (
                                                    <span className="text-xs text-gray-400 italic">Open to discuss</span>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                                <Link href={`/deals/${deal._id}`} className="flex-1">
                                                    <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium h-10">
                                                        Details
                                                    </Button>
                                                </Link>
                                                <Button
                                                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium h-10 shadow-sm shadow-teal-200"
                                                    onClick={() => handleCollaboration(deal)}
                                                >
                                                    Collaborate
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>

                    {/* Load More Button */}
                    <div className="flex justify-center mt-12">
                        <Button
                            variant="outline"
                            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-6 rounded-lg"
                        >
                            Load More Deals
                        </Button>
                    </div>
                </div>
            </div>
            {/* Success Modal */}
            {showSuccessModal && selectedDeal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-300">
                        {/* Success Icon */}
                        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        {/* Content */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Application Sent Successfully!</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Your collaboration application has been sent to <span className="font-semibold text-gray-900">{selectedDeal.hostName}</span>. They will review your proposal and get back to you soon.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Button
                                onClick={() => router.push(`/deals/${selectedDeal.id}`)}
                                variant="outline"
                                className="w-full"
                            >
                                Back to Deal
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
