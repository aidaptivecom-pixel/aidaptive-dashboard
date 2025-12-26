import React from 'react';
import { Badge } from '../UI/Badge';

interface KPICardProps {
  label: string;
  value: string;
  delta: string;
  deltaVariant?: 'success' | 'warning' | 'error' | 'neutral';
}

export const KPICard: React.FC<KPICardProps> = ({ label, value, delta, deltaVariant = 'success' }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="bg-gray-50/50 px-4 py-3 border-b border-gray-100">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</h3>
      </div>
      <div className="p-4 flex items-end justify-between">
        <span className="text-2xl font-bold text-gray-900 tracking-tight">{value}</span>
        <Badge variant={deltaVariant}>{delta}</Badge>
      </div>
    </div>
  );
};