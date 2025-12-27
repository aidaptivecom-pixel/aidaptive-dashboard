import React, { useState, useRef } from 'react';
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
  MoreVertical,
  Image,
  Loader2,
  Wand2,
  Trash2,
  Plus,
  Palette,
  Zap,
  Minimize2,
  Sun
} from 'lucide-react';

type ContentStatus = 'pending' | 'approved' | 'published' | 'rejected';
type Platform = 'instagram' | 'facebook' | 'tiktok';
type ContentType = 'feed' | 'story' | 'reel' | 'carousel';
type GenerationStatus = 'idle' | 'uploading' | 'generating' | 'complete';

interface StyleOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

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
  selectedStyle: string;
  gradient: string;
  metrics?: {
    reach: number;
    engagement: number;
    likes: number;
    comments: number;
    shares: number;
  };
}

const STYLE_OPTIONS: StyleOption[] = [
  { 
    id: 'producto', 
    name: 'Producto Destacado', 
    description: 'Fondo limpio, producto centrado',
    icon: <Sun size={20} />,
    gradient: 'from-blue-500 to-cyan-400'
  },
  { 
    id: 'gaming', 
    name: 'Gaming RGB', 
    description: 'Estilo gamer con luces y colores',
    icon: <Zap size={20} />,
    gradient: 'from-purple-600 to-pink-500'
  },
  { 
    id: 'minimal', 
    name: 'Minimalista', 
    description: 'Elegante, fondos oscuros',
    icon: <Minimize2 size={20} />,
    gradient: 'from-gray-700 to-gray-900'
  },
  { 
    id: 'promo', 
    name: 'Promocional', 
    description: 'Llamativo, ideal para ofertas',
    icon: <Palette size={20} />,
    gradient: 'from-orange-500 to-red-500'
  },
];

