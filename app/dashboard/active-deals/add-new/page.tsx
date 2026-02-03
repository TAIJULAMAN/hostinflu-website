"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Minus, Plus, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { PageHeading } from "@/components/commom/pageHeading";
import Link from "next/link";
import { useMyVerifiedListingsQuery } from "@/Redux/api/host/list/listApi";
import { useCreateDealMutation } from "@/Redux/api/host/deals/dealsApi";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function AddDealPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [createDeal, { isLoading: isCreating }] = useCreateDealMutation();
    const { data: listsData } = useMyVerifiedListingsQuery(undefined);
    const listings = listsData?.data?.listings || [];

    // Form State
    const [listingId, setListingId] = useState("");
    const [description, setDescription] = useState("");
    const [airbnbLink, setAirbnbLink] = useState("");
    const [guestCount, setGuestCount] = useState(2);

    // Schedule
    const [checkInDate, setCheckInDate] = useState<Date>();
    const [checkInTime, setCheckInTime] = useState("14:00");
    const [checkOutDate, setCheckOutDate] = useState<Date>();
    const [checkOutTime, setCheckOutTime] = useState("11:00");

    // Compensation
    const [compensationTypes, setCompensationTypes] = useState<string[]>(["nights", "payment"]);
    const [nightCount, setNightCount] = useState(4);
    const [paymentAmount, setPaymentAmount] = useState("");

    // Deliverables
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>("Instagram");
    const [contentType, setContentType] = useState<string>("Post");
    const [contentCount, setContentCount] = useState(1);
    const [followerCount, setFollowerCount] = useState("");
    const [addedDeliverables, setAddedDeliverables] = useState<any[]>([]);

    const handleAddDeliverable = () => {
        if (selectedPlatform && contentType && contentCount > 0 && followerCount) {
            const newDeliverable = {
                platform: selectedPlatform,
                contentType,
                quantity: contentCount,
                platformFollowers: {
                    [selectedPlatform]: followerCount
                }
            };
            setAddedDeliverables([...addedDeliverables, newDeliverable]);
            setFollowerCount("");
        } else {
            toast({
                title: "Error",
                description: "Please fill all deliverable fields including followers count.",
                variant: "destructive",
            });
        }
    };

    const handleRemoveDeliverable = (index: number) => {
        setAddedDeliverables((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!listingId || !description || !checkInDate || !checkOutDate) {
            toast({
                title: "Error",
                description: "Please fill in all required fields (Listing, Description, Dates).",
                variant: "destructive",
            });
            return;
        }

        const combineDate = (date: Date, time: string) => {
            const [hours, minutes] = time.split(':').map(Number);
            const newDate = new Date(date);
            newDate.setHours(hours);
            newDate.setMinutes(minutes);
            return newDate.toISOString();
        };

        const payload = {
            title: listingId,
            description,
            addAirbnbLink: airbnbLink,
            inTimeAndDate: combineDate(checkInDate, checkInTime),
            outTimeAndDate: combineDate(checkOutDate, checkOutTime),
            guestCount: Number(guestCount),
            compensation: {
                nightCredits: compensationTypes.includes("nights"),
                numberOfNights: compensationTypes.includes("nights") ? nightCount : 0,
                directPayment: compensationTypes.includes("payment"),
                paymentAmount: compensationTypes.includes("payment") ? Number(paymentAmount) : 0
            },
            deliverables: addedDeliverables
        };

        try {
            await createDeal(payload).unwrap();
            toast({
                title: "Success",
                description: "Deal created successfully!",
            });
            router.push("/dashboard/active-deals");
        } catch (err: any) {
            toast({
                title: "Error",
                description: err?.data?.message || "Failed to create deal",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="container mx-auto pb-20">
            <div className="mb-10 text-center">
                <PageHeading title="Create a New Deal" />
            </div>

            <div className="space-y-5">
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-full space-y-5">
                        <section>
                            {/* Deal Basics */}
                            <Label className="text-lg font-semibold text-gray-900 mb-5">
                                Deal Basics
                            </Label>
                            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-lg">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Select Listing
                                        </label>
                                        <Select value={listingId} onValueChange={setListingId}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose which Listing this deal is for" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {listings.map((list: any) => (
                                                    <SelectItem key={list._id} value={list._id}>
                                                        {list.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <Textarea
                                            placeholder="Describe what you expect from the influencer..."
                                            className="min-h-[100px]"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Add your Airbnb Link
                                        </label>
                                        <Input
                                            placeholder="Paste your Airbnb listing URL below"
                                            value={airbnbLink}
                                            onChange={(e) => setAirbnbLink(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Guest Count
                                        </label>
                                        <Input
                                            type="number"
                                            min={1}
                                            value={guestCount}
                                            onChange={(e) => setGuestCount(Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            {/* Schedule */}
                            <Label className="text-lg font-semibold text-gray-900 mb-5">
                                Schedule
                            </Label>
                            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Check-in time
                                        </label>
                                        <Select value={checkInTime} onValueChange={setCheckInTime}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Time" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="12:00">12:00 PM</SelectItem>
                                                <SelectItem value="13:00">01:00 PM</SelectItem>
                                                <SelectItem value="14:00">02:00 PM</SelectItem>
                                                <SelectItem value="15:00">03:00 PM</SelectItem>
                                                <SelectItem value="16:00">04:00 PM</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Check-in date
                                        </label>
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
                                                    {checkInDate ? (
                                                        format(checkInDate, "PPP")
                                                    ) : (
                                                        <span>mm/dd/yyyy</span>
                                                    )}
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

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Check-out time
                                        </label>
                                        <Select value={checkOutTime} onValueChange={setCheckOutTime}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Time" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                                <SelectItem value="11:00">11:00 AM</SelectItem>
                                                <SelectItem value="12:00">12:00 PM</SelectItem>
                                                <SelectItem value="13:00">01:00 PM</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Check-out date
                                        </label>
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
                                                    {checkOutDate ? (
                                                        format(checkOutDate, "PPP")
                                                    ) : (
                                                        <span>mm/dd/yyyy</span>
                                                    )}
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
                        </section>
                        <section>
                            {/* Compensation */}
                            <Label className="text-lg font-semibold text-gray-900 mb-5">
                                Compensation
                            </Label>
                            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-lg">
                                <div className="space-y-4">
                                    <div
                                        className={cn(
                                            "border rounded-xl p-4 cursor-pointer transition-all",
                                            compensationTypes.includes("nights")
                                                ? "border-teal-500 bg-teal-50/30 ring-1 ring-teal-500"
                                                : "border-gray-200 hover:border-gray-300"
                                        )}
                                        onClick={() => {
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
                                                        Night Credits
                                                    </h3>
                                                    <p className="text-xs text-gray-500">
                                                        Offer free nights at your property.
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
                                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200 onClick={e => e.stopPropagation()}">
                                                <label className="text-sm font-medium text-gray-700">
                                                    Number of Nights
                                                </label>
                                                <div className="flex items-center space-x-3" onClick={(e) => e.stopPropagation()}>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 bg-white"
                                                        onClick={(e) => {
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
                                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200" onClick={(e) => e.stopPropagation()}>
                                                <label className="text-sm font-medium text-gray-700">
                                                    Payment Amount ($)
                                                </label>
                                                <Input
                                                    type="number"
                                                    placeholder="0.00"
                                                    className="bg-white"
                                                    value={paymentAmount}
                                                    onChange={(e) => setPaymentAmount(e.target.value)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <section className="w-full">
                        {/* Deliverable */}
                        <Label className="text-lg font-semibold text-gray-900 mb-5">
                            Deliverable
                        </Label>
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-lg mt-5">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Select Platform
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {["Instagram", "TikTok", "YouTube", "Facebook", "X"].map(
                                            (platform) => (
                                                <Button
                                                    key={platform}
                                                    variant="outline"
                                                    className={cn(
                                                        "gap-2 font-normal hover:text-gray-900 hover:border-gray-300 transition-colors",
                                                        selectedPlatform === platform
                                                            ? "bg-[#10B981CC] text-white hover:bg-[#10B981CC]/90 hover:text-white border-transparent"
                                                            : "text-gray-600 bg-white"
                                                    )}
                                                    onClick={() => setSelectedPlatform(platform)}
                                                >
                                                    {platform}
                                                </Button>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Content Type
                                    </label>
                                    <Select value={contentType} onValueChange={setContentType}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select content type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Post">Post</SelectItem>
                                            <SelectItem value="Story">Story</SelectItem>
                                            <SelectItem value="Reel">Reel</SelectItem>
                                            <SelectItem value="Video">Video</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Quantity
                                    </label>
                                    <div className="flex items-center space-x-3">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => setContentCount(Math.max(1, contentCount - 1))}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="w-8 text-center text-sm">{contentCount}</span>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => setContentCount(contentCount + 1)}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Required Followers (e.g. 50k)
                                    </label>
                                    <Input
                                        placeholder="Min followers"
                                        value={followerCount}
                                        onChange={(e) => setFollowerCount(e.target.value)}
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        onClick={handleAddDeliverable}
                                        disabled={!selectedPlatform || !followerCount}
                                        className="bg-[#10B981CC] hover:bg-[#10B981CC]/90 text-white"
                                    >
                                        Add Deliverable
                                    </Button>
                                </div>

                                {/* Added Deliverables List */}
                                {addedDeliverables.length > 0 && (
                                    <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-sm font-medium text-gray-700">
                                            Added Deliverables
                                        </h3>
                                        <div className="space-y-2">
                                            {addedDeliverables.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between bg-white p-3 rounded border border-gray-200"
                                                >
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="font-medium text-gray-900">
                                                            {item.platform}
                                                        </span>
                                                        <span className="text-gray-400">•</span>
                                                        <span className="text-gray-600 capitalize">
                                                            {item.contentType}
                                                        </span>
                                                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium">
                                                            x{item.quantity}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            ({item.platformFollowers[item.platform]} followers)
                                                        </span>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => handleRemoveDeliverable(index)}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
                <Link href="/dashboard/active-deals">
                    <Button className="bg-gray-200 hover:bg-gray-300 text-gray-600">
                        Cancel
                    </Button>
                </Link>
                <Button
                    onClick={handleSubmit}
                    disabled={isCreating}
                    className="bg-teal-500 hover:bg-teal-600 text-white"
                >
                    {isCreating ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        "Create Deal"
                    )}
                </Button>
            </div>
        </div>
    );
}
