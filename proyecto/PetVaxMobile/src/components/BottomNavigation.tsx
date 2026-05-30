import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import {
  Bell,
  Layout,
  PawPrint,
  User,
} from 'lucide-react';

import { PetVaxColors } from '../colors';

export const BottomNavigation: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <footer className="w-full h-16 bg-[#f9f9ff] border-b border-gray-100 flex items-center justify-between sticky top-0 left-0 right-0 z-50">
      <div
        className="w-full h-16 bg-white border-t flex items-center justify-around"
        style={{
          borderColor:
            PetVaxColors.surfaceContainer,
          boxShadow:
            '0 -4px 16px rgba(20,27,43,0.03)',
        }}
      >
        <button
          onClick={() =>
            history.push('/dashboard')
          }
          className="flex flex-col items-center justify-center w-16 h-full gap-0.5"
          style={{
            color:
              currentPath === '/dashboard'
                ? PetVaxColors.primary
                : PetVaxColors.outline,
          }}
        >
          <Layout className="w-6 h-6" />
          <span className="text-[10px]">
            Dashboard
          </span>
        </button>

        <button
          onClick={() =>
            history.push('/pets')
          }
          className="flex flex-col items-center justify-center w-16 h-full gap-0.5"
          style={{
            color:
              currentPath === '/pets'
                ? PetVaxColors.primary
                : PetVaxColors.outline,
          }}
        >
          <PawPrint className="w-6 h-6" />
          <span className="text-[10px]">
            Mascotas
          </span>
        </button>

        <button
          onClick={() =>
            history.push('/reminders')
          }
          className="flex flex-col items-center justify-center w-16 h-full gap-0.5"
          style={{
            color:
              currentPath === '/reminders'
                ? PetVaxColors.primary
                : PetVaxColors.outline,
          }}
        >
          <Bell className="w-6 h-6" />
          <span className="text-[10px]">
            Recordatorios
          </span>
        </button>

        <button
          onClick={() =>
            history.push('/profile')
          }
          className="flex flex-col items-center justify-center w-16 h-full gap-0.5"
          style={{
            color:
              currentPath === '/profile'
                ? PetVaxColors.primary
                : PetVaxColors.outline,
          }}
        >
          <User className="w-6 h-6" />
          <span className="text-[10px]">
            Perfil
          </span>
        </button>
      </div>
    </footer>
  );
};