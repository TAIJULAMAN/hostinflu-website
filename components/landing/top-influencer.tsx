import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Video, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { useTopInfluencersQuery } from "@/Redux/api/user/userApi";
import { Spinner } from "@/components/ui/spinner";
import { imgUrl } from "@/config/envConfig";

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

    const getSocialIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'facebook':
                return <Facebook className="w-3.5 h-3.5 text-gray-400 hover:text-[#1877F2] transition-colors" />;
            case 'instagram':
                return <Instagram className="w-3.5 h-3.5 text-gray-400 hover:text-[#E4405F] transition-colors" />;
            case 'twitter':
            case 'x':
                return <Twitter className="w-3.5 h-3.5 text-gray-400 hover:text-[#1DA1F2] transition-colors" />;
            case 'linkedin':
                return <Linkedin className="w-3.5 h-3.5 text-gray-400 hover:text-[#0A66C2] transition-colors" />;
            case 'youtube':
                return <Youtube className="w-3.5 h-3.5 text-gray-400 hover:text-[#FF0000] transition-colors" />;
            default:
                return <Users className="w-3.5 h-3.5 text-gray-400" />;
        }
    };

    const formatFollowers = (count: number) => {
        if (!count) return '0';
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
        if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
        return count.toString();
    };

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
                            const name = influencer.name || "N/A";
                            const image = influencer?.image ? `${imgUrl}${influencer.image}` : "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80";


                            const collaborations = influencer.collaborationsTotal || influencer.collaborations?.length || 0;
                            const rating = influencer.averageRating ? Number(influencer.averageRating).toFixed(1) : "0.0";
                            const isFounder = influencer.isFounderMember;
                            const isVerified = influencer.status === 'active';

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
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#fc826f] transition-colors">
                                                    {name}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-2 mt-3">
                                                    {influencer?.socialMediaLinks && influencer.socialMediaLinks.length > 0 ? (
                                                        influencer.socialMediaLinks.map((link: any) => (
                                                            <a
                                                                key={link._id}
                                                                href={link.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-xs font-medium text-gray-600 group/link"
                                                            >
                                                                {getSocialIcon(link.platform)}
                                                                <span>{formatFollowers(link.followers)}</span>
                                                            </a>
                                                        ))
                                                    ) : (
                                                        <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg text-xs font-medium text-gray-600">
                                                            <Users className="w-3.5 h-3.5 text-gray-400" />
                                                            <span>0</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100">
                                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                                <span className="text-xs font-bold text-gray-900">{rating}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-sm text-gray-500 mb-5">
                                            <span>{collaborations} collaborations</span>
                                            {isVerified && (
                                                <span className="text-[#fc826f] font-medium text-xs bg-[#fc826f]/10 px-2 py-1 rounded-full">Verified</span>
                                            )}
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