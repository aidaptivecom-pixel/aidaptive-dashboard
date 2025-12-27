import React, { useState } from 'react';
import { 
  Search, 
  Package, 
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Filter,
  Download,
  RefreshCw,
  ChevronDown,
  MoreVertical,
  Edit,
  ScanLine,
  Building2,
  Tag,
  DollarSign,
  Boxes,
  ArrowUpDown,
  Eye,
  History
} from 'lucide-react';

// Types based on DUX API structure
interface Deposito {
  id: string;
  nombre: string;
  stock: number;
}

interface Product {
  id: string;
  codigo: string;
  codigo_barras?: string;
  nombre: string;
  rubro: string;
  subrubro: string;
  marca: string;
  proveedor: string;
  costo: number;
  precio_venta: number;
  stock_total: number;
  stock_minimo: number;
  stock_por_deposito: Deposito[];
  unidad: string;
  acepta_stock_negativo: boolean;
  ultima_compra?: string;
  ultima_venta?: string;
  imagen?: string;
}

interface StockMovement {
  id: string;
  producto_id: string;
  tipo: 'entrada' | 'salida' | 'ajuste' | 'transferencia';
  cantidad: number;
  deposito_origen?: string;
  deposito_destino?: string;
  motivo: string;
  fecha: string;
  usuario: string;
}

