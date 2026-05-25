// Badge.tsx
import React from 'react';
import { PetVaxColors } from '../colors';

export type BadgeStatus = 'up-to-date' | 'due-soon' | 'error';

interface BadgeProps {
  status?: BadgeStatus;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ status = 'up-to-date', children }) => {
  const styles: Record<BadgeStatus, { backgroundColor: string; color: string }> = {
    'up-to-date': {
      backgroundColor: PetVaxColors.onPrimaryContainer,
      color: PetVaxColors.primary,
    },
    'due-soon': {
      backgroundColor: PetVaxColors.warningContainer,
      color: PetVaxColors.onWarningContainer,
    },
    'error': {
      backgroundColor: PetVaxColors.errorContainer,
      color: PetVaxColors.error,
    }
  };

  const currentStyle = styles[status] || styles['up-to-date'];

  return (
    <span 
      className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full tracking-wide"
      style={currentStyle}
    >
      {children}
    </span>
  );
};