import React from 'react';
import { TrendingUp } from 'lucide-react';

interface SalesDataPoint {
  date: string;
  amount: number;
}

interface SalesChartProps {
  data: SalesDataPoint[];
}

export const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  const maxAmount = Math.max(...data.map(d => d.amount));
  const totalWeek = data.reduce((sum, d) => sum + d.amount, 0);
  const avgDaily = Math.round(totalWeek / data.length);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Ventas de la Semana</h3>
          <p className="text-sm text-gray-500 mt-1">Ingresos diarios</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">${totalWeek.toLocaleString('es-AR')}</p>
          <p className="text-sm text-gray-500">Promedio: ${avgDaily.toLocaleString('es-AR')}/día</p>
        </div>
      </div>
      
      {/* Chart */}
      <div className="flex items-end justify-between gap-3 h-40">
        {data.map((point, index) => {
          const height = (point.amount / maxAmount) * 100;
          const isToday = index === data.length - 1;
          return (
            <div key={point.date} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-medium text-gray-600">
                ${(point.amount / 1000).toFixed(0)}k
              </span>
              <div className="w-full bg-gray-100 rounded-lg overflow-hidden" style={{ height: '120px' }}>
                <div 
                  className={`w-full rounded-lg transition-all duration-500 ${
                    isToday ? 'bg-gradient-to-t from-blue-600 to-blue-400' : 'bg-gradient-to-t from-gray-300 to-gray-200'
                  }`}
                  style={{ height: `${height}%`, marginTop: `${100 - height}%` }}
                />
              </div>
              <span className={`text-xs font-medium ${isToday ? 'text-blue-600' : 'text-gray-500'}`}>
                {point.date}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-500"></div>
          <span className="text-sm text-gray-600">Hoy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gray-300"></div>
          <span className="text-sm text-gray-600">Días anteriores</span>
        </div>
        <div className="flex items-center gap-2 ml-auto text-green-600">
          <TrendingUp size={16} />
          <span className="text-sm font-medium">+18% vs semana anterior</span>
        </div>
      </div>
    </div>
  );
};
