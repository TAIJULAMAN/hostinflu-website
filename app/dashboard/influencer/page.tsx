"use client";
import { StatCard } from "@/components/dashboard/stat-card";
import EarningGrowthChart from "@/components/dashboard/earning-growth-chart";
import CollaborationGrowthChart from "@/components/dashboard/collaboration-growth-chart";
import { RecentHostsTable } from "@/components/dashboard/recent-hosts-table";
import { useGetInfluencerDashboardQuery } from "@/Redux/api/influencer/influencerApi";

export default function InfluencerDashboard() {
    const { data: dashboardResponse, isLoading } = useGetInfluencerDashboardQuery({});
    const dashboardData = dashboardResponse?.data;
    const totals = dashboardData?.totals;

    return (
        <main className="min-h-screen bg-background font-sans p-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <StatCard
                    value={isLoading ? "..." : totals?.collaborations?.total?.toString() || "0"}
                    label="Total Collaborations"
                    variant="primary"
                />
                <StatCard
                    value={isLoading ? "..." : totals?.nightStays?.total?.toString() || "0"}
                    label="Night Star"
                    variant="success"
                />
                <StatCard
                    value={isLoading ? "..." : totals?.earnings?.currentMonth ? `$${totals.earnings.currentMonth}` : "$0"}
                    label="Monthly Earnings"
                    variant="warning"
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 gap-5 mb-5">
                {/* First row - two equal columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="bg-white p-5 ">
                        <EarningGrowthChart />
                    </div>
                    <div className="bg-white p-5 ">
                        <CollaborationGrowthChart />
                    </div>
                </div>
            </div>
            <div>
                <RecentHostsTable />
            </div>
        </main>
    );
}
