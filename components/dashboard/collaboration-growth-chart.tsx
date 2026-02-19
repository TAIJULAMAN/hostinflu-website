"use client";

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useUserCollaborationGrowthQuery } from '@/Redux/api/dashboard/dashboardApi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function CollaborationGrowthChart() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    const { data: collaborationData, isLoading } = useUserCollaborationGrowthQuery({ year: selectedYear });

    const monthlyCounts = collaborationData?.data?.monthlyData?.map((item: any) => item.count) || new Array(12).fill(0);

    const data = {
        labels: months,
        datasets: [
            {
                label: 'New Collaborations',
                data: monthlyCounts,
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.5)',
                tension: 0.3
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Monthly Collaborations Overview'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Collaboration Growth</h3>
                <div className="relative">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown className="h-4 w-4" />
                    </div>
                </div>
            </div>
            <div className="h-80">
                {isLoading ? (
                    <div className="flex h-full items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                    </div>
                ) : (
                    <Line data={data} options={options} />
                )}
            </div>
        </div>
    );
}
