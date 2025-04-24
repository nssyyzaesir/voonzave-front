import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { SubscriptionPlan } from '../utils/types';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  CheckCircle, 
  XCircle, 
  DollarSign,
  Calendar,
  Shield,
  CheckSquare,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { websocketService } from '../../lib/websocket';

const SubscriptionPlans: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    intervalType: 'monthly',
    features: [''],
    isActive: true,
    isFeatured: false
  });
  
  // Carregar dados via WebSocket e API
  useEffect(() => {
    // Função para carregar planos do servidor
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/plans');
        if (response.ok) {
          const data = await response.json();
          console.log("Planos carregados do servidor:", data);
          setPlans(data);
        } else {
          console.error("Erro ao buscar planos do servidor");
          toast.error("Não foi possível carregar os planos");
        }
      } catch (error) {
        console.error("Erro ao buscar planos:", error);
        toast.error("Erro ao carregar planos do servidor");
      } finally {
        setIsLoading(false);
      }
    };

    // Inscrever-se para atualizações de planos via WebSocket
    const unsubscribe = websocketService.subscribe('plans', (data) => {
      console.log('Atualização de plano recebida via WebSocket:', data);
      
      // Verificar se temos um array ou um objeto único
      if (Array.isArray(data)) {
        setPlans(data);
      } else {
        // Atualizar um plano específico
        setPlans(prevPlans => {
          const planExists = prevPlans.some(p => p.id === data.id);
          
          if (planExists) {
            // Atualizar plano existente
            return prevPlans.map(p => p.id === data.id ? data : p);
          } else if (data.isActive !== false) {
            // Adicionar novo plano se estiver ativo
            return [...prevPlans, data];
          } else {
            // Remover plano se não estiver ativo
            return prevPlans.filter(p => p.id !== data.id);
          }
        });
      }
      setIsLoading(false);
    });
    
    // Conectar-se ao servidor e solicitar dados
    websocketService.onConnect(() => {
      console.log('Conectado ao servidor WebSocket');
      websocketService.requestData('plans');
    });

    // Carregar dados iniciais
    fetchPlans();
    
    return () => {
      unsubscribe();
    };
  }, []);
  
  // Formatação de moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  // Formatação de data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Tradução do tipo de intervalo
  const getIntervalTypeLabel = (type: 'monthly' | 'annual' | 'lifetime') => {
    switch (type) {
      case 'monthly': return 'Mensal';
      case 'annual': return 'Anual';
      case 'lifetime': return 'Vitalício';
      default: return type;
    }
  };

  // Resetar formulário
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      intervalType: 'monthly',
      features: [''],
      isActive: true,
      isFeatured: false
    });
  };

  // Abrir modal de edição
  const handleEditPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setFormData({
      name: plan.name,
      description: plan.description,
      price: plan.price.toString(),
      intervalType: plan.intervalType,
      features: [...plan.features],
      isActive: plan.isActive,
      isFeatured: plan.isFeatured
    });
    setIsEditModalOpen(true);
  };

  // Abrir modal de exclusão
  const handleDeletePlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setIsDeleteModalOpen(true);
  };

  // Adicionar campo de feature
  const addFeatureField = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  // Remover campo de feature
  const removeFeatureField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  // Atualizar campos de feature
  const updateFeature = (index: number, value: string) => {
    setFormData(prev => {
      const newFeatures = [...prev.features];
      newFeatures[index] = value;
      return { ...prev, features: newFeatures };
    });
  };

  // Alternar destaque do plano
  const toggleFeaturedPlan = (planId: number | string) => {
    setPlans(prev => prev.map(plan => 
      plan.id === planId
        ? { ...plan, isFeatured: !plan.isFeatured }
        : plan
    ));
    
    toast.success('Status de destaque atualizado com sucesso!');
  };

  // Alternar estado ativo do plano
  const toggleActivePlan = (planId: number | string) => {
    setPlans(prev => prev.map(plan => 
      plan.id === planId
        ? { ...plan, isActive: !plan.isActive }
        : plan
    ));
    
    toast.success('Status de ativação atualizado com sucesso!');
  };

  // Criar novo plano
  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || !formData.description || !formData.price) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    if (formData.features.some(feature => !feature.trim())) {
      toast.error('Por favor, preencha todas as características ou remova os campos vazios');
      return;
    }
    
    // Criar novo plano
    const newPlan: SubscriptionPlan = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      intervalType: formData.intervalType as 'monthly' | 'annual' | 'lifetime',
      features: formData.features.filter(f => f.trim()),
      isActive: formData.isActive,
      isFeatured: formData.isFeatured,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Atualizar estado local
    setPlans(prev => [...prev, newPlan]);
    
    try {
      // Enviar dados para o servidor para sincronização
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/admin/plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newPlan)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao salvar plano no servidor');
      }
      
      console.log('Plano sincronizado com o servidor');
    } catch (error) {
      console.error('Erro ao sincronizar plano:', error);
      toast.error('O plano foi criado localmente, mas houve um erro ao sincronizar com o servidor');
    }
    
    setIsCreateModalOpen(false);
    resetForm();
    toast.success('Plano criado com sucesso!');
  };

  // Atualizar plano existente
  const handleUpdatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan) return;
    
    // Validação básica
    if (!formData.name || !formData.description || !formData.price) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    if (formData.features.some(feature => !feature.trim())) {
      toast.error('Por favor, preencha todas as características ou remova os campos vazios');
      return;
    }
    
    // Atualizar plano
    const updatedPlan: SubscriptionPlan = {
      ...selectedPlan,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      intervalType: formData.intervalType as 'monthly' | 'annual' | 'lifetime',
      features: formData.features.filter(f => f.trim()),
      isActive: formData.isActive,
      isFeatured: formData.isFeatured,
      updatedAt: new Date().toISOString()
    };
    
    // Atualizar estado local
    setPlans(prev => prev.map(plan => 
      plan.id === selectedPlan.id ? updatedPlan : plan
    ));
    
    try {
      // Enviar dados para o servidor para sincronização
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/admin/plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedPlan)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao salvar plano no servidor');
      }
      
      console.log('Plano atualizado sincronizado com o servidor');
    } catch (error) {
      console.error('Erro ao sincronizar plano atualizado:', error);
      toast.error('O plano foi atualizado localmente, mas houve um erro ao sincronizar com o servidor');
    }
    
    setIsEditModalOpen(false);
    resetForm();
    toast.success('Plano atualizado com sucesso!');
  };

  // Confirmar exclusão de plano
  const handleConfirmDelete = () => {
    if (!selectedPlan) return;
    
    setPlans(prev => prev.filter(plan => plan.id !== selectedPlan.id));
    setIsDeleteModalOpen(false);
    toast.success('Plano excluído com sucesso!');
  };

  // Formulário compartilhado para edição e criação
  const renderPlanForm = (isCreate: boolean) => (
    <form onSubmit={isCreate ? handleCreatePlan : handleUpdatePlan}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Nome do Plano
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
            placeholder="Ex: Plano Básico"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Descrição
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
            placeholder="Descreva o plano brevemente"
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Preço (R$)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <DollarSign size={16} className="text-gray-500" />
              </div>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="w-full p-2 pl-10 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                placeholder="99.90"
                step="0.01"
                min="0"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Intervalo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar size={16} className="text-gray-500" />
              </div>
              <select
                value={formData.intervalType}
                onChange={(e) => setFormData(prev => ({ ...prev, intervalType: e.target.value as any }))}
                className="w-full p-2 pl-10 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
              >
                <option value="monthly">Mensal</option>
                <option value="annual">Anual</option>
                <option value="lifetime">Vitalício</option>
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Características
          </label>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                className="flex-grow p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                placeholder="Ex: Acesso a todos os recursos"
              />
              <button
                type="button"
                onClick={() => removeFeatureField(index)}
                className="ml-2 p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md"
                disabled={formData.features.length <= 1}
              >
                <XCircle size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFeatureField}
            className="mt-1 text-sm text-[#00EEFF] hover:text-[#00EEFF]/80 flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Adicionar característica
          </button>
        </div>
        
        <div className="flex space-x-6 pt-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="h-4 w-4 border-[#21213A] rounded bg-[#15152A] text-[#6C00FF] focus:ring-[#6C00FF]"
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-300">
              Plano ativo
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
              className="h-4 w-4 border-[#21213A] rounded bg-[#15152A] text-[#6C00FF] focus:ring-[#6C00FF]"
            />
            <label htmlFor="isFeatured" className="ml-2 text-sm text-gray-300">
              Destacar este plano
            </label>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => isCreate ? setIsCreateModalOpen(false) : setIsEditModalOpen(false)}
          className="px-4 py-2 bg-[#21213A] hover:bg-[#21213A]/80 text-gray-300 rounded-lg"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#6C00FF] hover:bg-[#6C00FF]/90 text-white rounded-lg"
        >
          {isCreate ? 'Criar Plano' : 'Salvar Alterações'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Planos de Assinatura</h1>
        <button 
          onClick={() => {
            resetForm();
            setIsCreateModalOpen(true);
          }}
          className="px-4 py-2 bg-[#6C00FF] hover:bg-[#6C00FF]/90 text-white rounded-lg flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Novo Plano
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            title={plan.name}
            subtitle={getIntervalTypeLabel(plan.intervalType)}
            className={`${!plan.isActive ? 'opacity-70' : ''}`}
            footer={
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleEditPlan(plan)}
                    className="p-1 rounded-md text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                    title="Editar plano"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeletePlan(plan)}
                    className="p-1 rounded-md text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    title="Excluir plano"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => toggleActivePlan(plan.id)}
                    className={`p-1 rounded-md ${plan.isActive ? 'text-green-400 hover:text-green-300 hover:bg-green-400/10' : 'text-gray-500 hover:text-gray-400 hover:bg-gray-500/10'}`}
                    title={plan.isActive ? 'Desativar plano' : 'Ativar plano'}
                  >
                    {plan.isActive ? <CheckCircle size={16} /> : <XCircle size={16} />}
                  </button>
                  <button 
                    onClick={() => toggleFeaturedPlan(plan.id)}
                    className={`p-1 rounded-md ${plan.isFeatured ? 'text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10' : 'text-gray-500 hover:text-gray-400 hover:bg-gray-500/10'}`}
                    title={plan.isFeatured ? 'Remover destaque' : 'Destacar plano'}
                  >
                    <Star size={16} />
                  </button>
                </div>
              </div>
            }
          >
            <div className="relative mb-4">
              {plan.isFeatured && (
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-xs text-black font-medium px-2 py-0.5 rounded-full z-10">
                  Destacado
                </div>
              )}
              {!plan.isActive && (
                <div className="absolute -top-2 -right-2 bg-gray-500 text-xs text-white font-medium px-2 py-0.5 rounded-full z-10">
                  Inativo
                </div>
              )}
              
              <div className="text-center p-3 rounded-lg bg-[#15152A]/50">
                <h3 className="text-xl font-bold text-white mb-1">
                  {formatCurrency(plan.price)}
                  <span className="text-sm font-normal text-gray-400">
                    {plan.intervalType === 'monthly' && '/mês'}
                    {plan.intervalType === 'annual' && '/ano'}
                  </span>
                </h3>
                <p className="text-sm text-gray-400">{plan.description}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Características:</h4>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <CheckSquare size={16} className="text-[#00EEFF] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              Criado em: {formatDate(plan.createdAt)}
              <br />
              Atualizado em: {formatDate(plan.updatedAt)}
            </div>
          </Card>
        ))}
      </div>
      
      {/* Modal para criar novo plano */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Adicionar Novo Plano"
        size="lg"
      >
        {renderPlanForm(true)}
      </Modal>
      
      {/* Modal para editar plano */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Plano"
        size="lg"
      >
        {renderPlanForm(false)}
      </Modal>
      
      {/* Modal para confirmar exclusão */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Excluir Plano"
        size="sm"
      >
        <div className="text-center py-4">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            Tem certeza que deseja excluir?
          </h3>
          <p className="text-gray-400 mb-4">
            Você está prestes a excluir o plano <span className="text-white font-medium">{selectedPlan?.name}</span>.<br />
            Esta ação não pode ser desfeita.
          </p>
          
          <div className="flex justify-center space-x-3 mt-6">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-[#21213A] hover:bg-[#21213A]/80 text-gray-300 rounded-lg"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            >
              Excluir
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SubscriptionPlans;