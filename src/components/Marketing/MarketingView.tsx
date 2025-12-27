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
  ShoppingBag,
  Smartphone,
  Gamepad2,
  FileText,
  Film,
  Type,
  Save,
  Upload
} from 'lucide-react';

type ContentStatus = 'pending' | 'approved' | 'published' | 'rejected';
type Platform = 'instagram' | 'facebook' | 'tiktok';
type ContentType = 'feed' | 'story' | 'reel' | 'carousel';
type GenerationStatus = 'idle' | 'uploading' | 'generating_image' | 'generating_caption' | 'complete';

interface StyleOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  preview: string;
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
    id: 'render', 
    name: 'Render Producto', 
    description: 'Fondo limpio, ideal para catálogo',
    icon: <ShoppingBag size={18} />,
    gradient: 'from-gray-100 to-white',
    preview: '⬜'
  },
  { 
    id: 'story', 
    name: 'Story Promo', 
    description: 'Banners promocionales',
    icon: <Smartphone size={18} />,
    gradient: 'from-red-500 to-orange-500',
    preview: '🔴'
  },
  { 
    id: 'gaming', 
    name: 'Gaming / Setup', 
    description: 'Ambiente gamer con RGB',
    icon: <Gamepad2 size={18} />,
    gradient: 'from-purple-600 to-pink-500',
    preview: '🟣'
  },
  { 
    id: 'specs', 
    name: 'Specs Técnicas', 
    description: 'Overlay con especificaciones',
    icon: <FileText size={18} />,
    gradient: 'from-blue-600 to-cyan-500',
    preview: '🔵'
  },
  { 
    id: 'reel', 
    name: 'Portada Reel', 
    description: 'Thumbnail para videos',
    icon: <Film size={18} />,
    gradient: 'from-violet-600 to-fuchsia-500',
    preview: '🟡'
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
    caption: '¡La RTX 4070 SUPER ya está en stock! 12GB GDDR6X con Ray Tracing de última generación. Envíos a todo el país.',
    hashtags: ['#RTX4070', '#Gaming', '#PCGamer'],
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
    type: 'story',
    platforms: ['instagram', 'tiktok'],
    status: 'pending',
    caption: 'Kit RAM DDR5 32GB (2x16GB) a 5600MHz. Compatibilidad total con Intel y AMD. Llevá tu PC al siguiente nivel.',
    hashtags: ['#RAM', '#DDR5', '#PCGamer'],
    cta: 'Ver disponibilidad',
    scheduledDate: '2025-12-28',
    scheduledTime: '14:00',
    selectedStyle: 'render',
    gradient: 'from-gray-100 to-white'
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
    caption: 'Monitor LG UltraGear 27" con 165Hz IPS y 99% sRGB. Stock disponible con envíos a todo el país.',
    hashtags: ['#Monitor', '#Gaming', '#LG'],
    cta: 'Ver en tienda',
    scheduledDate: '2025-12-27',
    scheduledTime: '18:00',
    selectedStyle: 'specs',
    gradient: 'from-blue-600 to-cyan-500'
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
    caption: 'PC GAMER PRO lista para jugar. RTX 4070 Ti, Intel i7-14700K, 32GB DDR5 y 1TB NVMe. Retiro por local o envío.',
    hashtags: ['#PCGamer', '#Gaming', '#RTX4070Ti'],
    cta: 'Solicitar cotización',
    scheduledDate: '2025-12-26',
    scheduledTime: '12:00',
    selectedStyle: 'story',
    gradient: 'from-red-500 to-orange-500',
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

// Sample captions for different styles
const SAMPLE_CAPTIONS: Record<string, string[]> = {
  render: [
    'Disponible en stock. Calidad premium garantizada. Envíos a todo el país.',
    'Nuevo ingreso. Consultá precio y disponibilidad por WhatsApp.',
    'Stock limitado. Aprovechá el mejor precio del mercado.',
  ],
  story: [
    '¡OFERTA ESPECIAL! Solo por tiempo limitado. No te lo pierdas.',
    '🔥 PROMO NAVIDAD 🔥 Descuentos increíbles en toda la tienda.',
    '⚡ BLACK FRIDAY ⚡ Los mejores precios del año están acá.',
  ],
  gaming: [
    'Llevá tu setup al siguiente nivel. Rendimiento extremo para gamers exigentes.',
    'RGB + Potencia. Todo lo que necesitás para dominar en cada partida.',
    'El upgrade que tu PC estaba esperando. Performance sin límites.',
  ],
  specs: [
    'Especificaciones de alto nivel. Rendimiento comprobado en benchmarks.',
    'Características técnicas que marcan la diferencia. Calidad profesional.',
    'Specs que hablan por sí solas. Tecnología de última generación.',
  ],
  reel: [
    '¿Ya viste esto? El producto que todos están buscando.',
    'POV: Cuando llega tu nuevo hardware 📦',
    'Unboxing del producto más pedido de la semana.',
  ],
};

export const MarketingView: React.FC = () => {
  const [content, setContent] = useState<ContentPiece[]>(MOCK_CONTENT);
  const [activeTab, setActiveTab] = useState<'generate' | 'pending' | 'calendar' | 'published'>('generate');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [promoText, setPromoText] = useState<string>('');
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>('idle');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<{
    gradient: string;
    caption: string;
    styleName: string;
  } | null>(null);
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [editedCaption, setEditedCaption] = useState('');
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
        setIsEditingCaption(false);
      }, 500);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateStyle = (styleId: string) => {
    const style = STYLE_OPTIONS.find(s => s.id === styleId);
    if (!style) return;
    
    setSelectedStyle(styleId);
    setGenerationStatus('generating_image');
    setIsEditingCaption(false);
    
    // Simulate AI generation
    setTimeout(() => {
      const captions = SAMPLE_CAPTIONS[styleId] || SAMPLE_CAPTIONS['render'];
      const randomCaption = captions[Math.floor(Math.random() * captions.length)];
      
      // Include promo text if provided
      const finalCaption = promoText 
        ? `${promoText.toUpperCase()} - ${randomCaption}`
        : randomCaption;
      
      setGeneratedContent({
        gradient: style.gradient,
        caption: finalCaption,
        styleName: style.name,
      });
      setEditedCaption(finalCaption);
      setGenerationStatus('complete');
    }, 2000);
  };

  const handleRegenerateImage = () => {
    if (!selectedStyle) return;
    const style = STYLE_OPTIONS.find(s => s.id === selectedStyle);
    if (!style) return;
    
    setGenerationStatus('generating_image');
    
    setTimeout(() => {
      // Keep same caption, just "regenerate" the image (change gradient slightly for demo)
      const gradients = [
        'from-purple-600 to-pink-500',
        'from-blue-600 to-cyan-500',
        'from-red-500 to-orange-500',
        'from-green-500 to-teal-500',
        'from-violet-600 to-fuchsia-500',
      ];
      const newGradient = gradients[Math.floor(Math.random() * gradients.length)];
      
      setGeneratedContent(prev => prev ? {
        ...prev,
        gradient: newGradient,
      } : null);
      setGenerationStatus('complete');
    }, 1500);
  };

  const handleRegenerateCaption = () => {
    if (!selectedStyle) return;
    
    setGenerationStatus('generating_caption');
    
    setTimeout(() => {
      const captions = SAMPLE_CAPTIONS[selectedStyle] || SAMPLE_CAPTIONS['render'];
      const randomCaption = captions[Math.floor(Math.random() * captions.length)];
      const finalCaption = promoText 
        ? `${promoText.toUpperCase()} - ${randomCaption}`
        : randomCaption;
      
      setGeneratedContent(prev => prev ? {
        ...prev,
        caption: finalCaption,
      } : null);
      setEditedCaption(finalCaption);
      setGenerationStatus('complete');
    }, 1000);
  };

  const handleSaveCaption = () => {
    setGeneratedContent(prev => prev ? {
      ...prev,
      caption: editedCaption,
    } : null);
    setIsEditingCaption(false);
  };

  const handleClearUpload = () => {
    setUploadedImage(null);
    setPromoText('');
    setGeneratedContent(null);
    setGenerationStatus('idle');
    setSelectedStyle(null);
    setIsEditingCaption(false);
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
      type: selectedStyle === 'story' ? 'story' : selectedStyle === 'reel' ? 'reel' : 'feed',
      platforms: ['instagram', 'facebook'],
      status: 'approved',
      caption: generatedContent.caption,
      hashtags: [],
      cta: 'Consultar por WhatsApp',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '10:00',
      selectedStyle: selectedStyle || 'render',
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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column: Configuration - 3 cols */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              {/* Step 1: Upload */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">1</div>
                  <h3 className="font-semibold text-gray-900">Subir imagen del producto</h3>
                </div>
                
                {!uploadedImage ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
                      isDragging 
                        ? 'border-gray-900 bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {generationStatus === 'uploading' ? (
                      <div className="flex flex-col items-center">
                        <Loader2 size={36} className="text-gray-400 animate-spin mb-3" />
                        <p className="text-gray-600 font-medium">Subiendo imagen...</p>
                      </div>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Upload size={28} className="text-gray-400" />
                        </div>
                        <p className="text-gray-700 font-medium mb-1">Arrastrá una imagen o hacé click para subir</p>
                        <p className="text-sm text-gray-400">PNG, JPG hasta 10MB</p>
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
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white border border-gray-200 flex-shrink-0">
                      <img 
                        src={uploadedImage} 
                        alt="Imagen subida" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">Imagen cargada</p>
                      <p className="text-sm text-gray-500">Lista para generar</p>
                    </div>
                    <button
                      onClick={handleClearUpload}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Step 2: Promo Text */}
              <div className={`mb-8 transition-opacity ${uploadedImage ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${uploadedImage ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-400'}`}>2</div>
                  <h3 className="font-semibold text-gray-900">Texto promocional <span className="text-gray-400 font-normal text-sm">(opcional)</span></h3>
                </div>
                <input
                  type="text"
                  value={promoText}
                  onChange={(e) => setPromoText(e.target.value)}
                  placeholder="Ej: NAVIDAD, 25% OFF, BLACK FRIDAY..."
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:text-gray-400"
                />
              </div>
              
              {/* Step 3: Style Selection - Grid */}
              <div className={`transition-opacity ${uploadedImage ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${uploadedImage ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-400'}`}>3</div>
                  <h3 className="font-semibold text-gray-900">Elegir estilo</h3>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {STYLE_OPTIONS.map((style) => {
                    const isSelected = selectedStyle === style.id;
                    const isLoading = isSelected && (generationStatus === 'generating_image' || generationStatus === 'generating_caption');
                    const isComplete = isSelected && generationStatus === 'complete';
                    
                    return (
                      <button
                        key={style.id}
                        onClick={() => handleGenerateStyle(style.id)}
                        disabled={!uploadedImage || generationStatus === 'generating_image' || generationStatus === 'generating_caption'}
                        className={`relative p-4 rounded-xl border-2 text-left transition-all disabled:cursor-not-allowed group ${
                          isSelected
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {/* Style Preview */}
                        <div className={`w-full aspect-[4/3] rounded-lg bg-gradient-to-br ${style.gradient} mb-3 flex items-center justify-center relative overflow-hidden ${style.id === 'render' ? 'border border-gray-200' : ''}`}>
                          <div className="text-3xl opacity-60">📦</div>
                          {isLoading && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <Loader2 size={24} className="text-white animate-spin" />
                            </div>
                          )}
                          {isComplete && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <Check size={14} className="text-white" />
                            </div>
                          )}
                        </div>
                        
                        {/* Style Info */}
                        <p className="font-medium text-gray-900 text-sm mb-0.5">{style.name}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{style.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Preview - 2 cols */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Eye size={18} />
                Vista Previa
              </h3>
              
              {generatedContent ? (
                <div className="space-y-4">
                  {/* Phone mockup - smaller */}
                  <div className="bg-gray-900 rounded-[28px] p-2 max-w-[280px] mx-auto">
                    <div className="bg-white rounded-[22px] overflow-hidden">
                      {/* Header */}
                      <div className="flex items-center justify-between px-3 py-2 border-b">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
                          <span className="text-[11px] font-semibold">infopartes.st</span>
                        </div>
                        <MoreVertical size={14} className="text-gray-400" />
                      </div>
                      
                      {/* Generated Image */}
                      <div className={`aspect-square bg-gradient-to-br ${generatedContent.gradient} flex items-center justify-center relative`}>
                        {generationStatus === 'generating_image' ? (
                          <Loader2 size={32} className="text-white/80 animate-spin" />
                        ) : (
                          <>
                            {uploadedImage && (
                              <img 
                                src={uploadedImage} 
                                alt="Preview" 
                                className="absolute inset-4 w-auto h-auto max-w-[65%] max-h-[65%] object-contain mx-auto my-auto rounded-lg shadow-2xl"
                              />
                            )}
                            {promoText && (
                              <div className="absolute bottom-3 left-3 right-3 bg-black/70 text-white text-center py-1.5 px-2 rounded-lg">
                                <p className="font-bold text-xs">{promoText.toUpperCase()}</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="p-3">
                        <div className="flex items-center gap-3 mb-2">
                          <Heart size={18} className="text-gray-700" />
                          <MessageCircle size={18} className="text-gray-700" />
                          <Share2 size={18} className="text-gray-700" />
                        </div>
                        <p className="text-[11px] text-gray-900 line-clamp-2">
                          <span className="font-semibold">infopartes.st</span>{' '}
                          {generatedContent.caption.substring(0, 60)}...
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Style badge */}
                  <div className="flex items-center justify-center">
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {generatedContent.styleName}
                    </span>
                  </div>
                  
                  {/* Caption */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-gray-500">Caption</p>
                      {!isEditingCaption && (
                        <button 
                          onClick={() => setIsEditingCaption(true)}
                          className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1"
                        >
                          <Edit3 size={12} />
                          Editar
                        </button>
                      )}
                    </div>
                    
                    {isEditingCaption ? (
                      <div className="space-y-2">
                        <textarea
                          value={editedCaption}
                          onChange={(e) => setEditedCaption(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <button 
                            onClick={handleSaveCaption}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-800"
                          >
                            <Save size={12} />
                            Guardar
                          </button>
                          <button 
                            onClick={() => {
                              setIsEditingCaption(false);
                              setEditedCaption(generatedContent.caption);
                            }}
                            className="px-3 py-1.5 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-100"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700">{generatedContent.caption}</p>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <button 
                      onClick={handleApproveGenerated}
                      disabled={isEditingCaption}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      <Check size={18} />
                      Aprobar y Programar
                    </button>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={handleRegenerateImage}
                        disabled={generationStatus === 'generating_image' || generationStatus === 'generating_caption' || isEditingCaption}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                      >
                        {generationStatus === 'generating_image' ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <RefreshCw size={14} />
                        )}
                        Imagen
                      </button>
                      <button 
                        onClick={handleRegenerateCaption}
                        disabled={generationStatus === 'generating_image' || generationStatus === 'generating_caption' || isEditingCaption}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                      >
                        {generationStatus === 'generating_caption' ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <RefreshCw size={14} />
                        )}
                        Caption
                      </button>
                    </div>
                    
                    <button 
                      onClick={handleClearUpload}
                      disabled={isEditingCaption}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      <X size={16} />
                      Descartar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                    <Sparkles size={28} className="text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium mb-1">
                    {!uploadedImage ? 'Subí una imagen' : 'Elegí un estilo'}
                  </p>
                  <p className="text-sm text-gray-400">
                    {!uploadedImage 
                      ? 'para comenzar a generar' 
                      : 'para ver la vista previa'
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
                        {item.caption}
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
