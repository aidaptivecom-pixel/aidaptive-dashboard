import React, { useState } from 'react';
import { 
  Search, 
  FileText, 
  Clock, 
  Send, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  ExternalLink,
  Phone,
  Mail,
  Copy,
  MoreVertical,
  Plus,
  Building2,
  User,
  Percent,
  Calendar,
  MessageSquare,
  DollarSign,
  TrendingUp
} from 'lucide-react';

// Types
interface QuoteProduct {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

interface Quote {
  id: string;
  number: string;
  created_at: string;
  valid_until: string;
  client: {
    name: string;
    company?: string;
    email: string;
    phone: string;
    type: 'minorista' | 'mayorista';
    cuit?: string;
  };
  status: 'borrador' | 'enviada' | 'aprobada' | 'rechazada' | 'vencida' | 'facturada';
  products: QuoteProduct[];
  subtotal: number;
  discount_percent: number;
  discount_amount: number;
  iva: number;
  total: number;
  notes?: string;
  payment_terms?: string;
  sales_rep: string;
}

// Mock data
const MOCK_QUOTES: Quote[] = [
  {
    id: 'cot-001',
    number: 'COT-2024-0156',
    created_at: '2024-12-27T09:00:00',
    valid_until: '2025-01-10T23:59:59',
    client: {
      name: 'Martín Rodríguez',
      company: 'TechSoluciones SRL',
      email: 'martin@techsoluciones.com',
      phone: '+54 9 11 4567-8901',
      type: 'mayorista',
      cuit: '30-71234567-9'
    },
    status: 'enviada',
    products: [
      { id: '1', name: 'RTX 4060 8GB GDDR6 MSI Ventus', sku: 'GPU-4060-MSI', quantity: 5, unitPrice: 185000, discount: 10, total: 832500 },
      { id: '2', name: 'RAM DDR5 16GB Kingston Fury 5600MHz', sku: 'RAM-KNG-16', quantity: 10, unitPrice: 45000, discount: 15, total: 382500 },
      { id: '3', name: 'SSD NVMe 1TB Samsung 980 Pro', sku: 'SSD-SAM-1TB', quantity: 10, unitPrice: 65000, discount: 12, total: 572000 }
    ],
    subtotal: 1787000,
    discount_percent: 5,
    discount_amount: 89350,
    iva: 356463,
    total: 2054113,
    notes: 'Cliente solicita entrega en 3 sucursales diferentes',
    payment_terms: '50% anticipo, 50% contra entrega',
    sales_rep: 'Carlos López'
  },
  {
    id: 'cot-002',
    number: 'COT-2024-0155',
    created_at: '2024-12-26T15:30:00',
    valid_until: '2025-01-09T23:59:59',
    client: {
      name: 'Laura Fernández',
      email: 'laura.fernandez@email.com',
      phone: '+54 9 11 2345-6789',
      type: 'minorista'
    },
    status: 'aprobada',
    products: [
      { id: '4', name: 'Monitor LG 27" 4K IPS 27UP850-W', sku: 'MON-LG27-4K', quantity: 1, unitPrice: 280000, discount: 0, total: 280000 },
      { id: '5', name: 'Teclado Logitech MX Keys', sku: 'TEC-LOG-MX', quantity: 1, unitPrice: 85000, discount: 0, total: 85000 }
    ],
    subtotal: 365000,
    discount_percent: 0,
    discount_amount: 0,
    iva: 76650,
    total: 441650,
    payment_terms: 'Transferencia bancaria',
    sales_rep: 'Ana Martínez'
  },
  {
    id: 'cot-003',
    number: 'COT-2024-0154',
    created_at: '2024-12-26T11:00:00',
    valid_until: '2025-01-08T23:59:59',
    client: {
      name: 'Roberto Gómez',
      company: 'Gómez Computación',
      email: 'roberto@gomezcomp.com.ar',
      phone: '+54 9 351 456-7890',
      type: 'mayorista',
      cuit: '20-28765432-1'
    },
    status: 'borrador',
    products: [
      { id: '6', name: 'Notebook Lenovo ThinkPad E14 i5', sku: 'NOT-LEN-E14', quantity: 8, unitPrice: 450000, discount: 12, total: 3168000 },
      { id: '7', name: 'Mouse Logitech MX Master 3S', sku: 'MOU-LOG-MX3', quantity: 8, unitPrice: 65000, discount: 10, total: 468000 }
    ],
    subtotal: 3636000,
    discount_percent: 8,
    discount_amount: 290880,
    iva: 702474,
    total: 4047594,
    notes: 'Pendiente definir modelo exacto de notebooks',
    sales_rep: 'Carlos López'
  },
  {
    id: 'cot-004',
    number: 'COT-2024-0153',
    created_at: '2024-12-25T16:45:00',
    valid_until: '2024-12-26T23:59:59',
    client: {
      name: 'Patricia Sánchez',
      company: 'Estudio Contable PS',
      email: 'patricia@estudiops.com',
      phone: '+54 9 11 3456-7890',
      type: 'mayorista',
      cuit: '27-30987654-3'
    },
    status: 'vencida',
    products: [
      { id: '8', name: 'PC Armada Oficina i5 12400', sku: 'PC-OFI-I5', quantity: 3, unitPrice: 320000, discount: 5, total: 912000 }
    ],
    subtotal: 912000,
    discount_percent: 0,
    discount_amount: 0,
    iva: 191520,
    total: 1103520,
    sales_rep: 'Ana Martínez'
  },
  {
    id: 'cot-005',
    number: 'COT-2024-0152',
    created_at: '2024-12-24T10:00:00',
    valid_until: '2025-01-07T23:59:59',
    client: {
      name: 'Diego Morales',
      company: 'Gaming Zone Argentina',
      email: 'diego@gamingzone.ar',
      phone: '+54 9 11 5678-1234',
      type: 'mayorista',
      cuit: '30-71654321-8'
    },
    status: 'facturada',
    products: [
      { id: '9', name: 'RTX 4070 12GB GDDR6X', sku: 'GPU-4070-12G', quantity: 3, unitPrice: 420000, discount: 8, total: 1159200 },
      { id: '10', name: 'Fuente Corsair RM850 80+ Gold', sku: 'PSU-COR-850', quantity: 3, unitPrice: 95000, discount: 5, total: 270750 },
      { id: '11', name: 'Gabinete NZXT H7 Flow', sku: 'GAB-NZXT-H7', quantity: 3, unitPrice: 75000, discount: 5, total: 213750 }
    ],
    subtotal: 1643700,
    discount_percent: 3,
    discount_amount: 49311,
    iva: 334772,
    total: 1929161,
    payment_terms: 'Cuenta corriente 30 días',
    sales_rep: 'Carlos López'
  },
  {
    id: 'cot-006',
    number: 'COT-2024-0151',
    created_at: '2024-12-23T14:20:00',
    valid_until: '2025-01-06T23:59:59',
    client: {
      name: 'Empresa ABC SA',
      company: 'Empresa ABC SA',
      email: 'compras@empresaabc.com',
      phone: '+54 9 11 4321-8765',
      type: 'mayorista',
      cuit: '30-70123456-7'
    },
    status: 'rechazada',
    products: [
      { id: '12', name: 'Server Dell PowerEdge T150', sku: 'SRV-DELL-T150', quantity: 1, unitPrice: 1850000, discount: 5, total: 1757500 }
    ],
    subtotal: 1757500,
    discount_percent: 0,
    discount_amount: 0,
    iva: 369075,
    total: 2126575,
    notes: 'Cliente optó por otra marca',
    sales_rep: 'Ana Martínez'
  }
];

const statusConfig = {
  borrador: { label: 'Borrador', color: 'bg-gray-100 text-gray-600', icon: FileText },
  enviada: { label: 'Enviada', color: 'bg-blue-100 text-blue-700', icon: Send },
  aprobada: { label: 'Aprobada', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  rechazada: { label: 'Rechazada', color: 'bg-red-100 text-red-700', icon: XCircle },
  vencida: { label: 'Vencida', color: 'bg-amber-100 text-amber-700', icon: AlertCircle },
  facturada: { label: 'Facturada', color: 'bg-purple-100 text-purple-700', icon: DollarSign },
};

export const CotizacionesView: React.FC = () => {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(MOCK_QUOTES[0]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuotes = MOCK_QUOTES.filter(quote => {
    const matchesSearch = 
      quote.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || quote.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-AR', { 
      day: '2-digit', 
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-AR', { 
      day: '2-digit', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const isExpiringSoon = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays > 0;
  };

  const isExpired = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Date() > date;
  };

  // Stats
  const stats = {
    borradores: MOCK_QUOTES.filter(q => q.status === 'borrador').length,
    enviadas: MOCK_QUOTES.filter(q => q.status === 'enviada').length,
    aprobadas: MOCK_QUOTES.filter(q => q.status === 'aprobada').length,
    facturadoMes: MOCK_QUOTES.filter(q => q.status === 'facturada').reduce((sum, q) => sum + q.total, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cotizaciones</h1>
          <p className="text-gray-500 text-sm mt-1">Presupuestos y cotizaciones B2B</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <FileText size={16} />
            Crear Reporte
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm">
            <Plus size={16} />
            Nueva Cotización
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <button 
          onClick={() => setFilterStatus('borrador')}
          className={`p-4 rounded-xl border transition-all ${
            filterStatus === 'borrador' ? 'border-gray-400 bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText size={20} className="text-gray-600" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-900">{stats.borradores}</p>
              <p className="text-sm text-gray-500">Borradores</p>
            </div>
          </div>
        </button>
        <button 
          onClick={() => setFilterStatus('enviada')}
          className={`p-4 rounded-xl border transition-all ${
            filterStatus === 'enviada' ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Send size={20} className="text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-900">{stats.enviadas}</p>
              <p className="text-sm text-gray-500">Enviadas</p>
            </div>
          </div>
        </button>
        <button 
          onClick={() => setFilterStatus('aprobada')}
          className={`p-4 rounded-xl border transition-all ${
            filterStatus === 'aprobada' ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-900">{stats.aprobadas}</p>
              <p className="text-sm text-gray-500">Aprobadas</p>
            </div>
          </div>
        </button>
        <div className="p-4 rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-purple-600" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.facturadoMes)}</p>
              <p className="text-sm text-gray-500">Facturado (mes)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Quotes List */}
        <div className="w-[420px] flex-shrink-0 bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col">
          {/* Search & Filters */}
          <div className="p-4 border-b border-gray-100 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Buscar por cliente, empresa o #..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Todas
              </button>
              <button 
                onClick={() => setFilterStatus('enviada')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'enviada' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Pendientes
              </button>
              <button 
                onClick={() => setFilterStatus('vencida')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'vencida' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Vencidas
              </button>
            </div>
          </div>

          {/* Quotes */}
          <div className="flex-1 overflow-y-auto">
            {filteredQuotes.map((quote) => {
              const statusConf = statusConfig[quote.status];
              const StatusIcon = statusConf.icon;
              
              return (
                <div
                  key={quote.id}
                  onClick={() => setSelectedQuote(quote)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedQuote?.id === quote.id ? 'bg-emerald-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{quote.number}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConf.color}`}>
                          <StatusIcon size={12} />
                          {statusConf.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">{formatDateTime(quote.created_at)}</p>
                    </div>
                    <p className="font-bold text-gray-900">{formatCurrency(quote.total)}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {quote.client.type === 'mayorista' ? (
                      <Building2 size={14} className="text-purple-500" />
                    ) : (
                      <User size={14} className="text-gray-400" />
                    )}
                    <span className="text-sm font-medium text-gray-700">
                      {quote.client.company || quote.client.name}
                    </span>
                    {quote.client.type === 'mayorista' && (
                      <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">
                        Mayorista
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      {quote.products.length} producto{quote.products.length > 1 ? 's' : ''}
                    </p>
                    {quote.status !== 'facturada' && quote.status !== 'rechazada' && (
                      <p className={`text-xs ${
                        isExpired(quote.valid_until) ? 'text-red-600' : 
                        isExpiringSoon(quote.valid_until) ? 'text-amber-600' : 'text-gray-500'
                      }`}>
                        {isExpired(quote.valid_until) ? 'Vencida' : `Válida hasta ${formatDate(quote.valid_until)}`}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quote Detail */}
        {selectedQuote && (
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-gray-900">{selectedQuote.number}</h2>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium ${statusConfig[selectedQuote.status].color}`}>
                      {statusConfig[selectedQuote.status].label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Creada el {formatDateTime(selectedQuote.created_at)} por {selectedQuote.sales_rep}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <ExternalLink size={14} />
                    Ver PDF
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical size={18} className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 380px)' }}>
              {/* Cliente */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Cliente</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedQuote.client.type === 'mayorista' ? 'bg-purple-100' : 'bg-gray-200'
                      }`}>
                        {selectedQuote.client.type === 'mayorista' ? (
                          <Building2 size={20} className="text-purple-600" />
                        ) : (
                          <User size={20} className="text-gray-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{selectedQuote.client.name}</p>
                        {selectedQuote.client.company && (
                          <p className="text-sm text-gray-600">{selectedQuote.client.company}</p>
                        )}
                      </div>
                    </div>
                    {selectedQuote.client.type === 'mayorista' && (
                      <span className="px-2.5 py-1 rounded-lg text-sm font-medium bg-purple-100 text-purple-700">
                        Mayorista
                      </span>
                    )}
                  </div>
                  {selectedQuote.client.cuit && (
                    <div className="text-sm text-gray-600">
                      <span className="text-gray-500">CUIT:</span> {selectedQuote.client.cuit}
                    </div>
                  )}
                  <div className="flex items-center gap-6 text-sm pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={14} className="text-gray-400" />
                      <span>{selectedQuote.client.email}</span>
                      <button onClick={() => copyToClipboard(selectedQuote.client.email)} className="text-gray-400 hover:text-gray-600">
                        <Copy size={12} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={14} className="text-gray-400" />
                      <span>{selectedQuote.client.phone}</span>
                      <button onClick={() => copyToClipboard(selectedQuote.client.phone)} className="text-gray-400 hover:text-gray-600">
                        <Copy size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Validez */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <Calendar size={20} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Válida hasta</p>
                  <p className={`font-medium ${
                    isExpired(selectedQuote.valid_until) ? 'text-red-600' : 
                    isExpiringSoon(selectedQuote.valid_until) ? 'text-amber-600' : 'text-gray-900'
                  }`}>
                    {formatDate(selectedQuote.valid_until)}
                    {isExpired(selectedQuote.valid_until) && ' (Vencida)'}
                    {isExpiringSoon(selectedQuote.valid_until) && ' (Por vencer)'}
                  </p>
                </div>
              </div>

              {/* Productos */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Productos</h3>
                <div className="bg-gray-50 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-3 font-medium text-gray-500">Producto</th>
                        <th className="text-center p-3 font-medium text-gray-500">Cant.</th>
                        <th className="text-right p-3 font-medium text-gray-500">Precio</th>
                        <th className="text-center p-3 font-medium text-gray-500">Dto.</th>
                        <th className="text-right p-3 font-medium text-gray-500">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedQuote.products.map((product, index) => (
                        <tr key={product.id} className={index > 0 ? 'border-t border-gray-200' : ''}>
                          <td className="p-3">
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                          </td>
                          <td className="p-3 text-center text-gray-900">{product.quantity}</td>
                          <td className="p-3 text-right text-gray-900">{formatCurrency(product.unitPrice)}</td>
                          <td className="p-3 text-center">
                            {product.discount > 0 ? (
                              <span className="text-green-600">-{product.discount}%</span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="p-3 text-right font-medium text-gray-900">{formatCurrency(product.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totales */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Resumen</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">{formatCurrency(selectedQuote.subtotal)}</span>
                  </div>
                  {selectedQuote.discount_percent > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Percent size={14} />
                        Descuento adicional ({selectedQuote.discount_percent}%)
                      </span>
                      <span className="text-green-600">-{formatCurrency(selectedQuote.discount_amount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">IVA (21%)</span>
                    <span className="text-gray-900">{formatCurrency(selectedQuote.iva)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-lg text-gray-900">{formatCurrency(selectedQuote.total)}</span>
                  </div>
                  {selectedQuote.payment_terms && (
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-500">Condiciones de pago</p>
                      <p className="text-sm text-gray-900">{selectedQuote.payment_terms}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Notas */}
              {selectedQuote.notes && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Notas</h3>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start gap-2">
                      <MessageSquare size={16} className="text-amber-600 mt-0.5" />
                      <p className="text-sm text-amber-800">{selectedQuote.notes}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                {selectedQuote.status === 'borrador' && (
                  <>
                    <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      <Send size={18} />
                      Enviar al cliente
                    </button>
                    <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                      Editar
                    </button>
                  </>
                )}
                {selectedQuote.status === 'enviada' && (
                  <>
                    <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                      <CheckCircle size={18} />
                      Marcar aprobada
                    </button>
                    <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                      Reenviar
                    </button>
                  </>
                )}
                {selectedQuote.status === 'aprobada' && (
                  <button className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                    <DollarSign size={18} />
                    Generar factura
                  </button>
                )}
                {selectedQuote.status === 'vencida' && (
                  <button className="flex-1 px-4 py-3 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors flex items-center justify-center gap-2">
                    <Clock size={18} />
                    Extender validez
                  </button>
                )}
                {(selectedQuote.status === 'facturada' || selectedQuote.status === 'rechazada') && (
                  <button className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                    Duplicar cotización
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
