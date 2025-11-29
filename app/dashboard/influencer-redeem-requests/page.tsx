"use client";

import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Eye, Star, MapPin, Wallet, Wallet2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { WithdrawModal } from "@/components/dashboard/withdraw-modal";
import { SuccessModal } from "@/components/dashboard/success-modal";

const redeemRequests = [
    {
        id: "REQ001",
        hostName: "Michael Chen",
        hostAvatar: "https://avatar.iran.liara.run/public/10",
        propertyName: "Downtown Luxury Apt",
        location: "San Francisco, CA",
        checkIn: "2024-12-12",
        checkOut: "2024-12-14",
        nightCredits: 3,
        status: "pending",
        requestedDate: "2024-11-28",
    },
    {
        id: "REQ002",
        hostName: "Emma Rodriguez",
        hostAvatar: "https://avatar.iran.liara.run/public/11",
        propertyName: "Beachfront Villa",
        location: "Malibu, CA",
        checkIn: "2024-12-20",
        checkOut: "2024-12-25",
        nightCredits: 5,
        status: "approved",
        requestedDate: "2024-11-25",
    },
    {
        id: "REQ003",
        hostName: "David Park",
        hostAvatar: "https://avatar.iran.liara.run/public/12",
        propertyName: "Mountain Retreat",
        location: "Aspen, CO",
        checkIn: "2025-01-05",
        checkOut: "2025-01-08",
        nightCredits: 2,
        status: "declined",
        requestedDate: "2024-11-20",
    },
    {
        id: "REQ004",
        hostName: "Sofia Martinez",
        hostAvatar: "https://avatar.iran.liara.run/public/13",
        propertyName: "Industrial Loft",
        location: "New York, NY",
        checkIn: "2025-01-15",
        checkOut: "2025-01-18",
        nightCredits: 4,
        status: "pending",
        requestedDate: "2024-11-29",
    },
    {
        id: "REQ005",
        hostName: "James Wilson",
        hostAvatar: "https://avatar.iran.liara.run/public/14",
        propertyName: "Scandinavian House",
        location: "Seattle, WA",
        checkIn: "2025-02-01",
        checkOut: "2025-02-05",
        nightCredits: 3,
        status: "approved",
        requestedDate: "2024-11-15",
    },
];

const ITEMS_PER_PAGE = 8;

export default function InfluencerRedeemRequestsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved" | "declined">("all");
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleWithdrawSubmit = async (data: { amount: string; paymentMethod: string; notes: string }) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Withdrawal request submitted:", data);
            setIsWithdrawModalOpen(false);
            setIsSuccessModalOpen(true);
        } catch (error) {
            console.error("Failed to submit withdrawal request", error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredRequests = activeTab === "all"
        ? redeemRequests
        : redeemRequests.filter(req => req.status === activeTab);

    // Calculate pagination
    const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentRequests = filteredRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 3;

        if (totalPages <= maxVisiblePages + 1) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 3) {
                end = 3;
            } else if (currentPage >= totalPages - 2) {
                start = totalPages - 2;
            }

            if (start > 2) {
                pages.push("ellipsis-start");
            }

            for (let i = start; i <= end; i++) {
                if (i > 1 && i < totalPages) {
                    pages.push(i);
                }
            }

            if (end < totalPages - 1) {
                pages.push("ellipsis-end");
            }

            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "approved":
                return "text-green-800 bg-green-100";
            case "pending":
                return "text-amber-800 bg-amber-100";
            case "declined":
                return "text-red-800 bg-red-100";
            default:
                return "text-gray-800 bg-gray-100";
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col space-y-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Redeem Stars</h2>
                        <p className="text-sm text-gray-500 mt-1">Manage your night star withdrawals and redemption history</p>
                    </div>


                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-stretch justify-between">
                    <div className="relative flex-1 max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search requests..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                        />
                    </div>

                    <select
                        className="block w-full sm:w-36 px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm text-gray-700"
                        value={activeTab}
                        onChange={(e) => setActiveTab(e.target.value as any)}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="declined">Declined</option>
                    </select>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow className="[&>th]:text-white [&>th]:font-semibold [&>th]:py-3 [&>th]:px-4">
                        <TableHead className="rounded-tl-lg">PROPERTY</TableHead>
                        <TableHead>HOST</TableHead>
                        <TableHead>DATES</TableHead>
                        <TableHead>STARS</TableHead>
                        <TableHead>REQUESTED</TableHead>
                        <TableHead>STATUS</TableHead>
                        <TableHead className="rounded-tr-lg">ACTION</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentRequests.map((request) => (
                        <TableRow key={request.id} className="hover:bg-gray-50">
                            <TableCell>
                                <div>
                                    <p className="font-medium text-gray-900">{request.propertyName}</p>
                                    <div className="flex items-center text-xs text-gray-500 mt-0.5">
                                        <MapPin className="w-3 h-3 mr-1" />
                                        {request.location}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={request.hostAvatar} />
                                        <AvatarFallback>{request.hostName[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium text-gray-900">{request.hostName}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-gray-600 text-sm">
                                {new Date(request.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {new Date(request.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span className="font-semibold text-gray-900">{request.nightCredits}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-gray-500 text-sm">
                                {new Date(request.requestedDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <span
                                    className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                                        request.status
                                    )}`}
                                >
                                    {request.status}
                                </span>
                            </TableCell>
                            <TableCell>
                                <button
                                    className="p-1.5 text-teal-600 rounded-full hover:bg-gray-100"
                                    title="View Details"
                                >
                                    <Eye className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setIsSuccessModalOpen(true)}
                                    className="p-1.5 text-teal-600 rounded-full hover:bg-gray-100"
                                    title="Withdraw Funds"
                                >
                                    <Wallet2 className="h-4 w-4" />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="h-8 w-8 p-0"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                            </PaginationItem>

                            {getPageNumbers().map((page, index) => {
                                if (page === "ellipsis-start" || page === "ellipsis-end") {
                                    return (
                                        <PaginationItem key={`ellipsis-${index}`}>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    );
                                }

                                return (
                                    <PaginationItem key={page}>
                                        <Button
                                            variant={currentPage === page ? "default" : "outline"}
                                            size="sm"
                                            className={`h-8 w-8 p-0 ${currentPage === page ? "bg-[#10B981CC]" : ""
                                                }`}
                                            onClick={() => setCurrentPage(Number(page))}
                                        >
                                            {page}
                                        </Button>
                                    </PaginationItem>
                                );
                            })}

                            <PaginationItem>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                                    }
                                    disabled={currentPage === totalPages}
                                    className="h-8 w-8 p-0"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}

            <WithdrawModal
                isOpen={isWithdrawModalOpen}
                onClose={() => setIsWithdrawModalOpen(false)}
                onConfirm={handleWithdrawSubmit}
                isLoading={isLoading}
            />

            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                title="Withdrawal Successful"
                description="Your funds have been successfully transferred to your connected account."
            />
        </div>
    );
}
