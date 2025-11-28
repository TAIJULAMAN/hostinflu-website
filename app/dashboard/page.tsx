"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import SpendingGrowthChart from "@/components/dashboard/spending-growth-chart";
import ListingGrowthChart from "@/components/dashboard/listing-growth-chart";
import DealsGrowthChart from "@/components/dashboard/deals-growth-chart";
import { RecentInfluencersTable } from "@/components/dashboard/recentInfluencersTable";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background font-sans p-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard value="2K" label="Total Deals" variant="primary" />
        <StatCard value="1.2K" label="Active Deals" variant="success" />
        <StatCard value="850" label="Total Listings" variant="warning" />
        <StatCard value="$120K" label="Monthly Spending" variant="info" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-5 mb-5">
        {/* First row - two equal columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white p-5 ">
            <SpendingGrowthChart />
          </div>
          <div className="bg-white p-5 ">
            <DealsGrowthChart />
          </div>
        </div>

        {/* Second row - full width */}
        <div className="bg-white p-5 ">
          <ListingGrowthChart />
        </div>
      </div>
      <div>
        <RecentInfluencersTable />
      </div>
    </main>
  );
}
