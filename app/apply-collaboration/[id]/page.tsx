"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, ArrowRight, Building2, Calendar, Camera, Instagram, Video } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

export default function InfluencerCollaborationRequestPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [isSending, setIsSending] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [instagramPosts, setInstagramPosts] = useState(3);
    const [instagramStories, setInstagramStories] = useState(5);
    const [tiktokVideos, setTiktokVideos] = useState(2);

    // Mock host/deal data - in real app, fetch based on params.id
    const deal = {
        id: params.id,
        hostName: "Michael Chen",
        propertyName: "Beachfront Villa - Miami",
        role: "Host",
        avatar: "https://avatar.iran.liara.run/public/42",
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        // Simulate sending request
        setTimeout(() => {
            setIsSending(false);
            setShowSuccessModal(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-12">
                <div className="max-w-5xl mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <Link href={`/deals/${params.id}`}>
                            <div className="mb-5 flex justify-start items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
                                <ArrowLeft className="w-5 h-5" />
                                <p className="text-lg font-bold text-gray-900">Apply for Collaboration</p>
                            </div>
                        </Link>
                    </div>

                    {/* User Cards */}
                    <Card className="mb-8 border-gray-200 shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Avatar className="w-14 h-14 border-2 border-white shadow-md">
                                            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" />
                                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white font-semibold">
                                                {user?.fullName?.charAt(0).toUpperCase() || "S"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{user?.fullName || "Sarah Davis"}</p>
                                        <p className="text-xs text-gray-500 capitalize flex items-center gap-1">
                                            <Camera className="w-3 h-3" />
                                            {user?.role || "Influencer"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-5 h-5 text-teal-500" />
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Avatar className="w-14 h-14 border-2 border-white shadow-md">
                                            <AvatarImage src={deal.avatar} />
                                            <AvatarFallback className="bg-gradient-to-br from-teal-500 to-teal-600 text-white font-semibold">
                                                {deal.hostName.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{deal.hostName}</p>
                                        <p className="text-xs text-gray-500">{deal.role}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Property Info */}
                        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-5">
                                <Label className="text-sm font-semibold text-gray-700 mb-3 block flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-teal-600" />
                                    Property
                                </Label>
                                <p className="text-gray-900 font-medium">{deal.propertyName}</p>
                            </CardContent>
                        </Card>

                        {/* Dates */}
                        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-5 space-y-4">
                                <Label className="text-sm font-semibold text-gray-700 mb-3 block flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-teal-600" />
                                    Preferred Dates
                                </Label>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Check-in Date
                                    </Label>
                                    <Input
                                        type="date"
                                        required
                                        className="w-full h-11 border-gray-300"
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Check-out Date
                                    </Label>
                                    <Input
                                        type="date"
                                        required
                                        className="w-full h-11 border-gray-300"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Content Offering */}
                        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-5">
                                <Label className="text-sm font-semibold text-gray-700 mb-4 block flex items-center gap-2">
                                    <Camera className="w-4 h-4 text-teal-600" />
                                    Content I Will Create
                                </Label>

                                <div className="space-y-4">
                                    {/* Instagram Posts */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <Instagram className="w-4 h-4 text-pink-500" />
                                                Instagram Posts
                                            </Label>
                                            <span className="text-sm font-semibold text-gray-900">{instagramPosts}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="10"
                                            value={instagramPosts}
                                            onChange={(e) => setInstagramPosts(parseInt(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                                        />
                                    </div>

                                    {/* Instagram Stories */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <Instagram className="w-4 h-4 text-purple-500" />
                                                Instagram Stories
                                            </Label>
                                            <span className="text-sm font-semibold text-gray-900">{instagramStories}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="20"
                                            value={instagramStories}
                                            onChange={(e) => setInstagramStories(parseInt(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                                        />
                                    </div>

                                    {/* TikTok Videos */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <Video className="w-4 h-4 text-gray-900" />
                                                TikTok Videos
                                            </Label>
                                            <span className="text-sm font-semibold text-gray-900">{tiktokVideos}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="10"
                                            value={tiktokVideos}
                                            onChange={(e) => setTiktokVideos(parseInt(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Portfolio Links */}
                        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-5 space-y-4">
                                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                                    Portfolio & Social Media Links
                                </Label>

                                <div>
                                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Instagram Profile
                                    </Label>
                                    <Input
                                        type="url"
                                        placeholder="https://instagram.com/yourprofile"
                                        className="w-full h-11 border-gray-300"
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                        TikTok Profile
                                    </Label>
                                    <Input
                                        type="url"
                                        placeholder="https://tiktok.com/@yourprofile"
                                        className="w-full h-11 border-gray-300"
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Portfolio Website (Optional)
                                    </Label>
                                    <Input
                                        type="url"
                                        placeholder="https://yourportfolio.com"
                                        className="w-full h-11 border-gray-300"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Message to Host */}
                        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-5">
                                <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                                    Message to Host
                                </Label>
                                <Textarea
                                    required
                                    rows={6}
                                    placeholder="Introduce yourself and explain why you'd be a great fit for this collaboration..."
                                    className="resize-none border-gray-300"
                                />
                            </CardContent>
                        </Card>

                        {/* Submit Buttons */}
                        <div className="space-y-3 mt-5 flex justify-end gap-2">
                            <Button
                                type="submit"
                                className="w-1/4"
                                disabled={isSending}
                                variant="outline"
                            >
                                {isSending ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </span>
                                ) : (
                                    "Send Application"
                                )}
                            </Button>

                            <Link href={`/deals/${params.id}`} className="block">
                                <button
                                    type="button"
                                    className="w-full px-10 border-2 border-gray-300 text-gray-700 font-semibold h-9 rounded-md transition-all"
                                >
                                    Cancel
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
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
                                Your collaboration application has been sent to <span className="font-semibold text-gray-900">{deal.hostName}</span>. They will review your proposal and get back to you soon.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Button
                                onClick={() => router.push(`/deals/${params.id}`)}
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