// Mock data based on DUX structure - Tech products
const MOCK_DEPOSITOS = [
  { id: 'dep-1', nombre: 'Depósito Principal' },
  { id: 'dep-2', nombre: 'Showroom' },
  { id: 'dep-3', nombre: 'Servicio Técnico' }
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    codigo: 'GPU-4060-MSI',
    codigo_barras: '7790001234567',
    nombre: 'RTX 4060 8GB GDDR6 MSI Ventus',
    rubro: 'Placas de Video',
    subrubro: 'NVIDIA GeForce',
    marca: 'MSI',
    proveedor: 'Unicom',
    costo: 145000,
    precio_venta: 185000,
    stock_total: 8,
    stock_minimo: 3,
    stock_por_deposito: [
      { id: 'dep-1', nombre: 'Depósito Principal', stock: 5 },
      { id: 'dep-2', nombre: 'Showroom', stock: 2 },
      { id: 'dep-3', nombre: 'Servicio Técnico', stock: 1 }
    ],
    unidad: 'Unidad',
    acepta_stock_negativo: false,
    ultima_compra: '2024-12-20',
    ultima_venta: '2024-12-26'
  },
  {
    id: 'prod-002',
    codigo: 'SSD-SAM-1TB',
    codigo_barras: '7790001234568',
    nombre: 'SSD NVMe 1TB Samsung 980 Pro',
    rubro: 'Almacenamiento',
    subrubro: 'SSD NVMe',
    marca: 'Samsung',
    proveedor: 'Air Computers',
    costo: 22000,
    precio_venta: 28000,
    stock_total: 15,
    stock_minimo: 5,
    stock_por_deposito: [
      { id: 'dep-1', nombre: 'Depósito Principal', stock: 12 },
      { id: 'dep-2', nombre: 'Showroom', stock: 3 },
      { id: 'dep-3', nombre: 'Servicio Técnico', stock: 0 }
    ],
    unidad: 'Unidad',
    acepta_stock_negativo: false,
    ultima_compra: '2024-12-18',
    ultima_venta: '2024-12-27'
  },
  {
    id: 'prod-003',
    codigo: 'RAM-KNG-16',
    codigo_barras: '7790001234569',
    nombre: 'RAM DDR5 16GB Kingston Fury 5600MHz',
    rubro: 'Memorias',
    subrubro: 'DDR5',
    marca: 'Kingston',
    proveedor: 'Unicom',
    costo: 13500,
    precio_venta: 17000,
    stock_total: 2,
    stock_minimo: 5,
    stock_por_deposito: [
      { id: 'dep-1', nombre: 'Depósito Principal', stock: 2 },
      { id: 'dep-2', nombre: 'Showroom', stock: 0 },
      { id: 'dep-3', nombre: 'Servicio Técnico', stock: 0 }
    ],
    unidad: 'Unidad',
    acepta_stock_negativo: false,
    ultima_compra: '2024-12-10',
    ultima_venta: '2024-12-25'
  },
  {
    id: 'prod-004',
    codigo: 'MON-LG27-4K',
    codigo_barras: '7790001234570',
    nombre: 'Monitor LG 27" 4K IPS 27UP850-W',
    rubro: 'Monitores',
    subrubro: '4K UHD',
    marca: 'LG',
    proveedor: 'Elit',
    costo: 142000,
    precio_venta: 180000,
    stock_total: 4,
    stock_minimo: 2,
    stock_por_deposito: [
      { id: 'dep-1', nombre: 'Depósito Principal', stock: 2 },
      { id: 'dep-2', nombre: 'Showroom', stock: 2 },
      { id: 'dep-3', nombre: 'Servicio Técnico', stock: 0 }
    ],
    unidad: 'Unidad',
    acepta_stock_negativo: false,
    ultima_compra: '2024-12-15',
    ultima_venta: '2024-12-26'
  },
  {
    id: 'prod-005',
    codigo: 'PSU-COR-750',
    codigo_barras: '7790001234571',
    nombre: 'Fuente Corsair RM750 750W 80+ Gold',
    rubro: 'Fuentes',
    subrubro: 'Modulares',
    marca: 'Corsair',
    proveedor: 'Grupo Núcleo',
    costo: 58000,
    precio_venta: 75000,
    stock_total: 0,
    stock_minimo: 3,
    stock_por_deposito: [
      { id: 'dep-1', nombre: 'Depósito Principal', stock: 0 },
      { id: 'dep-2', nombre: 'Showroom', stock: 0 },
      { id: 'dep-3', nombre: 'Servicio Técnico', stock: 0 }
    ],
    unidad: 'Unidad',
    acepta_stock_negativo: false,
    ultima_compra: '2024-11-28',
    ultima_venta: '2024-12-24'
  },
  {
    id: 'prod-006',
    codigo: 'TEC-LOG-MX',
    codigo_barras: '7790001234572',
    nombre: 'Teclado Logitech MX Keys Español',
    rubro: 'Periféricos',
    subrubro: 'Teclados',
    marca: 'Logitech',
    proveedor: 'Elit',
    costo: 35000,
    precio_venta: 45000,
    stock_total: 6,
    stock_minimo: 3,
    stock_por_deposito: [
      { id: 'dep-1', nombre: 'Depósito Principal', stock: 4 },
      { id: 'dep-2', nombre: 'Showroom', stock: 2 },
      { id: 'dep-3', nombre: 'Servicio Técnico', stock: 0 }
    ],
    unidad: 'Unidad',
    acepta_stock_negativo: false,
    ultima_compra: '2024-12-05',
    ultima_venta: '2024-12-26'
  },
  {
    id: 'prod-007',
    codigo: 'MOU-LOG-MX3',
    codigo_barras: '7790001234573',
    nombre: 'Mouse Logitech MX Master 3S Grafito',
    rubro: 'Periféricos',
    subrubro: 'Mouses',
    marca: 'Logitech',
    proveedor: 'Elit',
    costo: 28000,
    precio_venta: 35000,
    stock_total: 3,
    stock_minimo: 4,
    stock_por_deposito: [
      { id: 'dep-1', nombre: 'Depósito Principal', stock: 2 },
      { id: 'dep-2', nombre: 'Showroom', stock: 1 },
      { id: 'dep-3', nombre: 'Servicio Técnico', stock: 0 }
    ],
    unidad: 'Unidad',
    acepta_stock_negativo: false,
    ultima_compra: '2024-12-08',
    ultima_venta: '2024-12-27'
  },
  {
    id: 'prod-008',
    codigo: 'GAB-NZXT-510',
    codigo_barras: '7790001234574',
    nombre: 'Gabinete NZXT H510 Negro Mate',
    rubro: 'Gabinetes',
    subrubro: 'Mid Tower',
    marca: 'NZXT',
    proveedor: 'Grupo Núcleo',
    costo: 38000,
    precio_venta: 50000,
    stock_total: 5,
    stock_minimo: 2,
    stock_por_deposito: [
      { id: 'dep-1', nombre: 'Depósito Principal', stock: 4 },
      { id: 'dep-2', nombre: 'Showroom', stock: 1 },
      { id: 'dep-3', nombre: 'Servicio Técnico', stock: 0 }
    ],
    unidad: 'Unidad',
    acepta_stock_negativo: false,
    ultima_compra: '2024-12-12',
    ultima_venta: '2024-12-26'
  },
  {
    id: 'prod-009',
    codigo: 'CAB-HDMI-3M',
    codigo_barras: '7790001234575',
    nombre: 'Cable HDMI 2.1 3m 8K 60Hz',
    rubro: 'Cables',
    subrubro: 'HDMI',
    marca: 'Ugreen',
    proveedor: 'Air Computers',
    costo: 3200,
    precio_venta: 4250,
    stock_total: 25,
    stock_minimo: 10,
    stock_por_deposito: [
      { id: 'dep-1', nombre: 'Depósito Principal', stock: 20 },
      { id: 'dep-2', nombre: 'Showroom', stock: 5 },
      { id: 'dep-3', nombre: 'Servicio Técnico', stock: 0 }
    ],
    unidad: 'Unidad',
    acepta_stock_negativo: false,
    ultima_compra: '2024-12-01',
    ultima_venta: '2024-12-26'
  },
  {
    id: 'prod-010',
    codigo: 'CPU-AMD-5600',
    codigo_barras: '7790001234576',
    nombre: 'Procesador AMD Ryzen 5 5600X',
    rubro: 'Procesadores',
    subrubro: 'AMD Ryzen',
    marca: 'AMD',
    proveedor: 'Unicom',
    costo: 95000,
    precio_venta: 125000,
    stock_total: 1,
    stock_minimo: 2,
    stock_por_deposito: [
      { id: 'dep-1', nombre: 'Depósito Principal', stock: 1 },
      { id: 'dep-2', nombre: 'Showroom', stock: 0 },
      { id: 'dep-3', nombre: 'Servicio Técnico', stock: 0 }
    ],
    unidad: 'Unidad',
    acepta_stock_negativo: false,
    ultima_compra: '2024-12-02',
    ultima_venta: '2024-12-23'
  }
];

