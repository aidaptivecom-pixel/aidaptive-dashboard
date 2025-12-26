import React, { useState } from 'react';
import {
  Search,
  Filter,
  Package,
  Truck,
  CheckCircle2,
  AlertTriangle,
  User,
  Phone,
  MessageSquare,
  ChevronRight,
  MapPin,
  Calendar,
  FileText,
  Camera,
  RefreshCw,
  Shield,
  AlertCircle,
  ExternalLink,
  MoreVertical,
  Send
} from 'lucide-react';

type OrderStatus = 'preparando' | 'enviado' | 'en_camino' | 'entregado' | 'problema';
type CaseType = 'seguimiento' | 'reclamo' | 'garantia' | 'devolucion' | 'cambio';
type CasePriority = 'baja' | 'media' | 'alta' | 'urgente';

interface Order {
  id: string;
  number: string;
  client: {
    name: string;
    phone: string;
  };
  items: string[];
  total: number;
  status: OrderStatus;
  trackingCode?: string;
  carrier?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
  address?: string;
}

interface Case {
  id: string;
  number: string;
  client: {
    name: string;
    phone: string;
  };
  type: CaseType;
  priority: CasePriority;
  subject: string;
  description: string;
  orderNumber?: string;
  status: 'abierto' | 'en_proceso' | 'resuelto' | 'cerrado';
  createdAt: string;
  updatedAt: string;
  attachments?: number;
  warranty?: {
    product: string;
    purchaseDate: string;
    expiresAt: string;
  };
}

const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    number: 'PED-2024-1847',
    client: { name: 'Juan Pérez', phone: '+54 9 11 2345-6789' },
    items: ['Pantalla iPhone 14 Pro Max OLED', 'Batería iPhone 14 Pro Max'],
    total: 230000,
    status: 'en_camino',
    trackingCode: 'AR123456789',
    carrier: 'Andreani',
    estimatedDelivery: '2024-12-27',
    createdAt: '2024-12-24T10:00:00',
    updatedAt: '2024-12-26T08:00:00',
    address: 'Av. Corrientes 1234, CABA'
  },
  {
    id: '2',
    number: 'PED-2024-1846',
    client: { name: 'María García', phone: '+54 9 11 3456-7890' },
    items: ['Cargador MagSafe Original'],
    total: 65000,
    status: 'entregado',
    trackingCode: 'AR987654321',
    carrier: 'Correo Argentino',
    createdAt: '2024-12-22T15:00:00',
    updatedAt: '2024-12-25T14:00:00',
    address: 'Calle Florida 567, CABA'
  },
  {
    id: '3',
    number: 'PED-2024-1845',
    client: { name: 'Carlos López', phone: '+54 9 11 4567-8901' },
    items: ['Pantalla iPhone 13 OLED x5', 'Pantalla iPhone 12 OLED x5'],
    total: 850000,
    status: 'preparando',
    createdAt: '2024-12-26T09:00:00',
    updatedAt: '2024-12-26T09:00:00',
    address: 'Av. Santa Fe 2000, CABA'
  },
  {
    id: '4',
    number: 'PED-2024-1844',
    client: { name: 'Ana Martínez', phone: '+54 9 11 5678-9012' },
    items: ['Batería MacBook Pro M1 14"'],
    total: 180000,
    status: 'problema',
    trackingCode: 'AR555666777',
    carrier: 'Andreani',
    createdAt: '2024-12-20T11:00:00',
    updatedAt: '2024-12-25T16:00:00',
    address: 'Calle Lavalle 890, CABA'
  },
];

