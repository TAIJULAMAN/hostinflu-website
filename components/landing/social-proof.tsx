export function SocialProof() {
    return (
        <section className="py-10 px-5 lg:px-0 bg-white">
            <div className="container mx-auto text-center">
                <p className="text-lg text-muted-foreground mb-4">Trusted by 5,000+ hosts and influencers worldwide</p>
                <div className="flex gap-8 justify-center items-center flex-wrap">
                    {["Airbnb", "Instagram", "TikTok", "YouTube"].map((platform) => (
                        <span key={platform} className="text-[#9CA3AF] font-bold text-2xl font-[600]">
                            {platform}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}
