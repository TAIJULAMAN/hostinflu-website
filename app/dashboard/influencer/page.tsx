import { StatCard } from "@/components/dashboard/stat-card";
import EarningGrowthChart from "@/components/dashboard/earning-growth-chart";
import CollaborationGrowthChart from "@/components/dashboard/collaboration-growth-chart";
import { RecentHostsTable } from "@/components/dashboard/recent-hosts-table";

export default function InfluencerDashboard() {
    return (
        <main className="min-h-screen bg-background font-sans p-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard value="200" label="Total Collaborations" variant="primary" />
                <StatCard value="120" label="Completed Content" variant="success" />
                <StatCard value="85K" label="Monthly Earnings" variant="warning" />
                <StatCard value="120" label="Monthly Stars" variant="info" />
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
