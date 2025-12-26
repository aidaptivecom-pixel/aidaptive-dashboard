import { useState } from 'react';
import { MessageSquare, Mail, Instagram, Phone, Search, Filter, MoreVertical, CheckCircle2, Clock, AlertTriangle, Send } from 'lucide-react';

type Channel = 'all' | 'whatsapp' | 'email' | 'instagram';
type Status = 'all' | 'active' | 'pending' | 'resolved';

interface Message {
  id: string;
  client: {
    name: string;
    avatar?: string;
    contact: string;
  };
  channel: 'whatsapp' | 'email' | 'instagram';
  lastMessage: string;
  time: string;
  status: 'active' | 'pending' | 'resolved';
  unread: number;
  agent?: string;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    client: { name: 'Juan Perez', contact: '+54 9 11 2345-6789' },
    channel: 'whatsapp',
    lastMessage: 'Perfecto, entonces nos vemos el viernes a las 15:30 para el cambio de pantalla',
    time: 'Hace 2 min',
    status: 'active',
    unread: 2,
    agent: 'AgenteTurnos'
  },
  {
    id: '2',
    client: { name: 'Maria Garcia', contact: 'maria.garcia@gmail.com' },
    channel: 'email',
    lastMessage: 'Hola, queria consultar el precio de reparacion de mi MacBook Pro que no enciende...',
    time: 'Hace 15 min',
    status: 'pending',
    unread: 1
  },
  {
    id: '3',
    client: { name: 'Carlos Tech', contact: '@carlostech_' },
    channel: 'instagram',
    lastMessage: 'Hola! Vi que hacen reparaciones de iPhone. Tienen disponibilidad esta semana?',
    time: 'Hace 28 min',
    status: 'active',
    unread: 3,
    agent: 'AgenteConsultas'
  },
  {
    id: '4',
    client: { name: 'Ana Martinez', contact: '+54 9 11 5678-9012' },
    channel: 'whatsapp',
    lastMessage: 'Gracias por la info! Voy a pensarlo y les aviso',
    time: 'Hace 1 hora',
    status: 'resolved',
    unread: 0,
    agent: 'AgenteVentas'
  },
  {
    id: '5',
    client: { name: 'Roberto Sanchez', contact: 'roberto.sanchez@empresa.com' },
    channel: 'email',
    lastMessage: 'RE: Presupuesto reparacion iPhone 14 - Adjunto fotos del equipo danado',
    time: 'Hace 2 horas',
    status: 'pending',
    unread: 0
  },
  {
    id: '6',
    client: { name: 'Laura Fernandez', contact: '+54 9 11 7890-1234' },
    channel: 'whatsapp',
    lastMessage: 'Ya pase a retirar el equipo, quedo perfecto! Muchas gracias',
    time: 'Hace 3 horas',
    status: 'resolved',
    unread: 0,
    agent: 'AgenteReparaciones'
  },
  {
    id: '7',
    client: { name: 'TechStore BA', contact: '@techstoreba' },
    channel: 'instagram',
    lastMessage: 'Hola! Hacen reparaciones mayoristas? Tenemos varios equipos',
    time: 'Hace 4 horas',
    status: 'pending',
    unread: 1
  },
  {
    id: '8',
    client: { name: 'Pedro Gomez', contact: 'pedrogomez@hotmail.com' },
    channel: 'email',
    lastMessage: 'Consulta: Cuanto sale cambiar la bateria de un iPhone 12 mini?',
    time: 'Ayer',
    status: 'resolved',
    unread: 0,
    agent: 'AgenteConsultas'
  },
];

const ChannelIcon = ({ channel, size = 16 }: { channel: string; size?: number }) => {
  switch (channel) {
    case 'whatsapp':
      return <MessageSquare size={size} className="text-green-500" />;
    case 'email':
      return <Mail size={size} className="text-blue-500" />;
    case 'instagram':
      return <Instagram size={size} className="text-pink-500" />;
    default:
      return <MessageSquare size={size} />;
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'active':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-50 text-green-600">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          Activo
        </span>
      );
    case 'pending':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-600">
          <Clock size={10} />
          Pendiente
        </span>
      );
    case 'resolved':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-500">
          <CheckCircle2 size={10} />
          Resuelto
        </span>
      );
    default:
      return null;
  }
};

