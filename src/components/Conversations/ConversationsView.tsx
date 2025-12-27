import React, { useState } from 'react';
import { 
  MessageSquare, 
  Mail, 
  Instagram, 
  Clock, 
  User, 
  Send, 
  Paperclip, 
  MoreVertical, 
  Search, 
  Filter,
  Bot,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  Phone,
  Calendar,
  Wrench,
  ShoppingCart,
  ExternalLink,
  ArrowUpRight,
  Zap,
  TrendingUp
} from 'lucide-react';

type Channel = 'all' | 'whatsapp' | 'email' | 'instagram';
type Status = 'active' | 'pending' | 'resolved' | 'escalated';
type Intent = 'consulta_stock' | 'consulta_precio' | 'turno' | 'pedido' | 'reclamo' | 'cotizacion' | 'general';

interface Message {
  id: string;
  sender: 'client' | 'agent' | 'bot';
  text: string;
  time: string;
}

interface ConversationData {
  id: string;
  client: {
    name: string;
    avatar?: string;
    phone?: string;
    email?: string;
    instagram?: string;
    isNew?: boolean;
    totalPurchases?: number;
  };
  channel: 'whatsapp' | 'email' | 'instagram';
  status: Status;
  intent: Intent;
  lastMessage: string;
  time: string;
  unread: number;
  agent: string;
  responseTime?: string;
  messages: Message[];
}

