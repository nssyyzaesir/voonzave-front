import React, { useState } from 'react';
import Card from '../components/Card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ChartPeriod, DashboardStats } from '../utils/types';
import { 
  Users, 
  ArrowUpRight, 
  CreditCard, 
  DollarSign, 
  Clock, 
  ArrowUp,
  ArrowDown,
  Activity
} from 'lucide-react';

// Dados mockados para o dashboard
const mockDashboardData: DashboardStats = {
  totalUsers: 12583,
  activeUsers: 7849,
  todayTransactions: 342,
  totalRevenue: 389467.89,
  userGrowth: 18.7,
  usersByPlan: [
    { name: 'Básico', value: 5432 },
    { name: 'Pro', value: 3217 },
    { name: 'Enterprise', value: 1200 }
  ],
  recentActivities: [
    { id: 1, userId: 1, userName: 'João Silva', action: 'Login', details: 'Login realizado com sucesso', ip: '192.168.1.1', timestamp: '2025-04-19T12:30:00Z' },
    { id: 2, userId: 2, userName: 'Maria Oliveira', action: 'Assinatura', details: 'Assinatura do plano Pro', ip: '192.168.1.2', timestamp: '2025-04-19T12:15:00Z' },
    { id: 3, userId: 3, userName: 'Carlos Pereira', action: 'Atualização', details: 'Atualização de perfil', ip: '192.168.1.3', timestamp: '2025-04-19T11:45:00Z' },
    { id: 4, userId: 4, userName: 'Ana Souza', action: 'Registro', details: 'Novo usuário registrado', ip: '192.168.1.4', timestamp: '2025-04-19T11:30:00Z' },
    { id: 5, userId: 5, userName: 'Pedro Santos', action: 'Pagamento', details: 'Pagamento processado', ip: '192.168.1.5', timestamp: '2025-04-19T11:15:00Z' }
  ],
  activeUsersByTimeOfDay: [
    { hour: 0, count: 120 },
    { hour: 1, count: 80 },
    { hour: 2, count: 45 },
    { hour: 3, count: 30 },
    { hour: 4, count: 20 },
    { hour: 5, count: 15 },
    { hour: 6, count: 30 },
    { hour: 7, count: 80 },
    { hour: 8, count: 230 },
    { hour: 9, count: 450 },
    { hour: 10, count: 580 },
    { hour: 11, count: 670 },
    { hour: 12, count: 720 },
    { hour: 13, count: 800 },
    { hour: 14, count: 830 },
    { hour: 15, count: 810 },
    { hour: 16, count: 790 },
    { hour: 17, count: 750 },
    { hour: 18, count: 680 },
    { hour: 19, count: 620 },
    { hour: 20, count: 520 },
    { hour: 21, count: 410 },
    { hour: 22, count: 290 },
    { hour: 23, count: 180 }
  ],
  userRegistrationsByDate: [
    { date: '13/04', count: 234 },
    { date: '14/04', count: 286 },
    { date: '15/04', count: 312 },
    { date: '16/04', count: 278 },
    { date: '17/04', count: 325 },
    { date: '18/04', count: 341 },
    { date: '19/04', count: 364 }
  ]
};

const COLORS = ['#6C00FF', '#9B4BFF', '#CE9BFF', '#00EEFF', '#00BBCC'];

