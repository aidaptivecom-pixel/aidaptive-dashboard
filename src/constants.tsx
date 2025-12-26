import { LayoutDashboard, MessageSquare, Calendar, Wrench, ShoppingBag, Users, Settings, HelpCircle, BarChart3, Megaphone, Package, ShoppingCart } from 'lucide-react';

export const DESIGN_TOKENS = {
  colors: {
    primary: '#722F37',
    primaryLight: '#8B3A44',
    background: '#F9FAFB',
    card: '#FFFFFF',
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    border: '#F3F4F6',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    accent: '#E5E7EB',
  },
  radius: {
    card: '16px',
    button: '8px',
    badge: '9999px',
  },
  spacing: {
    pagePadding: '32px',
    cardGap: '24px',
  }
};

export const NAVIGATION_ITEMS = [
  { group: 'PRINCIPAL', items: [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/', active: true },
    { label: 'Conversaciones', icon: <MessageSquare size={18} />, path: '/conversations' },
    { label: 'Turnos', icon: <Calendar size={18} />, path: '/appointments' },
  ]},
  { group: 'OPERACIONES', items: [
    { label: 'Ventas', icon: <ShoppingCart size={18} />, path: '/sales' },
    { label: 'Posventa', icon: <Package size={18} />, path: '/posventa' },
    { label: 'Servicio Técnico', icon: <Wrench size={18} />, path: '/repairs' },
  ]},
  { group: 'MARKETING', items: [
    { label: 'Contenido', icon: <Megaphone size={18} />, path: '/marketing' },
    { label: 'Analytics', icon: <BarChart3 size={18} />, path: '/analytics' },
  ]},
  { group: 'CONFIGURACIÓN', items: [
    { label: 'Clientes', icon: <Users size={18} />, path: '/clients' },
    { label: 'Ajustes', icon: <Settings size={18} />, path: '/settings' },
  ]}
];

export const BOTTOM_NAV = [
  { label: 'Soporte', icon: <HelpCircle size={18} />, path: '/support' }
];
