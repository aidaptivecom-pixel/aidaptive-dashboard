import React from 'react';
import { AlertTriangle, Clock, MessageSquare, ExternalLink } from 'lucide-react';

interface Escalation {
  id: string;
  client: string;
  reason: string;
  time: string;
  priority: 'low' | 'medium' | 'high';
}

interface EscalationsWidgetProps {
  escalations: Escalation[];
}

export const EscalationsWidget: React.FC<EscalationsWidgetProps> = ({ escalations }) => {
  const priorityStyles = {
    low: 'bg-gray-100 text-gray-600',
    medium: 'bg-amber-100 text-amber-700',
    high: 'bg-red-100 text-red-700',
  };

  const priorityLabels = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta',
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <AlertTriangle size={16} className="text-red-600" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Derivaciones Pendientes</h3>
            <p className="text-xs text-gray-500">{escalations.length} requieren atención</p>
          </div>
        </div>
        <a href="/conversations" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
          Ver todas
          <ExternalLink size={14} />
        </a>
      </div>

      <div className="space-y-3">
        {escalations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare size={32} className="mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No hay derivaciones pendientes</p>
          </div>
        ) : (
          escalations.map((escalation) => (
            <div 
              key={escalation.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 font-semibold text-gray-700">
                {escalation.client.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{escalation.client}</p>
                <p className="text-xs text-gray-500 truncate">"{escalation.reason}"</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityStyles[escalation.priority]}`}>
                  {priorityLabels[escalation.priority]}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={10} />
                  {escalation.time}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
