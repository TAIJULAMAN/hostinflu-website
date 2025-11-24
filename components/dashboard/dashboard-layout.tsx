"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { MainHeader } from "./main-header"

export function Dashboard({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    return (
        <div className="flex min-h-screen relative overflow-hidden bg-gray-50">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-40 lg:hidden"
                />
            )}

            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex flex-col w-full overflow-hidden h-screen">
                <MainHeader toggleSidebar={toggleSidebar} />
                <main className="p-6 flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
