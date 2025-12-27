import React, { useState } from 'react';
import { 
  Search, 
  Filter,
  Monitor,
  Laptop,
  Cpu,
  HardDrive,
  Printer,
  Clock,
  CheckCircle2,
  AlertCircle,
  Wrench,
  Package,
  User,
  Phone,
  DollarSign,
  QrCode,
  ChevronRight,
  Plus,
  MoreVertical,
  MessageSquare,
  Send
} from 'lucide-react';

type RepairStatus = 'diagnostico' | 'presupuestado' | 'en_reparacion' | 'listo' | 'entregado' | 'cancelado';
type PaymentStatus = 'pendiente' | 'seña' | 'pagado';
type DeviceType = 'pc' | 'notebook' | 'monitor' | 'componente' | 'impresora';

interface Repair {
  id: string;
  ticketId: string;
  client: {
    name: string;
    phone: string;
    email?: string;
  };
  device: {
    type: DeviceType;
    model: string;
    serial?: string;
    password?: string;
  };
  issue: string;
  diagnosis?: string;
  status: RepairStatus;
  paymentStatus: PaymentStatus;
  budget?: number;
  finalCost?: number;
  createdAt: string;
  updatedAt: string;
  estimatedDate?: string;
  technician?: string;
  notes?: string;
  timeline: Array<{
    status: string;
    date: string;
    note?: string;
  }>;
}

