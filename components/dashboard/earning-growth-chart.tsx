"use client";

// components/dashboard/earning-growth-chart.tsx
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useGetInfluencerEarningGrowthQuery } from '@/Redux/api/influencer/influencerApi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function EarningGrowthChart() {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const years = [currentYear - 2, currentYear - 1, currentYear, currentYear + 1];

    const { data: earningResponse, isLoading } = useGetInfluencerEarningGrowthQuery({ year: selectedYear });
    
    const monthlyData = earningResponse?.data?.monthlyData || [];
    const chartDataValues = monthlyData.length > 0 ? monthlyData.map((item: any) => item.amount) : new Array(12).fill(0);

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Monthly Earnings',
                data: chartDataValues,
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
                borderRadius: 4
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
                text: 'Monthly Earnings Overview'
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `$${context.raw.toLocaleString()}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                    callback: (value: any) => `$${value}`
                }
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Earning Growth</h3>
                <div className="relative">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    <div className="h-full flex items-center justify-center text-gray-500">Loading chart...</div>
                ) : (
                    <Bar data={data} options={options} />
                )}
            </div>
        </div>
    );
}
