import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import AOS from "aos";
import CookieBanner from "@/components/CookieBanner";
import ThemeToggle from "@/components/ThemeToggle";
import LoadingScreen from "@/components/LoadingScreen";
import { AuthProvider } from "@/contexts/AuthContext";
import { BrowserRouter as ReactRouter, Routes, Route as ReactRoute } from "react-router-dom";
import Admin from "./admin/Admin";

function MainRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/auth" component={Login} />
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      {/* Rotas de admin ficam fora do layout padrão */}
      <Route component={NotFound} />
    </Switch>
  );
}

// Componente para a seção Admin removido - lógica movida para o App

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  
  useEffect(() => {
    // Verificar o token apenas UMA VEZ ao carregar a aplicação
    // Este efeito NÃO deve ser executado em cada navegação dentro do admin
    
    // Para evitar loops de redirecionamento, executamos esta verificação
    // apenas na montagem inicial do componente App
    
    const isAdminPath = window.location.pathname.startsWith('/admin');
    const hasAdminAccess = 
      localStorage.getItem('auth_token') && 
      localStorage.getItem('user_role') === 'admin';
    
    // Para teste, podemos forçar o acesso administrativo:
    //localStorage.setItem('auth_token', 'token-teste');
    //localStorage.setItem('user_role', 'admin');
    
    if (isAdminPath) {
      if (!hasAdminAccess) {
        console.log("Verificação inicial: sem permissão para admin");
        window.location.replace(window.location.origin + '/login');
      } else {
        console.log("Verificação inicial: acesso ao admin permitido");
        setShowAdmin(true);
      }
    }
    
    // Inicializar AOS
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      offset: 50,
    });
    
    // Simular tempo de carregamento
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <LoadingScreen isLoading={isLoading} />
          
          {/* Checar se deve mostrar o admin ou o conteúdo normal */}
          {showAdmin || window.location.pathname.startsWith('/admin') ? (
            <div className="admin-container" style={{ height: '100vh', width: '100%' }}>
              <ReactRouter basename="/">
                <Routes>
                  <ReactRoute path="/admin/*" element={<Admin />} />
                  <ReactRoute path="*" element={<Admin />} />
                </Routes>
              </ReactRouter>
            </div>
          ) : (
            <WouterRouter>
              <Layout>
                <Toaster />
                <ThemeToggle />
                <MainRouter />
                <CookieBanner />
              </Layout>
            </WouterRouter>
          )}
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
