import React, { useState } from 'react';
import {
  Settings,
  User,
  Building2,
  Bell,
  CreditCard,
  Shield,
  Palette,
  Globe,
  MessageCircle,
  Link2,
  Camera,
  Mail,
  Phone,
  MapPin,
  Clock,
  Check,
  ChevronRight,
  Smartphone,
  Zap,
  Users,
  Key,
  LogOut,
  Trash2,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Copy,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Plus,
  MoreVertical,
  Crown,
  Sparkles
} from 'lucide-react';

type SettingsTab = 'profile' | 'business' | 'whatsapp' | 'integrations' | 'notifications' | 'team' | 'billing' | 'preferences';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  avatar?: string;
  lastActive: string;
  status: 'active' | 'invited';
}

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
  status?: string;
}

const MOCK_TEAM: TeamMember[] = [
  { id: '1', name: 'Matías Rodriguez', email: 'matias@infopartes.com', role: 'owner', lastActive: 'Ahora', status: 'active' },
  { id: '2', name: 'Carolina López', email: 'carolina@infopartes.com', role: 'admin', lastActive: 'Hace 2h', status: 'active' },
  { id: '3', name: 'Juan Pérez', email: 'juan@infopartes.com', role: 'member', lastActive: 'Hace 1 día', status: 'active' },
  { id: '4', name: 'Ana García', email: 'ana@infopartes.com', role: 'member', lastActive: '-', status: 'invited' },
];

