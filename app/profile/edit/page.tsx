"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Camera, ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import { useMyProfileQuery, useUpdateProfileMutation } from "@/Redux/api/user/userApi";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { imgUrl } from "@/config/envConfig";

export default function EditProfilePage() {
    const router = useRouter();
    const { data: profileData, isLoading: isFetching } = useMyProfileQuery({});
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
    const user = profileData?.data;

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { register, handleSubmit, control, setValue, watch, reset } = useForm({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            userName: "",
            dateOfBirth: "",
            gender: "",
            country: "",
            state: "",
            city: "",
            zipCode: "",
            fullAddress: "",
            aboutMe: "",
            socialMediaLinks: [{ platform: "facebook", url: "", followers: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "socialMediaLinks",
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                userName: user.userName || "",
                dateOfBirth: user.dateOfBirth || "",
                gender: user.gender || "male",
                country: user.country || "",
                state: user.state || "",
                city: user.city || "",
                zipCode: user.zipCode || "",
                fullAddress: user.fullAddress || "",
                aboutMe: user.aboutMe || "",
                socialMediaLinks: user.socialMediaLinks?.length
                    ? user.socialMediaLinks.map((link: any) => ({
                        platform: link.platform,
                        url: link.url,
                        followers: link.followers,
                    }))
                    : [{ platform: "facebook", url: "", followers: "" }],
            });
            if (user.image) {
                console.log(user.image);
                setImagePreview(
                    user.image.startsWith("http")
                        ? user.image
                        : `${imgUrl}${user.image}`
                );
            }
        }
    }, [user, reset]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: any) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("phone", data.phone);
            formData.append("userName", data.userName);
            formData.append("dateOfBirth", data.dateOfBirth);
            formData.append("gender", data.gender);
            formData.append("country", data.country);
            formData.append("state", data.state);
            formData.append("city", data.city);
            formData.append("zipCode", data.zipCode);
            formData.append("fullAddress", data.fullAddress);
            formData.append("aboutMe", data?.aboutMe);

            if (imageFile) {
                formData.append("image", imageFile);
            }
            if (data.socialMediaLinks && data.socialMediaLinks.length > 0) {
                const validLinks = data.socialMediaLinks
                    .filter((link: any) => link.url)
                    .map((link: any) => ({
                        platform: link.platform,
                        url: link.url,
                        followers: link.followers ? Number(link.followers) : 0
                    }));

                if (validLinks.length > 0) {
                    // Append each link as individual fields for backend parsers that handle array notation in FormData
                    validLinks.forEach((link: any, index: number) => {
                        formData.append(`socialMediaLinks[${index}][platform]`, link.platform);
                        formData.append(`socialMediaLinks[${index}][url]`, link.url);
                        formData.append(`socialMediaLinks[${index}][followers]`, link.followers.toString());
                    });
                }
            }

            await updateProfile({ data: formData }).unwrap();
            toast.success("Profile updated successfully");
            router.push("/profile");
        } catch (error: any) {
            console.error("Update error:", error);
            toast.error(error?.data?.message || "Failed to update profile");
        }
    };

    if (isFetching) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/profile">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Column - Profile Picture */}
                            <div className="lg:col-span-1">
                                <Card className="border-gray-200 shadow-sm">
                                    <CardContent className="p-6 flex flex-col items-center">
                                        <div className="relative mb-4 group">
                                            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                                                <AvatarImage src={imagePreview || ""} className="object-cover" />
                                                <AvatarFallback className="text-2xl bg-teal-500 text-white">
                                                    {user?.name?.charAt(0).toUpperCase() || "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <label
                                                htmlFor="profile-image-upload"
                                                className="absolute bottom-0 right-0 w-10 h-10 bg-teal-500 hover:bg-teal-600 rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
                                            >
                                                <Camera className="w-5 h-5 text-white" />
                                            </label>
                                            <input
                                                id="profile-image-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 text-lg">{user?.name || "User Name"}</h3>
                                        <p className="text-sm text-gray-500 mb-4">{user?.email || "user@example.com"}</p>
                                        <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100 capitalize">
                                            {user?.role || "User"}
                                        </Badge>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Edit Form */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Basic Information */}
                                <Card className="border-gray-200 shadow-sm">
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold text-gray-900 mb-4">Basic Information</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                                                <Input
                                                    {...register("name")}
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div>
                                                <Label className="text-sm font-medium text-gray-700">Username</Label>
                                                <Input
                                                    {...register("userName")}
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <Label className="text-sm font-medium text-gray-700">Email Address</Label>
                                                <Input
                                                    {...register("email")}
                                                    disabled
                                                    className="mt-1 bg-gray-100"
                                                />
                                            </div>

                                            <div>
                                                <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                                                <Input
                                                    {...register("phone")}
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div>
                                                <Label className="text-sm font-medium text-gray-700">Date of Birth</Label>
                                                <Input
                                                    type="date"
                                                    {...register("dateOfBirth")}
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <Label className="text-sm font-medium text-gray-700">Gender</Label>
                                                <Select
                                                    onValueChange={(value) => setValue("gender", value)}
                                                    defaultValue={watch("gender")}
                                                >
                                                    <SelectTrigger className="mt-1">
                                                        <SelectValue placeholder="Select Gender" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="male">Male</SelectItem>
                                                        <SelectItem value="female">Female</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Location Information */}
                                <Card className="border-gray-200 shadow-sm">
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold text-gray-900 mb-4">Location Information</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700">Country</Label>
                                                <Input
                                                    {...register("country")}
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div>
                                                <Label className="text-sm font-medium text-gray-700">State/Province</Label>
                                                <Input
                                                    {...register("state")}
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div>
                                                <Label className="text-sm font-medium text-gray-700">City</Label>
                                                <Input
                                                    {...register("city")}
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div>
                                                <Label className="text-sm font-medium text-gray-700">ZIP / Postal Code</Label>
                                                <Input
                                                    {...register("zipCode")}
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <Label className="text-sm font-medium text-gray-700">Full Address</Label>
                                                <Input
                                                    {...register("fullAddress")}
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Social Media Links */}
                                <Card className="border-gray-200 shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-semibold text-gray-900">Social Media Links</h3>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => append({ platform: "facebook", url: "", followers: "" })}
                                                className="h-8"
                                            >
                                                <Plus className="w-3 h-3 mr-1" />
                                                Add Link
                                            </Button>
                                        </div>

                                        <div className="space-y-4">
                                            {fields.map((field, index) => (
                                                <div key={field.id} className="grid grid-cols-12 gap-3 items-end p-3 bg-gray-50 rounded-lg">
                                                    <div className="col-span-12 md:col-span-3">
                                                        <Label className="text-xs text-gray-500 mb-1 block">Platform</Label>
                                                        <Select
                                                            onValueChange={(value) => setValue(`socialMediaLinks.${index}.platform`, value)}
                                                            defaultValue={watch(`socialMediaLinks.${index}.platform`)}
                                                        >
                                                            <SelectTrigger className="h-9">
                                                                <SelectValue placeholder="Platform" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="facebook">Facebook</SelectItem>
                                                                <SelectItem value="instagram">Instagram</SelectItem>
                                                                <SelectItem value="twitter">Twitter</SelectItem>
                                                                <SelectItem value="linkedin">LinkedIn</SelectItem>
                                                                <SelectItem value="tiktok">TikTok</SelectItem>
                                                                <SelectItem value="youtube">YouTube</SelectItem>
                                                                <SelectItem value="other">Other</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="col-span-12 md:col-span-4">
                                                        <Label className="text-xs text-gray-500 mb-1 block">Profile URL</Label>
                                                        <Input
                                                            {...register(`socialMediaLinks.${index}.url`)}
                                                            placeholder="https://..."
                                                            className="h-9"
                                                        />
                                                    </div>
                                                    <div className="col-span-10 md:col-span-4">
                                                        <Label className="text-xs text-gray-500 mb-1 block">Followers Count</Label>
                                                        <Input
                                                            {...register(`socialMediaLinks.${index}.followers`)}
                                                            placeholder="e.g. 10000"
                                                            type="number"
                                                            className="h-9"
                                                        />
                                                    </div>
                                                    <div className="col-span-2 md:col-span-1 flex justify-end">
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => remove(index)}
                                                            className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}

                                            {fields.length === 0 && (
                                                <div className="text-center py-6 text-gray-500 text-sm border-2 border-dashed rounded-lg">
                                                    No social media links added yet.
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* About Me */}
                                <Card className="border-gray-200 shadow-sm">
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold text-gray-900 mb-4">About Me</h3>

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700">Short Bio</Label>
                                            <Textarea
                                                {...register("aboutMe")}
                                                rows={6}
                                                className="mt-1 resize-none"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-3 sticky bottom-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-gray-100">
                                    <Link href="/profile">
                                        <Button variant="outline" className="px-6" type="button">
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button
                                        className="bg-teal-500 hover:bg-teal-600 text-white px-6"
                                        type="submit"
                                        disabled={isUpdating}
                                    >
                                        {isUpdating ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Saving...
                                            </>
                                        ) : "Save Changes"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}
