import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  ShoppingCart,
  DollarSign,
  Calendar,
  ChevronDown,
  Instagram,
  Facebook,
  Play,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Target,
  Zap,
  Clock,
  MousePointerClick
} from 'lucide-react';

type TimeRange = '7d' | '30d' | '90d' | 'year';
type Platform = 'all' | 'instagram' | 'facebook' | 'tiktok';

interface MetricCard {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  color: string;
}

interface TopPost {
  id: string;
  title: string;
  platform: 'instagram' | 'facebook' | 'tiktok';
  image: string;
  reach: number;
  engagement: number;
  clicks: number;
  date: string;
}

interface TopProduct {
  id: string;
  name: string;
  sku: string;
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

const METRICS: MetricCard[] = [
  {
    label: 'Alcance Total',
    value: '48.2K',
    change: 18.5,
    changeLabel: 'vs mes anterior',
    icon: <Eye size={20} />,
    color: 'blue'
  },
  {
    label: 'Engagement Rate',
    value: '7.8%',
    change: 1.2,
    changeLabel: 'vs mes anterior',
    icon: <Heart size={20} />,
    color: 'pink'
  },
  {
    label: 'Seguidores Nuevos',
    value: '+842',
    change: 24.3,
    changeLabel: 'vs mes anterior',
    icon: <Users size={20} />,
    color: 'purple'
  },
  {
    label: 'Clicks a WhatsApp',
    value: '1,247',
    change: 32.1,
    changeLabel: 'vs mes anterior',
    icon: <MessageCircle size={20} />,
    color: 'green'
  },
  {
    label: 'Conversiones',
    value: '89',
    change: -5.2,
    changeLabel: 'vs mes anterior',
    icon: <ShoppingCart size={20} />,
    color: 'orange'
  },
  {
    label: 'Revenue Atribuido',
    value: '$4.2M',
    change: 15.8,
    changeLabel: 'vs mes anterior',
    icon: <DollarSign size={20} />,
    color: 'emerald'
  },
];

const TOP_POSTS: TopPost[] = [
  {
    id: '1',
    title: 'RTX 4070 Super - Nuevo Stock',
    platform: 'instagram',
    image: '🎮',
    reach: 12500,
    engagement: 9.4,
    clicks: 287,
    date: '2025-12-20'
  },
  {
    id: '2',
    title: 'PC Gamer Pro - Armado Completo',
    platform: 'instagram',
    image: '🖥️',
    reach: 8900,
    engagement: 11.2,
    clicks: 198,
    date: '2025-12-18'
  },
  {
    id: '3',
    title: 'Monitor LG 165Hz - Promo Navidad',
    platform: 'facebook',
    image: '🖥️',
    reach: 7200,
    engagement: 6.8,
    clicks: 156,
    date: '2025-12-22'
  },
  {
    id: '4',
    title: 'RAM DDR5 32GB - Best Seller',
    platform: 'tiktok',
    image: '💾',
    reach: 15800,
    engagement: 8.1,
    clicks: 342,
    date: '2025-12-15'
  },
  {
    id: '5',
    title: 'SSD NVMe 1TB - Unboxing',
    platform: 'tiktok',
    image: '💿',
    reach: 22100,
    engagement: 12.4,
    clicks: 89,
    date: '2025-12-12'
  },
];

const TOP_PRODUCTS: TopProduct[] = [
  {
    id: '1',
    name: 'RTX 4070 Super 12GB',
    sku: 'GPU-4070S-12G',
    views: 4520,
    clicks: 892,
    conversions: 23,
    revenue: 20470000
  },
  {
    id: '2',
    name: 'PC Armada Gamer Pro',
    sku: 'PC-GAMER-PRO',
    views: 3180,
    clicks: 456,
    conversions: 8,
    revenue: 19600000
  },
  {
    id: '3',
    name: 'Monitor LG 27" 165Hz',
    sku: 'MON-LG27-165',
    views: 2890,
    clicks: 534,
    conversions: 15,
    revenue: 6300000
  },
  {
    id: '4',
    name: 'RAM DDR5 32GB Kit',
    sku: 'RAM-DDR5-32K',
    views: 2450,
    clicks: 412,
    conversions: 28,
    revenue: 5180000
  },
  {
    id: '5',
    name: 'Teclado Mecánico RGB',
    sku: 'TEC-MEC-RGB',
    views: 1980,
    clicks: 289,
    conversions: 34,
    revenue: 2380000
  },
];

const WEEKLY_DATA = [
  { day: 'Lun', reach: 4200, engagement: 7.2, clicks: 145 },
  { day: 'Mar', reach: 5100, engagement: 8.1, clicks: 178 },
  { day: 'Mié', reach: 4800, engagement: 7.8, clicks: 156 },
  { day: 'Jue', reach: 6200, engagement: 9.2, clicks: 234 },
  { day: 'Vie', reach: 7500, engagement: 10.1, clicks: 287 },
  { day: 'Sáb', reach: 8900, engagement: 11.4, clicks: 312 },
  { day: 'Dom', reach: 5400, engagement: 6.9, clicks: 189 },
];

const PLATFORM_STATS = [
  { platform: 'Instagram', followers: 12400, growth: 156, posts: 24, engagement: 8.2, color: 'pink' },
  { platform: 'Facebook', followers: 8900, growth: 89, posts: 18, engagement: 5.4, color: 'blue' },
  { platform: 'TikTok', followers: 4200, growth: 312, posts: 12, engagement: 12.8, color: 'gray' },
];

const platformIcons = {
  instagram: <Instagram size={16} className="text-pink-500" />,
  facebook: <Facebook size={16} className="text-blue-600" />,
  tiktok: <Play size={16} className="text-gray-900" />,
};

const colorClasses = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'bg-blue-100' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-600', icon: 'bg-pink-100' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', icon: 'bg-purple-100' },
  green: { bg: 'bg-green-50', text: 'text-green-600', icon: 'bg-green-100' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', icon: 'bg-orange-100' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: 'bg-emerald-100' },
  gray: { bg: 'bg-gray-50', text: 'text-gray-600', icon: 'bg-gray-100' },
};

