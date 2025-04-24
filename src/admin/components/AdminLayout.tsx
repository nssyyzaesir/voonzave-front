import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { Toaster } from 'react-hot-toast';

const AdminLayout: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // REMOVI a verificação redundante que estava causando redirecionamentos indevidos
  // A autenticação já é verificada no App.tsx principal

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
          <Outlet />
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

export default AdminLayout;