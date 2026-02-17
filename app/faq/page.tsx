"use client";

import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Card, CardContent } from "@/components/ui/card";
import { useGetFaqQuery } from "@/Redux/api/faq/faqApi";
import { Spinner } from "@/components/ui/spinner";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FaqPage() {
    const { data: faqData, isLoading } = useGetFaqQuery({});


    const faq = faqData?.data?.faqs;
    console.log(faq);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
                    <p className="text-gray-600 mb-8">Find answers to common questions about Hostinflu.</p>

                    <Card className="border-gray-200 shadow-sm">
                        <CardContent className="p-8 space-y-8">
                            {isLoading ? (
                                <div className="flex justify-center items-center py-20">
                                    <Spinner className="w-10 h-10 text-teal-600" />
                                </div>
                            ) : faq && faq.length > 0 ? (
                                <Accordion type="single" collapsible className="w-full">
                                    {faq.map((item: any) => (
                                        <AccordionItem key={item._id} value={item._id}>
                                            <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-teal-600 transition-colors">
                                                {item.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-gray-600">
                                                {item.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            ) : (
                                <div className="text-center py-20 text-gray-500">
                                    No FAQ content found.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    );
}
