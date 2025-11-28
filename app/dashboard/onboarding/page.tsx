"use client";

import { useState } from "react";
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

export default function OnboardingPage() {
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const handleConnect = () => {
        setIsConnecting(true);
        // Simulate API call
        setTimeout(() => {
            setIsConnecting(false);
            setIsConnected(true);
        }, 2000);
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

                <Card>
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
                                {isConnected
                                    ? "Your Stripe account is connected and ready to receive payouts."
                                    : "Connect your Stripe account to start receiving payments automatically."}
                            </div>

                            {isConnected ? (
                                <Button
                                    variant="outline"
                                    className=""
                                >
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Connected
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
