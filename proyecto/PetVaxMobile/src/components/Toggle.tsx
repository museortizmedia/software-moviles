import React from 'react';
import { PetVaxColors } from '../colors';

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}

export const Toggle: React.FC<Props> = ({ value, onChange, label }) => {
  return (
    <div className="flex items-center justify-between w-full">
      {label && (
        <span className="text-sm font-medium" style={{ color: PetVaxColors.onSurface }}>
          {label}
        </span>
      )}

      <button
        type="button"
        onClick={() => onChange(!value)}
        className="relative w-12 h-7 rounded-full transition-all duration-300"
        style={{
          backgroundColor: value ? '#00685f' : '#00685f50',
        }}
      >
        {/* círculo */}
        <span
          className="absolute top-1 left-1 w-5 h-5 rounded-full transition-all duration-300 shadow-sm"
          style={{
            transform: value ? 'translateX(20px)' : 'translateX(0px)',
            backgroundColor: '#fff',
          }}
        />
      </button>
    </div>
  );
};