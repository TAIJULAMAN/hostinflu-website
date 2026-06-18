"use client";

import {
    Calendar,
    MapPin,
    DollarSign,
    CheckCircle2,
    ExternalLink,
    Camera,
    Music,
    Hash,
    Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeading } from "@/components/commom/pageHeading";
import { useParams, useRouter } from "next/navigation";
import { useGetSingleCollaborationQuery } from "@/Redux/api/collaboration/collaborationApi";
import Loader from "@/components/commom/loader";
import { imgUrl } from "@/config/envConfig";
import { useSelector } from "react-redux";
import { useUpdateCollaborationStatusMutation, useCreateNegotiationMutation } from "@/Redux/api/collaboration/collaborationApi";
import { toast } from "sonner";
import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

export default function CollaborationDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: response, isLoading, isError, error } = useGetSingleCollaborationQuery(id);
    const collaboration = response?.data?.[0];
    console.log({ collaboration }, "collaboration");

    const creatorId = collaboration?.userId?._id;
    console.log({ creatorId }, "creatorId");

    const currentUser = useSelector((state: any) => state.auth.user);
    const loggedInUserId = currentUser?._id || currentUser?.id;
    const messageRecipient =
        collaboration?.userId?._id === loggedInUserId
            ? collaboration?.selectInfluencerOrHost
            : collaboration?.userId;

    const [updateStatus, { isLoading: isUpdating }] = useUpdateCollaborationStatusMutation();
    const [createNegotiation, { isLoading: isNegotiating }] = useCreateNegotiationMutation();

    const [isNegotiationModalOpen, setIsNegotiationModalOpen] = useState(false);
    const [negotiationData, setNegotiationData] = useState({
        numberOfNights: 0,
        paymentAmount: "0",
        guestCount: 1,
        negotiationMessage: "",
        deliverables: [] as { platform: string; contentType: string; quantity: number }[],
    });

    const openNegotiationModal = () => {
        setNegotiationData({
            numberOfNights: collaboration?.compensation?.numberOfNights || 0,
            paymentAmount: collaboration?.compensation?.paymentAmount || "0",
            guestCount: collaboration?.guestCount || 1,
            negotiationMessage: "",
            deliverables: collaboration?.deliverables ? collaboration.deliverables.map((d: any) => ({ ...d })) : [],
        });
        setIsNegotiationModalOpen(true);
    };

    const handleNegotiateSubmit = async () => {
        try {
            await createNegotiation({
                id: collaboration?._id || id,
                data: {
                    compensation: {
                        numberOfNights: Number(negotiationData.numberOfNights),
                        paymentAmount: String(negotiationData.paymentAmount),
                    },
                    guestCount: Number(negotiationData.guestCount),
                    negotiationMessage: negotiationData.negotiationMessage,
                    deliverables: negotiationData.deliverables.map((d: any) => ({
                        platform: d.platform,
                        contentType: d.contentType,
                        quantity: Number(d.quantity)
                    })),
                }
            }).unwrap();
            toast.success("Negotiation sent successfully");
            setIsNegotiationModalOpen(false);
        } catch (error: any) {
            console.error("Negotiation error stringified:", JSON.stringify(error, null, 2));
            console.error("Negotiation error raw:", error);
            toast.error(error?.data?.message || error?.error || "Failed to send negotiation");
        }
    };

    const handleUpdateStatus = async (action: string) => {
        const collabId = collaboration?._id || id;
        console.log("SENDING_STATUS_UPDATE:", { id: collabId, action });
        try {
            await updateStatus({ id: collabId, action }).unwrap();
            toast.success(`Collaboration ${action === "accept" ? "accepted" : "rejected"} successfully`);
        } catch (err: any) {
            console.error("STATUS_UPDATE_ERROR:", err);
            toast.error(err?.data?.message || `Failed to ${action} collaboration`);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (isError || !collaboration) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 inline-block">
                    <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
                    <p className="text-gray-600">
                        {(error as any)?.data?.message || "Failed to load collaboration details."}
                    </p>
                    <Button
                        className="mt-4"
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    const status: string = collaboration.status || "pending";

    const getStatusStyles = (status: string) => {
        switch (status.toLowerCase()) {
            case 'accepted':
                return 'bg-green-100 text-green-700 hover:bg-green-100';
            case 'pending':
                return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
            case 'completed':
                return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
            case 'negotiating':
                return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
            case 'rejected':
                return 'bg-red-100 text-red-700 hover:bg-red-100';
            case 'ongoing':
                return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
            default:
                return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="top-0 bg-white border-b border-gray-200 p-5 flex items-center justify-between">
                <PageHeading title="Collaboration Overview" />
                <Badge className={getStatusStyles(status)}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
            </div>

            {/* Main Content */}
            <div className="mx-auto p-6 space-y-6">
                {/* Deal Title & Status */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {collaboration?.title?.title || "N/A"}
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                            Created on {collaboration.createdAt ? new Date(collaboration.createdAt).toLocaleDateString() : "N/A"}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500">Collaboration ID: #{collaboration._id?.slice(-8).toUpperCase() || "N/A"}</span>
                    </div>
                </div>

                {/* Collaborators */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div>
                                <p className="font-semibold text-gray-900">{collaboration.userId?.name || "Host"}</p>
                                <p className="text-sm text-gray-500">{collaboration.userId?.email || "Host"}</p>
                            </div>
                        </div>
                        <div className="text-teal-500 text-2xl">↔</div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">{collaboration.selectInfluencerOrHost?.name || "Influencer"}</p>
                                <p className="text-sm text-gray-500">{collaboration.selectInfluencerOrHost?.email || "Influencer"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Summary Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Stay Dates</p>
                        <p className="text-sm font-medium text-gray-900">
                            {collaboration.startDate ? new Date(collaboration.startDate).toLocaleDateString() : "N/A"} - {collaboration.endDate ? new Date(collaboration.endDate).toLocaleDateString() : "N/A"}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Duration</p>
                        <p className="text-sm font-medium text-gray-900">{collaboration.compensation?.numberOfNights || 0} Nights</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Total Fixed Payment</p>
                        <p className="text-sm font-medium text-gray-900">${collaboration.compensation?.paymentAmount || "0.00"}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Airbnb Link</p>
                        <p className="text-sm font-medium text-teal-600 truncate underline cursor-pointer" onClick={() => collaboration.addAirbnbLink && window.open(collaboration.addAirbnbLink.startsWith('http') ? collaboration.addAirbnbLink : `https://${collaboration.addAirbnbLink}`, '_blank')}>
                            {collaboration.addAirbnbLink || "Not Provided"}
                        </p>
                    </div>
                </div>

                {/* Campaign Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Listing Information */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <h3 className="font-semibold text-gray-900 mb-3">
                                Listing Information
                            </h3>
                            <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                                <img
                                    src={collaboration.imageUrl ? collaboration.imageUrl : (collaboration.title?.images?.[0] ? `${imgUrl}${collaboration.title.images[0]}` : "/list.png")}
                                    alt={collaboration.title?.title || collaboration.description}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h4 className="font-semibold text-gray-900">
                                {collaboration.title?.title || collaboration.description}
                            </h4>
                            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                <MapPin className="w-4 h-4" />
                                <span>{collaboration.title?.location || "Location not specified"}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                {collaboration.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {collaboration.title?.amenities && Object.entries(collaboration.title.amenities)
                                    .filter(([_, value]) => value === true)
                                    .map(([key], i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 bg-gray-50 text-xs text-gray-600 rounded-full capitalize"
                                        >
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </span>
                                    ))}
                            </div>
                            {collaboration.addAirbnbLink && (
                                <Button
                                    variant="outline"
                                    className="w-full mt-3 justify-center gap-2"
                                    onClick={() => window.open(collaboration.addAirbnbLink.startsWith('http') ? collaboration.addAirbnbLink : `https://${collaboration.addAirbnbLink}`, '_blank')}
                                >
                                    View Listing on Airbnb
                                    <ExternalLink className="w-4 h-4" />
                                </Button>
                            )}
                        </div>

                        {/* Campaign Details */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <h3 className="font-semibold text-gray-900 mb-3">
                                Campaign Progress
                            </h3>
                            <div className="space-y-6">
                                {[
                                    {
                                        icon: <DollarSign className="w-5 h-5" />,
                                        title: "Budget Status",
                                        status: collaboration.paymentStatus === "completed" ? "completed" : "pending",
                                        date: collaboration.paymentStatus === "completed" ? "Completed" : "Scheduled",
                                        description: `Budget of $${collaboration.compensation?.paymentAmount || '0.00'} has been ${collaboration.paymentStatus === "completed" ? 'processed' : 'noted'}`,
                                    },
                                    {
                                        icon: <Calendar className="w-5 h-5" />,
                                        title: "Stay Dates",
                                        status: new Date(collaboration.startDate) < new Date() ? "completed" : "pending",
                                        date: `${new Date(collaboration.startDate).toLocaleDateString()} - ${new Date(collaboration.endDate).toLocaleDateString()}`,
                                        description: `Stay duration: ${collaboration.compensation?.numberOfNights || 0} nights`,
                                    },
                                    {
                                        icon: <CheckCircle2 className="w-5 h-5" />,
                                        title: "Content Review",
                                        status: collaboration.deliverableStatus === "approved" ? "completed" : "pending",
                                        date: collaboration.deliverableStatus === "approved" ? "Approved" : "Pending Review",
                                        description: "Status of content submission and review",
                                    },
                                    {
                                        icon: <MapPin className="w-5 h-5" />,
                                        title: "Campaign Status",
                                        status: status === "completed" ? "completed" : "pending",
                                        date: status.toUpperCase(),
                                        description: "Overall status of this collaboration campaign",
                                    },
                                ].map((step, index) => (
                                    <div key={index} className="flex gap-4 relative">
                                        {/* Timeline line */}
                                        {index > 0 && (
                                            <div className="absolute left-[25px] top-0 w-px h-full bg-gray-200 -translate-y-full"></div>
                                        )}

                                        {/* Status indicator */}
                                        <div
                                            className={`relative z-10 flex-shrink-0 w-[50px] h-[50px] rounded flex items-center justify-center ${step.status === "completed"
                                                ? "bg-teal-100 text-teal-600"
                                                : "bg-gray-100 text-gray-400"
                                                }`}
                                        >
                                            {step.status === "completed" && (
                                                <CheckCircle2 className="w-8 h-8" />
                                            )}
                                            {step.status !== "completed" && step.icon}
                                        </div>

                                        {/* Step content */}
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium text-gray-900">
                                                    {step.title}
                                                </h4>
                                                <span
                                                    className={`text-sm ${step.status === "completed"
                                                        ? "text-teal-600"
                                                        : "text-gray-500"
                                                        }`}
                                                >
                                                    {step.date}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                        {/* Assigned Contents */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-900">
                                    Assigned Contents
                                </h3>
                                <Badge
                                    variant="outline"
                                    className="bg-green-100 text-green-700"
                                >
                                    {collaboration.deliverables?.length || 0} Deliverables
                                </Badge>
                            </div>

                            <div className="space-y-3">
                                {collaboration.deliverables?.map((item: any, i: number) => (
                                    <div
                                        key={i}
                                        className={`flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200`}
                                    >
                                        <div
                                            className={`w-12 h-12 rounded flex items-center justify-center text-sm font-bold bg-white border border-gray-300 text-gray-700`}
                                        >
                                            {item.platform?.toLowerCase() === 'instagram' ? <Camera className="w-6 h-6" /> :
                                                item.platform?.toLowerCase() === 'tiktok' ? <Music className="w-6 h-6" /> :
                                                    item.platform?.toLowerCase() === 'youtube' ? <Youtube className="w-6 h-6" /> :
                                                        <Hash className="w-6 h-6" />}
                                        </div>
                                        <div className="">
                                            <p className="font-medium text-gray-900">{item.quantity} {item.contentType} on {item.platform}</p>
                                            <Badge
                                                className={`mt-1 text-xs gap-1 bg-yellow-100 text-yellow-700`}
                                            >
                                                Pending
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>











                        {/* Payment Details */}
                        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-gray-900">Payment Details</h3>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm text-gray-500">Total Amount</p>
                                <p className="text-3xl font-bold text-gray-900">${collaboration?.compensation?.paymentAmount || '0.00'}</p>
                            </div>

                            <div className="flex gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <div className="w-5 h-5 rounded-full bg-teal-100 flex-shrink-0 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Payment will be released automatically after all deliverables
                                    are approved.
                                </p>
                            </div>

                            <div className="pt-2">
                                {collaboration?.status === "accepted" ? (
                                    <Button className="w-full bg-[#fc826f] hover:bg-[#fc826f]/90 text-white py-3 h-auto rounded-lg font-semibold text-center text-base">
                                        Pay Now
                                    </Button>
                                ) : (collaboration?.status === "completed" || collaboration?.status === "ongoing") ? (
                                    <div className="w-full bg-green-100 text-green-700 py-3 rounded-lg font-semibold text-center">
                                        Payment Paid
                                    </div>
                                ) : (
                                    <div className="w-full bg-gray-100 text-gray-500 py-3 rounded-lg font-semibold text-center">
                                        Payment Pending
                                    </div>
                                )}
                            </div>

                            <div className="pt-2">
                                {collaboration?.status === "pending" || collaboration?.status === "negotiating" ? (
                                    <div className="flex flex-col gap-2">
                                        {currentUser?.role === "host" ? (
                                            <div className="flex flex-col gap-2">
                                                <Button
                                                    onClick={() => handleUpdateStatus("accept")}
                                                    className="w-full bg-[#10B981CC] hover:bg-[#10B981] text-white py-3 h-auto rounded-lg font-semibold"
                                                    disabled={isUpdating}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="w-full text-white py-3 h-auto rounded-lg font-semibold"
                                                    onClick={() =>
                                                        router.push(
                                                            `/dashboard/chat?userId=${messageRecipient?._id || ""}&name=${encodeURIComponent(messageRecipient?.name || "")}&image=${encodeURIComponent(messageRecipient?.image || "")}`
                                                        )
                                                    }
                                                >
                                                    Message
                                                </Button>
                                                <Button
                                                    onClick={() => handleUpdateStatus("reject")}
                                                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 h-auto rounded-lg font-semibold"
                                                    disabled={isUpdating}
                                                >
                                                    Reject
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="w-full bg-gray-100 text-gray-500 py-3 rounded-lg font-semibold text-center capitalize">
                                                {collaboration?.status}
                                            </div>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                            <div>
                                {collaboration?.status === "pending" && currentUser?.role === "influencer" && loggedInUserId !== creatorId && (
                                    <Button
                                        variant="outline"
                                        className="w-full text-white py-3 h-auto rounded-lg font-semibold"
                                        onClick={openNegotiationModal}
                                    >
                                        Negotiate
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Negotiation Modal */}
            {isNegotiationModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-semibold text-gray-900">Propose Negotiation</h2>
                            <button
                                onClick={() => setIsNegotiationModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Number of Nights</label>
                                    <input
                                        type="number"
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                        value={negotiationData.numberOfNights}
                                        onChange={(e) => setNegotiationData({ ...negotiationData, numberOfNights: Number(e.target.value) })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Payment Amount</label>
                                    <input
                                        type="number"
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                        value={negotiationData.paymentAmount}
                                        onChange={(e) => setNegotiationData({ ...negotiationData, paymentAmount: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700">Guest Count</label>
                                    <input
                                        type="number"
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                        value={negotiationData.guestCount}
                                        onChange={(e) => setNegotiationData({ ...negotiationData, guestCount: Number(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none min-h-[100px]"
                                    placeholder="Explain your negotiation terms..."
                                    value={negotiationData.negotiationMessage}
                                    onChange={(e) => setNegotiationData({ ...negotiationData, negotiationMessage: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-gray-700">Deliverables</label>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setNegotiationData({
                                            ...negotiationData,
                                            deliverables: [...negotiationData.deliverables, { platform: "Instagram", contentType: "Post", quantity: 1 }]
                                        })}
                                        className="flex items-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" /> Add Deliverable
                                    </Button>
                                </div>

                                {negotiationData.deliverables.map((del, index) => (
                                    <div key={index} className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Platform (e.g. Instagram)"
                                                className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-teal-500"
                                                value={del.platform}
                                                onChange={(e) => {
                                                    const newDel = [...negotiationData.deliverables];
                                                    newDel[index] = { ...newDel[index], platform: e.target.value };
                                                    setNegotiationData({ ...negotiationData, deliverables: newDel });
                                                }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Content Type"
                                                className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-teal-500"
                                                value={del.contentType}
                                                onChange={(e) => {
                                                    const newDel = [...negotiationData.deliverables];
                                                    newDel[index] = { ...newDel[index], contentType: e.target.value };
                                                    setNegotiationData({ ...negotiationData, deliverables: newDel });
                                                }}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Quantity"
                                                className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-teal-500"
                                                value={del.quantity}
                                                onChange={(e) => {
                                                    const newDel = [...negotiationData.deliverables];
                                                    newDel[index] = { ...newDel[index], quantity: Number(e.target.value) };
                                                    setNegotiationData({ ...negotiationData, deliverables: newDel });
                                                }}
                                            />
                                        </div>
                                        <button
                                            onClick={() => {
                                                const newDel = [...negotiationData.deliverables];
                                                newDel.splice(index, 1);
                                                setNegotiationData({ ...negotiationData, deliverables: newDel });
                                            }}
                                            className="text-red-500 hover:text-red-700 p-2"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 rounded-b-xl sticky bottom-0">
                            <Button variant="outline" onClick={() => setIsNegotiationModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                className="bg-teal-600 hover:bg-teal-700 text-white"
                                onClick={handleNegotiateSubmit}
                                disabled={isNegotiating}
                            >
                                {isNegotiating ? "Sending..." : "Send Proposal"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
