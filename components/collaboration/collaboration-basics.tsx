"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface CollaborationBasicsProps {
    selectedListing: string;
    setSelectedListing: (listing: string) => void;
    listingsLoading: boolean;
    listings: any[];
    description: string;
    setDescription: (description: string) => void;
    addAirbnbLink: string;
    setAddAirbnbLink: (link: string) => void;
}

export const CollaborationBasics = ({
    selectedListing,
    setSelectedListing,
    listingsLoading,
    listings,
    description,
    setDescription,
    addAirbnbLink,
    setAddAirbnbLink,
}: CollaborationBasicsProps) => {
    return (
        <section>
            <Label className="text-lg font-semibold text-gray-900 mb-5">
                Collaboration Basics
            </Label>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-lg">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Collaboration Title
                        </label>
                        <Select value={selectedListing} onValueChange={setSelectedListing}>
                            <SelectTrigger>
                                <SelectValue placeholder={listingsLoading ? "Loading listings..." : "Select listing"} />
                            </SelectTrigger>
                            <SelectContent>
                                {listingsLoading ? (
                                    <div className="flex items-center justify-center p-4">
                                        <Loader2 className="w-4 h-4 animate-spin text-teal-500" />
                                    </div>
                                ) : listings.length > 0 ? (
                                    listings.map((listing: any) => (
                                        <SelectItem key={listing._id} value={listing._id}>
                                            {listing.title}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="none" disabled>No verified listings found</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe what you expect from the influencer..."
                            className="min-h-[100px]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Airbnb Link (Optional)
                        </label>
                        <input
                            type="url"
                            value={addAirbnbLink}
                            onChange={(e) => setAddAirbnbLink(e.target.value)}
                            placeholder="https://airbnb.com/rooms/..."
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
