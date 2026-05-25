// Card.tsx
import React, { HTMLAttributes } from 'react';
import { PetVaxColors } from '../colors';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, subtitle, children, ...props }) => {
  return (
    <div 
      className="p-4 rounded-2xl border transition-shadow duration-300 w-full"
      style={{
        backgroundColor: '#ffffff',
        borderColor: PetVaxColors.secondaryContainer,
        boxShadow: '0 4px 20px rgba(0, 104, 95, 0.05)',
        fontFamily: 'Geist, sans-serif'
      }}
      {...props}
    >
      {(title || subtitle) && (
        <div className="mb-3 flex justify-between items-start">
          <div>
            {title && <h3 className="text-lg font-semibold" style={{ color: PetVaxColors.onSurface }}>{title}</h3>}
            {subtitle && <p className="text-xs" style={{ color: PetVaxColors.onSurfaceVariant }}>{subtitle}</p>}
          </div>
        </div>
      )}
      <div className="text-sm" style={{ color: PetVaxColors.onSurfaceVariant }}>
        {children}
      </div>
    </div>
  );
};