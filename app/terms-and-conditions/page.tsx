"use client";

import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Card, CardContent } from "@/components/ui/card";
import { useGetTermsAndConditionsQuery } from "@/Redux/api/termsApi";
import { Spinner } from "@/components/ui/spinner";

export default function TermsAndConditionsPage() {
    const { data: termsData, isLoading } = useGetTermsAndConditionsQuery({});
    const terms = termsData?.data?.[0];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
                    <p className="text-gray-600 mb-8">Please read these terms and conditions carefully before using our service.</p>

                    <Card className="border-gray-200 shadow-sm">
                        <CardContent className="p-8 space-y-8">
                            {isLoading ? (
                                <div className="flex justify-center items-center py-20">
                                    <Spinner className="w-10 h-10 text-teal-600" />
                                </div>
                            ) : terms ? (
                                <div
                                    className="prose max-w-none text-gray-700 space-y-4"
                                    dangerouslySetInnerHTML={{ __html: terms.description }}
                                />
                            ) : (
                                <div className="text-center py-20 text-gray-500">
                                    No terms and conditions found.
                                </div>
                            )}

                            {/* Last Updated - only show if we have a date from backend or fallback */}
                            {terms?.updatedAt && (
                                <div className="pt-6 border-t border-gray-200 mt-8">
                                    <p className="text-sm text-gray-500">
                                        <strong>Last Updated:</strong> {new Date(terms.updatedAt).toLocaleDateString()}
                                    </p>
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
