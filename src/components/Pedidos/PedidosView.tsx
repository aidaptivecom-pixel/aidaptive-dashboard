import React, { useState } from 'react';
import { 
  Search, 
  Package, 
  Truck, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Copy,
  MoreVertical
} from 'lucide-react';

// Types based on Tiendanube API
interface OrderProduct {
  id: string;
  name: string;
  variant: string;
  quantity: number;
  price: number;
  sku: string;
  image?: string;
}

interface Order {
  id: string;
  number: number;
  created_at: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  payment_status: 'pending' | 'paid' | 'voided' | 'refunded';
  shipping_status: 'unpacked' | 'packed' | 'shipped' | 'delivered';
  subtotal: number;
  discount: number;
  shipping_cost: number;
  total: number;
  products: OrderProduct[];
  shipping_address: {
    address: string;
    city: string;
    province: string;
    zipcode: string;
  };
  tracking_code?: string;
  tracking_url?: string;
  shipping_carrier?: string;
  coupon?: string;
}

// Mock data based on Tiendanube API structure
const MOCK_ORDERS: Order[] = [
  {
    id: 'tn-871254203',
    number: 1547,
    created_at: '2024-12-27T10:30:00',
    contact_name: 'Juan Pérez',
    contact_email: 'juan.perez@email.com',
    contact_phone: '+54 9 11 2345-6789',
    payment_status: 'paid',
    shipping_status: 'unpacked',
    subtotal: 185000,
    discount: 0,
    shipping_cost: 4500,
    total: 189500,
    products: [
      { id: '1', name: 'RTX 4060 8GB GDDR6', variant: 'MSI Ventus', quantity: 1, price: 185000, sku: 'GPU-4060-MSI' }
    ],
    shipping_address: {
      address: 'Av. Corrientes 1234, Piso 5',
      city: 'CABA',
      province: 'Buenos Aires',
      zipcode: '1043'
    }
  },
  {
    id: 'tn-871254198',
    number: 1546,
    created_at: '2024-12-27T09:15:00',
    contact_name: 'María García',
    contact_email: 'maria.garcia@email.com',
    contact_phone: '+54 9 11 3456-7890',
    payment_status: 'paid',
    shipping_status: 'packed',
    subtotal: 45000,
    discount: 4500,
    shipping_cost: 3200,
    total: 43700,
    products: [
      { id: '2', name: 'SSD NVMe 1TB Samsung 980 Pro', variant: 'Con disipador', quantity: 1, price: 28000, sku: 'SSD-SAM-1TB' },
      { id: '3', name: 'RAM DDR5 16GB Kingston Fury', variant: '5600MHz', quantity: 1, price: 17000, sku: 'RAM-KNG-16' }
    ],
    shipping_address: {
      address: 'Calle 45 N° 789',
      city: 'La Plata',
      province: 'Buenos Aires',
      zipcode: '1900'
    },
    coupon: 'VERANO10'
  },
  {
    id: 'tn-871254190',
    number: 1545,
    created_at: '2024-12-26T18:45:00',
    contact_name: 'Carlos López',
    contact_email: 'carlos.lopez@empresa.com',
    contact_phone: '+54 9 11 4567-8901',
    payment_status: 'paid',
    shipping_status: 'shipped',
    subtotal: 520000,
    discount: 0,
    shipping_cost: 0,
    total: 520000,
    products: [
      { id: '4', name: 'Monitor LG 27" 4K IPS', variant: '27UP850-W', quantity: 2, price: 180000, sku: 'MON-LG27-4K' },
      { id: '5', name: 'Teclado Logitech MX Keys', variant: 'Español', quantity: 2, price: 45000, sku: 'TEC-LOG-MX' },
      { id: '6', name: 'Mouse Logitech MX Master 3S', variant: 'Grafito', quantity: 2, price: 35000, sku: 'MOU-LOG-MX3' }
    ],
    shipping_address: {
      address: 'Av. Del Libertador 5678',
      city: 'Vicente López',
      province: 'Buenos Aires',
      zipcode: '1638'
    },
    tracking_code: 'OCA-123456789',
    tracking_url: 'https://www.oca.com.ar/seguimiento/123456789',
    shipping_carrier: 'OCA'
  },
  {
    id: 'tn-871254185',
    number: 1544,
    created_at: '2024-12-26T14:20:00',
    contact_name: 'Ana Martínez',
    contact_email: 'ana.martinez@email.com',
    contact_phone: '+54 9 351 234-5678',
    payment_status: 'paid',
    shipping_status: 'delivered',
    subtotal: 8500,
    discount: 0,
    shipping_cost: 2800,
    total: 11300,
    products: [
      { id: '7', name: 'Cable HDMI 2.1 3m', variant: '8K 60Hz', quantity: 2, price: 4250, sku: 'CAB-HDMI-3M' }
    ],
    shipping_address: {
      address: 'Bv. San Juan 456',
      city: 'Córdoba',
      province: 'Córdoba',
      zipcode: '5000'
    },
    tracking_code: 'ANDREANI-987654',
    tracking_url: 'https://www.andreani.com/tracking/987654',
    shipping_carrier: 'Andreani'
  },
  {
    id: 'tn-871254180',
    number: 1543,
    created_at: '2024-12-26T11:00:00',
    contact_name: 'Roberto Sánchez',
    contact_email: 'roberto.sanchez@email.com',
    contact_phone: '+54 9 11 5678-9012',
    payment_status: 'pending',
    shipping_status: 'unpacked',
    subtotal: 125000,
    discount: 0,
    shipping_cost: 4500,
    total: 129500,
    products: [
      { id: '8', name: 'Fuente Corsair RM750', variant: '750W 80+ Gold', quantity: 1, price: 75000, sku: 'PSU-COR-750' },
      { id: '9', name: 'Gabinete NZXT H510', variant: 'Negro Mate', quantity: 1, price: 50000, sku: 'GAB-NZXT-510' }
    ],
    shipping_address: {
      address: 'Av. Santa Fe 3210',
      city: 'CABA',
      province: 'Buenos Aires',
      zipcode: '1425'
    }
  }
];

