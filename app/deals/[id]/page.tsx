"use client";

import { useState } from "react";

import Link from "next/link";
import {
    Calendar,
    MapPin,
    DollarSign,
    CheckCircle2,
    ExternalLink,
    Camera,
    Music,
    Hash,
} from "lucide-react";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DealDetailsPage({ params }: { params: { id: string } }) {
    const [isSending, setIsSending] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleApply = () => {
        setIsSending(true);
        // Simulate API call
        setTimeout(() => {
            setIsSending(false);
            setShowSuccessModal(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-12">
                {/* Header */}
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Deal Overview</h1>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            Available
                        </Badge>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 space-y-6">
                    {/* Deal Title & Status */}
                    <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Weekend Stay Deal – Villa Serenity
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                                Created on 15 Nov 2025
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="text-sm text-gray-500">Deal ID: #DEAL1234</span>
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
                                <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                                    <img
                                        src="/list.png"
                                        alt="Luxury Beachfront Apartment"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h4 className="font-semibold text-gray-900">
                                    Luxury Beachfront Apartment
                                </h4>
                                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>Manhattan, New York</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown printer took a galley
                                    of type and scrambled it to make a type specimen book.
                                </p>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {["WiFi", "Pool", "Kitchen", "Parking"].map((amenity, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 bg-gray-50 text-xs text-gray-600 rounded-full"
                                        >
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                                <Button
                                    variant="outline"
                                    className="w-full mt-3 justify-center gap-2"
                                >
                                    View Listing on Airbnb
                                    <ExternalLink className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Campaign Requirements */}
                            <div className="bg-white rounded-xl border border-gray-200 p-5">
                                <h3 className="font-semibold text-gray-900 mb-3">
                                    Campaign Requirements
                                </h3>
                                <div className="space-y-6">
                                    {[
                                        {
                                            icon: <DollarSign className="w-5 h-5" />,
                                            title: "Budget",
                                            description: "$2,500.00 for collaboration",
                                        },
                                        {
                                            icon: <Calendar className="w-5 h-5" />,
                                            title: "Duration",
                                            description: "2-3 days stay required",
                                        },
                                        {
                                            icon: <CheckCircle2 className="w-5 h-5" />,
                                            title: "Deliverables",
                                            description: "1 Post + 2 Stories on Instagram",
                                        },
                                    ].map((item, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex-shrink-0 w-[50px] h-[50px] rounded bg-teal-100 text-teal-600 flex items-center justify-center">
                                                {item.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900">
                                                    {item.title}
                                                </h4>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-5">
                            {/* Required Content */}
                            <div className="bg-white rounded-xl border border-gray-200 p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-gray-900">
                                        Required Content
                                    </h3>
                                    <Badge
                                        variant="outline"
                                        className="bg-blue-100 text-blue-700"
                                    >
                                        3 Items
                                    </Badge>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        {
                                            emoji: <Camera className="w-6 h-6" />,
                                            title: "1 Instagram Reel showcasing the property exterior",
                                            platform: "Instagram",
                                        },
                                        {
                                            emoji: <Music className="w-6 h-6" />,
                                            title: "2 Instagram Stories highlighting guest experience",
                                            platform: "Instagram",
                                        },
                                        {
                                            emoji: <Hash className="w-6 h-6" />,
                                            title: "Tag @HostProfile and use #HostInfoCollab",
                                            platform: "Social Media",
                                        },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200"
                                        >
                                            <div className="w-12 h-12 rounded flex items-center justify-center text-sm font-bold bg-gray-100 border border-gray-300 text-gray-700">
                                                {item.emoji}
                                            </div>
                                            <div className="">
                                                <p className="font-medium text-gray-900">{item.title}</p>
                                                <Badge className="mt-1 text-xs bg-blue-100 text-blue-700">
                                                    {item.platform}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Host Information */}
                            <div className="bg-white rounded-xl border border-gray-200 p-5">
                                <h3 className="font-semibold text-gray-900 mb-4">Host Information</h3>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
                                        MC
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Michael Chen</p>
                                        <p className="text-sm text-gray-500">Verified Host</p>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Rating</span>
                                        <span className="font-medium text-gray-900">4.9 ⭐</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Completed Deals</span>
                                        <span className="font-medium text-gray-900">28</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Response Rate</span>
                                        <span className="font-medium text-gray-900">98%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Details */}
                            <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900">Payment Details</h3>
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                        Available
                                    </Badge>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500">Total Amount</p>
                                    <p className="text-3xl font-bold text-gray-900">$250</p>
                                </div>

                                <div className="flex gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                    <div className="w-5 h-5 rounded-full bg-teal-100 flex-shrink-0 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Payment will be released after approved the deal.
                                    </p>
                                </div>

                                <div className="pt-2 flex gap-3">
                                    <Link href={`/deals/${params.id}/negotiate`} className="flex-1">
                                        <Button variant="outline" className="w-full">
                                            Negotiate
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={handleApply}
                                        disabled={isSending}
                                        className="flex-1 bg-[#fc826f] text-white py-3 rounded-lg font-semibold"
                                    >
                                        {isSending ? "Sending..." : "Apply for Collaboration"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 relative animate-in fade-in zoom-in duration-300 text-center">
                        {/* Success Icon */}
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Sent Successfully!</h2>
                        <p className="text-gray-600 mb-6">
                            Your collaboration request has been sent to the Host.
                        </p>

                        <Button
                            onClick={() => setShowSuccessModal(false)}
                            className="w-full bg-white border border-gray-300 text-gray-900 font-semibold h-11 rounded-xl"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
