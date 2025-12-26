import React from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Topbar } from './components/Layout/Topbar';
import { KPICard } from './components/Dashboard/KPICard';
import { ChartCard } from './components/Dashboard/ChartCard';
import { RecentActivityTable } from './components/Dashboard/RecentActivityTable';
import { ConversationStatus, Conversation, ChartDataPoint } from './types';

const MOCK_KPI_DATA = [
  { label: 'Conversaciones Hoy', value: '47', delta: '+12%', variant: 'success' },
  { label: 'Turnos Agendados', value: '18', delta: '+8%', variant: 'success' },
  { label: 'Tasa de Resolucion', value: '94.2%', delta: '+2.1%', variant: 'success' },
  { label: 'Consultas Pendientes', value: '3', delta: '-40%', variant: 'warning' },
];

const MOCK_CHART_DATA: ChartDataPoint[] = [
  { date: 'Lun', total: 42, automated: 38 },
  { date: 'Mar', total: 55, automated: 51 },
  { date: 'Mie', total: 48, automated: 44 },
  { date: 'Jue', total: 62, automated: 58 },
  { date: 'Vie', total: 71, automated: 67 },
  { date: 'Sab', total: 35, automated: 33 },
  { date: 'Dom', total: 12, automated: 11 },
];

const MOCK_CONVERSATIONS: Conversation[] = [
  { 
    id: '1', 
    client: { name: 'Juan Perez', phone: '+54 9 11 2345-6789' }, 
    type: 'Turno', 
    agent: 'AgenteTurnos',
    message: 'Turno confirmado para el viernes 15:30',
    time: 'Hace 2 min',
    status: ConversationStatus.COMPLETED 
  },
  { 
    id: '2', 
    client: { name: 'Maria Garcia', phone: '+54 9 11 3456-7890' }, 
    type: 'Consulta', 
    agent: 'AgenteConsultas',
    message: 'Precio cambio pantalla iPhone 13',
    time: 'Hace 5 min',
    status: ConversationStatus.COMPLETED 
  },
  { 
    id: '3', 
    client: { name: 'Carlos Lopez', phone: '+54 9 11 4567-8901' }, 
    type: 'Reparacion', 
    agent: 'AgenteReparaciones',
    message: 'Estado del equipo: En diagnostico',
    time: 'Hace 8 min',
    status: ConversationStatus.IN_PROGRESS 
  },
  { 
    id: '4', 
    client: { name: 'Ana Martinez', phone: '+54 9 11 5678-9012' }, 
    type: 'Venta', 
    agent: 'AgenteVentas',
    message: 'Consultando stock de fundas MacBook',
    time: 'Hace 12 min',
    status: ConversationStatus.COMPLETED 
  },
  { 
    id: '5', 
    client: { name: 'Roberto Sanchez', phone: '+54 9 11 6789-0123' }, 
    type: 'Derivacion', 
    agent: 'Supervisor',
    message: 'Solicita hablar con un tecnico',
    time: 'Hace 15 min',
    status: ConversationStatus.ESCALATED 
  },
  { 
    id: '6', 
    client: { name: 'Laura Fernandez', phone: '+54 9 11 7890-1234' }, 
    type: 'Turno', 
    agent: 'AgenteTurnos',
    message: 'Reprogramacion para el lunes 11:30',
    time: 'Hace 18 min',
    status: ConversationStatus.COMPLETED 
  },
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 max-w-7xl mx-auto w-full">
        <Topbar />
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_KPI_DATA.map((kpi) => (
              <KPICard 
                key={kpi.label}
                label={kpi.label}
                value={kpi.value}
                delta={kpi.delta}
                deltaVariant={kpi.variant as any}
              />
            ))}
          </div>
          <ChartCard 
            data={MOCK_CHART_DATA}
            title="Conversaciones de la Semana"
            subtitle="Total de mensajes vs. resueltos automaticamente"
          />
          <RecentActivityTable conversations={MOCK_CONVERSATIONS} />
        </div>
      </main>
    </div>
  );
};

export default App;