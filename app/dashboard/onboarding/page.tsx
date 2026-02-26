"use client";

import { useState, useEffect } from "react";
import { PageHeading } from "@/components/commom/pageHeading";
import { Button } from "@/components/ui/button";
import { CreditCard, CheckCircle2, Loader2 } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useCreateOnboardingMutation } from "@/Redux/api/onboarding/onboardingApi";
import { toast } from "sonner";

export default function OnboardingPage() {
    const [createOnboarding, { isLoading: isConnecting }] = useCreateOnboardingMutation();
    const [status, setStatus] = useState<"not_started" | "pending" | "active" | "verified">("not_started");

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const res = await createOnboarding(undefined).unwrap();
                if (res.success) {
                    if (res.status === "pending" || res.status === "active" || res.status === "verified") {
                        setStatus(res.status as any);
                    }
                }
            } catch (error) {
                // Silently fail on mount check
            }
        };
        checkStatus();
    }, [createOnboarding]);

    const handleConnect = async () => {
        try {
            const res = await createOnboarding(undefined).unwrap();

            if (res.success) {
                if (res.onboardingLink && res.status !== "verified" && res.status !== "active" && res.status !== "pending") {
                    toast.success("Redirecting to Stripe onboarding...");
                    window.location.href = res.onboardingLink;
                } else if (res.status === "pending") {
                    setStatus("pending");
                    toast.info(res.message || "Your verification is under review.");
                } else if (res.status === "active" || res.status === "verified") {
                    setStatus(res.status as any);
                    toast.success(res.message || "Stripe account connected successfully!");
                }
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to initiate onboarding. Please try again.");
        }
    };

    return (
        <div className="min-h-screen container mx-auto">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-5">
                <PageHeading title="Payment Onboarding" />
            </div>

            <div className="p-5 space-y-5">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
                    <h2 className="text-lg font-semibold text-primary mb-2">
                        Setup Payout Method
                    </h2>
                    <p className="text-black">
                        Connect your payout to complete payments.
                    </p>
                </div>

                <Card className="p-5">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">Stripe</CardTitle>
                                <CardDescription>
                                    Recommended for fastest payouts.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between mt-4">
                            <div className="text-sm text-gray-500">
                                {status === "verified" || status === "active"
                                    ? "Your Stripe account is connected and ready to receive payouts."
                                    : status === "pending"
                                        ? "Your Stripe account verification is under review."
                                        : "Connect your Stripe account to start receiving payments automatically."}
                            </div>

                            {status === "verified" || status === "active" ? (
                                <Button
                                    variant="outline"
                                    className="border-green-500 text-green-600 bg-white"
                                    disabled
                                >
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    {status === "verified" ? "Verified" : "Connected"}
                                </Button>
                            ) : status === "pending" ? (
                                <Button
                                    variant="outline"
                                    className="border-orange-500 text-orange-600 bg-white"
                                    disabled
                                >
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Pending Review
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleConnect}
                                    disabled={isConnecting}
                                    className="bg-primary text-white"
                                >
                                    {isConnecting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Connecting...
                                        </>
                                    ) : (
                                        "Connect Stripe"
                                    )}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
