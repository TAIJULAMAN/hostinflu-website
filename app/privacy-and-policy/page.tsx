"use client";

import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
                    <p className="text-gray-600 mb-8">Please read these terms and conditions carefully before using our service.</p>

                    <Card className="border-gray-200 shadow-sm">
                        <CardContent className="p-8 space-y-8">
                            {/* Terms of Service */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Terms of Service</h2>
                                <div className="space-y-3 text-gray-700">
                                    <p className="font-semibold">1.1 Acceptance of Terms</p>
                                    <p>By accessing and using Hostinflu, you accept and agree to be bound by the terms and provision of this agreement.</p>

                                    <p className="font-semibold mt-4">1.2 Use License</p>
                                    <p>Permission is granted to temporarily access the materials on Hostinflu for personal, non-commercial transitory viewing only.</p>
                                </div>
                            </section>

                            {/* User Accounts */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. User Accounts</h2>
                                <div className="space-y-3 text-gray-700">
                                    <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms.</p>
                                    <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</p>
                                </div>
                            </section>

                            {/* Host Responsibilities */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Host Responsibilities</h2>
                                <div className="space-y-3 text-gray-700">
                                    <p className="font-semibold">3.1 Listing Accuracy</p>
                                    <p>Hosts must ensure that all property listings are accurate, complete, and up-to-date. This includes property descriptions, amenities, photos, and availability.</p>

                                    <p className="font-semibold mt-4">3.2 Collaboration Terms</p>
                                    <p>Hosts must honor all collaboration agreements made through the platform and provide the agreed-upon accommodations and services.</p>

                                    <p className="font-semibold mt-4">3.3 Payment Processing</p>
                                    <p>Hosts agree to the platform's payment processing terms and understand that payments may be held in escrow until collaboration completion.</p>
                                </div>
                            </section>

                            {/* Influencer Responsibilities */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Influencer Responsibilities</h2>
                                <div className="space-y-3 text-gray-700">
                                    <p className="font-semibold">4.1 Content Creation</p>
                                    <p>Influencers must deliver all agreed-upon content within the specified timeframes and meet the quality standards outlined in collaboration agreements.</p>

                                    <p className="font-semibold mt-4">4.2 Authenticity</p>
                                    <p>All content must be authentic and comply with FTC guidelines and local advertising regulations regarding sponsored content disclosure.</p>

                                    <p className="font-semibold mt-4">4.3 Professional Conduct</p>
                                    <p>Influencers must maintain professional conduct during stays and collaborations, respecting property rules and host requirements.</p>
                                </div>
                            </section>

                            {/* Transactions and Payments */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Transactions and Payments</h2>
                                <div className="space-y-3 text-gray-700">
                                    <p className="font-semibold">5.1 Service Fees</p>
                                    <p>Hostinflu charges service fees for facilitating collaborations. These fees are clearly disclosed before any transaction is completed.</p>

                                    <p className="font-semibold mt-4">5.2 Payment Terms</p>
                                    <p>Payments are processed through secure third-party payment processors. Users agree to the terms of these payment processors.</p>

                                    <p className="font-semibold mt-4">5.3 Refunds and Cancellations</p>
                                    <p>Refund and cancellation policies are determined by individual collaboration agreements and platform policies.</p>
                                </div>
                            </section>

                            {/* Content and Intellectual Property */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Content and Intellectual Property</h2>
                                <div className="space-y-3 text-gray-700">
                                    <p className="font-semibold">6.1 User Content</p>
                                    <p>Users retain ownership of content they create and upload to the platform. By uploading content, users grant Hostinflu a license to use, display, and distribute this content on the platform.</p>

                                    <p className="font-semibold mt-4">6.2 Platform Content</p>
                                    <p>All platform features, functionality, and content are owned by Hostinflu and are protected by copyright, trademark, and other intellectual property laws.</p>
                                </div>
                            </section>

                            {/* Prohibited Activities */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Prohibited Activities</h2>
                                <div className="space-y-2 text-gray-700">
                                    <p>Users may not:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Violate any laws or regulations</li>
                                        <li>Infringe on intellectual property rights</li>
                                        <li>Transmit harmful or malicious code</li>
                                        <li>Engage in fraudulent activities</li>
                                        <li>Harass, abuse, or harm other users</li>
                                        <li>Attempt to bypass platform security measures</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Limitation of Liability */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
                                <div className="space-y-3 text-gray-700">
                                    <p>Hostinflu shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>
                                    <p>We do not guarantee the accuracy, completeness, or usefulness of any information on the platform and are not responsible for user-generated content.</p>
                                </div>
                            </section>

                            {/* Dispute Resolution */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Dispute Resolution</h2>
                                <div className="space-y-3 text-gray-700">
                                    <p>Any disputes arising from these terms or use of the platform shall first be attempted to be resolved through good faith negotiations.</p>
                                    <p>If negotiations fail, disputes shall be resolved through binding arbitration in accordance with applicable laws.</p>
                                </div>
                            </section>

                            {/* Changes to Terms */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
                                <div className="space-y-3 text-gray-700">
                                    <p>We reserve the right to modify these terms at any time. We will notify users of any material changes via email or platform notification.</p>
                                    <p>Continued use of the platform after changes constitutes acceptance of the modified terms.</p>
                                </div>
                            </section>

                            {/* Contact Information */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
                                <div className="space-y-2 text-gray-700">
                                    <p>If you have any questions about these Terms & Conditions, please contact us:</p>
                                    <ul className="space-y-1 ml-4">
                                        <li><strong>Email:</strong> legal@hostinflu.com</li>
                                        <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                                        <li><strong>Address:</strong> 123 Business Street, Los Angeles, CA 90210</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Last Updated */}
                            <div className="pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-500">
                                    <strong>Last Updated:</strong> November 29, 2025
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    );
}
