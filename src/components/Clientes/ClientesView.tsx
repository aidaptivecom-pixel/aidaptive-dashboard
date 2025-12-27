import React, { useState } from 'react';
import { 
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  MessageCircle,
  Calendar,
  ShoppingBag,
  TrendingUp,
  ChevronDown,
  Edit3,
  Trash2,
  Download,
  Upload,
  Users,
  UserPlus,
  DollarSign,
  Tag,
  Building2,
  User,
  MapPin,
  FileText,
  X,
  Plus,
  ArrowUpDown,
  AlertTriangle,
  Check,
  ExternalLink
} from 'lucide-react';

type CustomerType = 'retail' | 'wholesale' | 'business';
type CustomerStatus = 'active' | 'inactive' | 'new';
type SortOption = 'name' | 'recent' | 'spent' | 'purchases';

interface Purchase {
  id: string;
  date: string;
  items: string;
  total: number;
}

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
  purchases?: Purchase[];
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
    notes: 'Prefiere retiro en local. Interesado en monitores gaming.',
    purchases: [
      { id: 'p1', date: '2025-12-20', items: 'RTX 4070 Super', total: 890000 },
      { id: 'p2', date: '2025-11-15', items: 'RAM DDR5 32GB', total: 185000 },
      { id: 'p3', date: '2025-10-08', items: 'SSD NVMe 1TB', total: 125000 },
    ]
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
    notes: 'Cuenta corriente aprobada. Factura A.',
    purchases: [
      { id: 'p4', date: '2025-12-22', items: '10x RTX 4060, 5x i5-14400', total: 4500000 },
      { id: 'p5', date: '2025-12-10', items: '20x SSD 512GB', total: 1200000 },
      { id: 'p6', date: '2025-11-28', items: '15x RAM 16GB DDR4', total: 750000 },
    ]
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
    notes: 'Trabaja con diseño gráfico. Busca monitores con buena calibración.',
    purchases: [
      { id: 'p7', date: '2025-12-15', items: 'Monitor LG 27" 4K', total: 520000 },
      { id: 'p8', date: '2025-08-20', items: 'Teclado mecánico', total: 85000 },
    ]
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
    purchases: [
      { id: 'p9', date: '2025-12-18', items: '5x PC Armadas Gamer', total: 6500000 },
      { id: 'p10', date: '2025-12-05', items: '10x Periféricos varios', total: 850000 },
    ]
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
    purchases: [
      { id: 'p11', date: '2025-06-10', items: 'Fuente 650W', total: 120000 },
      { id: 'p12', date: '2025-03-15', items: 'Gabinete RGB', total: 200000 },
    ]
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
    notes: 'Principalmente equipos Apple y periféricos premium.',
    purchases: [
      { id: 'p13', date: '2025-12-19', items: 'MacBook Pro M3', total: 3200000 },
      { id: 'p14', date: '2025-10-01', items: 'Magic Keyboard + Mouse', total: 450000 },
    ]
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
    purchases: [
      { id: 'p15', date: '2025-12-26', items: 'RAM DDR5 16GB', total: 185000 },
    ]
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
    lastPurchase: '2025-12-24',
    createdAt: '2022-11-20',
    tags: ['Mayorista', 'VIP', 'Crédito'],
    company: 'Distribuidora Norte SA',
    address: 'Parque Industrial, Nave 12',
    notes: 'Cliente VIP. Crédito 30 días aprobado. Contacto: Sergio (Gerente).',
    purchases: [
      { id: 'p16', date: '2025-12-24', items: '50x Combos varios', total: 12500000 },
      { id: 'p17', date: '2025-12-15', items: '30x Monitores 24"', total: 6000000 },
      { id: 'p18', date: '2025-12-01', items: '100x Periféricos', total: 3500000 },
    ]
  },
];

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

const sortOptions = [
  { value: 'name', label: 'Nombre A-Z' },
  { value: 'recent', label: 'Más recientes' },
  { value: 'spent', label: 'Mayor facturación' },
  { value: 'purchases', label: 'Más compras' },
];

const AVAILABLE_TAGS = ['Gamer', 'Frecuente', 'Mayorista', 'Premium', 'VIP', 'Crédito', 'Diseño', 'Mac', 'Reventa', 'Nuevo', 'Corporativo'];

