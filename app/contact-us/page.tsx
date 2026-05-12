import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { ContactInfoCards } from "@/components/contact/contact-info-cards";
import { ContactForm } from "@/components/contact/contact-form";

export default function ContactUsPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">Contact Us</h1>
                        <p className="text-gray-600 text-lg">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <ContactInfoCards />
                        <ContactForm />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
