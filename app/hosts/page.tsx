"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Building2 } from "lucide-react";
import { useGetAllUsersQuery } from "@/Redux/api/user/userApi";
import { Spinner } from "@/components/ui/spinner";
import { imgUrl } from "@/config/envConfig";

export default function HostsPage() {
    const { data, isLoading, isError } = useGetAllUsersQuery({ role: "host" });

    // Filter to only show hosts
    const hostsData = data?.data?.filter((user: any) => user.role === "host") || [];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Discover Our Hosts
                        </h1>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Browse through our verified hosts and find the perfect property for your collaboration.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center min-h-[400px]">
                            <Spinner className="w-10 h-10 text-teal-600" />
                        </div>
                    ) : isError ? (
                        <div className="text-center text-red-500">
                            <p>Failed to load hosts. Please try again later.</p>
                        </div>
                    ) : hostsData.length === 0 ? (
                        <div className="text-center text-gray-500">No hosts found.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {hostsData.map((host: any) => {
                                const _id = host?._id;
                                const name = host?.name || "N/A";
                                const email = host?.email || "N/A";
                                const userName = host?.userName || "N/A";
                                const listingsTotal = host?.listingsTotal || 0;
                                const joinedDate = host?.createdAt || "N/A";
                                const responseRate = host?.responseRate || "N/A";
                                const listings = host?.listings || [];
                                const dealsListings = host?.deals || 0;
                                const location = host?.fullAddress || "No Location";
                                const image = host?.image
                                    ? `${imgUrl}${host?.image}`
                                    : "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80";
                                const rating = host?.averageRating ? Number(host.averageRating).toFixed(1) : "0.0";
                                const deals = host?.dealsTotal || 0;
                                const isFounder = host?.isFounderMember;
                                const isVerified = host?.status === 'active';

                                return (
                                    <div
                                        key={host._id}
                                        className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
                                    >
                                        {/* Host Image - Full Width */}
                                        <div className="relative w-full aspect-[4/3] overflow-hidden">
                                            <Image
                                                src={image}
                                                alt={name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                                            {isFounder && (
                                                <div className="absolute top-3 right-3">
                                                    <Badge className="bg-white/90 backdrop-blur-md text-orange-600 border-none shadow-sm font-medium text-xs px-2.5 py-1">
                                                        <span className="mr-1">👑</span> Founder Member
                                                    </Badge>
                                                </div>
                                            )}

                                            {/* <div className="absolute bottom-3 left-3 text-white">
                                                <div className="flex items-center gap-1 text-xs font-medium bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                                                    <Building2 className="w-3 h-3" />
                                                    Host
                                                </div>
                                            </div> */}
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                                                        {name}
                                                    </h3>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                                        <span>{location}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100">
                                                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                                    <span className="text-xs font-bold text-gray-900">{rating}</span>
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-sm text-gray-500 mb-5">
                                                <span>{deals} deals</span>
                                                {isVerified && (
                                                    <span className="text-teal-600 font-medium text-xs bg-teal-50 px-2 py-1 rounded-full">Verified Host</span>
                                                )}
                                            </div>

                                            {/* Action Button */}
                                            <Link href={`/hosts/${host._id}`} className="mt-auto w-full">
                                                <Button className="w-full bg-white border-2 border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white font-semibold rounded-xl h-11 transition-all duration-300">
                                                    View Profile
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
