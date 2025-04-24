import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  Menu,
  User,
  Settings,
  LogOut,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { adminLogout } from '../utils/auth';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { currentUser, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Notificações mockadas
  const notifications = [
    {
      id: 1,
      title: 'Novo usuário registrado',
      message: 'Um novo usuário se cadastrou na plataforma.',
      time: '5 min atrás',
      unread: true
    },
    {
      id: 2,
      title: 'Alerta de sistema',
      message: 'Backup automático do banco de dados concluído.',
      time: '25 min atrás',
      unread: true
    },
    {
      id: 3,
      title: 'Nova mensagem',
      message: 'Você recebeu uma nova mensagem de suporte.',
      time: '1 hora atrás',
      unread: false
    }
  ];

  // Fechar os dropdowns quando clicar fora deles
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    try {
      // Usar nossa função de adminLogout que é mais específica para o painel admin
      adminLogout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className="bg-[#0F0F18] border-b border-[#21213A] py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center lg:w-1/3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#21213A] lg:hidden"
          >
            <Menu size={20} />
          </button>
          
          <div className="relative ml-2 flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-500" />
            </div>
            <input
              type="search"
              className="w-full py-2 pl-10 pr-3 text-sm bg-[#15152A] border border-[#21213A] rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
              placeholder="Buscar..."
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Notificações */}
          <div className="relative" ref={notificationsRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#21213A] relative"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#0F0F18] border border-[#21213A] rounded-lg shadow-lg z-50">
                <div className="p-3 border-b border-[#21213A]">
                  <h3 className="text-lg font-medium text-white">Notificações</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id}
                      className={`p-3 border-b border-[#21213A] hover:bg-[#15152A] transition-colors ${notification.unread ? 'bg-[#15152A]/50' : ''}`}
                    >
                      <div className="flex items-start">
                        <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${notification.unread ? 'bg-[#00EEFF]' : 'bg-transparent'}`}></div>
                        <div className="ml-2 flex-grow">
                          <h4 className="text-sm font-medium text-white">{notification.title}</h4>
                          <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-[#21213A]">
                  <button className="text-sm text-[#00EEFF] hover:text-[#00EEFF]/80">
                    Ver todas as notificações
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Perfil do usuário */}
          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1 rounded-lg text-gray-300 hover:text-white hover:bg-[#21213A]"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6C00FF] to-[#00EEFF] p-0.5">
                <div className="w-full h-full rounded-full bg-[#0F0F18] flex items-center justify-center">
                  <User size={14} className="text-gray-300" />
                </div>
              </div>
              <span className="text-sm font-medium hidden md:block">
                {currentUser?.email ? currentUser.email.split('@')[0] : 'Admin'}
              </span>
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0F0F18] border border-[#21213A] rounded-lg shadow-lg z-50">
                <div className="p-3 border-b border-[#21213A]">
                  <p className="text-sm font-medium text-white">
                    {currentUser?.email || 'admin@voonzave.com'}
                  </p>
                  <p className="text-xs text-gray-400">Administrador</p>
                </div>
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#21213A] flex items-center">
                    <User size={16} className="mr-2" />
                    Perfil
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#21213A] flex items-center">
                    <Settings size={16} className="mr-2" />
                    Configurações
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#21213A] flex items-center">
                    <HelpCircle size={16} className="mr-2" />
                    Ajuda
                  </button>
                </div>
                <div className="py-1 border-t border-[#21213A]">
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#21213A] flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;