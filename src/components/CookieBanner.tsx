import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Verificar se o usuário já aceitou os cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted') === 'true';
    
    if (!cookiesAccepted) {
      // Mostrar o banner após um pequeno delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-0 left-0 right-0 bg-[#0F0F18] border-t border-[#6C00FF]/30 shadow-lg z-40"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center">
                <Cookie className="h-6 w-6 text-[#00EEFF] mr-3 flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  Este site usa cookies para melhorar a experiência. Ao continuar navegando, você concorda com nossa política de privacidade.
                </p>
              </div>
              <div className="flex-shrink-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAccept}
                  className="bg-gradient-to-r from-[#6C00FF] to-[#00EEFF] text-white px-5 py-2 rounded-md text-sm font-medium shadow-md hover:shadow-[#6C00FF]/20 transition-all"
                >
                  Aceitar
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}