import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';

import { PetVaxColors } from '../../colors';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight } from 'lucide-react';
import BgPattern from '../../assets/bg-pattern.png';

import { PawPrint, Sparkles, Bell } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { user } = useAuth();

  const displayName =
    user?.display_name ||
    user?.full_name ||
    user?.email ||
    'Usuario';

  return (
    <div className="space-y-6">

      {/* HERO */}
      <div className="relative w-full h-80 overflow-hidden">

        <img
          src={BgPattern}
          className="w-full h-full object-cover"
        />

        {/* degradado inferior más fuerte */}
        <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-white via-white/80 to-transparent" />

        {/* contenido */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 text-center px-4">

          <Badge status="up-to-date">
            Premium
          </Badge>

          <h1 className="text-lg font-bold text-[#141b2b] mt-2">
            Cuida tu salud
          </h1>

          <p className="text-xs text-[#3d4947] max-w-[280px]">
            Descubre todo el potencial de PetVex para tu familia peluda.
          </p>

        </div>
      </div>

      {/* FEATURES PREMIUM */}
      <div className="grid gap-3 mt-2">

        <Card>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-50 text-[#0D9488]">
              <PawPrint size={18} />
            </div>

            <div>
              <h3 className="text-sm font-semibold">Mascotas ilimitadas</h3>
              <p className="text-xs text-gray-600">
                Agrega todas tus mascotas sin restricciones en el plan premium. (1 mascota en plan free)
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-50 text-[#0D9488]">
              <Sparkles size={18} />
            </div>

            <div>
              <h3 className="text-sm font-semibold">Consejos personalizados</h3>
              <p className="text-xs text-gray-600">
                Recomendaciones según la historia clínica y raza de tu mascota.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-50 text-[#0D9488]">
              <Bell size={18} />
            </div>

            <div>
              <h3 className="text-sm font-semibold">Alertas inteligentes</h3>
              <p className="text-xs text-gray-600">
                Notificaciones adaptadas al estado de salud de cada mascota.
              </p>
            </div>
          </div>
        </Card>

      </div>

      {/* PREMIUM CTA */}
      <div
        className="p-5 rounded-2xl border w-full text-white"
        style={{
          backgroundColor: '#0D9488',
          borderColor: PetVaxColors.secondaryContainer,
          boxShadow: '0 8px 24px rgba(0, 104, 95, 0.15)',
        }}
      >
        <div className="flex flex-col items-center text-center gap-2 mb-4">

          <div className="flex items-end gap-1">
            <h3 className="text-3xl font-semibold">$49.900</h3>
            <span className="text-sm font-light opacity-90">/por mes</span>
          </div>

          <span className="text-sm opacity-90 leading-snug">
            Cancela en cualquier momento. Sin contratos. Solo amor.
          </span>
        </div>

        <button
          id="premium-cta"
          className="bg-white rounded-full w-full py-3 text-sm font-medium text-green-700 border border-green-700 flex items-center justify-center gap-2"
          onClick={() => {
            const phone = '573197293775';
            const message = encodeURIComponent(
              'Hola, quiero hacerme Premium en PetVax'
            );

            window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
          }}
        >
          Desbloquea Premium
          <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
};