import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Topbar } from './components/Layout/Topbar';
import { KPICard } from './components/Dashboard/KPICard';
import { ChartCard } from './components/Dashboard/ChartCard';
import { RecentActivityTable } from './components/Dashboard/RecentActivityTable';
import { ConversationsView } from './components/Conversations/ConversationsView';
import { TurnosView } from './components/Turnos/TurnosView';
import { MarketingView } from './components/Marketing/MarketingView';
import { ConversationStatus, Conversation, ChartDataPoint } from './types';

const MOCK_KPI_DATA: Array<{ label: string; value: string; delta: string; variant: 'success' | 'warning' | 'error' | 'neutral' }> = [
  { label: 'Conversaciones Hoy', value: '47', delta: '+12%', variant: 'success' },
  { label: 'Turnos Agendados', value: '18', delta: '+8%', variant: 'success' },
  { label: 'Tasa de Resolución', value: '94.2%', delta: '+2.1%', variant: 'success' },
  { label: 'Consultas Pendientes', value: '3', delta: '-40%', variant: 'warning' },
];

const MOCK_CHART_DATA: ChartDataPoint[] = [
  { date: 'Lun', total: 42, automated: 38 },
  { date: 'Mar', total: 55, automated: 51 },
  { date: 'Mié', total: 48, automated: 44 },
  { date: 'Jue', total: 62, automated: 58 },
  { date: 'Vie', total: 71, automated: 67 },
  { date: 'Sáb', total: 35, automated: 33 },
  { date: 'Dom', total: 12, automated: 11 },
];

const MOCK_CONVERSATIONS: Conversation[] = [
  { 
    id: '1', 
    client: { name: 'Juan Pérez', phone: '+54 9 11 2345-6789' }, 
    type: 'Turno', 
    agent: 'AgenteTurnos',
    message: 'Turno confirmado para el viernes 15:30',
    time: 'Hace 2 min',
    status: ConversationStatus.COMPLETED 
  },
  { 
    id: '2', 
    client: { name: 'María García', phone: '+54 9 11 3456-7890' }, 
    type: 'Consulta', 
    agent: 'AgenteConsultas',
    message: 'Precio cambio pantalla iPhone 13',
    time: 'Hace 5 min',
    status: ConversationStatus.COMPLETED 
  },
  { 
    id: '3', 
    client: { name: 'Carlos López', phone: '+54 9 11 4567-8901' }, 
    type: 'Reparacion', 
    agent: 'AgenteReparaciones',
    message: 'Estado del equipo: En diagnóstico',
    time: 'Hace 8 min',
    status: ConversationStatus.IN_PROGRESS 
  },
  { 
    id: '4', 
    client: { name: 'Ana Martínez', phone: '+54 9 11 5678-9012' }, 
    type: 'Venta', 
    agent: 'AgenteVentas',
    message: 'Consultando stock de fundas MacBook',
    time: 'Hace 12 min',
    status: ConversationStatus.COMPLETED 
  },
  { 
    id: '5', 
    client: { name: 'Roberto Sánchez', phone: '+54 9 11 6789-0123' }, 
    type: 'Derivacion', 
    agent: 'Supervisor',
    message: 'Solicita hablar con un técnico',
    time: 'Hace 15 min',
    status: ConversationStatus.ESCALATED 
  },
  { 
    id: '6', 
    client: { name: 'Laura Fernández', phone: '+54 9 11 7890-1234' }, 
    type: 'Turno', 
    agent: 'AgenteTurnos',
    message: 'Reprogramación para el lunes 11:30',
    time: 'Hace 18 min',
    status: ConversationStatus.COMPLETED 
  },
];

type View = 'dashboard' | 'conversations' | 'appointments' | 'marketing';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const handleNavigation = (path: string) => {
    if (path === '/' || path === '/dashboard') {
      setCurrentView('dashboard');
    } else if (path === '/conversations') {
      setCurrentView('conversations');
    } else if (path === '/appointments') {
      setCurrentView('appointments');
    } else if (path === '/marketing') {
      setCurrentView('marketing');
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

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 max-w-7xl mx-auto w-full">
        <Topbar />
        
        {currentView === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <ChartCard 
              data={MOCK_CHART_DATA}
              title="Conversaciones de la Semana"
              subtitle="Total de mensajes vs. resueltos automáticamente"
            />
            <RecentActivityTable conversations={MOCK_CONVERSATIONS} />
          </div>
        )}

        {currentView === 'conversations' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Centro de Conversaciones</h1>
                <p className="text-sm text-gray-500">Gestiona todas las conversaciones desde un solo lugar</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Bot IA Activo
                </span>
              </div>
            </div>
            <ConversationsView />
          </div>
        )}

        {currentView === 'appointments' && (
          <TurnosView />
        )}

        {currentView === 'marketing' && (
          <MarketingView />
        )}
      </main>
    </div>
  );
};

export default App;