export const ClientesView: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<CustomerType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'retail' as CustomerType,
    company: '',
    address: '',
    notes: '',
    tags: [] as string[],
  });

  const filteredCustomers = customers
    .filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            customer.phone.includes(searchTerm) ||
                            customer.company?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || customer.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'spent':
          return b.totalSpent - a.totalSpent;
        case 'purchases':
          return b.totalPurchases - a.totalPurchases;
        default:
          return 0;
      }
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

  const openNewCustomerModal = () => {
    setEditingCustomer(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      type: 'retail',
      company: '',
      address: '',
      notes: '',
      tags: [],
    });
    setShowModal(true);
  };

  const openEditCustomerModal = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      type: customer.type,
      company: customer.company || '',
      address: customer.address || '',
      notes: customer.notes || '',
      tags: customer.tags,
    });
    setShowModal(true);
  };

  const handleSaveCustomer = () => {
    if (!formData.name || !formData.email || !formData.phone) return;

    if (editingCustomer) {
      // Update existing
      setCustomers(prev => prev.map(c => 
        c.id === editingCustomer.id 
          ? { ...c, ...formData }
          : c
      ));
      if (selectedCustomer?.id === editingCustomer.id) {
        setSelectedCustomer({ ...selectedCustomer, ...formData });
      }
    } else {
      // Create new
      const newCustomer: Customer = {
        id: String(Date.now()),
        ...formData,
        status: 'new',
        totalPurchases: 0,
        totalSpent: 0,
        lastPurchase: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString().split('T')[0],
        purchases: [],
      };
      setCustomers(prev => [newCustomer, ...prev]);
    }
    setShowModal(false);
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
    if (selectedCustomer?.id === id) {
      setSelectedCustomer(null);
    }
    setShowDeleteConfirm(null);
  };

  const handleAddTag = (tag: string) => {
    if (selectedCustomer && !selectedCustomer.tags.includes(tag)) {
      const updatedTags = [...selectedCustomer.tags, tag];
      setCustomers(prev => prev.map(c => 
        c.id === selectedCustomer.id ? { ...c, tags: updatedTags } : c
      ));
      setSelectedCustomer({ ...selectedCustomer, tags: updatedTags });
    }
    setShowTagPicker(false);
  };

  const handleRemoveTag = (tag: string) => {
    if (selectedCustomer) {
      const updatedTags = selectedCustomer.tags.filter(t => t !== tag);
      setCustomers(prev => prev.map(c => 
        c.id === selectedCustomer.id ? { ...c, tags: updatedTags } : c
      ));
      setSelectedCustomer({ ...selectedCustomer, tags: updatedTags });
    }
  };

  const handleWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

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
          <button 
            onClick={openNewCustomerModal}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
          >
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

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ArrowUpDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
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
              <button 
                onClick={() => setShowMoreFilters(!showMoreFilters)}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <Filter size={14} />
                Más filtros
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedCustomer?.id === customer.id ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {customer.name.charAt(0)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
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
                      <div className="flex items-center gap-1 mt-2 flex-wrap">
                        {customer.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right flex-shrink-0">
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
            <div className="p-6 max-h-[700px] overflow-y-auto">
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
                <button 
                  onClick={() => handleWhatsApp(selectedCustomer.phone)}
                  className="flex flex-col items-center gap-1 p-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors"
                >
                  <MessageCircle size={20} />
                  <span className="text-xs font-medium">WhatsApp</span>
                </button>
                <button 
                  onClick={() => handleEmail(selectedCustomer.email)}
                  className="flex flex-col items-center gap-1 p-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors"
                >
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

              {/* Notes */}
              {selectedCustomer.notes && (
                <div className="mb-6 p-3 bg-amber-50 rounded-xl border border-amber-100">
                  <p className="text-xs text-amber-600 font-medium mb-1 flex items-center gap-1">
                    <FileText size={12} />
                    Notas
                  </p>
                  <p className="text-sm text-amber-800">{selectedCustomer.notes}</p>
                </div>
              )}

              {/* Purchase History */}
              {selectedCustomer.purchases && selectedCustomer.purchases.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                    <ShoppingBag size={12} />
                    Últimas compras
                  </p>
                  <div className="space-y-2">
                    {selectedCustomer.purchases.slice(0, 3).map((purchase) => (
                      <div key={purchase.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{purchase.items}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(purchase.date).toLocaleDateString('es-AR')}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{formatCurrency(purchase.total)}</p>
                      </div>
                    ))}
                  </div>
                  {selectedCustomer.purchases.length > 3 && (
                    <button className="w-full mt-2 text-xs text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1">
                      Ver todas ({selectedCustomer.purchases.length})
                      <ExternalLink size={12} />
                    </button>
                  )}
                </div>
              )}

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
              <div className="mb-6 relative">
                <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                  <Tag size={12} />
                  Etiquetas
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedCustomer.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full flex items-center gap-1 group"
                    >
                      {tag}
                      <button 
                        onClick={() => handleRemoveTag(tag)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} className="text-gray-400 hover:text-gray-600" />
                      </button>
                    </span>
                  ))}
                  <button 
                    onClick={() => setShowTagPicker(!showTagPicker)}
                    className="text-sm bg-gray-100 text-gray-500 px-3 py-1 rounded-full hover:bg-gray-200 flex items-center gap-1"
                  >
                    <Plus size={12} />
                    Agregar
                  </button>
                </div>
                
                {/* Tag Picker */}
                {showTagPicker && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-2">
                    <div className="flex flex-wrap gap-1">
                      {AVAILABLE_TAGS.filter(t => !selectedCustomer.tags.includes(t)).map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleAddTag(tag)}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button 
                  onClick={() => openEditCustomerModal(selectedCustomer)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  <Edit3 size={16} />
                  Editar
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(selectedCustomer.id)}
                  className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
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

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingCustomer ? 'Editar Cliente' : 'Nuevo Cliente'}
                </h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Juan Pérez"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="juan@email.com"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+54 11 1234-5678"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de cliente
                </label>
                <div className="flex gap-2">
                  {(['retail', 'wholesale', 'business'] as CustomerType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, type })}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-colors ${
                        formData.type === type 
                          ? 'border-gray-900 bg-gray-900 text-white' 
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {typeConfig[type].icon}
                      <span className="text-sm font-medium">{typeConfig[type].label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Empresa (opcional)
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Nombre de la empresa"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección (opcional)
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Av. Corrientes 1234, CABA"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas (opcional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Información adicional sobre el cliente..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveCustomer}
                disabled={!formData.name || !formData.email || !formData.phone}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check size={18} />
                {editingCustomer ? 'Guardar Cambios' : 'Crear Cliente'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Eliminar cliente</h3>
                <p className="text-sm text-gray-500">Esta acción no se puede deshacer</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que querés eliminar este cliente? Se perderá toda la información asociada.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteCustomer(showDeleteConfirm)}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