const MOCK_MOVEMENTS: StockMovement[] = [
  { id: 'mov-1', producto_id: 'prod-002', tipo: 'salida', cantidad: 1, deposito_origen: 'Depósito Principal', motivo: 'Venta #1546', fecha: '2024-12-27T09:15:00', usuario: 'Sistema' },
  { id: 'mov-2', producto_id: 'prod-007', tipo: 'salida', cantidad: 2, deposito_origen: 'Depósito Principal', motivo: 'Venta #1545', fecha: '2024-12-26T18:45:00', usuario: 'Sistema' },
  { id: 'mov-3', producto_id: 'prod-001', tipo: 'entrada', cantidad: 5, deposito_destino: 'Depósito Principal', motivo: 'Compra FC-A 0001-00045678', fecha: '2024-12-20T14:30:00', usuario: 'Admin' },
  { id: 'mov-4', producto_id: 'prod-005', tipo: 'salida', cantidad: 3, deposito_origen: 'Depósito Principal', motivo: 'Venta #1540', fecha: '2024-12-24T11:20:00', usuario: 'Sistema' },
  { id: 'mov-5', producto_id: 'prod-003', tipo: 'transferencia', cantidad: 2, deposito_origen: 'Showroom', deposito_destino: 'Depósito Principal', motivo: 'Reubicación stock', fecha: '2024-12-22T16:00:00', usuario: 'Admin' },
];

type StockFilter = 'all' | 'low' | 'out' | 'ok';
type SortField = 'nombre' | 'stock_total' | 'precio_venta' | 'costo';
type SortOrder = 'asc' | 'desc';

