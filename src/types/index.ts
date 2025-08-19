export interface Vehicle {
  id: string;
  user_id: string;
  name: string;
  category: 'Automóvel' | 'Motocicleta' | 'Bike' | 'Embarcação' | 'Avião';
  manufacturer: string;
  model: string;
  plate: string;
  current_mileage: number;
  mileage_unit: 'km' | 'horas';
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Maintenance {
  id: string;
  vehicle_id: string;
  user_id: string;
  description: string;
  workshop: string;
  date: string;
  cost: number;
  odometer: number;
  invoice_image_url?: string;
  next_maintenance_date?: string;
  next_odometer?: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  created_at: string;
}

export type MaintenanceStatus = 'overdue' | 'upcoming' | 'current' | 'none';