export enum ConversationStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
  ESCALATED = 'escalated',
  PENDING = 'pending'
}

export interface Client {
  name: string;
  phone: string;
}

export interface Conversation {
  id: string;
  client: Client;
  type: 'Turno' | 'Consulta' | 'Venta' | 'Reparacion' | 'Derivacion';
  agent: string;
  message: string;
  time: string;
  status: ConversationStatus;
}

export interface ChartDataPoint {
  date: string;
  total: number;
  automated: number;
}

export interface KPIData {
  label: string;
  value: string;
  delta: string;
  variant: 'success' | 'warning' | 'error' | 'neutral';
}