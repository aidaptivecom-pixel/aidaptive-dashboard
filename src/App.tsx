import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Topbar } from './components/Layout/Topbar';
import { KPICard } from './components/Dashboard/KPICard';
import { SalesChart } from './components/Dashboard/SalesChart';
import { AutomationChart } from './components/Dashboard/AutomationChart';
import { EscalationsWidget } from './components/Dashboard/EscalationsWidget';
import { InventoryAlertsWidget } from './components/Dashboard/InventoryAlertsWidget';
import { ResolutionsTable } from './components/Dashboard/ResolutionsTable';
import { ConversationsView } from './components/Conversations/ConversationsView';
import { TurnosView } from './components/Turnos/TurnosView';
import { MarketingView } from './components/Marketing/MarketingView';
import { ServicioTecnicoView } from './components/ServicioTecnico/ServicioTecnicoView';
import { VentasView } from './components/Ventas/VentasView';
import { PosventaView } from './components/Posventa/PosventaView';
import { PedidosView } from './components/Pedidos/PedidosView';
import { InventarioView } from './components/Inventario/InventarioView';
import { CotizacionesView } from './components/Cotizaciones/CotizacionesView';

// Mock Data for Dashboard
const MOCK_KPI_DATA = [
  { label: 'Ventas Hoy', value: '$485.200', delta: '+18%', variant: 'success' as const },
  { label: 'Pedidos Pendientes', value: '12', delta: '-3', variant: 'warning' as const },
  { label: 'Stock Bajo', value: '5', delta: '+2', variant: 'error' as const },
  { label: 'Equipos en Taller', value: '8', delta: '0', variant: 'neutral' as const },
  { label: 'Tasa Automatización', value: '94.2%', delta: '+2.1%', variant: 'success' as const },
  { label: 'Derivaciones Hoy', value: '3', delta: '-40%', variant: 'success' as const },
];

const MOCK_SALES_DATA = [
  { date: 'Lun', amount: 320000 },
  { date: 'Mar', amount: 450000 },
  { date: 'Mié', amount: 380000 },
  { date: 'Jue', amount: 520000 },
  { date: 'Vie', amount: 610000 },
  { date: 'Sáb', amount: 290000 },
  { date: 'Hoy', amount: 485200 },
];

const MOCK_AUTOMATION_DATA = [
  { date: 'Lun', automated: 38, manual: 4 },
  { date: 'Mar', automated: 51, manual: 4 },
  { date: 'Mié', automated: 44, manual: 4 },
  { date: 'Jue', automated: 58, manual: 4 },
  { date: 'Vie', automated: 67, manual: 4 },
  { date: 'Sáb', automated: 33, manual: 2 },
  { date: 'Hoy', automated: 45, manual: 3 },
];

const MOCK_ESCALATIONS = [
  { id: '1', client: 'Juan Pérez', reason: 'Problema con garantía', time: '10 min', priority: 'high' as const },
  { id: '2', client: 'María García', reason: 'Precio mayorista especial', time: '25 min', priority: 'medium' as const },
  { id: '3', client: 'Carlos López', reason: 'Reclamo por envío', time: '1h', priority: 'high' as const },
];

const MOCK_INVENTORY_ALERTS = [
  { id: '1', product: 'RTX 4060 8GB', sku: 'GPU-4060-8G', stock: 2, minStock: 5 },
  { id: '2', product: 'Fuente Corsair 700W', sku: 'PSU-COR-700', stock: 0, minStock: 3 },
  { id: '3', product: 'RAM DDR5 16GB Kingston', sku: 'RAM-DDR5-16K', stock: 3, minStock: 10 },
  { id: '4', product: 'SSD NVMe 1TB Samsung', sku: 'SSD-SAM-1TB', stock: 4, minStock: 8 },
  { id: '5', product: 'Monitor LG 27" 144Hz', sku: 'MON-LG27-144', stock: 1, minStock: 3 },
];

const MOCK_RESOLUTIONS = [
  { id: '1', client: 'Luis Rodríguez', type: 'stock' as const, summary: 'Stock RTX 4070 → Disponible, 5 unidades', time: 'Hace 2 min' },
  { id: '2', client: 'Ana Fernández', type: 'pedido' as const, summary: 'Tracking #TN-1234 enviado por email', time: 'Hace 5 min' },
  { id: '3', client: 'Pedro Martínez', type: 'turno' as const, summary: 'Turno agendado Lun 15:30', time: 'Hace 8 min' },
  { id: '4', client: 'Marta Gómez', type: 'precio' as const, summary: 'Cotización RTX 4080 enviada', time: 'Hace 12 min' },
  { id: '5', client: 'Roberto Sánchez', type: 'consulta' as const, summary: 'Compatibilidad RAM DDR5 confirmada', time: 'Hace 15 min' },
  { id: '6', client: 'Laura Torres', type: 'pedido' as const, summary: 'Estado pedido: En preparación', time: 'Hace 18 min' },
];

