import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function Pricing() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-4">Simple Pricing</h2>
                    <p className="text-lg text-muted-foreground">Choose the plan that works for you</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {/* Regular Plan */}
                    <Card className="p-8 border-2 border-border bg-white">
                        <h3 className="text-xl font-bold text-foreground mb-2">Regular</h3>
                        <p className="text-4xl font-bold text-foreground mb-6">
                            $29<span className="text-lg text-muted-foreground">/mo</span>
                        </p>
                        <ul className="space-y-3 mb-8">
                            {["Unlimited collaborations", "Built-in messaging", "Monthly analytics", "Priority support"].map(
                                (item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-foreground">
                                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                                        {item}
                                    </li>
                                ),
                            )}
                        </ul>
                        <Button variant="outline" className="w-full border-2 bg-transparent">
                            Get Started
                        </Button>
                    </Card>

                    {/* Premium Plan */}
                    <Card className="p-8 border-2 border-primary bg-primary/5">
                        <div className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold mb-4">
                            Most Popular
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">Premium</h3>
                        <p className="text-4xl font-bold text-foreground mb-6">
                            $99<span className="text-lg text-muted-foreground">/mo</span>
                        </p>
                        <ul className="space-y-3 mb-8">
                            {["Everything in Regular", "Advanced analytics", "Custom branding", "Dedicated support"].map(
                                (item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-foreground">
                                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                                        {item}
                                    </li>
                                ),
                            )}
                        </ul>
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
                    </Card>
                </div>
            </div>
        </section>
    )
}
