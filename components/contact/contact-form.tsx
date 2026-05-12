"use client";

import { useState } from "react";
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
import { Send } from "lucide-react";
import { useCreateContactMutation } from "@/Redux/api/contact/contactApi";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const ContactForm = () => {
    const [createContact, { isLoading }] = useCreateContactMutation();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, subject: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formPayload = new FormData();
            formPayload.append("firstName", formData.firstName);
            formPayload.append("lastName", formData.lastName);
            formPayload.append("email", formData.email);
            formPayload.append("phoneNumber", formData.phoneNumber);
            formPayload.append("subject", formData.subject);
            formPayload.append("message", formData.message);

            const res = await createContact(formPayload).unwrap();
            if (res.success) {
                setShowSuccessModal(true);
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    subject: "",
                    message: ""
                });
            }
        } catch (err: any) {
            console.error("Failed to send message:", err);
            const errorMessage = err?.data?.message || "Failed to send message. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
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
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="John"
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label className="text-sm font-medium text-gray-700">Last Name *</Label>
                                <Input
                                    required
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
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
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john.doe@example.com"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                            <Input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="+1 (555) 123-4567"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label className="text-sm font-medium text-gray-700">Subject *</Label>
                            <Select required onValueChange={handleSelectChange} value={formData.subject}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                                    <SelectItem value="Technical Support">Technical Support</SelectItem>
                                    <SelectItem value="Billing Question">Billing Question</SelectItem>
                                    <SelectItem value="Partnership Opportunity">Partnership Opportunity</SelectItem>
                                    <SelectItem value="Feedback">Feedback</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label className="text-sm font-medium text-gray-700">Message *</Label>
                            <Textarea
                                required
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
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
                            disabled={isLoading}
                        >
                            {isLoading ? (
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

            <AlertDialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-teal-600 text-xl flex items-center gap-2">
                            <Send className="w-6 h-6" />
                            Message Sent Successfully!
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600 mt-2">
                            Thank you for contacting us. We have received your message and will get back to you shortly, usually within 24 hours.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4">
                        <AlertDialogAction
                            onClick={() => setShowSuccessModal(false)}
                            className="bg-teal-600 hover:bg-teal-700 text-white"
                        >
                            Okay, Got it
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
