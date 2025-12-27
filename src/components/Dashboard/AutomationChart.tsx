import React from 'react';
import { Bot, User } from 'lucide-react';

interface AutomationDataPoint {
  date: string;
  automated: number;
  manual: number;
}

interface AutomationChartProps {
  data: AutomationDataPoint[];
}

export const AutomationChart: React.FC<AutomationChartProps> = ({ data }) => {
  const totalAutomated = data.reduce((sum, d) => sum + d.automated, 0);
  const totalManual = data.reduce((sum, d) => sum + d.manual, 0);
  const total = totalAutomated + totalManual;
  const automationRate = Math.round((totalAutomated / total) * 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Automatización</h3>
          <p className="text-sm text-gray-500 mt-1">Resueltas IA vs Derivadas</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
          <Bot size={16} className="text-green-600" />
          <span className="text-sm font-bold text-green-700">{automationRate}% IA</span>
        </div>
      </div>

      {/* Stacked Bar Chart */}
      <div className="space-y-3">
        {data.map((point) => {
          const total = point.automated + point.manual;
          const automatedPercent = (point.automated / total) * 100;
          return (
            <div key={point.date} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500 w-10">{point.date}</span>
              <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden flex">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-end pr-2"
                  style={{ width: `${automatedPercent}%` }}
                >
                  {automatedPercent > 15 && (
                    <span className="text-xs font-medium text-white">{point.automated}</span>
                  )}
                </div>
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-300 flex items-center pl-2"
                  style={{ width: `${100 - automatedPercent}%` }}
                >
                  {(100 - automatedPercent) > 10 && (
                    <span className="text-xs font-medium text-amber-800">{point.manual}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Bot size={20} className="text-green-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{totalAutomated}</p>
            <p className="text-xs text-gray-500">Resueltas por IA</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <User size={20} className="text-amber-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{totalManual}</p>
            <p className="text-xs text-gray-500">Derivadas a humano</p>
          </div>
        </div>
      </div>
    </div>
  );
};
