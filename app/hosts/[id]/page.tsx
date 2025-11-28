"use client";

import { PageHeading } from "@/components/commom/pageHeading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    MapPin,
    Star,
    Calendar,
    Home,
    Handshake,
    Mail,
    Info,
    CheckCircle2,
} from "lucide-react";

const hostData = {
    id: 1,
    name: "Michael Adams",
    handle: "@michael.hostinflu",
    role: "Verified Host",
    location: "Lisbon, Portugal",
    rating: 4.9,
    collaborations: 32,
    joined: "2024",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    stats: {
        activeListings: 4,
        completedDeals: 12,
        averageRating: 4.9,
        responseRate: "98%",
    },
    about: "Airbnb Super Host passionate about authentic travel experiences. I collaborate with content creators to showcase beautiful stays near the coast.",
};

import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";

export default function HostProfilePage({ params }: { params: { id: string } }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow pb-12">
                {/* Header / Breadcrumb area could go here if needed */}
                <div className="bg-white border-b border-gray-200">
                    <div className="container mx-auto px-4 py-4">
                        {/* Simple back navigation or breadcrumb could be added */}
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8 max-w-5xl space-y-6">
                    {/* Header Card */}
                    <Card className="border-gray-200 shadow-sm overflow-hidden">
                        <CardContent className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow-md">
                                    <AvatarImage src={hostData.image} className="object-cover" />
                                    <AvatarFallback>{hostData.name[0]}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                            {hostData.name}
                                        </h1>
                                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-normal">
                                            <CheckCircle2 className="w-3 h-3 mr-1" />
                                            {hostData.role}
                                        </Badge>
                                    </div>
                                    <p className="text-gray-500 font-medium">{hostData.handle}</p>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-4 h-4 text-red-500" />
                                            {hostData.location}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <span className="font-semibold text-gray-900">
                                                {hostData.rating}
                                            </span>
                                            <span>({hostData.collaborations} collaborations)</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-orange-400" />
                                            Joined {hostData.joined}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="border-gray-200 shadow-sm">
                            <CardContent className="p-6">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-3">
                                    <Home className="w-5 h-5" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    {hostData.stats.activeListings}
                                </div>
                                <div className="text-sm text-gray-500">Active Listings</div>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-200 shadow-sm">
                            <CardContent className="p-6">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-3">
                                    <Handshake className="w-5 h-5" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    {hostData.stats.completedDeals}
                                </div>
                                <div className="text-sm text-gray-500">Completed Deals</div>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-200 shadow-sm">
                            <CardContent className="p-6">
                                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 mb-3">
                                    <Star className="w-5 h-5" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    {hostData.stats.averageRating}
                                </div>
                                <div className="text-sm text-gray-500">Average Rating</div>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-200 shadow-sm">
                            <CardContent className="p-6">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-3">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    {hostData.stats.responseRate}
                                </div>
                                <div className="text-sm text-gray-500">Response Rate</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* About Section */}
                    <Card className="border-gray-200 shadow-sm">
                        <CardContent className="p-6 md:p-8">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">About Host</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {hostData.about}
                            </p>

                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-700 font-medium">
                                    Communication available after deal approval
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Footer />
        </div>
    );
}