const MOCK_REPAIRS: Repair[] = [
  {
    id: '1',
    ticketId: 'REP-2024-0847',
    client: { name: 'Juan Pérez', phone: '+54 9 11 2345-6789', email: 'juan@email.com' },
    device: { type: 'notebook', model: 'Lenovo ThinkPad T14', serial: 'PF3XXXXX', password: '1234' },
    issue: 'No enciende - posible problema de mother',
    diagnosis: 'Capacitor dañado en VRM. Requiere reballing y reemplazo de componentes SMD.',
    status: 'en_reparacion',
    paymentStatus: 'seña',
    budget: 95000,
    createdAt: '2024-12-23T10:30:00',
    updatedAt: '2024-12-26T14:00:00',
    estimatedDate: '2024-12-27',
    technician: 'Carlos',
    timeline: [
      { status: 'Ingresado', date: '2024-12-23T10:30:00' },
      { status: 'En diagnóstico', date: '2024-12-23T11:00:00' },
      { status: 'Presupuesto enviado', date: '2024-12-23T14:00:00', note: 'Cliente aprobó por WhatsApp' },
      { status: 'Seña recibida', date: '2024-12-24T09:00:00', note: '$30.000 MercadoPago' },
      { status: 'En reparación', date: '2024-12-26T10:00:00', note: 'Componentes en stock' },
    ]
  },
  {
    id: '2',
    ticketId: 'REP-2024-0846',
    client: { name: 'María García', phone: '+54 9 11 3456-7890' },
    device: { type: 'pc', model: 'PC Armada Gamer - Ryzen 5 5600X / RTX 3060', serial: 'CUSTOM-2024-156' },
    issue: 'Pantallazos azules frecuentes - BSOD',
    diagnosis: 'RAM defectuosa (1 módulo). Test MemTest86 con errores. Resto del sistema OK.',
    status: 'listo',
    paymentStatus: 'pendiente',
    budget: 15000,
    finalCost: 15000,
    createdAt: '2024-12-22T15:00:00',
    updatedAt: '2024-12-26T12:00:00',
    technician: 'Carlos',
    timeline: [
      { status: 'Ingresado', date: '2024-12-22T15:00:00' },
      { status: 'En diagnóstico', date: '2024-12-22T16:00:00' },
      { status: 'Presupuesto enviado', date: '2024-12-23T10:00:00' },
      { status: 'En reparación', date: '2024-12-24T11:00:00' },
      { status: 'Listo para retiro', date: '2024-12-26T12:00:00', note: 'Notificación enviada' },
    ]
  },
  {
    id: '3',
    ticketId: 'REP-2024-0845',
    client: { name: 'Carlos López', phone: '+54 9 11 4567-8901' },
    device: { type: 'notebook', model: 'ASUS ROG Strix G15', serial: 'M3NXXXXXXXX', password: '0000' },
    issue: 'Sobrecalentamiento y throttling en juegos',
    status: 'diagnostico',
    paymentStatus: 'pendiente',
    createdAt: '2024-12-26T09:00:00',
    updatedAt: '2024-12-26T09:00:00',
    timeline: [
      { status: 'Ingresado', date: '2024-12-26T09:00:00', note: 'Cliente viene por recomendación' },
      { status: 'En diagnóstico', date: '2024-12-26T09:30:00' },
    ]
  },
  {
    id: '4',
    ticketId: 'REP-2024-0844',
    client: { name: 'Ana Martínez', phone: '+54 9 11 5678-9012' },
    device: { type: 'monitor', model: 'Samsung Odyssey G5 27"', serial: 'HTXXXXXXXX' },
    issue: 'Líneas verticales en pantalla',
    diagnosis: 'Panel con falla. Costo de reemplazo supera valor del equipo. Se recomienda no reparar.',
    status: 'presupuestado',
    paymentStatus: 'pendiente',
    budget: 180000,
    createdAt: '2024-12-25T11:00:00',
    updatedAt: '2024-12-26T10:00:00',
    timeline: [
      { status: 'Ingresado', date: '2024-12-25T11:00:00' },
      { status: 'En diagnóstico', date: '2024-12-25T12:00:00' },
      { status: 'Presupuesto enviado', date: '2024-12-26T10:00:00', note: 'Esperando decisión del cliente' },
    ]
  },
  {
    id: '5',
    ticketId: 'REP-2024-0843',
    client: { name: 'Roberto Sánchez', phone: '+54 9 11 6789-0123' },
    device: { type: 'componente', model: 'RTX 3070 EVGA FTW3' },
    issue: 'Artifacting en juegos - posible falla de GPU',
    status: 'entregado',
    paymentStatus: 'pagado',
    budget: 45000,
    finalCost: 45000,
    createdAt: '2024-12-20T14:00:00',
    updatedAt: '2024-12-24T16:00:00',
    technician: 'Carlos',
    timeline: [
      { status: 'Ingresado', date: '2024-12-20T14:00:00' },
      { status: 'En diagnóstico', date: '2024-12-20T15:00:00' },
      { status: 'Presupuesto aprobado', date: '2024-12-20T17:00:00' },
      { status: 'En reparación', date: '2024-12-21T10:00:00', note: 'Reballing GPU' },
      { status: 'Listo para retiro', date: '2024-12-23T11:00:00' },
      { status: 'Entregado', date: '2024-12-24T16:00:00', note: 'Pago en efectivo' },
    ]
  },
  {
    id: '6',
    ticketId: 'REP-2024-0842',
    client: { name: 'Laura Fernández', phone: '+54 9 11 7890-1234' },
    device: { type: 'impresora', model: 'HP LaserJet Pro M404dn' },
    issue: 'Atasco de papel constante',
    status: 'cancelado',
    paymentStatus: 'pendiente',
    budget: 35000,
    createdAt: '2024-12-19T10:00:00',
    updatedAt: '2024-12-21T14:00:00',
    notes: 'Cliente decidió comprar impresora nueva - costo de reparación alto',
    timeline: [
      { status: 'Ingresado', date: '2024-12-19T10:00:00' },
      { status: 'En diagnóstico', date: '2024-12-19T11:00:00' },
      { status: 'Presupuesto enviado', date: '2024-12-20T09:00:00' },
      { status: 'Cancelado', date: '2024-12-21T14:00:00', note: 'Cliente rechazó presupuesto' },
    ]
  },
];

const deviceIcons: Record<DeviceType, React.ReactNode> = {
  pc: <Cpu size={20} />,
  notebook: <Laptop size={20} />,
  monitor: <Monitor size={20} />,
  componente: <HardDrive size={20} />,
  impresora: <Printer size={20} />,
};

