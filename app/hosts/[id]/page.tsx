"use client";

import { use, useState } from "react";
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
    CheckCircle2,
} from "lucide-react";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { useGetUserByIdQuery } from "@/Redux/api/user/userApi";
import { useGetReviewByIdQuery } from "@/Redux/api/review/reviewApi";
import { imgUrl } from "@/config/envConfig";
import { useGetAllListingsByHostIdQuery } from "@/Redux/api/host/list/listApi";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Loader from "@/components/commom/loader";

export default function HostProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data, isLoading } = useGetUserByIdQuery(id, {
        skip: !id,
    });
    console.log(data, "data of single host");
    const { data: reviewsData } = useGetReviewByIdQuery(id, {
        skip: !id,
    });

    const [visibleCount, setVisibleCount] = useState(10);
    const reviews = reviewsData?.data?.reviews || [];
    const visibleReviews = reviews.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 10);
    };


    const host = data?.data;
    const name = host?.name || "N/A";
    const userName = host?.userName ? `@${host.userName}` : "@username";
    const location = host?.fullAddress || "No Location";
    const image = host?.image
        ? `${imgUrl}${host.image}`
        : "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80";
    const rating = host?.averageRating ? Number(host.averageRating).toFixed(1) : "0.0";
    const collaborations = host?.collaborationsTotal || 0;
    const joinedYear = host?.createdAt ? new Date(host.createdAt).getFullYear() : "N/A";
    const isVerified = host?.status === 'active';
    const isFounder = host?.isFounderMember;

    // Stats
    const activeListings = host?.listingsTotal || 0;
    const completedDeals = host?.completeDealsTotal || host?.dealsTotal || 0;
    const averageRating = host?.averageRating ? Number(host.averageRating).toFixed(1) : "0.0";
    const responseRate = host?.responseRate ? `${host.responseRate}%` : "0%";

    // loading state
    if (!id || isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow py-10 md:py-15">
                <div className="container mx-auto py-10 space-y-5">
                    {/* Header Card */}
                    <Card className="border-gray-200 shadow-sm overflow-hidden">
                        <CardContent className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow-md">
                                    <AvatarImage src={image} className="object-cover" />
                                    <AvatarFallback>{name[0]}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                            {name}
                                        </h1>
                                        {isVerified && (
                                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-normal">
                                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                                Verified Host
                                            </Badge>
                                        )}
                                        {isFounder && (
                                            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none font-normal">
                                                👑 Founder Member
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-gray-500 font-medium">{userName}</p>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-4 h-4 text-red-500" />
                                            {location}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <span className="font-semibold text-gray-900">
                                                {rating}
                                            </span>
                                            <span>({collaborations} collaborations)</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-orange-400" />
                                            Joined {joinedYear}
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
                                    {activeListings}
                                </div>
                                <div className="text-sm text-gray-500">Total Listings</div>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-200 shadow-sm">
                            <CardContent className="p-6">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-3">
                                    <Handshake className="w-5 h-5" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    {completedDeals}
                                </div>
                                <div className="text-sm text-gray-500">Completed Collaborations</div>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-200 shadow-sm">
                            <CardContent className="p-6">
                                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 mb-3">
                                    <Star className="w-5 h-5" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    {averageRating}
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
                                    {responseRate}
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
                                {host?.aboutMe || "This host hasn't added a bio yet."}
                            </p>

                            {/* <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-700 font-medium">
                                    Communication available after deal approval
                                </p>
                            </div> */}
                        </CardContent>
                    </Card>

                    <ListingSection id={id} />

                    {/* Reviews Section */}
                    <Card className="border-gray-200 shadow-sm">
                        <CardContent className="p-6 md:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-gray-900">Reviews ({reviews?.length || 0})</h2>
                            </div>

                            <div className="space-y-6">
                                {visibleReviews?.map((review: any) => (
                                    <div key={review._id} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0">
                                        <Avatar className="w-12 h-12 flex-shrink-0">
                                            <AvatarImage
                                                src={review?.reviewerId?.image ? `${imgUrl}${review.reviewerId.image}` : "https://avatar.iran.liara.run/public/42"}
                                                className="object-cover"
                                            />
                                            <AvatarFallback>{review?.reviewerId?.name?.[0] || "U"}</AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-gray-900">{review?.reviewerId?.name || "Anonymous User"}</h3>
                                            </div>

                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(review?.rating || 0)].map((_, i) => (
                                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                    ))}
                                                </div>
                                                <span className="text-xs text-gray-500">
                                                    {review?.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}
                                                </span>
                                            </div>

                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {review?.comment}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {reviews && reviews.length > visibleCount && (
                                <div className="mt-6 text-center">
                                    <button
                                        onClick={handleLoadMore}
                                        className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors"
                                    >
                                        Load More Reviews
                                    </button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Footer />
        </div>
    );
}

const ListingSection = ({ id }: { id: string }) => {
    const { data: listingsData } = useGetAllListingsByHostIdQuery(id);
    const listings = listingsData?.data || [];
    console.log(listings, "listings from single user");

    if (listings.length === 0) return null;

    return (
        <div className="space-y-5">
            <h2 className="text-2xl font-bold text-gray-900">Listings ({listings.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {listings.map((listing: any) => (
                    <Card key={listing._id} className="group border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full bg-white rounded-xl">
                        {/* Property Image & Badges */}
                        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                            <Image
                                src={listing?.images?.[0] ? `${imgUrl}${listing.images[0]}` : "/list.png"}
                                alt={listing?.title || "Property"}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                            {/* Top Badges */}
                            <div className="absolute top-3 left-3 flex gap-2">
                                {listing?.status === 'verified' && (
                                    <span className="bg-white/90 backdrop-blur-sm text-teal-600 text-xs font-bold px-2 py-1 rounded-sm shadow-sm flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" />
                                        Verified
                                    </span>
                                )}
                            </div>

                            {/* Bottom Info on Image */}
                            <div className="absolute bottom-3 left-3 right-3 text-white">
                                <div className="flex items-center gap-2 mb-1">
                                    <Avatar className="w-6 h-6 border border-white/50 shadow-sm">
                                        <AvatarImage src={listing?.userId?.image ? `${imgUrl}${listing.userId.image}` : "https://avatar.iran.liara.run/public/42"} />
                                        <AvatarFallback>{listing?.userId?.name?.[0] || "H"}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs font-medium text-white/90 truncate">{listing?.userId?.name || "Host Name"}</span>
                                </div>
                            </div>
                        </div>

                        <CardContent className="p-5 flex flex-col flex-grow">
                            {/* Location & Type */}
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {listing?.location || "Unknown Location"}
                                </span>
                                <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{listing?.propertyType || "Property"}</span>
                            </div>

                            {/* Property Name */}
                            <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-teal-600 transition-colors">
                                {listing?.title || "Property Name"}
                            </h3>

                            {/* Description / Summary */}
                            <div className="bg-teal-50 rounded-lg p-3 mb-4 space-y-2">
                                <p className="text-sm text-teal-800 line-clamp-2">
                                    {listing?.description || "No description available."}
                                </p>
                            </div>

                            {/* Amenities Tags */}
                            <div className="mt-auto">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Amenities</div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {(() => {
                                        const amenities = [
                                            ...Object.entries(listing?.amenities || {}).filter(([_, v]) => v).map(([k]) => k.charAt(0).toUpperCase() + k.slice(1).replace(/([A-Z])/g, ' $1').trim()),
                                            ...(listing?.customAmenities || [])
                                        ].slice(0, 3);

                                        if (amenities.length === 0) {
                                            return <span className="text-xs text-gray-400 italic">No specific amenities listed</span>;
                                        }

                                        return amenities.map((amenity, idx) => (
                                            <span key={idx} className="text-xs px-2 py-1 rounded border bg-gray-100 text-gray-700 border-gray-200 font-medium">
                                                {amenity}
                                            </span>
                                        ));
                                    })()}
                                    {(Object.keys(listing?.amenities || {}).filter(k => listing.amenities[k]).length + (listing?.customAmenities?.length || 0)) > 3 && (
                                        <span className="text-xs text-gray-500 self-center">...</span>
                                    )}
                                </div>
                                <div className="flex gap-3 pt-4 border-t border-gray-100">
                                    <Link href={`/deals/${listing._id}`} className="flex-1">
                                        <Button className="w-full border-2 border-gray-300 text-gray-700 bg-white font-medium h-10">
                                            Details
                                        </Button>
                                    </Link>
                                    <Button
                                        className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium h-10 shadow-sm shadow-teal-200"
                                    >
                                        Collaboration
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
