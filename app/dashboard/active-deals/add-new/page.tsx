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
import { Calendar as CalendarIcon, Minus, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { PageHeading } from "@/components/commom/pageHeading";
import Link from "next/link";

export default function AddDealPage() {
    const [contentCount, setContentCount] = useState(1);
    const [nightCount, setNightCount] = useState(2);
    const [compensationTypes, setCompensationTypes] = useState<string[]>(["nights"]);
    const [checkInDate, setCheckInDate] = useState<Date>();
    const [checkOutDate, setCheckOutDate] = useState<Date>();
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [contentType, setContentType] = useState<string>("post");
    const [addedDeliverables, setAddedDeliverables] = useState<
        { platform: string; contentType: string; count: number }[]
    >([]);

    const handleAddDeliverable = () => {
        if (selectedPlatform && contentType && contentCount > 0) {
            setAddedDeliverables((prev) => [
                ...prev,
                {
                    platform: selectedPlatform,
                    contentType,
                    count: contentCount,
                },
            ]);
            setSelectedPlatform(null);
            setContentType("post");
            setContentCount(1);
        }
    };

    const handleRemoveDeliverable = (index: number) => {
        setAddedDeliverables((prev) => prev.filter((_, i) => i !== index));
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
                                            Deal Title
                                        </label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select deal" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="deal1">Summer Villa Stay Promotion</SelectItem>
                                                <SelectItem value="deal2">Winter Cozy Cabin</SelectItem>
                                                <SelectItem value="deal3">City Break Experience</SelectItem>
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
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Select Listing
                                        </label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose which Airbnb listing this deal is for" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="listing1">Listing 1</SelectItem>
                                                <SelectItem value="listing2">Listing 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Add your Airbnb Link
                                        </label>
                                        <Input placeholder="Paste your Airbnb listing URL below" />
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
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="10:00 PM" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="10pm">10:00 PM</SelectItem>
                                                <SelectItem value="11pm">11:00 PM</SelectItem>
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
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="10:00 PM" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="10pm">10:00 PM</SelectItem>
                                                <SelectItem value="11pm">11:00 PM</SelectItem>
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
                                                        Offer free nights at your property as compensation.
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
                                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
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
                                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                                <label className="text-sm font-medium text-gray-700">
                                                    Payment Amount
                                                </label>
                                                <Input
                                                    placeholder="$0.00"
                                                    className="bg-white"
                                                    onClick={(e) => e.stopPropagation()}
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
                                        {["Instagram", "TikTok", "YouTube", "Facebook", "X (Twitter)"].map(
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
                                                    {/* Icons would go here */}
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
                                            <SelectItem value="post">Post</SelectItem>
                                            <SelectItem value="story">Story</SelectItem>
                                            <SelectItem value="reel">Reel</SelectItem>
                                            <SelectItem value="video">Video</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-gray-400">
                                        Choose what kind of content the influencer should create.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        How many contents should they create?
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
                                    <p className="text-xs text-gray-400">e.g., 2 Reels + 1 Story</p>
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        onClick={handleAddDeliverable}
                                        disabled={!selectedPlatform}
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
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-gray-900">
                                                            {item.platform}
                                                        </span>
                                                        <span className="text-gray-400">•</span>
                                                        <span className="text-gray-600 capitalize">
                                                            {item.contentType}
                                                        </span>
                                                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium">
                                                            x{item.count}
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
                <Link href="/dashboard/active-deals">
                    <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                        Create Deal
                    </Button>
                </Link>
            </div>
        </div>
    );
}
