// components/dashboard/recent-influencers.tsx
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
import { CheckCircle, XCircle, Clock, Star, MoreVertical } from "lucide-react";

interface Influencer {
  name: string;
  handle: string;
  avatar?: string;
  status: "active" | "inactive" | "pending";
  platform: string;
  followers: string;
  engagement: string;
  rating: number;
}

const influencers: Influencer[] = [
  {
    name: "Alex Johnson",
    handle: "@alexj",
    status: "active",
    platform: "Instagram",
    followers: "125K",
    engagement: "4.8%",
    rating: 4.7,
  },
  {
    name: "Sarah Miller",
    handle: "@sarahm",
    status: "inactive",
    platform: "YouTube",
    followers: "89K",
    engagement: "3.2%",
    rating: 4.2,
  },
  {
    name: "Mike Chen",
    handle: "@mikec",
    status: "pending",
    platform: "TikTok",
    followers: "210K",
    engagement: "5.1%",
    rating: 4.9,
  },
  {
    name: "Emma Wilson",
    handle: "@emmaw",
    status: "active",
    platform: "Instagram",
    followers: "156K",
    engagement: "4.5%",
    rating: 4.6,
  },
  {
    name: "David Kim",
    handle: "@davidk",
    status: "inactive",
    platform: "Twitter",
    followers: "78K",
    engagement: "3.8%",
    rating: 4.0,
  },
];

export function RecentInfluencersTable() {
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Recent Influencers
        </h3>
        <button className="text-sm text-green-600 hover:text-green-700 font-medium">
          View All
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="[&>th]:text-white [&>th]:font-semibold [&>th]:py-3 [&>th]:px-4">
            <TableHead className="rounded-tl-lg">Influencer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Followers</TableHead>
            <TableHead>Engagement</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="rounded-tr-lg"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {influencers.map((influencer, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={influencer.avatar}
                      alt={influencer.name}
                    />
                    <AvatarFallback>{influencer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">
                      {influencer.name}
                    </p>
                    <p className="text-sm text-gray-500">{influencer.handle}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={influencer.status} />
              </TableCell>
              <TableCell>{influencer.platform}</TableCell>
              <TableCell>{influencer.followers}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className="text-green-600 font-medium">
                    {influencer.engagement}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span>{influencer.rating}</span>
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
