import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from "firebase/auth";

// Acessando variáveis de ambiente do Vite
const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const FIREBASE_APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;

// Verificar se as variáveis de ambiente necessárias estão definidas
const hasFirebaseConfig = 
  !!FIREBASE_API_KEY && 
  !!FIREBASE_PROJECT_ID &&
  !!FIREBASE_APP_ID;

// Configuração do Firebase usando variáveis de ambiente
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY || "firebase-api-key-not-set",
  authDomain: `${FIREBASE_PROJECT_ID || "demo"}.firebaseapp.com`,
  projectId: FIREBASE_PROJECT_ID || "demo",
  storageBucket: `${FIREBASE_PROJECT_ID || "demo"}.appspot.com`,
  appId: FIREBASE_APP_ID || "firebase-app-id-not-set",
};

// Log para confirmar que as variáveis estão sendo carregadas corretamente (sem mostrar os valores completos)
console.log("Firebase config carregado:", {
  projectId: FIREBASE_PROJECT_ID,
  apiKeyPresent: !!FIREBASE_API_KEY,
  appIdPresent: !!FIREBASE_APP_ID,
});

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Exportar o objeto de autenticação e o provedor do Google
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Em ambiente de desenvolvimento sem configuração Firebase completa,
// usamos a autenticação local baseada nas rotas da API que criamos
if (!hasFirebaseConfig && import.meta.env.DEV) {
  console.log("Firebase não configurado completamente. Usando autenticação baseada em API em vez de Firebase Auth em ambiente de desenvolvimento.");
  
  // Não configuramos emulador, apenas usamos a autenticação da API
} else {
  // Adicionar configurações para autenticação
  googleProvider.setCustomParameters({
    // Forçar seleção de conta
    prompt: 'select_account',
    // Adicionar origem permitida para redirecionamento (domínio Replit)
    redirect_domain: window.location.origin
  });
}