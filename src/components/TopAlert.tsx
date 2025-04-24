import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

export default function TopAlert() {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-red-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-center">
          <div className="flex-shrink-0 mr-2">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div className="overflow-hidden whitespace-nowrap">
            <motion.p
              animate={{
                x: [100, -500],
              }}
              transition={{
                repeat: Infinity,
                duration: 15,
                ease: "linear"
              }}
              className="text-sm font-medium inline-block"
            >
              Restam apenas 7 vagas com desconto exclusivo! Aproveite esta oportunidade agora! Restam apenas 7 vagas com desconto exclusivo!
            </motion.p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute right-2 text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}