const roleConfig = {
  owner: { label: 'Propietario', color: 'bg-purple-100 text-purple-700', icon: <Crown size={12} /> },
  admin: { label: 'Administrador', color: 'bg-blue-100 text-blue-700', icon: <Shield size={12} /> },
  member: { label: 'Miembro', color: 'bg-gray-100 text-gray-700', icon: <User size={12} /> },
};

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Form states
  const [profileData, setProfileData] = useState({
    name: 'Matías Rodriguez',
    email: 'matias@infopartes.com',
    phone: '+54 11 5555-1234',
    role: 'Gerente General',
  });

  const [businessData, setBusinessData] = useState({
    name: 'InfoPartes',
    legalName: 'InfoPartes SRL',
    cuit: '30-12345678-9',
    address: 'Av. Corrientes 1234, CABA',
    phone: '+54 11 4444-5678',
    email: 'info@infopartes.com',
    website: 'www.infopartes.com',
    timezone: 'America/Argentina/Buenos_Aires',
  });

  const [notifications, setNotifications] = useState({
    emailSales: true,
    emailStock: true,
    emailReports: false,
    whatsappEscalations: true,
    whatsappOrders: true,
    pushAll: true,
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'es',
    currency: 'ARS',
    dateFormat: 'DD/MM/YYYY',
  });

  const integrations: Integration[] = [
    { id: '1', name: 'WhatsApp Business', description: 'Mensajería automatizada', icon: <MessageCircle className="text-green-500" />, connected: true, status: 'Activo - 847 mensajes hoy' },
    { id: '2', name: 'MercadoPago', description: 'Procesamiento de pagos', icon: <CreditCard className="text-blue-500" />, connected: true, status: 'Conectado' },
    { id: '3', name: 'Google Calendar', description: 'Sincronización de turnos', icon: <Clock className="text-red-500" />, connected: true, status: 'Sincronizado' },
    { id: '4', name: 'Tienda Nube', description: 'E-commerce sync', icon: <Globe className="text-purple-500" />, connected: false },
    { id: '5', name: 'Contabilium', description: 'Facturación electrónica', icon: <Building2 className="text-orange-500" />, connected: false },
    { id: '6', name: 'Google Sheets', description: 'Exportación de datos', icon: <Download className="text-green-600" />, connected: true, status: 'Conectado' },
  ];

  const tabs = [
    { id: 'profile' as const, label: 'Mi Perfil', icon: <User size={18} /> },
    { id: 'business' as const, label: 'Negocio', icon: <Building2 size={18} /> },
    { id: 'whatsapp' as const, label: 'WhatsApp', icon: <MessageCircle size={18} /> },
    { id: 'integrations' as const, label: 'Integraciones', icon: <Link2 size={18} /> },
    { id: 'notifications' as const, label: 'Notificaciones', icon: <Bell size={18} /> },
    { id: 'team' as const, label: 'Equipo', icon: <Users size={18} /> },
    { id: 'billing' as const, label: 'Facturación', icon: <CreditCard size={18} /> },
    { id: 'preferences' as const, label: 'Preferencias', icon: <Palette size={18} /> },
  ];

  const handleSave = () => {
    setHasChanges(false);
    // Simulate save
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-xl">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            MR
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50">
            <Camera size={16} className="text-gray-600" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{profileData.name}</h3>
          <p className="text-sm text-gray-500">{profileData.role}</p>
          <p className="text-xs text-gray-400 mt-1">Miembro desde Marzo 2024</p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => { setProfileData({ ...profileData, name: e.target.value }); setHasChanges(true); }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => { setProfileData({ ...profileData, email: e.target.value }); setHasChanges(true); }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => { setProfileData({ ...profileData, phone: e.target.value }); setHasChanges(true); }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
          <input
            type="text"
            value={profileData.role}
            onChange={(e) => { setProfileData({ ...profileData, role: e.target.value }); setHasChanges(true); }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
      </div>

      {/* Security Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Seguridad</h4>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <Key size={18} className="text-gray-500" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Cambiar contraseña</p>
                <p className="text-xs text-gray-500">Última actualización hace 3 meses</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <Smartphone size={18} className="text-gray-500" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Autenticación de dos factores</p>
                <p className="text-xs text-green-600">Activada</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-semibold text-red-600 mb-4">Zona de peligro</h4>
        <button className="flex items-center gap-2 px-4 py-2.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
          <LogOut size={16} />
          <span className="text-sm font-medium">Cerrar sesión en todos los dispositivos</span>
        </button>
      </div>
    </div>
  );

  const renderBusinessTab = () => (
    <div className="space-y-6">
      {/* Logo Section */}
      <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-xl">
        <div className="w-20 h-20 bg-white rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
          <Building2 size={32} className="text-gray-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Logo del negocio</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800">
              Subir logo
            </button>
            <button className="px-3 py-1.5 text-gray-600 text-xs font-medium hover:text-gray-900">
              Eliminar
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">PNG, JPG hasta 2MB. Recomendado: 200x200px</p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nombre comercial</label>
          <input
            type="text"
            value={businessData.name}
            onChange={(e) => { setBusinessData({ ...businessData, name: e.target.value }); setHasChanges(true); }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Razón social</label>
          <input
            type="text"
            value={businessData.legalName}
            onChange={(e) => { setBusinessData({ ...businessData, legalName: e.target.value }); setHasChanges(true); }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CUIT</label>
          <input
            type="text"
            value={businessData.cuit}
            onChange={(e) => { setBusinessData({ ...businessData, cuit: e.target.value }); setHasChanges(true); }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono del negocio</label>
          <input
            type="tel"
            value={businessData.phone}
            onChange={(e) => { setBusinessData({ ...businessData, phone: e.target.value }); setHasChanges(true); }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
          <input
            type="text"
            value={businessData.address}
            onChange={(e) => { setBusinessData({ ...businessData, address: e.target.value }); setHasChanges(true); }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email de contacto</label>
          <input
            type="email"
            value={businessData.email}
            onChange={(e) => { setBusinessData({ ...businessData, email: e.target.value }); setHasChanges(true); }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sitio web</label>
          <input
            type="text"
            value={businessData.website}
            onChange={(e) => { setBusinessData({ ...businessData, website: e.target.value }); setHasChanges(true); }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
      </div>

      {/* Horarios */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Horarios de atención</h4>
        <div className="space-y-3">
          {['Lunes a Viernes', 'Sábados', 'Domingos'].map((day, i) => (
            <div key={day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">{day}</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  defaultValue={i === 0 ? '09:00' : i === 1 ? '09:00' : 'Cerrado'}
                  className="w-20 px-2 py-1 border border-gray-200 rounded text-sm text-center"
                />
                {i < 2 && (
                  <>
                    <span className="text-gray-400">a</span>
                    <input
                      type="text"
                      defaultValue={i === 0 ? '18:00' : '14:00'}
                      className="w-20 px-2 py-1 border border-gray-200 rounded text-sm text-center"
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWhatsAppTab = () => (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <MessageCircle size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">WhatsApp Business conectado</h3>
              <p className="text-sm text-gray-600">+54 11 4444-5678 • InfoPartes</p>
            </div>
          </div>
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <CheckCircle2 size={14} />
            Activo
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
          <p className="text-2xl font-bold text-gray-900">847</p>
          <p className="text-xs text-gray-500">Mensajes hoy</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
          <p className="text-2xl font-bold text-gray-900">94.2%</p>
          <p className="text-xs text-gray-500">Automatización</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
          <p className="text-2xl font-bold text-gray-900">2.3s</p>
          <p className="text-xs text-gray-500">Tiempo respuesta</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
          <p className="text-2xl font-bold text-gray-900">156</p>
          <p className="text-xs text-gray-500">Conversaciones activas</p>
        </div>
      </div>

      {/* Bot Settings */}
      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
        <div className="p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-1">Configuración del Bot</h4>
          <p className="text-xs text-gray-500">Ajusta el comportamiento del asistente</p>
        </div>
        
        <div className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Bot activo</p>
            <p className="text-xs text-gray-500">Responder automáticamente a mensajes</p>
          </div>
          <button className="relative w-12 h-6 bg-gray-900 rounded-full transition-colors">
            <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
          </button>
        </div>

        <div className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Horario del bot</p>
            <p className="text-xs text-gray-500">Solo responder en horario comercial</p>
          </div>
          <button className="relative w-12 h-6 bg-gray-200 rounded-full transition-colors">
            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
          </button>
        </div>

        <div className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Derivación automática</p>
            <p className="text-xs text-gray-500">Derivar a humano si no puede resolver</p>
          </div>
          <button className="relative w-12 h-6 bg-gray-900 rounded-full transition-colors">
            <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-900">Mensaje de bienvenida</p>
            <button className="text-xs text-gray-500 hover:text-gray-700">Editar</button>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            ¡Hola! 👋 Soy el asistente de InfoPartes. Puedo ayudarte con consultas de stock, precios, pedidos y turnos de servicio técnico. ¿En qué puedo ayudarte?
          </div>
        </div>
      </div>

      {/* API Key */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">API Key de WhatsApp</h4>
        <div className="flex items-center gap-2">
          <div className="flex-1 px-4 py-2.5 bg-gray-50 rounded-lg font-mono text-sm text-gray-600">
            {showApiKey ? 'EAAGZBq8JZCxYBOZCKQxZAiPgZD...' : '••••••••••••••••••••••••'}
          </div>
          <button 
            onClick={() => setShowApiKey(!showApiKey)}
            className="p-2.5 hover:bg-gray-100 rounded-lg"
          >
            {showApiKey ? <EyeOff size={18} className="text-gray-500" /> : <Eye size={18} className="text-gray-500" />}
          </button>
          <button className="p-2.5 hover:bg-gray-100 rounded-lg">
            <Copy size={18} className="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration) => (
          <div key={integration.id} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                  {integration.icon}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{integration.name}</h4>
                  <p className="text-xs text-gray-500">{integration.description}</p>
                </div>
              </div>
              {integration.connected ? (
                <span className="flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle2 size={12} />
                  Conectado
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <XCircle size={12} />
                  No conectado
                </span>
              )}
            </div>
            
            {integration.status && (
              <p className="text-xs text-gray-500 mb-3">{integration.status}</p>
            )}
            
            <button className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
              integration.connected 
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}>
              {integration.connected ? 'Configurar' : 'Conectar'}
            </button>
          </div>
        ))}
      </div>

      {/* Webhook */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-1">Webhook personalizado</h4>
        <p className="text-xs text-gray-500 mb-4">Envía eventos a tu servidor</p>
        
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="https://tu-servidor.com/webhook"
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <button className="px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-gray-500" />
            <h4 className="text-sm font-semibold text-gray-900">Notificaciones por Email</h4>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { key: 'emailSales', label: 'Nuevas ventas', desc: 'Recibir email por cada venta completada' },
            { key: 'emailStock', label: 'Alertas de stock', desc: 'Cuando un producto esté por debajo del mínimo' },
            { key: 'emailReports', label: 'Reportes semanales', desc: 'Resumen de ventas y métricas cada lunes' },
          ].map((item) => (
            <div key={item.key} className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <button 
                onClick={() => { 
                  setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] }); 
                  setHasChanges(true); 
                }}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notifications[item.key as keyof typeof notifications] ? 'bg-gray-900' : 'bg-gray-200'
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  notifications[item.key as keyof typeof notifications] ? 'right-1' : 'left-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp Notifications */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <MessageCircle size={18} className="text-gray-500" />
            <h4 className="text-sm font-semibold text-gray-900">Notificaciones por WhatsApp</h4>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { key: 'whatsappEscalations', label: 'Derivaciones urgentes', desc: 'Cuando el bot no puede resolver' },
            { key: 'whatsappOrders', label: 'Pedidos nuevos', desc: 'Notificación inmediata de nuevos pedidos' },
          ].map((item) => (
            <div key={item.key} className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <button 
                onClick={() => { 
                  setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] }); 
                  setHasChanges(true); 
                }}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notifications[item.key as keyof typeof notifications] ? 'bg-gray-900' : 'bg-gray-200'
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  notifications[item.key as keyof typeof notifications] ? 'right-1' : 'left-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTeamTab = () => (
    <div className="space-y-6">
      {/* Invite */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Miembros del equipo</h3>
          <p className="text-xs text-gray-500">{MOCK_TEAM.length} miembros • 2 invitaciones pendientes</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800">
          <Plus size={16} />
          Invitar miembro
        </button>
      </div>

      {/* Team List */}
      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
        {MOCK_TEAM.map((member) => (
          <div key={member.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-bold">
                {member.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${roleConfig[member.role].color}`}>
                    {roleConfig[member.role].icon}
                    {roleConfig[member.role].label}
                  </span>
                  {member.status === 'invited' && (
                    <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">Pendiente</span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{member.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400">{member.lastActive}</span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreVertical size={16} className="text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Roles Info */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Permisos por rol</h4>
        <div className="space-y-2 text-xs text-gray-600">
          <p><strong>Propietario:</strong> Acceso completo, facturación, eliminar cuenta</p>
          <p><strong>Administrador:</strong> Gestión completa excepto facturación</p>
          <p><strong>Miembro:</strong> Ver y gestionar operaciones diarias</p>
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={18} className="text-yellow-400" />
              <span className="text-sm font-medium text-gray-300">Plan actual</span>
            </div>
            <h3 className="text-2xl font-bold">Professional</h3>
          </div>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">Activo</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-2xl font-bold">∞</p>
            <p className="text-xs text-gray-400">Mensajes WhatsApp</p>
          </div>
          <div>
            <p className="text-2xl font-bold">5</p>
            <p className="text-xs text-gray-400">Usuarios</p>
          </div>
          <div>
            <p className="text-2xl font-bold">10GB</p>
            <p className="text-xs text-gray-400">Almacenamiento</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <div>
            <p className="text-3xl font-bold">$49.990<span className="text-sm font-normal text-gray-400">/mes</span></p>
            <p className="text-xs text-gray-400">Próxima facturación: 15 Ene 2026</p>
          </div>
          <button className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100">
            Cambiar plan
          </button>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-gray-900">Método de pago</h4>
          <button className="text-xs text-gray-500 hover:text-gray-700">Cambiar</button>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">VISA</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
            <p className="text-xs text-gray-500">Expira 12/27</p>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h4 className="text-sm font-semibold text-gray-900">Historial de facturación</h4>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { date: '15 Dic 2025', amount: '$49.990', status: 'paid' },
            { date: '15 Nov 2025', amount: '$49.990', status: 'paid' },
            { date: '15 Oct 2025', amount: '$49.990', status: 'paid' },
          ].map((invoice, i) => (
            <div key={i} className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{invoice.date}</p>
                <p className="text-xs text-gray-500">Plan Professional</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-900">{invoice.amount}</span>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Pagado</span>
                <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                  <Download size={12} />
                  PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      {/* Appearance */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Apariencia</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
            <div className="flex gap-2">
              {[
                { value: 'light', label: 'Claro', icon: '☀️' },
                { value: 'dark', label: 'Oscuro', icon: '🌙' },
                { value: 'auto', label: 'Automático', icon: '💻' },
              ].map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => { setPreferences({ ...preferences, theme: theme.value }); setHasChanges(true); }}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-colors ${
                    preferences.theme === theme.value 
                      ? 'border-gray-900 bg-gray-900 text-white' 
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{theme.icon}</span>
                  <span className="text-sm font-medium">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Regional */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Configuración regional</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
            <select 
              value={preferences.language}
              onChange={(e) => { setPreferences({ ...preferences, language: e.target.value }); setHasChanges(true); }}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
            <select 
              value={preferences.currency}
              onChange={(e) => { setPreferences({ ...preferences, currency: e.target.value }); setHasChanges(true); }}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="ARS">ARS - Peso Argentino</option>
              <option value="USD">USD - Dólar</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Zona horaria</label>
            <select 
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option>America/Argentina/Buenos_Aires (GMT-3)</option>
              <option>America/Santiago (GMT-3)</option>
              <option>America/Sao_Paulo (GMT-3)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Formato de fecha</label>
            <select 
              value={preferences.dateFormat}
              onChange={(e) => { setPreferences({ ...preferences, dateFormat: e.target.value }); setHasChanges(true); }}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Datos</h4>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <Download size={18} className="text-gray-500" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Exportar todos los datos</p>
                <p className="text-xs text-gray-500">Descargar backup completo en CSV</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <Upload size={18} className="text-gray-500" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Importar datos</p>
                <p className="text-xs text-gray-500">Cargar clientes, productos desde CSV</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 rounded-xl border border-red-200 p-4">
        <h4 className="text-sm font-semibold text-red-700 mb-4 flex items-center gap-2">
          <AlertTriangle size={16} />
          Zona de peligro
        </h4>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-red-200 hover:bg-red-50 transition-colors">
            <div className="flex items-center gap-3">
              <RotateCcw size={18} className="text-red-500" />
              <div className="text-left">
                <p className="text-sm font-medium text-red-700">Restablecer configuración</p>
                <p className="text-xs text-red-500">Volver a valores por defecto</p>
              </div>
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-red-200 hover:bg-red-50 transition-colors">
            <div className="flex items-center gap-3">
              <Trash2 size={18} className="text-red-500" />
              <div className="text-left">
                <p className="text-sm font-medium text-red-700">Eliminar cuenta</p>
                <p className="text-xs text-red-500">Esta acción es irreversible</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'business': return renderBusinessTab();
      case 'whatsapp': return renderWhatsAppTab();
      case 'integrations': return renderIntegrationsTab();
      case 'notifications': return renderNotificationsTab();
      case 'team': return renderTeamTab();
      case 'billing': return renderBillingTab();
      case 'preferences': return renderPreferencesTab();
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ajustes</h1>
          <p className="text-sm text-gray-500">Configura tu cuenta y preferencias</p>
        </div>
        {hasChanges && (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setHasChanges(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
            >
              Descartar
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <Save size={16} />
              Guardar cambios
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <nav className="bg-white rounded-xl border border-gray-100 p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
