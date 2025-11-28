"use client";

import Link from "next/link";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Home, User, Lock, MapPin, Mail, Phone, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function ProfilePage() {
    const { user } = useAuth();

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
                                    <User className="w-4 h-4" />
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
                                        <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" />
                                        <AvatarFallback className="text-2xl bg-teal-500 text-white">
                                            {user?.fullName?.charAt(0).toUpperCase() || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <h3 className="font-semibold text-gray-900 text-xl mb-1">{user?.fullName || "User Name"}</h3>
                                    <p className="text-sm text-gray-500 mb-3">@sarahjohnson</p>
                                    <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100 capitalize mb-4">
                                        {user?.role || "User"}
                                    </Badge>
                                    <div className="w-full pt-4 border-t border-gray-200">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                            <Mail className="w-4 h-4" />
                                            <span>{user?.email || "user@example.com"}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                            <Phone className="w-4 h-4" />
                                            <span>+1 (555) 123-4567</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            <span>Joined 2024</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Profile Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Basic Information */}
                            <Card className="border-gray-200 shadow-sm">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4">Basic Information</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">First Name</p>
                                            <p className="font-medium text-gray-900">Sarah</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Last Name</p>
                                            <p className="font-medium text-gray-900">Johnson</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                                            <p className="font-medium text-gray-900">August 15, 1985</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Gender</p>
                                            <p className="font-medium text-gray-900">Female</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Location Information */}
                            <Card className="border-gray-200 shadow-sm">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-teal-600" />
                                        Location Information
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Country</p>
                                            <p className="font-medium text-gray-900">United States</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">State/Province</p>
                                            <p className="font-medium text-gray-900">California</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">City</p>
                                            <p className="font-medium text-gray-900">Los Angeles</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">ZIP Code</p>
                                            <p className="font-medium text-gray-900">90210</p>
                                        </div>

                                        <div className="md:col-span-2">
                                            <p className="text-sm text-gray-500 mb-1">Full Address</p>
                                            <p className="font-medium text-gray-900">123 Sunset Boulevard, Los Angeles, CA 90210</p>
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
                                                <p className="text-sm text-gray-500 mb-1">Airbnb Listing URL</p>
                                                <a
                                                    href="https://airbnb.com/rooms/12345678"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                                                >
                                                    https://airbnb.com/rooms/12345678
                                                </a>
                                            </div>

                                            <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                <div>
                                                    <p className="text-sm font-semibold text-green-700">Verified</p>
                                                    <p className="text-xs text-green-600">Your Airbnb listing has been successfully verified</p>
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
                                    <p className="text-gray-600 leading-relaxed">
                                        I always wanted creative professional about travel, fashion, and wellness. I love creating authentic content that inspires my followers to live their best life.
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
