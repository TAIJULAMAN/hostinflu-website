import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const influencers = [
    {
        id: 1,
        name: "Sofia Martins",
        role: "Lifestyle & Travel",
        avatar: "https://avatar.iran.liara.run/public/65",
        isFounder: true,
        followers: "35K", // Note: Design image had labels swapped or specific values, aligning with "Followers" label usually having K
        collaborations: "35",
    },
    {
        id: 2,
        name: "Kevin Lim",
        role: "Tech + Travel",
        avatar: "https://avatar.iran.liara.run/public/25",
        isFounder: false,
        followers: "95K",
        collaborations: "22",
    },
    {
        id: 3,
        name: "Anika Rahman",
        role: "Fashion & Lifestyle",
        avatar: "https://avatar.iran.liara.run/public/55",
        isFounder: false,
        followers: "120K",
        collaborations: "40",
    },
    {
        id: 4,
        name: "Luca Bianchi",
        role: "Food & Travel",
        avatar: "https://avatar.iran.liara.run/public/15",
        isFounder: false,
        followers: "75K",
        collaborations: "18",
    },
];

export default function TopInfluencer() {
    return (
        <section className="py-20 bg-gray-50/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Top Influencers
                    </h2>
                    <p className="text-gray-500">
                        Meet our most active and high-performing influencers
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {influencers.map((influencer) => (
                        <div
                            key={influencer.id}
                            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
                        >
                            {/* Avatar */}
                            <div className="relative w-24 h-24 mb-4">
                                <Avatar className="w-full h-full border-4 border-white shadow-sm">
                                    <AvatarImage
                                        src={influencer.avatar}
                                        className="object-cover"
                                    />
                                    <AvatarFallback>{influencer.name[0]}</AvatarFallback>
                                </Avatar>
                            </div>

                            {/* Name & Role */}
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                {influencer.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-3">{influencer.role}</p>

                            {/* Badge */}
                            {influencer.isFounder && (
                                <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-50 border-none mb-6 font-normal text-xs px-3 py-1">
                                    <span className="mr-1">👑</span> Founder Member
                                </Badge>
                            )}
                            {!influencer.isFounder && <div className="h-7 mb-6"></div>}

                            {/* Stats */}
                            <div className="w-full space-y-2 mb-6">
                                <div className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2">
                                    <span className="text-xs text-gray-500">Followers</span>
                                    <span className="text-sm font-bold text-gray-900">
                                        {influencer.followers}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2">
                                    <span className="text-xs text-gray-500">Collaborations</span>
                                    <span className="text-sm font-bold text-gray-900">
                                        {influencer.collaborations}
                                    </span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <Button className="w-full bg-gray-900 hover:bg-black text-white font-medium rounded-lg h-10 mt-auto">
                                View Influencer Profile
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}