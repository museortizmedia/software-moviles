import React, { useMemo, useState } from 'react';
import { usePets } from '../../context/PetsContext';
import { ReminderCard } from '../../components/ReminderCard';
import { ProgressBar } from '../../components/ProgressBar';
import { Badge } from '../../components/Badge';
import { Syringe, Pill, Bath } from 'lucide-react';
import { Toggle } from '../../components/Toggle';
import { BadgeStatus } from '../../components/Badge';

export const Reminders: React.FC = () => {
  const { pets, updatePetReminder } = usePets();
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // ✅ SIEMPRE SE EJECUTA (sin romper hooks)
  const pet = useMemo(() => {
    if (!pets.length) return null;
    return pets.find(p => p.id === selectedPetId) || pets[0];
  }, [pets, selectedPetId]);

  if (!pet) return <div>No hay mascotas</div>;

  // =========================
  // HELPERS
  // =========================
  const addMonths = (date: string | null, months: number) => {
    if (!date) return null;
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
  };

  const daysUntil = (date: Date | null) => {
    if (!date) return null;
    return Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  };

  // =========================
  // VACUNACIÓN (12 meses)
  // =========================
  const nextVaccination = addMonths(pet.last_vaccination_date, 12);
  const vaccinationDays = daysUntil(nextVaccination);

  // =========================
  // DESPARASITACIÓN (6 meses)
  // =========================
  const nextDeworming = addMonths(pet.last_deworming_date, 6);

  const dewormingProgress = (lastDate: string | null) => {
    if (!lastDate) return 0;

    const start = new Date(lastDate);
    const now = new Date();

    const elapsed = now.getTime() - start.getTime();
    const total = 6 * 30 * 24 * 60 * 60 * 1000;

    return Math.min(100, (elapsed / total) * 100);
  };

  // =========================
  // BAÑO (1 mes)
  // =========================
  const nextBath = addMonths(pet.last_bath_date, 1);
  const bathDays = daysUntil(nextBath);

  const getBathState = (days: number | null): { status: BadgeStatus; label: string } => {
    if (days === null) return { status: 'error', label: 'Sin registro' };
    if (days <= 0) return { status: 'error', label: 'Baño urgente' };
    if (days <= 2) return { status: 'error', label: 'Muy sucio' };
    if (days <= 5) return { status: 'due-soon', label: 'Cuidado de higiene' };
    if (days <= 10) return { status: 'up-to-date', label: 'En buen estado' };
    return { status: 'up-to-date', label: 'Limpio' };
  };

  const bathState = getBathState(bathDays);

  // =========================
  // UPDATE REMINDER SAFE
  // =========================
  const handleToggle = async (
    field:
      | 'vaccination_enabled'
      | 'deworming_enabled'
      | 'bath_enabled',
    value: boolean
  ) => {
    await updatePetReminder(pet.id, field, value);
  };

  return (
    <div className="space-y-4">

      {/* PET SELECTOR */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {pets.map(p => {
          const isSelected = pet.id === p.id;

          return (
            <button
              key={p.id}
              onClick={() => setSelectedPetId(p.id)}
              className="flex flex-col items-center gap-1 min-w-[70px]"
            >
              <div
                className={`w-14 h-14 rounded-full border-2 overflow-hidden flex items-center justify-center ${
                  isSelected ? 'border-[#00685f]' : 'border-gray-200'
                }`}
              >
                {p.photo ? (
                  <img src={p.photo} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-xs text-gray-400">🐾</div>
                )}
              </div>

              <span className="text-xs text-gray-600 truncate max-w-[70px]">
                {p.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* =========================
          VACUNACIÓN
      ========================= */}
      <ReminderCard
        icon={<Syringe size={18} />}
        title="Vacunación"
        description={pet.name}
        nextLabel="Ciclo anual (12 meses)"
        nextDate={nextVaccination?.toDateString()}
        rightAction={
          <Toggle
            value={pet.vaccination_enabled}
            onChange={(v) =>
              handleToggle('vaccination_enabled', v)
            }
          />
        }
      >
        <Badge
          status={
            vaccinationDays !== null && vaccinationDays <= 7
              ? 'due-soon'
              : 'up-to-date'
          }
        >
          {vaccinationDays ?? 'Sin registro'} días
        </Badge>
      </ReminderCard>

      {/* =========================
          DESPARASITACIÓN
      ========================= */}
      <ReminderCard
        icon={<Pill size={18} />}
        title="Desparasitación"
        description={pet.name}
        nextLabel="Ciclo semestral (6 meses)"
        nextDate={nextDeworming?.toDateString()}
        rightAction={
          <Toggle
            value={pet.deworming_enabled}
            onChange={(v) =>
              handleToggle('deworming_enabled', v)
            }
          />
        }
      >
        <ProgressBar
          value={dewormingProgress(pet.last_deworming_date)}
        />
      </ReminderCard>

      {/* =========================
          BAÑO
      ========================= */}
      <ReminderCard
        icon={<Bath size={18} />}
        title="Baño"
        description={pet.name}
        nextLabel="Ciclo mensual (1 mes)"
        nextDate={nextBath?.toDateString()}
        rightAction={
          <Toggle
            value={pet.bath_enabled}
            onChange={(v) =>
              handleToggle('bath_enabled', v)
            }
          />
        }
        >
        <Badge status={bathState.status}>
          {bathState.label}
        </Badge>
      </ReminderCard>

    </div>
  );
};