"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Minus, Plus, ArrowRight, Building2, Calendar, DollarSign } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

export default function CollaborationRequestPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [isSending, setIsSending] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [nights, setNights] = useState(2);
    const [includeFreeStay, setIncludeFreeStay] = useState(true);
    const [offerAmount, setOfferAmount] = useState("");

    // Mock influencer data - in real app, fetch based on params.id
    const influencer = {
        id: params.id,
        name: "Sarah Davis",
        role: "Influencer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
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
        <div className="min-h-screen  flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-12">
                <div className="max-w-5xl mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <Link href={`/influencers/${params.id}`}>
                            <div className="mb-5 flex justify-start items-center gap-2">
                                <ArrowLeft className="w-5 h-5" />
                                <p className="text-lg font-bold text-gray-900">Send Collaboration</p>
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
                                            <AvatarImage src="https://avatar.iran.liara.run/public/42" />
                                            <AvatarFallback className="bg-gradient-to-br from-teal-500 to-teal-600 text-white font-semibold">
                                                {user?.fullName?.charAt(0).toUpperCase() || "M"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{user?.fullName || "Michael Chen"}</p>
                                        <p className="text-xs text-gray-500 capitalize flex items-center gap-1">
                                            <Building2 className="w-3 h-3" />
                                            {user?.role || "Host"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-5 h-5 text-teal-500" />
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Avatar className="w-14 h-14 border-2 border-white shadow-md">
                                            <AvatarImage src={influencer.avatar} />
                                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white font-semibold">
                                                {influencer.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{influencer.name}</p>
                                        <p className="text-xs text-gray-500">{influencer.role}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Select Deal */}
                        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-5">
                                <Label className="text-sm font-semibold text-gray-700 mb-3 block flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-teal-600" />
                                    Select Deal Package
                                </Label>
                                <Select required>
                                    <SelectTrigger className="w-full h-11 border-gray-300">
                                        <SelectValue placeholder="Choose a deal package" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="miami">Weekend Getaway – Miami</SelectItem>
                                        <SelectItem value="malibu">Week-long Stay – Malibu</SelectItem>
                                        <SelectItem value="dubai">Luxury Experience – Dubai</SelectItem>
                                    </SelectContent>
                                </Select>
                            </CardContent>
                        </Card>

                        {/* Offers & Free Stay */}
                        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-5 space-y-4">
                                <div>
                                    <Label className="text-sm font-semibold text-gray-700 mb-3 block flex items-center gap-2">
                                        <DollarSign className="w-4 h-4 text-teal-600" />
                                        Cash Offer
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                        <Input
                                            type="number"
                                            value={offerAmount}
                                            onChange={(e) => setOfferAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="pl-8 h-11 border-gray-300 text-lg"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-100">
                                    <div>
                                        <Label className="text-sm font-semibold text-gray-900">Include Free Stay?</Label>
                                        <p className="text-xs text-gray-600 mt-0.5">Offer complimentary accommodation</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIncludeFreeStay(!includeFreeStay)}
                                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors shadow-inner ${includeFreeStay ? "bg-gradient-to-r from-teal-500 to-teal-600" : "bg-gray-300"
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${includeFreeStay ? "translate-x-6" : "translate-x-1"
                                                }`}
                                        />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Number of Nights - Only visible when free stay is included */}
                        {includeFreeStay && (
                            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-5">
                                    <Label className="text-sm font-semibold text-gray-700 mb-4 block text-center">
                                        Number of Nights
                                    </Label>
                                    <div className="flex items-center justify-center gap-6">
                                        <button
                                            type="button"
                                            onClick={() => setNights(Math.max(1, nights - 1))}
                                            className="w-12 h-12 rounded-xl border-2 border-gray-300 flex items-center justify-center hover:bg-teal-50 hover:border-teal-500 transition-all shadow-sm"
                                        >
                                            <Minus className="w-5 h-5 text-gray-700" />
                                        </button>
                                        <div className="text-center min-w-[80px]">
                                            <div className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                                                {nights}
                                            </div>
                                            <div className="text-sm text-gray-500 font-medium mt-1">nights</div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setNights(nights + 1)}
                                            className="w-12 h-12 rounded-xl border-2 border-gray-300 flex items-center justify-center hover:bg-teal-50 hover:border-teal-500 transition-all shadow-sm"
                                        >
                                            <Plus className="w-5 h-5 text-gray-700" />
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Dates */}
                        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-5 space-y-4">
                                <div>
                                    <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                                        Check-in Date
                                    </Label>
                                    <Input
                                        type="date"
                                        required
                                        className="w-full h-11 border-gray-300"
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm font-semibold text-gray-700 mb-2 block">
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
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Sending Request...
                                    </span>
                                ) : (
                                    "Send Collaboration Request"
                                )}
                            </Button>

                            <Link href={`/influencers/${params.id}`} className="block">
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
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Request Sent Successfully!</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Your collaboration request has been sent to <span className="font-semibold text-gray-900">{influencer.name}</span>. They will review your proposal and get back to you soon.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Button
                                onClick={() => router.push(`/influencers/${params.id}`)}
                                variant="outline"
                                className="w-full"
                            >
                                Back to Profile
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