const Dashboard: React.FC = () => {
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>('7d');
  const stats = mockDashboardData;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex bg-[#15152A] rounded-lg border border-[#21213A] p-1">
          {(['24h', '7d', '30d'] as ChartPeriod[]).map((period) => (
            <button
              key={period}
              onClick={() => setChartPeriod(period)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                chartPeriod === period
                  ? 'bg-[#6C00FF] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      
      {/* Cards principais com KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total de Usuários"
          subtitle={`+${stats.userGrowth}% este mês`}
          icon={<Users size={20} />}
          iconBackground="bg-[#6C00FF]/20"
          iconColor="text-[#6C00FF]"
        >
          <div className="mt-2">
            <p className="text-2xl font-semibold text-white">{formatNumber(stats.totalUsers)}</p>
            <div className="flex items-center mt-1 text-sm text-green-500">
              <ArrowUpRight size={16} className="mr-1" />
              <span>+{stats.userGrowth}% em comparação ao mês anterior</span>
            </div>
          </div>
        </Card>
        
        <Card
          title="Usuários Ativos"
          subtitle="Atualmente online"
          icon={<Activity size={20} />}
          iconBackground="bg-[#00EEFF]/20"
          iconColor="text-[#00EEFF]"
        >
          <div className="mt-2">
            <p className="text-2xl font-semibold text-white">{formatNumber(stats.activeUsers)}</p>
            <div className="flex items-center mt-1 text-sm text-gray-400">
              <Clock size={16} className="mr-1" />
              <span>{Math.round((stats.activeUsers / stats.totalUsers) * 100)}% do total de usuários</span>
            </div>
          </div>
        </Card>
        
        <Card
          title="Transações de Hoje"
          subtitle="Atualizadas em tempo real"
          icon={<CreditCard size={20} />}
          iconBackground="bg-purple-500/20"
          iconColor="text-purple-500"
        >
          <div className="mt-2">
            <p className="text-2xl font-semibold text-white">{formatNumber(stats.todayTransactions)}</p>
            <div className="flex items-center mt-1 text-sm text-green-500">
              <ArrowUp size={16} className="mr-1" />
              <span>+8.3% em comparação a ontem</span>
            </div>
          </div>
        </Card>
        
        <Card
          title="Receita Total"
          subtitle="Acumulada"
          icon={<DollarSign size={20} />}
          iconBackground="bg-green-500/20"
          iconColor="text-green-500"
        >
          <div className="mt-2">
            <p className="text-2xl font-semibold text-white">{formatCurrency(stats.totalRevenue)}</p>
            <div className="flex items-center mt-1 text-sm text-red-500">
              <ArrowDown size={16} className="mr-1" />
              <span>-2.1% em comparação ao mês anterior</span>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          title="Registros de Usuários"
          subtitle={`Últimos ${chartPeriod === '24h' ? 'dias' : chartPeriod === '7d' ? '7 dias' : '30 dias'}`}
          className="lg:col-span-2"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={stats.userRegistrationsByDate}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C00FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6C00FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#21213A" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#9CA3AF' }} 
                  axisLine={{ stroke: '#21213A' }}
                />
                <YAxis 
                  tick={{ fill: '#9CA3AF' }} 
                  axisLine={{ stroke: '#21213A' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F0F18', 
                    borderColor: '#21213A',
                    color: '#fff'
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#6C00FF" 
                  fillOpacity={1} 
                  fill="url(#colorRegistrations)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card
          title="Usuários por Plano"
          subtitle="Distribuição atual"
        >
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.usersByPlan}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.usersByPlan.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatNumber(value)}
                  contentStyle={{ 
                    backgroundColor: '#0F0F18', 
                    borderColor: '#21213A' 
                  }}
                  labelStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title="Usuários Ativos por Hora"
          subtitle="Últimas 24 horas"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.activeUsersByTimeOfDay}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#21213A" />
                <XAxis 
                  dataKey="hour" 
                  tick={{ fill: '#9CA3AF' }} 
                  axisLine={{ stroke: '#21213A' }}
                />
                <YAxis 
                  tick={{ fill: '#9CA3AF' }} 
                  axisLine={{ stroke: '#21213A' }}
                />
                <Tooltip 
                  formatter={(value: number) => formatNumber(value)}
                  contentStyle={{ 
                    backgroundColor: '#0F0F18', 
                    borderColor: '#21213A' 
                  }}
                  labelStyle={{ color: '#fff' }}
                  labelFormatter={(hour) => `${hour}:00h`}
                />
                <Bar dataKey="count" fill="#00EEFF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card
          title="Atividades Recentes"
          subtitle="Últimas 24 horas"
        >
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {stats.recentActivities.map((activity) => (
              <div 
                key={activity.id}
                className="p-3 border border-[#21213A] rounded-lg bg-[#15152A]/50"
              >
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-white">{activity.userName}</p>
                  <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  <span className="inline-block px-2 py-0.5 bg-[#6C00FF]/20 text-[#00EEFF] rounded-full mr-2">
                    {activity.action}
                  </span>
                  {activity.details}
                </p>
                <p className="text-xs text-gray-500 mt-1">IP: {activity.ip}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-sm text-[#00EEFF] hover:text-[#00EEFF]/80">
              Ver todas as atividades
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;