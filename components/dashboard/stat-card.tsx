import React from 'react';
import { Users, BarChart, ListChecks, DollarSign } from 'lucide-react';

type CardVariant = 'primary' | 'success' | 'warning' | 'info';

interface StatCardProps {
  value: string;
  label: string;
  variant?: CardVariant;
  icon?: React.ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  primary: 'bg-blue-50 text-blue-600',
  success: 'bg-green-50 text-green-600',
  warning: 'bg-amber-50 text-amber-600',
  info: 'bg-cyan-50 text-cyan-600',
};

const variantIcons: Record<CardVariant, React.ReactNode> = {
  primary: <Users className="w-6 h-6" />,
  success: <BarChart className="w-6 h-6" />,
  warning: <ListChecks className="w-6 h-6" />,
  info: <DollarSign className="w-6 h-6" />,
};

export function StatCard({ 
  value, 
  label, 
  variant = 'primary',
  icon
}: StatCardProps) {
  const IconComponent = variantIcons[variant];
  
  return (
    <div className={`relative flex flex-col p-4 rounded-lg ${variantStyles[variant]} transition-all hover:shadow-md`}>
      <div className="flex justify-between items-center mb-2">
        <p className="text-2xl font-bold">{value}</p>
        <div className="p-2 rounded-full bg-white/50">
          {icon || IconComponent}
        </div>
      </div>
      <p className="text-sm font-medium opacity-90">{label}</p>
    </div>
  );
}
