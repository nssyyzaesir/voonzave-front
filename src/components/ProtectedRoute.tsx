import { useAuth } from '@/contexts/AuthContext';
import { Redirect } from 'wouter';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser, loading } = useAuth();

  // Exibir um indicador de carregamento enquanto verifica o estado de autenticação
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6C00FF]"></div>
      </div>
    );
  }

  // Redirecionar para a página de login se não estiver autenticado
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  // Renderizar o conteúdo protegido se estiver autenticado
  return <>{children}</>;
}