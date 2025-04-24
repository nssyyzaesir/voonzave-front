import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import ActivityLogs from './pages/ActivityLogs';
import SubscriptionPlans from './pages/SubscriptionPlans';
import OfferManagement from './pages/OfferManagement';
import Settings from './pages/Settings';
import { Toaster } from 'react-hot-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { apiRequest } from '@/lib/queryClient';

const Admin: React.FC = () => {
  // Versão simplificada que integra o AdminLayout diretamente
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Começa como true para evitar flash de redirecionamento
  const [isAdmin, setIsAdmin] = useState(true); // Começa como true para evitar flash de redirecionamento

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Verificar autenticação quando o componente é montado
  useEffect(() => {
    const verifyAuthentication = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      
      try {
        // Chamada para verificar se o token é válido
        const response = await apiRequest('GET', '/api/auth/me');
        
        if (!response.ok) {
          console.error("Erro ao verificar autenticação:", response.status);
          setIsAuthenticated(false);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_role');
          return;
        }
        
        const data = await response.json();
        console.log("Resposta da verificação de autenticação:", data);
        
        // Verificar se o usuário tem o papel de admin
        if (data.user && data.user.role === 'admin') {
          setIsAdmin(true);
          setIsAuthenticated(true);
          // Atualizar o papel do usuário no localStorage
          localStorage.setItem('user_role', 'admin');
        } else {
          console.log("Usuário não tem permissão de admin:", data.user);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setIsAuthenticated(false);
      }
    };
    
    verifyAuthentication();
  }, []);
  
  // Redirecionar para a página de login se não estiver autenticado
  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }
  
  // Redirecionar para o dashboard do usuário se não for admin
  if (!isAdmin) {
    window.location.href = '/dashboard';
    return null;
  }
  
  // Renderizamos diretamente um layout admin com as rotas aninhadas
  // Isso evita problemas de redirecionamentos e verificações duplicadas
  return (
    <div className="flex h-screen bg-[#0A0A14] text-gray-200 overflow-hidden">
      <Sidebar 
        isMobile={isMobile} 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0A0A14] p-4">
          <Routes>
            {/* Rota para o dashboard principal */}
            <Route index element={<Dashboard />} />
            
            {/* Mais dois padrões de rotas para garantir compatibilidade */}
            <Route path="" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            
            {/* Caminhos relativos para as subpáginas */}
            <Route path="users" element={<UserManagement />} />
            <Route path="logs" element={<ActivityLogs />} />
            <Route path="plans" element={<SubscriptionPlans />} />
            <Route path="offers" element={<OfferManagement />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
      
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0F0F18',
            color: '#fff',
            border: '1px solid #21213A'
          },
          success: {
            iconTheme: {
              primary: '#00EEFF',
              secondary: '#0F0F18',
            },
          },
          error: {
            iconTheme: {
              primary: '#f43f5e',
              secondary: '#0F0F18',
            },
          },
        }}
      />
    </div>
  );
};

export default Admin;