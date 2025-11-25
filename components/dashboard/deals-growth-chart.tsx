// components/dashboard/deals-growth-chart.tsx
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const yearlyDeals = {
  2022: {
    closed: [12, 15, 10, 18, 20, 22, 25, 23, 20, 18, 22, 24],
    inProgress: [8, 10, 12, 15, 18, 16, 14, 16, 18, 20, 18, 22]
  },
  2023: {
    closed: [15, 18, 20, 22, 25, 28, 30, 32, 30, 28, 32, 35],
    inProgress: [12, 14, 16, 18, 20, 22, 20, 22, 24, 25, 28, 30]
  }
};

export default function DealsGrowthChart() {
  const [selectedYear, setSelectedYear] = useState(2023);
  const years = [2022, 2023];

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Deals Closed',
        data: yearlyDeals[selectedYear as keyof typeof yearlyDeals].closed,
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderRadius: 4
      },
      {
        label: 'Deals in Progress',
        data: yearlyDeals[selectedYear as keyof typeof yearlyDeals].inProgress,
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
        borderRadius: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Deals Overview'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          precision: 0
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Deals Growth</h3>
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
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}