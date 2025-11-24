import { Button } from "@/components/ui/button"

export function ValueProps() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="max-w-7xl mx-auto">
                <section className="px-5lg:px-0 text-foreground">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-4">Start collaboration today!</h2>
                        <p className="text-lg mb-8 opacity-90">
                            Join thousands of hosts and influencers creating authentic connections.
                        </p>
                    </div>
                </section>
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Hosts Card */}
                    <div className="bg-primary/10 border-2 border-primary/20 p-8 rounded-2xl">
                        <h3 className="text-2xl font-bold text-foreground mb-6">Promote your Airbnb effortlessly.</h3>
                        <ul className="space-y-4 mb-8">
                            {["Verified Influencers", "Increased Bookings", "Authentic Content", "Performance Analytics"].map(
                                (item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-foreground">
                                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground">
                                            ✓
                                        </div>
                                        {item}
                                    </li>
                                ),
                            )}
                        </ul>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6">Host a Listing</Button>
                    </div>

                    {/* Influencers Card */}
                    <div className="bg-accent/10 border-2 border-accent/20 p-8 rounded-2xl">
                        <h3 className="text-2xl font-bold text-foreground mb-6">Earn by creating travel content.</h3>
                        <ul className="space-y-4 mb-8">
                            {["Paid Stays", "Brand Sponsorships", "Easy Monetization", "Travel Opportunities"].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-foreground">
                                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-xs text-accent-foreground">
                                        ✓
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-6">Join as Influencer</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
