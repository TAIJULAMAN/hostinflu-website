"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/commom/pageHeading";
import Link from "next/link";
import { Navbar } from "@/components/commom/navbar";
import { Footer } from "@/components/commom/footer";
import { useMyVerifiedListingsQuery } from "@/Redux/api/host/list/listApi";
import { useCollaborationRequestMutation } from "@/Redux/api/collaboration/collaborationApi";
import { toast } from "sonner";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Loader2 } from "lucide-react";
import { DeliverablesSection } from "@/components/collaboration/deliverables-section";
import { CompensationSection } from "@/components/collaboration/compensation-section";
import { ScheduleSection } from "@/components/collaboration/schedule-section";
import { CollaborationBasics } from "@/components/collaboration/collaboration-basics";
import { SuccessModal } from "@/components/collaboration/success-modal";

export default function CollaborationEditPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const availableNights = Number(searchParams.get("nightCredits")) || 0;
    const [contentCount, setContentCount] = useState(2);
    const [nightCount, setNightCount] = useState(availableNights > 0 ? Math.min(1, availableNights) : 0);
    const [guestCount, setGuestCount] = useState(2);
    const [compensationTypes, setCompensationTypes] = useState<string[]>(
        availableNights > 0 ? ["nights", "payment", "guests"] : ["payment", "guests"]
    );
    const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date("2024-06-15"));
    const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(new Date("2024-06-18"));
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [contentType, setContentType] = useState<string>("post");
    const [addedDeliverables, setAddedDeliverables] = useState<
        { platform: string; contentType: string; count: number }[]
    >([
        { platform: "Instagram", contentType: "reel", count: 2 },
        { platform: "TikTok", contentType: "video", count: 1 },
    ]);
    const [open, setOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState<string>(searchParams.get("listingId") || "");
    const [description, setDescription] = useState(searchParams.get("description") || "");
    const [addAirbnbLink, setAddAirbnbLink] = useState("");
    const [checkInTime, setCheckInTime] = useState("10:00 PM");
    const [checkOutTime, setCheckOutTime] = useState("12:00 PM");
    const [paymentAmount, setPaymentAmount] = useState("500");

    const router = useRouter();

    const [collaborationRequest, { isLoading: isSubmitting }] = useCollaborationRequestMutation();
    const { data: listingsData, isLoading: listingsLoading } = useMyVerifiedListingsQuery(undefined);
    
    const fetchedListings = listingsData?.data?.listings || [];
    const listings = [...fetchedListings];
    const listingIdParam = searchParams.get("listingId");
    const titleParam = searchParams.get("title");
    
    if (listingIdParam && titleParam && !listings.find(l => l._id === listingIdParam)) {
        listings.push({ _id: listingIdParam, title: titleParam });
    }

    const handleAddDeliverable = () => {
        if (selectedPlatform && contentType && contentCount > 0) {
            setAddedDeliverables((prev) => [
                ...prev,
                {
                    platform: selectedPlatform,
                    contentType,
                    count: contentCount,
                },
            ]);
            setSelectedPlatform(null);
            setContentType("post");
            setContentCount(1);
        }
    };

    const handleRemoveDeliverable = (index: number) => {
        setAddedDeliverables((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        if (!selectedListing) {
            toast.error("Please select a listing");
            return;
        }

        if (addedDeliverables.length === 0) {
            toast.error("Please add at least one deliverable");
            return;
        }

        if (compensationTypes.includes("nights") && availableNights > 0 && nightCount > availableNights) {
            toast.error(`Maximum available night credits is ${availableNights}`);
            return;
        }

        if (!checkInDate || !checkOutDate) {
            toast.error("Please select both check-in and check-out dates");
            return;
        }

        const combineDateTime = (date: Date, timeStr: string) => {
            const [time, modifier] = timeStr.split(" ");
            let [hours, minutes] = time.split(":").map(Number);
            if (modifier === "PM" && hours < 12) hours += 12;
            if (modifier === "AM" && hours === 12) hours = 0;

            const newDate = new Date(date);
            newDate.setHours(hours, minutes, 0, 0);
            return newDate.toISOString();
        };

        const payload = {
            title: selectedListing,
            description,
            addAirbnbLink,
            inTimeAndDate: combineDateTime(checkInDate, checkInTime),
            outTimeAndDate: combineDateTime(checkOutDate, checkOutTime),
            compensation: {
                nightCredits: compensationTypes.includes("nights"),
                numberOfNights: nightCount,
                directPayment: compensationTypes.includes("payment"),
                paymentAmount: paymentAmount,
            },
            guestCount: compensationTypes.includes("guests") ? guestCount : 0,
            deliverables: addedDeliverables.map(d => ({
                platform: d.platform.toLowerCase(),
                contentType: d.contentType.charAt(0).toUpperCase() + d.contentType.slice(1),
                quantity: d.count
            })),
            startDate: checkInDate.toISOString(),
            endDate: checkOutDate.toISOString(),
        };

        try {
            const res = await collaborationRequest({ id: id, body: payload }).unwrap();
            console.log("res", res);
            setOpen(true);
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to send collaboration request");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto py-20">
                <div className="mb-10 text-center">
                    <PageHeading title="Collaboration Request" />
                </div>

                <div className="space-y-5">
                    <div className="flex flex-col md:flex-row gap-5">
                        <section className="w-full space-y-5">
                            <CollaborationBasics
                                selectedListing={selectedListing}
                                setSelectedListing={setSelectedListing}
                                listingsLoading={listingsLoading}
                                listings={listings}
                                description={description}
                                setDescription={setDescription}
                                addAirbnbLink={addAirbnbLink}
                                setAddAirbnbLink={setAddAirbnbLink}
                            />
                            <ScheduleSection
                                checkInTime={checkInTime}
                                setCheckInTime={setCheckInTime}
                                checkInDate={checkInDate}
                                setCheckInDate={setCheckInDate}
                                checkOutTime={checkOutTime}
                                setCheckOutTime={setCheckOutTime}
                                checkOutDate={checkOutDate}
                                setCheckOutDate={setCheckOutDate}
                            />
                            <CompensationSection
                                compensationTypes={compensationTypes}
                                setCompensationTypes={setCompensationTypes}
                                availableNights={availableNights}
                                nightCount={nightCount}
                                setNightCount={setNightCount}
                                paymentAmount={paymentAmount}
                                setPaymentAmount={setPaymentAmount}
                                guestCount={guestCount}
                                setGuestCount={setGuestCount}
                            />
                        </section>
                        <DeliverablesSection
                            selectedPlatform={selectedPlatform}
                            setSelectedPlatform={setSelectedPlatform}
                            contentType={contentType}
                            setContentType={setContentType}
                            contentCount={contentCount}
                            setContentCount={setContentCount}
                            addedDeliverables={addedDeliverables}
                            handleAddDeliverable={handleAddDeliverable}
                            handleRemoveDeliverable={handleRemoveDeliverable}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                    <Button 
                        className="bg-gray-200 hover:bg-gray-300 text-gray-600"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-teal-500 hover:bg-teal-600 text-white min-w-[140px]"
                        onClick={handleSave}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Sending...
                            </div>
                        ) : (
                            "Send Request"
                        )}
                    </Button>
                </div>
                <SuccessModal
                    open={open}
                    setOpen={setOpen}
                    onDone={() => {
                        if (user?.role === "influencer") {
                            router.push("/deals");
                        } else if (user?.role === "host") {
                            router.push("/influencers");
                        }
                    }}
                />
            </div>
            <Footer />
        </>
    );
}
