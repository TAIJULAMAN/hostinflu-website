"use client";

import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateReferralCodeMutation } from "@/Redux/api/refearl/refearlApi";
import Loader from "@/components/commom/loader";

export default function ReferralsPage() {
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const [createReferralCode, { data, isLoading }] = useCreateReferralCodeMutation();

    useEffect(() => {
        createReferralCode(undefined);
    }, [createReferralCode]);

    const referralCode = data?.data?.referralCode || "";
    const referralLink = referralCode ? `https://app.hostinflu.com/join?ref=${referralCode}` : "";

    const handleCopy = () => {
        if (!referralLink) {
            toast.error("Referral link not generated yet");
            return;
        }
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        toast.success("Referral link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="max-w-md mx-auto min-h-full pb-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative">
                <button
                    onClick={() => router.back()}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors absolute left-4"
                >
                    <ArrowLeft className="h-6 w-6 text-gray-700" />
                </button>
                <h1 className="text-xl font-bold text-gray-900 w-full text-center">Referrals</h1>
            </div>

            <div className="space-y-6">
                {/* Your Referral Link Card */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Your Referral Link</h2>
                    <p className="text-gray-500 text-sm mb-6">Share this link to earn rewards</p>

                    <div className="bg-gray-50 p-4 rounded-xl mb-6 break-all text-gray-600 text-sm border border-gray-100 min-h-[52px] flex items-center justify-center">
                        {referralLink || "Generating link..."}
                    </div>

                    <Button
                        onClick={handleCopy}
                        className="w-full bg-[#FF8A71] hover:bg-[#ff7a5c] text-white py-6 rounded-2xl text-lg font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                    >
                        {copied ? (
                            <>
                                <Check className="h-5 w-5" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="h-5 w-5 rotate-[-90deg]" />
                                Copy Link
                            </>
                        )}
                    </Button>
                </div>

                {/* QR Code Card */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 px-2">QR Code</h2>

                    <div className="bg-gray-50 p-6 rounded-[2.5rem] flex items-center justify-center border border-gray-100 min-h-[240px]">
                        {referralLink ? (
                            <div className="bg-white p-4 rounded-2xl shadow-sm">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(referralLink)}`}
                                    alt="Referral QR Code"
                                    className="w-48 h-48 lg:w-56 lg:h-56"
                                />
                            </div>
                        ) : (
                            <p className="text-gray-400">Generating QR Code...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
