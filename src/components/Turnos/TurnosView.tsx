import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Wrench, CheckCircle2, XCircle, AlertCircle, ChevronLeft, ChevronRight, Plus, Search, Filter } from 'lucide-react';

type TurnoStatus = 'confirmado' | 'pendiente' | 'completado' | 'cancelado';

interface Turno {
  id: string;
  client: {
    name: string;
    phone: string;
  };
  service: string;
  device: string;
  date: string;
  time: string;
  status: TurnoStatus;
  notes?: string;
  createdBy: 'bot' | 'manual';
}

const MOCK_TURNOS: Turno[] = [
  {
    id: '1',
    client: { name: 'Juan Pérez', phone: '+54 9 11 2345-6789' },
    service: 'Cambio de Pantalla',
    device: 'iPhone 14 Pro',
    date: '2024-12-27',
    time: '10:30',
    status: 'confirmado',
    createdBy: 'bot',
  },
  {
    id: '2',
    client: { name: 'María García', phone: '+54 9 11 3456-7890' },
    service: 'Cambio de Batería',
    device: 'iPhone 12',
    date: '2024-12-27',
    time: '11:30',
    status: 'confirmado',
    createdBy: 'bot',
  },
  {
    id: '3',
    client: { name: 'Carlos López', phone: '+54 9 11 4567-8901' },
    service: 'Diagnóstico',
    device: 'MacBook Pro 2021',
    date: '2024-12-27',
    time: '14:30',
    status: 'pendiente',
    notes: 'No enciende, posible problema de placa',
    createdBy: 'manual',
  },
  {
    id: '4',
    client: { name: 'Ana Martínez', phone: '+54 9 11 5678-9012' },
    service: 'Reparación Puerto Lightning',
    device: 'iPhone 11',
    date: '2024-12-27',
    time: '15:30',
    status: 'confirmado',
    createdBy: 'bot',
  },
  {
    id: '5',
    client: { name: 'Roberto Sánchez', phone: '+54 9 11 6789-0123' },
    service: 'Cambio de Pantalla',
    device: 'iPad Air 4',
    date: '2024-12-27',
    time: '17:30',
    status: 'confirmado',
    createdBy: 'bot',
  },
  {
    id: '6',
    client: { name: 'Laura Fernández', phone: '+54 9 11 7890-1234' },
    service: 'Cambio de Batería',
    device: 'iPhone 13',
    date: '2024-12-28',
    time: '10:30',
    status: 'pendiente',
    createdBy: 'bot',
  },
  {
    id: '7',
    client: { name: 'Diego Torres', phone: '+54 9 11 8901-2345' },
    service: 'Limpieza Interna',
    device: 'MacBook Air M1',
    date: '2024-12-28',
    time: '12:30',
    status: 'confirmado',
    createdBy: 'manual',
  },
  {
    id: '8',
    client: { name: 'Sofía Ruiz', phone: '+54 9 11 9012-3456' },
    service: 'Cambio Pantalla',
    device: 'iPhone 15 Pro Max',
    date: '2024-12-26',
    time: '11:30',
    status: 'completado',
    createdBy: 'bot',
  },
  {
    id: '9',
    client: { name: 'Martín Gómez', phone: '+54 9 11 0123-4567' },
    service: 'Diagnóstico',
    device: 'iPhone X',
    date: '2024-12-26',
    time: '14:30',
    status: 'cancelado',
    notes: 'Cliente no se presentó',
    createdBy: 'bot',
  },
];

const statusConfig = {
  confirmado: { 
    label: 'Confirmado', 
    icon: CheckCircle2, 
    color: 'text-green-600', 
    bg: 'bg-green-50',
    border: 'border-green-200'
  },
  pendiente: { 
    label: 'Pendiente', 
    icon: AlertCircle, 
    color: 'text-yellow-600', 
    bg: 'bg-yellow-50',
    border: 'border-yellow-200'
  },
  completado: { 
    label: 'Completado', 
    icon: CheckCircle2, 
    color: 'text-gray-500', 
    bg: 'bg-gray-50',
    border: 'border-gray-200'
  },
  cancelado: { 
    label: 'Cancelado', 
    icon: XCircle, 
    color: 'text-red-600', 
    bg: 'bg-red-50',
    border: 'border-red-200'
  },
};

