import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, User, Mail, Zap, Sparkles, Shield } from "lucide-react";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [, setLocation] = useLocation();

  // Função de logout
  const handleLogout = async () => {
    try {
      await logout();
      setLocation("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // Se não houver usuário (não deveria acontecer por causa da rota protegida, mas por segurança)
  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0A0A14] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Elementos decorativos de fundo */}
        <div className="absolute top-0 -left-64 w-96 h-96 bg-[#6C00FF] rounded-full blur-[150px] opacity-10 -z-10"></div>
        <div className="absolute bottom-0 -right-64 w-96 h-96 bg-[#00EEFF] rounded-full blur-[150px] opacity-10 -z-10"></div>
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 
              className="text-3xl font-orbitron font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6C00FF] to-[#00EEFF]"
              data-aos="fade-right"
            >
              Dashboard
            </h1>
            <p 
              className="text-gray-400 mt-2"
              data-aos="fade-right" 
              data-aos-delay="100"
            >
              Bem-vindo(a) de volta, {currentUser.displayName || "Usuário"}!
            </p>
          </div>
          
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="bg-transparent border border-[#6C00FF] hover:bg-[#6C00FF]/10 text-white"
            data-aos="fade-left"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
        
        {/* Cartão de usuário */}
        <Card 
          className="mb-8 border border-[#6C00FF]/30 bg-[#0F0F18] p-6 rounded-xl"
          data-aos="fade-up"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0 rounded-full bg-gradient-to-r from-[#6C00FF] to-[#00EEFF] p-1 w-16 h-16">
              {currentUser.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt={currentUser.displayName || "Usuário"} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-[#0F0F18] flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-grow">
              <h2 className="text-xl font-orbitron font-bold text-white">
                {currentUser.displayName || "Usuário Voonzave"}
              </h2>
              <div className="flex items-center mt-2 text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                <span>{currentUser.email}</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2 mt-4 md:mt-0">
              <Button variant="outline" className="border-[#00EEFF] text-[#00EEFF] hover:bg-[#00EEFF]/10">
                Editar Perfil
              </Button>
              <Button className="bg-gradient-to-r from-[#6C00FF] to-[#00EEFF] hover:from-[#00EEFF] hover:to-[#6C00FF] text-white">
                Configurações
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Cards de informação */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card 
            className="p-6 border border-[#6C00FF]/20 bg-[#0F0F18] rounded-xl overflow-hidden relative"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-[#6C00FF]/20 mr-4">
                <Sparkles className="h-5 w-5 text-[#6C00FF]" />
              </div>
              <h3 className="font-orbitron font-bold text-white">Seu Plano</h3>
            </div>
            <p className="text-xl font-bold text-[#00EEFF] mb-1">Plano Premium</p>
            <p className="text-gray-400 mb-4">Acesso a todos os recursos premium</p>
            <Button variant="outline" className="w-full border-[#6C00FF] text-[#6C00FF] hover:bg-[#6C00FF]/10">
              Gerenciar Plano
            </Button>
          </Card>
          
          <Card 
            className="p-6 border border-[#6C00FF]/20 bg-[#0F0F18] rounded-xl overflow-hidden relative"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-[#00EEFF]/20 mr-4">
                <Zap className="h-5 w-5 text-[#00EEFF]" />
              </div>
              <h3 className="font-orbitron font-bold text-white">Atividade</h3>
            </div>
            <p className="text-xl font-bold text-[#00EEFF] mb-1">7 dias</p>
            <p className="text-gray-400 mb-4">Último login: há 2 horas</p>
            <Button variant="outline" className="w-full border-[#00EEFF] text-[#00EEFF] hover:bg-[#00EEFF]/10">
              Ver Histórico
            </Button>
          </Card>
          
          <Card 
            className="p-6 border border-[#6C00FF]/20 bg-[#0F0F18] rounded-xl overflow-hidden relative"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-[#FF00B8]/20 mr-4">
                <Shield className="h-5 w-5 text-[#FF00B8]" />
              </div>
              <h3 className="font-orbitron font-bold text-white">Segurança</h3>
            </div>
            <p className="text-xl font-bold text-[#FF00B8] mb-1">Protegido</p>
            <p className="text-gray-400 mb-4">Autenticação de dois fatores ativada</p>
            <Button variant="outline" className="w-full border-[#FF00B8] text-[#FF00B8] hover:bg-[#FF00B8]/10">
              Configurações de Segurança
            </Button>
          </Card>
        </div>
        
        {/* Mais conteúdo */}
        <Card 
          className="p-6 border border-[#6C00FF]/20 bg-[#0F0F18] rounded-xl"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h3 className="font-orbitron font-bold text-xl text-white mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            <div className="flex items-start p-3 hover:bg-[#6C00FF]/5 rounded-lg transition-colors">
              <div className="p-2 rounded-full bg-[#6C00FF]/10 mr-4">
                <LogOut className="h-4 w-4 text-[#6C00FF]" />
              </div>
              <div>
                <p className="text-white">Login realizado</p>
                <p className="text-gray-400 text-sm">Agora mesmo</p>
              </div>
            </div>
            <div className="flex items-start p-3 hover:bg-[#6C00FF]/5 rounded-lg transition-colors">
              <div className="p-2 rounded-full bg-[#00EEFF]/10 mr-4">
                <Sparkles className="h-4 w-4 text-[#00EEFF]" />
              </div>
              <div>
                <p className="text-white">Perfil atualizado</p>
                <p className="text-gray-400 text-sm">3 dias atrás</p>
              </div>
            </div>
            <div className="flex items-start p-3 hover:bg-[#6C00FF]/5 rounded-lg transition-colors">
              <div className="p-2 rounded-full bg-[#FF00B8]/10 mr-4">
                <Shield className="h-4 w-4 text-[#FF00B8]" />
              </div>
              <div>
                <p className="text-white">Segurança verificada</p>
                <p className="text-gray-400 text-sm">7 dias atrás</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}