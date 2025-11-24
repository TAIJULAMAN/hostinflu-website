import { Star, Users, MessageSquare, Zap } from "lucide-react"

export function HowItWorks() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
                    <p className="text-lg text-muted-foreground">Simple steps to start collaborating</p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        {
                            icon: Star,
                            title: "Host Lists Property",
                            description: "Create your listing and \n showcase your unique space",
                        },
                        {
                            icon: Users,
                            title: "Influencer Applies",
                            description: "Browse properties and \n submit collaboration requests",
                        },
                        {
                            icon: MessageSquare,
                            title: "Connect & Collaborate",
                            description: "Agree on terms and \n create amazing content",
                        },
                        {
                            icon: Zap,
                            title: "Review & Earn",
                            description: "Get reviews, boost visibility, \n and earn commissions",
                        },
                    ].map((item, idx) => (
                        <div key={idx} className="text-center group hover:scale-105 transition-transform duration-300 border border-gray-200 shadow-md hover:shadow-lg rounded-2xl p-5">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-[#5CC7BD]/20 mb-5 group-hover:bg-[#5CC7BD]/30 transition-colors">
                                <item.icon className="w-8 h-8 text-[#5CC7BD]" />
                            </div>
                            <h3 className="font-bold text-lg text-foreground mb-3">{item.title}</h3>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
