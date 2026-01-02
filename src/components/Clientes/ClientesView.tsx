import React, { useState, useEffect } from 'react';
import { 
  Search,
  MoreVertical,
  Mail,
  Phone,
  MessageCircle,
  Calendar,
  Wrench,
  ChevronDown,
  Edit3,
  Download,
  Users,
  UserPlus,
  User,
  X,
  RefreshCw,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

// Configuración del endpoint - cambiar según ambiente
const API_BASE_URL = 'https://webhook.igreen.com.ar/webhook';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalTurnos: number;
  totalReparaciones: number;
  status: string;
}

interface ApiResponse {
  success: boolean;
  count: number;
  data: Customer[];
}

type SortOption = 'name' | 'recent' | 'turnos' | 'reparaciones';

const sortOptions = [
  { value: 'name', label: 'Nombre A-Z' },
  { value: 'recent', label: 'Más recientes' },
  { value: 'turnos', label: 'Más turnos' },
  { value: 'reparaciones', label: 'Más reparaciones' },
];

export const ClientesView: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Fetch customers from n8n API
  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/clientes`);
      if (!response.ok) throw new Error('Error al cargar clientes');
      const data: ApiResponse = await response.json();
      if (data.success) {
        setCustomers(data.data);
      } else {
        throw new Error('Respuesta inválida del servidor');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      // Cargar datos de prueba si falla la API
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers
    .filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'turnos':
          return b.totalTurnos - a.totalTurnos;
        case 'reparaciones':
          return b.totalReparaciones - a.totalReparaciones;
        default:
          return 0;
      }
    });

  const totalCustomers = customers.length;
  const customersWithTurnos = customers.filter(c => c.totalTurnos > 0).length;
  const customersWithReparaciones = customers.filter(c => c.totalReparaciones > 0).length;
  const totalInteractions = customers.reduce((acc, c) => acc + c.totalTurnos + c.totalReparaciones, 0);

  const handleWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  const handleEmail = (email: string) => {
    if (email) {
      window.open(`mailto:${email}`, '_blank');
    }
  };

  const openInAirtable = (id: string) => {
    window.open(`https://airtable.com/appPejgwU9juuHrTD/tbldW5lV4pyOVwInO/${id}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes iGreen</h1>
          <p className="text-sm text-gray-500">Base de datos de clientes del servicio técnico</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchCustomers}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Actualizar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
            <Download size={16} />
            Exportar
          </button>
          <a 
            href="https://airtable.com/appPejgwU9juuHrTD/tbldW5lV4pyOVwInO"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            <ExternalLink size={16} />
            Abrir en Airtable
          </a>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-800">Error al cargar datos</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
          <button 
            onClick={fetchCustomers}
            className="ml-auto px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Total Clientes</span>
            <Users size={16} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
          <p className="text-xs text-gray-500">registrados en el sistema</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Con Turnos</span>
            <Calendar size={16} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{customersWithTurnos}</p>
          <p className="text-xs text-gray-500">{Math.round((customersWithTurnos / totalCustomers) * 100) || 0}% del total</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Con Reparaciones</span>
            <Wrench size={16} className="text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{customersWithReparaciones}</p>
          <p className="text-xs text-gray-500">{Math.round((customersWithReparaciones / totalCustomers) * 100) || 0}% del total</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Total Interacciones</span>
            <MessageCircle size={16} className="text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalInteractions}</p>
          <p className="text-xs text-gray-500">turnos + reparaciones</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, teléfono o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
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
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <p className="text-sm text-gray-500">
              {loading ? 'Cargando...' : `${filteredCustomers.length} clientes encontrados`}
            </p>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <RefreshCw size={24} className="animate-spin text-gray-400" />
            </div>
          ) : (
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
                    <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {customer.name.charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Phone size={12} />
                          {customer.phone || 'Sin teléfono'}
                        </span>
                        {customer.email && (
                          <span className="flex items-center gap-1">
                            <Mail size={12} />
                            {customer.email}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="flex items-center gap-1 text-green-600">
                          <Calendar size={14} />
                          {customer.totalTurnos}
                        </span>
                        <span className="flex items-center gap-1 text-purple-600">
                          <Wrench size={14} />
                          {customer.totalReparaciones}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredCustomers.length === 0 && !loading && (
                <div className="py-16 text-center">
                  <User size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No se encontraron clientes</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Customer Detail Panel */}
        <div className="bg-white rounded-xl border border-gray-100">
          {selectedCustomer ? (
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {selectedCustomer.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedCustomer.name}</h2>
                    <p className="text-sm text-gray-500">ID: {selectedCustomer.id.slice(0, 10)}...</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCustomer(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={18} className="text-gray-500" />
                </button>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-gray-700">{selectedCustomer.phone || 'Sin teléfono'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-gray-700">{selectedCustomer.email || 'Sin email'}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <button 
                  onClick={() => handleWhatsApp(selectedCustomer.phone)}
                  disabled={!selectedCustomer.phone}
                  className="flex flex-col items-center gap-1 p-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors disabled:opacity-50"
                >
                  <MessageCircle size={20} />
                  <span className="text-xs font-medium">WhatsApp</span>
                </button>
                <button 
                  onClick={() => handleEmail(selectedCustomer.email)}
                  disabled={!selectedCustomer.email}
                  className="flex flex-col items-center gap-1 p-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors disabled:opacity-50"
                >
                  <Mail size={20} />
                  <span className="text-xs font-medium">Email</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-green-700">{selectedCustomer.totalTurnos}</p>
                  <p className="text-xs text-green-600">Turnos</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-purple-700">{selectedCustomer.totalReparaciones}</p>
                  <p className="text-xs text-purple-600">Reparaciones</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button 
                  onClick={() => openInAirtable(selectedCustomer.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  <ExternalLink size={16} />
                  Ver en Airtable
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
