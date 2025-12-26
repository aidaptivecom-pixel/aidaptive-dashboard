import React from 'react';
import { NAVIGATION_ITEMS, BOTTOM_NAV } from '../../constants';
import { Search } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 border-r border-gray-100 bg-white h-screen fixed left-0 top-0 flex flex-col z-20">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#722F37] rounded-lg flex items-center justify-center">
             <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">Aidaptive</span>
        </div>
      </div>

      <div className="px-6 mb-4">
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Cliente</p>
          <p className="text-sm font-semibold text-gray-900">InfoPartes</p>
          <p className="text-xs text-gray-500">Servicio Tecnico Apple</p>
        </div>
      </div>

      <div className="px-6 mb-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input 
            type="text" 
            placeholder="Buscar cliente o ticket..." 
            className="w-full bg-gray-50 border border-gray-100 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#722F37] transition-all"
          />
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-6 overflow-y-auto pb-8">
        {NAVIGATION_ITEMS.map((group) => (
          <div key={group.group}>
            <p className="px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{group.group}</p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.path}
                    className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                      item.active 
                        ? 'bg-[#722F37]/10 text-[#722F37]' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className={item.active ? 'text-[#722F37]' : 'text-gray-400'}>
                      {item.icon}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <ul className="space-y-1">
          {BOTTOM_NAV.map((item) => (
            <li key={item.label}>
              <a href={item.path} className="flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                <span className="text-gray-400">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 text-center">Powered by Aidaptive v1.0</p>
        </div>
      </div>
    </aside>
  );
};