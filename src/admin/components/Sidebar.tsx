import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CreditCard, 
  Settings, 
  ChevronLeft, 
  LogOut,
  Menu,
  Tag
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      // Limpar o localStorage antes do logout
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_role');
      
      // Chamar a função de logout
      await logout();
      
      // Redirecionar para a página de login (não auth)
      window.location.href = '/login';
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Em caso de erro, forçar o redirecionamento
      window.location.href = '/login';
    }
  };

  // Usar caminhos absolutos para as rotas do admin
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin' },
    { icon: <Users size={20} />, label: 'Usuários', path: '/admin/users' },
    { icon: <FileText size={20} />, label: 'Logs de Atividade', path: '/admin/logs' },
    { icon: <CreditCard size={20} />, label: 'Planos', path: '/admin/plans' },
    { icon: <Tag size={20} />, label: 'Ofertas', path: '/admin/offers' },
    { icon: <Settings size={20} />, label: 'Configurações', path: '/admin/settings' },
  ];

  const sidebarClasses = isMobile
    ? `fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`
    : `relative transform transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      }`;

  return (
    <>
      {/* Overlay para mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`${sidebarClasses} bg-[#0F0F18] border-r border-[#21213A] h-full`}
      >
        <div className="flex flex-col h-full">
          {/* Logo e botão de toggle */}
          <div className="p-4 flex items-center justify-between border-b border-[#21213A]">
            <div className="flex items-center space-x-3">
              {(isOpen || isMobile) && (
                <span className="font-orbitron text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6C00FF] to-[#00EEFF]">
                  Voonzave
                </span>
              )}
              {!isOpen && !isMobile && (
                <span className="font-orbitron text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6C00FF] to-[#00EEFF]">
                  V
                </span>
              )}
            </div>
            {!isMobile && (
              <button 
                onClick={toggleSidebar}
                className="p-1 rounded-md hover:bg-[#21213A] text-gray-400 hover:text-white"
              >
                <ChevronLeft size={16} className={`transform transition-transform ${isOpen ? '' : 'rotate-180'}`} />
              </button>
            )}
            {isMobile && (
              <button 
                onClick={toggleSidebar}
                className="p-1 rounded-md hover:bg-[#21213A] text-gray-400 hover:text-white"
              >
                <Menu size={20} />
              </button>
            )}
          </div>

          {/* Navegação */}
          <nav className="p-3 flex-grow">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    className={`flex items-center py-2 px-3 rounded-lg transition-colors ${
                      location.pathname === item.path 
                        ? 'bg-gradient-to-r from-[#6C00FF]/20 to-[#00EEFF]/10 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-[#21213A]'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      // Usando window.location para garantir navegação completa
                      window.location.href = item.path;
                    }}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      {(isOpen || isMobile) && <span>{item.label}</span>}
                    </div>
                    {(isOpen || isMobile) && location.pathname === item.path && (
                      <div className="ml-auto w-1.5 h-5 rounded-full bg-gradient-to-b from-[#6C00FF] to-[#00EEFF]" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Rodapé com logout */}
          <div className="p-3 border-t border-[#21213A]">
            <button 
              onClick={handleLogout}
              className="flex items-center w-full py-2 px-3 text-gray-400 hover:text-white hover:bg-[#21213A] rounded-lg transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              {(isOpen || isMobile) && <span>Sair</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;