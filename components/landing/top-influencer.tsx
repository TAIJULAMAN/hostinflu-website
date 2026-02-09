import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Video } from "lucide-react";
import { useTopInfluencersQuery } from "@/Redux/api/user/userApi";
import { Spinner } from "@/components/ui/spinner";

export default function TopInfluencer() {
    const { data, isLoading, isError } = useTopInfluencersQuery({});
    const influencersData = data?.data?.influencers || [];

    if (isLoading) {
        return (
            <section className="py-24 bg-gray-50/50 flex justify-center items-center min-h-[400px]">
                <Spinner className="w-10 h-10 text-[#fc826f]" />
            </section>
        );
    }

    if (isError) {
        return (
            <section className="py-24 bg-gray-50/50 text-center text-red-500">
                <p>Failed to load influencers. Please try again later.</p>
            </section>
        );
    }

    return (
        <section className="py-24 bg-gray-50/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Top Influencers
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Meet our most active and high-performing influencers ready to showcase your property.
                    </p>
                </div>

                {influencersData.length === 0 ? (
                    <div className="text-center text-gray-500">No influencers found.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {influencersData.slice(0, 4).map((influencer: any, index: number) => {
                            // Map API fields to UI with placeholders for missing data
                            const name = influencer.name || "Influencer";
                            const role = influencer.role ? influencer.role.charAt(0).toUpperCase() + influencer.role.slice(1) : "Influencer";
                            // Placeholder images cycling based on index
                            const placeholderImages = [
                                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80"
                            ];
                            const image = placeholderImages[index % placeholderImages.length];
                            const followers = "10K"; // Placeholder
                            const collaborations = influencer.collaborations ? influencer.collaborations.length : 0;
                            const rating = "5.0"; // Placeholder
                            const isFounder = false; // Placeholder

                            return (
                                <div
                                    key={influencer._id || index}
                                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
                                >
                                    {/* Influencer Image - Full Width */}
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

                                        <div className="absolute bottom-3 left-3 text-white">
                                            <div className="flex items-center gap-1 text-xs font-medium bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                                                <Video className="w-3 h-3" />
                                                {role}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#fc826f] transition-colors">
                                                    {name}
                                                </h3>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                    <Users className="w-3.5 h-3.5 text-gray-400" />
                                                    <span>{followers} followers</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100">
                                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                                <span className="text-xs font-bold text-gray-900">{rating}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-sm text-gray-500 mb-5">
                                            <span>{collaborations} collaborations</span>
                                            <span className="text-[#fc826f] font-medium text-xs bg-[#fc826f]/10 px-2 py-1 rounded-full">Verified</span>
                                        </div>

                                        {/* Action Button */}
                                        <Link href={`/influencers/${influencer._id}`} className="mt-auto w-full">
                                            <Button className="w-full bg-white border-2 border-[#fc826f] text-[#fc826f] hover:bg-[#fc826f] hover:text-white font-semibold rounded-xl h-11 transition-all duration-300">
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
        </section>
    );
}