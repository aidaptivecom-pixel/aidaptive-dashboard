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
  CheckCircle2,
  Wand2,
  Copy,
  Download,
  Trash2,
  Plus
} from 'lucide-react';

type ContentStatus = 'pending' | 'approved' | 'published' | 'rejected';
type Platform = 'instagram' | 'facebook' | 'tiktok';
type ContentType = 'feed' | 'story' | 'reel' | 'carousel';
type GenerationStatus = 'idle' | 'uploading' | 'generating' | 'complete';

interface ImageVariant {
  id: string;
  style: string;
  preview: string; // gradient placeholder
  selected: boolean;
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
  variants: ImageVariant[];
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
      name: 'RTX 4070 Super 12GB',
      sku: 'GPU-4070S-12G',
      price: 890000,
      image: '🎮'
    },
    type: 'feed',
    platforms: ['instagram', 'facebook'],
    status: 'pending',
    caption: '🚀 ¡La RTX 4070 SUPER ya está en stock!\\n\\n⚡ 12GB GDDR6X\\n🎮 Ray Tracing de última generación\\n💰 $890.000\\n🚚 Envíos a todo el país\\n\\n¡Consultanos por WhatsApp!',
    hashtags: ['#RTX4070', '#Gaming', '#PCGamer', '#NVIDIA', '#BuenosAires'],
    cta: 'Consultar por WhatsApp',
    scheduledDate: '2025-12-27',
    scheduledTime: '10:00',
    variants: [
      { id: 'v1', style: 'Producto destacado', preview: 'from-green-400 to-blue-500', selected: true },
      { id: 'v2', style: 'Gaming aesthetic', preview: 'from-purple-600 to-pink-500', selected: false },
      { id: 'v3', style: 'Minimalista', preview: 'from-gray-700 to-gray-900', selected: false },
      { id: 'v4', style: 'Promocional', preview: 'from-orange-500 to-red-500', selected: false },
    ],
    selectedVariant: 0
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
    caption: '⚡ Kit RAM DDR5 32GB (2x16GB)\\n\\n🔥 5600MHz CL36\\n✅ Compatibilidad Intel y AMD\\n💰 $185.000\\n\\n¡Llevá tu PC al siguiente nivel!',
    hashtags: ['#RAM', '#DDR5', '#PCGamer', '#Hardware', '#TechArgentina'],
    cta: 'Ver disponibilidad',
    scheduledDate: '2025-12-28',
    scheduledTime: '14:00',
    variants: [
      { id: 'v1', style: 'Tech showcase', preview: 'from-cyan-500 to-blue-600', selected: false },
      { id: 'v2', style: 'Comparativa', preview: 'from-green-500 to-teal-500', selected: true },
      { id: 'v3', style: 'Unboxing style', preview: 'from-amber-500 to-orange-500', selected: false },
      { id: 'v4', style: 'Benchmark focus', preview: 'from-red-500 to-pink-500', selected: false },
    ],
    selectedVariant: 1
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
    caption: '🖥️ Monitor LG UltraGear 27"\\n\\n⚡ 165Hz IPS\\n🎨 99% sRGB\\n📦 Stock disponible\\n🚚 Envíos a todo el país',
    hashtags: ['#Monitor', '#Gaming', '#LG', '#UltraGear'],
    cta: 'Ver en tienda',
    scheduledDate: '2025-12-27',
    scheduledTime: '18:00',
    variants: [
      { id: 'v1', style: 'Setup gamer', preview: 'from-violet-600 to-purple-600', selected: true },
      { id: 'v2', style: 'Features highlight', preview: 'from-blue-500 to-indigo-600', selected: false },
      { id: 'v3', style: 'Comparativa tamaño', preview: 'from-slate-600 to-slate-800', selected: false },
      { id: 'v4', style: 'Lifestyle', preview: 'from-rose-400 to-pink-500', selected: false },
    ],
    selectedVariant: 0
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
    caption: '🔥 PC GAMER PRO - Lista para jugar\\n\\n✅ RTX 4070 Ti\\n✅ Intel i7-14700K\\n✅ 32GB DDR5\\n✅ 1TB NVMe\\n\\n📍 Retiro por local o envío\\n📱 Consultanos por WhatsApp',
    hashtags: ['#PCGamer', '#Gaming', '#RTX4070Ti', '#Intel', '#Armado'],
    cta: 'Solicitar cotización',
    scheduledDate: '2025-12-26',
    scheduledTime: '12:00',
    variants: [
      { id: 'v1', style: 'Hero shot', preview: 'from-indigo-600 to-purple-700', selected: false },
      { id: 'v2', style: 'Componentes', preview: 'from-emerald-500 to-teal-600', selected: false },
      { id: 'v3', style: 'RGB showcase', preview: 'from-pink-500 to-violet-600', selected: true },
      { id: 'v4', style: 'Benchmark results', preview: 'from-amber-500 to-red-500', selected: false },
    ],
    selectedVariant: 2,
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
  const [selectedContent, setSelectedContent] = useState<ContentPiece | null>(null);
  const [activeTab, setActiveTab] = useState<'generate' | 'pending' | 'calendar' | 'published'>('generate');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>('idle');
  const [generatedVariants, setGeneratedVariants] = useState<ImageVariant[]>([]);
  const [selectedGeneratedVariant, setSelectedGeneratedVariant] = useState<number | null>(null);
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

  const handleSelectVariant = (contentId: string, variantIndex: number) => {
    setContent(prev => prev.map(c => {
      if (c.id === contentId) {
        const newVariants = c.variants.map((v, idx) => ({ ...v, selected: idx === variantIndex }));
        return { ...c, variants: newVariants, selectedVariant: variantIndex };
      }
      return c;
    }));
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
      }, 800);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateWithAI = () => {
    setGenerationStatus('generating');
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedVariants([
        { id: 'gen1', style: 'Producto destacado', preview: 'from-blue-500 to-purple-600', selected: false },
        { id: 'gen2', style: 'Estilo promocional', preview: 'from-orange-500 to-red-500', selected: false },
        { id: 'gen3', style: 'Minimalista pro', preview: 'from-gray-600 to-gray-800', selected: false },
        { id: 'gen4', style: 'Gaming RGB', preview: 'from-pink-500 to-cyan-500', selected: false },
      ]);
      setGenerationStatus('complete');
    }, 3000);
  };

  const handleClearUpload = () => {
    setUploadedImage(null);
    setGeneratedVariants([]);
    setGenerationStatus('idle');
    setSelectedGeneratedVariant(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRegenerateVariant = (index: number) => {
    const newVariants = [...generatedVariants];
    const gradients = [
      'from-emerald-500 to-teal-600',
      'from-violet-600 to-indigo-600',
      'from-amber-500 to-yellow-500',
      'from-rose-500 to-pink-600',
    ];
    newVariants[index] = {
      ...newVariants[index],
      preview: gradients[Math.floor(Math.random() * gradients.length)]
    };
    setGeneratedVariants(newVariants);
  };

  const handleRegenerateAll = () => {
    setGenerationStatus('generating');
    setTimeout(() => {
      setGeneratedVariants([
        { id: 'gen1b', style: 'Catálogo premium', preview: 'from-slate-700 to-zinc-800', selected: false },
        { id: 'gen2b', style: 'Social vibrante', preview: 'from-fuchsia-500 to-purple-600', selected: false },
        { id: 'gen3b', style: 'E-commerce clean', preview: 'from-sky-500 to-blue-600', selected: false },
        { id: 'gen4b', style: 'Tech futurista', preview: 'from-cyan-400 to-emerald-500', selected: false },
      ]);
      setGenerationStatus('complete');
      setSelectedGeneratedVariant(null);
    }, 2000);
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
          {/* Upload Section */}
          <div className="space-y-4">
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
                  className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                    isDragging 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {generationStatus === 'uploading' ? (
                    <div className="flex flex-col items-center">
                      <Loader2 size={48} className="text-blue-500 animate-spin mb-4" />
                      <p className="text-gray-600 font-medium">Subiendo imagen...</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus size={32} className="text-gray-400" />
                      </div>
                      <p className="text-gray-700 font-medium mb-1">Arrastrá una imagen o hacé click para subir</p>
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
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <img 
                      src={uploadedImage} 
                      alt="Imagen subida" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={handleClearUpload}
                      className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  {generationStatus === 'idle' && (
                    <button
                      onClick={handleGenerateWithAI}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
                    >
                      <Sparkles size={20} />
                      Generar variantes con IA
                    </button>
                  )}
                  
                  {generationStatus === 'generating' && (
                    <div className="flex items-center justify-center gap-3 px-6 py-3 bg-gray-100 rounded-xl">
                      <Loader2 size={20} className="text-purple-600 animate-spin" />
                      <span className="text-gray-700 font-medium">Generando variantes...</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Tips */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100 p-4">
              <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                <Sparkles size={16} />
                Tips para mejores resultados
              </h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Usá fotos de producto con fondo limpio</li>
                <li>• Buena iluminación mejora las variantes</li>
                <li>• Resolución mínima recomendada: 1080x1080</li>
              </ul>
            </div>
          </div>

          {/* Generated Variants */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Wand2 size={20} />
                Variantes Generadas
              </h3>
              {generatedVariants.length > 0 && (
                <button
                  onClick={handleRegenerateAll}
                  disabled={generationStatus === 'generating'}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  <RefreshCw size={14} className={generationStatus === 'generating' ? 'animate-spin' : ''} />
                  Regenerar todas
                </button>
              )}
            </div>
            
            {generatedVariants.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Image size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-500 mb-1">No hay variantes generadas</p>
                <p className="text-sm text-gray-400">Subí una imagen para comenzar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Variants Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {generatedVariants.map((variant, index) => (
                    <div
                      key={variant.id}
                      onClick={() => setSelectedGeneratedVariant(index)}
                      className={`relative group cursor-pointer rounded-xl overflow-hidden transition-all ${
                        selectedGeneratedVariant === index 
                          ? 'ring-2 ring-purple-500 ring-offset-2' 
                          : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
                      }`}
                    >
                      <div className={`aspect-square bg-gradient-to-br ${variant.preview} flex items-center justify-center`}>
                        <span className="text-6xl">🎮</span>
                      </div>
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRegenerateVariant(index);
                            }}
                            className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                            title="Regenerar esta variante"
                          >
                            <RefreshCw size={16} className="text-gray-700" />
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                            title="Descargar"
                          >
                            <Download size={16} className="text-gray-700" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Selection indicator */}
                      {selectedGeneratedVariant === index && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                      )}
                      
                      {/* Style label */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-white text-sm font-medium">{variant.style}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Actions */}
                {selectedGeneratedVariant !== null && (
                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                        <Check size={18} />
                        Usar esta variante
                      </button>
                      <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                        <Copy size={18} />
                      </button>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                      <Edit3 size={18} />
                      Editar en editor avanzado
                    </button>
                  </div>
                )}
              </div>
            )}
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
                className={`bg-white rounded-xl border transition-all cursor-pointer ${
                  selectedContent?.id === item.id ? 'border-gray-900 shadow-lg' : 'border-gray-100 hover:border-gray-200'
                }`}
                onClick={() => setSelectedContent(item)}
              >
                <div className="p-4">
                  <div className="flex gap-4">
                    {/* Image Preview */}
                    <div className={`w-32 h-32 bg-gradient-to-br ${item.variants[item.selectedVariant]?.preview || 'from-gray-100 to-gray-200'} rounded-lg flex items-center justify-center text-4xl flex-shrink-0`}>
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
                        {item.caption.split('\\n')[0]}
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
                          key={variant.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectVariant(item.id, idx);
                          }}
                          className={`relative w-12 h-12 rounded-lg overflow-hidden transition-all ${
                            item.selectedVariant === idx
                              ? 'ring-2 ring-gray-900 ring-offset-2'
                              : 'ring-1 ring-gray-200 hover:ring-gray-400'
                          }`}
                        >
                          <div className={`w-full h-full bg-gradient-to-br ${variant.preview}`}></div>
                          {item.selectedVariant === idx && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <CheckCircle2 size={16} className="text-white" />
                            </div>
                          )}
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
                <button 
                  onClick={() => setActiveTab('generate')}
                  className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                >
                  Generar nuevo contenido
                </button>
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
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
                          <span className="text-xs font-semibold">infopartes.st</span>
                        </div>
                        <MoreVertical size={16} className="text-gray-400" />
                      </div>
                      
                      {/* Image */}
                      <div className={`aspect-square bg-gradient-to-br ${selectedContent.variants[selectedContent.selectedVariant]?.preview || 'from-gray-100 to-gray-200'} flex items-center justify-center text-6xl`}>
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
                          {selectedContent.caption.split('\\n')[0]}
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
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap max-h-32 overflow-y-auto">
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
              <div className={`aspect-video bg-gradient-to-br ${item.variants[item.selectedVariant]?.preview || 'from-gray-100 to-gray-200'} flex items-center justify-center text-5xl`}>
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
