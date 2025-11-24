import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function Testimonials() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-4">What Our Users Say</h2>
                    <p className="text-lg text-muted-foreground">Real experiences from hosts and influencers.</p>
                </div>

                <div className="grid md:grid-cols-4 gap-5">
                    {[
                        {
                            name: "Sarah Johnson",
                            role: "Airbnb Host",
                            text: "Hostinflu helped me connect with amazing influencers and boost my bookings significantly!",
                            initials: "SJ",
                        },
                        {
                            name: "Marcus Chen",
                            role: "Travel Influencer",
                            text: "As a creator, I found real monetization opportunities here that actually work.",
                            initials: "MC",
                        },
                        {
                            name: "David Rodriguez",
                            role: "Property Manager",
                            text: "This platform provides authentic content and guest reviews - total game changer.",
                            initials: "DR",
                        },
                        {
                            name: "John Doe",
                            role: "Airbnb Host",
                            text: "Hostinflu helped me connect with amazing influencers and boost my bookings significantly!",
                            initials: "JD",
                        },
                    ].map((item, idx) => (
                        <Card
                            key={idx}
                            className="p-5 bg-white border border-gray-200 shadow-md hover:shadow-lg rounded-2xl hover:scale-105 transition-transform duration-300"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-foreground mb-6 italic">"{item.text}"</p>
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={`https://avatar.iran.liara.run/public/${idx + 1}`} alt={item.name} />
                                    <AvatarFallback>{item.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold text-foreground">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">{item.role}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
