import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Building2, Home, Hotel, Tent, User } from "lucide-react";
import { useTopHostsQuery } from "@/Redux/api/user/userApi";
import { Spinner } from "@/components/ui/spinner";
import { imgUrl } from "@/config/envConfig";

export default function TopHost() {
    const { data, isLoading, isError } = useTopHostsQuery({});
    const hostsData = Array.isArray(data) ? data : data?.data?.hosts || [];

    if (isLoading) {
        return (
            <section className="py-24 bg-white flex justify-center items-center min-h-[400px]">
                <Spinner className="w-10 h-10 text-teal-600" />
            </section>
        );
    }

    if (isError) {
        return (
            <section className="py-24 bg-white text-center text-red-500">
                <p>Failed to load hosts. Please try again later.</p>
            </section>
        );
    }


    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Discover Our Hosts
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Meet our most trusted and experienced property hosts who are ready to collaborate.
                    </p>
                </div>

                {hostsData.length === 0 ? (
                    <div className="text-center text-gray-500">No hosts found.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {hostsData?.map((host: any, index: number) => {
                            const hostName = host?.name || "N/A";
                            const location = host.fullAddress || "N/A";
                            const image = host?.profileImg ? `${imgUrl}${host.profileImg}` : "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80";

                            const rating = host.rating || "N/A";
                            const deals = host.deals ? `${host.deals} deals` : "0 deals";

                            return (
                                <div
                                    key={host._id || host.id || index}
                                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
                                >
                                    {/* Host Image - Full Width */}
                                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={image}
                                            alt={hostName}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                                        {index === 0 && (
                                            <div className="absolute top-3 right-3">
                                                <Badge className="bg-white/90 backdrop-blur-md text-orange-600 border-none shadow-sm font-medium text-xs px-2.5 py-1">
                                                    <span className="mr-1">👑</span> Top Host
                                                </Badge>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                                                    {hostName}
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
                                            <span>{deals}</span>
                                            <span className="text-teal-600 font-medium text-xs bg-teal-50 px-2 py-1 rounded-full">Verified Host</span>
                                        </div>

                                        {/* Action Button */}
                                        <Link href={`/hosts/${host._id || host.id}`} className="mt-auto w-full">
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
        </section>
    );
}