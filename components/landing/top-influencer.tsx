import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Video } from "lucide-react";

const influencers = [
    {
        id: 1,
        name: "Sofia Martins",
        role: "Lifestyle & Travel",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
        isFounder: true,
        followers: "35K",
        collaborations: "35",
        rating: "4.9",
    },
    {
        id: 2,
        name: "Kevin Lim",
        role: "Tech + Travel",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        isFounder: false,
        followers: "95K",
        collaborations: "22",
        rating: "4.8",
    },
    {
        id: 3,
        name: "Anika Rahman",
        role: "Fashion & Lifestyle",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        isFounder: false,
        followers: "120K",
        collaborations: "40",
        rating: "5.0",
    },
    {
        id: 4,
        name: "Luca Bianchi",
        role: "Food & Travel",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
        isFounder: false,
        followers: "75K",
        collaborations: "18",
        rating: "4.7",
    },
];

export default function TopInfluencer() {
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {influencers.map((influencer) => (
                        <div
                            key={influencer.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
                        >
                            {/* Influencer Image - Full Width */}
                            <div className="relative w-full aspect-[4/3] overflow-hidden">
                                <Image
                                    src={influencer.image}
                                    alt={influencer.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                                {influencer.isFounder && (
                                    <div className="absolute top-3 right-3">
                                        <Badge className="bg-white/90 backdrop-blur-md text-orange-600 border-none shadow-sm font-medium text-xs px-2.5 py-1">
                                            <span className="mr-1">👑</span> Founder Member
                                        </Badge>
                                    </div>
                                )}

                                <div className="absolute bottom-3 left-3 text-white">
                                    <div className="flex items-center gap-1 text-xs font-medium bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                                        <Video className="w-3 h-3" />
                                        {influencer.role}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                            {influencer.name}
                                        </h3>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                            <Users className="w-3.5 h-3.5 text-gray-400" />
                                            <span>{influencer.followers} followers</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100">
                                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                        <span className="text-xs font-bold text-gray-900">{influencer.rating}</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-sm text-gray-500 mb-5">
                                    <span>{influencer.collaborations} collaborations</span>
                                    <span className="text-purple-600 font-medium text-xs bg-purple-50 px-2 py-1 rounded-full">Verified</span>
                                </div>

                                {/* Action Button */}
                                <Link href={`/influencers/${influencer.id}`} className="mt-auto w-full">
                                    <Button className="w-full bg-white border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white font-semibold rounded-xl h-11 transition-all duration-300">
                                        View Profile
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}