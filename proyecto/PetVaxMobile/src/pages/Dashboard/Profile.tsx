import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/Card';
import { PetVaxColors } from '../../colors';

export const Profile: React.FC = () => {
  const history = useHistory();
  const { user, logout } = useAuth();
  const email = user?.email ?? 'No disponible';
  const name = user?.isGuest ? 'Invitado' : user?.name ?? 'Usuario';

  return (
    <>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: PetVaxColors.onSurface }}>
          Perfil
        </h1>
        <p className="text-sm" style={{ color: PetVaxColors.onSurfaceVariant }}>
          Información básica del usuario y ajustes de cuenta.
        </p>
      </div>

      <Card title={name} subtitle={email}>
        <div className="space-y-2 text-sm text-[#475569]">
          <p>{user?.isGuest ? 'Acceso temporal como invitado.' : 'Cuenta preparada para tu seguimiento.'}</p>
          <p>Próximamente podrás editar tu perfil y preferencias.</p>
        </div>
      </Card>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={() => {
            logout();
            history.replace('/login');
          }}
          className="w-full max-w-xs h-12 bg-[#f3f4f6] text-[#374151] rounded-lg border border-gray-200 font-semibold hover:bg-gray-100 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </>
  );
};