const MOCK_CONTENT: ContentPiece[] = [
  {
    id: '1',
    product: {
      name: 'RTX 4070 Super 12GB',
      sku: 'GPU-4070S-12G',
      price: 890000,
      image: '🎮'
    },
    type: 'feed',
    platforms: ['instagram', 'facebook'],
    status: 'pending',
    caption: '🚀 ¡La RTX 4070 SUPER ya está en stock!\n\n⚡ 12GB GDDR6X\n🎮 Ray Tracing de última generación\n💰 $890.000\n🚚 Envíos a todo el país\n\n¡Consultanos por WhatsApp!',
    hashtags: ['#RTX4070', '#Gaming', '#PCGamer', '#NVIDIA', '#BuenosAires'],
    cta: 'Consultar por WhatsApp',
    scheduledDate: '2025-12-27',
    scheduledTime: '10:00',
    selectedStyle: 'gaming',
    gradient: 'from-purple-600 to-pink-500'
  },
  {
    id: '2',
    product: {
      name: 'RAM DDR5 32GB Kit',
      sku: 'RAM-DDR5-32K',
      price: 185000,
      image: '💾'
    },
    type: 'reel',
    platforms: ['instagram', 'tiktok'],
    status: 'pending',
    caption: '⚡ Kit RAM DDR5 32GB (2x16GB)\n\n🔥 5600MHz CL36\n✅ Compatibilidad Intel y AMD\n💰 $185.000\n\n¡Llevá tu PC al siguiente nivel!',
    hashtags: ['#RAM', '#DDR5', '#PCGamer', '#Hardware', '#TechArgentina'],
    cta: 'Ver disponibilidad',
    scheduledDate: '2025-12-28',
    scheduledTime: '14:00',
    selectedStyle: 'producto',
    gradient: 'from-blue-500 to-cyan-400'
  },
  {
    id: '3',
    product: {
      name: 'Monitor LG 27" 165Hz',
      sku: 'MON-LG27-165',
      price: 420000,
      image: '🖥️'
    },
    type: 'story',
    platforms: ['instagram', 'facebook'],
    status: 'approved',
    caption: '🖥️ Monitor LG UltraGear 27"\n\n⚡ 165Hz IPS\n🎨 99% sRGB\n📦 Stock disponible\n🚚 Envíos a todo el país',
    hashtags: ['#Monitor', '#Gaming', '#LG', '#UltraGear'],
    cta: 'Ver en tienda',
    scheduledDate: '2025-12-27',
    scheduledTime: '18:00',
    selectedStyle: 'minimal',
    gradient: 'from-gray-700 to-gray-900'
  },
  {
    id: '4',
    product: {
      name: 'PC Armada Gamer Pro',
      sku: 'PC-GAMER-PRO',
      price: 2450000,
      image: '🖥️'
    },
    type: 'carousel',
    platforms: ['instagram'],
    status: 'published',
    caption: '🔥 PC GAMER PRO - Lista para jugar\n\n✅ RTX 4070 Ti\n✅ Intel i7-14700K\n✅ 32GB DDR5\n✅ 1TB NVMe\n\n📍 Retiro por local o envío\n📱 Consultanos por WhatsApp',
    hashtags: ['#PCGamer', '#Gaming', '#RTX4070Ti', '#Intel', '#Armado'],
    cta: 'Solicitar cotización',
    scheduledDate: '2025-12-26',
    scheduledTime: '12:00',
    selectedStyle: 'promo',
    gradient: 'from-orange-500 to-red-500',
    metrics: {
      reach: 3850,
      engagement: 9.4,
      likes: 287,
      comments: 45,
      shares: 23
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
  const [activeTab, setActiveTab] = useState<'generate' | 'pending' | 'calendar' | 'published'>('generate');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>('idle');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<{
    gradient: string;
    caption: string;
    hashtags: string[];
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pendingContent = content.filter(c => c.status === 'pending');
  const approvedContent = content.filter(c => c.status === 'approved');
  const publishedContent = content.filter(c => c.status === 'published');

  const handleApprove = (id: string) => {
    setContent(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' as ContentStatus } : c));
  };

  const handleReject = (id: string) => {
    setContent(prev => prev.map(c => c.id === id ? { ...c, status: 'rejected' as ContentStatus } : c));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleImageUpload = (file: File) => {
    setGenerationStatus('uploading');
    const reader = new FileReader();
    reader.onload = (e) => {
      setTimeout(() => {
        setUploadedImage(e.target?.result as string);
        setGenerationStatus('idle');
        setSelectedStyle(null);
        setGeneratedContent(null);
      }, 500);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateStyle = (styleId: string) => {
    const style = STYLE_OPTIONS.find(s => s.id === styleId);
    if (!style) return;
    
    setSelectedStyle(styleId);
    setGenerationStatus('generating');
    
    // Simulate AI generation for this specific style
    setTimeout(() => {
      setGeneratedContent({
        gradient: style.gradient,
        caption: '🚀 ¡Nuevo producto en stock!\n\n⚡ Calidad premium\n💰 Mejor precio garantizado\n🚚 Envío a todo el país\n\n¡Consultanos por WhatsApp!',
        hashtags: ['#TechArgentina', '#Gaming', '#PCGamer', '#Hardware', '#Ofertas'],
      });
      setGenerationStatus('complete');
    }, 2000);
  };

  const handleClearUpload = () => {
    setUploadedImage(null);
    setGeneratedContent(null);
    setGenerationStatus('idle');
    setSelectedStyle(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleApproveGenerated = () => {
    if (!generatedContent) return;
    
    const newContent: ContentPiece = {
      id: String(Date.now()),
      product: {
        name: 'Nuevo Producto',
        sku: 'NEW-001',
        price: 100000,
        image: '📦'
      },
      type: 'feed',
      platforms: ['instagram', 'facebook'],
      status: 'approved',
      caption: generatedContent.caption,
      hashtags: generatedContent.hashtags,
      cta: 'Consultar por WhatsApp',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '10:00',
      selectedStyle: selectedStyle || 'producto',
      gradient: generatedContent.gradient
    };
    
    setContent(prev => [newContent, ...prev]);
    handleClearUpload();
    setActiveTab('pending');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contenido</h1>
          <p className="text-sm text-gray-500">Genera y gestiona contenido para redes sociales con IA</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
            <Calendar size={16} />
            Ver Calendario
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
          <p className="text-2xl font-bold text-gray-900">18.2K</p>
          <p className="text-xs text-green-600">+24% vs semana anterior</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Engagement Rate</span>
            <Heart size={16} className="text-pink-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">7.8%</p>
          <p className="text-xs text-green-600">+1.2% vs semana anterior</p>
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
          <p className="text-2xl font-bold text-gray-900">156</p>
          <p className="text-xs text-green-600">+32% vs semana anterior</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white rounded-xl p-1 border border-gray-100 w-fit">
        <button
          onClick={() => setActiveTab('generate')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'generate' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Wand2 size={16} />
          Generar con IA
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'pending' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Pendientes ({pendingContent.length})
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'calendar' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Calendario
        </button>
        <button
          onClick={() => setActiveTab('published')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'published' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Publicados ({publishedContent.length})
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab === 'generate' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Upload + Style Selection */}
          <div className="space-y-4">
            {/* Upload Section */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Image size={20} />
                Imagen de Referencia
              </h3>
              
              {!uploadedImage ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    isDragging 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {generationStatus === 'uploading' ? (
                    <div className="flex flex-col items-center">
                      <Loader2 size={40} className="text-blue-500 animate-spin mb-3" />
                      <p className="text-gray-600 font-medium">Subiendo imagen...</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Plus size={28} className="text-gray-400" />
                      </div>
                      <p className="text-gray-700 font-medium mb-1">Arrastrá una imagen o hacé click</p>
                      <p className="text-sm text-gray-500">PNG, JPG hasta 10MB</p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="flex gap-4">
                  {/* Square preview */}
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img 
                      src={uploadedImage} 
                      alt="Imagen subida" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={handleClearUpload}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">Imagen cargada correctamente</p>
                    <p className="text-xs text-gray-400">Seleccioná un estilo para generar el contenido</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Style Selection */}
            {uploadedImage && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Palette size={20} />
                  Elegí un Estilo
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {STYLE_OPTIONS.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleGenerateStyle(style.id)}
                      disabled={generationStatus === 'generating'}
                      className={`relative p-4 rounded-xl border-2 text-left transition-all disabled:opacity-50 ${
                        selectedStyle === style.id
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${style.gradient} flex items-center justify-center text-white mb-3`}>
                        {style.icon}
                      </div>
                      <p className="font-medium text-gray-900 text-sm">{style.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{style.description}</p>
                      
                      {selectedStyle === style.id && generationStatus === 'generating' && (
                        <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
                          <Loader2 size={24} className="text-gray-600 animate-spin" />
                        </div>
                      )}
                      
                      {selectedStyle === style.id && generationStatus === 'complete' && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tips */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100 p-4">
              <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                <Sparkles size={16} />
                Tips para mejores resultados
              </h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Usá fotos de producto con fondo limpio</li>
                <li>• Buena iluminación mejora los resultados</li>
                <li>• Resolución mínima recomendada: 1080x1080</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Preview & Actions */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Eye size={20} />
                Vista Previa
              </h3>
              
              {generatedContent ? (
                <div className="space-y-4">
                  {/* Phone mockup */}
                  <div className="bg-gray-900 rounded-3xl p-2 max-w-[300px] mx-auto">
                    <div className="bg-white rounded-2xl overflow-hidden">
                      {/* Header */}
                      <div className="flex items-center justify-between p-3 border-b">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
                          <span className="text-xs font-semibold">infopartes.st</span>
                        </div>
                        <MoreVertical size={16} className="text-gray-400" />
                      </div>
                      
                      {/* Generated Image */}
                      <div className={`aspect-square bg-gradient-to-br ${generatedContent.gradient} flex items-center justify-center relative`}>
                        {uploadedImage && (
                          <img 
                            src={uploadedImage} 
                            alt="Preview" 
                            className="absolute inset-4 w-auto h-auto max-w-[70%] max-h-[70%] object-contain mx-auto my-auto rounded-lg shadow-2xl"
                          />
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="p-3">
                        <div className="flex items-center gap-4 mb-2">
                          <Heart size={22} className="text-gray-700" />
                          <MessageCircle size={22} className="text-gray-700" />
                          <Share2 size={22} className="text-gray-700" />
                        </div>
                        <p className="text-xs text-gray-900 line-clamp-3">
                          <span className="font-semibold">infopartes.st</span>{' '}
                          {generatedContent.caption.split('\n')[0]}
                        </p>
                        <p className="text-[10px] text-blue-500 mt-1">
                          {generatedContent.hashtags.slice(0, 3).join(' ')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Caption preview */}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Caption generado:</p>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap max-h-24 overflow-y-auto">
                      {generatedContent.caption}
                    </p>
                  </div>
                  
                  {/* Hashtags */}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Hashtags:</p>
                    <div className="flex flex-wrap gap-1">
                      {generatedContent.hashtags.map((tag) => (
                        <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    <button 
                      onClick={handleApproveGenerated}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      <Check size={18} />
                      Aprobar y Programar
                    </button>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => selectedStyle && handleGenerateStyle(selectedStyle)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      >
                        <RefreshCw size={16} />
                        Regenerar
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                        <Edit3 size={16} />
                        Editar
                      </button>
                    </div>
                    <button 
                      onClick={handleClearUpload}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
                    >
                      <X size={16} />
                      Descartar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Image size={32} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-1">Sin vista previa</p>
                  <p className="text-sm text-gray-400">
                    {!uploadedImage 
                      ? 'Subí una imagen para comenzar' 
                      : 'Seleccioná un estilo para generar'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pending' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content List */}
          <div className="lg:col-span-2 space-y-4">
            {pendingContent.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all"
              >
                <div className="p-4">
                  <div className="flex gap-4">
                    {/* Image Preview */}
                    <div className={`w-28 h-28 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center text-4xl flex-shrink-0`}>
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
                  
                  {/* Actions */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      <Check size={16} />
                      Aprobar
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                      <Edit3 size={16} />
                      Editar
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                      <RefreshCw size={16} />
                      Regenerar
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
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
                <button 
                  onClick={() => setActiveTab('generate')}
                  className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                >
                  Generar nuevo contenido
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Resumen</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pendientes</span>
                  <span className="text-sm font-bold text-yellow-600">{pendingContent.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Aprobados</span>
                  <span className="text-sm font-bold text-green-600">{approvedContent.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Publicados</span>
                  <span className="text-sm font-bold text-blue-600">{publishedContent.length}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100 p-4">
              <h4 className="font-medium text-purple-900 mb-2">Próxima publicación</h4>
              {approvedContent.length > 0 ? (
                <div>
                  <p className="text-sm text-purple-800 font-medium">{approvedContent[0].product.name}</p>
                  <p className="text-xs text-purple-600 mt-1">
                    {new Date(approvedContent[0].scheduledDate).toLocaleDateString('es-AR')} a las {approvedContent[0].scheduledTime}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-purple-700">No hay publicaciones programadas</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'calendar' && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900 text-lg">Semana 23-29 Diciembre</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronLeft size={20} className="text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronRight size={20} className="text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-4">
            {WEEKLY_SCHEDULE.map((day) => (
              <div
                key={day.day}
                className={`p-4 rounded-xl text-center border-2 transition-all cursor-pointer hover:shadow-md ${
                  day.status === 'empty'
                    ? 'border-dashed border-gray-200 bg-gray-50 hover:border-gray-300'
                    : day.status === 'published'
                    ? 'border-blue-200 bg-blue-50 hover:border-blue-300'
                    : day.status === 'scheduled'
                    ? 'border-green-200 bg-green-50 hover:border-green-300'
                    : 'border-yellow-200 bg-yellow-50 hover:border-yellow-300'
                }`}
              >
                <p className="text-sm text-gray-500 font-medium">{day.day}</p>
                <p className="text-2xl font-bold text-gray-900 my-2">{day.date}</p>
                {day.posts > 0 ? (
                  <div className="mt-2">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                      day.status === 'published'
                        ? 'bg-blue-500 text-white'
                        : day.status === 'scheduled'
                        ? 'bg-green-500 text-white'
                        : 'bg-yellow-500 text-white'
                    }`}>
                      {day.posts}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">posts</p>
                  </div>
                ) : (
                  <div className="mt-2">
                    <button className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors mx-auto">
                      <Plus size={16} className="text-gray-400" />
                    </button>
                    <p className="text-xs text-gray-400 mt-1">Agregar</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-6 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-blue-500"></span>
              Publicado
            </span>
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-green-500"></span>
              Programado
            </span>
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
              Pendiente
            </span>
          </div>
        </div>
      )}

      {activeTab === 'published' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {publishedContent.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`aspect-video bg-gradient-to-br ${item.gradient} flex items-center justify-center text-5xl`}>
                {item.product.image}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
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
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-lg font-bold text-gray-900">{(item.metrics.reach / 1000).toFixed(1)}K</p>
                      <p className="text-[10px] text-gray-500">Alcance</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-lg font-bold text-gray-900">{item.metrics.engagement}%</p>
                      <p className="text-[10px] text-gray-500">Engagement</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-lg font-bold text-gray-900">{item.metrics.likes}</p>
                      <p className="text-[10px] text-gray-500">Likes</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
