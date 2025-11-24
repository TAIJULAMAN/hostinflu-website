"use client"

import { Dashboard } from "@/components/dashboard/dashboard-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
    return <Dashboard>{children}</Dashboard>
}
