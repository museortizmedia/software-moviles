import React from 'react';
import { Cat, Dog, PawPrint } from 'lucide-react';
import { PetVaxColors } from '../colors';

type PetType = 'gato' | 'perro' | 'otro';

interface Props {
  value: PetType;
  onChange: (value: PetType) => void;
}

export const PetTypeSelector: React.FC<Props> = ({ value, onChange }) => {
  const items = [
    { key: 'perro' as PetType, label: 'Perro', icon: Dog },
    { key: 'gato' as PetType, label: 'Gato', icon: Cat },
    { key: 'otro' as PetType, label: 'Otro', icon: PawPrint },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((item) => {
        const Icon = item.icon;
        const active = value === item.key;

        return (
          <button
            type="button"
            onClick={() => onChange(item.key)}
            className="p-3 rounded-xl border flex flex-col items-center gap-2 transition"
            style={{
              borderColor: active ? PetVaxColors.primary : '#e5e7eb',
              backgroundColor: active ? `${PetVaxColors.primary}10` : 'white',
            }}
          >
            <Icon
              size={22}
              color={active ? PetVaxColors.primary : '#6b7280'}
            />
            <span
              className="text-xs font-medium"
              style={{
                color: active ? PetVaxColors.primary : '#6b7280',
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};