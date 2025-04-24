import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubscriptionPlan } from '../admin/utils/types';
import { CheckCircle, Star } from 'lucide-react';
import { websocketService } from '../lib/websocket';

export default function StorePlans() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para formatar o preço
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Função para obter os planos a partir da API
  const fetchPlans = async () => {
    try {
      // Em um ambiente real, isso seria uma chamada API
      // Por enquanto, vamos usar dados simulados
      const response = await fetch('/api/plans');
      
      if (response.ok) {
        const data = await response.json();
        setPlans(data.filter((plan: SubscriptionPlan) => plan.isActive));
      } else {
        console.error('Erro ao buscar planos');
        // Usar alguns planos padrão para demonstração
        setPlans([
          {
            id: 1,
            name: 'Básico',
            description: 'Plano ideal para começar',
            price: 29.90,
            intervalType: 'monthly',
            features: [
              'Acesso a recursos básicos',
              'Suporte por email',
              'Até 3 usuários',
              'Armazenamento de 10GB'
            ],
            isActive: true,
            isFeatured: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 2,
            name: 'Pro',
            description: 'Para usuários avançados',
            price: 79.90,
            intervalType: 'monthly',
            features: [
              'Todos os recursos do plano Básico',
              'Suporte prioritário',
              'Até 10 usuários',
              'Armazenamento de 50GB',
              'Recursos avançados de análise'
            ],
            isActive: true,
            isFeatured: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]);
      }
    } catch (error) {
      console.error('Erro ao buscar planos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Configurar WebSocket para atualizações em tempo real
  useEffect(() => {
    // Buscar planos na inicialização
    fetchPlans();

    // Inscrever-se para atualizações de planos
    const unsubscribe = websocketService.subscribe('plans', (data) => {
      console.log('Resposta de planos recebida via WebSocket:', data);
      
      // Verificar se temos um array de planos ou um único plano
      if (Array.isArray(data)) {
        console.log('Atualizando lista completa de planos:', data.length, 'planos');
        setPlans(data.filter((plan: SubscriptionPlan) => plan.isActive));
      } else {
        console.log('Atualização de plano individual recebida:', data);
        // Atualizar plano existente ou adicionar novo
        setPlans(prevPlans => {
          const planExists = prevPlans.some(plan => plan.id === data.id);
          
          if (planExists) {
            // Atualizar plano existente
            return prevPlans.map(plan => 
              plan.id === data.id ? data : plan
            ).filter(plan => plan.isActive);
          } else {
            // Adicionar novo plano se estiver ativo
            if (data.isActive) {
              return [...prevPlans, data];
            }
            return prevPlans;
          }
        });
      }
    });

    // Conectar-se ao servidor WebSocket
    websocketService.onConnect(() => {
      console.log('Conectado ao servidor WebSocket');
      // Solicitar dados atualizados quando conectado
      websocketService.requestData('plans');
    });

    // Limpar inscrição ao desmontar
    return () => {
      unsubscribe();
    };
  }, []);

  // Tradução do tipo de intervalo
  const getIntervalTypeLabel = (type: 'monthly' | 'annual' | 'lifetime') => {
    switch (type) {
      case 'monthly': return 'por mês';
      case 'annual': return 'por ano';
      case 'lifetime': return 'pagamento único';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="py-12 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nossos Planos</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Escolha o plano perfeito para suas necessidades. Atualizados em tempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.id} className="relative flex flex-col h-full">
              {plan.isFeatured && (
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-1 rounded-full shadow-md z-10 flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  <span className="font-medium text-sm">Mais Popular</span>
                </div>
              )}
              <Card className={`flex flex-col h-full p-6 border-2 ${plan.isFeatured ? 'border-primary shadow-lg' : 'border-gray-200 dark:border-gray-800 shadow'}`}>
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">{plan.description}</p>
                </div>
                
                <div className="text-center my-6">
                  <span className="text-4xl font-bold">{formatCurrency(plan.price)}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">{getIntervalTypeLabel(plan.intervalType)}</span>
                </div>
                
                <div className="flex-grow mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button className={`mt-auto w-full ${plan.isFeatured ? 'bg-primary hover:bg-primary/90' : ''}`}>
                  Começar agora
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}