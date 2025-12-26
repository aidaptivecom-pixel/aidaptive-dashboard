import React, { useState } from 'react';
import { 
  Instagram, 
  Facebook, 
  Clock, 
  Calendar,
  Check, 
  X, 
  RefreshCw, 
  Edit3, 
  Eye,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Play,
  MoreVertical
} from 'lucide-react';

type ContentStatus = 'pending' | 'approved' | 'published' | 'rejected';
type Platform = 'instagram' | 'facebook' | 'tiktok';
type ContentType = 'feed' | 'story' | 'reel' | 'carousel';

interface ContentPiece {
  id: string;
  product: {
    name: string;
    sku: string;
    price: number;
    image: string;
  };
  type: ContentType;
  platforms: Platform[];
  status: ContentStatus;
  caption: string;
  hashtags: string[];
  cta: string;
  scheduledDate: string;
  scheduledTime: string;
  variants: string[];
  selectedVariant: number;
  metrics?: {
    reach: number;
    engagement: number;
    likes: number;
    comments: number;
    shares: number;
  };
}

const MOCK_CONTENT: ContentPiece[] = [
  {
    id: '1',
    product: {
      name: 'Pantalla iPhone 14 Pro',
      sku: 'PAN-IP14P-001',
      price: 185000,
      image: '📱'
    },
    type: 'feed',
    platforms: ['instagram', 'facebook'],
    status: 'pending',
    caption: '✨ ¿Tu iPhone 14 Pro necesita una pantalla nueva? \n\n🔧 Servicio profesional con garantía de 6 meses\n💰 Precio especial: $185.000\n⚡ Entrega en 24-48hs\n\n¡Dejá tu consulta o agendá tu turno por WhatsApp!',
    hashtags: ['#iPhone14Pro', '#ReparacioniPhone', '#ServicioTecnico', '#Apple', '#BuenosAires'],
    cta: 'Consultar por WhatsApp',
    scheduledDate: '2025-12-27',
    scheduledTime: '10:00',
    variants: ['📱 Estilo catálogo', '🎨 Estilo publicitario', '🏠 Estilo lifestyle'],
    selectedVariant: 0
  },
  {
    id: '2',
    product: {
      name: 'Batería iPhone 13',
      sku: 'BAT-IP13-001',
      price: 75000,
      image: '🔋'
    },
    type: 'reel',
    platforms: ['instagram', 'tiktok'],
    status: 'pending',
    caption: '🔋 ¿Tu iPhone 13 dura cada vez menos?\n\n⚠️ Señales de batería agotada:\n• Apagados repentinos\n• Calentamiento excesivo\n• Carga lenta\n\n✅ Cambio de batería original\n💰 $75.000 con garantía',
    hashtags: ['#BateriaiPhone', '#iPhone13', '#ReparacionApple', '#TecnicoApple'],
    cta: 'Agendar turno',
    scheduledDate: '2025-12-28',
    scheduledTime: '14:00',
    variants: ['🎬 Video informativo', '⚡ Video dinámico', '💡 Tutorial rápido'],
    selectedVariant: 1
  },
  {
    id: '3',
    product: {
      name: 'Cargador MagSafe',
      sku: 'ACC-MAG-001',
      price: 45000,
      image: '🧲'
    },
    type: 'story',
    platforms: ['instagram', 'facebook'],
    status: 'approved',
    caption: '🧲 Cargador MagSafe Original\n\n⚡ Carga rápida inalámbrica\n📦 Stock disponible\n🚚 Envíos a todo el país',
    hashtags: ['#MagSafe', '#AccesoriosApple', '#CargadorOriginal'],
    cta: 'Ver en tienda',
    scheduledDate: '2025-12-27',
    scheduledTime: '18:00',
    variants: ['🎯 Minimalista', '🌈 Colorido', '📦 Producto destacado'],
    selectedVariant: 0
  },
  {
    id: '4',
    product: {
      name: 'Reparación MacBook',
      sku: 'REP-MAC-001',
      price: 0,
      image: '💻'
    },
    type: 'carousel',
    platforms: ['instagram'],
    status: 'published',
    caption: '💻 Servicio Técnico MacBook\n\n✅ Diagnóstico GRATIS\n✅ Técnicos certificados\n✅ Repuestos originales\n\n📍 Av. Corrientes 1234, CABA\n📱 WhatsApp: +54 9 11 XXXX-XXXX',
    hashtags: ['#MacBook', '#ReparacionMacBook', '#Apple', '#ServicioTecnico'],
    cta: 'Solicitar diagnóstico',
    scheduledDate: '2025-12-26',
    scheduledTime: '12:00',
    variants: ['📊 Infográfico', '🖼️ Galería', '📝 Paso a paso'],
    selectedVariant: 2,
    metrics: {
      reach: 2450,
      engagement: 8.2,
      likes: 156,
      comments: 23,
      shares: 12
    }
  }
];

