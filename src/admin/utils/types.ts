/**
 * Tipos de dados para o sistema administrativo
 */

export interface UserData {
  id: number | string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'master';
  status: 'active' | 'inactive' | 'banned';
  createdAt: string;
  lastLogin?: string;
}

export interface ActivityLog {
  id: number | string;
  userId: number | string;
  userName: string;
  action: string;
  details: string;
  ip: string;
  timestamp: string;
}

export interface SubscriptionPlan {
  id: number | string;
  name: string;
  description: string;
  price: number;
  intervalType: 'monthly' | 'annual' | 'lifetime';
  features: string[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  id: number | string;
  title: string;
  description: string;
  imageUrl?: string;
  buttonText: string;
  buttonLink: string;
  overlayColor?: string;
  textColor?: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  showCloseButton: boolean;
  delay: number; // Atraso em segundos antes de mostrar
  frequency: 'once' | 'every_visit' | 'once_per_day' | 'once_per_week';
  priority: number; // Quanto maior, mais prioritário
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  todayTransactions: number;
  totalRevenue: number;
  userGrowth: number;
  usersByPlan: {
    name: string;
    value: number;
  }[];
  recentActivities: ActivityLog[];
  activeUsersByTimeOfDay: {
    hour: number;
    count: number;
  }[];
  userRegistrationsByDate: {
    date: string;
    count: number;
  }[];
}

export type ChartPeriod = '24h' | '7d' | '30d' | '90d' | 'all';

export interface ChartFilter {
  period: ChartPeriod;
  startDate?: Date;
  endDate?: Date;
}

export interface UserFormData {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'master';
  status: 'active' | 'inactive' | 'banned';
  password?: string;
  confirmPassword?: string;
}