const statusConfig: Record<RepairStatus, { label: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  diagnostico: { label: 'En diagnóstico', color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-200', icon: <Search size={14} /> },
  presupuestado: { label: 'Presupuestado', color: 'text-purple-700', bgColor: 'bg-purple-50 border-purple-200', icon: <DollarSign size={14} /> },
  en_reparacion: { label: 'En reparación', color: 'text-orange-700', bgColor: 'bg-orange-50 border-orange-200', icon: <Wrench size={14} /> },
  listo: { label: 'Listo para retiro', color: 'text-green-700', bgColor: 'bg-green-50 border-green-200', icon: <CheckCircle2 size={14} /> },
  entregado: { label: 'Entregado', color: 'text-gray-600', bgColor: 'bg-gray-50 border-gray-200', icon: <Package size={14} /> },
  cancelado: { label: 'Cancelado', color: 'text-red-600', bgColor: 'bg-red-50 border-red-200', icon: <AlertCircle size={14} /> },
};

const paymentConfig: Record<PaymentStatus, { label: string; color: string }> = {
  pendiente: { label: 'Pago pendiente', color: 'text-yellow-700 bg-yellow-50' },
  seña: { label: 'Seña recibida', color: 'text-blue-700 bg-blue-50' },
  pagado: { label: 'Pagado', color: 'text-green-700 bg-green-50' },
};

export const ServicioTecnicoView: React.FC = () => {
  const [repairs] = useState<Repair[]>(MOCK_REPAIRS);
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(MOCK_REPAIRS[0]);
  const [filterStatus, setFilterStatus] = useState<RepairStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRepairs = repairs.filter(r => {
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    const matchesSearch = 
      r.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.device.model.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = {
    diagnostico: repairs.filter(r => r.status === 'diagnostico').length,
    presupuestado: repairs.filter(r => r.status === 'presupuestado').length,
    en_reparacion: repairs.filter(r => r.status === 'en_reparacion').length,
    listo: repairs.filter(r => r.status === 'listo').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Servicio Técnico</h1>
          <p className="text-sm text-gray-500">Gestión de reparaciones y tickets</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
          <Plus size={16} />
          Nueva Reparación
        </button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">En diagnóstico</span>
            <Search size={16} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{statusCounts.diagnostico}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Presupuestados</span>
            <DollarSign size={16} className="text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{statusCounts.presupuestado}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">En reparación</span>
            <Wrench size={16} className="text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{statusCounts.en_reparacion}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Listos para retiro</span>
            <CheckCircle2 size={16} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{statusCounts.listo}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 h-[calc(100vh-320px)]">
        {/* Repairs List */}
        <div className="w-[400px] bg-white rounded-xl border border-gray-100 flex flex-col">
          {/* Search & Filter */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Buscar ticket, cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                />
              </div>
              <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <Filter size={18} className="text-gray-500" />
              </button>
            </div>
            
            {/* Quick filters */}
            <div className="flex gap-1 overflow-x-auto pb-1">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  filterStatus === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              {(['diagnostico', 'presupuestado', 'en_reparacion', 'listo'] as RepairStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    filterStatus === status ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {statusConfig[status].label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {filteredRepairs.map((repair) => (
              <div
                key={repair.id}
                onClick={() => setSelectedRepair(repair)}
                className={`p-4 border-b border-gray-50 cursor-pointer transition-colors ${
                  selectedRepair?.id === repair.id ? 'bg-gray-50' : 'hover:bg-gray-25'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${statusConfig[repair.status].bgColor} ${statusConfig[repair.status].color}`}>
                    {deviceIcons[repair.device.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-gray-900">{repair.ticketId}</span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(repair.updatedAt).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 truncate mb-1">{repair.device.model}</p>
                    <p className="text-xs text-gray-500 truncate mb-2">{repair.client.name}</p>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusConfig[repair.status].bgColor} ${statusConfig[repair.status].color}`}>
                        {statusConfig[repair.status].icon}
                        {statusConfig[repair.status].label}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        {selectedRepair ? (
          <div className="flex-1 bg-white rounded-xl border border-gray-100 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold text-gray-900">{selectedRepair.ticketId}</h2>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusConfig[selectedRepair.status].bgColor} ${statusConfig[selectedRepair.status].color}`}>
                      {statusConfig[selectedRepair.status].icon}
                      {statusConfig[selectedRepair.status].label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{selectedRepair.device.model}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-50 rounded-lg">
                    <QrCode size={20} className="text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-50 rounded-lg">
                    <MoreVertical size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Client Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User size={16} />
                  Cliente
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Nombre</p>
                    <p className="text-sm font-medium text-gray-900">{selectedRepair.client.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Teléfono</p>
                    <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                      <Phone size={12} />
                      {selectedRepair.client.phone}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700">
                    <MessageSquare size={14} />
                    WhatsApp
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-300">
                    <Send size={14} />
                    Notificar
                  </button>
                </div>
              </div>

              {/* Device Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  {deviceIcons[selectedRepair.device.type]}
                  Equipo
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Modelo</p>
                    <p className="text-sm font-medium text-gray-900">{selectedRepair.device.model}</p>
                  </div>
                  {selectedRepair.device.serial && (
                    <div>
                      <p className="text-xs text-gray-500">Serial/Service Tag</p>
                      <p className="text-sm font-medium text-gray-900 font-mono">{selectedRepair.device.serial}</p>
                    </div>
                  )}
                  {selectedRepair.device.password && (
                    <div>
                      <p className="text-xs text-gray-500">Contraseña</p>
                      <p className="text-sm font-medium text-gray-900 font-mono">{selectedRepair.device.password}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Issue & Diagnosis */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Falla reportada</p>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedRepair.issue}</p>
                </div>
                {selectedRepair.diagnosis && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Diagnóstico técnico</p>
                    <p className="text-sm text-gray-900 bg-blue-50 p-3 rounded-lg border border-blue-100">{selectedRepair.diagnosis}</p>
                  </div>
                )}
              </div>

              {/* Budget & Payment */}
              {selectedRepair.budget && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <DollarSign size={16} />
                    Presupuesto
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        ${selectedRepair.budget.toLocaleString('es-AR')}
                      </p>
                      {selectedRepair.finalCost && selectedRepair.finalCost !== selectedRepair.budget && (
                        <p className="text-xs text-gray-500">Costo final: ${selectedRepair.finalCost.toLocaleString('es-AR')}</p>
                      )}
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${paymentConfig[selectedRepair.paymentStatus].color}`}>
                      {paymentConfig[selectedRepair.paymentStatus].label}
                    </span>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock size={16} />
                  Historial
                </h3>
                <div className="space-y-3">
                  {selectedRepair.timeline.map((event, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${
                          idx === selectedRepair.timeline.length - 1 ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                        {idx < selectedRepair.timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{event.status}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(event.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {event.note && (
                          <p className="text-xs text-gray-500 mt-0.5">{event.note}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selectedRepair.notes && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Notas</p>
                  <p className="text-sm text-gray-700 bg-yellow-50 p-3 rounded-lg border border-yellow-100">{selectedRepair.notes}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                {selectedRepair.status === 'diagnostico' && (
                  <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">
                    Enviar Presupuesto
                  </button>
                )}
                {selectedRepair.status === 'presupuestado' && (
                  <button className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">
                    Iniciar Reparación
                  </button>
                )}
                {selectedRepair.status === 'en_reparacion' && (
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                    Marcar como Listo
                  </button>
                )}
                {selectedRepair.status === 'listo' && (
                  <button className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800">
                    Registrar Entrega
                  </button>
                )}
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300">
                  Editar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-white rounded-xl border border-gray-100 flex items-center justify-center">
            <div className="text-center">
              <Wrench size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Selecciona una reparación</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
