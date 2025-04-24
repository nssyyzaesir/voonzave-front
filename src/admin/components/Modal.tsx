import React, { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  preventClose?: boolean;
  closeOnOverlayClick?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  preventClose = false,
  closeOnOverlayClick = true
}) => {
  // Fechar o modal ao pressionar Escape
  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen && !preventClose) {
        onClose();
      }
    }
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose, preventClose]);

  // Bloquear o scroll do body quando o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick && !preventClose) {
      onClose();
    }
  };

  // Controlar o tamanho do modal
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-4xl'
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div 
        className={`w-full ${sizeClasses[size]} bg-[#0F0F18] border border-[#21213A] rounded-xl shadow-xl transform transition-all`}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#21213A]">
          <h3 className="text-lg font-medium text-white">{title}</h3>
          {!preventClose && (
            <button 
              onClick={onClose}
              className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-[#21213A]"
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        <div className="p-5 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
        
        {footer && (
          <div className="p-4 border-t border-[#21213A] bg-[#15152A] rounded-b-xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;