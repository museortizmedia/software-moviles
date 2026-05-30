import React from 'react';

import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';

import { PetVaxColors } from '../../colors';
import { useAuth } from '../../context/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const displayName =
    user?.display_name ||
    user?.full_name ||
    user?.email ||
    'Usuario';

  return (
    <>
      <div className="space-y-1">
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{
            color: PetVaxColors.onSurface,
          }}
        >
          Hola, {displayName}
        </h1>

        <p
          className="text-sm"
          style={{
            color:
              PetVaxColors.onSurfaceVariant,
          }}
        >
          Monitoreo y alertas sanitarias en tiempo real.
        </p>
      </div>

      <Card
        title="Esquema Pendiente"
        subtitle="Cali Sur"
      >
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs font-mono">
            Dosis Refuerzo
          </span>

          <Badge status="due-soon">
            Requerido
          </Badge>
        </div>
      </Card>
    </>
  );
};