export const InventarioView: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [stockFilter, setStockFilter] = useState<StockFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeposito, setSelectedDeposito] = useState<string>('all');
  const [selectedRubro, setSelectedRubro] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('nombre');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'stock' | 'movimientos'>('stock');

  // Get unique rubros
  const rubros = [...new Set(MOCK_PRODUCTS.map(p => p.rubro))];

  // Filter and sort products
  const filteredProducts = MOCK_PRODUCTS
    .filter(product => {
      // Search filter
      const matchesSearch = 
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.marca.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Stock filter
      let matchesStock = true;
      if (stockFilter === 'out') matchesStock = product.stock_total === 0;
      else if (stockFilter === 'low') matchesStock = product.stock_total > 0 && product.stock_total < product.stock_minimo;
      else if (stockFilter === 'ok') matchesStock = product.stock_total >= product.stock_minimo;
      
      // Rubro filter
      const matchesRubro = selectedRubro === 'all' || product.rubro === selectedRubro;
      
      // Deposito filter (check if has stock in selected deposito)
      const matchesDeposito = selectedDeposito === 'all' || 
        product.stock_por_deposito.some(d => d.id === selectedDeposito && d.stock > 0);
      
      return matchesSearch && matchesStock && matchesRubro && matchesDeposito;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === 'nombre') comparison = a.nombre.localeCompare(b.nombre);
      else if (sortField === 'stock_total') comparison = a.stock_total - b.stock_total;
      else if (sortField === 'precio_venta') comparison = a.precio_venta - b.precio_venta;
      else if (sortField === 'costo') comparison = a.costo - b.costo;
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-AR', { 
      day: '2-digit', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStockStatus = (product: Product) => {
    if (product.stock_total === 0) return { label: 'Sin stock', color: 'bg-red-100 text-red-700', icon: AlertTriangle };
    if (product.stock_total < product.stock_minimo) return { label: 'Stock bajo', color: 'bg-amber-100 text-amber-700', icon: TrendingDown };
    return { label: 'OK', color: 'bg-green-100 text-green-700', icon: TrendingUp };
  };

  const getMargin = (product: Product) => {
    const margin = ((product.precio_venta - product.costo) / product.costo) * 100;
    return margin.toFixed(1);
  };

  // Stats
  const stats = {
    total: MOCK_PRODUCTS.length,
    sinStock: MOCK_PRODUCTS.filter(p => p.stock_total === 0).length,
    stockBajo: MOCK_PRODUCTS.filter(p => p.stock_total > 0 && p.stock_total < p.stock_minimo).length,
    valorizado: MOCK_PRODUCTS.reduce((acc, p) => acc + (p.costo * p.stock_total), 0)
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventario</h1>
          <p className="text-sm text-gray-500 mt-1">Sincronizado con DUX • Última actualización: hace 5 min</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Download size={18} />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <RefreshCw size={18} />
            Sincronizar
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <button 
          onClick={() => setStockFilter('all')}
          className={`p-4 rounded-xl border transition-all ${
            stockFilter === 'all' ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Boxes size={20} className="text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Productos</p>
            </div>
          </div>
        </button>
        <button 
          onClick={() => setStockFilter('out')}
          className={`p-4 rounded-xl border transition-all ${
            stockFilter === 'out' ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-900">{stats.sinStock}</p>
              <p className="text-sm text-gray-500">Sin stock</p>
            </div>
          </div>
        </button>
        <button 
          onClick={() => setStockFilter('low')}
          className={`p-4 rounded-xl border transition-all ${
            stockFilter === 'low' ? 'border-amber-300 bg-amber-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <TrendingDown size={20} className="text-amber-600" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-900">{stats.stockBajo}</p>
              <p className="text-sm text-gray-500">Stock bajo</p>
            </div>
          </div>
        </button>
        <div className="p-4 rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.valorizado)}</p>
              <p className="text-sm text-gray-500">Valorizado (costo)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('stock')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'stock' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Stock actual
        </button>
        <button
          onClick={() => setActiveTab('movimientos')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'movimientos' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Movimientos
        </button>
      </div>

      {activeTab === 'stock' ? (
        <div className="flex gap-6">
          {/* Products Table */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* Search & Filters */}
            <div className="p-4 border-b border-gray-100 space-y-3">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Buscar por nombre, código o marca..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
                    showFilters ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Filter size={16} />
                  Filtros
                  <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {showFilters && (
                <div className="flex gap-3 pt-2">
                  <select
                    value={selectedDeposito}
                    onChange={(e) => setSelectedDeposito(e.target.value)}
                    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="all">Todos los depósitos</option>
                    {MOCK_DEPOSITOS.map(dep => (
                      <option key={dep.id} value={dep.id}>{dep.nombre}</option>
                    ))}
                  </select>
                  <select
                    value={selectedRubro}
                    onChange={(e) => setSelectedRubro(e.target.value)}
                    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="all">Todos los rubros</option>
                    {rubros.map(rubro => (
                      <option key={rubro} value={rubro}>{rubro}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th 
                      className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('stock_total')}
                    >
                      <div className="flex items-center justify-center gap-1">
                        Stock
                        <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th 
                      className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('costo')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Costo
                        <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th 
                      className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                      onClick={() => handleSort('precio_venta')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Precio
                        <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Margen
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((product) => {
                    const status = getStockStatus(product);
                    const StatusIcon = status.icon;
                    
                    return (
                      <tr 
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        className={`cursor-pointer transition-colors ${
                          selectedProduct?.id === product.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Package size={18} className="text-gray-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{product.nombre}</p>
                              <p className="text-xs text-gray-500">{product.codigo} • {product.marca}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-bold ${product.stock_total === 0 ? 'text-red-600' : product.stock_total < product.stock_minimo ? 'text-amber-600' : 'text-gray-900'}`}>
                            {product.stock_total}
                          </span>
                          <span className="text-gray-400 text-sm"> / {product.stock_minimo}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                            <StatusIcon size={12} />
                            {status.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-600">
                          {formatCurrency(product.costo)}
                        </td>
                        <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                          {formatCurrency(product.precio_venta)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-sm font-medium text-green-600">
                            {getMargin(product)}%
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical size={16} className="text-gray-400" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-100 text-sm text-gray-500">
              Mostrando {filteredProducts.length} de {MOCK_PRODUCTS.length} productos
            </div>
          </div>

          {/* Product Detail Sidebar */}
          {selectedProduct && (
            <div className="w-[380px] flex-shrink-0 bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedProduct.nombre}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{selectedProduct.codigo}</p>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit size={16} className="text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 450px)' }}>
                {/* Info básica */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Tag size={14} className="text-gray-400" />
                    <span className="text-gray-500">Rubro:</span>
                    <span className="text-gray-900">{selectedProduct.rubro} / {selectedProduct.subrubro}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 size={14} className="text-gray-400" />
                    <span className="text-gray-500">Proveedor:</span>
                    <span className="text-gray-900">{selectedProduct.proveedor}</span>
                  </div>
                  {selectedProduct.codigo_barras && (
                    <div className="flex items-center gap-2 text-sm">
                      <ScanLine size={14} className="text-gray-400" />
                      <span className="text-gray-500">Código barras:</span>
                      <span className="text-gray-900 font-mono">{selectedProduct.codigo_barras}</span>
                    </div>
                  )}
                </div>

                {/* Precios */}
                <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Precios</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Costo</span>
                    <span className="text-gray-900">{formatCurrency(selectedProduct.costo)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Precio venta</span>
                    <span className="font-medium text-gray-900">{formatCurrency(selectedProduct.precio_venta)}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Margen</span>
                    <span className="font-medium text-green-600">{getMargin(selectedProduct)}%</span>
                  </div>
                </div>

                {/* Stock por depósito */}
                <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock por depósito</h4>
                    <span className={`text-sm font-bold ${selectedProduct.stock_total === 0 ? 'text-red-600' : selectedProduct.stock_total < selectedProduct.stock_minimo ? 'text-amber-600' : 'text-green-600'}`}>
                      Total: {selectedProduct.stock_total}
                    </span>
                  </div>
                  {selectedProduct.stock_por_deposito.map(dep => (
                    <div key={dep.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{dep.nombre}</span>
                      <span className={`font-medium ${dep.stock === 0 ? 'text-gray-400' : 'text-gray-900'}`}>
                        {dep.stock}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Stock mínimo</span>
                    <span className="text-gray-900">{selectedProduct.stock_minimo}</span>
                  </div>
                </div>

                {/* Actividad */}
                <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Última actividad</h4>
                  {selectedProduct.ultima_compra && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Última compra</span>
                      <span className="text-gray-900">{new Date(selectedProduct.ultima_compra).toLocaleDateString('es-AR')}</span>
                    </div>
                  )}
                  {selectedProduct.ultima_venta && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Última venta</span>
                      <span className="text-gray-900">{new Date(selectedProduct.ultima_venta).toLocaleDateString('es-AR')}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors text-sm">
                    Ver en DUX
                  </button>
                  <button className="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm flex items-center justify-center gap-2">
                    <History size={16} />
                    Ver movimientos
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Movimientos Tab */
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Buscar movimientos..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                <option value="all">Todos los tipos</option>
                <option value="entrada">Entradas</option>
                <option value="salida">Salidas</option>
                <option value="ajuste">Ajustes</option>
                <option value="transferencia">Transferencias</option>
              </select>
            </div>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cantidad</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Depósito</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Motivo</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Usuario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_MOVEMENTS.map((mov) => {
                const product = MOCK_PRODUCTS.find(p => p.id === mov.producto_id);
                const tipoConfig = {
                  entrada: { label: 'Entrada', color: 'bg-green-100 text-green-700' },
                  salida: { label: 'Salida', color: 'bg-red-100 text-red-700' },
                  ajuste: { label: 'Ajuste', color: 'bg-blue-100 text-blue-700' },
                  transferencia: { label: 'Transferencia', color: 'bg-purple-100 text-purple-700' }
                }[mov.tipo];

                return (
                  <tr key={mov.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">{formatDate(mov.fecha)}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">{product?.nombre || 'Producto eliminado'}</p>
                      <p className="text-xs text-gray-500">{product?.codigo}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${tipoConfig.color}`}>
                        {tipoConfig.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-bold ${mov.tipo === 'entrada' ? 'text-green-600' : mov.tipo === 'salida' ? 'text-red-600' : 'text-gray-900'}`}>
                        {mov.tipo === 'entrada' ? '+' : mov.tipo === 'salida' ? '-' : ''}{mov.cantidad}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {mov.tipo === 'transferencia' 
                        ? `${mov.deposito_origen} → ${mov.deposito_destino}`
                        : mov.deposito_origen || mov.deposito_destino
                      }
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{mov.motivo}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{mov.usuario}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
