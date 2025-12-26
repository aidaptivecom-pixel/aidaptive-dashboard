import React, { useState } from 'react';
import {
  Search,
  Filter,
  ShoppingCart,
  Package,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  Phone,
  MessageSquare,
  Send,
  Plus,
  ChevronRight,
  CreditCard,
  Truck,
  Copy,
  ExternalLink,
  MoreVertical,
  Percent,
  FileText
} from 'lucide-react';

type QuoteStatus = 'borrador' | 'enviada' | 'aprobada' | 'pagada' | 'vencida' | 'rechazada';
type PaymentMethod = 'mercadopago' | 'transferencia' | 'efectivo' | 'pendiente';

interface QuoteItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  stock: number;
}

interface Quote {
  id: string;
  number: string;
  client: {
    name: string;
    phone: string;
    email?: string;
    type: 'minorista' | 'mayorista';
  };
  items: QuoteItem[];
  subtotal: number;
  discount?: number;
  total: number;
  status: QuoteStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  expiresAt: string;
  notes?: string;
  paymentLink?: string;
}

const MOCK_QUOTES: Quote[] = [
  {
    id: '1',
    number: 'COT-2024-0234',
    client: { name: 'Juan Pérez', phone: '+54 9 11 2345-6789', type: 'minorista' },
    items: [
      { sku: 'PANT-IP14PM', name: 'Pantalla iPhone 14 Pro Max OLED', quantity: 1, unitPrice: 185000, stock: 3 },
      { sku: 'BAT-IP14PM', name: 'Batería iPhone 14 Pro Max', quantity: 1, unitPrice: 45000, stock: 8 },
    ],
    subtotal: 230000,
    total: 230000,
    status: 'enviada',
    paymentMethod: 'pendiente',
    createdAt: '2024-12-26T10:30:00',
    expiresAt: '2024-12-28T10:30:00',
    paymentLink: 'https://mpago.la/abc123'
  },
  {
    id: '2',
    number: 'COT-2024-0233',
    client: { name: 'TecnoFix Buenos Aires', phone: '+54 9 11 3456-7890', email: 'compras@tecnofix.com', type: 'mayorista' },
    items: [
      { sku: 'PANT-IP13', name: 'Pantalla iPhone 13 OLED', quantity: 5, unitPrice: 95000, stock: 12 },
      { sku: 'PANT-IP12', name: 'Pantalla iPhone 12 OLED', quantity: 5, unitPrice: 75000, stock: 15 },
      { sku: 'BAT-IP13', name: 'Batería iPhone 13', quantity: 10, unitPrice: 28000, stock: 25 },
    ],
    subtotal: 1130000,
    discount: 113000,
    total: 1017000,
    status: 'aprobada',
    paymentMethod: 'transferencia',
    createdAt: '2024-12-25T14:00:00',
    expiresAt: '2024-12-27T14:00:00',
    notes: 'Cliente mayorista - 10% descuento aplicado'
  },
  {
    id: '3',
    number: 'COT-2024-0232',
    client: { name: 'María García', phone: '+54 9 11 4567-8901', type: 'minorista' },
    items: [
      { sku: 'CARG-MAGSAFE', name: 'Cargador MagSafe Original', quantity: 1, unitPrice: 65000, stock: 5 },
    ],
    subtotal: 65000,
    total: 65000,
    status: 'pagada',
    paymentMethod: 'mercadopago',
    createdAt: '2024-12-25T09:00:00',
    expiresAt: '2024-12-27T09:00:00'
  },
  {
    id: '4',
    number: 'COT-2024-0231',
    client: { name: 'Carlos López', phone: '+54 9 11 5678-9012', type: 'minorista' },
    items: [
      { sku: 'PANT-IP15PM', name: 'Pantalla iPhone 15 Pro Max OLED', quantity: 1, unitPrice: 320000, stock: 2 },
    ],
    subtotal: 320000,
    total: 320000,
    status: 'vencida',
    paymentMethod: 'pendiente',
    createdAt: '2024-12-20T11:00:00',
    expiresAt: '2024-12-22T11:00:00'
  },
  {
    id: '5',
    number: 'COT-2024-0230',
    client: { name: 'Ana Martínez', phone: '+54 9 11 6789-0123', type: 'minorista' },
    items: [
      { sku: 'BAT-MBPM1', name: 'Batería MacBook Pro M1 14"', quantity: 1, unitPrice: 180000, stock: 0 },
    ],
    subtotal: 180000,
    total: 180000,
    status: 'borrador',
    paymentMethod: 'pendiente',
    createdAt: '2024-12-26T15:00:00',
    expiresAt: '2024-12-28T15:00:00',
    notes: 'Sin stock - consultar con proveedor'
  },
];

