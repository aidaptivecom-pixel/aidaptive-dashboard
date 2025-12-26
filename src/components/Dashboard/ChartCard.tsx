import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshCcw, Download, Calendar } from 'lucide-react';
import { ChartDataPoint } from '../../types';

interface ChartCardProps {
  data: ChartDataPoint[];
  title: string;
  subtitle: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-xl border border-gray-100 rounded-xl min-w-[180px]">
        <div className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-bold text-gray-500 inline-block mb-3">
          {label.toUpperCase()}
        </div>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-xs text-gray-500 font-medium">{entry.name}</span>
              </div>
              <span className="text-xs font-bold text-gray-900">{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const ChartCard: React.FC<ChartCardProps> = ({ data, title, subtitle }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className="flex gap-2 text-gray-400">
          <button className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1 text-xs text-gray-500">
            <Calendar size={14} />
            <span>Esta semana</span>
          </button>
          <button className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors"><RefreshCcw size={16} /></button>
          <button className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors"><Download size={16} /></button>
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#722F37" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#722F37" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAutomated" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
            <Tooltip content={<CustomTooltip />} />
            <Area name="Total Mensajes" type="monotone" dataKey="total" stroke="#722F37" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
            <Area name="Resueltos Auto" type="monotone" dataKey="automated" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorAutomated)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#722F37]"></div>
          <span className="text-xs text-gray-500">Total Mensajes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="text-xs text-gray-500">Resueltos Automaticamente</span>
        </div>
      </div>
    </div>
  );
};