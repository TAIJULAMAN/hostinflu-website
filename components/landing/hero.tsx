import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Image from "next/image"

export function Hero() {
    return (
        <section className="relative overflow-hidden py-20 px-5 lg:px-0 bg-white bg-[radial-gradient(ellipse_100%_100%_at_top_left,rgba(94,234,212,0.5),transparent)] max-h-[70vh]">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
                            Where Airbnb Hosts and <span className="text-blue-500">Influencers Connect.</span>
                        </h1>
                        <p className="max-w-lg text-lg text-muted-foreground">
                            Hostinflu helps you collaborate, grow your audience, and earn through authentic social media
                            partnerships.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-4">
                            <Link href="/signup">
                                <Button size="lg" className="bg-[#5CC7BD] text-white px-10 py-2">
                                    Get Started Free
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 bg-transparent text-[#5CC7BD] border-[#5CC7BD] px-10 py-2"
                            >
                                <Play className="mr-2" />
                                Watch How It Works
                            </Button>
                        </div>
                    </div>

                    <div className="relative h-96 flex items-center justify-center ">
                        <Image src="/hero2.png" alt="Hero" width={500} height={500} />

                        <div className="absolute top-8 right-8 bg-white shadow-lg px-2 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                            5,000+ Active Users
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
