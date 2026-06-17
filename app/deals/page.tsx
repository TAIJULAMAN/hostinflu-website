"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, Heart } from "lucide-react";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetAllListsQuery } from "@/Redux/api/host/list/listApi";
import { useCreateFavouriteListMutation } from "@/Redux/api/bookmark/bookmarkApi";
import { useCollaborationRequestMutation } from "@/Redux/api/collaboration/collaborationApi";
import { imgUrl } from "@/config/envConfig";
import { CustomPagination } from "@/components/commom/custom-pagination";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";

export default function DealsPage() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 500);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedDeal, setSelectedDeal] = useState<any>(null);
    const [createFavouriteList] = useCreateFavouriteListMutation();
    const [collaborationRequest] = useCollaborationRequestMutation();

    useEffect(() => {
        setPage(1);
    }, [searchTerm]);

    const { data: listingsData, isLoading } = useGetAllListsQuery({ page, limit: 10, search: debouncedSearch });
    const listingsList = listingsData?.data?.listings?.filter((listing: any) => {
        if (!searchTerm) return true;

        const searchTerms = searchTerm.toLowerCase().split(/[ ,\-]+/).filter(Boolean);
        const searchableText = [
            listing?.title,
            listing?.location,
            listing?.userId?.city,
            listing?.userId?.country
        ].filter(Boolean).join(" ").toLowerCase();

        return searchTerms.every(term => searchableText.includes(term));
    }) || [];

    const pagination = listingsData?.meta || listingsData;
    const totalPages = pagination?.totalPage || pagination?.totalPages || 0;

    const handleCollaboration = (listing: any) => {
        const title = encodeURIComponent(listing?.title || "");
        const desc = encodeURIComponent(listing?.description || "");
        router.push(`/collaboration-request/${listing.userId._id}?listingId=${listing._id}&title=${title}&description=${desc}`);
    };

    const handleToggleFavorite = async (e: React.MouseEvent, listingId: string) => {
        e.preventDefault();
        try {
            const res = await createFavouriteList({ listingId, data: {} }).unwrap();
            toast.success(res?.message || "Successfully updated favorites");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update favorites");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-10">
                <div className="container mx-auto px-5 md:px-0 py-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Explore Properties
                        </h1>
                        <p className="text-gray-500 max-w-2xl mx-auto mb-8">
                            Discover collaboration opportunities from Hosts near you
                        </p>

                        <div className="max-w-md mx-auto relative">
                            <input
                                type="text"
                                placeholder="Search by title, city, or country... (e.g. london)"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                            />
                            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {isLoading ? (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                Loading properties...
                            </div>
                        ) : listingsList.length === 0 ? (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                No properties found.
                            </div>
                        ) : (
                            listingsList?.map((listing: any) => (
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
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Verified
                                                </span>
                                            )}
                                        </div>

                                        <button
                                            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/10 backdrop-blur-md border border-white/20 transition-all duration-300 shadow-sm"
                                            onClick={(e) => handleToggleFavorite(e, listing._id)}
                                            aria-label='add-to-wishlist'
                                        >
                                            <Heart
                                                className={`w-5 h-5 transition-all duration-500 cursor-pointer ${listing?.isFavoritedByMe ? "text-red-500 fill-red-500 hover:text-white hover:fill-transparent" : "text-white hover:text-red-500 hover:fill-red-500"
                                                    }`}
                                            />
                                        </button>

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
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {listing?.location || "Unknown Location"}
                                            </span>
                                            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{listing?.propertyType || "Property"}</span>
                                        </div>

                                        {/* Property Name */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-teal-600 transition-colors">
                                            {listing?.title || "Property Name"}
                                        </h3>

                                        {/* Description Snippet */}
                                        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                            {listing?.description || "No description available."}
                                        </p>

                                        {/* Amenities */}
                                        <div className="mt-auto">
                                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Amenities</div>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {listing?.amenities && Object.entries(listing.amenities)
                                                    .filter(([_, value]) => value)
                                                    .slice(0, 4) // Show top 4 amenities
                                                    .map(([key], idx) => (
                                                        <span key={idx} className="bg-teal-50 text-teal-700 border border-teal-100 text-xs px-2 py-1 rounded font-medium capitalize">
                                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                                        </span>
                                                    ))}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                                <Link href={`/deals/${listing._id}`} className="flex-1">
                                                    <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium h-10">
                                                        Details
                                                    </Button>
                                                </Link>
                                                <Button
                                                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium h-10 shadow-sm shadow-teal-200"
                                                    onClick={() => handleCollaboration(listing)}
                                                >
                                                    Collaborate
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <CustomPagination
                            page={page}
                            totalPages={totalPages}
                            setPage={setPage}
                        />
                    )}
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && selectedDeal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-300">
                        {/* Success Icon */}
                        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        {/* Content */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Application Sent Successfully!</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Your collaboration application has been sent to <span className="font-semibold text-gray-900">{selectedDeal?.userId?.name || 'the host'}</span>. They will review your proposal and get back to you soon.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Button
                                onClick={() => router.push(`/deals/${selectedDeal._id}`)}
                                variant="outline"
                                className="w-full"
                            >
                                Back to Property
                            </Button>
                            <Button
                                onClick={() => setShowSuccessModal(false)}
                                variant="ghost"
                                className="w-full"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
