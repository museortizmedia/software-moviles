// PetAvatar.tsx
import React from 'react';
import { PetVaxColors } from '../colors';

interface PetAvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
}

export const PetAvatar: React.FC<PetAvatarProps> = ({ src, alt, size = 'md', active = false }) => {
  const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <div className="relative inline-block">
      <div 
        className="rounded-full flex items-center justify-center p-[3px] transition-transform duration-300"
        style={{
          background: active 
            ? `linear-gradient(135deg, ${PetVaxColors.primaryContainer}, ${PetVaxColors.primary})` 
            : `linear-gradient(135deg, ${PetVaxColors.surfaceDim}, ${PetVaxColors.surfaceContainerHigh})`
        }}
      >
        <div className="bg-white p-[2px] rounded-full">
          <img 
            src={src || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=150'} 
            alt={alt || "Mascota"} 
            className={`${sizeClasses[size]} rounded-full object-cover`}
          />
        </div>
      </div>
    </div>
  );
};