const HORARIOS = ['10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30', '17:30', '18:30'];

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr + 'T00:00:00');
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
};

export const TurnosView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2024-12-27');
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [searchTerm, setSearchTerm] = useState('');

  const turnosDelDia = MOCK_TURNOS.filter(t => t.date === selectedDate);
  
  const stats = {
    total: turnosDelDia.length,
    confirmados: turnosDelDia.filter(t => t.status === 'confirmado').length,
    pendientes: turnosDelDia.filter(t => t.status === 'pendiente').length,
    porBot: turnosDelDia.filter(t => t.createdBy === 'bot').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Turnos</h1>
          <p className="text-sm text-gray-500">Administra los turnos agendados por el Bot IA y manualmente</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
          <Plus size={18} />
          Nuevo Turno
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Turnos Hoy</span>
            <Calendar size={18} className="text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Confirmados</span>
            <CheckCircle2 size={18} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600 mt-1">{stats.confirmados}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Pendientes</span>
            <AlertCircle size={18} className="text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pendientes}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Agendados por IA</span>
            <span className="text-[10px] px-2 py-0.5 bg-gray-900 text-white rounded-full">Bot</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.porBot}</p>
          <p className="text-xs text-gray-400">{Math.round((stats.porBot / stats.total) * 100) || 0}% automático</p>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-50 rounded-lg">
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-900">{formatDate(selectedDate)}</h2>
              <p className="text-xs text-gray-400">Diciembre 2024</p>
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg">
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Buscar cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 w-64"
              />
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button 
                onClick={() => setViewMode('day')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${viewMode === 'day' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              >
                Día
              </button>
              <button 
                onClick={() => setViewMode('week')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${viewMode === 'week' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              >
                Semana
              </button>
            </div>
          </div>
        </div>

        {/* Timeline View */}
        <div className="grid grid-cols-[80px_1fr] gap-4">
          {HORARIOS.map(hora => {
            const turno = turnosDelDia.find(t => t.time === hora);
            
            return (
              <React.Fragment key={hora}>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-500">{hora}</span>
                </div>
                <div className="min-h-[80px] border-l-2 border-gray-100 pl-4 relative">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-gray-200"></div>
                  
                  {turno ? (
                    <div className={`p-4 rounded-xl border ${statusConfig[turno.status].border} ${statusConfig[turno.status].bg} transition-all hover:shadow-md cursor-pointer`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <User size={18} className="text-gray-500" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-900">{turno.client.name}</h4>
                              {turno.createdBy === 'bot' && (
                                <span className="text-[10px] px-1.5 py-0.5 bg-gray-900 text-white rounded-full">Bot IA</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Phone size={12} />
                              {turno.client.phone}
                            </p>
                          </div>
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[turno.status].bg} ${statusConfig[turno.status].color}`}>
                          {React.createElement(statusConfig[turno.status].icon, { size: 14 })}
                          {statusConfig[turno.status].label}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1.5 text-gray-600">
                          <Wrench size={14} className="text-gray-400" />
                          {turno.service}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-500">{turno.device}</span>
                      </div>
                      {turno.notes && (
                        <p className="mt-2 text-xs text-gray-500 italic">📝 {turno.notes}</p>
                      )}
                    </div>
                  ) : (
                    <div className="h-16 border-2 border-dashed border-gray-100 rounded-xl flex items-center justify-center text-gray-300 hover:border-gray-200 hover:text-gray-400 transition-colors cursor-pointer">
                      <Plus size={18} />
                      <span className="text-xs ml-1">Disponible</span>
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
