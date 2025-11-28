"use client";

import { useState } from "react";

import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Eye, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteModal } from "@/components/ui/delete-modal";

// Mock transaction data
const transactions = [
    {
        id: "TXN001",
        influencerName: "Sarah Johnson",
        influencerAvatar: "https://avatar.iran.liara.run/public/1",
        collaborationTitle: "Weekend Stay Deal – Villa Serenity",
        amount: 250,
        date: "2024-11-15",
        status: "completed",
        paymentMethod: "Stripe",
    },
    {
        id: "TXN002",
        influencerName: "Mike Chen",
        influencerAvatar: "https://avatar.iran.liara.run/public/2",
        collaborationTitle: "Beachfront Villa Promotion",
        amount: 300,
        date: "2024-11-12",
        status: "completed",
        paymentMethod: "PayPal",
    },
    {
        id: "TXN003",
        influencerName: "Emma Rodriguez",
        influencerAvatar: "https://avatar.iran.liara.run/public/3",
        collaborationTitle: "Mountain Retreat Experience",
        amount: 180,
        date: "2024-11-10",
        status: "pending",
        paymentMethod: "Stripe",
    },
    {
        id: "TXN004",
        influencerName: "David Park",
        influencerAvatar: "https://avatar.iran.liara.run/public/4",
        collaborationTitle: "Downtown Luxury Apartment",
        amount: 220,
        date: "2024-11-08",
        status: "completed",
        paymentMethod: "Stripe",
    },
    {
        id: "TXN005",
        influencerName: "Lisa Thompson",
        influencerAvatar: "https://avatar.iran.liara.run/public/5",
        collaborationTitle: "Penthouse Suite Showcase",
        amount: 400,
        date: "2024-11-05",
        status: "completed",
        paymentMethod: "Bank Transfer",
    },
    {
        id: "TXN006",
        influencerName: "Alex Johnson",
        influencerAvatar: "https://avatar.iran.liara.run/public/6",
        collaborationTitle: "Garden Cottage Stay",
        amount: 160,
        date: "2024-11-03",
        status: "failed",
        paymentMethod: "Stripe",
    },
    {
        id: "TXN007",
        influencerName: "Rachel Kim",
        influencerAvatar: "https://avatar.iran.liara.run/public/7",
        collaborationTitle: "Modern Studio Tour",
        amount: 120,
        date: "2024-11-01",
        status: "completed",
        paymentMethod: "PayPal",
    },
    {
        id: "TXN008",
        influencerName: "James Wilson",
        influencerAvatar: "https://avatar.iran.liara.run/public/8",
        collaborationTitle: "Scandinavian House Feature",
        amount: 280,
        date: "2024-10-28",
        status: "completed",
        paymentMethod: "Stripe",
    },
];

const ITEMS_PER_PAGE = 8;

export default function TransactionsPage() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        transactionId: string | null;
        isLoading: boolean;
    }>({
        isOpen: false,
        transactionId: null,
        isLoading: false,
    });

    const handleDeleteClick = (transactionId: string) => {
        setDeleteModal({
            isOpen: true,
            transactionId,
            isLoading: false,
        });
    };

    const handleDeleteConfirm = async () => {
        if (!deleteModal.transactionId) return;

        setDeleteModal((prev) => ({ ...prev, isLoading: true }));

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // Close the modal
            setDeleteModal({
                isOpen: false,
                transactionId: null,
                isLoading: false,
            });
        } catch (error) {
            console.error("Failed to delete transaction", error);
            setDeleteModal((prev) => ({ ...prev, isLoading: false }));
        }
    };

    // Calculate pagination
    const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentTransactions = transactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
            case "completed":
                return "text-green-800 bg-green-100";
            case "pending":
                return "text-amber-800 bg-amber-100";
            case "failed":
                return "text-red-800 bg-red-100";
            default:
                return "text-gray-800 bg-gray-100";
        }
    };

    const handleDownloadReceipt = (transactionId: string) => {
        // Simulate receipt download
        console.log(`Downloading receipt for ${transactionId}`);
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col space-y-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Payment Transactions</h2>
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
                                placeholder="Search transactions..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm h-full"
                                onChange={(e) => {
                                    // Add search functionality here
                                }}
                            />
                        </div>

                        <select
                            className="block w-full sm:w-36 px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm text-gray-700 h-full"
                            onChange={(e) => {
                                // Add filter functionality here
                            }}
                        >
                            <option value="">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                        </select>
                    </div>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow className="[&>th]:text-white [&>th]:font-semibold [&>th]:py-3 [&>th]:px-4">
                        <TableHead className="rounded-tl-lg">TRANSACTION ID</TableHead>
                        <TableHead>INFLUENCER</TableHead>
                        <TableHead>COLLABORATION</TableHead>
                        <TableHead>AMOUNT</TableHead>
                        <TableHead>DATE</TableHead>
                        <TableHead>STATUS</TableHead>
                        <TableHead className="rounded-tr-lg">ACTION</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentTransactions.map((transaction) => (
                        <TableRow key={transaction.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium text-gray-900">
                                {transaction.id}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={transaction.influencerAvatar} />
                                        <AvatarFallback>{transaction.influencerName[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium text-gray-900">{transaction.influencerName}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-gray-600 max-w-xs truncate">
                                {transaction.collaborationTitle}
                            </TableCell>
                            <TableCell className="font-semibold text-gray-900">
                                ${transaction.amount.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-gray-600">
                                {new Date(transaction.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </TableCell>

                            <TableCell>
                                <span
                                    className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                                        transaction.status
                                    )}`}
                                >
                                    {transaction.status}
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <button
                                        className="p-1.5 text-teal-600 rounded-full hover:bg-gray-100"
                                        title="View Details"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(transaction.id)}
                                        className="p-1.5 text-red-600 rounded-full hover:bg-red-50"
                                        title="Delete Transaction"
                                        disabled={deleteModal.isLoading}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
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

            <DeleteModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal((prev) => ({ ...prev, isOpen: false }))}
                onConfirm={handleDeleteConfirm}
                title="Delete Transaction"
                description="Are you sure you want to delete this transaction? This action cannot be undone."
                isLoading={deleteModal.isLoading}
            />
        </div>
    );
}
