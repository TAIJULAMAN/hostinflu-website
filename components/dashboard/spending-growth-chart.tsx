// components/dashboard/spending-growth-chart.tsx
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useUserSpendingGrowthQuery } from '@/Redux/api/dashboard/dashboardApi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function SpendingGrowthChart() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const { data: spendingData, isLoading } = useUserSpendingGrowthQuery({ year: selectedYear });

  const monthlyAmounts = spendingData?.data?.monthlyData?.map((item: any) => item.amount) || new Array(12).fill(0);

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Spending',
        data: monthlyAmounts,
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
        text: 'Monthly Spending Overview'
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
        <h3 className="text-lg font-semibold text-gray-800">Spending Growth</h3>
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
          <div className="flex h-full items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>
    </div>
  );
}