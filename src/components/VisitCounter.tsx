import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export default function VisitCounter() {
  const [visitorCount, setVisitorCount] = useState(0);
  
  useEffect(() => {
    // Gerar um número aleatório entre 1000 e 2000
    const baseCount = 1000 + Math.floor(Math.random() * 1000);
    setVisitorCount(baseCount);
    
    // Opcionalmente: atualizar periodicamente para simular novos visitantes
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000); // a cada 30 segundos
    
    return () => clearInterval(interval);
  }, []);
  
  // Formatar o número com separadores de milhares
  const formattedCount = visitorCount.toLocaleString('pt-BR');
  
  return (
    <div className="flex items-center justify-center text-sm text-gray-400">
      <Users className="h-4 w-4 mr-2 text-[#00EEFF]" />
      <span>Mais de <span className="font-bold text-white">{formattedCount}</span> acessos nas últimas horas!</span>
    </div>
  );
}