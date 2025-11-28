"use client";

import { useState } from "react";
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
import { CheckCircle2, Home, Camera, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function EditProfilePage() {
    const { user } = useAuth();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate save operation
        setTimeout(() => {
            setIsSaving(false);
            router.push("/profile");
        }, 1000);
    };

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

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Profile Picture */}
                        <div className="lg:col-span-1">
                            <Card className="border-gray-200 shadow-sm">
                                <CardContent className="p-6 flex flex-col items-center">
                                    <div className="relative mb-4">
                                        <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                                            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" />
                                            <AvatarFallback className="text-2xl bg-teal-500 text-white">
                                                {user?.fullName?.charAt(0).toUpperCase() || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <button className="absolute bottom-0 right-0 w-10 h-10 bg-teal-500 hover:bg-teal-600 rounded-full flex items-center justify-center shadow-lg transition-colors">
                                            <Camera className="w-5 h-5 text-white" />
                                        </button>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 text-lg">{user?.fullName || "User Name"}</h3>
                                    <p className="text-sm text-gray-500 mb-4">{user?.email || "user@example.com"}</p>
                                    <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100 capitalize">
                                        {user?.role || "User"}
                                    </Badge>
                                    <p className="text-xs text-gray-500 mt-4 text-center">Click the camera icon to change your profile picture</p>
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
                                            <Label className="text-sm font-medium text-gray-700">First Name</Label>
                                            <Input
                                                defaultValue="Sarah"
                                                className="mt-1"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700">Last Name</Label>
                                            <Input
                                                defaultValue="Johnson"
                                                className="mt-1"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <Label className="text-sm font-medium text-gray-700">Username</Label>
                                            <Input
                                                defaultValue="@sarahjohnson"
                                                className="mt-1"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <Label className="text-sm font-medium text-gray-700">Email Address</Label>
                                            <Input
                                                type="email"
                                                defaultValue={user?.email || "sarah@example.com"}
                                                className="mt-1"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                                            <Input
                                                type="tel"
                                                defaultValue="+1 (555) 123-4567"
                                                className="mt-1"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700">Date of Birth</Label>
                                            <Input
                                                type="date"
                                                defaultValue="1985-08-15"
                                                className="mt-1"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <Label className="text-sm font-medium text-gray-700">Gender</Label>
                                            <Select defaultValue="female">
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue />
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
                                            <Select defaultValue="us">
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="us">United States</SelectItem>
                                                    <SelectItem value="uk">United Kingdom</SelectItem>
                                                    <SelectItem value="ca">Canada</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700">State/Province</Label>
                                            <Select defaultValue="ca">
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ca">California</SelectItem>
                                                    <SelectItem value="ny">New York</SelectItem>
                                                    <SelectItem value="tx">Texas</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700">City</Label>
                                            <Input
                                                defaultValue="Los Angeles"
                                                className="mt-1"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700">ZIP / Postal Code</Label>
                                            <Input
                                                defaultValue="90210"
                                                className="mt-1"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <Label className="text-sm font-medium text-gray-700">Full Address</Label>
                                            <Input
                                                defaultValue="123 Sunset Boulevard, Los Angeles, CA 90210"
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Airbnb Connection (Only for Hosts) */}
                            {user?.role === "host" && (
                                <Card className="border-gray-200 shadow-sm">
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold text-gray-900 mb-4">Airbnb Connection</h3>

                                        <div className="space-y-3">
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700">Airbnb Listing URL</Label>
                                                <Input
                                                    defaultValue="https://airbnb.com/rooms/12345678"
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                <div>
                                                    <p className="text-sm font-semibold text-green-700">Verified</p>
                                                    <p className="text-xs text-gray-500">Your Airbnb listing has been successfully verified</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* About Me */}
                            <Card className="border-gray-200 shadow-sm">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4">About Me</h3>

                                    <div>
                                        <Label className="text-sm font-medium text-gray-700">Short Bio</Label>
                                        <Textarea
                                            rows={6}
                                            defaultValue="I always wanted creative professional about travel, fashion, and wellness. I love creating authentic content that inspires my followers to live their best life."
                                            className="mt-1 resize-none"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3">
                                <Link href="/profile">
                                    <Button variant="outline" className="px-6">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button
                                    className="bg-teal-500 hover:bg-teal-600 text-white px-6"
                                    onClick={handleSave}
                                    disabled={isSaving}
                                >
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
