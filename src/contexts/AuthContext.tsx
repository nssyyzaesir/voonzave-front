import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  signInWithRedirect, 
  signOut, 
  onAuthStateChanged, 
  getRedirectResult 
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { apiRequest } from '@/lib/queryClient';

// Interface para representar um usuário da API local
interface ApiUser {
  id: number | string;
  email: string;
  name?: string;
  role?: string;
  token?: string;
}

// Interface para o contexto de autenticação
interface AuthContextType {
  currentUser: User | ApiUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

// Contexto inicial
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  signInWithGoogle: async () => {},
  logout: async () => {},
});

// Hook para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);

// Props do provedor de autenticação
interface AuthProviderProps {
  children: ReactNode;
}

// Acessando variáveis de ambiente
const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const FIREBASE_APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;

// Verificar se o Firebase está configurado
const isFirebaseConfigured = 
  !!FIREBASE_API_KEY && 
  !!FIREBASE_PROJECT_ID &&
  !!FIREBASE_APP_ID;

// Provedor de autenticação
export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | ApiUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para fazer login com Google
  async function signInWithGoogle() {
    try {
      if (isFirebaseConfigured) {
        // Usando Firebase Auth com Google
        await signInWithRedirect(auth, googleProvider);
      } else {
        // Em desenvolvimento sem Firebase configurado,
        // redirecionamos para a nossa API de autenticação interna
        console.log("Firebase não configurado. Redirecionando para login local.");
        
        // Aqui você poderia implementar um login com credenciais ou outra interface
        // Mas para facilitar o desenvolvimento, vamos apenas redirecionar para a página
        // de autenticação da API já implementada
        window.location.href = "/login";
      }
    } catch (error: any) {
      console.error('Erro ao fazer login com Google:', error);
      
      // Tratar erro de domínio não autorizado
      if (error.code === 'auth/unauthorized-domain') {
        alert('Erro: Este domínio não está autorizado no Firebase. Adicione o domínio nas configurações do Firebase.');
        
        // Mostrar o domínio que precisa ser adicionado
        console.log('Adicione este domínio ao Firebase:', window.location.origin);
      }
      
      throw error; // Repassar o erro para tratamento no componente
    }
  }

  // Função para fazer logout
  async function logout() {
    try {
      if (isFirebaseConfigured) {
        // Usando Firebase Auth
        await signOut(auth);
      } else {
        // Usando nossa API local
        localStorage.removeItem('auth_token');
        setCurrentUser(null);
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  // Efeito para observar mudanças no estado de autenticação
  useEffect(() => {
    if (isFirebaseConfigured) {
      // Firebase está configurado, usar sistema normal
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });

      // Verificar resultado do redirecionamento após login
      getRedirectResult(auth)
        .then((result) => {
          if (result) {
            // Login bem-sucedido
            console.log("Login realizado com sucesso!");
          }
        })
        .catch((error) => {
          console.error("Erro no redirecionamento:", error);
        });

      return unsubscribe;
    } else {
      // Firebase não configurado, usar o token local
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        // Verificar se o token é válido consultando a API
        apiRequest('GET', '/api/auth/me')
        .then(async (response) => {
          if (response.ok) {
            // Se o token for válido, definir o usuário atual
            const userData = await response.json();
            if (userData && userData.user) {
              setCurrentUser({
                id: userData.user.id,
                email: userData.user.email,
                name: userData.user.name,
                role: userData.user.role,
                token
              });
            }
          }
        })
        .catch(error => {
          console.error('Erro ao verificar token:', error);
          localStorage.removeItem('auth_token');
        })
        .finally(() => {
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
      
      return () => {};
    }
  }, []);

  // Valor do contexto
  const value: AuthContextType = {
    currentUser,
    loading,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}