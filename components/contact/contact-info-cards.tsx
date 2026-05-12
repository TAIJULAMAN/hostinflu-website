import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export const ContactInfoCards = () => {
    return (
        <div className="lg:col-span-1 space-y-6">
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
    );
};
