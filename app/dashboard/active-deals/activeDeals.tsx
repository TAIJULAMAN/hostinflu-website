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
import { Pencil, Trash2, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";

interface Deal {
  id: string;
  name: string;
  influencer: string;
  status: "active" | "pending" | "completed";
  amount: string;
  startDate: string;
  endDate: string;
  category: string;
}

const deals: Deal[] = [
  {
    id: "1",
    name: "Summer Collection Campaign",
    influencer: "John Doe",
    status: "active",
    startDate: "01/01/2026",
    endDate: "01/01/2026",
    amount: "$2,500.00",
    category: "Fashion",
  },
  {
    id: "2",
    name: "Tech Gadgets Launch",
    influencer: "Sarah Johnson",
    status: "pending",
    amount: "$1,800.00",
    startDate: "02/15/2026",
    endDate: "03/15/2026",
    category: "Technology",
  },
  {
    id: "3",
    name: "Fitness App Promotion",
    influencer: "Mike Chen",
    status: "active",
    amount: "$3,200.00",
    startDate: "01/10/2026",
    endDate: "02/10/2026",
    category: "Health & Fitness",
  },
  {
    id: "4",
    name: "Food Festival Sponsorship",
    influencer: "Emma Wilson",
    status: "completed",
    amount: "$1,200.00",
    startDate: "12/01/2025",
    endDate: "12/15/2025",
    category: "Food & Beverage",
  },
  {
    id: "5",
    name: "Travel Vlog Series",
    influencer: "Alex Rivera",
    status: "completed",
    amount: "$4,500.00",
    startDate: "11/01/2025",
    endDate: "11/30/2025",
    category: "Travel",
  },
  {
    id: "6",
    name: "Winter Jacket Promo",
    influencer: "Liam Brown",
    status: "active",
    amount: "$2,900.00",
    startDate: "12/20/2025",
    endDate: "01/20/2026",
    category: "Fashion",
  },
  {
    id: "7",
    name: "Smart Home Devices Awareness",
    influencer: "Olivia Green",
    status: "pending",
    amount: "$3,600.00",
    startDate: "03/01/2026",
    endDate: "04/01/2026",
    category: "Technology",
  },
  {
    id: "8",
    name: "Yoga Mat Branding",
    influencer: "Sophia Patel",
    status: "completed",
    amount: "$1,450.00",
    startDate: "10/10/2025",
    endDate: "10/25/2025",
    category: "Health & Fitness",
  },
  {
    id: "9",
    name: "Organic Snacks Promotion",
    influencer: "Daniel Kim",
    status: "active",
    amount: "$2,200.00",
    startDate: "01/05/2026",
    endDate: "02/05/2026",
    category: "Food & Beverage",
  },
  {
    id: "10",
    name: "Luxury Resort Giveaway",
    influencer: "Mia Anderson",
    status: "pending",
    amount: "$5,000.00",
    startDate: "04/01/2026",
    endDate: "04/30/2026",
    category: "Travel",
  },
  {
    id: "11",
    name: "Skincare Routine Campaign",
    influencer: "Ava Martinez",
    status: "active",
    amount: "$2,750.00",
    startDate: "02/01/2026",
    endDate: "03/01/2026",
    category: "Beauty",
  },
  {
    id: "12",
    name: "Mobile App Growth Push",
    influencer: "Noah Williams",
    status: "completed",
    amount: "$3,900.00",
    startDate: "09/01/2025",
    endDate: "09/30/2025",
    category: "Technology",
  },
  {
    id: "13",
    name: "Protein Powder Launch",
    influencer: "Chloe Singh",
    status: "active",
    amount: "$1,900.00",
    startDate: "01/15/2026",
    endDate: "02/15/2026",
    category: "Health & Fitness",
  },
  {
    id: "14",
    name: "Street Food Tour Coverage",
    influencer: "Ethan Carter",
    status: "completed",
    amount: "$1,150.00",
    startDate: "08/10/2025",
    endDate: "08/25/2025",
    category: "Food & Beverage",
  },
  {
    id: "15",
    name: "Adventure Travel Experience",
    influencer: "Zara Lopez",
    status: "pending",
    amount: "$4,700.00",
    startDate: "05/05/2026",
    endDate: "06/05/2026",
    category: "Travel",
  },
  {
    id: "16",
    name: "Streetwear Brand Drop",
    influencer: "Logan Hughes",
    status: "active",
    amount: "$3,300.00",
    startDate: "03/01/2026",
    endDate: "03/25/2026",
    category: "Fashion",
  },
  {
    id: "17",
    name: "VR Headset Review Series",
    influencer: "Harper Scott",
    status: "pending",
    amount: "$4,200.00",
    startDate: "04/10/2026",
    endDate: "05/10/2026",
    category: "Technology",
  },
  {
    id: "18",
    name: "Healthy Eating Challenge",
    influencer: "Ella Brooks",
    status: "completed",
    amount: "$1,800.00",
    startDate: "07/01/2025",
    endDate: "07/20/2025",
    category: "Health & Fitness",
  },
  {
    id: "19",
    name: "Gourmet Desserts Week",
    influencer: "James Turner",
    status: "active",
    amount: "$1,650.00",
    startDate: "02/10/2026",
    endDate: "03/10/2026",
    category: "Food & Beverage",
  },
  {
    id: "20",
    name: "Island Travel Guide",
    influencer: "Nina Flores",
    status: "completed",
    amount: "$4,300.00",
    startDate: "09/01/2025",
    endDate: "09/30/2025",
    category: "Travel",
  },
  {
    id: "21",
    name: "Makeup Essentials Launch",
    influencer: "Bella Rossi",
    status: "pending",
    amount: "$2,350.00",
    startDate: "03/05/2026",
    endDate: "04/05/2026",
    category: "Beauty",
  },
  {
    id: "22",
    name: "Crypto Wallet Promotion",
    influencer: "Max Harris",
    status: "active",
    amount: "$5,500.00",
    startDate: "01/20/2026",
    endDate: "02/20/2026",
    category: "Technology",
  },
  {
    id: "23",
    name: "Running Shoes Endurance Test",
    influencer: "Zoe Mitchell",
    status: "completed",
    amount: "$2,150.00",
    startDate: "10/05/2025",
    endDate: "10/30/2025",
    category: "Health & Fitness",
  },
  {
    id: "24",
    name: "Café Tasting Tour",
    influencer: "Oliver Bennett",
    status: "active",
    amount: "$1,300.00",
    startDate: "02/01/2026",
    endDate: "02/20/2026",
    category: "Food & Beverage",
  },
  {
    id: "25",
    name: "Historic Cities Travel Series",
    influencer: "Ruby Adams",
    status: "pending",
    amount: "$4,800.00",
    startDate: "06/01/2026",
    endDate: "07/01/2026",
    category: "Travel",
  },
  {
    id: "26",
    name: "Designer Handbags Launch",
    influencer: "Grace Morgan",
    status: "active",
    amount: "$3,750.00",
    startDate: "01/10/2026",
    endDate: "02/10/2026",
    category: "Fashion",
  },
  {
    id: "27",
    name: "AI Productivity App Promo",
    influencer: "Henry Reed",
    status: "completed",
    amount: "$2,950.00",
    startDate: "11/01/2025",
    endDate: "11/20/2025",
    category: "Technology",
  },
  {
    id: "28",
    name: "Gym Equipment Demo Series",
    influencer: "Sofia Perez",
    status: "pending",
    amount: "$3,400.00",
    startDate: "04/15/2026",
    endDate: "05/15/2026",
    category: "Health & Fitness",
  },
  {
    id: "29",
    name: "Street Food Carnival",
    influencer: "Jason Ward",
    status: "active",
    amount: "$1,750.00",
    startDate: "03/01/2026",
    endDate: "03/15/2026",
    category: "Food & Beverage",
  },
  {
    id: "30",
    name: "Budget Travel Hacks",
    influencer: "Emily Parker",
    status: "completed",
    amount: "$2,600.00",
    startDate: "08/01/2025",
    endDate: "08/25/2025",
    category: "Travel",
  },
  {
    id: "31",
    name: "Sneaker Branding Collab",
    influencer: "Leo Foster",
    status: "active",
    amount: "$3,900.00",
    startDate: "02/20/2026",
    endDate: "03/20/2026",
    category: "Fashion",
  },
  {
    id: "32",
    name: "Laptop Review Challenge",
    influencer: "Hannah Davis",
    status: "pending",
    amount: "$5,200.00",
    startDate: "05/10/2026",
    endDate: "06/10/2026",
    category: "Technology",
  },
  {
    id: "33",
    name: "Home Workout Plan Promo",
    influencer: "Aiden Moore",
    status: "completed",
    amount: "$1,980.00",
    startDate: "09/15/2025",
    endDate: "10/05/2025",
    category: "Health & Fitness",
  },
  {
    id: "34",
    name: "Culinary Street Tour Promo",
    influencer: "Isla Reed",
    status: "active",
    amount: "$1,550.00",
    startDate: "02/25/2026",
    endDate: "03/10/2026",
    category: "Food & Beverage",
  },
  {
    id: "35",
    name: "Tropical Island Vlog Series",
    influencer: "Mason Price",
    status: "pending",
    amount: "$4,950.00",
    startDate: "07/01/2026",
    endDate: "07/30/2026",
    category: "Travel",
  },
];

const ITEMS_PER_PAGE = 8;

export default function ActiveDeals() {
  const [currentPage, setCurrentPage] = React.useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(deals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDeals = deals.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
  const getStatusColor = (status: Deal["status"]) => {
    switch (status) {
      case "active":
        return "text-green-800 bg-green-100";
      case "pending":
        return "text-amber-800 bg-amber-100";
      case "completed":
        return "text-blue-800 bg-blue-100";
      default:
        return "text-gray-800 bg-gray-100";
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
                onChange={(e) => {
                  // Handle search logic here
                }}
              />
            </div>

            <select
              className="block w-full sm:w-36 px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm text-gray-700 h-full"
              onChange={(e) => {
                // Handle status filter logic here
              }}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <button
              className="px-4 py-2 bg-[#10B981CC] text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 whitespace-nowrap h-full"
              onClick={() => {}}
            >
              <span>+</span>
              <span>Add New</span>
            </button>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="[&>th]:text-white [&>th]:font-semibold [&>th]:py-3 [&>th]:px-4">
            <TableHead className="rounded-tl-lg">DEAL NAME</TableHead>
            <TableHead>INFLUENCER</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>AMOUNT</TableHead>
            <TableHead>CATEGORY</TableHead>
            <TableHead>START DATE</TableHead>
            <TableHead>END DATE</TableHead>
            <TableHead className="rounded-tr-lg">ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentDeals.map((deal) => (
            <TableRow key={deal.id} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">
                {deal.name}
              </TableCell>
              <TableCell className="text-gray-600">{deal.influencer}</TableCell>
              <TableCell>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                    deal.status
                  )}`}
                >
                  {deal.status}
                </span>
              </TableCell>
              <TableCell className="font-medium">{deal.amount}</TableCell>
              <TableCell className="text-gray-500">{deal.category}</TableCell>
              <TableCell className="text-gray-500">{deal.startDate}</TableCell>
              <TableCell className="text-gray-500">{deal.endDate}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link
                    href={`/dashboard/active-deals/deal-details`}
                    className="p-1.5 text-teal-600 rounded-full hover:bg-gray-100"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <button
                    className="p-1.5 text-teal-600 rounded-full"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    className="p-1.5 text-red-600 rounded-full"
                    title="Delete"
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
                      className={`h-8 w-8 p-0 ${
                        currentPage === page ? "bg-[#10B981CC]" : ""
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
