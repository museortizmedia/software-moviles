import React, { useEffect, useMemo, useRef } from 'react';
import { PetVaxColors } from '../colors';

interface Props {
  value: number | '';
  onChange: (value: number) => void;
  minYear?: number;
  maxYear?: number;
}

export const YearSelector: React.FC<Props> = ({
  value,
  onChange,
  minYear,
  maxYear,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentYear = new Date().getFullYear();

  const years = useMemo(() => {
    const max = maxYear ?? currentYear;
    const min = minYear ?? currentYear - 25;

    const list: number[] = [];
    for (let y = max; y >= min; y--) {
      list.push(y);
    }
    return list;
  }, [minYear, maxYear, currentYear]);

  // Centrar automáticamente el seleccionado
  useEffect(() => {
    if (!containerRef.current) return;
    if (!value) return;

    const index = years.indexOf(value);
    if (index === -1) return;

    const el = containerRef.current.children[index] as HTMLElement;
    if (el) {
      el.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, [value, years]);

  const handleSelect = (year: number) => {
    onChange(year);
  };

  return (
    <div className="relative h-40">
      {/* overlay center indicator */}
      <div className="absolute top-1/2 left-0 right-0 h-10 -translate-y-1/2 border-y border-gray-200 pointer-events-none" />

      <div
        ref={containerRef}
        className="h-40 overflow-y-auto scroll-smooth snap-y snap-mandatory"
      >
        <div className="py-16">
          {years.map((year) => {
            const active = value === year;

            return (
              <button
                key={year}
                type="button"
                onClick={() => handleSelect(year)}
                className="w-full py-2 snap-center transition flex items-center justify-center"
                style={{
                  color: active ? PetVaxColors.primary : '#6b7280',
                  fontWeight: active ? 700 : 400,
                  fontSize: active ? 16 : 14,
                }}
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};