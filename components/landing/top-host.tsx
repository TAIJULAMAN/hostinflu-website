import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Building2, Home, Hotel, Tent } from "lucide-react";

const hosts = [
    {
        id: 1,
        name: "Adam Lewis",
        location: "Kuala Lumpur • Malaysia",
        role: "Founder Member",
        image: "/hero1.png", // Placeholder
        rating: "4.9",
        deals: "28 deals",
        propertyType: "Luxury Apartment",
        propertyIcon: <Building2 className="w-3 h-3" />,
    },
    {
        id: 2,
        name: "Maria Sanchez",
        location: "Barcelona • Spain",
        role: "Founder Member", // Assuming based on design consistency or lack thereof, image shows no badge for others but let's stick to data structure
        image: "/hero1.png",
        rating: "4.8",
        deals: "21 deals",
        propertyType: "Beach Resort",
        propertyIcon: <Tent className="w-3 h-3" />, // Using Tent as proxy for resort/holiday
    },
    {
        id: 3,
        name: "Hasan Rahman",
        location: "Dubai • UAE",
        role: "Founder Member",
        image: "/hero1.png",
        rating: "4.7",
        deals: "19 deals",
        propertyType: "Boutique Villa",
        propertyIcon: <Home className="w-3 h-3" />,
    },
    {
        id: 4,
        name: "Emily Carter",
        location: "London • UK",
        role: "Founder Member",
        image: "/hero1.png",
        rating: "4.9",
        deals: "32 deals",
        propertyType: "Urban Studio",
        propertyIcon: <Hotel className="w-3 h-3" />,
    },
];

export default function TopHost() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Discover Our Highest-Rated Hosts
                    </h2>
                    <p className="text-gray-500">
                        Meet our most trusted and experienced property hosts
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {hosts.map((host) => (
                        <div
                            key={host.id}
                            className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
                        >
                            {/* Host Image */}
                            <div className="relative w-full aspect-[4/3] mb-4 rounded-xl overflow-hidden">
                                <Image
                                    src={host.image}
                                    alt={host.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Name & Location */}
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                {host.name}
                            </h3>
                            <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-3">
                                <MapPin className="w-3 h-3" />
                                <span>{host.location}</span>
                            </div>

                            {/* Badge (Conditional based on design, showing for first one mainly but let's make it data driven) */}
                            {host.id === 1 && (
                                <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-50 border-none mb-3 font-normal text-xs px-3 py-1">
                                    <span className="mr-1">👑</span> {host.role}
                                </Badge>
                            )}

                            {/* Rating */}
                            <div className="flex items-center gap-2 text-sm mb-3">
                                <div className="flex items-center gap-1 font-semibold text-gray-900">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    {host.rating}
                                </div>
                                <span className="text-gray-300">•</span>
                                <span className="text-gray-500">{host.deals}</span>
                            </div>

                            {/* Property Type */}
                            <div className="bg-gray-100 rounded-lg px-3 py-2 flex items-center gap-2 text-xs text-gray-600 mb-6 w-full justify-center">
                                {host.propertyIcon}
                                {host.propertyType}
                            </div>

                            {/* Action Button */}
                            <Button className="w-full bg-teal-400 hover:bg-teal-500 text-white font-medium rounded-lg h-10 mt-auto">
                                View Host Profile
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}