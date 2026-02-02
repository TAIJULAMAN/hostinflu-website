"use client";

import React, { useState, useRef } from "react";
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
import { Upload, X } from "lucide-react";
import { useCreateListMutation } from "@/Redux/api/host/list/listApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddNewListingPage() {
    const router = useRouter();
    const [createList, { isLoading }] = useCreateListMutation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [addAirbnbLink, setAddAirbnbLink] = useState("");
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [customAmenities, setCustomAmenities] = useState<string[]>([]);
    const [newAmenityInput, setNewAmenityInput] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const handleRemoveImage = (index: number) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index));
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleAddCustomAmenity = () => {
        if (newAmenityInput.trim()) {
            setCustomAmenities((prev) => [...prev, newAmenityInput.trim()]);
            setNewAmenityInput("");
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setSelectedFiles((prev) => [...prev, ...newFiles]);

            const newImages: string[] = [];
            newFiles.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newImages.push(reader.result as string);
                    if (newImages.length === newFiles.length) {
                        setUploadedImages((prev) => [...prev, ...newImages]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleSubmit = async () => {
        if (!title || !description || !location || !propertyType) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("location", location);
        formData.append("propertyType", propertyType);
        formData.append("addAirbnbLink", addAirbnbLink);
        const amenitiesObject = selectedAmenities.reduce((acc, amenity) => {
            acc[amenity] = true;
            return acc;
        }, {} as Record<string, boolean>);
        formData.append("amenities", JSON.stringify(amenitiesObject));
        if (customAmenities.length > 0) {
            formData.append("customAmenities", customAmenities.join(","));
        }
        selectedFiles.forEach((file) => {
            formData.append("images", file);
        });

        try {
            const res = await createList(formData).unwrap();
            console.log(res, "res of list");
            if (res?.message) {
                toast.success(res?.message || "Listing created successfully!");
                router.push("/dashboard/lists");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to create listing");
        }
    };

    const handleChooseFiles = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="container mx-auto pb-20">
            <div className="mb-10 text-center">
                <PageHeading title="Add New Listing" />
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
                                <Input
                                    placeholder="GreenStay Villa"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <Textarea
                                    placeholder="Describe your property, its unique features, and what makes it special..."
                                    className="min-h-[120px]"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        placeholder="Enter address or city"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Property Type <span className="text-red-500">*</span>
                                    </label>
                                    <Select value={propertyType} onValueChange={setPropertyType}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select property type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Apartment">Apartment</SelectItem>
                                            <SelectItem value="Villa">Villa</SelectItem>
                                            <SelectItem value="Hotel">Hotel</SelectItem>
                                            <SelectItem value="Resort">Resort</SelectItem>
                                            <SelectItem value="Cabin">Cabin</SelectItem>
                                            <SelectItem value="Lodge">Lodge</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Airbnb Link (Optional)
                                </label>
                                <Input
                                    placeholder="https://airbnb.com/..."
                                    value={addAirbnbLink}
                                    onChange={(e) => setAddAirbnbLink(e.target.value)}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Property Photos */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-5">
                            Property Photos
                        </h3>
                        <div className="space-y-4">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-500 transition-colors cursor-pointer">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-3">
                                        <Upload className="h-6 w-6 text-teal-600" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-700 mb-1">
                                        Upload Property Photos
                                    </p>
                                    <p className="text-xs text-gray-500 mb-3">
                                        Drag and drop photos or click to browse
                                    </p>
                                    <Button
                                        type="button"
                                        onClick={handleChooseFiles}
                                        className="bg-teal-500 hover:bg-teal-600 text-white"
                                    >
                                        Choose Files
                                    </Button>
                                    <p className="text-xs text-gray-400 mt-2">
                                        Supported formats: JPG, PNG, WebP (Max: 10MB each)
                                    </p>
                                </div>
                            </div>

                            {/* Uploaded Images Preview */}
                            {uploadedImages.length > 0 && (
                                <div className="grid grid-cols-3 gap-4">
                                    {uploadedImages.map((image, index) => (
                                        <div
                                            key={index}
                                            className="relative group rounded-lg overflow-hidden border border-gray-200"
                                        >
                                            <img
                                                src={image}
                                                alt={`Property ${index + 1}`}
                                                className="w-full h-24 object-cover"
                                            />
                                            <button
                                                onClick={() => handleRemoveImage(index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
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

                        <Button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="bg-teal-600 hover:bg-teal-700 text-white"
                        >
                            {isLoading ? "Saving..." : "Save Listing"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
