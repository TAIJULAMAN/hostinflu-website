import { Smile, PaintRoller, LayoutGrid, MessageSquareText } from "lucide-react";

const steps = [
    {
        icon: <Smile className="w-8 h-8 text-white" />,
        title: "Host Lists Property",
        description:
            "Create your listing and set collaboration preferences.",
    },
    {
        icon: <PaintRoller className="w-8 h-8 text-white" />,
        title: "Influencer Applies",
        description:
            "Browse properties and submit collaboration proposals.",
    },
    {
        icon: <LayoutGrid className="w-8 h-8 text-white" />,
        title: "Contract & Collaborate",
        description:
            "Agree on terms and start creating amazing content.",
    },
    {
        icon: <MessageSquareText className="w-8 h-8 text-white" />,
        title: "Review & Earn",
        description:
            "Complete collaboration and earn credits or bookings.",
    },
];

export function HowItWorks() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Get started with HostInflu in four simple steps. Connect, collaborate, and grow your presence.
                    </p>
                </div>

                <div className="relative">
                    <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-teal-200 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center group">
                                {/* Icon Box */}
                                <div className="w-24 h-24 bg-teal-500 rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-teal-100 transition-transform duration-300 group-hover:-translate-y-2">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {step.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed text-sm px-4">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
