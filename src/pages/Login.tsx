import { useAuth } from "@/contexts/AuthContext";
import { FormEvent, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { getRedirectResult } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/queryClient";

// Forçar o uso da autenticação local enquanto resolvemos o problema do Firebase
const isFirebaseConfigured = false;

export default function Login() {
  const { currentUser, signInWithGoogle } = useAuth();
  const [, setLocation] = useLocation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Verificar o resultado do redirecionamento e redirecionar para o dashboard
  useEffect(() => {
    // Verifica se está autenticado
    if (currentUser) {
      setLocation("/dashboard");
      return;
    }

    if (isFirebaseConfigured) {
      // Verificar resultado do redirecionamento de autenticação do Firebase
      getRedirectResult(auth)
        .then((result) => {
          if (result?.user) {
            console.log("Login com redirecionamento concluído");
            setLocation("/dashboard");
          }
        })
        .catch((error) => {
          console.error("Erro no redirecionamento:", error);
        });
    }
  }, [currentUser, setLocation]);

  // Função de login com Google
  const handleGoogleLogin = async () => {
    try {
      setIsLoggingIn(true);
      await signInWithGoogle();
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setIsLoggingIn(false);
    }
  };
  
  // Função de login com email/senha (API local)
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }
    
    try {
      setIsLoggingIn(true);
      
      console.log("Enviando requisição de login para API:", { email, password });
      
      // Alterando para usar o método POST diretamente em vez da função apiRequest
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
        const userData = await response.json();
        console.log("Resposta de login bem-sucedida:", userData);
        
        if (userData && userData.token) {
          // Salvar o token e redirecionar
          localStorage.setItem('auth_token', userData.token);
          console.log("Token salvo, redirecionando para:", userData.role === 'admin' ? '/admin' : '/dashboard');
          
          // Salvar o papel do usuário no localStorage também
          localStorage.setItem('user_role', userData.role);
          
          // Se for admin, redirecionar para o painel de admin
          if (userData.role === 'admin') {
            console.log("Redirecionando para admin com reload completo");
            // Forçar um redirect absoluto com o protocolo e domínio completos
            window.location.replace(window.location.origin + '/admin');
          } else {
            console.log("Redirecionando para dashboard com reload completo");
            window.location.replace(window.location.origin + '/dashboard');
          }
        } else {
          setError("Dados de usuário inválidos no retorno da API.");
          setIsLoggingIn(false);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Erro ao fazer login. Verifique suas credenciais.");
        setIsLoggingIn(false);
      }
    } catch (error: any) {
      console.error("Erro ao fazer login com API local:", error);
      setError(error.message || "Erro ao fazer login. Tente novamente.");
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A14] flex items-center justify-center px-4">
      <div 
        className="max-w-md w-full bg-[#0F0F18] p-8 rounded-2xl shadow-lg border border-[#6C00FF]/30"
        data-aos="fade-up"
      >
        <div className="text-center mb-8">
          <div className="inline-block w-24 h-24 rounded-full bg-gradient-to-r from-[#6C00FF] to-[#00EEFF] p-1 mb-6">
            <div className="w-full h-full rounded-full bg-[#0F0F18] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#00EEFF]" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-orbitron font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6C00FF] to-[#00EEFF]">
            Acesse sua conta Voonzave
          </h1>
          <p className="text-gray-400 mt-2">
            Continue com sua conta Google para acessar todos os recursos
          </p>
        </div>
        
        {isFirebaseConfigured ? (
          <div className="space-y-4">
            <Button
              onClick={handleGoogleLogin}
              className="w-full bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-all flex items-center justify-center space-x-2 shadow-sm"
              variant="outline"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#6C00FF] border-t-transparent mr-2"></div>
                  <span>Autenticando...</span>
                </>
              ) : (
                <>
                  <FcGoogle className="h-5 w-5" />
                  <span>Entrar com Google</span>
                </>
              )}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#1A1A2E] border-[#6C00FF]/30 focus:border-[#6C00FF] text-gray-100"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-200">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#1A1A2E] border-[#6C00FF]/30 focus:border-[#6C00FF] text-gray-100"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6C00FF] to-[#00EEFF] hover:opacity-90 text-white font-medium py-3 px-4 rounded-lg transition-all"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                  <span>Autenticando...</span>
                </>
              ) : (
                <span>Entrar</span>
              )}
            </Button>
            
            <div className="text-center mt-4 flex flex-col space-y-2">
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  setEmail("usuario@teste.com");
                  setPassword("senha123");
                }}
                className="text-[#00EEFF] hover:text-[#00EEFF]/80 text-sm"
              >
                Usar credenciais de teste (usuário)
              </Button>
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  setEmail("admin@voonzave.com");
                  setPassword("admin123");
                }}
                className="text-[#00EEFF] hover:text-[#00EEFF]/80 text-sm"
              >
                Usar credenciais de admin
              </Button>
            </div>
          </form>
        )}
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Ao continuar, você concorda com os Termos de Serviço e Política de Privacidade da Voonzave</p>
        </div>
        
        {/* Detalhes decorativos */}
        <div className="absolute top-20 -left-20 w-64 h-64 bg-[#6C00FF] rounded-full blur-[150px] opacity-10 -z-10" />
        <div className="absolute bottom-20 -right-20 w-64 h-64 bg-[#00EEFF] rounded-full blur-[150px] opacity-10 -z-10" />
      </div>
    </div>
  );
}