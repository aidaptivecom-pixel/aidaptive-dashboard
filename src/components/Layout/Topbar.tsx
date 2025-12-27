import React from 'react';
import { Bell, Mail, Search, FileText } from 'lucide-react';

interface TopbarProps {
  currentView?: string;
}

export const Topbar: React.FC<TopbarProps> = ({ currentView = 'Dashboard' }) => {
  // Map view names to display names
  const viewNames: Record<string, string> = {
    dashboard: 'Dashboard',
    conversations: 'Conversaciones',
    appointments: 'Turnos',
    sales: 'Ventas',
    posventa: 'Posventa',
    repairs: 'Servicio Técnico',
    marketing: 'Marketing',
  };

  const displayName = viewNames[currentView.toLowerCase()] || currentView;

  return (
    <div className="space-y-6">
      {/* Top Bar - Breadcrumb + Search + Icons */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Panel de Control</span>
          <span className="text-gray-300">/</span>
          <span className="text-blue-600 font-medium">{displayName}</span>
        </div>

        {/* Search + Actions */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="w-64 bg-white border border-gray-200 rounded-lg pl-10 pr-12 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-gray-400">
              <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-medium">⌘</span>
              <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-medium">K</span>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1">
            <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
              <Mail size={20} />
            </button>
          </div>

          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" 
              alt="Usuario" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Title Row - Page Title + Action Button */}
      <div className="flex items-center justify-between pb-6">
        <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
          <FileText size={16} />
          Crear Reporte
        </button>
      </div>
    </div>
  );
};
