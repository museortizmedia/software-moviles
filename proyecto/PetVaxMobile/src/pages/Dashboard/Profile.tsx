import React from 'react';

import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/Card';
import { PetVaxColors } from '../../colors';

export const Profile: React.FC = () => {
  const { user } = useAuth();

  const email =
    user?.email ?? 'No disponible';

  const name =
    user?.display_name ||
    user?.full_name ||
    'Usuario';

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{
            color: PetVaxColors.onSurface,
          }}
        >
          Perfil
        </h1>

        <p
          className="text-sm"
          style={{
            color:
              PetVaxColors.onSurfaceVariant,
          }}
        >
          Información básica del usuario y ajustes de cuenta.
        </p>
      </div>

      <Card
        title={name}
        subtitle={email}
      >
        <div className="space-y-2 text-sm text-slate-600">
          <p>
            Plan:{' '}
            {user?.plan === 'premium'
              ? 'Premium'
              : 'Gratuito'}
          </p>

          <p>
            Próximamente podrás editar tu
            perfil y preferencias.
          </p>
        </div>
      </Card>
    </div>
  );
};