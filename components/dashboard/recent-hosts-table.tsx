// components/dashboard/recent-hosts-table.tsx
"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, XCircle, Clock, Star, MoreVertical, MapPin } from "lucide-react";

interface Host {
    name: string;
    propertyName: string;
    avatar?: string;
    status: "active" | "inactive" | "pending";
    location: string;
    deals: number;
    rating: number;
}

const hosts: Host[] = [
    {
        name: "Michael Chen",
        propertyName: "Downtown Luxury Apt",
        status: "active",
        location: "San Francisco, CA",
        deals: 12,
        rating: 4.9,
    },
    {
        name: "Emma Rodriguez",
        propertyName: "Beachfront Villa",
        status: "active",
        location: "Malibu, CA",
        deals: 8,
        rating: 4.8,
    },
    {
        name: "David Park",
        propertyName: "Mountain Retreat",
        status: "pending",
        location: "Aspen, CO",
        deals: 5,
        rating: 4.7,
    },
    {
        name: "Sofia Martinez",
        propertyName: "Industrial Loft",
        status: "inactive",
        location: "New York, NY",
        deals: 15,
        rating: 4.5,
    },
    {
        name: "James Wilson",
        propertyName: "Scandinavian House",
        status: "active",
        location: "Seattle, WA",
        deals: 10,
        rating: 4.6,
    },
];

export function RecentHostsTable() {
    return (
        <div className="bg-white p-5 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    Recent Hosts
                </h3>
                <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                    View All
                </button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow className="[&>th]:text-white [&>th]:font-semibold [&>th]:py-3 [&>th]:px-4">
                        <TableHead className="rounded-tl-lg">Host</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Deals</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead className="rounded-tr-lg"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {hosts.map((host, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage
                                            src={host.avatar || `https://avatar.iran.liara.run/public/${index + 1}`}
                                            alt={host.name}
                                        />
                                        <AvatarFallback>{host.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {host.name}
                                        </p>
                                        <p className="text-sm text-gray-500">{host.propertyName}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <StatusBadge status={host.status} />
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center text-gray-500">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {host.location}
                                </div>
                            </TableCell>
                            <TableCell>{host.deals} Deals</TableCell>
                            <TableCell>
                                <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                    <span>{host.rating}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreVertical className="h-5 w-5" />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function StatusBadge({
    status,
}: {
    status: "active" | "inactive" | "pending";
}) {
    const statusConfig = {
        active: {
            icon: CheckCircle,
            bg: "bg-green-100",
            text: "text-green-800",
            label: "Active",
        },
        inactive: {
            icon: XCircle,
            bg: "bg-red-100",
            text: "text-red-800",
            label: "Inactive",
        },
        pending: {
            icon: Clock,
            bg: "bg-yellow-100",
            text: "text-yellow-800",
            label: "Pending",
        },
    };

    const { icon: Icon, bg, text, label } = statusConfig[status];

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}
        >
            <Icon className="h-3 w-3 mr-1" />
            {label}
        </span>
    );
}
