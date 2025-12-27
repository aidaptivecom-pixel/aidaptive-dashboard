import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  Phone, 
  Wrench, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search,
  Clock,
  Laptop,
  Monitor,
  Cpu,
  MessageSquare,
  Mail,
  MoreVertical,
  Bot,
  UserPlus
} from 'lucide-react';

type TurnoStatus = 'confirmado' | 'pendiente' | 'completado' | 'cancelado' | 'no_asistio';
type ServiceType = 'diagnostico' | 'reparacion' | 'mantenimiento' | 'upgrade' | 'retiro';

interface Turno {
  id: string;
  client: {
    name: string;
    phone: string;
    email?: string;
  };
  service: ServiceType;
  serviceDetail: string;
  device: string;
  date: string;
  time: string;
  duration: number; // minutos
  status: TurnoStatus;
  notes?: string;
  createdBy: 'bot' | 'manual';
  createdAt: string;
  ticketId?: string;
}

const MOCK_TURNOS: Turno[] = [
  {
    id: '1',
    client: { name: 'Juan Pérez', phone: '+54 9 11 2345-6789', email: 'juan@email.com' },
    service: 'diagnostico',
    serviceDetail: 'Diagnóstico general',
    device: 'Notebook Lenovo ThinkPad T14',
    date: '2024-12-27',
    time: '10:30',
    duration: 60,
    status: 'confirmado',
    notes: 'Equipo no enciende, cliente sospecha problema de mother',
    createdBy: 'bot',
    createdAt: '2024-12-25T14:30:00',
  },
  {
    id: '2',
    client: { name: 'María García', phone: '+54 9 11 3456-7890' },
    service: 'upgrade',
    serviceDetail: 'Upgrade RAM + SSD',
    device: 'PC de Escritorio - AMD Ryzen 5',
    date: '2024-12-27',
    time: '11:30',
    duration: 45,
    status: 'confirmado',
    notes: 'Agregar 16GB RAM DDR4 + SSD NVMe 1TB',
    createdBy: 'bot',
    createdAt: '2024-12-24T10:15:00',
  },
  {
    id: '3',
    client: { name: 'Carlos López', phone: '+54 9 11 4567-8901' },
    service: 'reparacion',
    serviceDetail: 'Reparación fuente de poder',
    device: 'PC Gamer - Intel i7 / RTX 3070',
    date: '2024-12-27',
    time: '14:30',
    duration: 90,
    status: 'pendiente',
    notes: 'PC se apaga sola bajo carga. Posible fuente defectuosa.',
    createdBy: 'manual',
    createdAt: '2024-12-26T16:00:00',
  },
  {
    id: '4',
    client: { name: 'Ana Martínez', phone: '+54 9 11 5678-9012' },
    service: 'mantenimiento',
    serviceDetail: 'Limpieza y mantenimiento',
    device: 'Notebook ASUS ROG Strix',
    date: '2024-12-27',
    time: '16:00',
    duration: 60,
    status: 'confirmado',
    notes: 'Limpieza de coolers, cambio de pasta térmica',
    createdBy: 'bot',
    createdAt: '2024-12-23T09:45:00',
  },
  {
    id: '5',
    client: { name: 'Roberto Sánchez', phone: '+54 9 11 6789-0123' },
    service: 'retiro',
    serviceDetail: 'Retiro de equipo reparado',
    device: 'Monitor Samsung Odyssey G5',
    date: '2024-12-27',
    time: '17:30',
    duration: 15,
    status: 'confirmado',
    ticketId: 'REP-2024-0844',
    createdBy: 'bot',
    createdAt: '2024-12-26T12:00:00',
  },
  {
    id: '6',
    client: { name: 'Laura Fernández', phone: '+54 9 11 7890-1234' },
    service: 'diagnostico',
    serviceDetail: 'Diagnóstico de placa de video',
    device: 'RTX 4070 - Gigabyte Gaming OC',
    date: '2024-12-28',
    time: '10:30',
    duration: 60,
    status: 'pendiente',
    notes: 'Artifacting en juegos',
    createdBy: 'bot',
    createdAt: '2024-12-26T18:30:00',
  },
  {
    id: '7',
    client: { name: 'Diego Torres', phone: '+54 9 11 8901-2345' },
    service: 'upgrade',
    serviceDetail: 'Instalación Windows + drivers',
    device: 'PC nueva armada en tienda',
    date: '2024-12-28',
    time: '12:30',
    duration: 90,
    status: 'confirmado',
    notes: 'Instalación limpia Win11 Pro + drivers + Office',
    createdBy: 'manual',
    createdAt: '2024-12-27T08:00:00',
  },
  {
    id: '8',
    client: { name: 'Sofía Ruiz', phone: '+54 9 11 9012-3456' },
    service: 'reparacion',
    serviceDetail: 'Cambio de teclado notebook',
    device: 'HP Pavilion 15',
    date: '2024-12-26',
    time: '11:30',
    duration: 45,
    status: 'completado',
    createdBy: 'bot',
    createdAt: '2024-12-20T11:00:00',
  },
  {
    id: '9',
    client: { name: 'Martín Gómez', phone: '+54 9 11 0123-4567' },
    service: 'diagnostico',
    serviceDetail: 'Diagnóstico de arranque',
    device: 'Dell Inspiron 15 3000',
    date: '2024-12-26',
    time: '14:30',
    duration: 60,
    status: 'no_asistio',
    notes: 'Cliente no se presentó - intentar recontactar',
    createdBy: 'bot',
    createdAt: '2024-12-22T15:30:00',
  },
  {
    id: '10',
    client: { name: 'Patricia Vega', phone: '+54 9 11 1234-5678' },
    service: 'mantenimiento',
    serviceDetail: 'Backup + formateo',
    device: 'Notebook Acer Aspire 5',
    date: '2024-12-26',
    time: '16:00',
    duration: 120,
    status: 'cancelado',
    notes: 'Cliente canceló - decidió comprar equipo nuevo',
    createdBy: 'bot',
    createdAt: '2024-12-21T13:00:00',
  },
];

