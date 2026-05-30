import React from 'react';

import { Card } from '../../components/Card';
import { PetVaxColors } from '../../colors';

export const Reminders: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{
            color: PetVaxColors.onSurface,
          }}
        >
          Recordatorios
        </h1>

        <p
          className="text-sm"
          style={{
            color:
              PetVaxColors.onSurfaceVariant,
          }}
        >
          Mantente al día con las vacunas y próximas citas.
        </p>
      </div>

      <Card
        title="Vacuna de refuerzo"
        subtitle="Luna"
      >
        <p className="text-sm text-slate-600">
          Dosis programada para el 05/06/2026
        </p>
      </Card>

      <Card
        title="Control veterinario"
        subtitle="Milo"
      >
        <p className="text-sm text-slate-600">
          Programado para el 18/06/2026
        </p>
      </Card>
    </div>
  );
};