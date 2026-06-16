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

import { useGetAllUsersQuery } from "@/Redux/api/user/userApi";
import { imgUrl } from "@/config/envConfig";
export function RecentHostsTable() {
    const { data: usersResponse, isLoading } = useGetAllUsersQuery({ role: "host" });
    const hosts = usersResponse?.data?.slice(0, 5) || [];

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
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>collaborations</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead className="rounded-tr-lg"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-4">Loading...</TableCell>
                        </TableRow>
                    ) : hosts.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-4">No recent hosts found</TableCell>
                        </TableRow>
                    ) : hosts.map((host: any, index: number) => (
                        <TableRow key={host._id || index}>
                            <TableCell className="font-medium">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage
                                            src={host.image ? (host.image.startsWith('http') ? host.image : `${imgUrl}${host.image}`) : `https://avatar.iran.liara.run/public/${index + 1}`}
                                            alt={host.name}
                                        />
                                        <AvatarFallback>{host.name?.[0] || "H"}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {host.name}
                                        </p>
                                        <p className="text-sm text-gray-500">{host.userName || "Host"}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{host.email}</TableCell>
                            <TableCell>
                                <StatusBadge status={host.status || "inactive"} />
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center text-gray-500">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {host.city ? `${host.city}, ${host.country}` : host.country || "Location unknown"}
                                </div>
                            </TableCell>
                            <TableCell>{host.collaborationsTotal || 0} Collaborations</TableCell>
                            <TableCell>
                                <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                    <span>{host.averageRating || 0}</span>
                                </div>
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
    status: string;
}) {
    const statusConfig: Record<string, any> = {
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

    const config = statusConfig[status?.toLowerCase()] || statusConfig.inactive;
    const { icon: Icon, bg, text, label } = config;

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}
        >
            <Icon className="h-3 w-3 mr-1" />
            {label}
        </span>
    );
}
