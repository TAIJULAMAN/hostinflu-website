import { Award, Shield, Star, Users, Zap, MessageSquare } from "lucide-react"

export function WhyChoose() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Hostinflu?</h2>
                    <p className="text-lg text-muted-foreground">
                        A trusted collaboration platform connecting professional hosts and verified influencers
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: Award, title: "Verified Influencers", description: "Secure vetting ensures authentic creators" },
                        {
                            icon: Shield,
                            title: "Secure Deals & Payments",
                            description: "Every collaboration generates agreements",
                        },
                        { icon: Star, title: "Smart Credit System", description: "Flexible compensation with transparency" },
                        { icon: Users, title: "Hassle-free Onboarding", description: "Easy setup and account management" },
                        { icon: Zap, title: "Easy Airbnb Verification", description: "Verify Airbnb listings instantly" },
                        { icon: MessageSquare, title: "Transparent Ratings", description: "Rate collaborations openly" },
                    ].map((item, idx) => (
                        <div key={idx} className="p-6 text-center hover:shadow-lg transition rounded-lg">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                                <item.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
