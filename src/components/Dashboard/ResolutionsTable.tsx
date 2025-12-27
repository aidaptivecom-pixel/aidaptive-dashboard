import React from 'react';
import { CheckCircle, Bot, Package, Calendar, HelpCircle, DollarSign, MessageSquare } from 'lucide-react';

interface Resolution {
  id: string;
  client: string;
  type: 'consulta' | 'pedido' | 'turno' | 'precio' | 'stock' | 'otro';
  summary: string;
  time: string;
}

interface ResolutionsTableProps {
  resolutions: Resolution[];
}

export const ResolutionsTable: React.FC<ResolutionsTableProps> = ({ resolutions }) => {
  const typeConfig = {
    consulta: { icon: HelpCircle, label: 'Consulta', color: 'text-blue-600 bg-blue-50' },
    pedido: { icon: Package, label: 'Pedido', color: 'text-purple-600 bg-purple-50' },
    turno: { icon: Calendar, label: 'Turno', color: 'text-green-600 bg-green-50' },
    precio: { icon: DollarSign, label: 'Precio', color: 'text-amber-600 bg-amber-50' },
    stock: { icon: Package, label: 'Stock', color: 'text-indigo-600 bg-indigo-50' },
    otro: { icon: MessageSquare, label: 'Otro', color: 'text-gray-600 bg-gray-50' },
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <Bot size={16} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Resoluciones Automáticas</h3>
            <p className="text-xs text-gray-500">Conversaciones resueltas por IA</p>
          </div>
        </div>
        <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
          <CheckCircle size={14} />
          {resolutions.length} hoy
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Resolución</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Tiempo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {resolutions.map((resolution) => {
              const config = typeConfig[resolution.type];
              const Icon = config.icon;
              return (
                <tr key={resolution.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-medium text-gray-700">
                        {resolution.client.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{resolution.client}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
                      <Icon size={12} />
                      {config.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{resolution.summary}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm text-gray-400">{resolution.time}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
