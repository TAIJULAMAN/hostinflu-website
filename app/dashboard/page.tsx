"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import SpendingGrowthChart from "@/components/dashboard/spending-growth-chart";
import ListingGrowthChart from "@/components/dashboard/listing-growth-chart";
import { useGetAllTotalOfDashboardQuery } from "@/Redux/api/dashboard/dashboardApi";
import Loader from "@/components/commom/loader";
import CollaborationGrowthChart from "@/components/dashboard/collaboration-growth-chart";

export default function Dashboard() {
  const { data: dashboardData, isLoading } = useGetAllTotalOfDashboardQuery({});

  if (isLoading) {
    return (
      <Loader />
    );
  }

  const { totals } = dashboardData?.data || {};

  return (
    <main className="min-h-screen bg-background font-sans p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
        <StatCard
          value={totals?.collaborations?.total?.toString() || "0"}
          label="Total Collaborations"
          variant="success"
        />
        <StatCard
          value={totals?.listings?.total?.toString() || "0"}
          label="Total Listings"
          variant="warning"
        />
        <StatCard
          value={`$${totals?.spending?.total?.toLocaleString() || "0"}`}
          label="Total Spending"
          variant="info"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 mb-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white p-5 ">
            <SpendingGrowthChart />
          </div>
          <div className="bg-white p-5 ">
            <CollaborationGrowthChart />
          </div>
        </div>
        <div className="bg-white p-5 ">
          <ListingGrowthChart />
        </div>
      </div>
    </main>
  );
}
