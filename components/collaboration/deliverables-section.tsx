"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Deliverable {
    platform: string;
    contentType: string;
    count: number;
}

interface DeliverablesSectionProps {
    selectedPlatform: string | null;
    setSelectedPlatform: (platform: string | null) => void;
    contentType: string;
    setContentType: (type: string) => void;
    contentCount: number;
    setContentCount: (count: number) => void;
    addedDeliverables: Deliverable[];
    handleAddDeliverable: () => void;
    handleRemoveDeliverable: (index: number) => void;
}

export const DeliverablesSection = ({
    selectedPlatform,
    setSelectedPlatform,
    contentType,
    setContentType,
    contentCount,
    setContentCount,
    addedDeliverables,
    handleAddDeliverable,
    handleRemoveDeliverable,
}: DeliverablesSectionProps) => {
    return (
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
    );
};