export const ConversationsView = () => {
  const [selectedChannel, setSelectedChannel] = useState<Channel>('all');
  const [selectedStatus, setSelectedStatus] = useState<Status>('all');
  const [selectedConversation, setSelectedConversation] = useState<Message | null>(MOCK_MESSAGES[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = MOCK_MESSAGES.filter(msg => {
    if (selectedChannel !== 'all' && msg.channel !== selectedChannel) return false;
    if (selectedStatus !== 'all' && msg.status !== selectedStatus) return false;
    if (searchQuery && !msg.client.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const channelCounts = {
    all: MOCK_MESSAGES.length,
    whatsapp: MOCK_MESSAGES.filter(m => m.channel === 'whatsapp').length,
    email: MOCK_MESSAGES.filter(m => m.channel === 'email').length,
    instagram: MOCK_MESSAGES.filter(m => m.channel === 'instagram').length,
  };

  return (
    <div className="flex h-[calc(100vh-120px)] gap-6">
      {/* Conversations List */}
      <div className="w-96 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Conversaciones</h2>
            <span className="text-xs text-gray-500">{filteredMessages.length} chats</span>
          </div>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Buscar conversacion..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>

          {/* Channel Tabs */}
          <div className="flex gap-1 p-1 bg-gray-50 rounded-lg">
            {[
              { key: 'all', label: 'Todos', icon: null },
              { key: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare size={12} className="text-green-500" /> },
              { key: 'email', label: 'Email', icon: <Mail size={12} className="text-blue-500" /> },
              { key: 'instagram', label: 'Instagram', icon: <Instagram size={12} className="text-pink-500" /> },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setSelectedChannel(tab.key as Channel)}
                className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-md text-[10px] font-medium transition-all ${
                  selectedChannel === tab.key
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className="text-[9px] text-gray-400">({channelCounts[tab.key as Channel]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => setSelectedConversation(msg)}
              className={`p-4 border-b border-gray-50 cursor-pointer transition-all hover:bg-gray-50 ${
                selectedConversation?.id === msg.id ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 font-semibold text-sm flex-shrink-0">
                  {msg.client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{msg.client.name}</span>
                      <ChannelIcon channel={msg.channel} size={12} />
                    </div>
                    <span className="text-[10px] text-gray-400">{msg.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mb-2">{msg.lastMessage}</p>
                  <div className="flex items-center justify-between">
                    <StatusBadge status={msg.status} />
                    {msg.unread > 0 && (
                      <span className="w-5 h-5 bg-gray-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {msg.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation Detail */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 font-semibold text-sm">
                  {selectedConversation.client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-gray-900">{selectedConversation.client.name}</h3>
                    <ChannelIcon channel={selectedConversation.channel} size={14} />
                  </div>
                  <p className="text-xs text-gray-500">{selectedConversation.client.contact}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedConversation.status} />
                {selectedConversation.agent && (
                  <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded font-mono">
                    {selectedConversation.agent}
                  </span>
                )}
                <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <MoreVertical size={16} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50">
              <div className="space-y-4">
                {/* Sample conversation */}
                <div className="flex justify-start">
                  <div className="max-w-[70%] bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-700">Hola! Queria consultar sobre el servicio de reparacion</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">10:30</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[70%] bg-gray-900 rounded-2xl rounded-tr-sm p-3">
                    <p className="text-sm text-white">Hola! Claro, con gusto te ayudo. Que dispositivo necesitas reparar?</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[10px] text-gray-400">10:31</span>
                      <CheckCircle2 size={10} className="text-green-400" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[70%] bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-700">{selectedConversation.lastMessage}</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">10:35</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                />
                <button className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <p>Selecciona una conversacion</p>
          </div>
        )}
      </div>
    </div>
  );
};