"use client";

import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Card, CardContent } from "@/components/ui/card";
import { useGetPrivacyQuery } from "@/Redux/api/privacyApi";
import { Spinner } from "@/components/ui/spinner";

export default function PrivacyPolicyPage() {
    const { data: privacyData, isLoading } = useGetPrivacyQuery({});
    const privacyPolicy = privacyData?.data?.[0];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                    <p className="text-gray-600 mb-8">Please read our privacy policy carefully to understand how we handle your data.</p>

                    <Card className="border-gray-200 shadow-sm">
                        <CardContent className="p-8 space-y-8">
                            {isLoading ? (
                                <div className="flex justify-center items-center py-20">
                                    <Spinner className="w-10 h-10 text-teal-600" />
                                </div>
                            ) : privacyPolicy ? (
                                <div
                                    className="prose max-w-none text-gray-700 space-y-4"
                                    dangerouslySetInnerHTML={{ __html: privacyPolicy.description }}
                                />
                            ) : (
                                <div className="text-center py-20 text-gray-500">
                                    No privacy policy found.
                                </div>
                            )}

                            {/* Last Updated - only show if we have a date from backend or fallback */}
                            {privacyPolicy?.updatedAt && (
                                <div className="pt-6 border-t border-gray-200 mt-8">
                                    <p className="text-sm text-gray-500">
                                        <strong>Last Updated:</strong> {new Date(privacyPolicy.updatedAt).toLocaleDateString()}
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
