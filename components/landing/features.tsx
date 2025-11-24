import { Shield, MessageSquare, Award, Zap } from "lucide-react"

export function Features() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-4">Powerful Features</h2>
                    <p className="text-lg text-muted-foreground">Everything you need to succeed</p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        { icon: Shield, title: "Secure Verification", description: "Identity verification for all users" },
                        { icon: MessageSquare, title: "Built-in Messaging", description: "Communicate directly on platform" },
                        { icon: Award, title: "Smart Contracts", description: "Automated agreements with terms" },
                        { icon: Zap, title: "Night Credit System", description: "Flexible compensation options" },
                    ].map((item, idx) => (
                        <div key={idx} className="text-center group hover:scale-105 transition-transform duration-300 border border-gray-200 shadow-md hover:shadow-lg rounded-2xl p-5">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#5CC7BD]/20 mb-6 group-hover:bg-[#5CC7BD]/30 transition-colors">
                                <item.icon className="w-8 h-8 text-[#5CC7BD]" />
                            </div>
                            <h3 className="font-bold text-lg text-foreground mb-3">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
