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
import { PageHeading } from "@/components/commom/pageHeading";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { lists } from "../../data";
import { use } from "react";

export default function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    // Find the listing by ID
    const listing = lists.find((item) => item.id === id);

    const [selectedAmenities, setSelectedAmenities] = useState<string[]>(["wifi", "pool", "parking"]);
    const [customAmenities, setCustomAmenities] = useState<string[]>([]);
    const [newAmenityInput, setNewAmenityInput] = useState("");

    const amenitiesList = [
        { id: "wifi", label: "Wi-Fi" },
        { id: "pool", label: "Pool" },
        { id: "parking", label: "Parking" },
        { id: "kitchen", label: "Kitchen" },
        { id: "ac", label: "Air Conditioning" },
        { id: "petFriendly", label: "Pet Friendly" },
        { id: "tv", label: "TV" },
        { id: "gym", label: "Gym" },
        { id: "hotTub", label: "Hot Tub" },
    ];

    const handleAmenityToggle = (amenityId: string) => {
        setSelectedAmenities((prev) =>
            prev.includes(amenityId)
                ? prev.filter((id) => id !== amenityId)
                : [...prev, amenityId]
        );
    };

    const handleAddCustomAmenity = () => {
        if (newAmenityInput.trim()) {
            setCustomAmenities((prev) => [...prev, newAmenityInput.trim()]);
            setNewAmenityInput("");
        }
    };

    if (!listing) {
        return (
            <div className="container mx-auto pb-20">
                <div className="text-center py-20">
                    <h2 className="text-2xl font-semibold text-gray-800">Listing not found</h2>
                    <Link href="/dashboard/lists">
                        <Button className="mt-4">Back to Listings</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto pb-20">
            <div className="mb-10 text-center">
                <PageHeading title="Edit Listing" />
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-lg space-y-8">
                    {/* Basic Information */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-5">
                            Basic Information
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Property Title <span className="text-red-500">*</span>
                                </label>
                                <Input defaultValue={listing.name} />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <Textarea
                                    defaultValue={listing.description}
                                    className="min-h-[120px]"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                    <Input defaultValue={listing.location} />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Property Type <span className="text-red-500">*</span>
                                    </label>
                                    <Select defaultValue={listing.propertyType.toLowerCase()}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="apartment">Apartment</SelectItem>
                                            <SelectItem value="villa">Villa</SelectItem>
                                            <SelectItem value="hotel">Hotel</SelectItem>
                                            <SelectItem value="resort">Resort</SelectItem>
                                            <SelectItem value="cabin">Cabin</SelectItem>
                                            <SelectItem value="lodge">Lodge</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <Select defaultValue={listing.status.toLowerCase()}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="verified">Verified</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </section>

                    {/* Amenities & Features */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-5">
                            Amenities & Features
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {amenitiesList.map((amenity) => (
                                <div
                                    key={amenity.id}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={amenity.id}
                                        checked={selectedAmenities.includes(amenity.id)}
                                        onCheckedChange={() => handleAmenityToggle(amenity.id)}
                                    />
                                    <label
                                        htmlFor={amenity.id}
                                        className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                                    >
                                        {amenity.label}
                                    </label>
                                </div>
                            ))}
                            {customAmenities.map((amenity, index) => (
                                <div
                                    key={`custom-${index}`}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={`custom-${index}`}
                                        checked={selectedAmenities.includes(`custom-${index}`)}
                                        onCheckedChange={() => handleAmenityToggle(`custom-${index}`)}
                                    />
                                    <label
                                        htmlFor={`custom-${index}`}
                                        className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                                    >
                                        {amenity}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex gap-2">
                            <Input
                                placeholder="Enter custom amenity name"
                                value={newAmenityInput}
                                onChange={(e) => setNewAmenityInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddCustomAmenity();
                                    }
                                }}
                                className="flex-1"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleAddCustomAmenity}
                            >
                                + Add
                            </Button>
                        </div>
                    </section>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                        <Link href="/dashboard/lists">
                            <Button
                                variant="outline"
                                className="bg-gray-200 hover:bg-gray-300 text-gray-600"
                            >
                                Cancel
                            </Button>
                        </Link>
                        <Link href="/dashboard/lists">
                            <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                                Save Changes
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
