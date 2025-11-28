"use client";

import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PageHeading } from "@/components/commom/pageHeading";

export default function AddCollaborationPage() {
    const [nights, setNights] = useState(0);
    const [open, setOpen] = useState(false);

    const handleIncrement = () => setNights((prev) => prev + 1);
    const handleDecrement = () => setNights((prev) => Math.max(0, prev - 1));

    return (
        <div className="container mx-auto p-5">
            {/* Header */}
            <div className="flex items-center mb-8">
                <PageHeading title="Add New Collaboration" />
            </div>
            {/* Form */}
            <div className="space-y-6 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                {/* Select influencer */}
                <div className="space-y-2">
                    <Label htmlFor="influencer">Select Influencer</Label>
                    <Select>
                        <SelectTrigger id="influencer" className="w-full">
                            <SelectValue placeholder="Select Influencer" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="michel">Michael Chen</SelectItem>
                            <SelectItem value="shah">Shah Aman</SelectItem>
                            <SelectItem value="john">John Doe</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {/* Select List */}
                <div className="space-y-2">
                    <Label htmlFor="list">Select List</Label>
                    <Select>
                        <SelectTrigger id="list" className="w-full">
                            <SelectValue placeholder="Select List" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="beachfront">Beachfront Apartment – Miami</SelectItem>
                            <SelectItem value="mountain">Mountain Cabin – Aspen</SelectItem>
                            <SelectItem value="city">City Loft – New York</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {/* Select Deal */}
                <div className="space-y-2">
                    <Label htmlFor="deal">Select Deal</Label>
                    <Select>
                        <SelectTrigger id="deal" className="w-full">
                            <SelectValue placeholder="Select Deal" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="beachfront">Beachfront Apartment – Miami</SelectItem>
                            <SelectItem value="mountain">Mountain Cabin – Aspen</SelectItem>
                            <SelectItem value="city">City Loft – New York</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {/* Payment */}
                <div className="space-y-2">
                    <Label htmlFor="payment">Payment</Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <Input id="payment" type="number" placeholder="0.00" className="pl-7" />
                    </div>
                </div>
                {/* Include free stay & Nights */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="free-stay" className="text-sm font-medium text-gray-700">Include free stay?</Label>
                        <Switch id="free-stay" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Number of Nights</Label>
                    <div className="flex items-center justify-between border border-gray-200 rounded-md p-2">
                        <Button variant="ghost" size="icon" onClick={handleDecrement} className="h-8 w-8">
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold text-lg">
                            {nights} <span className="text-sm font-normal text-gray-500">nights</span>
                        </span>
                        <Button variant="ghost" size="icon" onClick={handleIncrement} className="h-8 w-8">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                {/* Dates */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="start-date">Start Date</Label>
                        <Input id="start-date" type="date" className="w-full" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="end-date">End Date</Label>
                        <Input id="end-date" type="date" className="w-full" />
                    </div>
                </div>
                {/* Actions */}
                <div className="mt-10 flex justify-end gap-2">
                    <Button variant="default" className="px-5" onClick={() => setOpen(true)}>
                        Send Request
                    </Button>
                    <Link href="/dashboard/collaborations">
                        <Button variant="destructive" className="w-full" size="lg" >
                            Cancel
                        </Button>
                    </Link>
                </div>
            </div>
            {/* Success Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Collaboration Sent</DialogTitle>
                        <DialogDescription>
                            Your collaboration request has been sent successfully.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
