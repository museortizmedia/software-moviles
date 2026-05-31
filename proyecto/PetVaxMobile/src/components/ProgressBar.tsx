import React from 'react';

interface Props {
  value: number; // 0 - 100
  label?: string;
}

export const ProgressBar: React.FC<Props> = ({ value, label }) => {
  return (
    <div className="w-full space-y-1">

      {/* header */}
      <div className="flex justify-between items-center">
        
        {/* label izquierda */}
        <span className="text-xs text-gray-600 font-medium">
          {label || ''}
        </span>

        {/* porcentaje derecha */}
        <span className="text-xs text-gray-500 font-medium">
          {Math.round(value)}%
        </span>

      </div>

      {/* barra */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#00685f] transition-all"
          style={{ width: `${value}%` }}
        />
      </div>

    </div>
  );
};