const WEEKLY_SCHEDULE = [
  { day: 'Lun', date: '23', posts: 1, status: 'published' },
  { day: 'Mar', date: '24', posts: 0, status: 'empty' },
  { day: 'Mié', date: '25', posts: 1, status: 'published' },
  { day: 'Jue', date: '26', posts: 1, status: 'published' },
  { day: 'Vie', date: '27', posts: 2, status: 'scheduled' },
  { day: 'Sáb', date: '28', posts: 1, status: 'pending' },
  { day: 'Dom', date: '29', posts: 0, status: 'empty' },
];

const platformIcons = {
  instagram: <Instagram size={14} className="text-pink-500" />,
  facebook: <Facebook size={14} className="text-blue-600" />,
  tiktok: <Play size={14} className="text-gray-900" />,
};

const statusConfig = {
  pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  approved: { label: 'Aprobado', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  published: { label: 'Publicado', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  rejected: { label: 'Descartado', color: 'bg-gray-100 text-gray-500', dot: 'bg-gray-400' },
};

const typeLabels = {
  feed: 'Feed',
  story: 'Story',
  reel: 'Reel',
  carousel: 'Carrusel',
};

export const MarketingView: React.FC = () => {
  const [content, setContent] = useState<ContentPiece[]>(MOCK_CONTENT);
  const [selectedContent, setSelectedContent] = useState<ContentPiece | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'calendar' | 'published'>('pending');

  const pendingContent = content.filter(c => c.status === 'pending');
  const approvedContent = content.filter(c => c.status === 'approved');
  const publishedContent = content.filter(c => c.status === 'published');

  const handleApprove = (id: string) => {
    setContent(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' as ContentStatus } : c));
  };

  const handleReject = (id: string) => {
    setContent(prev => prev.map(c => c.id === id ? { ...c, status: 'rejected' as ContentStatus } : c));
  };

  const handleChangeVariant = (id: string, variantIndex: number) => {
    setContent(prev => prev.map(c => c.id === id ? { ...c, selectedVariant: variantIndex } : c));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing</h1>
          <p className="text-sm text-gray-500">Gestión de contenido para redes sociales</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
            <RefreshCw size={16} />
            Regenerar Calendario
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
            <Sparkles size={16} />
            Generar Contenido
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Alcance Semanal</span>
            <TrendingUp size={16} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">12.4K</p>
          <p className="text-xs text-green-600">+18% vs semana anterior</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Engagement Rate</span>
            <Heart size={16} className="text-pink-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">6.8%</p>
          <p className="text-xs text-green-600">+2.1% vs semana anterior</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Posts Programados</span>
            <Calendar size={16} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{approvedContent.length + pendingContent.length}</p>
          <p className="text-xs text-gray-500">{pendingContent.length} pendientes de aprobación</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Clicks a WhatsApp</span>
            <MessageCircle size={16} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">89</p>
          <p className="text-xs text-green-600">+24% vs semana anterior</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tabs */}
          <div className="flex gap-2 bg-white rounded-xl p-1 border border-gray-100">
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'pending' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Pendientes ({pendingContent.length})
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'calendar' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Calendario
            </button>
            <button
              onClick={() => setActiveTab('published')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'published' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Publicados ({publishedContent.length})
            </button>
          </div>

          {/* Content Cards */}
          {activeTab === 'pending' && (
            <div className="space-y-4">
              {pendingContent.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl border transition-all cursor-pointer ${
                    selectedContent?.id === item.id ? 'border-gray-900 shadow-lg' : 'border-gray-100 hover:border-gray-200'
                  }`}
                  onClick={() => setSelectedContent(item)}
                >
                  <div className="p-4">
                    <div className="flex gap-4">
                      {/* Image Preview */}
                      <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                        {item.product.image}
                      </div>
                      
                      {/* Content Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[item.status].color}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[item.status].dot}`}></span>
                                {statusConfig[item.status].label}
                              </span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                {typeLabels[item.type]}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {item.platforms.map((p) => (
                              <span key={p} className="p-1 bg-gray-50 rounded">
                                {platformIcons[p]}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {item.caption.split('\n')[0]}
                        </p>
                        
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(item.scheduledDate).toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {item.scheduledTime} hs
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Variants */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">Variantes de imagen:</p>
                      <div className="flex gap-2">
                        {item.variants.map((variant, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleChangeVariant(item.id, idx);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              item.selectedVariant === idx
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {variant}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(item.id);
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        <Check size={16} />
                        Aprobar
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        <Edit3 size={16} />
                        Editar
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        <RefreshCw size={16} />
                        Regenerar
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(item.id);
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors ml-auto"
                      >
                        <X size={16} />
                        Descartar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {pendingContent.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
                  <Sparkles size={40} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No hay contenido pendiente de aprobación</p>
                  <button className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800">
                    Generar nuevo contenido
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Semana 23-29 Diciembre</h3>
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ChevronLeft size={20} className="text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ChevronRight size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {WEEKLY_SCHEDULE.map((day) => (
                  <div
                    key={day.day}
                    className={`p-3 rounded-lg text-center border ${
                      day.status === 'empty'
                        ? 'border-dashed border-gray-200 bg-gray-50'
                        : day.status === 'published'
                        ? 'border-blue-200 bg-blue-50'
                        : day.status === 'scheduled'
                        ? 'border-green-200 bg-green-50'
                        : 'border-yellow-200 bg-yellow-50'
                    }`}
                  >
                    <p className="text-xs text-gray-500 font-medium">{day.day}</p>
                    <p className="text-lg font-bold text-gray-900">{day.date}</p>
                    {day.posts > 0 && (
                      <div className="mt-2">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                          day.status === 'published'
                            ? 'bg-blue-500 text-white'
                            : day.status === 'scheduled'
                            ? 'bg-green-500 text-white'
                            : 'bg-yellow-500 text-white'
                        }`}>
                          {day.posts}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  Publicado
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  Programado
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  Pendiente
                </span>
              </div>
            </div>
          )}

          {activeTab === 'published' && (
            <div className="space-y-4">
              {publishedContent.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                      {item.product.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Publicado el {new Date(item.scheduledDate).toLocaleDateString('es-AR')}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {item.platforms.map((p) => (
                            <span key={p} className="p-1 bg-gray-50 rounded">
                              {platformIcons[p]}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {item.metrics && (
                        <div className="mt-3 grid grid-cols-5 gap-2">
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <p className="text-lg font-bold text-gray-900">{(item.metrics.reach / 1000).toFixed(1)}K</p>
                            <p className="text-[10px] text-gray-500">Alcance</p>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <p className="text-lg font-bold text-gray-900">{item.metrics.engagement}%</p>
                            <p className="text-[10px] text-gray-500">Eng. Rate</p>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <p className="text-lg font-bold text-gray-900">{item.metrics.likes}</p>
                            <p className="text-[10px] text-gray-500">Likes</p>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <p className="text-lg font-bold text-gray-900">{item.metrics.comments}</p>
                            <p className="text-[10px] text-gray-500">Comentarios</p>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <p className="text-lg font-bold text-gray-900">{item.metrics.shares}</p>
                            <p className="text-[10px] text-gray-500">Compartidos</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preview Panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Vista Previa</h3>
            
            {selectedContent ? (
              <div className="space-y-4">
                {/* Phone mockup */}
                <div className="bg-gray-900 rounded-3xl p-2 max-w-[280px] mx-auto">
                  <div className="bg-white rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-3 border-b">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full"></div>
                        <span className="text-xs font-semibold">infopartes.st</span>
                      </div>
                      <MoreVertical size={16} className="text-gray-400" />
                    </div>
                    
                    {/* Image */}
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl">
                      {selectedContent.product.image}
                    </div>
                    
                    {/* Actions */}
                    <div className="p-3">
                      <div className="flex items-center gap-4 mb-2">
                        <Heart size={20} className="text-gray-700" />
                        <MessageCircle size={20} className="text-gray-700" />
                        <Share2 size={20} className="text-gray-700" />
                      </div>
                      <p className="text-xs text-gray-900 line-clamp-3">
                        <span className="font-semibold">infopartes.st</span>{' '}
                        {selectedContent.caption.split('\n')[0]}
                      </p>
                      <p className="text-[10px] text-blue-500 mt-1">
                        {selectedContent.hashtags.slice(0, 3).join(' ')}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Details */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Caption completo:</p>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
                      {selectedContent.caption}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Hashtags:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedContent.hashtags.map((tag) => (
                        <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-1">CTA:</p>
                    <span className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-lg inline-block">
                      {selectedContent.cta}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Eye size={40} className="text-gray-300 mx-auto mb-4" />
                <p className="text-sm text-gray-500">Selecciona un contenido para ver la vista previa</p>
              </div>
            )}
          </div>
          
          {/* Quick Stats */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Mejor Rendimiento</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-xl">💻</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Reparación MacBook</p>
                  <p className="text-xs text-gray-500">2.4K alcance • 8.2% eng</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-xl">📱</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Pantalla iPhone 14</p>
                  <p className="text-xs text-gray-500">1.8K alcance • 7.1% eng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
