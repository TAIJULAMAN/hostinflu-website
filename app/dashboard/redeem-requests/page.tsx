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
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram, Youtube, Star } from "lucide-react";

const redeemRequests = [
    {
        id: "REQ001",
        influencerName: "Sarah Chen",
        influencerAvatar: "https://avatar.iran.liara.run/public/1",
        platforms: ["instagram", "youtube"],
        propertyName: "Modern Downtown Loft",
        location: "San Francisco, CA",
        checkIn: "Dec 12",
        checkOut: "Dec 14, 2025",
        nightCredits: 3,
        status: "pending",
        timeAgo: "2 hours ago",
    },
    {
        id: "REQ002",
        influencerName: "Mike Rodriguez",
        influencerAvatar: "https://avatar.iran.liara.run/public/2",
        platforms: ["instagram", "youtube"],
        propertyName: "Beachfront Villa",
        location: "Malibu, CA",
        checkIn: "Dec 20",
        checkOut: "Dec 25, 2025",
        nightCredits: 5,
        status: "approved",
        timeAgo: "5 hours ago",
    },
    {
        id: "REQ003",
        influencerName: "Emma Wilson",
        influencerAvatar: "https://avatar.iran.liara.run/public/3",
        platforms: ["instagram", "tiktok"],
        propertyName: "Mountain Cabin Retreat",
        location: "Aspen, CO",
        checkIn: "Jan 5",
        checkOut: "Jan 8, 2025",
        nightCredits: 2,
        status: "pending",
        timeAgo: "1 day ago",
    },
    {
        id: "REQ004",
        influencerName: "David Kim",
        influencerAvatar: "https://avatar.iran.liara.run/public/4",
        platforms: ["youtube", "tiktok"],
        propertyName: "Urban Penthouse",
        location: "New York, NY",
        checkIn: "Dec 28",
        checkOut: "Dec 30, 2025",
        nightCredits: 4,
        status: "declined",
        timeAgo: "2 days ago",
    },
    {
        id: "REQ005",
        influencerName: "Lisa Thompson",
        influencerAvatar: "https://avatar.iran.liara.run/public/5",
        platforms: ["instagram"],
        propertyName: "Coastal Cottage",
        location: "Miami, FL",
        checkIn: "Jan 10",
        checkOut: "Jan 13, 2025",
        nightCredits: 3,
        status: "approved",
        timeAgo: "3 days ago",
    },
    {
        id: "REQ006",
        influencerName: "Alex Johnson",
        influencerAvatar: "https://avatar.iran.liara.run/public/6",
        platforms: ["youtube"],
        propertyName: "Desert Oasis",
        location: "Phoenix, AZ",
        checkIn: "Jan 15",
        checkOut: "Jan 18, 2025",
        nightCredits: 2,
        status: "pending",
        timeAgo: "4 days ago",
    },
];

const ITEMS_PER_PAGE = 8;

export default function RedeemRequestsPage() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved" | "declined">("all");

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

    const handleApprove = (requestId: string) => {
        console.log("Approving request:", requestId);
    };

    const handleDecline = (requestId: string) => {
        console.log("Declining request:", requestId);
    };

    const getTabCount = (tab: string) => {
        if (tab === "all") return redeemRequests.length;
        return redeemRequests.filter(req => req.status === tab).length;
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col space-y-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Redeem Requests</h2>
                        <p className="text-sm text-gray-500 mt-1">Manage influencer requests to redeem night credits</p>
                    </div>

                    <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 items-stretch">
                        <div className="relative flex-1 min-w-[200px]">
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
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm h-full"
                                onChange={(e) => {
                                    // Add search functionality here
                                }}
                            />
                        </div>

                        <select
                            className="block w-full sm:w-36 px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm text-gray-700 h-full"
                            value={activeTab}
                            onChange={(e) => setActiveTab(e.target.value as any)}
                        >
                            <option value="all">All ({getTabCount("all")})</option>
                            <option value="pending">Pending ({getTabCount("pending")})</option>
                            <option value="approved">Approved ({getTabCount("approved")})</option>
                            <option value="declined">Declined ({getTabCount("declined")})</option>
                        </select>
                    </div>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow className="[&>th]:text-white [&>th]:font-semibold [&>th]:py-3 [&>th]:px-4">
                        <TableHead className="rounded-tl-lg">INFLUENCER</TableHead>
                        <TableHead>PROPERTY</TableHead>
                        <TableHead>DATES</TableHead>
                        <TableHead>NIGHT CREDITS</TableHead>
                        <TableHead>STATUS</TableHead>
                        <TableHead>REQUESTED</TableHead>
                        <TableHead className="rounded-tr-lg">ACTION</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentRequests.map((request) => (
                        <TableRow key={request.id} className="hover:bg-gray-50">
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={request.influencerAvatar} />
                                        <AvatarFallback>{request.influencerName[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-gray-900">{request.influencerName}</p>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            {request.platforms.includes("instagram") && (
                                                <Instagram className="w-3 h-3 text-pink-500" />
                                            )}
                                            {request.platforms.includes("youtube") && (
                                                <Youtube className="w-3 h-3 text-red-500" />
                                            )}
                                            {request.platforms.includes("tiktok") && (
                                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    <p className="font-medium text-gray-900">{request.propertyName}</p>
                                    <p className="text-xs text-gray-500">{request.location}</p>
                                </div>
                            </TableCell>
                            <TableCell className="text-gray-600 text-sm">
                                {request.checkIn} – {request.checkOut}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span className="font-semibold text-gray-900">{request.nightCredits}</span>
                                </div>
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
                            <TableCell className="text-gray-500 text-sm">
                                {request.timeAgo}
                            </TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    {request.status === "pending" ? (
                                        <>
                                            <button
                                                onClick={() => handleApprove(request.id)}
                                                className="px-3 py-1 text-xs font-medium text-white bg-green-500 hover:bg-green-600 rounded"
                                                title="Approve"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleDecline(request.id)}
                                                className="px-3 py-1 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded"
                                                title="Decline"
                                            >
                                                Decline
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="p-1.5 text-teal-600 rounded-full hover:bg-gray-100"
                                            title="View Details"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
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
        </div>
    );
}
