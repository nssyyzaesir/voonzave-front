import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Zap } from 'lucide-react';
import { websocketService } from '../lib/websocket';
import { Offer } from '../admin/utils/types';

export default function OfferModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOffer, setCurrentOffer] = useState<Offer | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [hasSeenOffer, setHasSeenOffer] = useState<Record<string, boolean>>({});
  
  // Carregar ofertas do localStorage para saber quais já foram vistas
  useEffect(() => {
    const storedOffers = localStorage.getItem('seen_offers');
    if (storedOffers) {
      try {
        setHasSeenOffer(JSON.parse(storedOffers));
      } catch (e) {
        console.error('Erro ao carregar ofertas vistas:', e);
      }
    }
  }, []);
  
  // Conectar ao WebSocket e receber atualizações de ofertas
  useEffect(() => {
    // Inscrever para atualizações de ofertas
    const unsubscribe = websocketService.subscribe('offers', (offer) => {
      console.log('Oferta atualizada recebida via WebSocket:', offer);
      
      if (!offer.isActive) {
        // Remover ofertas desativadas
        setOffers(prevOffers => prevOffers.filter(o => o.id !== offer.id));
      } else {
        // Adicionar ou atualizar oferta
        setOffers(prevOffers => {
          const exists = prevOffers.some(o => o.id === offer.id);
          if (exists) {
            return prevOffers.map(o => o.id === offer.id ? offer : o);
          } else {
            return [...prevOffers, offer];
          }
        });
      }
    });
    
    // Fazer requisição inicial para buscar ofertas
    const fetchOffers = async () => {
      try {
        const response = await fetch('/api/offers');
        if (response.ok) {
          const data = await response.json();
          console.log('Ofertas carregadas:', data);
          setOffers(data.filter((o: Offer) => o.isActive));
        }
      } catch (error) {
        console.error('Erro ao buscar ofertas:', error);
      }
    };
    
    fetchOffers();
    
    // Limpar inscrição ao desmontar
    return () => {
      unsubscribe();
    };
  }, []);
  
  // Efeito para mostrar uma oferta válida quando não houver nenhuma aberta
  useEffect(() => {
    if (isOpen || !offers.length) return;
    
    // Filtra ofertas válidas por data e que não foram vistas (dependendo da frequência)
    const today = new Date();
    const validOffers = offers.filter(offer => {
      const startDate = new Date(offer.startDate);
      const endDate = new Date(offer.endDate);
      
      const isInDateRange = startDate <= today && endDate >= today;
      let hasntSeen = false;
      
      switch (offer.frequency) {
        case 'once':
          hasntSeen = !hasSeenOffer[offer.id.toString()];
          break;
        case 'every_visit':
          hasntSeen = true;
          break;
        case 'once_per_day': {
          const lastSeen = localStorage.getItem(`offer_${offer.id}_last_seen`);
          if (!lastSeen) {
            hasntSeen = true;
          } else {
            const lastDate = new Date(JSON.parse(lastSeen));
            const isNewDay = lastDate.getDate() !== today.getDate() || 
                             lastDate.getMonth() !== today.getMonth() || 
                             lastDate.getFullYear() !== today.getFullYear();
            hasntSeen = isNewDay;
          }
          break;
        }
        case 'once_per_week': {
          const lastSeen = localStorage.getItem(`offer_${offer.id}_last_seen`);
          if (!lastSeen) {
            hasntSeen = true;
          } else {
            const lastDate = new Date(JSON.parse(lastSeen));
            const diffTime = Math.abs(today.getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            hasntSeen = diffDays >= 7;
          }
          break;
        }
        default:
          hasntSeen = true;
      }
      
      return isInDateRange && hasntSeen;
    });
    
    if (validOffers.length > 0) {
      // Ordenar por prioridade (maior primeiro)
      validOffers.sort((a, b) => (b.priority || 0) - (a.priority || 0));
      
      // Pegar a oferta de maior prioridade
      const topOffer = validOffers[0];
      setCurrentOffer(topOffer);
      
      // Mostrar modal após o atraso configurado
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Bloquear o scroll enquanto o modal estiver aberto
        if (typeof document !== 'undefined') {
          document.body.style.overflow = 'hidden';
        }
      }, (topOffer.delay || 3) * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [offers, isOpen, hasSeenOffer]);
  
  const closeModal = () => {
    if (!currentOffer) return;
    
    setIsOpen(false);
    // Marcar oferta como vista
    const updatedSeenOffers = {
      ...hasSeenOffer,
      [currentOffer.id.toString()]: true
    };
    setHasSeenOffer(updatedSeenOffers);
    localStorage.setItem('seen_offers', JSON.stringify(updatedSeenOffers));
    
    // Salvar timestamp para frequências por dia/semana
    localStorage.setItem(`offer_${currentOffer.id}_last_seen`, 
      JSON.stringify(new Date().toISOString())
    );
    
    // Desbloquear o scroll quando o modal for fechado
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  };
  
  const handleActionClick = () => {
    if (!currentOffer) return;
    
    // Navegar para o link da oferta
    window.location.href = currentOffer.buttonLink;
    closeModal();
  };
  
  // Não renderizar se não houver oferta atual
  if (!currentOffer) return null;
  
  // Determinar a posição do modal
  const getPositionClass = () => {
    switch (currentOffer.position) {
      case 'top':
        return 'items-start pt-16';
      case 'bottom':
        return 'items-end pb-16';
      case 'left':
        return 'items-center justify-start pl-16';
      case 'right':
        return 'items-center justify-end pr-16';
      default:
        return 'items-center justify-center';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-0 z-50 flex p-4 bg-black/70 backdrop-blur-sm ${getPositionClass()}`}
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative w-full max-w-md rounded-xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
            style={{ 
              backgroundColor: currentOffer.overlayColor || 'rgba(10, 10, 20, 0.95)',
              color: currentOffer.textColor || '#ffffff'
            }}
          >
            {/* Modal content */}
            <div className="relative p-6 md:p-8">
              {/* Close button */}
              {currentOffer.showCloseButton && (
                <button 
                  onClick={closeModal}
                  className="absolute top-3 right-3 text-current hover:opacity-80 p-1 rounded-full transition-colors"
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              
              {/* Image */}
              {currentOffer.imageUrl && (
                <div className="flex justify-center mb-4">
                  <img 
                    src={currentOffer.imageUrl} 
                    alt={currentOffer.title}
                    className="max-h-40 w-auto rounded"
                  />
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-3" style={{ color: currentOffer.textColor || '#ffffff' }}>
                {currentOffer.title}
              </h3>
              
              <p className="mb-6" style={{ color: currentOffer.textColor || '#ffffff' }}>
                {currentOffer.description}
              </p>
              
              <div className="flex flex-col space-y-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleActionClick}
                  className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-[#6C00FF] to-[#00EEFF] text-white font-medium shadow-lg hover:shadow-[#6C00FF]/20 transition-all"
                >
                  {currentOffer.buttonText}
                </motion.button>
                
                {currentOffer.showCloseButton && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={closeModal}
                    className="w-full py-3 px-6 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-all"
                  >
                    Fechar
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}