import { NAVIGATION_ITEMS, BOTTOM_NAV } from '../../constants';
import { Search, Apple } from 'lucide-react';

interface SidebarProps {
  currentPath: string;
}

export const Sidebar = ({ currentPath }: SidebarProps) => {
  // Normalize path for comparison
  const isActive = (path: string) => {
    if (path === '/' || path === '/dashboard') {
      return currentPath === '/' || currentPath === '/dashboard' || currentPath === 'dashboard';
    }
    return currentPath === path || currentPath === path.replace('/', '');
  };

  return (
    <aside className="w-64 border-r border-gray-100 bg-white h-screen fixed left-0 top-0 flex flex-col z-20">
      {/* Brand - InfoPartes */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-lg">
            <Apple className="text-white" size={22} />
          </div>
          <div>
            <span className="font-bold text-lg text-gray-900 tracking-tight block">InfoPartes</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Servicio Tecnico</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 mb-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input 
            type="text" 
            placeholder="Buscar cliente o ticket..." 
            className="w-full bg-gray-50 border border-gray-100 rounded-lg pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all"
          />
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-4 space-y-6 overflow-y-auto pb-8">
        {NAVIGATION_ITEMS.map((group) => (
          <div key={group.group}>
            <p className="px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{group.group}</p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.label}>
                    <a 
                      href={item.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        active 
                          ? 'bg-gray-900 text-white shadow-sm' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span className={active ? 'text-white' : 'text-gray-400'}>
                        {item.icon}
                      </span>
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer Nav */}
      <div className="p-4 border-t border-gray-100">
        <ul className="space-y-1">
          {BOTTOM_NAV.map((item) => (
            <li key={item.label}>
              <a href={item.path} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                <span className="text-gray-400">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
