import React from 'react';
import { Package, AlertTriangle, ExternalLink } from 'lucide-react';

interface InventoryAlert {
  id: string;
  product: string;
  sku: string;
  stock: number;
  minStock: number;
}

interface InventoryAlertsWidgetProps {
  alerts: InventoryAlert[];
}

export const InventoryAlertsWidget: React.FC<InventoryAlertsWidgetProps> = ({ alerts }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <Package size={16} className="text-amber-600" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Alertas de Stock</h3>
            <p className="text-xs text-gray-500">{alerts.length} productos bajo mínimo</p>
          </div>
        </div>
        <a href="/inventory" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
          Ver inventario
          <ExternalLink size={14} />
        </a>
      </div>

      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Package size={32} className="mx-auto mb-2 text-gray-300" />
            <p className="text-sm">Stock en niveles normales</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div 
              key={alert.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                alert.stock === 0 ? 'bg-red-100' : 'bg-amber-100'
              }`}>
                <AlertTriangle size={18} className={alert.stock === 0 ? 'text-red-600' : 'text-amber-600'} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{alert.product}</p>
                <p className="text-xs text-gray-500">SKU: {alert.sku}</p>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${alert.stock === 0 ? 'text-red-600' : 'text-amber-600'}`}>
                  {alert.stock}
                </p>
                <p className="text-xs text-gray-400">Mín: {alert.minStock}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
