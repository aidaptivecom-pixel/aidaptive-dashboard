import { NAVIGATION_ITEMS, BOTTOM_NAV } from '../../constants';
import { Apple, Copy } from 'lucide-react';

interface SidebarProps {
  currentPath: string;
  headerOnly?: boolean;
  navOnly?: boolean;
}

export const Sidebar = ({ currentPath, headerOnly, navOnly }: SidebarProps) => {
  // Normalize path for comparison
  const isActive = (path: string) => {
    if (path === '/' || path === '/dashboard') {
      return currentPath === '/' || currentPath === '/dashboard' || currentPath === 'dashboard';
    }
    return currentPath === path || currentPath === path.replace('/', '');
  };

  // Header only mode - just the logo
  if (headerOnly) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Apple className="text-white" size={20} />
          </div>
          <span className="font-bold text-lg text-gray-900 tracking-tight">InfoPartes</span>
        </div>
        <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
          <Copy size={18} />
        </button>
      </div>
    );
  }

  // Nav only mode - just the navigation
  if (navOnly) {
    return (
      <div className="flex flex-col h-full">
        {/* Navigation Groups */}
        <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
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
      </div>
    );
  }

  // Full sidebar (legacy, shouldn't be used)
  return null;
};
