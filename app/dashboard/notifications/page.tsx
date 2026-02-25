"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PageHeading } from "@/components/commom/pageHeading";
import {
    useUsersNotificationQuery,
    useUpdateSingleNotificationMutation,
    useUpdateAllNotificationMutation
} from "@/Redux/api/notification/notificationApi";
import { formatDistanceToNow } from "date-fns";
import Loader from "@/components/commom/loader";
import { toast } from "sonner";
import { Bell, CheckCheck, Loader2 } from "lucide-react";

export default function NotificationsPage() {
    const router = useRouter();

    // Fetch notifications
    const { data: response, isLoading, isError } = useUsersNotificationQuery({});
    const notifications = response?.data?.notifications || [];

    // Mutations
    const [updateSingle, { isLoading: isUpdatingSingle }] = useUpdateSingleNotificationMutation();
    const [updateAll, { isLoading: isUpdatingAll }] = useUpdateAllNotificationMutation();

    const handleMarkRead = async (id: string) => {
        try {
            await updateSingle(id).unwrap();
            toast.success("Notification marked as read");
        } catch (err) {
            toast.error("Failed to mark as read");
        }
    };

    const handleMarkAllRead = async () => {
        try {
            await updateAll({}).unwrap();
            toast.success("All notifications marked as read");
        } catch (err) {
            toast.error("Failed to mark all as read");
        }
    };

    if (isLoading) return <Loader />;

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-5">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                    <Bell className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Oops! Something went wrong</h3>
                <p className="text-gray-500 mt-2 max-w-xs">We couldn't load your notifications. Please check your connection and try again.</p>
                <Button variant="outline" className="mt-6" onClick={() => window.location.reload()}>
                    Retry Connection
                </Button>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto min-h-screen animate-in fade-in duration-500">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-50 rounded-xl">
                        <Bell className="h-6 w-6 text-teal-600" />
                    </div>
                    <PageHeading title="Notifications" />
                </div>

                {notifications.some((n: any) => !n.isRead) && (
                    <Button
                        variant="outline"
                        onClick={handleMarkAllRead}
                        disabled={isUpdatingAll}
                        className="bg-white border-teal-100 text-teal-600 hover:bg-teal-50 hover:text-teal-700 font-semibold gap-2 transition-all active:scale-95"
                    >
                        {isUpdatingAll ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCheck className="h-4 w-4" />}
                        Mark all as read
                    </Button>
                )}
            </div>

            <div className="space-y-4">
                {notifications.length > 0 ? (
                    notifications.map((item: any) => (
                        <div
                            key={item._id}
                            onClick={() => !item.isRead && handleMarkRead(item._id)}
                            className={`group relative flex items-start gap-5 p-5 border transition-all duration-300 rounded-[1.5rem] cursor-pointer shadow-sm ${item.isRead
                                ? "bg-white border-gray-100 opacity-75 hover:opacity-100"
                                : "bg-white border-teal-100 shadow-[0_10px_30px_rgba(20,184,166,0.05)] hover:shadow-[0_15px_35px_rgba(20,184,166,0.08)]"
                                }`}
                        >
                            {/* Status Indicator */}
                            <div className={`mt-2.5 w-2 h-2 rounded-full shrink-0 transition-all duration-500 ${item.isRead ? "bg-gray-200" : "bg-teal-500 scale-125 shadow-[0_0_10px_rgba(20,184,166,0.5)]"
                                }`}
                            />

                            {/* Content */}
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between gap-3">
                                    <h4 className={`text-base font-bold transition-colors ${item.isRead ? "text-gray-600" : "text-gray-900 group-hover:text-teal-600"}`}>
                                        {item.title}
                                    </h4>
                                    <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                        {item.createdAt ? formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }) : "just now"}
                                    </span>
                                </div>

                                <p className={`text-sm leading-relaxed transition-colors ${item.isRead ? "text-gray-500" : "text-gray-700"}`}>
                                    {item.message}
                                </p>

                                {!item.isRead && (
                                    <div className="flex items-center gap-2 pt-1 animate-pulse">
                                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500"></span>
                                        <span className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em]">New Update</span>
                                    </div>
                                )}
                            </div>

                            {/* Hover Action */}
                            {!item.isRead && (
                                <div className="hidden md:flex items-center self-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-teal-600 hover:bg-teal-50 font-bold"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleMarkRead(item._id);
                                        }}
                                    >
                                        Mark Read
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 bg-white border border-dashed border-gray-200 rounded-[2.5rem]">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <Bell className="w-10 h-10 text-gray-200" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">All caught up!</h3>
                        <p className="text-gray-500 mt-2 max-w-xs text-center">You have no new notifications. We'll let you know when something happens.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
