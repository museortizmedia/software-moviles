// src/pages/Dashboard.tsx
import React from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { PetVaxColors } from '../colors';

export const Dashboard: React.FC = () => {
  return (
    <>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: PetVaxColors.onSurface }}>
          Panel Principal
        </h1>
        <p className="text-sm" style={{ color: PetVaxColors.onSurfaceVariant }}>
          Monitoreo y alertas sanitarias en tiempo real.
        </p>
      </div>

      <Card title="Esquema Pendiente" subtitle="Cali Sur">
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs font-mono">Dosis Refuerzo</span>
          <Badge status="due-soon">Requerido</Badge>
        </div>
      </Card>
    </>
  );
};