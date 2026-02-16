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
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/Redux/api/auth/authApi";

const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
    const router = useRouter();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
    });

    const onSubmit = async (data: ChangePasswordFormValues) => {
        try {
            await changePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword
            }).unwrap();

            toast.success("Password changed successfully");
            reset();
            router.push("/profile");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to change password. Please try again.");
        }
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
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                {/* Current Password */}
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Current Password</Label>
                                    <div className="relative mt-1">
                                        <Input
                                            type={showCurrentPassword ? "text" : "password"}
                                            placeholder="Enter current password"
                                            className={`pr-10 ${errors.currentPassword ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                            {...register("currentPassword")}
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
                                    {errors.currentPassword && (
                                        <p className="text-sm text-red-500 mt-1">{errors.currentPassword.message}</p>
                                    )}
                                </div>

                                {/* New Password */}
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">New Password</Label>
                                    <div className="relative mt-1">
                                        <Input
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="Enter new password"
                                            className={`pr-10 ${errors.newPassword ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                            {...register("newPassword")}
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
                                    {errors.newPassword && (
                                        <p className="text-sm text-red-500 mt-1">{errors.newPassword.message}</p>
                                    )}
                                </div>

                                {/* Confirm New Password */}
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Confirm New Password</Label>
                                    <div className="relative mt-1">
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm new password"
                                            className={`pr-10 ${errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                            {...register("confirmPassword")}
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
                                    {errors.confirmPassword && (
                                        <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                                    )}
                                </div>


                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <Link href="/profile" className="flex-1">
                                        <Button variant="outline" className="w-full" type="button">
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-teal-500 hover:bg-teal-600 text-white"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Updating...
                                            </>
                                        ) : "Update Password"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    );
}
