import React, { useState } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { UserData, UserFormData } from '../utils/types';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Ban,
  AlertCircle,
  User,
  Mail,
  UserCheck,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

// Dados mockados de usuários
const mockUsers: UserData[] = [
  { 
    id: 1, 
    name: 'João Silva', 
    email: 'joao.silva@exemplo.com', 
    role: 'admin', 
    status: 'active', 
    createdAt: '2025-01-15T10:30:00Z',
    lastLogin: '2025-04-19T08:45:00Z'
  },
  { 
    id: 2, 
    name: 'Maria Oliveira', 
    email: 'maria.oliveira@exemplo.com', 
    role: 'user', 
    status: 'active', 
    createdAt: '2025-02-20T14:15:00Z',
    lastLogin: '2025-04-18T16:30:00Z'
  },
  { 
    id: 3, 
    name: 'Carlos Pereira', 
    email: 'carlos.pereira@exemplo.com', 
    role: 'user', 
    status: 'inactive', 
    createdAt: '2025-03-10T09:45:00Z',
    lastLogin: '2025-04-10T11:20:00Z'
  },
  { 
    id: 4, 
    name: 'Ana Souza', 
    email: 'ana.souza@exemplo.com', 
    role: 'admin', 
    status: 'active', 
    createdAt: '2025-03-15T16:20:00Z',
    lastLogin: '2025-04-19T09:15:00Z'
  },
  { 
    id: 5, 
    name: 'Pedro Santos', 
    email: 'pedro.santos@exemplo.com', 
    role: 'user', 
    status: 'banned', 
    createdAt: '2025-03-22T08:10:00Z',
    lastLogin: '2025-03-25T10:45:00Z'
  },
  { 
    id: 6, 
    name: 'Lúcia Costa', 
    email: 'lucia.costa@exemplo.com', 
    role: 'user', 
    status: 'active', 
    createdAt: '2025-02-10T11:30:00Z',
    lastLogin: '2025-04-18T14:55:00Z'
  },
  { 
    id: 7, 
    name: 'Roberto Almeida', 
    email: 'roberto.almeida@exemplo.com', 
    role: 'user', 
    status: 'active', 
    createdAt: '2025-01-25T13:45:00Z',
    lastLogin: '2025-04-17T17:30:00Z'
  },
  { 
    id: 8, 
    name: 'Fernanda Lima', 
    email: 'fernanda.lima@exemplo.com', 
    role: 'master', 
    status: 'active', 
    createdAt: '2025-01-10T10:00:00Z',
    lastLogin: '2025-04-19T07:30:00Z'
  }
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'user',
    status: 'active',
    password: '',
    confirmPassword: ''
  });

  // Formato de data padronizado
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Filtrar usuários com base no termo de busca
  const filteredUsers = searchTerm 
    ? users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    : users;

  // Manipular mudanças no formulário
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Resetar o formulário
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'user',
      status: 'active',
      password: '',
      confirmPassword: ''
    });
  };

  // Abrir modal de edição com os dados do usuário
  const handleEditUser = (user: UserData) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsEditModalOpen(true);
  };

  // Abrir modal de exclusão
  const handleDeleteUser = (user: UserData) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // Abrir modal de banimento
  const handleBanUser = (user: UserData) => {
    setSelectedUser(user);
    setIsBanModalOpen(true);
  };

  // Criar novo usuário
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }
    
    // Simular criação de usuário
    const newUser: UserData = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      createdAt: new Date().toISOString()
    };
    
    setUsers(prev => [newUser, ...prev]);
    setIsCreateModalOpen(false);
    resetForm();
    toast.success('Usuário criado com sucesso!');
  };

  // Atualizar usuário existente
  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUser) return;
    
    // Validação básica
    if (!formData.name || !formData.email) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }
    
    // Atualizar usuário
    setUsers(prev => prev.map(user => 
      user.id === selectedUser.id 
        ? { 
            ...user, 
            name: formData.name, 
            email: formData.email, 
            role: formData.role, 
            status: formData.status 
          } 
        : user
    ));
    
    setIsEditModalOpen(false);
    resetForm();
    toast.success('Usuário atualizado com sucesso!');
  };

  // Excluir usuário
  const handleConfirmDelete = () => {
    if (!selectedUser) return;
    
    setUsers(prev => prev.filter(user => user.id !== selectedUser.id));
    setIsDeleteModalOpen(false);
    toast.success('Usuário excluído com sucesso!');
  };

  // Banir usuário
  const handleConfirmBan = () => {
    if (!selectedUser) return;
    
    setUsers(prev => prev.map(user => 
      user.id === selectedUser.id 
        ? { ...user, status: 'banned' } 
        : user
    ));
    
    setIsBanModalOpen(false);
    toast.success('Usuário banido com sucesso!');
  };

  // Colunas da tabela
  const columns = [
    {
      header: 'Usuário',
      accessor: (user: UserData) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6C00FF] to-[#00EEFF] p-0.5 mr-3">
            <div className="w-full h-full rounded-full bg-[#0F0F18] flex items-center justify-center">
              <User size={14} className="text-gray-300" />
            </div>
          </div>
          <div>
            <p className="font-medium text-white">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
        </div>
      ),
      sortable: true
    },
    {
      header: 'Função',
      accessor: (user: UserData) => {
        let roleConfig = {
          color: 'text-blue-400',
          bg: 'bg-blue-400/10',
          icon: <UserCheck size={14} className="mr-1" />,
          label: 'Usuário'
        };
        
        if (user.role === 'admin') {
          roleConfig = {
            color: 'text-purple-400',
            bg: 'bg-purple-400/10',
            icon: <Shield size={14} className="mr-1" />,
            label: 'Admin'
          };
        } else if (user.role === 'master') {
          roleConfig = {
            color: 'text-[#00EEFF]',
            bg: 'bg-[#00EEFF]/10',
            icon: <Shield size={14} className="mr-1" />,
            label: 'Master'
          };
        }
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleConfig.color} ${roleConfig.bg}`}>
            {roleConfig.icon}
            {roleConfig.label}
          </span>
        );
      }
    },
    {
      header: 'Status',
      accessor: (user: UserData) => {
        let statusConfig = {
          color: 'text-green-400',
          bg: 'bg-green-400/10',
          icon: <CheckCircle size={14} className="mr-1" />,
          label: 'Ativo'
        };
        
        if (user.status === 'inactive') {
          statusConfig = {
            color: 'text-yellow-400',
            bg: 'bg-yellow-400/10',
            icon: <Clock size={14} className="mr-1" />,
            label: 'Inativo'
          };
        } else if (user.status === 'banned') {
          statusConfig = {
            color: 'text-red-400',
            bg: 'bg-red-400/10',
            icon: <Ban size={14} className="mr-1" />,
            label: 'Banido'
          };
        }
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color} ${statusConfig.bg}`}>
            {statusConfig.icon}
            {statusConfig.label}
          </span>
        );
      }
    },
    {
      header: 'Criado em',
      accessor: (user: UserData) => formatDate(user.createdAt),
      sortable: true
    },
    {
      header: 'Último Login',
      accessor: (user: UserData) => user.lastLogin ? formatDate(user.lastLogin) : 'Nunca',
      sortable: true
    },
    {
      header: 'Ações',
      accessor: (user: UserData) => (
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => handleEditUser(user)}
            className="p-1 rounded-md text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
            title="Editar"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={() => handleDeleteUser(user)}
            className="p-1 rounded-md text-red-400 hover:text-red-300 hover:bg-red-400/10"
            title="Excluir"
          >
            <Trash2 size={16} />
          </button>
          {user.role !== 'master' && (
            <button 
              onClick={() => handleBanUser(user)}
              className="p-1 rounded-md text-orange-400 hover:text-orange-300 hover:bg-orange-400/10"
              title="Banir"
            >
              <Ban size={16} />
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Gerenciamento de Usuários</h1>
        <button 
          onClick={() => {
            resetForm();
            setIsCreateModalOpen(true);
          }}
          className="px-4 py-2 bg-[#6C00FF] hover:bg-[#6C00FF]/90 text-white rounded-lg flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Novo Usuário
        </button>
      </div>
      
      <Card>
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-3 text-sm bg-[#15152A] border border-[#21213A] rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Table 
          data={filteredUsers} 
          columns={columns}
          pagination={true}
          itemsPerPage={10}
        />
      </Card>
      
      {/* Modal para criar novo usuário */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Adicionar Novo Usuário"
        size="md"
      >
        <form onSubmit={handleCreateUser}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nome
              </label>
              <input
                type="text"
                name="name"
                className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                placeholder="Digite o nome do usuário"
                value={formData.name}
                onChange={handleFormChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                placeholder="Digite o email do usuário"
                value={formData.email}
                onChange={handleFormChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Função
                </label>
                <select
                  name="role"
                  className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                  value={formData.role}
                  onChange={handleFormChange}
                >
                  <option value="user">Usuário</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                  value={formData.status}
                  onChange={handleFormChange}
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Senha
              </label>
              <input
                type="password"
                name="password"
                className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                placeholder="Digite a senha"
                value={formData.password}
                onChange={handleFormChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Confirmar Senha
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                placeholder="Confirme a senha"
                value={formData.confirmPassword}
                onChange={handleFormChange}
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 bg-[#21213A] hover:bg-[#21213A]/80 text-gray-300 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#6C00FF] hover:bg-[#6C00FF]/90 text-white rounded-lg"
            >
              Adicionar Usuário
            </button>
          </div>
        </form>
      </Modal>
      
      {/* Modal para editar usuário */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Usuário"
        size="md"
      >
        <form onSubmit={handleUpdateUser}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nome
              </label>
              <input
                type="text"
                name="name"
                className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                placeholder="Digite o nome do usuário"
                value={formData.name}
                onChange={handleFormChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                placeholder="Digite o email do usuário"
                value={formData.email}
                onChange={handleFormChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Função
                </label>
                <select
                  name="role"
                  className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                  value={formData.role}
                  onChange={handleFormChange}
                  disabled={selectedUser?.role === 'master'}
                >
                  <option value="user">Usuário</option>
                  <option value="admin">Admin</option>
                  {selectedUser?.role === 'master' && <option value="master">Master</option>}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                  value={formData.status}
                  onChange={handleFormChange}
                  disabled={selectedUser?.role === 'master'}
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                  <option value="banned">Banido</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nova Senha (deixe em branco para manter a atual)
              </label>
              <input
                type="password"
                name="password"
                className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                placeholder="Digite a nova senha (opcional)"
                value={formData.password}
                onChange={handleFormChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Confirmar Nova Senha
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                placeholder="Confirme a nova senha"
                value={formData.confirmPassword}
                onChange={handleFormChange}
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 bg-[#21213A] hover:bg-[#21213A]/80 text-gray-300 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#6C00FF] hover:bg-[#6C00FF]/90 text-white rounded-lg"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </Modal>
      
      {/* Modal para confirmar exclusão */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Excluir Usuário"
        size="sm"
      >
        <div className="text-center py-4">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            Tem certeza que deseja excluir?
          </h3>
          <p className="text-gray-400 mb-4">
            Você está prestes a excluir o usuário <span className="text-white font-medium">{selectedUser?.name}</span>.<br />
            Esta ação não pode ser desfeita.
          </p>
          
          <div className="flex justify-center space-x-3 mt-6">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-[#21213A] hover:bg-[#21213A]/80 text-gray-300 rounded-lg"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            >
              Excluir
            </button>
          </div>
        </div>
      </Modal>
      
      {/* Modal para confirmar banimento */}
      <Modal
        isOpen={isBanModalOpen}
        onClose={() => setIsBanModalOpen(false)}
        title="Banir Usuário"
        size="sm"
      >
        <div className="text-center py-4">
          <Ban size={48} className="mx-auto text-orange-500 mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            Tem certeza que deseja banir?
          </h3>
          <p className="text-gray-400 mb-4">
            Você está prestes a banir o usuário <span className="text-white font-medium">{selectedUser?.name}</span>.<br />
            O usuário ficará impossibilitado de acessar a plataforma.
          </p>
          
          <div className="flex justify-center space-x-3 mt-6">
            <button
              onClick={() => setIsBanModalOpen(false)}
              className="px-4 py-2 bg-[#21213A] hover:bg-[#21213A]/80 text-gray-300 rounded-lg"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmBan}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
            >
              Banir
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagement;