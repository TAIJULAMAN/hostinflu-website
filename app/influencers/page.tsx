import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
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
    {
        id: 5,
        name: "Emma Rodriguez",
        role: "Adventure & Travel",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
        isFounder: false,
        followers: "88K",
        collaborations: "25",
        rating: "4.9",
    },
    {
        id: 6,
        name: "Alex Thompson",
        role: "Luxury & Lifestyle",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
        isFounder: false,
        followers: "110K",
        collaborations: "30",
        rating: "4.8",
    },
];

export default function InfluencersPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Top Influencers
                        </h1>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Connect with our verified influencers and showcase your property to their engaged audience.
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
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#fc826f] transition-colors">
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
                                        <span className="text-[#fc826f] font-medium text-xs bg-[#fc826f]/10 px-2 py-1 rounded-full">Verified</span>
                                    </div>

                                    {/* Action Button */}
                                    <Link href={`/influencers/${influencer.id}`} className="mt-auto w-full">
                                        <Button className="w-full bg-white border-2 border-[#fc826f] text-[#fc826f] hover:bg-[#fc826f] hover:text-white font-semibold rounded-xl h-11 transition-all duration-300">
                                            View Profile
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
