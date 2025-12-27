import React, { useState } from 'react';
import { 
  Search,
  Filter,
  Plus,
  MoreVertical,
  Mail,
  Phone,
  MessageCircle,
  Calendar,
  ShoppingBag,
  TrendingUp,
  Star,
  ChevronDown,
  Eye,
  Edit3,
  Trash2,
  Download,
  Upload,
  Users,
  UserPlus,
  DollarSign,
  Clock,
  Tag,
  Building2,
  User,
  MapPin,
  FileText
} from 'lucide-react';

type CustomerType = 'retail' | 'wholesale' | 'business';
type CustomerStatus = 'active' | 'inactive' | 'new';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: CustomerType;
  status: CustomerStatus;
  totalPurchases: number;
  totalSpent: number;
  lastPurchase: string;
  createdAt: string;
  tags: string[];
  company?: string;
  address?: string;
  notes?: string;
}

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan.perez@gmail.com',
    phone: '+54 11 5555-1234',
    type: 'retail',
    status: 'active',
    totalPurchases: 8,
    totalSpent: 2450000,
    lastPurchase: '2025-12-20',
    createdAt: '2024-03-15',
    tags: ['Gamer', 'Frecuente'],
  },
  {
    id: '2',
    name: 'Tech Solutions SRL',
    email: 'compras@techsolutions.com.ar',
    phone: '+54 11 4444-5678',
    type: 'wholesale',
    status: 'active',
    totalPurchases: 45,
    totalSpent: 18500000,
    lastPurchase: '2025-12-22',
    createdAt: '2023-06-10',
    tags: ['Mayorista', 'Premium'],
    company: 'Tech Solutions SRL',
    address: 'Av. Corrientes 1234, CABA',
  },
  {
    id: '3',
    name: 'María García',
    email: 'maria.garcia@outlook.com',
    phone: '+54 11 6666-7890',
    type: 'retail',
    status: 'active',
    totalPurchases: 3,
    totalSpent: 890000,
    lastPurchase: '2025-12-15',
    createdAt: '2025-01-20',
    tags: ['Diseñadora'],
  },
  {
    id: '4',
    name: 'Gaming Store',
    email: 'pedidos@gamingstore.com.ar',
    phone: '+54 11 3333-4567',
    type: 'business',
    status: 'active',
    totalPurchases: 28,
    totalSpent: 12800000,
    lastPurchase: '2025-12-18',
    createdAt: '2024-01-05',
    tags: ['Reventa', 'Premium'],
    company: 'Gaming Store',
    address: 'Galería Jardín, Local 45',
  },
  {
    id: '5',
    name: 'Carlos López',
    email: 'carlos.lopez@yahoo.com',
    phone: '+54 11 2222-3456',
    type: 'retail',
    status: 'inactive',
    totalPurchases: 2,
    totalSpent: 320000,
    lastPurchase: '2025-06-10',
    createdAt: '2025-02-28',
    tags: [],
  },
  {
    id: '6',
    name: 'Estudio Creativo',
    email: 'info@estudiocreativo.com',
    phone: '+54 11 7777-8901',
    type: 'business',
    status: 'active',
    totalPurchases: 12,
    totalSpent: 5400000,
    lastPurchase: '2025-12-19',
    createdAt: '2024-08-12',
    tags: ['Diseño', 'Mac'],
    company: 'Estudio Creativo',
  },
  {
    id: '7',
    name: 'Roberto Sánchez',
    email: 'roberto.s@gmail.com',
    phone: '+54 11 8888-9012',
    type: 'retail',
    status: 'new',
    totalPurchases: 1,
    totalSpent: 185000,
    lastPurchase: '2025-12-26',
    createdAt: '2025-12-26',
    tags: ['Nuevo'],
  },
  {
    id: '8',
    name: 'Distribuidora Norte',
    email: 'ventas@distnorte.com.ar',
    phone: '+54 11 1111-2222',
    type: 'wholesale',
    status: 'active',
    totalPurchases: 67,
    totalSpent: 45200000,
    lastSpurchase: '2025-12-24',
    createdAt: '2022-11-20',
    tags: ['Mayorista', 'VIP', 'Crédito'],
    company: 'Distribuidora Norte SA',
    address: 'Parque Industrial, Nave 12',
  },
];

// Fix typo in mock data
MOCK_CUSTOMERS[7].lastPurchase = '2025-12-24';

const typeConfig = {
  retail: { label: 'Minorista', color: 'bg-blue-100 text-blue-700', icon: <User size={12} /> },
  wholesale: { label: 'Mayorista', color: 'bg-purple-100 text-purple-700', icon: <Building2 size={12} /> },
  business: { label: 'Empresa', color: 'bg-orange-100 text-orange-700', icon: <Building2 size={12} /> },
};