const paymentStatusConfig = {
  pending: { label: 'Pendiente', color: 'bg-amber-100 text-amber-700', icon: Clock },
  paid: { label: 'Pagado', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  voided: { label: 'Anulado', color: 'bg-gray-100 text-gray-600', icon: XCircle },
  refunded: { label: 'Reembolsado', color: 'bg-red-100 text-red-700', icon: AlertCircle },
};

const shippingStatusConfig = {
  unpacked: { label: 'Por preparar', color: 'bg-amber-100 text-amber-700', icon: Package },
  packed: { label: 'Preparado', color: 'bg-blue-100 text-blue-700', icon: Package },
  shipped: { label: 'Enviado', color: 'bg-purple-100 text-purple-700', icon: Truck },
  delivered: { label: 'Entregado', color: 'bg-green-100 text-green-700', icon: CheckCircle },
};

export const PedidosView: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(MOCK_ORDERS[0]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = MOCK_ORDERS.filter(order => {
    const matchesSearch = 
      order.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.number.toString().includes(searchTerm) ||
      order.contact_email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
      order.shipping_status === filterStatus ||
      order.payment_status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateStr: string) => {
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

  // Stats
  const stats = {
    pending: MOCK_ORDERS.filter(o => o.shipping_status === 'unpacked').length,
    packed: MOCK_ORDERS.filter(o => o.shipping_status === 'packed').length,
    shipped: MOCK_ORDERS.filter(o => o.shipping_status === 'shipped').length,
    delivered: MOCK_ORDERS.filter(o => o.shipping_status === 'delivered').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <button 
          onClick={() => setFilterStatus('unpacked')}
          className={`p-4 rounded-xl border transition-all ${
            filterStatus === 'unpacked' ? 'border-amber-300 bg-amber-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Package size={20} className="text-amber-600" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-sm text-gray-500">Por preparar</p>
            </div>
          </div>
        </button>
        <button 
          onClick={() => setFilterStatus('packed')}
          className={`p-4 rounded-xl border transition-all ${
            filterStatus === 'packed' ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package size={20} className="text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-900">{stats.packed}</p>
              <p className="text-sm text-gray-500">Preparados</p>
            </div>
          </div>
        </button>
        <button 
          onClick={() => setFilterStatus('shipped')}
          className={`p-4 rounded-xl border transition-all ${
            filterStatus === 'shipped' ? 'border-purple-300 bg-purple-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Truck size={20} className="text-purple-600" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-900">{stats.shipped}</p>
              <p className="text-sm text-gray-500">En camino</p>
            </div>
          </div>
        </button>
        <button 
          onClick={() => setFilterStatus('delivered')}
          className={`p-4 rounded-xl border transition-all ${
            filterStatus === 'delivered' ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
              <p className="text-sm text-gray-500">Entregados</p>
            </div>
          </div>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Orders List */}
        <div className="w-[420px] flex-shrink-0 bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col">
          {/* Search & Filters */}
          <div className="p-4 border-b border-gray-100 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Buscar por nombre, # o email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              <button 
                onClick={() => setFilterStatus('pending')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'pending' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Pago pendiente
              </button>
            </div>
          </div>

          {/* Orders */}
          <div className="flex-1 overflow-y-auto">
            {filteredOrders.map((order) => {
              const paymentConfig = paymentStatusConfig[order.payment_status];
              const shippingConfig = shippingStatusConfig[order.shipping_status];
              const PaymentIcon = paymentConfig.icon;
              const ShippingIcon = shippingConfig.icon;
              
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedOrder?.id === order.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">#{order.number}</span>
                        <span className="text-sm text-gray-400">{formatDate(order.created_at)}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-700 mt-0.5">{order.contact_name}</p>
                    </div>
                    <p className="font-bold text-gray-900">{formatCurrency(order.total)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${paymentConfig.color}`}>
                      <PaymentIcon size={12} />
                      {paymentConfig.label}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${shippingConfig.color}`}>
                      <ShippingIcon size={12} />
                      {shippingConfig.label}
                    </span>
                    {order.coupon && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        {order.coupon}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2 truncate">
                    {order.products.map(p => `${p.quantity}x ${p.name}`).join(', ')}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Detail */}
        {selectedOrder && (
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-gray-900">Pedido #{selectedOrder.number}</h2>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium ${shippingStatusConfig[selectedOrder.shipping_status].color}`}>
                      {shippingStatusConfig[selectedOrder.shipping_status].label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Creado el {formatDate(selectedOrder.created_at)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a 
                    href={`https://tiendanube.com/admin/orders/${selectedOrder.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Ver en Tiendanube
                    <ExternalLink size={14} />
                  </a>
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
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-600">
                        {selectedOrder.contact_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{selectedOrder.contact_name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={14} className="text-gray-400" />
                      <span>{selectedOrder.contact_email}</span>
                      <button onClick={() => copyToClipboard(selectedOrder.contact_email)} className="text-gray-400 hover:text-gray-600">
                        <Copy size={12} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={14} className="text-gray-400" />
                      <span>{selectedOrder.contact_phone}</span>
                      <button onClick={() => copyToClipboard(selectedOrder.contact_phone)} className="text-gray-400 hover:text-gray-600">
                        <Copy size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Envío */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Envío</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900">{selectedOrder.shipping_address.address}</p>
                      <p className="text-sm text-gray-600">
                        {selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.province} ({selectedOrder.shipping_address.zipcode})
                      </p>
                    </div>
                  </div>
                  {selectedOrder.tracking_code && (
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500">Transportista</p>
                        <p className="text-sm font-medium text-gray-900">{selectedOrder.shipping_carrier}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Código de seguimiento</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-mono font-medium text-gray-900">{selectedOrder.tracking_code}</p>
                          {selectedOrder.tracking_url && (
                            <a 
                              href={selectedOrder.tracking_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Productos */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Productos</h3>
                <div className="bg-gray-50 rounded-xl overflow-hidden">
                  {selectedOrder.products.map((product, index) => (
                    <div 
                      key={product.id} 
                      className={`p-4 flex items-center gap-4 ${index > 0 ? 'border-t border-gray-200' : ''}`}
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package size={20} className="text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.variant} • SKU: {product.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{formatCurrency(product.price)}</p>
                        <p className="text-sm text-gray-500">x{product.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totales */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Resumen</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">{formatCurrency(selectedOrder.subtotal)}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Descuento {selectedOrder.coupon && `(${selectedOrder.coupon})`}</span>
                      <span className="text-green-600">-{formatCurrency(selectedOrder.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Envío</span>
                    <span className="text-gray-900">
                      {selectedOrder.shipping_cost > 0 ? formatCurrency(selectedOrder.shipping_cost) : 'Gratis'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-lg text-gray-900">{formatCurrency(selectedOrder.total)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <CreditCard size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">Estado de pago</span>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium ${paymentStatusConfig[selectedOrder.payment_status].color}`}>
                      {paymentStatusConfig[selectedOrder.payment_status].label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {selectedOrder.shipping_status === 'unpacked' && selectedOrder.payment_status === 'paid' && (
                  <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                    Marcar como preparado
                  </button>
                )}
                {selectedOrder.shipping_status === 'packed' && (
                  <button className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors">
                    Agregar tracking y enviar
                  </button>
                )}
                {selectedOrder.shipping_status === 'shipped' && (
                  <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors">
                    Marcar como entregado
                  </button>
                )}
                <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                  Imprimir etiqueta
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
