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

const deals = [
    {
        id: 1,
        hostName: "Michael Chen",
        hostAvatar: "https://avatar.iran.liara.run/public/42",
        propertyName: "Downtown Luxury Apt",
        propertyImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
        credits: "150 Credits",
        posts: "1 Post + 2 Stories",
    },
    {
        id: 2,
        hostName: "Emma Rodriguez",
        hostAvatar: "https://avatar.iran.liara.run/public/55",
        propertyName: "Beachfront Villa",
        propertyImage: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
        credits: "300 Credits",
        posts: "1 Post",
    },
    {
        id: 3,
        hostName: "David Park",
        hostAvatar: "https://avatar.iran.liara.run/public/28",
        propertyName: "Mountain Retreat",
        propertyImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
        credits: "300 Credits",
        posts: "1 Post",
    },
    {
        id: 4,
        hostName: "Sofia Martinez",
        hostAvatar: "https://avatar.iran.liara.run/public/65",
        propertyName: "Industrial Loft",
        propertyImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        credits: "180 Credits",
        posts: "1 Post + 1 Stories",
    },
    {
        id: 5,
        hostName: "James Wilson",
        hostAvatar: "https://avatar.iran.liara.run/public/33",
        propertyName: "Scandinavian House",
        propertyImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        credits: "220 Credits",
        posts: "1 Post",
    },
    {
        id: 6,
        hostName: "Lisa Thompson",
        hostAvatar: "https://avatar.iran.liara.run/public/44",
        propertyName: "Penthouse Suite",
        propertyImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        credits: "400 Credits",
        posts: "1 Post",
    },
    {
        id: 7,
        hostName: "Alex Johnson",
        hostAvatar: "https://avatar.iran.liara.run/public/19",
        propertyName: "Garden Cottage",
        propertyImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
        credits: "160 Credits",
        posts: "1 Post + 2 Stories",
    },
    {
        id: 8,
        hostName: "Rachel Kim",
        hostAvatar: "https://avatar.iran.liara.run/public/50",
        propertyName: "Modern Studio",
        propertyImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        credits: "120 Credits",
        posts: "1 Post",
    },
];

export default function DealsPage() {
    const router = useRouter();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedDeal, setSelectedDeal] = useState<typeof deals[0] | null>(null);

    const handleCollaboration = (deal: typeof deals[0]) => {
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
                        {deals.map((deal) => (
                            <Card key={deal.id} className="border-gray-200  shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                                {/* Property Image */}
                                <div className="relative w-full aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={deal.propertyImage}
                                        alt={deal.propertyName}
                                        fill
                                        className="object-cover rounded-t-lg"
                                    />
                                </div>

                                <CardContent className="p-4">
                                    {/* Host Info */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
                                            <AvatarImage src={deal.hostAvatar} />
                                            <AvatarFallback>{deal.hostName[0]}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium text-gray-900">{deal.hostName}</span>
                                    </div>

                                    {/* Property Name */}
                                    <h3 className="text-base font-bold text-gray-900 mb-2">
                                        {deal.propertyName}
                                    </h3>


                                    {/* Action Buttons */}
                                    <div className="flex gap-2">

                                        <Link href={`/deals/${deal.id}`} className="flex-1">
                                            <Button className="w-full bg-white text-black border-2 border-black font-semibold rounded-md">
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
                        ))}
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
