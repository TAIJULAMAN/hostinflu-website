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
import { Pencil, Trash2, ChevronLeft, ChevronRight, Eye, Instagram, Twitter, Facebook, Youtube, Video } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { DeleteModal } from "@/components/ui/delete-modal";
import { useDeleteDealMutation, useGetAllDealsQuery } from "@/Redux/api/host/deals/dealsApi";
import Loader from "@/components/commom/loader";
import Image from "next/image";
import { imgUrl } from "@/config/envConfig";

const getPlatformIcon = (platform: string) => {
  switch (platform?.toLowerCase()) {
    case "instagram": return <Instagram className="w-4 h-4 text-pink-600" />;
    case "twitter":
    case "x": return <Twitter className="w-4 h-4 text-blue-400" />;
    case "facebook": return <Facebook className="w-4 h-4 text-blue-600" />;
    case "youtube": return <Youtube className="w-4 h-4 text-red-600" />;
    case "tiktok": return <Video className="w-4 h-4 text-black" />;
    default: return <Video className="w-4 h-4 text-gray-500" />;
  }
};

const ITEMS_PER_PAGE = 10;

export default function ActiveDeals() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: dealsData, isLoading } = useGetAllDealsQuery({
    currentPage,
    limit: ITEMS_PER_PAGE,
    searchTerm: searchTerm || undefined,
  });

  const dealsList = dealsData?.data?.deals || [];
  const totalPages = dealsData?.totalPages || 0;
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

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    dealId: string | null;
    isLoading: boolean;
  }>({
    isOpen: false,
    dealId: null,
    isLoading: false,
  });

  const handleDeleteClick = (dealId: string) => {
    setDeleteModal({
      isOpen: true,
      dealId,
      isLoading: false,
    });
  };

  const [deleteDeal, { isLoading: isDeleting }] = useDeleteDealMutation();

  const handleDeleteConfirm = async () => {
    if (!deleteModal.dealId) return;

    setDeleteModal((prev) => ({ ...prev, isLoading: true }));

    try {
      await deleteDeal({ id: deleteModal.dealId }).unwrap();
      // Close the modal
      setDeleteModal({
        isOpen: false,
        dealId: null,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to delete deal", error);
      setDeleteModal((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800">All Deals</h2>

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
                placeholder="Search deals..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm h-full"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <Link
              href="/dashboard/active-deals/add-new"
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
            <TableHead className="rounded-tl-lg">S.NO</TableHead>
            <TableHead>IMAGE</TableHead>
            <TableHead>LIST NAME</TableHead>
            <TableHead>NIGHT STAY</TableHead>
            <TableHead>AMOUNT</TableHead>
            <TableHead>DELIVERABLES</TableHead>
            <TableHead>START DATE</TableHead>
            <TableHead>END DATE</TableHead>
            <TableHead className="rounded-tr-lg">ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                <Loader />
              </TableCell>
            </TableRow>
          ) : dealsList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                No deals found.
              </TableCell>
            </TableRow>
          ) : (
            dealsList.map((deal: any, index: number) => (
              <TableRow key={deal._id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">
                  {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                </TableCell>
                <TableCell>
                  <Image
                    src={deal?.title?.images ? `${imgUrl}${deal?.title?.images[0]}` : "/list.png"}
                    alt={deal.title}
                    width={50}
                    height={50}
                    className="rounded-lg object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium text-gray-900">
                  {deal?.title?.title || "N/A"}
                </TableCell>
                <TableCell className="text-gray-600">{deal?.compensation?.numberOfNights || "N/A"}</TableCell>
                <TableCell className="font-medium">
                  {deal?.compensation?.paymentAmount || "N/A"}
                </TableCell>
                <TableCell className="text-gray-500">
                  {deal?.deliverables?.length > 0
                    ? (
                      <div className="flex flex-wrap gap-2">
                        {deal.deliverables.map((d: any, i: number) => (
                          <div key={i} className="flex items-center gap-1">
                            {getPlatformIcon(d.platform)}
                            <span className="text-xs">{d.quantity} {d.contentType}</span>
                          </div>
                        ))}
                      </div>
                    )
                    : "N/A"}
                </TableCell>
                <TableCell className="text-gray-500">
                  {deal?.inTimeAndDate ? new Date(deal.inTimeAndDate).toLocaleDateString() : "N/A"}
                </TableCell>
                <TableCell className="text-gray-500">
                  {deal?.outTimeAndDate ? new Date(deal.outTimeAndDate).toLocaleDateString() : "N/A"}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link
                      href={`/dashboard/active-deals/deal-details`}
                      className="p-1.5 text-teal-600 rounded-full hover:bg-gray-100"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/dashboard/active-deals/edit/${deal._id}`}
                      className="p-1.5 text-teal-600 rounded-full hover:bg-gray-100"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(deal._id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Delete"
                      disabled={deleteModal.isLoading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            )))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg border transition-colors ${currentPage === 1
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => {
              if (page === "ellipsis-start" || page === "ellipsis-end") {
                return (
                  <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(Number(page))}
                  className={`h-8 w-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === page
                    ? "bg-[#10B981CC] text-white"
                    : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg border transition-colors ${currentPage === totalPages
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}


      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleDeleteConfirm}
        title="Delete Deal"
        description="Are you sure you want to delete this deal? This action cannot be undone."
        isLoading={deleteModal.isLoading}
      />
    </div >
  );
}
