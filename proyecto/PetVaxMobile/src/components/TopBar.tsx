import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Bell, PawPrint, User, X, LogOut, ShieldCheck } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

export const TopBar: React.FC = () => {
  const history = useHistory();
  const { user, logout } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    setShowProfileMenu(false);

    await logout();

    history.replace('/login');
  };

  return (
    <>
      {/* NOTIFICACIONES */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100 flex justify-end animate-fade-in">
          <div className="w-full max-w-xs bg-white h-full shadow-2xl flex flex-col animate-slide-left">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#f9f9ff]">
              <div className="flex items-center gap-2 text-[#00685f]">
                <Bell className="w-5 h-5" />
                <span className="font-bold text-lg">
                  Notificaciones
                </span>
              </div>

              <button
                onClick={() =>
                  setShowNotifications(false)
                }
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-xl text-xs text-gray-600">
                <p className="font-semibold text-[#00685f]">
                  ¡Bienvenido a PetVax!
                </p>

                <p className="mt-0.5">
                  No olvides completar el esquema de
                  vacunación de tus mascotas.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MENÚ PERFIL */}
      {showProfileMenu && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-100 flex items-start justify-end p-4 animate-fade-in"
          onClick={() =>
            setShowProfileMenu(false)
          }
        >
          <div
            className="w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 mt-14 flex flex-col space-y-3 animate-scale-up"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="flex flex-col space-y-1">
              <span className="font-bold text-gray-800 text-base">
                {user?.display_name ??
                  user?.full_name ??
                  'Usuario'}
              </span>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00685f]">
                <ShieldCheck className="w-3.5 h-3.5" />

                <span>
                  {user?.plan === 'premium'
                    ? 'Plan Premium'
                    : 'Plan Gratuito'}
                </span>
              </div>
            </div>

            <hr className="border-gray-100" />

            <button
              onClick={() => {
                setShowProfileMenu(false);
                history.push('/profile');
              }}
              className="w-full text-left py-2 px-1 text-sm font-medium text-gray-600 hover:text-[#00685f]"
            >
              Ver mi cuenta
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between py-2 px-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-bold"
            >
              Cerrar sesión

              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <header className="w-full h-16 bg-[#f9f9ff] px-4 border-b border-gray-100 flex items-center justify-between sticky top-0 left-0 right-0 z-50">
        <div className="w-full max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PawPrint
              className="w-7 h-7 text-[#00685f]"
              strokeWidth={2.5}
            />

            <span className="text-2xl font-bold tracking-tight text-[#00685f]">
              PetVax
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setShowNotifications(true)
              }
              className="relative"
            >
              <Bell className="w-6 h-6 text-[#141b2b]" />

              <span className="absolute top-1 right-1 w-2 h-2 bg-[#00685f] rounded-full" />
            </button>

            <div
              onClick={() =>
                setShowProfileMenu(true)
              }
              className="w-9 h-9 rounded-full border-2 border-[#00685f] overflow-hidden flex items-center justify-center cursor-pointer"
            >
              {user?.profile_pic ? (
                <img
                  src={user.profile_pic}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#d8e5e2] flex items-center justify-center text-[#00685f]">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};