export const AnalyticsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [platform, setPlatform] = useState<Platform>('all');

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${value.toLocaleString('es-AR')}`;
  };

  const formatNumber = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const maxReach = Math.max(...WEEKLY_DATA.map(d => d.reach));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500">Métricas de rendimiento y conversión</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Platform Filter */}
          <div className="relative">
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="all">Todas las plataformas</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="tiktok">TikTok</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          
          {/* Time Range */}
          <div className="flex bg-white border border-gray-200 rounded-lg p-1">
            {[
              { value: '7d', label: '7 días' },
              { value: '30d', label: '30 días' },
              { value: '90d', label: '90 días' },
              { value: 'year', label: 'Año' },
            ].map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value as TimeRange)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  timeRange === range.value
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {METRICS.map((metric) => {
          const colors = colorClasses[metric.color as keyof typeof colorClasses];
          return (
            <div key={metric.label} className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${colors.icon}`}>
                  <span className={colors.text}>{metric.icon}</span>
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  metric.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-xs text-gray-500 mt-1">{metric.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Rendimiento Semanal</h3>
              <p className="text-sm text-gray-500">Alcance y engagement por día</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                Alcance
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-pink-500"></span>
                Engagement
              </span>
            </div>
          </div>
          
          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between gap-2 h-48">
            {WEEKLY_DATA.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center gap-1 flex-1 justify-end">
                  {/* Reach bar */}
                  <div 
                    className="w-full bg-blue-500 rounded-t-md transition-all hover:bg-blue-600"
                    style={{ height: `${(day.reach / maxReach) * 100}%` }}
                    title={`Alcance: ${formatNumber(day.reach)}`}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 font-medium">{day.day}</div>
              </div>
            ))}
          </div>
          
          {/* Stats summary */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">42.1K</p>
              <p className="text-xs text-gray-500">Alcance total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">8.7%</p>
              <p className="text-xs text-gray-500">Engagement promedio</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">1,501</p>
              <p className="text-xs text-gray-500">Clicks totales</p>
            </div>
          </div>
        </div>

        {/* Platform Breakdown */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Por Plataforma</h3>
          
          <div className="space-y-4">
            {PLATFORM_STATS.map((stat) => {
              const colors = colorClasses[stat.color as keyof typeof colorClasses];
              return (
                <div key={stat.platform} className={`p-4 rounded-xl ${colors.bg}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {platformIcons[stat.platform.toLowerCase() as keyof typeof platformIcons]}
                      <span className="font-medium text-gray-900">{stat.platform}</span>
                    </div>
                    <span className="text-xs text-green-600 font-medium">+{stat.growth}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lg font-bold text-gray-900">{formatNumber(stat.followers)}</p>
                      <p className="text-[10px] text-gray-500">Seguidores</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{stat.posts}</p>
                      <p className="text-[10px] text-gray-500">Posts</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{stat.engagement}%</p>
                      <p className="text-[10px] text-gray-500">Engagement</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Posts & Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Posts */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Top Posts</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Ver todos</button>
          </div>
          
          <div className="space-y-3">
            {TOP_POSTS.map((post, index) => (
              <div key={post.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-lg font-bold text-gray-300 w-6">{index + 1}</span>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-2xl">
                  {post.image}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{post.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {platformIcons[post.platform]}
                    <span className="text-xs text-gray-500">
                      {new Date(post.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{formatNumber(post.reach)}</p>
                  <p className="text-xs text-gray-500">alcance</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-pink-600">{post.engagement}%</p>
                  <p className="text-xs text-gray-500">eng.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Top Productos</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Ver todos</button>
          </div>
          
          <div className="space-y-3">
            {TOP_PRODUCTS.map((product, index) => (
              <div key={product.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-lg font-bold text-gray-300 w-6">{index + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{formatNumber(product.views)}</p>
                  <p className="text-xs text-gray-500">vistas</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-blue-600">{product.clicks}</p>
                  <p className="text-xs text-gray-500">clicks</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">{product.conversions}</p>
                  <p className="text-xs text-gray-500">ventas</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-gray-900">Funnel de Conversión</h3>
            <p className="text-sm text-gray-500">De impresión a venta</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Target size={16} className="text-green-500" />
            <span className="text-gray-600">Tasa de conversión:</span>
            <span className="font-bold text-green-600">2.1%</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Stage 1: Impressions */}
          <div className="flex-1">
            <div className="bg-blue-50 rounded-xl p-6 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                100%
              </div>
              <Eye size={32} className="text-blue-500 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900">48.2K</p>
              <p className="text-sm text-gray-600 mt-1">Impresiones</p>
            </div>
          </div>

          <div className="text-gray-300">→</div>

          {/* Stage 2: Engagement */}
          <div className="flex-1">
            <div className="bg-pink-50 rounded-xl p-6 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                7.8%
              </div>
              <Heart size={32} className="text-pink-500 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900">3.8K</p>
              <p className="text-sm text-gray-600 mt-1">Interacciones</p>
            </div>
          </div>

          <div className="text-gray-300">→</div>

          {/* Stage 3: Clicks */}
          <div className="flex-1">
            <div className="bg-purple-50 rounded-xl p-6 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                2.6%
              </div>
              <MousePointerClick size={32} className="text-purple-500 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-gray-600 mt-1">Clicks</p>
            </div>
          </div>

          <div className="text-gray-300">→</div>

          {/* Stage 4: WhatsApp */}
          <div className="flex-1">
            <div className="bg-green-50 rounded-xl p-6 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                0.8%
              </div>
              <MessageCircle size={32} className="text-green-500 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900">386</p>
              <p className="text-sm text-gray-600 mt-1">Chats WhatsApp</p>
            </div>
          </div>

          <div className="text-gray-300">→</div>

          {/* Stage 5: Sales */}
          <div className="flex-1">
            <div className="bg-emerald-50 rounded-xl p-6 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                0.18%
              </div>
              <ShoppingCart size={32} className="text-emerald-500 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900">89</p>
              <p className="text-sm text-gray-600 mt-1">Ventas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Clock size={24} />
            <h4 className="font-semibold">Mejor Horario</h4>
          </div>
          <p className="text-3xl font-bold">18:00 - 21:00</p>
          <p className="text-blue-100 text-sm mt-2">Mayor engagement los viernes y sábados</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Zap size={24} />
            <h4 className="font-semibold">Formato Top</h4>
          </div>
          <p className="text-3xl font-bold">Reels</p>
          <p className="text-purple-100 text-sm mt-2">3.2x más alcance que posts estáticos</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={24} />
            <h4 className="font-semibold">Tendencia</h4>
          </div>
          <p className="text-3xl font-bold">+24%</p>
          <p className="text-green-100 text-sm mt-2">Crecimiento de seguidores este mes</p>
        </div>
      </div>
    </div>
  );
};
