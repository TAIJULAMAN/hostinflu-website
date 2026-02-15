"use client";

import Link from "next/link";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, User as UserIcon, Lock, MapPin, Mail, Phone, Calendar, Facebook, Instagram, Loader2, Link as LinkIcon } from "lucide-react";

import { useMyProfileQuery } from "@/Redux/api/user/userApi";
import { format } from "date-fns";
import { imgUrl } from "@/config/envConfig";

const formatFollowers = (count: number | string) => {
    const num = Number(count);
    if (isNaN(num)) return count;
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
};

export default function ProfilePage() {
    const { data: profileData, isLoading } = useMyProfileQuery({});
    const user = profileData?.data;

    if (isLoading) {
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

    const imageUrl = user?.image?.startsWith("http")
        ? user.image
        : user?.image
            ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${user.image}`
            : "";


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                        <div className="flex gap-3">
                            <Link href="/profile/edit">
                                <Button className="bg-teal-500 hover:bg-teal-600 text-white flex items-center gap-2">
                                    <UserIcon className="w-4 h-4" />
                                    Edit Profile
                                </Button>
                            </Link>
                            <Link href="/profile/change-password">
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    Change Password
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Profile Picture */}
                        <div className="lg:col-span-1">
                            <Card className="border-gray-200 shadow-sm">
                                <CardContent className="p-6 flex flex-col items-center">
                                    <Avatar className="w-32 h-32 border-4 border-white shadow-lg mb-4">
                                        <AvatarImage src={user?.image ? `${imgUrl}${user?.image}` : "/avatar.png"} className="object-cover" />
                                        <AvatarFallback className="text-2xl bg-teal-500 text-white">
                                            {user?.name?.charAt(0).toUpperCase() || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <h3 className="font-semibold text-gray-900 text-xl mb-1">{user?.name || "N/A"}</h3>
                                    <p className="text-sm text-gray-500 mb-3">@{user?.userName || "N/A"}</p>
                                    <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100 capitalize mb-4">
                                        {user?.role || "N/A"}
                                    </Badge>
                                    <Badge variant="outline" className="mb-4 border-teal-200 text-teal-700">
                                        Night Credits: {user?.nightCredits || 0}
                                    </Badge>

                                    <div className="w-full pt-4 border-t border-gray-200 space-y-3">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Mail className="w-4 h-4 text-teal-600" />
                                            <span className="truncate">{user?.email || "N/A"}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Phone className="w-4 h-4 text-teal-600" />
                                            <span>{user?.phone || "N/A"}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 text-teal-600" />
                                            <span>Joined {user?.createdAt ? format(new Date(user.createdAt), "MMMM yyyy") : "N/A"}</span>
                                        </div>
                                    </div>

                                    {/* Social Media Links */}
                                    {user?.socialMediaLinks && user.socialMediaLinks.length > 0 && (
                                        <div className="w-full pt-4 mt-4 border-t border-gray-200">
                                            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">Social Profiles</p>
                                            <div className="flex flex-wrap gap-3 justify-center">
                                                {user.socialMediaLinks.map((link: any) => (
                                                    <a
                                                        key={link._id}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full hover:bg-teal-50 text-gray-600 hover:text-teal-600 transition-colors text-xs font-medium"
                                                    >
                                                        {link.platform === 'facebook' && <Facebook className="w-4 h-4 text-blue-600" />}
                                                        {link.platform === 'instagram' && <Instagram className="w-4 h-4 text-pink-600" />}
                                                        {link.platform !== 'facebook' && link.platform !== 'instagram' && <LinkIcon className="w-4 h-4" />}
                                                        <span>{formatFollowers(link.followers)}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Profile Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Basic Information */}
                            <Card className="border-gray-200 shadow-sm">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">Basic Information</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Full Name</p>
                                            <p className="font-medium text-gray-900">{user?.name || "N/A"}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                                            <p className="font-medium text-gray-900">{user?.dateOfBirth || "N/A"}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Gender</p>
                                            <p className="font-medium text-gray-900 capitalize">{user?.gender || "N/A"}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Response Rate</p>
                                            <p className="font-medium text-gray-900">{user?.responseRate || 0}%</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Location Information */}
                            <Card className="border-gray-200 shadow-sm">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-teal-600" />
                                        Location Information
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Country</p>
                                            <p className="font-medium text-gray-900">{user?.country || "N/A"}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">State/Province</p>
                                            <p className="font-medium text-gray-900">{user?.state || "N/A"}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">City</p>
                                            <p className="font-medium text-gray-900">{user?.city || "N/A"}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">ZIP Code</p>
                                            <p className="font-medium text-gray-900">{user?.zipCode || "N/A"}</p>
                                        </div>

                                        <div className="md:col-span-2">
                                            <p className="text-sm text-gray-500 mb-1">Full Address</p>
                                            <p className="font-medium text-gray-900">{user?.fullAddress || "N/A"}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Airbnb Connection (Only for Hosts) */}
                            {user?.role === "host" && (
                                <Card className="border-gray-200 shadow-sm">
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">Airbnb Connection</h3>

                                        {user?.airbnbAccountLinked ? (
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                    <div>
                                                        <p className="text-sm font-semibold text-green-700">Connected</p>
                                                        <p className="text-xs text-green-600">Your Airbnb account is successfully linked.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-500">No Airbnb account linked.</p>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            {/* About Me */}
                            <Card className="border-gray-200 shadow-sm">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">About Me</h3>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                        {user?.bio || "No bio available."}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
