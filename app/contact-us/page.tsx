"use client";

import { useState } from "react";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactUsPage() {
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        // Simulate sending
        setTimeout(() => {
            setIsSending(false);
            alert("Message sent successfully! We'll get back to you soon.");
        }, 1000);
    };

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
                        {/* Contact Information Cards */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Email Card */}
                            <Card className="border-gray-200 shadow-sm">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-6 h-6 text-teal-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                                            <p className="text-sm text-gray-600 mb-2">Our team is here to help</p>
                                            <a href="mailto:support@hostinflu.com" className="text-teal-600 hover:text-teal-700 font-medium text-sm">
                                                support@hostinflu.com
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Phone Card */}
                            <Card className="border-gray-200 shadow-sm">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                                            <p className="text-sm text-gray-600 mb-2">Mon-Fri from 8am to 5pm</p>
                                            <a href="tel:+15551234567" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                                +1 (555) 123-4567
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Office Card */}
                            <Card className="border-gray-200 shadow-sm">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                                            <p className="text-sm text-gray-600 mb-2">Come say hello at our office</p>
                                            <p className="text-sm text-gray-700">
                                                123 Business Street<br />
                                                Los Angeles, CA 90210<br />
                                                United States
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card className="border-gray-200 shadow-sm">
                                <CardContent className="p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700">First Name *</Label>
                                                <Input
                                                    required
                                                    placeholder="John"
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div>
                                                <Label className="text-sm font-medium text-gray-700">Last Name *</Label>
                                                <Input
                                                    required
                                                    placeholder="Doe"
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700">Email Address *</Label>
                                            <Input
                                                type="email"
                                                required
                                                placeholder="john.doe@example.com"
                                                className="mt-1"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                                            <Input
                                                type="tel"
                                                placeholder="+1 (555) 123-4567"
                                                className="mt-1"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700">Subject *</Label>
                                            <Select required>
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue placeholder="Select a subject" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="general">General Inquiry</SelectItem>
                                                    <SelectItem value="support">Technical Support</SelectItem>
                                                    <SelectItem value="billing">Billing Question</SelectItem>
                                                    <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                                                    <SelectItem value="feedback">Feedback</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700">Message *</Label>
                                            <Textarea
                                                required
                                                rows={6}
                                                placeholder="Tell us how we can help you..."
                                                className="mt-1 resize-none"
                                            />
                                        </div>

                                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                                            <p className="text-sm text-blue-700">
                                                <strong>Note:</strong> We typically respond within 24 hours during business days. For urgent matters, please call us directly.
                                            </p>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 flex items-center justify-center gap-2"
                                            disabled={isSending}
                                        >
                                            {isSending ? (
                                                "Sending..."
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-12">
                        <Card className="border-gray-200 shadow-sm">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">How quickly will I get a response?</h3>
                                        <p className="text-sm text-gray-600">
                                            We aim to respond to all inquiries within 24 hours during business days. Urgent matters are prioritized.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">What information should I include?</h3>
                                        <p className="text-sm text-gray-600">
                                            Please provide as much detail as possible about your inquiry to help us assist you better.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Can I schedule a call?</h3>
                                        <p className="text-sm text-gray-600">
                                            Yes! Mention your preferred time in the message, and we'll coordinate a call with you.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Do you offer live chat support?</h3>
                                        <p className="text-sm text-gray-600">
                                            Live chat is available for logged-in users. Visit your dashboard to access it.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
