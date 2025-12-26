import React, { useState } from 'react';
import { MessageSquare, Mail, Instagram, Clock, User, Send, Paperclip, MoreVertical, Search, Filter } from 'lucide-react';

type Channel = 'all' | 'whatsapp' | 'email' | 'instagram';
type Status = 'active' | 'pending' | 'resolved' | 'escalated';

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
  };
  channel: 'whatsapp' | 'email' | 'instagram';
  status: Status;
  lastMessage: string;
  time: string;
  unread: number;
  agent: string;
  messages: Message[];
}

const MOCK_CONVERSATIONS: ConversationData[] = [
  {
    id: '1',
    client: { name: 'Juan Pérez', phone: '+54 9 11 2345-6789' },
    channel: 'whatsapp',
    status: 'active',
    lastMessage: 'Hola, quiero saber el precio de cambio de pantalla para iPhone 14 Pro',
    time: 'Hace 2 min',
    unread: 2,
    agent: 'Bot IA',
    messages: [
      { id: '1', sender: 'client', text: 'Hola buenas tardes', time: '14:32' },
      { id: '2', sender: 'bot', text: '¡Hola Juan! 👋 Bienvenido a InfoPartes Servicio Técnico. ¿En qué puedo ayudarte?', time: '14:32' },
      { id: '3', sender: 'client', text: 'Quiero saber el precio de cambio de pantalla para iPhone 14 Pro', time: '14:33' },
      { id: '4', sender: 'bot', text: 'El cambio de pantalla para iPhone 14 Pro tiene un costo de $185.000. Incluye pantalla OLED original, mano de obra y garantía de 6 meses. ¿Te gustaría agendar un turno?', time: '14:33' },
    ]
  },
  {
    id: '2',
    client: { name: 'María García', email: 'maria.garcia@gmail.com' },
    channel: 'email',
    status: 'pending',
    lastMessage: 'Necesito factura A por la reparación del MacBook',
    time: 'Hace 15 min',
    unread: 1,
    agent: 'Sin asignar',
    messages: [
      { id: '1', sender: 'client', text: 'Asunto: Solicitud de Factura A\n\nBuenas tardes,\n\nRealicé una reparación la semana pasada (Ticket #4521) y necesito factura A para la empresa.\n\nDatos:\nRazón Social: García Consultores SRL\nCUIT: 30-71234567-8\n\nGracias,\nMaría', time: '14:20' },
    ]
  },
  {
    id: '3',
    client: { name: 'Carlos López', phone: '+54 9 11 4567-8901' },
    channel: 'whatsapp',
    status: 'resolved',
    lastMessage: 'Perfecto, nos vemos el viernes a las 15:30',
    time: 'Hace 25 min',
    unread: 0,
    agent: 'Bot IA',
    messages: [
      { id: '1', sender: 'client', text: 'Buenas, necesito reparar mi iPhone 12, no carga', time: '14:00' },
      { id: '2', sender: 'bot', text: '¡Hola Carlos! Entiendo que tu iPhone 12 tiene problemas de carga. Puede ser el puerto Lightning o la batería. ¿Querés agendar un turno para diagnóstico gratuito?', time: '14:00' },
      { id: '3', sender: 'client', text: 'Si dale, para el viernes si puede ser', time: '14:05' },
      { id: '4', sender: 'bot', text: 'Perfecto. Tengo disponibilidad el viernes a las 11:30, 15:30 o 17:30. ¿Cuál te queda mejor?', time: '14:05' },
      { id: '5', sender: 'client', text: '15:30', time: '14:08' },
      { id: '6', sender: 'bot', text: '✅ ¡Listo Carlos! Tu turno quedó agendado:\n\n📅 Viernes 27/12\n🕒 15:30 hs\n📍 Av. Corrientes 1234, CABA\n📱 iPhone 12 - Diagnóstico de carga\n\n¡Te esperamos!', time: '14:08' },
      { id: '7', sender: 'client', text: 'Perfecto, nos vemos el viernes a las 15:30', time: '14:10' },
    ]
  },
  {
    id: '4',
    client: { name: 'tech_lover_ar', instagram: '@tech_lover_ar' },
    channel: 'instagram',
    status: 'active',
    lastMessage: '¿Hacen reparación de AirPods Pro?',
    time: 'Hace 35 min',
    unread: 1,
    agent: 'Bot IA',
    messages: [
      { id: '1', sender: 'client', text: 'Hola! Vi que reparan productos Apple 🍎', time: '13:55' },
      { id: '2', sender: 'bot', text: '¡Hola! 👋 Sí, somos servicio técnico especializado en Apple. ¿En qué podemos ayudarte?', time: '13:56' },
      { id: '3', sender: 'client', text: '¿Hacen reparación de AirPods Pro?', time: '14:00' },
    ]
  },
  {
    id: '5',
    client: { name: 'Roberto Sánchez', phone: '+54 9 11 6789-0123' },
    channel: 'whatsapp',
    status: 'escalated',
    lastMessage: 'Necesito hablar con un técnico, el problema sigue',
    time: 'Hace 1 hora',
    unread: 3,
    agent: 'Matías (Técnico)',
    messages: [
      { id: '1', sender: 'client', text: 'Hola, retiré mi MacBook ayer pero sigue con el mismo problema', time: '13:15' },
      { id: '2', sender: 'bot', text: 'Hola Roberto, lamento escuchar eso. ¿Podrías describir el problema que persiste?', time: '13:15' },
      { id: '3', sender: 'client', text: 'La batería sigue durando menos de 2 horas, ustedes me dijeron que la cambiaron', time: '13:18' },
      { id: '4', sender: 'bot', text: 'Entiendo tu frustración. Voy a derivar tu caso a un técnico para que lo revise personalmente.', time: '13:18' },
      { id: '5', sender: 'agent', text: 'Hola Roberto, soy Matías el técnico. Revisando tu ticket veo que se cambió la batería. ¿Podrías traer el equipo mañana para verificarlo sin cargo?', time: '13:25' },
      { id: '6', sender: 'client', text: 'Necesito hablar con un técnico, el problema sigue', time: '13:35' },
    ]
  },
  {
    id: '6',
    client: { name: 'Laura Fernández', email: 'laura.f@empresa.com' },
    channel: 'email',
    status: 'resolved',
    lastMessage: 'Re: Cotización reparación iPad - Aceptamos el presupuesto',
    time: 'Hace 2 horas',
    unread: 0,
    agent: 'Bot IA',
    messages: [
      { id: '1', sender: 'client', text: 'Asunto: Cotización reparación iPad\n\nHola,\n\nNecesito cotización para reparar 3 iPads de la empresa:\n- 2 iPad Air 4 con pantallas rotas\n- 1 iPad Pro 11" que no enciende\n\nSaludos', time: '10:30' },
      { id: '2', sender: 'bot', text: 'Asunto: Re: Cotización reparación iPad\n\nHola Laura,\n\nGracias por contactarnos. El presupuesto es:\n\n• iPad Air 4 pantalla: $95.000 c/u = $190.000\n• iPad Pro 11" diagnóstico: Sin cargo (reparación según falla)\n\nTotal estimado: $190.000 + diagnóstico\nTiempo: 24-48hs por equipo\n\n¿Procedemos?', time: '10:35' },
      { id: '3', sender: 'client', text: 'Re: Cotización reparación iPad - Aceptamos el presupuesto', time: '12:15' },
    ]
  },
  {
    id: '7',
    client: { name: 'apple_fans_ba', instagram: '@apple_fans_ba' },
    channel: 'instagram',
    status: 'pending',
    lastMessage: '¿Tienen stock de baterías para iPhone 11?',
    time: 'Hace 3 horas',
    unread: 1,
    agent: 'Sin asignar',
    messages: [
      { id: '1', sender: 'client', text: '¿Tienen stock de baterías para iPhone 11?', time: '11:30' },
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

export const ConversationsView: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<Channel>('all');
  const [selectedConversation, setSelectedConversation] = useState<ConversationData | null>(MOCK_CONVERSATIONS[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = MOCK_CONVERSATIONS.filter(conv => {
    const matchesChannel = selectedChannel === 'all' || conv.channel === selectedChannel;
    const matchesSearch = conv.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesChannel && matchesSearch;
  });

  const channelCounts = {
    all: MOCK_CONVERSATIONS.length,
    whatsapp: MOCK_CONVERSATIONS.filter(c => c.channel === 'whatsapp').length,
    email: MOCK_CONVERSATIONS.filter(c => c.channel === 'email').length,
    instagram: MOCK_CONVERSATIONS.filter(c => c.channel === 'instagram').length,
  };

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Lista de conversaciones */}
      <div className="w-[420px] min-w-[320px] border-r border-gray-100 flex flex-col">
        {/* Header con filtros */}
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
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors flex-shrink-0">
              <Filter size={18} className="text-gray-500" />
            </button>
          </div>
          
          {/* Channel tabs - grid layout para evitar superposición */}
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
                <span className="hidden sm:inline">{channel === 'all' ? 'Todos' : channel.charAt(0).toUpperCase() + channel.slice(1)}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  selectedChannel === channel ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {channelCounts[channel]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
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
                    <span className="font-semibold text-sm text-gray-900 truncate">{conv.client.name}</span>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2 flex-shrink-0">{conv.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mb-2">{conv.lastMessage}</p>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${statusConfig[conv.status].bgColor} ${statusConfig[conv.status].textColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[conv.status].color}`}></span>
                      {statusConfig[conv.status].label}
                    </span>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 bg-gray-900 text-white rounded-full text-[10px] flex items-center justify-center font-bold flex-shrink-0">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Panel de conversación */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
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
                <h3 className="font-semibold text-gray-900 truncate">{selectedConversation.client.name}</h3>
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

          {/* Mensajes */}
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
                          <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-[8px]">🤖</span>
                          </div>
                          <span className="text-[10px] opacity-70">Bot IA</span>
                        </>
                      ) : (
                        <>
                          <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                            <User size={10} />
                          </div>
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
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                Atendido por: <span className="text-gray-600 font-medium">{selectedConversation.agent}</span>
              </span>
              <span>•</span>
              <span>Canal: {selectedConversation.channel}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50/50">
          <div className="text-center">
            <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Selecciona una conversación</p>
          </div>
        </div>
      )}
    </div>
  );
};
