// Input.tsx
import React, { useState, InputHTMLAttributes } from 'react';
import { PetVaxColors } from '../colors';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, placeholder, type = 'text', ...props }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label 
          className="text-sm font-semibold tracking-wide"
          style={{ color: PetVaxColors.onSurface }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full h-12 px-4 rounded-lg border text-base transition-all duration-200 outline-none"
        style={{
          fontFamily: 'Geist, sans-serif',
          backgroundColor: isFocused ? '#f4fffc' : '#ffffff',
          borderColor: isFocused ? PetVaxColors.primary : PetVaxColors.outline,
          boxShadow: isFocused ? `0 0 0 1px ${PetVaxColors.primary}` : 'none',
          color: PetVaxColors.onSurface
        }}
        {...props}
      />
    </div>
  );
};