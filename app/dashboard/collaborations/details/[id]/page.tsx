"use client";

import {
    Calendar,
    MapPin,
    DollarSign,
    CheckCircle2,
    ExternalLink,
    Camera,
    Music,
    Hash,
    Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PageHeading } from "@/components/commom/pageHeading";

export default function CollaborationDetailsPage() {
    const status: string = "completed"; // Mock status: "active" | "pending" | "completed" | "requesting"

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="top-0 bg-white border-b border-gray-200 p-5 flex items-center justify-between">
                <PageHeading title="Collaboration Overview" />
                <Badge
                    className={`
                        ${status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                        ${status === 'pending' ? 'bg-gray-100 text-gray-700 hover:bg-gray-100' : ''}
                        ${status === 'completed' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' : ''}
                        ${status === 'requesting' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' : ''}
                    `}
                >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
            </div>

            {/* Main Content */}
            <div className="mx-auto p-6 space-y-6">
                {/* Deal Title & Status */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Weekend Stay Collaboration – Villa Serenity
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                            Created on 15 Nov 2025
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500">Collaboration ID: #COLLAB1234</span>
                    </div>
                </div>

                {/* Collaborators */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Avatar className="w-12 h-12 border-2 border-teal-500">
                                    <AvatarImage src="https://avatar.iran.liara.run/public/43" />
                                    <AvatarFallback>MC</AvatarFallback>
                                </Avatar>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Michael Chen</p>
                                <p className="text-sm text-gray-500">Host</p>
                            </div>
                        </div>
                        <div className="text-teal-500 text-2xl">↔</div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">Sarah Davis</p>
                                <p className="text-sm text-gray-500">Influencer</p>
                            </div>
                            <Avatar className="w-12 h-12 border-2 border-teal-500">
                                <AvatarImage src="https://avatar.iran.liara.run/public/44" />
                                <AvatarFallback>SD</AvatarFallback>
                            </Avatar>
                        </div>
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

                        {/* Campaign Details */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <h3 className="font-semibold text-gray-900 mb-3">
                                Campaign Progress
                            </h3>
                            <div className="space-y-6">
                                {[
                                    {
                                        icon: <DollarSign className="w-5 h-5" />,
                                        title: "Budget Approved",
                                        status: "completed",
                                        date: "Oct 15, 2025",
                                        description: "Budget of $2,500.00 has been approved",
                                    },
                                    {
                                        icon: <Calendar className="w-5 h-5" />,
                                        title: "Content Creation",
                                        status: "completed",
                                        date: "Starts Nov 1, 2026",
                                        description: "Content will be created by the influencer",
                                    },
                                    {
                                        icon: <CheckCircle2 className="w-5 h-5" />,
                                        title: "Content Review",
                                        status: "pending",
                                        date: "Scheduled",
                                        description: "Pending content submission for review",
                                    },
                                    {
                                        icon: <MapPin className="w-5 h-5" />,
                                        title: "Campaign Live",
                                        status: "pending",
                                        date: "Scheduled",
                                        description: "Campaign will go live after approval",
                                    },
                                ].map((step, index) => (
                                    <div key={index} className="flex gap-4 relative">
                                        {/* Timeline line */}
                                        {index > 0 && (
                                            <div className="absolute left-[11px] top-0 w-px h-full bg-gray-200 -translate-y-full"></div>
                                        )}

                                        {/* Status indicator */}
                                        <div
                                            className={`relative z-10 flex-shrink-0 w-[50px] h-[50px] rounded flex items-center justify-center ${step.status === "completed"
                                                ? "bg-teal-100 text-teal-600"
                                                : "bg-gray-100 text-gray-400"
                                                }`}
                                        >
                                            {step.status === "completed" && (
                                                <CheckCircle2 className="w-8 h-8" />
                                            )}
                                            {step.status !== "completed" && step.icon}
                                        </div>

                                        {/* Step content */}
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium text-gray-900">
                                                    {step.title}
                                                </h4>
                                                <span
                                                    className={`text-sm ${step.status === "completed"
                                                        ? "text-teal-600"
                                                        : "text-gray-500"
                                                        }`}
                                                >
                                                    {step.date}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                        {/* Assigned Contents */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-900">
                                    Assigned Contents
                                </h3>
                                <Badge
                                    variant="outline"
                                    className="bg-green-100 text-green-700"
                                >
                                    2 / 3 Submitted
                                </Badge>
                            </div>

                            <div className="space-y-3">
                                {[
                                    {
                                        emoji: <Camera className="w-6 h-6" />,
                                        title: "1 Instagram Reel showcasing the property exterior",
                                        status: "submitted",
                                        platform: "Instagram",
                                    },
                                    {
                                        emoji: <Music className="w-6 h-6" />,
                                        title: "1 TikTok video highlighting guest experience",
                                        status: "submitted",
                                        platform: "TikTok",
                                    },
                                    {
                                        emoji: <Hash className="w-6 h-6" />,
                                        title: "Tag @HostProfile and use #HostInfoCollab",
                                        status: "pending",
                                        platform: "Social Media",
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-start gap-3 p-3 rounded-xl ${item.status === "submitted"
                                            ? "bg-green-50 border border-green-100"
                                            : "bg-gray-100 border border-gray-300"
                                            }`}
                                    >
                                        <div
                                            className={`w-12 h-12 rounded flex items-center justify-center text-sm font-bold ${item.platform === "Instagram"
                                                ? "bg-green-100 border border-green-300 text-green-700"
                                                : item.platform === "TikTok"
                                                    ? "bg-green-100 border border-green-300 text-green-700"
                                                    : "bg-gray-100 border border-gray-300 text-gray-700"
                                                }`}
                                        >
                                            {item.emoji}
                                        </div>
                                        <div className="">
                                            <p className="font-medium text-gray-900">{item.title}</p>
                                            <Badge
                                                className={`mt-1 text-xs gap-1 ${item.status === "submitted"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {item.status === "submitted" ? (
                                                    <>Submitted</>
                                                ) : (
                                                    <>Pending</>
                                                )}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Video Links */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <p className="font-semibold text-gray-900 mb-3">Video Links</p>
                            <div className="space-y-2">
                                {[
                                    {
                                        platform: "YouTube",
                                        icon: <Youtube className="w-6 h-6" />,
                                        title: "YouTube Video",
                                        url: "youtube.com/watch?v=abc123",
                                    },
                                    {
                                        platform: "TikTok",
                                        icon: <Music className="w-6 h-6" />,
                                        title: "TikTok Video",
                                        url: "tiktok.com/watch?v=abc123",
                                    },
                                    {
                                        platform: "Instagram",
                                        icon: <Camera className="w-6 h-6" />,
                                        title: "Instagram Reel",
                                        url: "instagram.com/watch?v=abc123",
                                    },
                                ].map((video, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`w-12 h-12 rounded flex items-center justify-center text-sm font-bold ${video.platform === "YouTube"
                                                    ? "bg-gray-100 border border-gray-300 text-gray-700"
                                                    : video.platform === "TikTok"
                                                        ? "bg-gray-100 border border-gray-300 text-gray-700"
                                                        : "bg-gray-100 border border-gray-300 text-gray-700"
                                                    }`}
                                            >
                                                {video.icon}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {video.title}
                                                </p>
                                                <p className="text-xs text-gray-500">{video.url}</p>
                                            </div>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-gray-400" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Payment Details */}
                        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-gray-900">Payment Details</h3>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm text-gray-500">Total Amount</p>
                                <p className="text-3xl font-bold text-gray-900">$2,500.00</p>
                            </div>

                            <div className="flex gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <div className="w-5 h-5 rounded-full bg-teal-100 flex-shrink-0 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Payment will be released automatically after all deliverables
                                    are approved.
                                </p>
                            </div>

                            <div className="pt-2">
                                {status === "completed" || status === "active" ? (
                                    <div className="w-full bg-green-100 text-green-700 py-3 rounded-lg font-semibold text-center">
                                        Payment completed
                                    </div>
                                ) : (
                                    <Button className="w-full bg-primary text-white py-3 rounded-lg font-semibold">
                                        Release Payment
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
