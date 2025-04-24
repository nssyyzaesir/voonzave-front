import React, { useState } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import { ActivityLog } from '../utils/types';
import { 
  Search, 
  FileText, 
  Calendar, 
  Filter,
  DownloadCloud,
  Trash2,
  RefreshCw
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';

// Dados mockados de logs de atividade
const mockLogs: ActivityLog[] = [
  { id: 1, userId: 1, userName: 'João Silva', action: 'Login', details: 'Login bem-sucedido', ip: '189.40.102.5', timestamp: '2025-04-19T12:30:00Z' },
  { id: 2, userId: 2, userName: 'Maria Oliveira', action: 'Assinatura', details: 'Assinatura do plano Pro', ip: '201.15.178.42', timestamp: '2025-04-19T12:15:00Z' },
  { id: 3, userId: 3, userName: 'Carlos Pereira', action: 'Atualização', details: 'Atualização de perfil', ip: '187.122.45.87', timestamp: '2025-04-19T11:45:00Z' },
  { id: 4, userId: 4, userName: 'Ana Souza', action: 'Registro', details: 'Novo usuário registrado', ip: '200.178.56.123', timestamp: '2025-04-19T11:30:00Z' },
  { id: 5, userId: 5, userName: 'Pedro Santos', action: 'Pagamento', details: 'Pagamento processado', ip: '177.45.133.76', timestamp: '2025-04-19T11:15:00Z' },
  { id: 6, userId: 1, userName: 'João Silva', action: 'Logout', details: 'Logout do sistema', ip: '189.40.102.5', timestamp: '2025-04-19T10:45:00Z' },
  { id: 7, userId: 6, userName: 'Lúcia Costa', action: 'Acesso', details: 'Acesso à área restrita', ip: '201.76.188.42', timestamp: '2025-04-19T10:30:00Z' },
  { id: 8, userId: 7, userName: 'Roberto Almeida', action: 'Download', details: 'Download de relatório', ip: '189.45.103.65', timestamp: '2025-04-19T10:15:00Z' },
  { id: 9, userId: 8, userName: 'Fernanda Lima', action: 'Administração', details: 'Alteração de configurações do sistema', ip: '200.97.188.21', timestamp: '2025-04-19T10:00:00Z' },
  { id: 10, userId: 2, userName: 'Maria Oliveira', action: 'Login', details: 'Login bem-sucedido', ip: '201.15.178.42', timestamp: '2025-04-19T09:45:00Z' },
  { id: 11, userId: 3, userName: 'Carlos Pereira', action: 'Alteração', details: 'Alteração de senha', ip: '187.122.45.87', timestamp: '2025-04-19T09:30:00Z' },
  { id: 12, userId: 4, userName: 'Ana Souza', action: 'Upload', details: 'Upload de arquivo', ip: '200.178.56.123', timestamp: '2025-04-19T09:15:00Z' },
  { id: 13, userId: 5, userName: 'Pedro Santos', action: 'Cancelamento', details: 'Cancelamento de assinatura', ip: '177.45.133.76', timestamp: '2025-04-19T09:00:00Z' },
  { id: 14, userId: 6, userName: 'Lúcia Costa', action: 'Login', details: 'Login bem-sucedido', ip: '201.76.188.42', timestamp: '2025-04-19T08:45:00Z' },
  { id: 15, userId: 7, userName: 'Roberto Almeida', action: 'Visualização', details: 'Visualização de relatório', ip: '189.45.103.65', timestamp: '2025-04-19T08:30:00Z' },
  { id: 16, userId: 8, userName: 'Fernanda Lima', action: 'Administração', details: 'Criação de novo usuário admin', ip: '200.97.188.21', timestamp: '2025-04-19T08:15:00Z' },
  { id: 17, userId: 1, userName: 'João Silva', action: 'Falha', details: 'Falha na tentativa de login', ip: '189.40.102.5', timestamp: '2025-04-19T08:00:00Z' },
  { id: 18, userId: 2, userName: 'Maria Oliveira', action: 'Envio', details: 'Envio de mensagem', ip: '201.15.178.42', timestamp: '2025-04-19T07:45:00Z' },
  { id: 19, userId: 3, userName: 'Carlos Pereira', action: 'Configuração', details: 'Alteração de preferências', ip: '187.122.45.87', timestamp: '2025-04-19T07:30:00Z' },
  { id: 20, userId: 4, userName: 'Ana Souza', action: 'Solicitação', details: 'Solicitação de suporte', ip: '200.178.56.123', timestamp: '2025-04-19T07:15:00Z' },
];

// Tipos de ações disponíveis
const actionTypes = ['Login', 'Logout', 'Registro', 'Assinatura', 'Pagamento', 'Acesso', 'Download', 'Upload', 'Alteração', 'Administração', 'Visualização', 'Falha', 'Cancelamento', 'Atualização', 'Envio', 'Configuração', 'Solicitação'];

const ActivityLogs: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>(mockLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Formato de data e hora
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Filtrar logs com base nos critérios
  const filteredLogs = logs.filter(log => {
    // Filtro de busca
    const matchesSearch = searchTerm 
      ? log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ip.includes(searchTerm)
      : true;
    
    // Filtro de data
    const logDate = new Date(log.timestamp);
    const matchesDateRange = (!startDate || logDate >= startDate) && 
                             (!endDate || logDate <= endDate);
    
    // Filtro de ações
    const matchesActions = selectedActions.length === 0 || 
                           selectedActions.includes(log.action);
    
    return matchesSearch && matchesDateRange && matchesActions;
  });

  // Alternar seleção de ação no filtro
  const toggleActionFilter = (action: string) => {
    if (selectedActions.includes(action)) {
      setSelectedActions(selectedActions.filter(a => a !== action));
    } else {
      setSelectedActions([...selectedActions, action]);
    }
  };

  // Limpar todos os filtros
  const clearFilters = () => {
    setSearchTerm('');
    setStartDate(null);
    setEndDate(null);
    setSelectedActions([]);
  };

  // Simular exportação de logs
  const handleExportLogs = () => {
    toast.success('Logs exportados com sucesso!');
  };

  // Simular limpeza de logs antigos
  const handleClearOldLogs = () => {
    toast.success('Logs antigos foram limpos com sucesso!');
  };
  
  // Simular atualização de logs
  const handleRefreshLogs = () => {
    toast.success('Logs atualizados com sucesso!');
  };

  // Colunas da tabela
  const columns = [
    {
      header: 'Data/Hora',
      accessor: (log: ActivityLog) => formatDateTime(log.timestamp),
      sortable: true
    },
    {
      header: 'Usuário',
      accessor: (log: ActivityLog) => (
        <div>
          <p className="font-medium text-white">{log.userName}</p>
          <p className="text-xs text-gray-400">ID: {log.userId}</p>
        </div>
      )
    },
    {
      header: 'Ação',
      accessor: (log: ActivityLog) => {
        // Definir estilos baseados no tipo de ação
        let actionConfig = {
          color: 'text-blue-400',
          bg: 'bg-blue-400/10'
        };
        
        switch (log.action) {
          case 'Login':
          case 'Logout':
            actionConfig = { color: 'text-green-400', bg: 'bg-green-400/10' };
            break;
          case 'Falha':
            actionConfig = { color: 'text-red-400', bg: 'bg-red-400/10' };
            break;
          case 'Administração':
            actionConfig = { color: 'text-purple-400', bg: 'bg-purple-400/10' };
            break;
          case 'Pagamento':
          case 'Assinatura':
          case 'Cancelamento':
            actionConfig = { color: 'text-[#00EEFF]', bg: 'bg-[#00EEFF]/10' };
            break;
          case 'Registro':
            actionConfig = { color: 'text-yellow-400', bg: 'bg-yellow-400/10' };
            break;
        }
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${actionConfig.color} ${actionConfig.bg}`}>
            {log.action}
          </span>
        );
      }
    },
    {
      header: 'Detalhes',
      accessor: 'details'
    },
    {
      header: 'IP',
      accessor: 'ip'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Logs de Atividade</h1>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleRefreshLogs}
            className="p-2 rounded-lg bg-[#15152A] hover:bg-[#21213A] text-gray-400 hover:text-white"
            title="Atualizar logs"
          >
            <RefreshCw size={18} />
          </button>
          <button 
            onClick={handleExportLogs}
            className="p-2 rounded-lg bg-[#15152A] hover:bg-[#21213A] text-gray-400 hover:text-white"
            title="Exportar logs"
          >
            <DownloadCloud size={18} />
          </button>
          <button 
            onClick={handleClearOldLogs}
            className="p-2 rounded-lg bg-[#15152A] hover:bg-[#21213A] text-gray-400 hover:text-white"
            title="Limpar logs antigos"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <Card>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                className="w-full py-2 pl-10 pr-3 text-sm bg-[#15152A] border border-[#21213A] rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                placeholder="Buscar por usuário, detalhes ou IP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-3 py-2 bg-[#15152A] hover:bg-[#21213A] text-gray-400 hover:text-white rounded-lg text-sm"
            >
              <Filter size={16} className="mr-2" />
              {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </button>
          </div>
          
          {showFilters && (
            <div className="p-4 bg-[#15152A] border border-[#21213A] rounded-lg">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    <Calendar size={16} className="inline-block mr-1" />
                    Data Inicial
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={setStartDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    maxDate={new Date()}
                    className="w-full py-2 px-3 text-sm bg-[#0F0F18] border border-[#21213A] rounded-lg text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                    placeholderText="Selecione a data inicial"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    <Calendar size={16} className="inline-block mr-1" />
                    Data Final
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={setEndDate}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    maxDate={new Date()}
                    className="w-full py-2 px-3 text-sm bg-[#0F0F18] border border-[#21213A] rounded-lg text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                    placeholderText="Selecione a data final"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <FileText size={16} className="inline-block mr-1" />
                  Filtrar por Tipo de Ação
                </label>
                <div className="flex flex-wrap gap-2">
                  {actionTypes.map((action) => (
                    <button
                      key={action}
                      onClick={() => toggleActionFilter(action)}
                      className={`px-2 py-1 text-xs rounded-md ${
                        selectedActions.includes(action) 
                          ? 'bg-[#6C00FF] text-white' 
                          : 'bg-[#0F0F18] text-gray-400 hover:bg-[#21213A] hover:text-white'
                      }`}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={clearFilters}
                  className="px-3 py-1 text-sm text-gray-400 hover:text-white"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
          )}
          
          <Table 
            data={filteredLogs} 
            columns={columns}
            pagination={true}
            itemsPerPage={10}
            emptyMessage="Nenhum log de atividade encontrado com os filtros atuais."
          />
          
          <div className="text-sm text-gray-500">
            Mostrando {filteredLogs.length} de {logs.length} logs de atividade
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ActivityLogs;