type View = 'dashboard' | 'conversations' | 'appointments' | 'marketing' | 'repairs' | 'sales' | 'posventa' | 'orders' | 'inventory' | 'quotes' | 'analytics' | 'clients' | 'settings';

const viewToPath: Record<View, string> = {
  dashboard: '/',
  orders: '/orders',
  inventory: '/inventory',
  sales: '/sales',
  quotes: '/quotes',
  repairs: '/repairs',
  appointments: '/appointments',
  conversations: '/conversations',
  posventa: '/posventa',
  marketing: '/marketing',
  analytics: '/analytics',
  clients: '/clients',
  settings: '/settings',
};

const viewTitles: Record<View, string> = {
  dashboard: 'Dashboard',
  orders: 'Pedidos',
  inventory: 'Inventario',
  sales: 'Ventas',
  quotes: 'Cotizaciones',
  repairs: 'Servicio Técnico',
  appointments: 'Turnos',
  conversations: 'Conversaciones',
  posventa: 'Posventa',
  marketing: 'Marketing',
  analytics: 'Analytics',
  clients: 'Clientes',
  settings: 'Ajustes',
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const handleNavigation = (path: string) => {
    const viewEntry = Object.entries(viewToPath).find(([_, p]) => p === path);
    if (viewEntry) {
      setCurrentView(viewEntry[0] as View);
    }
  };

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.getAttribute('href')?.startsWith('/')) {
        e.preventDefault();
        handleNavigation(link.getAttribute('href') || '/');
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Placeholder component for views not yet implemented
  const PlaceholderView = ({ title }: { title: string }) => (
    <div className="flex items-center justify-center h-64 bg-white rounded-2xl border border-gray-200 border-dashed">
      <div className="text-center">
        <p className="text-gray-400 text-lg">Módulo {title}</p>
        <p className="text-gray-300 text-sm mt-1">En desarrollo</p>
      </div>
    </div>
  );

  // Check if current view has its own title header (to avoid duplicate)
  const viewsWithOwnHeader = ['inventory', 'sales', 'orders', 'quotes', 'repairs', 'appointments', 'conversations'];
  const showPageTitle = !viewsWithOwnHeader.includes(currentView);

  return (
    <div className="min-h-screen bg-[#E5E7EB] p-4">
      <div className="flex flex-col h-[calc(100vh-32px)] rounded-3xl overflow-hidden shadow-xl bg-white">
        {/* Top Header Bar */}
        <div className="flex items-center border-b border-gray-200 bg-white">
          <div className="w-64 px-6 py-4 flex-shrink-0">
            <Sidebar currentPath={viewToPath[currentView]} headerOnly />
          </div>
          <div className="flex-1 px-8 py-4">
            <Topbar currentView={currentView} />
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          <div className="w-64 flex-shrink-0 border-r border-gray-100 bg-white">
            <Sidebar currentPath={viewToPath[currentView]} navOnly />
          </div>
          
          <main className="flex-1 bg-[#F9FAFB] flex flex-col overflow-hidden">
            {/* Page Title Row - only show if view doesn't have its own header */}
            {showPageTitle && (
              <div className="px-8 py-6 bg-[#F9FAFB]">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">{viewTitles[currentView]}</h1>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Crear Reporte
                  </button>
                </div>
              </div>
            )}
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-8 pb-8">
              {currentView === 'dashboard' && (
                <div className="space-y-6">
                  {/* KPIs Row */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {MOCK_KPI_DATA.map((kpi) => (
                      <KPICard 
                        key={kpi.label}
                        label={kpi.label}
                        value={kpi.value}
                        delta={kpi.delta}
                        deltaVariant={kpi.variant}
                      />
                    ))}
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SalesChart data={MOCK_SALES_DATA} />
                    <AutomationChart data={MOCK_AUTOMATION_DATA} />
                  </div>

                  {/* Alerts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <EscalationsWidget escalations={MOCK_ESCALATIONS} />
                    <InventoryAlertsWidget alerts={MOCK_INVENTORY_ALERTS} />
                  </div>

                  {/* Resolutions Table */}
                  <ResolutionsTable resolutions={MOCK_RESOLUTIONS} />
                </div>
              )}

              {currentView === 'orders' && <PedidosView />}
              {currentView === 'inventory' && <InventarioView />}
              {currentView === 'quotes' && <CotizacionesView />}
              {currentView === 'conversations' && <ConversationsView />}
              {currentView === 'appointments' && <TurnosView />}
              {currentView === 'marketing' && <MarketingView />}
              {currentView === 'repairs' && <ServicioTecnicoView />}
              {currentView === 'sales' && <VentasView />}
              {currentView === 'posventa' && <PosventaView />}
              
              {/* Placeholder views */}
              {currentView === 'analytics' && <PlaceholderView title="Analytics" />}
              {currentView === 'clients' && <PlaceholderView title="Clientes" />}
              {currentView === 'settings' && <PlaceholderView title="Ajustes" />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
