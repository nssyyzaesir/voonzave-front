import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    if (!isLoading) {
      // Dar um pequeno delay antes de esconder completamente
      const timer = setTimeout(() => {
        setShow(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  if (!show) return null;
  
  return (
    <AnimatePresence>
      {(show || isLoading) && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            <div className="spinner">
              <div className="relative">
                {/* Spinner exterior */}
                <div className="w-16 h-16 border-4 border-[#6C00FF] rounded-full animate-spin opacity-30"></div>
                
                {/* Spinner interior */}
                <div className="w-16 h-16 border-t-4 border-[#00EEFF] rounded-full animate-spin absolute inset-0"></div>
              </div>
            </div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-[#00EEFF] font-bold text-xl"
            >
              VOONZAVE
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-sm mt-2"
            >
              Carregando o futuro...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}