const statusConfig: Record<QuoteStatus, { label: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  borrador: { label: 'Borrador', color: 'text-gray-600', bgColor: 'bg-gray-50 border-gray-200', icon: <FileText size={14} /> },
  enviada: { label: 'Enviada', color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-200', icon: <Send size={14} /> },
  aprobada: { label: 'Aprobada', color: 'text-green-700', bgColor: 'bg-green-50 border-green-200', icon: <CheckCircle2 size={14} /> },
  pagada: { label: 'Pagada', color: 'text-emerald-700', bgColor: 'bg-emerald-50 border-emerald-200', icon: <DollarSign size={14} /> },
  vencida: { label: 'Vencida', color: 'text-orange-700', bgColor: 'bg-orange-50 border-orange-200', icon: <Clock size={14} /> },
  rechazada: { label: 'Rechazada', color: 'text-red-600', bgColor: 'bg-red-50 border-red-200', icon: <XCircle size={14} /> },
};

const paymentMethodConfig: Record<PaymentMethod, { label: string; icon: React.ReactNode }> = {
  mercadopago: { label: 'MercadoPago', icon: <CreditCard size={14} /> },
  transferencia: { label: 'Transferencia', icon: <DollarSign size={14} /> },
  efectivo: { label: 'Efectivo', icon: <DollarSign size={14} /> },
  pendiente: { label: 'Pendiente', icon: <Clock size={14} /> },
};

export const VentasView: React.FC = () => {
  const [quotes] = useState<Quote[]>(MOCK_QUOTES);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(MOCK_QUOTES[0]);
  const [filterStatus, setFilterStatus] = useState<QuoteStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuotes = quotes.filter(q => {
    const matchesStatus = filterStatus === 'all' || q.status === filterStatus;
    const matchesSearch =
      q.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.client.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    pendientes: quotes.filter(q => q.status === 'enviada').length,
    aprobadas: quotes.filter(q => q.status === 'aprobada').length,
    pagadas: quotes.filter(q => q.status === 'pagada').length,
    totalMes: quotes.filter(q => q.status === 'pagada').reduce((sum, q) => sum + q.total, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ventas</h1>
          <p className="text-sm text-gray-500">Cotizaciones, pedidos y cobros</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
          <Plus size={16} />
          Nueva Cotización
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Pendientes</span>
            <Clock size={16} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.pendientes}</p>
          <p className="text-xs text-gray-400">esperando respuesta</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Aprobadas</span>
            <CheckCircle2 size={16} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.aprobadas}</p>
          <p className="text-xs text-gray-400">listas para cobrar</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Pagadas hoy</span>
            <DollarSign size={16} className="text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.pagadas}</p>
          <p className="text-xs text-gray-400">cerradas</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Facturado (mes)</span>
            <TrendingUp size={16} className="text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${(stats.totalMes / 1000).toFixed(0)}k</p>
          <p className="text-xs text-green-600">+18% vs mes anterior</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 h-[calc(100vh-320px)]">
        {/* Quotes List */}
        <div className="w-[400px] bg-white rounded-xl border border-gray-100 flex flex-col">
          {/* Search & Filter */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Buscar cotización, cliente..."
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
                Todas
              </button>
              {(['enviada', 'aprobada', 'pagada', 'vencida'] as QuoteStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    filterStatus === status ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {statusConfig[status].label}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {filteredQuotes.map((quote) => (
              <div
                key={quote.id}
                onClick={() => setSelectedQuote(quote)}
                className={`p-4 border-b border-gray-50 cursor-pointer transition-colors ${
                  selectedQuote?.id === quote.id ? 'bg-gray-50' : 'hover:bg-gray-25'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${statusConfig[quote.status].bgColor} ${statusConfig[quote.status].color}`}>
                    <ShoppingCart size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-gray-900">{quote.number}</span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(quote.createdAt).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 truncate mb-1">{quote.client.name}</p>
                    <p className="text-sm font-medium text-gray-900 mb-2">${quote.total.toLocaleString('es-AR')}</p>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusConfig[quote.status].bgColor} ${statusConfig[quote.status].color}`}>
                        {statusConfig[quote.status].icon}
                        {statusConfig[quote.status].label}
                      </span>
                      {quote.client.type === 'mayorista' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-50 text-purple-700 border border-purple-200">
                          Mayorista
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        {selectedQuote ? (
          <div className="flex-1 bg-white rounded-xl border border-gray-100 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold text-gray-900">{selectedQuote.number}</h2>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusConfig[selectedQuote.status].bgColor} ${statusConfig[selectedQuote.status].color}`}>
                      {statusConfig[selectedQuote.status].icon}
                      {statusConfig[selectedQuote.status].label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Creada {new Date(selectedQuote.createdAt).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-50 rounded-lg">
                    <Copy size={20} className="text-gray-500" />
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
                  {selectedQuote.client.type === 'mayorista' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-100 text-purple-700">
                      Mayorista
                    </span>
                  )}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Nombre</p>
                    <p className="text-sm font-medium text-gray-900">{selectedQuote.client.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Teléfono</p>
                    <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                      <Phone size={12} />
                      {selectedQuote.client.phone}
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
                    Enviar cotización
                  </button>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Package size={16} />
                  Productos ({selectedQuote.items.length})
                </h3>
                <div className="space-y-2">
                  {selectedQuote.items.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500">SKU: {item.sku}</span>
                          <span className="text-xs text-gray-500">Cant: {item.quantity}</span>
                          <span className={`text-xs ${item.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            Stock: {item.stock}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">${(item.unitPrice * item.quantity).toLocaleString('es-AR')}</p>
                        <p className="text-xs text-gray-500">${item.unitPrice.toLocaleString('es-AR')} c/u</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-900">${selectedQuote.subtotal.toLocaleString('es-AR')}</span>
                  </div>
                  {selectedQuote.discount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Percent size={12} />
                        Descuento
                      </span>
                      <span className="text-green-600">-${selectedQuote.discount.toLocaleString('es-AR')}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-2 flex justify-between">
                    <span className="text-gray-900 font-semibold">Total</span>
                    <span className="text-xl font-bold text-gray-900">${selectedQuote.total.toLocaleString('es-AR')}</span>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CreditCard size={16} />
                  Pago
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {paymentMethodConfig[selectedQuote.paymentMethod].icon}
                    <span className="text-sm text-gray-700">{paymentMethodConfig[selectedQuote.paymentMethod].label}</span>
                  </div>
                  {selectedQuote.paymentLink && (
                    <a href="#" className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                      <ExternalLink size={12} />
                      Link de pago
                    </a>
                  )}
                </div>
                {selectedQuote.status === 'enviada' && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-xs text-blue-700">Vence el {new Date(selectedQuote.expiresAt).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                )}
              </div>

              {/* Notes */}
              {selectedQuote.notes && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Notas</p>
                  <p className="text-sm text-gray-700 bg-yellow-50 p-3 rounded-lg border border-yellow-100">{selectedQuote.notes}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                {selectedQuote.status === 'borrador' && (
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                    Enviar al cliente
                  </button>
                )}
                {selectedQuote.status === 'enviada' && (
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                    Marcar aprobada
                  </button>
                )}
                {selectedQuote.status === 'aprobada' && (
                  <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 flex items-center justify-center gap-2">
                    <CreditCard size={16} />
                    Registrar pago
                  </button>
                )}
                {selectedQuote.status === 'pagada' && (
                  <button className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center justify-center gap-2">
                    <Truck size={16} />
                    Crear envío
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
              <ShoppingCart size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Selecciona una cotización</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
