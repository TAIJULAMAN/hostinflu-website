"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CompensationSectionProps {
    compensationTypes: string[];
    setCompensationTypes: React.Dispatch<React.SetStateAction<string[]>>;
    availableNights: number;
    nightCount: number;
    setNightCount: (count: number) => void;
    paymentAmount: string;
    setPaymentAmount: (amount: string) => void;
    guestCount: number;
    setGuestCount: (count: number) => void;
}

export const CompensationSection = ({
    compensationTypes,
    setCompensationTypes,
    availableNights,
    nightCount,
    setNightCount,
    paymentAmount,
    setPaymentAmount,
    guestCount,
    setGuestCount,
}: CompensationSectionProps) => {
    return (
        <section>
            <Label className="text-lg font-semibold text-gray-900 mb-5">
                Compensation
            </Label>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-lg">
                <div className="space-y-4">
                    {/* Night Stay */}
                    <div
                        className={cn(
                            "border rounded-xl p-4 cursor-pointer transition-all",
                            compensationTypes.includes("nights")
                                ? "border-teal-500 bg-teal-50/30 ring-1 ring-teal-500"
                                : "border-gray-200 hover:border-gray-300"
                        )}
                        onClick={() => {
                            if (availableNights === 0) {
                                toast.error("Influencer has no night credits available");
                                return;
                            }
                            setCompensationTypes((prev) =>
                                prev.includes("nights")
                                    ? prev.filter((t) => t !== "nights")
                                    : [...prev, "nights"]
                            );
                        }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        Night Stay
                                    </h3>
                                    <p className="text-xs text-red-500">
                                        {availableNights > 0
                                            ? `Influencer has ${availableNights} night credits available.`
                                            : "Influencer has no night credits available."}
                                    </p>
                                </div>
                            </div>
                            {compensationTypes.includes("nights") && (
                                <div className="h-5 w-5 rounded-full bg-teal-500 flex items-center justify-center">
                                    <Check className="h-3 w-3 text-white" />
                                </div>
                            )}
                        </div>

                        {compensationTypes.includes("nights") && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200 mt-4">
                                <label className="text-sm font-medium text-gray-700">
                                    Number of Nights
                                </label>
                                <div className="flex items-center space-x-3">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 bg-white"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setNightCount(Math.max(1, nightCount - 1));
                                        }}
                                    >
                                        <Minus className="h-3 w-3 text-black" />
                                    </Button>
                                    <span className="w-8 text-black text-center text-sm font-medium">
                                        {nightCount}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 bg-white"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (availableNights > 0 && nightCount >= availableNights) {
                                                toast.error(`Host only has ${availableNights} night credits available`);
                                                return;
                                            }
                                            setNightCount(nightCount + 1);
                                        }}
                                    >
                                        <Plus className="h-3 w-3 text-black" />
                                    </Button>
                                    <span className="text-xs text-gray-400 ml-2">nights</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Direct Payment */}
                    <div
                        className={cn(
                            "border rounded-xl p-4 cursor-pointer transition-all",
                            compensationTypes.includes("payment")
                                ? "border-teal-500 bg-teal-50/30 ring-1 ring-teal-500"
                                : "border-gray-200 hover:border-gray-300"
                        )}
                        onClick={() => {
                            setCompensationTypes((prev) =>
                                prev.includes("payment")
                                    ? prev.filter((t) => t !== "payment")
                                    : [...prev, "payment"]
                            );
                        }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">💲</span>
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        Direct Payment
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        Pay the influencer a monetary amount.
                                    </p>
                                </div>
                            </div>
                            {compensationTypes.includes("payment") && (
                                <div className="h-5 w-5 rounded-full bg-teal-500 flex items-center justify-center">
                                    <Check className="h-3 w-3 text-white" />
                                </div>
                            )}
                        </div>

                        {compensationTypes.includes("payment") && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                <label className="text-sm font-medium text-gray-700">
                                    Payment Amount
                                </label>
                                <Input
                                    value={paymentAmount}
                                    onChange={(e) => setPaymentAmount(e.target.value)}
                                    placeholder="$0.00"
                                    className="bg-white"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        )}
                    </div>

                    {/* Number of Guests */}
                    <div
                        className={cn(
                            "border rounded-xl p-4 cursor-pointer transition-all",
                            availableNights === 0 ? "cursor-not-allowed bg-gray-50" : (compensationTypes.includes("guests")
                                ? "border-teal-500 bg-teal-50/30 ring-1 ring-teal-500"
                                : "border-gray-200 hover:border-gray-300")
                        )}
                        onClick={() => {
                            if (availableNights === 0) return;
                            setCompensationTypes((prev) =>
                                prev.includes("guests")
                                    ? prev.filter((t) => t !== "guests")
                                    : [...prev, "guests"]
                            );
                        }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">👥</span>
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        Number of Guests
                                    </h3>
                                    <p className={cn("text-xs", availableNights === 0 ? "text-red-500" : "text-gray-500")}>
                                        {availableNights > 0
                                            ? "Specify the total number of people staying."
                                            : "Influencer has no night credits available."}
                                    </p>
                                </div>
                            </div>
                            {compensationTypes.includes("guests") && availableNights > 0 && (
                                <div className="h-5 w-5 rounded-full bg-teal-500 flex items-center justify-center">
                                    <Check className="h-3 w-3 text-white" />
                                </div>
                            )}
                        </div>

                        {compensationTypes.includes("guests") && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200 mt-4">
                                <label className="text-sm font-medium text-gray-700">
                                    Number of Guests
                                </label>
                                <div className="flex items-center space-x-3">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 bg-white"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setGuestCount(Math.max(1, guestCount - 1));
                                        }}
                                    >
                                        <Minus className="h-3 w-3 text-black" />
                                    </Button>
                                    <span className="w-8 text-black text-center text-sm font-medium">
                                        {guestCount}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 bg-white"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setGuestCount(guestCount + 1);
                                        }}
                                    >
                                        <Plus className="h-3 w-3 text-black" />
                                    </Button>
                                    <span className="text-xs text-gray-400 ml-2">guests</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
