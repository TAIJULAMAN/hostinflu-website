"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Copy,
    Check,
    ArrowLeft,
    Instagram,
    Facebook,
    Twitter,
    Linkedin,
    Send,
    Share2,
    ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { imgUrl } from "@/config/envConfig";
import { useShareProfileMutation } from "@/Redux/api/profileApi";

export default function ShareProfilePage() {
    const router = useRouter();
    const { user } = useSelector((state: any) => state.auth);
    const [shareProfile, { data: shareData }] = useShareProfileMutation();
    const [copied, setCopied] = useState(false);
    const [origin, setOrigin] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setOrigin(window.location.origin);
        }
        shareProfile({});
    }, [shareProfile]);

    const apiLink = shareData?.data?.shareableLinks?.web || "";

    const handleCopy = async () => {
        try {
            if (!apiLink) {
                toast.error("Link not ready yet");
                return;
            }
            await navigator.clipboard.writeText(apiLink);
            setCopied(true);
            toast.success("Profile link copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error("Failed to copy link");
        }
    };

    const qrCodeUrl = apiLink
        ? `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(apiLink)}&bgcolor=FFFFFF&color=000000&margin=2`
        : "";

    return (
        <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#FDFDFD]">
            <div className="max-w-2xl mx-auto px-4 py-8 space-y-10 relative">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-all active:scale-90"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="h-5 w-5 text-gray-700" />
                    </Button>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Share Profile</h1>
                    <div className="w-10 h-10" />
                </div>



                {/* Main Sharing Actions */}
                <div className="grid grid-cols-1 gap-6">
                    {/* Link Copy Card */}
                    <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-[2.5rem] bg-white/80 backdrop-blur-xl overflow-hidden group">
                        <CardContent className="p-8 md:p-10 space-y-6">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-gray-900">Direct Link</h3>
                                    <a
                                        href={apiLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-teal-600 text-sm font-semibold flex items-center gap-1 hover:underline"
                                    >
                                        View Public <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>
                                <div className="relative group/input">
                                    <Input
                                        readOnly
                                        value={apiLink}
                                        className="bg-[#F8F9FA] border-2 border-transparent group-hover/input:border-teal-100 h-16 px-6 text-gray-600 rounded-2xl focus-visible:ring-0 font-medium transition-all"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/0 to-teal-500/0 group-hover/input:from-teal-500/5 transition-all rounded-2xl pointer-events-none" />
                                </div>
                            </div>
                            <Button
                                onClick={handleCopy}
                                className="w-full h-16 bg-[#FA816F] hover:bg-[#F97361] text-white font-bold text-lg rounded-2xl gap-3 transition-all active:scale-[0.98] shadow-[0_10px_30px_rgba(250,129,111,0.3)] hover:shadow-[0_15px_35px_rgba(250,129,111,0.4)]"
                            >
                                {copied ? <Check className="h-6 w-6 animate-in zoom-in" /> : <Copy className="h-5 w-5" />}
                                {copied ? "Profile Link Copied!" : "Copy Link"}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* QR Code Section */}
                    <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-[2.5rem] bg-white overflow-hidden">
                        <CardContent className="p-8 md:p-10 space-y-8">
                            <div className="text-center space-y-1">
                                <h3 className="text-xl font-bold text-gray-900">Scan to View</h3>
                                <p className="text-sm text-gray-500">Perfect for business cards or live events</p>
                            </div>

                            <div className="flex justify-center">
                                <div className="relative p-8 bg-[#F8F9FA] rounded-[3rem] group">
                                    <div className="relative w-56 h-56 md:w-64 md:h-64 bg-white p-8 rounded-[2rem] shadow-sm transform transition-transform group-hover:scale-105 duration-500">
                                        <div className="w-full h-full relative">
                                            {qrCodeUrl && (
                                                <Image
                                                    src={qrCodeUrl}
                                                    alt="QR Code"
                                                    fill
                                                    className="object-contain"
                                                    unoptimized
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full border-2 border-gray-100 hover:border-teal-500 hover:text-teal-600 rounded-2xl h-14 font-bold transition-all"
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = qrCodeUrl;
                                    link.download = 'hostinflu-profile-qr.png';
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }}
                            >
                                Download QR Code
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
