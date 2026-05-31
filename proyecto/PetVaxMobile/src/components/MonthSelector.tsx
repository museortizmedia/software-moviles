import React from 'react';
import { PetVaxColors } from '../colors';

interface Props {
  value: number | '';
  onChange: (value: number) => void;
}

const months = [
  'Ene','Feb','Mar','Abr','May','Jun',
  'Jul','Ago','Sep','Oct','Nov','Dic'
];

export const MonthSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {months.map((m, index) => {
        const monthNumber = index + 1;
        const active = value === monthNumber;

        return (
          <button
            type="button"
            key={m}
            onClick={() => onChange(monthNumber)}
            className="py-2 rounded-lg border text-xs font-medium transition"
            style={{
              borderColor: active ? PetVaxColors.primary : '#e5e7eb',
              backgroundColor: active ? `${PetVaxColors.primary}10` : 'white',
              color: active ? PetVaxColors.primary : '#6b7280',
            }}
          >
            {m}
          </button>
        );
      })}
    </div>
  );
};