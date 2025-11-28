"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Minus, Plus, Calendar as CalendarIcon, DollarSign, Check, X, Trash2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function NegotiateDealPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [isSending, setIsSending] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // --- Deliverables State ---
    const [platform, setPlatform] = useState("Instagram");
    const [contentType, setContentType] = useState("Post");
    const [quantity, setQuantity] = useState(1);
    const [deliverables, setDeliverables] = useState<{ platform: string; contentType: string; quantity: number }[]>([
        { platform: "Instagram", contentType: "Post", quantity: 1 },
        { platform: "Instagram", contentType: "Story", quantity: 2 }
    ]);

    const handleAddDeliverable = () => {
        setDeliverables([...deliverables, { platform, contentType, quantity }]);
        setQuantity(1); // Reset quantity
    };

    const handleRemoveDeliverable = (index: number) => {
        setDeliverables(deliverables.filter((_, i) => i !== index));
    };

    // --- Schedule State ---
    const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
    const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(new Date(new Date().setDate(new Date().getDate() + 3)));
    const [checkInTime, setCheckInTime] = useState("10:00 PM");
    const [checkOutTime, setCheckOutTime] = useState("10:00 PM");

    // --- Compensation State ---
    const [nightCreditsEnabled, setNightCreditsEnabled] = useState(true);
    const [nightsCount, setNightsCount] = useState(2);
    const [directPaymentEnabled, setDirectPaymentEnabled] = useState(true);
    const [paymentAmount, setPaymentAmount] = useState("250.00");

    // Mock deal data
    const deal = {
        id: params.id,
        propertyName: "Weekend Stay Deal – Villa Serenity",
        hostName: "Michael Chen",
        hostAvatar: "https://avatar.iran.liara.run/public/42",
    };

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
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
                <div className="max-w-3xl mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <Link href={`/deals/${params.id}`}>
                            <div className="mb-5 flex justify-start items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
                                <ArrowLeft className="w-5 h-5" />
                                <p className="text-lg font-bold text-gray-900">Back to Deal</p>
                            </div>
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Negotiate Terms</h1>
                        <p className="text-gray-600">Propose changes to the collaboration terms for <span className="font-semibold">{deal.propertyName}</span></p>
                    </div>

                    <form onSubmit={handleApply} className="space-y-8">

                        {/* 1. Deliverable Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-gray-900">Deliverable</h2>
                            <Card className="border-gray-200 shadow-sm">
                                <CardContent className="p-6 space-y-6">

                                    {/* Platform Selection */}
                                    <div className="space-y-3">
                                        <Label className="text-base font-medium text-gray-700">Select Platform</Label>
                                        <div className="flex flex-wrap gap-3">
                                            {["Instagram", "TikTok", "YouTube", "Facebook", "X (Twitter)"].map((p) => (
                                                <button
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setPlatform(p)}
                                                    className={cn(
                                                        "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                                                        platform === p
                                                            ? "border-teal-500 bg-teal-50 text-teal-700"
                                                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                                                    )}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Content Type */}
                                    <div className="space-y-3">
                                        <Label className="text-base font-medium text-gray-700">Content Type</Label>
                                        <Select value={contentType} onValueChange={setContentType}>
                                            <SelectTrigger className="w-[200px]">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Post">Post</SelectItem>
                                                <SelectItem value="Story">Story</SelectItem>
                                                <SelectItem value="Reel">Reel</SelectItem>
                                                <SelectItem value="Video">Video</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-sm text-gray-500">Choose what kind of content the influencer should create.</p>
                                    </div>

                                    {/* Quantity */}
                                    <div className="space-y-3">
                                        <Label className="text-base font-medium text-gray-700">How many contents should they create?</Label>
                                        <div className="flex items-center gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-10 h-10 rounded-lg bg-teal-500 text-white flex items-center justify-center hover:bg-teal-600 transition-all shadow-sm"
                                            >
                                                <Minus className="w-5 h-5" />
                                            </button>
                                            <span className="text-xl font-bold text-gray-900 w-8 text-center">{quantity}</span>
                                            <button
                                                type="button"
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="w-10 h-10 rounded-lg bg-teal-500 text-white flex items-center justify-center hover:bg-teal-600 transition-all shadow-sm"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-500">e.g., 2 Reels + 1 Story</p>
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <Button
                                            type="button"
                                            onClick={handleAddDeliverable}
                                            className="bg-teal-400 hover:bg-teal-500 text-white font-medium px-6"
                                        >
                                            Add Deliverable
                                        </Button>
                                    </div>

                                    {/* Added Deliverables List */}
                                    {deliverables.length > 0 && (
                                        <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                                            <h3 className="text-sm font-semibold text-gray-900">Added Deliverables:</h3>
                                            <div className="grid gap-3">
                                                {deliverables.map((item, index) => (
                                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-200 text-gray-500">
                                                                <Check className="w-4 h-4" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-gray-900">{item.quantity} {item.contentType}{item.quantity > 1 ? 's' : ''}</p>
                                                                <p className="text-xs text-gray-500">{item.platform}</p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveDeliverable(index)}
                                                            className="text-red-500 hover:text-red-700 p-2"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </CardContent>
                            </Card>
                        </div>

                        {/* 2. Schedule Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-gray-900">Schedule</h2>
                            <Card className="border-gray-200 shadow-sm">
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Check-in */}
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Check-in time</Label>
                                                <Select value={checkInTime} onValueChange={setCheckInTime}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select time" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="10:00 PM">10:00 PM</SelectItem>
                                                        <SelectItem value="11:00 PM">11:00 PM</SelectItem>
                                                        <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Check-in date</Label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !checkInDate && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {checkInDate ? format(checkInDate, "PPP") : <span>Pick a date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            selected={checkInDate}
                                                            onSelect={setCheckInDate}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </div>

                                        {/* Check-out */}
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Check-out time</Label>
                                                <Select value={checkOutTime} onValueChange={setCheckOutTime}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select time" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="10:00 PM">10:00 PM</SelectItem>
                                                        <SelectItem value="11:00 PM">11:00 PM</SelectItem>
                                                        <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Check-out date</Label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !checkOutDate && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {checkOutDate ? format(checkOutDate, "PPP") : <span>Pick a date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            selected={checkOutDate}
                                                            onSelect={setCheckOutDate}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* 3. Compensation Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-gray-900">Compensation</h2>
                            <Card className="border-gray-200 shadow-sm">
                                <CardContent className="p-6 space-y-6">

                                    {/* Night Credits */}
                                    <div className={cn(
                                        "border rounded-xl p-5 transition-all",
                                        nightCreditsEnabled ? "border-teal-500 bg-white" : "border-gray-200 bg-gray-50"
                                    )}>
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg">Night Credits</h3>
                                                <p className="text-sm text-gray-500">Offer free nights at your property as compensation.</p>
                                            </div>
                                            <div
                                                onClick={() => setNightCreditsEnabled(!nightCreditsEnabled)}
                                                className={cn(
                                                    "w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-colors",
                                                    nightCreditsEnabled ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-400"
                                                )}
                                            >
                                                <Check className="w-4 h-4" />
                                            </div>
                                        </div>

                                        {nightCreditsEnabled && (
                                            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                                <Label className="text-base font-medium text-gray-700">Number of Nights</Label>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => setNightsCount(Math.max(1, nightsCount - 1))}
                                                        className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="text-lg font-bold text-gray-900 w-6 text-center">{nightsCount}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => setNightsCount(nightsCount + 1)}
                                                        className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <span className="text-sm text-gray-500">nights</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Direct Payment */}
                                    <div className={cn(
                                        "border rounded-xl p-5 transition-all",
                                        directPaymentEnabled ? "border-teal-500 bg-white" : "border-gray-200 bg-gray-50"
                                    )}>
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                    <DollarSign className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 text-lg">Direct Payment</h3>
                                                    <p className="text-sm text-gray-500">Pay the influencer a monetary amount.</p>
                                                </div>
                                            </div>
                                            <div
                                                onClick={() => setDirectPaymentEnabled(!directPaymentEnabled)}
                                                className={cn(
                                                    "w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-colors",
                                                    directPaymentEnabled ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-400"
                                                )}
                                            >
                                                <Check className="w-4 h-4" />
                                            </div>
                                        </div>

                                        {directPaymentEnabled && (
                                            <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                                                <Label className="text-sm font-medium text-gray-700 mb-2 block">Payment Amount</Label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                                    <Input
                                                        type="number"
                                                        value={paymentAmount}
                                                        onChange={(e) => setPaymentAmount(e.target.value)}
                                                        className="pl-7"
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </CardContent>
                            </Card>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={isSending}
                                className="w-full bg-[#fc826f] hover:bg-[#fc826f]/90 text-white h-14 text-lg rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                            >
                                {isSending ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Sending Proposal...
                                    </span>
                                ) : (
                                    "Apply for Collaboration"
                                )}
                            </Button>
                        </div>
                    </form>
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
                            onClick={() => router.push(`/deals/${params.id}`)}
                            className="w-full bg-white border border-gray-300 text-gray-900 font-semibold h-11 rounded-xl hover:bg-gray-50"
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
