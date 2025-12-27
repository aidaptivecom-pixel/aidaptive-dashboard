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
  Loader2,
  Wand2,
  Trash2,
  Plus,
  Save,
  ChevronDown,
  ImageIcon
} from 'lucide-react';

type ContentStatus = 'pending' | 'approved' | 'published' | 'rejected';
type Platform = 'instagram' | 'facebook' | 'tiktok';
type ContentType = 'feed' | 'story' | 'reel' | 'carousel';
type GenerationStatus = 'idle' | 'uploading' | 'generating' | 'complete';

interface StyleOption {
  id: string;
  name: string;
  description: string;
  gradient: string;
  bgClass: string;
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
    id: 'minimal', 
    name: 'Minimal', 
    description: 'Fondo limpio y profesional',
    gradient: 'from-gray-50 to-white',
    bgClass: 'bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200'
  },
  { 
    id: 'vibrant', 
    name: 'Vibrant', 
    description: 'Colores llamativos para promociones',
    gradient: 'from-orange-500 to-pink-500',
    bgClass: 'bg-gradient-to-br from-orange-500 to-pink-500'
  },
  { 
    id: 'neon', 
    name: 'Neon', 
    description: 'Estilo gaming con RGB',
    gradient: 'from-purple-600 to-cyan-400',
    bgClass: 'bg-gradient-to-br from-purple-600 to-cyan-400'
  },
  { 
    id: 'ocean', 
    name: 'Ocean', 
    description: 'Tonos azules profesionales',
    gradient: 'from-blue-600 to-teal-400',
    bgClass: 'bg-gradient-to-br from-blue-600 to-teal-400'
  },
  { 
    id: 'sunset', 
    name: 'Sunset', 
    description: 'Cálido y atractivo',
    gradient: 'from-amber-500 to-rose-500',
    bgClass: 'bg-gradient-to-br from-amber-500 to-rose-500'
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
    caption: '¡La RTX 4070 SUPER ya está en stock! 12GB GDDR6X con Ray Tracing de última generación.',
    hashtags: ['#RTX4070', '#Gaming', '#PCGamer'],
    cta: 'Consultar por WhatsApp',
    scheduledDate: '2025-12-27',
    scheduledTime: '10:00',
    selectedStyle: 'neon',
    gradient: 'from-purple-600 to-cyan-400'
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
    caption: 'Kit RAM DDR5 32GB (2x16GB) a 5600MHz. Compatibilidad total con Intel y AMD.',
    hashtags: ['#RAM', '#DDR5', '#PCGamer'],
    cta: 'Ver disponibilidad',
    scheduledDate: '2025-12-28',
    scheduledTime: '14:00',
    selectedStyle: 'minimal',
    gradient: 'from-gray-50 to-white'
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
    caption: 'Monitor LG UltraGear 27" con 165Hz IPS y 99% sRGB.',
    hashtags: ['#Monitor', '#Gaming', '#LG'],
    cta: 'Ver en tienda',
    scheduledDate: '2025-12-27',
    scheduledTime: '18:00',
    selectedStyle: 'ocean',
    gradient: 'from-blue-600 to-teal-400'
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
    caption: 'PC GAMER PRO lista para jugar. RTX 4070 Ti, Intel i7-14700K, 32GB DDR5.',
    hashtags: ['#PCGamer', '#Gaming', '#RTX4070Ti'],
    cta: 'Solicitar cotización',
    scheduledDate: '2025-12-26',
    scheduledTime: '12:00',
    selectedStyle: 'vibrant',
    gradient: 'from-orange-500 to-pink-500',
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
  pending: { label: 'Pendiente', color: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  approved: { label: 'Aprobado', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  published: { label: 'Publicado', color: 'bg-sky-50 text-sky-700 border-sky-200', dot: 'bg-sky-500' },
  rejected: { label: 'Descartado', color: 'bg-gray-50 text-gray-500 border-gray-200', dot: 'bg-gray-400' },
};

const typeLabels = {
  feed: 'Feed',
  story: 'Story',
  reel: 'Reel',
  carousel: 'Carrusel',
};

const SAMPLE_CAPTIONS: Record<string, string[]> = {
  minimal: [
    'Disponible en stock. Calidad premium garantizada.',
    'Nuevo ingreso. Consultá precio y disponibilidad.',
    'Stock limitado. El mejor precio del mercado.',
  ],
  vibrant: [
    '¡OFERTA ESPECIAL! Solo por tiempo limitado.',
    '🔥 Los mejores precios del año están acá.',
    '⚡ No te lo pierdas. Stock limitado.',
  ],
  neon: [
    'Llevá tu setup al siguiente nivel.',
    'RGB + Potencia. Dominá cada partida.',
    'El upgrade que tu PC necesita.',
  ],
  ocean: [
    'Tecnología de última generación.',
    'Rendimiento profesional garantizado.',
    'Calidad que marca la diferencia.',
  ],
  sunset: [
    'Dale vida a tu espacio de trabajo.',
    'Diseño y performance en uno.',
    'Elegí lo mejor para vos.',
  ],
};

export const MarketingView: React.FC = () => {
  const [content, setContent] = useState<ContentPiece[]>(MOCK_CONTENT);
  const [activeTab, setActiveTab] = useState<'generate' | 'pending' | 'calendar' | 'published'>('generate');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [promptInstructions, setPromptInstructions] = useState<string>('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>('idle');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const [generatedCaption, setGeneratedCaption] = useState<string>('');
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [editedCaption, setEditedCaption] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pendingContent = content.filter(c => c.status === 'pending');
  const approvedContent = content.filter(c => c.status === 'approved');
  const publishedContent = content.filter(c => c.status === 'published');

  // Get current style for preview (hovered or selected)
  const previewStyleId = hoveredStyle || selectedStyle;
  const previewStyle = STYLE_OPTIONS.find(s => s.id === previewStyleId);

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
        setGeneratedCaption('');
        setIsEditingCaption(false);
      }, 400);
    };
    reader.readAsDataURL(file);
  };

  const handleStyleSelect = (styleId: string) => {
    if (selectedStyle === styleId) return;
    
    setSelectedStyle(styleId);
    setGenerationStatus('generating');
    setIsEditingCaption(false);
    
    // Simulate AI generation
    setTimeout(() => {
      const captions = SAMPLE_CAPTIONS[styleId] || SAMPLE_CAPTIONS['minimal'];
      const randomCaption = captions[Math.floor(Math.random() * captions.length)];
      setGeneratedCaption(randomCaption);
      setEditedCaption(randomCaption);
      setGenerationStatus('complete');
    }, 1200);
  };

  const handleRegenerate = () => {
    if (!selectedStyle || isRegenerating) return;
    setIsRegenerating(true);
    
    setTimeout(() => {
      const captions = SAMPLE_CAPTIONS[selectedStyle] || SAMPLE_CAPTIONS['minimal'];
      const randomCaption = captions[Math.floor(Math.random() * captions.length)];
      setGeneratedCaption(randomCaption);
      setEditedCaption(randomCaption);
      setIsRegenerating(false);
    }, 1000);
  };

  const handleSaveCaption = () => {
    setGeneratedCaption(editedCaption);
    setIsEditingCaption(false);
  };

  const handleClearAll = () => {
    setUploadedImage(null);
    setPromptInstructions('');
    setShowInstructions(false);
    setGeneratedCaption('');
    setGenerationStatus('idle');
    setSelectedStyle(null);
    setHoveredStyle(null);
    setIsEditingCaption(false);
    setIsRegenerating(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleApproveGenerated = () => {
    if (!selectedStyle || !generatedCaption) return;
    
    const style = STYLE_OPTIONS.find(s => s.id === selectedStyle);
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
      caption: generatedCaption,
      hashtags: [],
      cta: 'Consultar por WhatsApp',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '10:00',
      selectedStyle: selectedStyle,
      gradient: style?.gradient || 'from-gray-100 to-white'
    };
    
    setContent(prev => [newContent, ...prev]);
    handleClearAll();
    setActiveTab('pending');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Contenido</h1>
          <p className="text-gray-500 mt-0.5">Generá contenido para redes con IA</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium">
          <Calendar size={16} />
          Calendario
        </button>
      </div>

      {/* KPIs - More compact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Alcance', value: '18.2K', change: '+24%', icon: TrendingUp, color: 'text-emerald-600' },
          { label: 'Engagement', value: '7.8%', change: '+1.2%', icon: Heart, color: 'text-pink-600' },
          { label: 'Programados', value: String(approvedContent.length + pendingContent.length), sub: `${pendingContent.length} pendientes`, icon: Calendar, color: 'text-sky-600' },
          { label: 'Clicks WA', value: '156', change: '+32%', icon: MessageCircle, color: 'text-emerald-600' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-500">{kpi.label}</span>
              <kpi.icon size={14} className={kpi.color} />
            </div>
            <p className="text-xl font-semibold text-gray-900">{kpi.value}</p>
            {kpi.change && <p className={`text-xs ${kpi.color}`}>{kpi.change}</p>}
            {kpi.sub && <p className="text-xs text-gray-400">{kpi.sub}</p>}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {[
          { id: 'generate', label: 'Crear', icon: Wand2 },
          { id: 'pending', label: `Pendientes (${pendingContent.length})` },
          { id: 'calendar', label: 'Calendario' },
          { id: 'published', label: `Publicados (${publishedContent.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.icon && <tab.icon size={15} />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Generate Tab - Premium redesign */}
      {activeTab === 'generate' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Upload + Styles */}
          <div className="space-y-5">
            {/* Upload Area */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {!uploadedImage ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative p-8 text-center cursor-pointer transition-all ${
                    isDragging 
                      ? 'bg-gray-50' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {generationStatus === 'uploading' ? (
                    <div className="py-8">
                      <Loader2 size={32} className="text-gray-400 animate-spin mx-auto mb-3" />
                      <p className="text-gray-600 font-medium">Subiendo...</p>
                    </div>
                  ) : (
                    <div className="py-4">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors ${
                        isDragging ? 'bg-gray-200' : 'bg-gray-100'
                      }`}>
                        <ImageIcon size={28} className="text-gray-400" />
                      </div>
                      <p className="text-gray-700 font-medium mb-1">
                        Arrastrá una imagen o hacé click
                      </p>
                      <p className="text-sm text-gray-400">PNG, JPG hasta 10MB</p>
                    </div>
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
                <div className="p-4">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                    <img 
                      src={uploadedImage} 
                      alt="Preview" 
                      className="w-full h-full object-contain"
                    />
                    <button
                      onClick={handleClearAll}
                      className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Style Selection */}
            <div className={`bg-white rounded-2xl border border-gray-100 p-5 transition-opacity ${
              uploadedImage ? 'opacity-100' : 'opacity-50 pointer-events-none'
            }`}>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Elegí un estilo</h3>
              
              <div className="flex gap-3 justify-between">
                {STYLE_OPTIONS.map((style) => {
                  const isSelected = selectedStyle === style.id;
                  const isHovered = hoveredStyle === style.id;
                  
                  return (
                    <button
                      key={style.id}
                      onClick={() => handleStyleSelect(style.id)}
                      onMouseEnter={() => setHoveredStyle(style.id)}
                      onMouseLeave={() => setHoveredStyle(null)}
                      disabled={!uploadedImage || generationStatus === 'generating'}
                      className="flex-1 group"
                    >
                      <div className={`relative aspect-square rounded-xl ${style.bgClass} transition-all duration-200 ${
                        isSelected 
                          ? 'ring-2 ring-gray-900 ring-offset-2 scale-105' 
                          : isHovered
                          ? 'ring-2 ring-gray-300 ring-offset-2 scale-105'
                          : 'hover:scale-105'
                      }`}>
                        {isSelected && generationStatus === 'generating' && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                            <Loader2 size={20} className="text-white animate-spin" />
                          </div>
                        )}
                        {isSelected && generationStatus === 'complete' && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                      </div>
                      <p className={`text-xs mt-2 text-center transition-colors ${
                        isSelected ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}>
                        {style.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional Instructions - Collapsible */}
            <div className={`transition-opacity ${uploadedImage ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ChevronDown size={16} className={`transition-transform ${showInstructions ? 'rotate-180' : ''}`} />
                Agregar instrucciones personalizadas
              </button>
              
              {showInstructions && (
                <div className="mt-3 bg-white rounded-xl border border-gray-100 p-4">
                  <textarea
                    value={promptInstructions}
                    onChange={(e) => setPromptInstructions(e.target.value)}
                    placeholder="Ej: Agrega nieve, incluí '25% OFF', estilo navideño..."
                    rows={2}
                    className="w-full px-3 py-2 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:text-gray-400 resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-2">Se agregan al prompt de generación</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Preview */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <Eye size={16} />
                Vista previa
              </h3>
              {selectedStyle && generationStatus === 'complete' && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                  {STYLE_OPTIONS.find(s => s.id === selectedStyle)?.name}
                </span>
              )}
            </div>
            
            {uploadedImage && previewStyle ? (
              <div className="space-y-5">
                {/* Phone mockup */}
                <div className="bg-gray-900 rounded-[2rem] p-2.5 max-w-[300px] mx-auto shadow-2xl">
                  <div className="bg-white rounded-[1.5rem] overflow-hidden">
                    {/* IG Header */}
                    <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
                        <span className="text-xs font-semibold text-gray-900">tu_negocio</span>
                      </div>
                      <MoreVertical size={16} className="text-gray-400" />
                    </div>
                    
                    {/* Image with style preview */}
                    <div className={`aspect-square bg-gradient-to-br ${previewStyle.gradient} flex items-center justify-center relative transition-all duration-300`}>
                      {generationStatus === 'generating' ? (
                        <Loader2 size={36} className="text-white/80 animate-spin" />
                      ) : (
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
                        <Heart size={22} className="text-gray-800" />
                        <MessageCircle size={22} className="text-gray-800" />
                        <Share2 size={22} className="text-gray-800" />
                      </div>
                      <p className="text-xs text-gray-900">
                        <span className="font-semibold">tu_negocio</span>{' '}
                        <span className="text-gray-600">
                          {generatedCaption ? generatedCaption.substring(0, 50) + '...' : 'Tu caption aparecerá acá...'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Caption Section */}
                {generatedCaption && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-500">Caption</span>
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
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <button 
                            onClick={handleSaveCaption}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-medium"
                          >
                            <Save size={12} />
                            Guardar
                          </button>
                          <button 
                            onClick={() => {
                              setIsEditingCaption(false);
                              setEditedCaption(generatedCaption);
                            }}
                            className="px-3 py-1.5 text-gray-600 text-xs font-medium hover:bg-gray-200 rounded-lg"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700">{generatedCaption}</p>
                    )}
                  </div>
                )}
                
                {/* Actions */}
                {generationStatus === 'complete' && (
                  <div className="space-y-2">
                    <button 
                      onClick={handleApproveGenerated}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                    >
                      <Check size={18} />
                      Aprobar y programar
                    </button>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={handleRegenerate}
                        disabled={isRegenerating}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
                      >
                        {isRegenerating ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <RefreshCw size={14} />
                        )}
                        Regenerar
                      </button>
                      <button 
                        onClick={handleClearAll}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors"
                      >
                        <Trash2 size={14} />
                        Descartar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                  <Sparkles size={32} className="text-gray-300" />
                </div>
                <p className="text-gray-500 font-medium">
                  {!uploadedImage ? 'Subí una imagen' : 'Elegí un estilo'}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {!uploadedImage ? 'para empezar a crear' : 'para ver la preview'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'pending' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {pendingContent.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all p-4"
              >
                <div className="flex gap-4">
                  <div className={`w-24 h-24 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center text-3xl flex-shrink-0`}>
                    {item.product.image}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusConfig[item.status].color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[item.status].dot}`}></span>
                            {statusConfig[item.status].label}
                          </span>
                          <span className="text-xs text-gray-500">{typeLabels[item.type]}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {item.platforms.map((p) => (
                          <span key={p} className="p-1">{platformIcons[p]}</span>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.caption}</p>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(item.scheduledDate).toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {item.scheduledTime}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                  >
                    <Check size={14} />
                    Aprobar
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-2 text-gray-600 rounded-lg text-sm hover:bg-gray-100">
                    <Edit3 size={14} />
                    Editar
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-2 text-gray-600 rounded-lg text-sm hover:bg-gray-100">
                    <RefreshCw size={14} />
                    Regenerar
                  </button>
                  <button
                    onClick={() => handleReject(item.id)}
                    className="flex items-center gap-1.5 px-3 py-2 text-red-600 rounded-lg text-sm hover:bg-red-50 ml-auto"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
            
            {pendingContent.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                <Sparkles size={40} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No hay contenido pendiente</p>
                <button 
                  onClick={() => setActiveTab('generate')}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium"
                >
                  Crear contenido
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h3 className="font-medium text-gray-900 mb-4">Resumen</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pendientes</span>
                  <span className="text-sm font-semibold text-amber-600">{pendingContent.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Aprobados</span>
                  <span className="text-sm font-semibold text-emerald-600">{approvedContent.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Publicados</span>
                  <span className="text-sm font-semibold text-sky-600">{publishedContent.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'calendar' && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium text-gray-900">Semana 23-29 Diciembre</h3>
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronLeft size={18} className="text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronRight size={18} className="text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-3">
            {WEEKLY_SCHEDULE.map((day) => (
              <div
                key={day.day}
                className={`p-4 rounded-xl text-center border-2 cursor-pointer transition-all hover:shadow-md ${
                  day.status === 'empty'
                    ? 'border-dashed border-gray-200 bg-gray-50'
                    : day.status === 'published'
                    ? 'border-sky-200 bg-sky-50'
                    : day.status === 'scheduled'
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-amber-200 bg-amber-50'
                }`}
              >
                <p className="text-xs text-gray-500 font-medium">{day.day}</p>
                <p className="text-xl font-semibold text-gray-900 my-1">{day.date}</p>
                {day.posts > 0 ? (
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold ${
                    day.status === 'published' ? 'bg-sky-500 text-white'
                    : day.status === 'scheduled' ? 'bg-emerald-500 text-white'
                    : 'bg-amber-500 text-white'
                  }`}>
                    {day.posts}
                  </span>
                ) : (
                  <button className="w-7 h-7 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mx-auto">
                    <Plus size={14} className="text-gray-400" />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-6 text-xs">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-500"></span>
              Publicado
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              Programado
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              Pendiente
            </span>
          </div>
        </div>
      )}

      {activeTab === 'published' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {publishedContent.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`aspect-video bg-gradient-to-br ${item.gradient} flex items-center justify-center text-4xl`}>
                {item.product.image}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(item.scheduledDate).toLocaleDateString('es-AR')}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {item.platforms.map((p) => (
                      <span key={p}>{platformIcons[p]}</span>
                    ))}
                  </div>
                </div>
                
                {item.metrics && (
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-lg font-semibold text-gray-900">{(item.metrics.reach / 1000).toFixed(1)}K</p>
                      <p className="text-[10px] text-gray-500">Alcance</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-lg font-semibold text-gray-900">{item.metrics.engagement}%</p>
                      <p className="text-[10px] text-gray-500">Eng.</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-lg font-semibold text-gray-900">{item.metrics.likes}</p>
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
