"use client";

import React, { useState, useRef, useEffect } from "react";
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
import { use } from "react";
import { useSelector } from "react-redux";
import { useGetSingleListingQuery, useUpdateListMutation } from "@/Redux/api/host/list/listApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { imgUrl } from "@/config/envConfig";

export default function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const storedList = useSelector((state: any) => state.list.list);
    const { data: listingData, isLoading } = useGetSingleListingQuery(id);
    const listing = listingData?.data?.listing?.[0] || (storedList?._id === id ? storedList : null);
    const [updateList, { isLoading: isUpdating }] = useUpdateListMutation();

    // Form
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
        { id: "airConditioning", label: "Air Conditioning" },
        { id: "petFriendly", label: "Pet Friendly" },
        { id: "tv", label: "TV" },
        { id: "gym", label: "Gym" },
        { id: "hotTub", label: "Hot Tub" },
    ];

    // Pre-populate
    useEffect(() => {
        if (listing) {
            setTitle(listing.title || "");
            setDescription(listing.description || "");
            setLocation(listing.location || "");
            setPropertyType(listing.propertyType || "");
            setAddAirbnbLink(listing.addAirbnbLink || "");
            if (listing.amenities) {
                const amenitiesArray = Object.entries(listing.amenities)
                    .filter(([_, value]) => value === true)
                    .map(([key]) => key);
                setSelectedAmenities(amenitiesArray);
            }

            if (listing.customAmenities) {
                setCustomAmenities(listing.customAmenities);
            }
            if (listing.images) {
                setUploadedImages(listing.images);
            }
        }
    }, [listing]);

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

    const handleRemoveImage = (index: number) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
        }
    };

    const handleChooseFiles = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("location", location);
        formData.append("propertyType", propertyType);
        formData.append("addAirbnbLink", addAirbnbLink);

        // Convert amenities array to object
        const amenitiesObj: any = {};
        amenitiesList.forEach((amenity) => {
            amenitiesObj[amenity.id] = selectedAmenities.includes(amenity.id);
        });
        formData.append("amenities", JSON.stringify(amenitiesObj));

        // Add custom amenities
        formData.append("customAmenities", JSON.stringify(customAmenities));

        // Add new image files
        selectedFiles.forEach((file) => {
            formData.append("images", file);
        });

        try {
            const res = await updateList({ id, data: formData }).unwrap();
            if (res?.message) {
                toast.success(res.message || "Listing updated successfully!");
                router.push("/dashboard/lists");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update listing");
        }
    };

    if (isLoading && !listing) {
        return (
            <div className="container mx-auto pb-20">
                <div className="text-center py-20">
                    <h2 className="text-2xl font-semibold text-gray-800">Loading...</h2>
                </div>
            </div>
        );
    }

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

            <form onSubmit={handleSubmit}>
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
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <Textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="min-h-[120px]"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Location <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Property Type <span className="text-red-500">*</span>
                                        </label>
                                        <Select value={propertyType} onValueChange={setPropertyType}>
                                            <SelectTrigger>
                                                <SelectValue />
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
                                        Airbnb Link
                                    </label>
                                    <Input
                                        value={addAirbnbLink}
                                        onChange={(e) => setAddAirbnbLink(e.target.value)}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Property Images */}
                        <section>
                            <h3 className="text-lg font-semibold text-gray-900 mb-5">
                                Property Images
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
                                                    src={`${imgUrl}${image}`}
                                                    alt={`Property ${index + 1}`}
                                                    className="w-full h-24 object-cover"
                                                />
                                                <button
                                                    type="button"
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
                            {customAmenities.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {customAmenities.map((amenity, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm"
                                        >
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                            <Link href="/dashboard/lists">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-600"
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                className="bg-teal-500 hover:bg-teal-600 text-white"
                                disabled={isUpdating}
                            >
                                {isUpdating ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
