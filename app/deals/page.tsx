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
import { useGetAllDealsQuery } from "@/Redux/api/host/deals/dealsApi";
import { imgUrl } from "@/config/envConfig";

const deals = [];

export default function DealsPage() {
    const router = useRouter();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedDeal, setSelectedDeal] = useState<any>(null);

    const { data: dealsData, isLoading } = useGetAllDealsQuery({});
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
                                <Card key={deal._id} className="border-gray-200  shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                                    {/* Property Image */}
                                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={deal?.title?.images?.[0] ? `${imgUrl}${deal.title.images[0]}` : "/list.png"}
                                            alt={deal?.title?.title || "Property"}
                                            fill
                                            className="object-cover rounded-t-lg"
                                        />
                                    </div>

                                    <CardContent className="p-4">
                                        {/* Host Info */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
                                                <AvatarImage src={deal?.userId?.image ? `${imgUrl}${deal.userId.image}` : "https://avatar.iran.liara.run/public/42"} />
                                                <AvatarFallback>{deal?.userId?.name?.[0] || "H"}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium text-gray-900">{deal?.userId?.name || "Host Name"}</span>
                                        </div>

                                        {/* Property Name */}
                                        <h3 className="text-base font-bold text-gray-900 mb-2">
                                            {deal?.title?.title || "Property Name"}
                                        </h3>

                                        {/* Credits/Amount info */}
                                        <div className="text-sm text-gray-600 mb-2">
                                            {deal?.compensation?.numberOfNights ? `${deal.compensation.numberOfNights} Nights Credit` : "Negotiable"}
                                        </div>


                                        {/* Action Buttons */}
                                        <div className="flex gap-2">

                                            <Link href={`/deals/${deal._id}`} className="flex-1">
                                                <Button className="w-full bg-white text-black border-1 border-black font-semibold rounded-md">
                                                    View Details
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                                onClick={() => handleCollaboration(deal)}
                                            >
                                                Collaboration
                                            </Button>
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