const statusConfig: Record<TurnoStatus, { label: string; icon: React.ElementType; color: string; bg: string; border: string }> = {
  confirmado: { label: 'Confirmado', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  pendiente: { label: 'Pendiente', icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  completado: { label: 'Completado', icon: CheckCircle2, color: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-200' },
  cancelado: { label: 'Cancelado', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  no_asistio: { label: 'No asistió', icon: XCircle, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
};

const serviceConfig: Record<ServiceType, { label: string; icon: React.ElementType; color: string }> = {
  diagnostico: { label: 'Diagnóstico', icon: Search, color: 'text-blue-600' },
  reparacion: { label: 'Reparación', icon: Wrench, color: 'text-orange-600' },
  mantenimiento: { label: 'Mantenimiento', icon: Cpu, color: 'text-purple-600' },
  upgrade: { label: 'Upgrade', icon: Monitor, color: 'text-green-600' },
  retiro: { label: 'Retiro', icon: Laptop, color: 'text-gray-600' },
};

const HORARIOS = ['09:00', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'];

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr + 'T00:00:00');
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return `${days[date.getDay()]} ${date.getDate()} de ${months[date.getMonth()]}`;
};

const formatShortDate = (dateStr: string) => {
  const date = new Date(dateStr + 'T00:00:00');
  return `${date.getDate()}/${date.getMonth() + 1}`;
};

export const TurnosView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2024-12-27');
  const [selectedTurno, setSelectedTurno] = useState<Turno | null>(MOCK_TURNOS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<TurnoStatus | 'all'>('all');

  const turnosDelDia = MOCK_TURNOS.filter(t => t.date === selectedDate);
  const turnosFiltrados = turnosDelDia.filter(t => {
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    const matchesSearch = 
      t.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.device.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  
  const stats = {
    total: turnosDelDia.length,
    confirmados: turnosDelDia.filter(t => t.status === 'confirmado').length,
    pendientes: turnosDelDia.filter(t => t.status === 'pendiente').length,
    porBot: turnosDelDia.filter(t => t.createdBy === 'bot').length,
  };

  const nextDays = [
    { date: '2024-12-26', label: 'Ayer' },
    { date: '2024-12-27', label: 'Hoy' },
    { date: '2024-12-28', label: 'Mañana' },
    { date: '2024-12-29', label: 'Dom' },
    { date: '2024-12-30', label: 'Lun' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Turnos</h1>
          <p className="text-sm text-gray-500">Gestión de turnos de servicio técnico</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            <Calendar size={16} />
            Sincronizar Calendar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
            <Plus size={16} />
            Nuevo Turno
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Turnos Hoy</span>
            <Calendar size={16} className="text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Confirmados</span>
            <CheckCircle2 size={16} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.confirmados}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Por confirmar</span>
            <AlertCircle size={16} className="text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-yellow-600">{stats.pendientes}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Agendados por IA</span>
            <Bot size={16} className="text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.porBot}</p>
          <p className="text-xs text-gray-400">{stats.total > 0 ? Math.round((stats.porBot / stats.total) * 100) : 0}% automático</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 h-[calc(100vh-340px)]">
        {/* Calendar / List Panel */}
        <div className="flex-1 bg-white rounded-xl border border-gray-100 flex flex-col">
          {/* Date Navigation */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-50 rounded-lg">
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <h2 className="text-lg font-semibold text-gray-900">{formatDate(selectedDate)}</h2>
                <button className="p-2 hover:bg-gray-50 rounded-lg">
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Buscar cliente o equipo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 w-64"
                />
              </div>
            </div>
            
            {/* Quick Date Selector */}
            <div className="flex gap-2">
              {nextDays.map((day) => {
                const count = MOCK_TURNOS.filter(t => t.date === day.date).length;
                return (
                  <button
                    key={day.date}
                    onClick={() => setSelectedDate(day.date)}
                    className={`flex-1 p-2 rounded-lg text-center transition-all ${
                      selectedDate === day.date 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <p className="text-xs font-medium">{day.label}</p>
                    <p className="text-lg font-bold">{formatShortDate(day.date).split('/')[0]}</p>
                    <p className={`text-[10px] ${selectedDate === day.date ? 'text-gray-300' : 'text-gray-400'}`}>
                      {count} turno{count !== 1 ? 's' : ''}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Turnos List */}
          <div className="flex-1 overflow-y-auto">
            {turnosFiltrados.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Calendar size={48} className="mb-2" />
                <p>No hay turnos para este día</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {turnosFiltrados.map((turno) => {
                  const ServiceIcon = serviceConfig[turno.service].icon;
                  const StatusIcon = statusConfig[turno.status].icon;
                  
                  return (
                    <div
                      key={turno.id}
                      onClick={() => setSelectedTurno(turno)}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedTurno?.id === turno.id ? 'bg-gray-50' : 'hover:bg-gray-25'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Time */}
                        <div className="text-center w-16 flex-shrink-0">
                          <p className="text-lg font-bold text-gray-900">{turno.time}</p>
                          <p className="text-[10px] text-gray-400">{turno.duration} min</p>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{turno.client.name}</h4>
                            {turno.createdBy === 'bot' && (
                              <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                <Bot size={10} />
                                IA
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">{turno.device}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className={`flex items-center gap-1 text-xs ${serviceConfig[turno.service].color}`}>
                              <ServiceIcon size={12} />
                              {serviceConfig[turno.service].label}
                            </span>
                            <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${statusConfig[turno.status].bg} ${statusConfig[turno.status].color}`}>
                              <StatusIcon size={10} />
                              {statusConfig[turno.status].label}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Detail Panel */}
        {selectedTurno ? (
          <div className="w-[380px] bg-white rounded-xl border border-gray-100 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-2xl font-bold text-gray-900">{selectedTurno.time}</span>
                    <span className="text-sm text-gray-400">({selectedTurno.duration} min)</span>
                  </div>
                  <p className="text-sm text-gray-500">{formatDate(selectedTurno.date)}</p>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-lg">
                  <MoreVertical size={20} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Status */}
              <div className={`p-3 rounded-xl border ${statusConfig[selectedTurno.status].border} ${statusConfig[selectedTurno.status].bg}`}>
                <div className="flex items-center gap-2">
                  {React.createElement(statusConfig[selectedTurno.status].icon, { size: 18, className: statusConfig[selectedTurno.status].color })}
                  <span className={`font-medium ${statusConfig[selectedTurno.status].color}`}>
                    {statusConfig[selectedTurno.status].label}
                  </span>
                </div>
              </div>

              {/* Client */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User size={16} />
                  Cliente
                </h3>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-900">{selectedTurno.client.name}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Phone size={14} className="text-gray-400" />
                    {selectedTurno.client.phone}
                  </p>
                  {selectedTurno.client.email && (
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Mail size={14} className="text-gray-400" />
                      {selectedTurno.client.email}
                    </p>
                  )}
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700">
                    <MessageSquare size={14} />
                    WhatsApp
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-300">
                    <Phone size={14} />
                    Llamar
                  </button>
                </div>
              </div>

              {/* Service */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Wrench size={16} />
                  Servicio
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {React.createElement(serviceConfig[selectedTurno.service].icon, { 
                      size: 16, 
                      className: serviceConfig[selectedTurno.service].color 
                    })}
                    <span className={`font-medium ${serviceConfig[selectedTurno.service].color}`}>
                      {serviceConfig[selectedTurno.service].label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900">{selectedTurno.serviceDetail}</p>
                </div>
              </div>

              {/* Device */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Laptop size={16} />
                  Equipo
                </h3>
                <p className="text-sm text-gray-900">{selectedTurno.device}</p>
                {selectedTurno.ticketId && (
                  <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                    Ticket: {selectedTurno.ticketId}
                  </p>
                )}
              </div>

              {/* Notes */}
              {selectedTurno.notes && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Notas</p>
                  <p className="text-sm text-gray-700 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                    {selectedTurno.notes}
                  </p>
                </div>
              )}

              {/* Creation Info */}
              <div className="text-xs text-gray-400 flex items-center gap-2">
                {selectedTurno.createdBy === 'bot' ? (
                  <>
                    <Bot size={12} />
                    Agendado automáticamente por IA
                  </>
                ) : (
                  <>
                    <UserPlus size={12} />
                    Agendado manualmente
                  </>
                )}
                <span className="text-gray-300">•</span>
                {new Date(selectedTurno.createdAt).toLocaleDateString('es-AR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                {selectedTurno.status === 'pendiente' && (
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                    Confirmar Turno
                  </button>
                )}
                {selectedTurno.status === 'confirmado' && (
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                    Iniciar Atención
                  </button>
                )}
                {(selectedTurno.status === 'pendiente' || selectedTurno.status === 'confirmado') && (
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300">
                    Reprogramar
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[380px] bg-white rounded-xl border border-gray-100 flex items-center justify-center">
            <div className="text-center">
              <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Selecciona un turno</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