const MOCK_CASES: Case[] = [
  {
    id: '1',
    number: 'CASO-2024-0456',
    client: { name: 'Ana Martínez', phone: '+54 9 11 5678-9012' },
    type: 'reclamo',
    priority: 'alta',
    subject: 'Paquete no recibido - marca entregado',
    description: 'El tracking indica entregado pero la clienta no recibió el paquete. Andreani indica que fue entregado en portería.',
    orderNumber: 'PED-2024-1844',
    status: 'en_proceso',
    createdAt: '2024-12-25T16:00:00',
    updatedAt: '2024-12-26T10:00:00',
    attachments: 2
  },
  {
    id: '2',
    number: 'CASO-2024-0455',
    client: { name: 'Roberto Sánchez', phone: '+54 9 11 6789-0123' },
    type: 'garantia',
    priority: 'media',
    subject: 'Pantalla con líneas después de 2 meses',
    description: 'Cliente reporta líneas verticales en pantalla iPhone 13 instalada hace 2 meses. Solicita cambio por garantía.',
    status: 'abierto',
    createdAt: '2024-12-26T09:00:00',
    updatedAt: '2024-12-26T09:00:00',
    attachments: 3,
    warranty: {
      product: 'Pantalla iPhone 13 OLED',
      purchaseDate: '2024-10-15',
      expiresAt: '2025-04-15'
    }
  },
  {
    id: '3',
    number: 'CASO-2024-0454',
    client: { name: 'Laura Fernández', phone: '+54 9 11 7890-1234' },
    type: 'devolucion',
    priority: 'baja',
    subject: 'Devolución por compra incorrecta',
    description: 'Cliente compró batería para iPhone 12 pero necesitaba para iPhone 12 Mini. Solicita devolución o cambio.',
    orderNumber: 'PED-2024-1820',
    status: 'resuelto',
    createdAt: '2024-12-23T14:00:00',
    updatedAt: '2024-12-25T11:00:00'
  },
  {
    id: '4',
    number: 'CASO-2024-0453',
    client: { name: 'Diego Torres', phone: '+54 9 11 8901-2345' },
    type: 'seguimiento',
    priority: 'baja',
    subject: 'Consulta estado de envío',
    description: 'Cliente consulta por demora en envío. Se informó que hay demoras por fiestas.',
    orderNumber: 'PED-2024-1840',
    status: 'cerrado',
    createdAt: '2024-12-24T10:00:00',
    updatedAt: '2024-12-24T10:30:00'
  },
];

