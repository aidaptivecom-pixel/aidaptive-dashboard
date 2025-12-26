import React from 'react';
import { Bell, RefreshCcw } from 'lucide-react';

export const Topbar: React.FC = () => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('es-AR', options);

  return (
    <div className="mb-8 flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>
        <p className="text-sm text-gray-500 mt-1 capitalize">{formattedDate}</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
          <RefreshCcw size={18} />
        </button>
        <button className="relative p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#722F37] text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
        </button>
        <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Matias</p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#722F37] flex items-center justify-center text-white font-semibold text-sm">
            M
          </div>
        </div>
      </div>
    </div>
  );
};