const statusConfig = {
  active: { label: 'Activo', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  inactive: { label: 'Inactivo', color: 'bg-gray-100 text-gray-500', dot: 'bg-gray-400' },
  new: { label: 'Nuevo', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
};

export const ClientesView: React.FC = () => {
  const [customers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<CustomerType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | 'all'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.phone.includes(searchTerm) ||
                          customer.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || customer.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${value.toLocaleString('es-AR')}`;
  };

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const newThisMonth = customers.filter(c => c.status === 'new').length;
  const totalRevenue = customers.reduce((acc, c) => acc + c.totalSpent, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-sm text-gray-500">Gestiona tu base de datos de clientes</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
            <Download size={16} />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
            <Upload size={16} />
            Importar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
            <UserPlus size={16} />
            Nuevo Cliente
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Total Clientes</span>
            <Users size={16} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
          <p className="text-xs text-green-600">+12% este mes</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Clientes Activos</span>
            <TrendingUp size={16} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{activeCustomers}</p>
          <p className="text-xs text-gray-500">{Math.round((activeCustomers / totalCustomers) * 100)}% del total</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Nuevos Este Mes</span>
            <UserPlus size={16} className="text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{newThisMonth}</p>
          <p className="text-xs text-green-600">+3 vs mes anterior</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Facturación Total</span>
            <DollarSign size={16} className="text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
          <p className="text-xs text-green-600">+18% este mes</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, email, teléfono o empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as CustomerType | 'all')}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="all">Todos los tipos</option>
              <option value="retail">Minorista</option>
              <option value="wholesale">Mayorista</option>
              <option value="business">Empresa</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as CustomerStatus | 'all')}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="new">Nuevo</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{filteredCustomers.length} clientes encontrados</p>
              <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <Filter size={14} />
                Más filtros
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedCustomer?.id === customer.id ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {customer.name.charAt(0)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${typeConfig[customer.type].color}`}>
                        {typeConfig[customer.type].icon}
                        {typeConfig[customer.type].label}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[customer.status].color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[customer.status].dot}`}></span>
                        {statusConfig[customer.status].label}
                      </span>
                    </div>
                    
                    {customer.company && (
                      <p className="text-sm text-gray-600 mb-1">{customer.company}</p>
                    )}
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Mail size={12} />
                        {customer.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone size={12} />
                        {customer.phone}
                      </span>
                    </div>
                    
                    {customer.tags.length > 0 && (
                      <div className="flex items-center gap-1 mt-2">
                        {customer.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(customer.totalSpent)}</p>
                    <p className="text-xs text-gray-500">{customer.totalPurchases} compras</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Detail Panel */}
        <div className="bg-white rounded-xl border border-gray-100">
          {selectedCustomer ? (
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedCustomer.name}</h2>
                    {selectedCustomer.company && (
                      <p className="text-sm text-gray-600">{selectedCustomer.company}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${typeConfig[selectedCustomer.type].color}`}>
                        {typeConfig[selectedCustomer.type].label}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[selectedCustomer.status].color}`}>
                        {statusConfig[selectedCustomer.status].label}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical size={18} className="text-gray-500" />
                </button>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-gray-700">{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-gray-700">{selectedCustomer.phone}</span>
                </div>
                {selectedCustomer.address && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="text-gray-700">{selectedCustomer.address}</span>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <button className="flex flex-col items-center gap-1 p-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors">
                  <MessageCircle size={20} />
                  <span className="text-xs font-medium">WhatsApp</span>
                </button>
                <button className="flex flex-col items-center gap-1 p-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors">
                  <Mail size={20} />
                  <span className="text-xs font-medium">Email</span>
                </button>
                <button className="flex flex-col items-center gap-1 p-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors">
                  <FileText size={20} />
                  <span className="text-xs font-medium">Cotizar</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(selectedCustomer.totalSpent)}</p>
                  <p className="text-xs text-gray-500">Total gastado</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">{selectedCustomer.totalPurchases}</p>
                  <p className="text-xs text-gray-500">Compras</p>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2">
                    <ShoppingBag size={14} />
                    Última compra
                  </span>
                  <span className="font-medium text-gray-900">
                    {new Date(selectedCustomer.lastPurchase).toLocaleDateString('es-AR')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Calendar size={14} />
                    Cliente desde
                  </span>
                  <span className="font-medium text-gray-900">
                    {new Date(selectedCustomer.createdAt).toLocaleDateString('es-AR')}
                  </span>
                </div>
              </div>

              {/* Tags */}
              {selectedCustomer.tags.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <Tag size={12} />
                    Etiquetas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCustomer.tags.map((tag) => (
                      <span key={tag} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                    <button className="text-sm bg-gray-100 text-gray-500 px-3 py-1 rounded-full hover:bg-gray-200">
                      + Agregar
                    </button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  <Edit3 size={16} />
                  Editar
                </button>
                <button className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <User size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500 mb-1">Seleccioná un cliente</p>
              <p className="text-sm text-gray-400">para ver sus detalles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
