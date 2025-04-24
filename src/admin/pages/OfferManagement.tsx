import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Modal from '../components/Modal';
import Table from '../components/Table';
import { Offer } from '../utils/types';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Clock, 
  Calendar, 
  Award, 
  EyeOff, 
  Eye,
  XCircle, 
  Image,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { websocketService } from '../../lib/websocket';

export default function OfferManagement() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Formulário
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    buttonText: 'Saiba Mais',
    buttonLink: '',
    overlayColor: 'rgba(0, 0, 0, 0.7)',
    textColor: '#ffffff',
    isActive: true,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    position: 'center',
    showCloseButton: true,
    delay: 3,
    frequency: 'once_per_day',
    priority: 1
  });
  
  // Carregar dados
  useEffect(() => {
    // Função para carregar ofertas do servidor
    const fetchOffers = async () => {
      try {
        const response = await fetch('/api/offers');
        if (response.ok) {
          const data = await response.json();
          console.log("Ofertas carregadas do servidor:", data);
          setOffers(data);
        } else {
          console.error("Erro ao buscar ofertas do servidor");
          toast.error("Não foi possível carregar as ofertas");
        }
      } catch (error) {
        console.error("Erro ao buscar ofertas:", error);
        toast.error("Erro ao carregar ofertas do servidor");
      }
    };

    // Inscrever-se para atualizações de ofertas via WebSocket
    const unsubscribe = websocketService.subscribe('offers', (data) => {
      console.log('Atualização de oferta recebida via WebSocket:', data);
      
      // Verificar se temos um array ou um objeto único
      if (Array.isArray(data)) {
        setOffers(data);
      } else {
        // Atualizar uma oferta específica
        setOffers(prevOffers => {
          const offerExists = prevOffers.some(o => o.id === data.id);
          
          if (offerExists) {
            // Atualizar oferta existente
            return prevOffers.map(o => o.id === data.id ? data : o);
          } else if (data.isActive !== false) {
            // Adicionar nova oferta se estiver ativa
            return [...prevOffers, data];
          } else {
            // Remover oferta se não estiver ativa
            return prevOffers.filter(o => o.id !== data.id);
          }
        });
      }
    });
    
    // Conectar-se ao servidor e solicitar dados
    websocketService.onConnect(() => {
      console.log('Conectado ao servidor WebSocket');
      websocketService.requestData('offers');
    });

    // Carregar dados iniciais
    fetchOffers();
    
    return () => {
      unsubscribe();
    };
  }, []);
  
  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  // Resetar formulário
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      buttonText: 'Saiba Mais',
      buttonLink: '',
      overlayColor: 'rgba(0, 0, 0, 0.7)',
      textColor: '#ffffff',
      isActive: true,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      position: 'center',
      showCloseButton: true,
      delay: 3,
      frequency: 'once_per_day',
      priority: 1
    });
  };
  
  // Manipular edição
  const handleEditOffer = (offer: Offer) => {
    setSelectedOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      imageUrl: offer.imageUrl || '',
      buttonText: offer.buttonText,
      buttonLink: offer.buttonLink,
      overlayColor: offer.overlayColor || 'rgba(0, 0, 0, 0.7)',
      textColor: offer.textColor || '#ffffff',
      isActive: offer.isActive,
      startDate: new Date(offer.startDate).toISOString().split('T')[0],
      endDate: new Date(offer.endDate).toISOString().split('T')[0],
      position: offer.position || 'center',
      showCloseButton: offer.showCloseButton,
      delay: offer.delay,
      frequency: offer.frequency,
      priority: offer.priority
    });
    setIsEditModalOpen(true);
  };
  
  // Manipular exclusão
  const handleDeleteOffer = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsDeleteModalOpen(true);
  };
  
  // Manipular visualização
  const handlePreviewOffer = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsPreviewModalOpen(true);
  };
  
  // Manipular ativação/desativação rápida
  const toggleOfferActive = (id: number | string) => {
    setOffers(prev => prev.map(offer => 
      offer.id === id 
        ? { ...offer, isActive: !offer.isActive, updatedAt: new Date().toISOString() }
        : offer
    ));
    
    // Encontrar oferta atualizada para enviar
    const updatedOffer = offers.find(offer => offer.id === id);
    if (updatedOffer) {
      const toggledOffer = { 
        ...updatedOffer, 
        isActive: !updatedOffer.isActive,
        updatedAt: new Date().toISOString()
      };
      
      // Sincronizar com o servidor
      syncOfferWithServer(toggledOffer);
      
      toast.success(`Oferta ${toggledOffer.isActive ? 'ativada' : 'desativada'} com sucesso!`);
    }
  };
  
  // Criar nova oferta
  const handleCreateOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.title || !formData.description || !formData.buttonText || !formData.buttonLink) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    // Criar nova oferta
    const newOffer: Offer = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      imageUrl: formData.imageUrl,
      buttonText: formData.buttonText,
      buttonLink: formData.buttonLink,
      overlayColor: formData.overlayColor,
      textColor: formData.textColor,
      isActive: formData.isActive,
      startDate: formData.startDate,
      endDate: formData.endDate,
      position: formData.position as any,
      showCloseButton: formData.showCloseButton,
      delay: formData.delay,
      frequency: formData.frequency as any,
      priority: formData.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Atualizar estado local
    setOffers(prev => [...prev, newOffer]);
    
    // Sincronizar com o servidor
    syncOfferWithServer(newOffer);
    
    setIsCreateModalOpen(false);
    resetForm();
    toast.success('Oferta criada com sucesso!');
  };
  
  // Atualizar oferta existente
  const handleUpdateOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOffer) return;
    
    // Validação básica
    if (!formData.title || !formData.description || !formData.buttonText || !formData.buttonLink) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    // Atualizar oferta
    const updatedOffer: Offer = {
      ...selectedOffer,
      title: formData.title,
      description: formData.description,
      imageUrl: formData.imageUrl,
      buttonText: formData.buttonText,
      buttonLink: formData.buttonLink,
      overlayColor: formData.overlayColor,
      textColor: formData.textColor,
      isActive: formData.isActive,
      startDate: formData.startDate,
      endDate: formData.endDate,
      position: formData.position as any,
      showCloseButton: formData.showCloseButton,
      delay: formData.delay,
      frequency: formData.frequency as any,
      priority: formData.priority,
      updatedAt: new Date().toISOString()
    };
    
    // Atualizar estado local
    setOffers(prev => prev.map(offer => 
      offer.id === selectedOffer.id ? updatedOffer : offer
    ));
    
    // Sincronizar com o servidor
    syncOfferWithServer(updatedOffer);
    
    setIsEditModalOpen(false);
    resetForm();
    toast.success('Oferta atualizada com sucesso!');
  };
  
  // Confirmar exclusão de oferta
  const handleConfirmDelete = () => {
    if (!selectedOffer) return;
    
    // Atualizar estado local
    setOffers(prev => prev.filter(offer => offer.id !== selectedOffer.id));
    
    // Sincronizar com o servidor (marcar como excluído)
    syncOfferWithServer({...selectedOffer, isActive: false}, 'delete');
    
    setIsDeleteModalOpen(false);
    toast.success('Oferta excluída com sucesso!');
  };
  
  // Sincronizar oferta com o servidor
  const syncOfferWithServer = async (offer: Offer, action: 'update' | 'delete' = 'update') => {
    try {
      // Enviar dados para o servidor para sincronização
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/admin/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ offer, action })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao salvar oferta no servidor');
      }
      
      console.log('Oferta sincronizada com o servidor');
    } catch (error) {
      console.error('Erro ao sincronizar oferta:', error);
      toast.error('A oferta foi atualizada localmente, mas houve um erro ao sincronizar com o servidor');
    }
  };
  
  // Filtrar ofertas com base no termo de busca
  const filteredOffers = offers.filter(offer => 
    offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Obter tradução da posição
  const getPositionLabel = (position?: string) => {
    switch (position) {
      case 'center': return 'Centro';
      case 'top': return 'Topo';
      case 'bottom': return 'Rodapé';
      case 'left': return 'Esquerda';
      case 'right': return 'Direita';
      default: return 'Centro';
    }
  };
  
  // Obter tradução da frequência
  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'once': return 'Uma vez';
      case 'every_visit': return 'Toda visita';
      case 'once_per_day': return 'Uma vez por dia';
      case 'once_per_week': return 'Uma vez por semana';
      default: return frequency;
    }
  };
  
  // Verificar se a oferta está expirada
  const isOfferExpired = (offer: Offer) => {
    const now = new Date();
    const endDate = new Date(offer.endDate);
    return endDate < now;
  };
  
  // Verificar se a oferta ainda não começou
  const isOfferNotStarted = (offer: Offer) => {
    const now = new Date();
    const startDate = new Date(offer.startDate);
    return startDate > now;
  };
  
  // Obter o status da oferta
  const getOfferStatus = (offer: Offer) => {
    if (!offer.isActive) return 'Inativa';
    if (isOfferExpired(offer)) return 'Expirada';
    if (isOfferNotStarted(offer)) return 'Agendada';
    return 'Ativa';
  };
  
  // Obter a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativa': return 'text-green-500';
      case 'Inativa': return 'text-gray-500';
      case 'Expirada': return 'text-red-500';
      case 'Agendada': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };
  
  // Formulário compartilhado para edição e criação
  const renderOfferForm = (isCreate: boolean) => (
    <form onSubmit={isCreate ? handleCreateOffer : handleUpdateOffer} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Título da Oferta*
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
            placeholder="Ex: Black Friday 50% OFF"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Descrição*
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
            placeholder="Ex: Aproveite nossos planos com desconto especial"
            rows={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            URL da Imagem (opcional)
          </label>
          <div className="flex items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Image size={16} className="text-gray-500" />
              </div>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="w-full p-2 pl-10 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Texto do Botão*
            </label>
            <input
              type="text"
              value={formData.buttonText}
              onChange={(e) => setFormData(prev => ({ ...prev, buttonText: e.target.value }))}
              className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
              placeholder="Ex: Ver Ofertas"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Link do Botão*
            </label>
            <input
              type="text"
              value={formData.buttonLink}
              onChange={(e) => setFormData(prev => ({ ...prev, buttonLink: e.target.value }))}
              className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
              placeholder="Ex: /planos"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Cor de Fundo
            </label>
            <div className="flex">
              <input
                type="text"
                value={formData.overlayColor}
                onChange={(e) => setFormData(prev => ({ ...prev, overlayColor: e.target.value }))}
                className="flex-grow p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                placeholder="rgba(0, 0, 0, 0.7)"
              />
              <div 
                className="w-8 h-8 ml-2 rounded-md border border-gray-600" 
                style={{ backgroundColor: formData.overlayColor }}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Cor do Texto
            </label>
            <div className="flex">
              <input
                type="text"
                value={formData.textColor}
                onChange={(e) => setFormData(prev => ({ ...prev, textColor: e.target.value }))}
                className="flex-grow p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                placeholder="#FFFFFF"
              />
              <div 
                className="w-8 h-8 ml-2 rounded-md border border-gray-600" 
                style={{ backgroundColor: formData.textColor }}
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Data de Início*
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar size={16} className="text-gray-500" />
              </div>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full p-2 pl-10 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Data de Término*
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar size={16} className="text-gray-500" />
              </div>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full p-2 pl-10 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Posição na Tela
            </label>
            <div className="relative">
              <select
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
              >
                <option value="center">Centro</option>
                <option value="top">Topo</option>
                <option value="bottom">Rodapé</option>
                <option value="left">Esquerda</option>
                <option value="right">Direita</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Frequência de Exibição
            </label>
            <div className="relative">
              <select
                value={formData.frequency}
                onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value }))}
                className="w-full p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
              >
                <option value="once">Uma única vez</option>
                <option value="every_visit">Toda visita</option>
                <option value="once_per_day">Uma vez por dia</option>
                <option value="once_per_week">Uma vez por semana</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Atraso para exibição (segundos)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Clock size={16} className="text-gray-500" />
              </div>
              <input
                type="number"
                value={formData.delay}
                onChange={(e) => setFormData(prev => ({ ...prev, delay: Number(e.target.value) }))}
                className="w-full p-2 pl-10 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                min="0"
                max="60"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Prioridade (maior valor = mais importante)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Award size={16} className="text-gray-500" />
              </div>
              <input
                type="number"
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: Number(e.target.value) }))}
                className="w-full p-2 pl-10 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
                min="1"
                max="100"
              />
            </div>
          </div>
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
              Oferta ativa
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showCloseButton"
              checked={formData.showCloseButton}
              onChange={(e) => setFormData(prev => ({ ...prev, showCloseButton: e.target.checked }))}
              className="h-4 w-4 border-[#21213A] rounded bg-[#15152A] text-[#6C00FF] focus:ring-[#6C00FF]"
            />
            <label htmlFor="showCloseButton" className="ml-2 text-sm text-gray-300">
              Mostrar botão de fechar
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
          {isCreate ? 'Criar Oferta' : 'Salvar Alterações'}
        </button>
      </div>
    </form>
  );
  
  // Modal de preview da oferta
  const renderPreviewModal = () => {
    if (!selectedOffer) return null;
    
    return (
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        title="Preview da Oferta"
        size="lg"
      >
        <div className="p-4">
          <div 
            className="relative rounded-lg p-6 overflow-hidden"
            style={{ 
              backgroundColor: selectedOffer.overlayColor || 'rgba(0, 0, 0, 0.7)',
              color: selectedOffer.textColor || '#ffffff'
            }}
          >
            {selectedOffer.showCloseButton && (
              <button className="absolute top-2 right-2 text-white hover:text-gray-200">
                <XCircle size={24} />
              </button>
            )}
            
            <div className="flex flex-col items-center">
              {selectedOffer.imageUrl && (
                <div className="mb-4">
                  <img src={selectedOffer.imageUrl} alt={selectedOffer.title} className="max-w-full h-auto max-h-40 rounded-md" />
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2" style={{ color: selectedOffer.textColor || '#ffffff' }}>
                {selectedOffer.title}
              </h3>
              
              <p className="text-center mb-4" style={{ color: selectedOffer.textColor || '#ffffff' }}>
                {selectedOffer.description}
              </p>
              
              <button 
                className="px-6 py-2 rounded-md bg-[#6C00FF] text-white hover:bg-[#6C00FF]/90"
              >
                {selectedOffer.buttonText}
              </button>
            </div>
          </div>
          
          <div className="mt-6 bg-[#21213A] p-4 rounded-md">
            <h4 className="text-lg font-medium mb-2">Configurações de Exibição</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li><span className="font-medium">Posição:</span> {getPositionLabel(selectedOffer.position)}</li>
              <li><span className="font-medium">Atraso:</span> {selectedOffer.delay} segundos</li>
              <li><span className="font-medium">Frequência:</span> {getFrequencyLabel(selectedOffer.frequency)}</li>
              <li><span className="font-medium">Status:</span> <span className={getStatusColor(getOfferStatus(selectedOffer))}>{getOfferStatus(selectedOffer)}</span></li>
              <li><span className="font-medium">Período:</span> {formatDate(selectedOffer.startDate)} - {formatDate(selectedOffer.endDate)}</li>
            </ul>
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setIsPreviewModalOpen(false)}
              className="px-4 py-2 bg-[#21213A] hover:bg-[#21213A]/80 text-gray-300 rounded-lg"
            >
              Fechar
            </button>
          </div>
        </div>
      </Modal>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Gerenciamento de Ofertas Popup</h1>
        <button 
          onClick={() => {
            resetForm();
            setIsCreateModalOpen(true);
          }}
          className="px-4 py-2 bg-[#6C00FF] hover:bg-[#6C00FF]/90 text-white rounded-lg flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Nova Oferta
        </button>
      </div>
      
      <Card>
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input 
            type="text" 
            className="pl-10 w-full md:w-64 p-2 bg-[#15152A] border border-[#21213A] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6C00FF] focus:border-[#6C00FF]"
            placeholder="Buscar ofertas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Table
          data={filteredOffers}
          columns={[
            {
              header: 'Título',
              accessor: 'title',
              className: 'font-medium'
            },
            {
              header: 'Período',
              accessor: (offer: Offer) => (
                <span>
                  {formatDate(offer.startDate)} - {formatDate(offer.endDate)}
                </span>
              )
            },
            {
              header: 'Status',
              accessor: (offer: Offer) => {
                const status = getOfferStatus(offer);
                return (
                  <span className={`${getStatusColor(status)} font-medium`}>
                    {status}
                    {status === 'Expirada' && (
                      <AlertTriangle size={14} className="inline-block ml-1 text-yellow-500" />
                    )}
                  </span>
                );
              }
            },
            {
              header: 'Prioridade',
              accessor: (offer: Offer) => (
                <div className="flex items-center">
                  <span>{offer.priority}</span>
                  {offer.priority >= 10 && (
                    <Award size={14} className="ml-1 text-yellow-500" />
                  )}
                </div>
              )
            },
            {
              header: 'Atualizado em',
              accessor: (offer: Offer) => formatDate(offer.updatedAt)
            },
            {
              header: 'Ações',
              accessor: (offer: Offer) => (
                <div className="flex space-x-1">
                  <button 
                    onClick={() => handlePreviewOffer(offer)}
                    className="p-1 rounded-md text-indigo-400 hover:text-indigo-300 hover:bg-indigo-400/10"
                    title="Visualizar oferta"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => handleEditOffer(offer)}
                    className="p-1 rounded-md text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                    title="Editar oferta"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteOffer(offer)}
                    className="p-1 rounded-md text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    title="Excluir oferta"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button 
                    onClick={() => toggleOfferActive(offer.id)}
                    className={`p-1 rounded-md ${offer.isActive ? 'text-green-400 hover:text-green-300 hover:bg-green-400/10' : 'text-gray-500 hover:text-gray-400 hover:bg-gray-500/10'}`}
                    title={offer.isActive ? 'Desativar oferta' : 'Ativar oferta'}
                  >
                    {offer.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              )
            }
          ]}
          searchable={false}
          highlightOnHover={true}
          emptyMessage="Nenhuma oferta encontrada."
        />
      </Card>
      
      {/* Modal de criação */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Criar Nova Oferta"
        size="xl"
      >
        {renderOfferForm(true)}
      </Modal>
      
      {/* Modal de edição */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Oferta"
        size="xl"
      >
        {renderOfferForm(false)}
      </Modal>
      
      {/* Modal de confirmação de exclusão */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Exclusão"
        size="sm"
      >
        <div className="p-4">
          <p className="text-gray-300 mb-4">
            Tem certeza que deseja excluir a oferta "{selectedOffer?.title}"? Esta ação não pode ser desfeita.
          </p>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-[#21213A] hover:bg-[#21213A]/80 text-gray-300 rounded-lg"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Excluir
            </button>
          </div>
        </div>
      </Modal>
      
      {/* Modal de preview */}
      {renderPreviewModal()}
    </div>
  );
}