const MOCK_CONVERSATIONS: ConversationData[] = [
  {
    id: '1',
    client: { name: 'Juan Pérez', phone: '+54 9 11 2345-6789', totalPurchases: 3 },
    channel: 'whatsapp',
    status: 'active',
    intent: 'consulta_stock',
    lastMessage: 'Tienen stock de RTX 4070 Super?',
    time: 'Hace 2 min',
    unread: 2,
    agent: 'Bot IA',
    responseTime: '< 1 min',
    messages: [
      { id: '1', sender: 'client', text: 'Hola buenas tardes', time: '14:32' },
      { id: '2', sender: 'bot', text: '¡Hola Juan! 👋 Bienvenido a InfoPartes. ¿En qué puedo ayudarte?', time: '14:32' },
      { id: '3', sender: 'client', text: 'Tienen stock de RTX 4070 Super?', time: '14:33' },
      { id: '4', sender: 'bot', text: '¡Sí! Tenemos la RTX 4070 SUPER en stock 🎮\n\n• Gigabyte Gaming OC: $890.000\n• MSI Ventus 3X: $875.000\n• ASUS Dual: $920.000\n\nTodas con garantía oficial de 3 años. ¿Te interesa alguna en particular?', time: '14:33' },
    ]
  },
  {
    id: '2',
    client: { name: 'TechSoluciones SRL', email: 'compras@techsoluciones.com', totalPurchases: 12 },
    channel: 'email',
    status: 'pending',
    intent: 'cotizacion',
    lastMessage: 'Necesitamos cotización para 10 PCs de oficina',
    time: 'Hace 15 min',
    unread: 1,
    agent: 'Sin asignar',
    messages: [
      { id: '1', sender: 'client', text: 'Asunto: Cotización PCs Corporativas\n\nBuenas tardes,\n\nSomos TechSoluciones SRL (CUIT 30-71234567-8) y necesitamos cotización para:\n\n• 10 PCs de oficina (Ryzen 5, 16GB RAM, SSD 512GB)\n• 10 Monitores 24" FullHD\n• 10 Kits teclado + mouse\n\nAguardamos propuesta mayorista.\n\nSaludos,\nDpto. Compras', time: '14:20' },
    ]
  },
  {
    id: '3',
    client: { name: 'Carlos López', phone: '+54 9 11 4567-8901', totalPurchases: 1 },
    channel: 'whatsapp',
    status: 'resolved',
    intent: 'turno',
    lastMessage: 'Perfecto, nos vemos el viernes a las 15:30',
    time: 'Hace 25 min',
    unread: 0,
    agent: 'Bot IA',
    responseTime: '< 1 min',
    messages: [
      { id: '1', sender: 'client', text: 'Buenas, necesito llevar mi notebook a revisar, anda muy lenta', time: '14:00' },
      { id: '2', sender: 'bot', text: '¡Hola Carlos! Entiendo que tu notebook está funcionando lento. Puede ser falta de mantenimiento, disco lleno o memoria insuficiente. ¿Querés agendar un turno para diagnóstico? El diagnóstico tiene un costo de $8.000 que se descuenta si hacés la reparación.', time: '14:00' },
      { id: '3', sender: 'client', text: 'Si dale, para el viernes si puede ser', time: '14:05' },
      { id: '4', sender: 'bot', text: 'Perfecto. Tengo disponibilidad el viernes a las 11:30, 15:30 o 17:30. ¿Cuál te queda mejor?', time: '14:05' },
      { id: '5', sender: 'client', text: '15:30', time: '14:08' },
      { id: '6', sender: 'bot', text: '✅ ¡Listo Carlos! Tu turno quedó agendado:\n\n📅 Viernes 27/12\n🕒 15:30 hs\n📍 Av. Corrientes 1234, CABA\n💻 Notebook - Diagnóstico rendimiento\n\n¡Te esperamos!', time: '14:08' },
      { id: '7', sender: 'client', text: 'Perfecto, nos vemos el viernes a las 15:30', time: '14:10' },
    ]
  },
  {
    id: '4',
    client: { name: 'gamer_zone_ar', instagram: '@gamer_zone_ar', isNew: true },
    channel: 'instagram',
    status: 'active',
    intent: 'consulta_precio',
    lastMessage: '¿Cuánto sale armar una PC gamer con RTX 4060?',
    time: 'Hace 35 min',
    unread: 1,
    agent: 'Bot IA',
    responseTime: '< 1 min',
    messages: [
      { id: '1', sender: 'client', text: 'Hola! Vi que arman PCs gamer 🎮', time: '13:55' },
      { id: '2', sender: 'bot', text: '¡Hola! 👋 Sí, armamos PCs gamer a medida con los mejores componentes y garantía. ¿Tenés alguna configuración en mente o querés que te arme una propuesta?', time: '13:56' },
      { id: '3', sender: 'client', text: '¿Cuánto sale armar una PC gamer con RTX 4060?', time: '14:00' },
    ]
  },
  {
    id: '5',
    client: { name: 'Roberto Sánchez', phone: '+54 9 11 6789-0123', totalPurchases: 5 },
    channel: 'whatsapp',
    status: 'escalated',
    intent: 'reclamo',
    lastMessage: 'Necesito hablar con alguien, la fuente que me vendieron no funciona',
    time: 'Hace 1 hora',
    unread: 3,
    agent: 'Matías (Soporte)',
    messages: [
      { id: '1', sender: 'client', text: 'Hola, compré una fuente Corsair hace 2 semanas y dejó de funcionar', time: '13:15' },
      { id: '2', sender: 'bot', text: 'Hola Roberto, lamento escuchar eso. Las fuentes Corsair tienen 5 años de garantía. ¿Podrías indicarme el número de factura o ticket de compra?', time: '13:15' },
      { id: '3', sender: 'client', text: 'El ticket es #TN-2847. La PC no prende más', time: '13:18' },
      { id: '4', sender: 'bot', text: 'Gracias Roberto. Veo tu compra del 12/12. Voy a derivar tu caso a un técnico para gestionar el cambio por garantía.', time: '13:18' },
      { id: '5', sender: 'agent', text: 'Hola Roberto, soy Matías de soporte técnico. Ya gestioné el cambio de tu fuente. ¿Podés acercarte mañana entre 10 y 18hs con la fuente y la factura? Te la cambiamos en el momento.', time: '13:25' },
      { id: '6', sender: 'client', text: 'Necesito hablar con alguien, la fuente que me vendieron no funciona', time: '13:35' },
    ]
  },
  {
    id: '6',
    client: { name: 'Laura Fernández', email: 'laura.f@empresa.com', totalPurchases: 8 },
    channel: 'email',
    status: 'resolved',
    intent: 'pedido',
    lastMessage: 'Re: Confirmación pedido #TN-2901 - Recibido conforme',
    time: 'Hace 2 horas',
    unread: 0,
    agent: 'Bot IA',
    responseTime: '5 min',
    messages: [
      { id: '1', sender: 'client', text: 'Asunto: Estado de mi pedido\n\nHola,\n\nQuería consultar el estado del pedido #TN-2901 realizado el lunes.\n\nGracias', time: '10:30' },
      { id: '2', sender: 'bot', text: 'Asunto: Re: Estado de mi pedido #TN-2901\n\nHola Laura,\n\nTu pedido #TN-2901 fue despachado ayer y está en camino:\n\n📦 Contenido: RTX 4080 SUPER + Fuente 850W\n🚚 Transporte: Andreani\n📍 Tracking: AND-789456123\n📅 Entrega estimada: Hoy entre 14-18hs\n\nPodés seguir el envío en: andreani.com/tracking\n\nSaludos!', time: '10:35' },
      { id: '3', sender: 'client', text: 'Re: Confirmación pedido #TN-2901 - Recibido conforme', time: '16:15' },
    ]
  },
  {
    id: '7',
    client: { name: 'pc_master_arg', instagram: '@pc_master_arg', isNew: true },
    channel: 'instagram',
    status: 'pending',
    intent: 'consulta_stock',
    lastMessage: '¿Tienen RAM DDR5 6000MHz?',
    time: 'Hace 3 horas',
    unread: 1,
    agent: 'Sin asignar',
    messages: [
      { id: '1', sender: 'client', text: '¿Tienen RAM DDR5 6000MHz?', time: '11:30' },
    ]
  },
  {
    id: '8',
    client: { name: 'María García', phone: '+54 9 11 3456-7890', totalPurchases: 2 },
    channel: 'whatsapp',
    status: 'active',
    intent: 'consulta_precio',
    lastMessage: '¿Tienen alguna promo para upgrade de RAM?',
    time: 'Hace 45 min',
    unread: 1,
    agent: 'Bot IA',
    responseTime: '< 1 min',
    messages: [
      { id: '1', sender: 'client', text: 'Hola! Quiero agregarle RAM a mi notebook', time: '13:50' },
      { id: '2', sender: 'bot', text: '¡Hola María! 👋 Con gusto te ayudo. ¿Sabés qué modelo de notebook tenés? Así verifico compatibilidad y te paso opciones.', time: '13:50' },
      { id: '3', sender: 'client', text: 'Es una Lenovo IdeaPad 3, tiene 8GB y quiero llevarla a 16', time: '13:52' },
      { id: '4', sender: 'bot', text: 'Excelente elección! La Lenovo IdeaPad 3 usa DDR4 SODIMM. Tengo estas opciones:\n\n• Kingston 8GB DDR4 3200MHz: $28.000\n• Crucial 8GB DDR4 3200MHz: $26.500\n• Kingston 16GB DDR4 3200MHz: $52.000\n\nSi querés ir a 16GB total, podés agregar un módulo de 8GB ($26-28k) o reemplazar el que tenés por uno de 16GB ($52k).', time: '13:53' },
      { id: '5', sender: 'client', text: '¿Tienen alguna promo para upgrade de RAM?', time: '13:55' },
    ]
  },
];

const channelIcons = {
  whatsapp: <MessageSquare className="text-green-500" size={16} />,
  email: <Mail className="text-blue-500" size={16} />,
  instagram: <Instagram className="text-pink-500" size={16} />,
};

const channelColors = {
  whatsapp: 'bg-green-50 text-green-700 border-green-200',
  email: 'bg-blue-50 text-blue-700 border-blue-200',
  instagram: 'bg-pink-50 text-pink-700 border-pink-200',
};

const statusConfig = {
  active: { label: 'Activa', color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50' },
  pending: { label: 'Pendiente', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50' },
  resolved: { label: 'Resuelta', color: 'bg-gray-400', textColor: 'text-gray-600', bgColor: 'bg-gray-50' },
  escalated: { label: 'Escalada', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50' },
};

const intentConfig: Record<Intent, { label: string; icon: React.ElementType; color: string }> = {
  consulta_stock: { label: 'Stock', icon: ShoppingCart, color: 'text-blue-600' },
  consulta_precio: { label: 'Precio', icon: TrendingUp, color: 'text-green-600' },
  turno: { label: 'Turno', icon: Calendar, color: 'text-purple-600' },
  pedido: { label: 'Pedido', icon: ShoppingCart, color: 'text-orange-600' },
  reclamo: { label: 'Reclamo', icon: AlertTriangle, color: 'text-red-600' },
  cotizacion: { label: 'Cotización', icon: ExternalLink, color: 'text-indigo-600' },
  general: { label: 'General', icon: MessageSquare, color: 'text-gray-600' },
};

export const ConversationsView: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<Channel>('all');
  const [selectedConversation, setSelectedConversation] = useState<ConversationData | null>(MOCK_CONVERSATIONS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all');

  const filteredConversations = MOCK_CONVERSATIONS.filter(conv => {
    const matchesChannel = selectedChannel === 'all' || conv.channel === selectedChannel;
    const matchesStatus = filterStatus === 'all' || conv.status === filterStatus;
    const matchesSearch = conv.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesChannel && matchesStatus && matchesSearch;
  });

  const stats = {
    total: MOCK_CONVERSATIONS.length,
    active: MOCK_CONVERSATIONS.filter(c => c.status === 'active').length,
    pending: MOCK_CONVERSATIONS.filter(c => c.status === 'pending').length,
    escalated: MOCK_CONVERSATIONS.filter(c => c.status === 'escalated').length,
    byBot: MOCK_CONVERSATIONS.filter(c => c.agent === 'Bot IA').length,
  };

  const channelCounts = {
    all: MOCK_CONVERSATIONS.length,
    whatsapp: MOCK_CONVERSATIONS.filter(c => c.channel === 'whatsapp').length,
    email: MOCK_CONVERSATIONS.filter(c => c.channel === 'email').length,
    instagram: MOCK_CONVERSATIONS.filter(c => c.channel === 'instagram').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Conversaciones</h1>
          <p className="text-sm text-gray-500">Centro de atención multicanal con IA</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            <Filter size={16} />
            Filtros
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
            <Zap size={16} />
            Ver Métricas IA
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Activas</span>
            <MessageSquare size={16} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Pendientes</span>
            <Clock size={16} className="text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Escaladas</span>
            <AlertTriangle size={16} className="text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.escalated}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Resueltas hoy</span>
            <CheckCircle2 size={16} className="text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-600">{MOCK_CONVERSATIONS.filter(c => c.status === 'resolved').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Atendidas por IA</span>
            <Bot size={16} className="text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.byBot}</p>
          <p className="text-xs text-gray-400">{Math.round((stats.byBot / stats.total) * 100)}% automático</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 h-[calc(100vh-340px)]">
        {/* Conversations List */}
        <div className="w-[420px] min-w-[380px] bg-white rounded-xl border border-gray-100 flex flex-col">
          {/* Search and Filters */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Buscar conversación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                />
              </div>
            </div>
            
            {/* Channel tabs */}
            <div className="grid grid-cols-4 gap-1">
              {(['all', 'whatsapp', 'email', 'instagram'] as Channel[]).map((channel) => (
                <button
                  key={channel}
                  onClick={() => setSelectedChannel(channel)}
                  className={`flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                    selectedChannel === channel
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {channel === 'all' ? (
                    <MessageSquare size={14} />
                  ) : channel === 'whatsapp' ? (
                    <MessageSquare size={14} className={selectedChannel === channel ? 'text-white' : 'text-green-500'} />
                  ) : channel === 'email' ? (
                    <Mail size={14} className={selectedChannel === channel ? 'text-white' : 'text-blue-500'} />
                  ) : (
                    <Instagram size={14} className={selectedChannel === channel ? 'text-white' : 'text-pink-500'} />
                  )}
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    selectedChannel === channel ? 'bg-white/20' : 'bg-gray-200'
                  }`}>
                    {channelCounts[channel]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => {
              const IntentIcon = intentConfig[conv.intent].icon;
              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`p-4 border-b border-gray-50 cursor-pointer transition-colors ${
                    selectedConversation?.id === conv.id ? 'bg-gray-50' : 'hover:bg-gray-25'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                        <User size={18} className="text-gray-500" />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 p-0.5 bg-white rounded-full">
                        {channelIcons[conv.channel]}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-gray-900 truncate">{conv.client.name}</span>
                          {conv.client.isNew && (
                            <span className="text-[9px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">NUEVO</span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2 flex-shrink-0">{conv.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mb-2">{conv.lastMessage}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${statusConfig[conv.status].bgColor} ${statusConfig[conv.status].textColor}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[conv.status].color}`}></span>
                            {statusConfig[conv.status].label}
                          </span>
                          <span className={`inline-flex items-center gap-1 text-[10px] ${intentConfig[conv.intent].color}`}>
                            <IntentIcon size={10} />
                            {intentConfig[conv.intent].label}
                          </span>
                        </div>
                        {conv.unread > 0 && (
                          <span className="w-5 h-5 bg-gray-900 text-white rounded-full text-[10px] flex items-center justify-center font-bold flex-shrink-0">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Panel */}
        {selectedConversation ? (
          <div className="flex-1 bg-white rounded-xl border border-gray-100 flex flex-col min-w-0">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                      <User size={18} className="text-gray-500" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 p-0.5 bg-white rounded-full">
                      {channelIcons[selectedConversation.channel]}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 truncate">{selectedConversation.client.name}</h3>
                      {selectedConversation.client.totalPurchases && selectedConversation.client.totalPurchases > 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                          {selectedConversation.client.totalPurchases} compras
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {selectedConversation.client.phone || selectedConversation.client.email || selectedConversation.client.instagram}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${channelColors[selectedConversation.channel]}`}>
                    {channelIcons[selectedConversation.channel]}
                    <span className="capitalize hidden sm:inline">{selectedConversation.channel}</span>
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[selectedConversation.status].bgColor} ${statusConfig[selectedConversation.status].textColor}`}>
                    <span className={`w-2 h-2 rounded-full ${statusConfig[selectedConversation.status].color}`}></span>
                    {statusConfig[selectedConversation.status].label}
                  </span>
                  <button className="p-2 hover:bg-gray-50 rounded-lg">
                    <MoreVertical size={18} className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {selectedConversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'client' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[70%] ${
                    msg.sender === 'client' 
                      ? 'bg-white border border-gray-100' 
                      : msg.sender === 'bot'
                      ? 'bg-gray-900 text-white'
                      : 'bg-blue-600 text-white'
                  } rounded-2xl px-4 py-3 shadow-sm`}>
                    {msg.sender !== 'client' && (
                      <div className="flex items-center gap-1.5 mb-1">
                        {msg.sender === 'bot' ? (
                          <>
                            <Bot size={12} className="opacity-70" />
                            <span className="text-[10px] opacity-70">Bot IA</span>
                          </>
                        ) : (
                          <>
                            <UserCheck size={12} className="opacity-70" />
                            <span className="text-[10px] opacity-70">Agente</span>
                          </>
                        )}
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${
                      msg.sender === 'client' ? 'text-gray-400' : 'opacity-60'
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors flex-shrink-0">
                  <Paperclip size={20} className="text-gray-400" />
                </button>
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 min-w-0"
                />
                <button className="p-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors flex-shrink-0">
                  <Send size={18} />
                </button>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  Atendido por: <span className="text-gray-600 font-medium">{selectedConversation.agent}</span>
                  {selectedConversation.responseTime && (
                    <>
                      <span className="mx-1">•</span>
                      <span className="text-green-600">Resp: {selectedConversation.responseTime}</span>
                    </>
                  )}
                </span>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-600">
                    <Calendar size={12} />
                    Turno
                  </button>
                  <button className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-600">
                    <Wrench size={12} />
                    Ticket
                  </button>
                  <button className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-600">
                    <ArrowUpRight size={12} />
                    Escalar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-white rounded-xl border border-gray-100 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Selecciona una conversación</p>
            </div>
          </div>
        )}

        {/* Client Info Panel */}
        {selectedConversation && (
          <div className="w-[280px] bg-white rounded-xl border border-gray-100 flex flex-col">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">Información del Cliente</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Contact */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Contacto</p>
                <div className="space-y-2">
                  {selectedConversation.client.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={14} className="text-gray-400" />
                      <span className="text-gray-700">{selectedConversation.client.phone}</span>
                    </div>
                  )}
                  {selectedConversation.client.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={14} className="text-gray-400" />
                      <span className="text-gray-700">{selectedConversation.client.email}</span>
                    </div>
                  )}
                  {selectedConversation.client.instagram && (
                    <div className="flex items-center gap-2 text-sm">
                      <Instagram size={14} className="text-gray-400" />
                      <span className="text-gray-700">{selectedConversation.client.instagram}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Intent */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Intención detectada</p>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${intentConfig[selectedConversation.intent].color} bg-gray-50`}>
                  {React.createElement(intentConfig[selectedConversation.intent].icon, { size: 14 })}
                  <span className="text-sm font-medium">{intentConfig[selectedConversation.intent].label}</span>
                </div>
              </div>

              {/* History */}
              {selectedConversation.client.totalPurchases !== undefined && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">Historial</p>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">Compras</span>
                      <span className="text-sm font-semibold text-gray-900">{selectedConversation.client.totalPurchases}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Cliente desde</span>
                      <span className="text-sm text-gray-700">Nov 2024</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Acciones rápidas</p>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100">
                    <MessageSquare size={14} />
                    Enviar WhatsApp
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100">
                    <Calendar size={14} />
                    Agendar Turno
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100">
                    <Wrench size={14} />
                    Crear Ticket
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100">
                    <ExternalLink size={14} />
                    Ver en CRM
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
