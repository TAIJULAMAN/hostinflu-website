"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface Deal {
  id: string;
  name: string;
  status: "active" | "pending" | "completed" | "cancelled";
  amount: string;
  progress: number;
  daysLeft: number;
  category: string;
}

const deals: Deal[] = [
  {
    id: "1",
    name: "Summer Collection Campaign",
    status: "active",
    amount: "$2,500.00",
    progress: 75,
    daysLeft: 5,
    category: "Fashion",
  },
  {
    id: "2",
    name: "Tech Gadgets Launch",
    status: "pending",
    amount: "$1,800.00",
    progress: 30,
    daysLeft: 12,
    category: "Technology",
  },
  {
    id: "3",
    name: "Fitness App Promotion",
    status: "active",
    amount: "$3,200.00",
    progress: 45,
    daysLeft: 8,
    category: "Health & Fitness",
  },
  {
    id: "4",
    name: "Food Festival Sponsorship",
    status: "completed",
    amount: "$1,200.00",
    progress: 100,
    daysLeft: 0,
    category: "Food & Beverage",
  },
  {
    id: "5",
    name: "Travel Vlog Series",
    status: "cancelled",
    amount: "$4,500.00",
    progress: 15,
    daysLeft: -2,
    category: "Travel",
  },
];

export default function ActiveDeals() {
  const getStatusIcon = (status: Deal["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Active Deals</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors">
            Add New Deal
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Filter
          </button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="[&>th]:text-gray-600 [&>th]:font-medium [&>th]:py-3 [&>th]:px-4 [&>th]:text-left">
            <TableHead>DEAL NAME</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>AMOUNT</TableHead>
            <TableHead>PROGRESS</TableHead>
            <TableHead>CATEGORY</TableHead>
            <TableHead>DAYS LEFT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals.map((deal) => (
            <TableRow key={deal.id} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">
                {deal.name}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(deal.status)}
                  <span className="capitalize">{deal.status}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium">{deal.amount}</TableCell>
              <TableCell>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      deal.progress === 100
                        ? "bg-green-500"
                        : deal.status === "cancelled"
                        ? "bg-red-500"
                        : "bg-teal-500"
                    }`}
                    style={{ width: `${deal.progress}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 mt-1 block">
                  {deal.progress}% complete
                </span>
              </TableCell>
              <TableCell className="text-gray-500">{deal.category}</TableCell>
              <TableCell
                className={deal.daysLeft < 0 ? "text-red-500" : "text-gray-500"}
              >
                {deal.daysLeft > 0
                  ? `${deal.daysLeft} days left`
                  : deal.daysLeft === 0
                  ? "Ends today"
                  : `${Math.abs(deal.daysLeft)} days ago`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
