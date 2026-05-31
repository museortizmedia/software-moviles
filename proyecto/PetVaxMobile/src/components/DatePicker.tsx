import React, { useMemo, useState } from 'react';
import { PetVaxColors } from '../colors';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export const DatePicker: React.FC<Props> = ({ value, onChange, label }) => {
  const initial = value ? new Date(value) : new Date();

  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(initial.getMonth());
  const [year, setYear] = useState(initial.getFullYear());

  const selectedDate = value ? new Date(value) : null;

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const start = firstDay.getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const arr: (number | null)[] = [];

    for (let i = 0; i < start; i++) arr.push(null);
    for (let d = 1; d <= totalDays; d++) arr.push(d);

    return arr;
  }, [month, year]);

  const selectDay = (day: number) => {
    const date = new Date(year, month, day);
    const iso = date.toISOString().split('T')[0];
    onChange(iso);
    setOpen(false);
  };

  const display = value ? new Date(value).toLocaleDateString() : 'Seleccionar fecha';

  return (
    <div className="w-full relative">
      {label && (
        <label className="text-sm font-semibold mb-1 block" style={{ color: PetVaxColors.onSurface }}>
          {label}
        </label>
      )}

      {/* INPUT VISUAL */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full h-12 px-4 rounded-lg border text-left flex items-center"
        style={{
          borderColor: PetVaxColors.outline,
          background: '#fff',
          color: PetVaxColors.onSurface,
        }}
      >
        {display}
      </button>

      {/* MODAL CALENDAR */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-80 rounded-xl p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
              <button onClick={() => setMonth((m) => (m === 0 ? 11 : m - 1))}>
                <ChevronLeft />
              </button>

              <div className="font-semibold">
                {new Date(year, month).toLocaleString('es-ES', {
                  month: 'long',
                  year: 'numeric',
                })}
              </div>

              <button onClick={() => setMonth((m) => (m === 11 ? 0 : m + 1))}>
                <ChevronRight />
              </button>
            </div>

            {/* DAYS GRID */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d) => (
                <div key={d} className="font-semibold text-gray-400">
                  {d}
                </div>
              ))}

              {days.map((day, i) =>
                day ? (
                  <button
                    key={i}
                    onClick={() => selectDay(day)}
                    className="h-9 rounded-md text-sm"
                    style={{
                      background:
                        selectedDate?.getDate() === day &&
                        selectedDate?.getMonth() === month &&
                        selectedDate?.getFullYear() === year
                          ? PetVaxColors.primary
                          : 'transparent',
                      color:
                        selectedDate?.getDate() === day &&
                        selectedDate?.getMonth() === month &&
                        selectedDate?.getFullYear() === year
                          ? 'white'
                          : PetVaxColors.onSurface,
                    }}
                  >
                    {day}
                  </button>
                ) : (
                  <div key={i} />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};