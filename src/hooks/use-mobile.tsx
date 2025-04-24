import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Verificar se é móvel no carregamento inicial
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Verificar inicialmente
    checkIfMobile();
    
    // Verificar ao redimensionar a janela
    window.addEventListener('resize', checkIfMobile);
    
    // Limpar o event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return isMobile;
}