import React from 'react';
import { Card } from '../../components/Card';
import { PetVaxColors } from '../../colors';

export const Pets: React.FC = () => {
  return (
    <>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: PetVaxColors.onSurface }}>
          Mis Mascotas
        </h1>
        <p className="text-sm" style={{ color: PetVaxColors.onSurfaceVariant }}>
          Revisa el historial y estado de cada mascota registrada.
        </p>
      </div>

      <Card title="Luna" subtitle="Husky, 3 años">
        <p className="text-sm text-[#475569]">Última vacuna: Rabia - 02/2026</p>
      </Card>

      <Card title="Milo" subtitle="Gato, 1 año">
        <p className="text-sm text-[#475569]">Próxima visita: 12/06/2026</p>
      </Card>
    </>
  );
};