const orderStatusConfig: Record<OrderStatus, { label: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  preparando: { label: 'Preparando', color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-200', icon: <Package size={14} /> },
  enviado: { label: 'Enviado', color: 'text-purple-700', bgColor: 'bg-purple-50 border-purple-200', icon: <Truck size={14} /> },
  en_camino: { label: 'En camino', color: 'text-orange-700', bgColor: 'bg-orange-50 border-orange-200', icon: <Truck size={14} /> },
  entregado: { label: 'Entregado', color: 'text-green-700', bgColor: 'bg-green-50 border-green-200', icon: <CheckCircle2 size={14} /> },
  problema: { label: 'Problema', color: 'text-red-600', bgColor: 'bg-red-50 border-red-200', icon: <AlertTriangle size={14} /> },
};

const caseTypeConfig: Record<CaseType, { label: string; color: string; icon: React.ReactNode }> = {
  seguimiento: { label: 'Seguimiento', color: 'text-blue-700 bg-blue-50', icon: <Package size={14} /> },
  reclamo: { label: 'Reclamo', color: 'text-red-700 bg-red-50', icon: <AlertCircle size={14} /> },
  garantia: { label: 'Garantía', color: 'text-purple-700 bg-purple-50', icon: <Shield size={14} /> },
  devolucion: { label: 'Devolución', color: 'text-orange-700 bg-orange-50', icon: <RefreshCw size={14} /> },
  cambio: { label: 'Cambio', color: 'text-teal-700 bg-teal-50', icon: <RefreshCw size={14} /> },
};

const priorityConfig: Record<CasePriority, { label: string; color: string }> = {
  baja: { label: 'Baja', color: 'text-gray-600 bg-gray-100' },
  media: { label: 'Media', color: 'text-yellow-700 bg-yellow-50' },
  alta: { label: 'Alta', color: 'text-orange-700 bg-orange-50' },
  urgente: { label: 'Urgente', color: 'text-red-700 bg-red-50' },
};

const caseStatusConfig: Record<string, { label: string; color: string }> = {
  abierto: { label: 'Abierto', color: 'text-blue-700 bg-blue-50' },
  en_proceso: { label: 'En proceso', color: 'text-orange-700 bg-orange-50' },
  resuelto: { label: 'Resuelto', color: 'text-green-700 bg-green-50' },
  cerrado: { label: 'Cerrado', color: 'text-gray-600 bg-gray-100' },
};

export const PosventaView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pedidos' | 'casos'>('pedidos');
  const [orders] = useState<Order[]>(MOCK_ORDERS);
  const [cases] = useState<Case[]>(MOCK_CASES);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(MOCK_ORDERS[0]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const stats = {
    enCamino: orders.filter(o => o.status === 'en_camino').length,
    problemas: orders.filter(o => o.status === 'problema').length,
    casosAbiertos: cases.filter(c => c.status === 'abierto' || c.status === 'en_proceso').length,
    garantias: cases.filter(c => c.type === 'garantia' && c.status !== 'cerrado').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Posventa</h1>
          <p className="text-sm text-gray-500">Seguimiento de pedidos, reclamos y garantías</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
          <AlertCircle size={16} />
          Nuevo caso
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">En camino</span>
            <Truck size={16} className="text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.enCamino}</p>
          <p className="text-xs text-gray-400">pedidos en tránsito</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Con problema</span>
            <AlertTriangle size={16} className="text-red-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.problemas}</p>
          <p className="text-xs text-gray-400">requieren atención</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Casos abiertos</span>
            <FileText size={16} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.casosAbiertos}</p>
          <p className="text-xs text-gray-400">pendientes de resolver</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Garantías activas</span>
            <Shield size={16} className="text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.garantias}</p>
          <p className="text-xs text-gray-400">en revisión</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => { setActiveTab('pedidos'); setSelectedCase(null); setSelectedOrder(MOCK_ORDERS[0]); }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'pedidos' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Pedidos
        </button>
        <button
          onClick={() => { setActiveTab('casos'); setSelectedOrder(null); setSelectedCase(MOCK_CASES[0]); }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'casos' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Casos
        </button>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 h-[calc(100vh-400px)]">
        {/* List */}
        <div className="w-[400px] bg-white rounded-xl border border-gray-100 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder={activeTab === 'pedidos' ? 'Buscar pedido...' : 'Buscar caso...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                />
              </div>
              <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <Filter size={18} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* List Items */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'pedidos' ? (
              orders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-4 border-b border-gray-50 cursor-pointer transition-colors ${
                    selectedOrder?.id === order.id ? 'bg-gray-50' : 'hover:bg-gray-25'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${orderStatusConfig[order.status].bgColor} ${orderStatusConfig[order.status].color}`}>
                      {orderStatusConfig[order.status].icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-gray-900">{order.number}</span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(order.updatedAt).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 truncate mb-1">{order.client.name}</p>
                      <p className="text-xs text-gray-500 truncate mb-2">{order.items[0]}{order.items.length > 1 && ` +${order.items.length - 1}`}</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${orderStatusConfig[order.status].bgColor} ${orderStatusConfig[order.status].color}`}>
                        {orderStatusConfig[order.status].icon}
                        {orderStatusConfig[order.status].label}
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 mt-2" />
                  </div>
                </div>
              ))
            ) : (
              cases.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 border-b border-gray-50 cursor-pointer transition-colors ${
                    selectedCase?.id === c.id ? 'bg-gray-50' : 'hover:bg-gray-25'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${caseTypeConfig[c.type].color}`}>
                      {caseTypeConfig[c.type].icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-gray-900">{c.number}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${priorityConfig[c.priority].color}`}>
                          {priorityConfig[c.priority].label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 truncate mb-1">{c.subject}</p>
                      <p className="text-xs text-gray-500 mb-2">{c.client.name}</p>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${caseTypeConfig[c.type].color}`}>
                          {caseTypeConfig[c.type].label}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${caseStatusConfig[c.status].color}`}>
                          {caseStatusConfig[c.status].label}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 mt-2" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Detail Panel */}
        {activeTab === 'pedidos' && selectedOrder ? (
          <div className="flex-1 bg-white rounded-xl border border-gray-100 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold text-gray-900">{selectedOrder.number}</h2>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${orderStatusConfig[selectedOrder.status].bgColor} ${orderStatusConfig[selectedOrder.status].color}`}>
                      {orderStatusConfig[selectedOrder.status].icon}
                      {orderStatusConfig[selectedOrder.status].label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">${selectedOrder.total.toLocaleString('es-AR')}</p>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-lg">
                  <MoreVertical size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Client */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User size={16} /> Cliente
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Nombre</p>
                    <p className="text-sm font-medium text-gray-900">{selectedOrder.client.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Teléfono</p>
                    <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                      <Phone size={12} /> {selectedOrder.client.phone}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700">
                    <MessageSquare size={14} /> WhatsApp
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-300">
                    <Send size={14} /> Notificar
                  </button>
                </div>
              </div>

              {/* Tracking */}
              {selectedOrder.trackingCode && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Truck size={16} /> Envío
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Transportista</p>
                      <p className="text-sm font-medium text-gray-900">{selectedOrder.carrier}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Código de seguimiento</p>
                      <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                        {selectedOrder.trackingCode}
                        <ExternalLink size={12} className="text-blue-500" />
                      </p>
                    </div>
                  </div>
                  {selectedOrder.estimatedDelivery && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-xs text-blue-700 flex items-center gap-1">
                        <Calendar size={12} />
                        Entrega estimada: {new Date(selectedOrder.estimatedDelivery).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Address */}
              {selectedOrder.address && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Dirección de entrega</p>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg flex items-start gap-2">
                    <MapPin size={14} className="text-gray-400 mt-0.5" />
                    {selectedOrder.address}
                  </p>
                </div>
              )}

              {/* Items */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Package size={16} /> Productos
                </h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-900">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                {selectedOrder.status === 'problema' && (
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                    Abrir reclamo
                  </button>
                )}
                {selectedOrder.status === 'entregado' && (
                  <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">
                    Solicitar reseña
                  </button>
                )}
                {selectedOrder.status === 'en_camino' && (
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                    Marcar entregado
                  </button>
                )}
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300">
                  Ver historial
                </button>
              </div>
            </div>
          </div>
        ) : activeTab === 'casos' && selectedCase ? (
          <div className="flex-1 bg-white rounded-xl border border-gray-100 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold text-gray-900">{selectedCase.number}</h2>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${caseTypeConfig[selectedCase.type].color}`}>
                      {caseTypeConfig[selectedCase.type].label}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityConfig[selectedCase.priority].color}`}>
                      {selectedCase.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{selectedCase.subject}</p>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-lg">
                  <MoreVertical size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Client */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User size={16} /> Cliente
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Nombre</p>
                    <p className="text-sm font-medium text-gray-900">{selectedCase.client.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Teléfono</p>
                    <p className="text-sm font-medium text-gray-900">{selectedCase.client.phone}</p>
                  </div>
                </div>
                {selectedCase.orderNumber && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500">Pedido relacionado</p>
                    <p className="text-sm font-medium text-blue-600">{selectedCase.orderNumber}</p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <p className="text-xs text-gray-500 mb-1">Descripción del caso</p>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedCase.description}</p>
              </div>

              {/* Warranty */}
              {selectedCase.warranty && (
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                  <h3 className="text-sm font-semibold text-purple-900 mb-3 flex items-center gap-2">
                    <Shield size={16} /> Garantía
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-purple-600">Producto</p>
                      <p className="text-sm font-medium text-purple-900">{selectedCase.warranty.product}</p>
                    </div>
                    <div>
                      <p className="text-xs text-purple-600">Vence</p>
                      <p className="text-sm font-medium text-purple-900">
                        {new Date(selectedCase.warranty.expiresAt).toLocaleDateString('es-AR')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium inline-block">
                    ✓ Garantía vigente
                  </div>
                </div>
              )}

              {/* Attachments */}
              {selectedCase.attachments && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">Archivos adjuntos ({selectedCase.attachments})</p>
                  <div className="flex gap-2">
                    {Array.from({ length: selectedCase.attachments }).map((_, idx) => (
                      <div key={idx} className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Camera size={20} className="text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                {selectedCase.status === 'abierto' && (
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                    Tomar caso
                  </button>
                )}
                {selectedCase.status === 'en_proceso' && (
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                    Marcar resuelto
                  </button>
                )}
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300">
                  Agregar nota
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-white rounded-xl border border-gray-100 flex items-center justify-center">
            <div className="text-center">
              <Package size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Selecciona un {activeTab === 'pedidos' ? 'pedido' : 'caso'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
