import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  iconBackground?: string;
  iconColor?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  isLoading?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  icon,
  iconBackground = 'bg-[#6C00FF]',
  iconColor = 'text-white',
  children,
  footer,
  className = '',
  isLoading = false
}) => {
  return (
    <div className={`bg-[#0F0F18] border border-[#21213A] rounded-xl overflow-hidden ${className}`}>
      {isLoading ? (
        <div className="p-6 flex flex-col space-y-4 animate-pulse">
          <div className="w-1/3 h-4 bg-[#21213A] rounded"></div>
          <div className="w-full h-24 bg-[#21213A] rounded"></div>
          <div className="w-2/3 h-4 bg-[#21213A] rounded"></div>
        </div>
      ) : (
        <>
          {(title || icon) && (
            <div className="p-5 flex items-center border-b border-[#21213A]">
              {icon && (
                <div className={`w-10 h-10 rounded-lg ${iconBackground} flex items-center justify-center mr-3`}>
                  <div className={iconColor}>{icon}</div>
                </div>
              )}
              <div>
                {title && <h3 className="font-medium text-white">{title}</h3>}
                {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
              </div>
            </div>
          )}
          <div className="p-5">
            {children}
          </div>
          {footer && (
            <div className="px-5 py-4 bg-[#15152A] border-t border-[#21213A]">
              {footer}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Card;