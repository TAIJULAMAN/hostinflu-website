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
import { Trash2, ChevronLeft, ChevronRight, Eye, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
} from "@/components/ui/pagination";
import { DeleteModal } from "@/components/ui/delete-modal";
import { useGetAllMyCollaborationsQuery, useDeleteCollaborationMutation } from "@/Redux/api/collaboration/collaborationApi";
import Loader from "@/components/commom/loader";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 10;

interface Collaboration {
    _id: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    canAccept?: boolean;
    compensation?: {
        paymentAmount?: string | number;
        numberOfNights?: number;
    };
    selectInfluencerOrHost?: {
        name: string;
        profileImage?: string;
    };
}

export default function Collaborations() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const { data: collaborationsData, isLoading, isError, error } = useGetAllMyCollaborationsQuery({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        searchTerm: searchTerm || undefined,
        status: statusFilter || undefined,
    });

    const collaborations: Collaboration[] = collaborationsData?.data?.collaborations || [];
    const totalPages = collaborationsData?.totalPages || 0;

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
            case "accepted":
                return "text-green-800 bg-green-100";
            case "pending":
                return "text-gray-800 bg-gray-200";
            case "negotiating":
                return "text-blue-800 bg-blue-100";
            case "completed":
                return "text-yellow-800 bg-yellow-100";
            case "rejected":
                return "text-red-800 bg-red-100";
            case "ongoing":
                return "text-purple-800 bg-purple-100";
            default:
                return "text-gray-800 bg-gray-100";
        }
    };

    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        listId: string | null;
        isLoading: boolean;
    }>({
        isOpen: false,
        listId: null,
        isLoading: false,
    });

    const [deleteCollaboration] = useDeleteCollaborationMutation();

    const handleDeleteClick = (listId: string) => {
        setDeleteModal({
            isOpen: true,
            listId,
            isLoading: false,
        });
    };

    const handleDeleteConfirm = async () => {
        if (!deleteModal.listId) return;

        setDeleteModal((prev) => ({ ...prev, isLoading: true }));

        try {
            await deleteCollaboration(deleteModal.listId).unwrap();
            toast.success("Collaboration deleted successfully");
            setDeleteModal({
                isOpen: false,
                listId: null,
                isLoading: false,
            });
        } catch (error) {
            console.error("Failed to delete property", error);
            toast.error((error as any)?.data?.message || "Failed to delete collaboration");
            setDeleteModal((prev) => ({ ...prev, isLoading: false }));
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col space-y-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-xl font-semibold text-gray-800">All Collaborations</h2>

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
                                placeholder="Search collaborations..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm h-full"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>

                        <select
                            className="block w-full sm:w-36 px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm text-gray-700 h-full"
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="negotiating">Negotiating</option>
                            <option value="rejected">Rejected</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                        </select>

                    </div>
                </div>
            </div>

            <div className="relative overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="[&>th]:text-white [&>th]:font-semibold [&>th]:py-3 [&>th]:px-4">
                            <TableHead className="rounded-tl-lg bg-[#10B981CC]">INFLUENCER</TableHead>
                            <TableHead className="bg-[#10B981CC]">NAME</TableHead>
                            <TableHead className="bg-[#10B981CC]">DURATION</TableHead>
                            <TableHead className="bg-[#10B981CC]">PAYMENT</TableHead>
                            <TableHead className="bg-[#10B981CC]">STATUS</TableHead>
                            <TableHead className="bg-[#10B981CC]">Nights Stay</TableHead>
                            <TableHead className="rounded-tr-lg bg-[#10B981CC]">ACTION</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    <div className="flex items-center justify-center">
                                        <Loader />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : isError ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-red-500">
                                    Error loading collaborations: {(error as any)?.data?.message || "Something went wrong"}
                                </TableCell>
                            </TableRow>
                        ) : collaborations.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                                    No collaborations found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            collaborations.map((item) => (
                                <TableRow key={item._id} className="hover:bg-gray-50">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <span className="font-medium text-gray-900">
                                                {item.selectInfluencerOrHost?.name || "N/A"}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-gray-600">
                                        {item.description}
                                    </TableCell>
                                    <TableCell className="text-gray-600 text-sm">
                                        {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-gray-900 font-medium">
                                        ${item.compensation?.paymentAmount || 0}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                                                item.status
                                            )}`}
                                        >
                                            {item.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <span className="text-gray-700 font-medium">
                                                {item.compensation?.numberOfNights || 0}
                                            </span>
                                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Link
                                                href={`/dashboard/collaborations/details/${item._id}`}
                                                className="p-1.5 text-teal-600 rounded-full hover:bg-gray-100"
                                                title="View Details"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(item._id)}
                                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                title="Delete"
                                                disabled={deleteModal.isLoading}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

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
                title="Delete Property"
                description="Are you sure you want to delete this property from your list? This action cannot be undone."
                isLoading={deleteModal.isLoading}
            />
        </div>
    );
}
