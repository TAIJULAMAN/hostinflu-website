"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff, CheckCircle2, Badge } from "lucide-react";

export default function ChangePasswordPage() {
    const router = useRouter();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate save operation
        setTimeout(() => {
            setIsSaving(false);
            router.push("/profile");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-4 py-8 max-w-2xl">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/profile">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Change Password</h1>
                    </div>

                    <Card className="border-gray-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="space-y-5">
                                {/* Current Password */}
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Current Password</Label>
                                    <div className="relative mt-1">
                                        <Input
                                            type={showCurrentPassword ? "text" : "password"}
                                            placeholder="Enter current password"
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showCurrentPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* New Password */}
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">New Password</Label>
                                    <div className="relative mt-1">
                                        <Input
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="Enter new password"
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showNewPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm New Password */}
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Confirm New Password</Label>
                                    <div className="relative mt-1">
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm new password"
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>


                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <Link href="/profile" className="flex-1">
                                        <Button variant="outline" className="w-full">
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button
                                        className="flex-1 bg-teal-500 hover:bg-teal-600 text-white"
                                        onClick={handleSave}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? "Updating..." : "Update Password"}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    );
}
