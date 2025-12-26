import React from 'react';
import { Conversation, ConversationStatus } from '../../types';
import { CheckCircle2, Clock, AlertTriangle, MessageSquare, Calendar, Wrench, ShoppingBag, ArrowUpRight } from 'lucide-react';

interface RecentActivityTableProps {
  conversations: Conversation[];
}

const StatusBadge = ({ status }: { status: ConversationStatus }) => {
  switch (status) {
    case ConversationStatus.COMPLETED: 
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={12} />
          Completado
        </span>
      );
    case ConversationStatus.IN_PROGRESS: 
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-600">
          <Clock size={12} />
          En Proceso
        </span>
      );
    case ConversationStatus.ESCALATED: 
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-600">
          <AlertTriangle size={12} />
          Derivado
        </span>
      );
    case ConversationStatus.PENDING: 
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-gray-50 text-gray-600">
          <Clock size={12} />
          Pendiente
        </span>
      );
    default: return null;
  }
};

const TypeIcon = ({ type }: { type: string }) => {
  const iconClass = "w-7 h-7 rounded-lg flex items-center justify-center";
  switch (type) {
    case 'Turno': 
      return <div className={`${iconClass} bg-blue-50 text-blue-600`}><Calendar size={14} /></div>;
    case 'Consulta': 
      return <div className={`${iconClass} bg-purple-50 text-purple-600`}><MessageSquare size={14} /></div>;
    case 'Reparacion': 
      return <div className={`${iconClass} bg-orange-50 text-orange-600`}><Wrench size={14} /></div>;
    case 'Venta': 
      return <div className={`${iconClass} bg-emerald-50 text-emerald-600`}><ShoppingBag size={14} /></div>;
    case 'Derivacion': 
      return <div className={`${iconClass} bg-amber-50 text-amber-600`}><ArrowUpRight size={14} /></div>;
    default: 
      return <div className={`${iconClass} bg-gray-50 text-gray-600`}><MessageSquare size={14} /></div>;
  }
};

export const RecentActivityTable: React.FC<RecentActivityTableProps> = ({ conversations }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Conversaciones Recientes</h2>
          <p className="text-xs text-gray-500 mt-1">Actividad en tiempo real de WhatsApp</p>
        </div>
        <button className="text-[#722F37] text-xs font-semibold hover:underline">Ver Todas &rsaquo;</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cliente</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tipo</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mensaje</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Agente</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tiempo</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {conversations.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.client.name}</p>
                    <p className="text-xs text-gray-400">{item.client.phone}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <TypeIcon type={item.type} />
                    <span className="text-xs font-medium text-gray-700">{item.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs text-gray-600 max-w-[200px] truncate">{item.message}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">{item.agent}</span>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500">{item.time}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};