"use client";

import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, ChevronLeft, ChevronRight, Eye, Star, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
} from "@/components/ui/pagination";
import { useState } from "react";
import { DeleteModal } from "@/components/ui/delete-modal";
import { lists } from "./data";


const ITEMS_PER_PAGE = 8;

export default function Collaborations() {
    const [currentPage, setCurrentPage] = React.useState(1);

    // Calculate pagination
    const totalPages = Math.ceil(lists.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentLists = lists.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
            case "active":
                return "text-green-800 bg-green-100";
            case "pending":
                return "text-gray-800 bg-gray-200";
            case "requesting":
                return "text-blue-800 bg-blue-100";
            case "completed":
                return "text-yellow-800 bg-yellow-100";
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
            // Close the modal
            setDeleteModal({
                isOpen: false,
                listId: null,
                isLoading: false,
            });
        } catch (error) {
            console.error("Failed to delete property", error);
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
                                onChange={(e) => {

                                }}
                            />
                        </div>

                        <select
                            className="block w-full sm:w-36 px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm text-gray-700 h-full"
                            onChange={(e) => {

                            }}
                        >
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="requesting">Requesting</option>
                            <option value="completed">Completed</option>
                        </select>

                        <Link
                            href="/dashboard/collaborations/add-new"
                            className="px-4 py-2 bg-[#10B981CC] text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 whitespace-nowrap h-full"
                        >
                            <span>+</span>
                            <span>Add New</span>
                        </Link>
                    </div>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow className="[&>th]:text-white [&>th]:font-semibold [&>th]:py-3 [&>th]:px-4">
                        <TableHead className="rounded-tl-lg">INFLUENCER</TableHead>
                        <TableHead>DEAL NAME</TableHead>
                        <TableHead>DURATION</TableHead>
                        <TableHead>PAYMENT</TableHead>
                        <TableHead>STATUS</TableHead>
                        <TableHead>Night Star</TableHead>
                        <TableHead className="rounded-tr-lg">ACTION</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentLists.map((item) => (
                        <TableRow key={item.id} className="hover:bg-gray-50">
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.influencerImage}
                                        alt={item.influencer}
                                        className="w-10 h-10 rounded-lg object-cover"
                                    />
                                    <span className="font-medium text-gray-900">{item.influencer}</span>
                                </div>
                            </TableCell>

                            <TableCell className="text-gray-600">
                                {item.dealName}
                            </TableCell>
                            <TableCell className="text-gray-600 text-sm">
                                {item.startDate} - {item.endDate}
                            </TableCell>
                            <TableCell className="text-gray-900 font-medium">
                                {item.payment}
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
                                    <span className="text-gray-700 font-medium">{item.nightStar}</span>
                                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Link
                                        href={`/dashboard/collaborations/details/${item.id}`}
                                        className="p-1.5 text-teal-600 rounded-full hover:bg-gray-100"
                                        title="View Details"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href={`/dashboard/collaborations/edit/${item.id}`}
                                        className="p-1.5 text-teal-600 rounded-full hover:bg-gray-100"
                                        title="Edit"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteClick(item.id)}
                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                        title="Delete"
                                        disabled={deleteModal.isLoading}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                    {item.status === "requesting" && (
                                        <button
                                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                                            title="Accept"
                                            onClick={() => console.log("Accept clicked for", item.id)}
                                        >
                                            <Check className="h-4 w-4" />
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
