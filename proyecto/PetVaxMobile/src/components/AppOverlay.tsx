// src/components/AppOverlay.tsx
import React, { useState } from 'react';
import { IonContent, IonFooter, IonPage, IonRouterOutlet } from '@ionic/react';
import { Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PetVaxColors } from '../colors';
import { Bell, Layout, PawPrint, User, X, LogOut, ShieldCheck } from 'lucide-react';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Pets } from '../pages/Dashboard/Pets';
import { Reminders } from '../pages/Dashboard/Reminders';
import { Profile } from '../pages/Dashboard/Profile';

export const AppOverlay: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { user, logout } = useAuth();
  const currentPath = location.pathname;

  // Estados para controlar los paneles flotantes (Overlays)
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    setShowProfileMenu(false);
    logout();
    history.replace('/login');
  };

  return (
    <div className="app-overlay-root">
      {/* =========================================================================
          1. PANEL SUPERPUESTO: NOTIFICACIONES (Sección diferente a Recordatorios)
          ========================================================================= */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100 flex justify-end animate-fade-in">
          <div className="w-full max-w-xs bg-white h-full shadow-2xl flex flex-col animate-slide-left">
            {/* Header del Panel */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#f9f9ff]">
              <div className="flex items-center gap-2 text-[#00685f]">
                <Bell className="w-5 h-5" />
                <span className="font-bold text-lg">Notificaciones</span>
              </div>
              <button 
                onClick={() => setShowNotifications(false)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            {/* Contenido / Listado */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* Ejemplo de notificación vacía o mapeo de alertas en tiempo real */}
              <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-xl text-xs text-gray-600">
                <p className="font-semibold text-[#00685f]">¡Bienvenido a PetVax!</p>
                <p className="mt-0.5">No olvides completar el esquema de vacunación de tus peluditos esta semana.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          2. PANEL SUPERPUESTO: MENÚ DE PERFIL COMPACTO (Contexto + Cerrar Sesión)
          ========================================================================= */}
      {showProfileMenu && (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-100 flex items-start justify-end p-4 animate-fade-in" onClick={() => setShowProfileMenu(false)}>
          {/* Tarjeta flotante que se cierra al dar click fuera por el event propagation */}
          <div 
            className="w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 mt-14 flex flex-col space-y-3 animate-scale-up"
            onClick={(e) => e.stopPropagation()} // Evita que se cierre al tocar dentro del recuadro
          >
            {/* Detalles del Usuario */}
            <div className="flex flex-col space-y-1">
              <span className="font-bold text-gray-800 text-base tracking-tight">
                {user?.displayName || user?.name || 'Usuario PetVax'}
              </span>
              
              {/* Badge del tipo de Plan */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00685f]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{user?.plan === 'premium' ? 'Plan Premium' : 'Plan Gratuito'}</span>
              </div>
            </div>

            {/* Línea Divisoria Estilizada */}
            <hr className="border-gray-100 my-1" />

            {/* Acción de Navegar al Perfil Completo */}
            <button
              onClick={() => { setShowProfileMenu(false); history.push('/profile'); }}
              className="w-full text-left py-2 px-1 text-sm font-medium text-gray-600 hover:text-[#00685f] rounded-lg transition-colors"
            >
              Ver mi Cuenta
            </button>

            {/* Botón Rojo de Cerrar Sesión */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between py-2 px-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-bold transition-colors group"
            >
              Cerrar sesión
              <LogOut className="w-4 h-4 text-red-500 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          3. NAVEGACIÓN Y ESTRUCTURA GLOBAL DE LA APP
          ========================================================================= */}
      {/* CABECERA NATIVA */}
      <header className="w-full h-16 bg-[#f9f9ff] px-4 border-b border-gray-100 flex items-center justify-between sticky top-0 left-0 right-0 z-50">
        <div className="w-full max-w-md mx-auto flex items-center justify-between">
          
          {/* LADO IZQUIERDO: Branding Fijo */}
          <div className="flex items-center gap-2">
            <PawPrint className="w-7 h-7 text-[#00685f]" strokeWidth={2.5} />
            <span className="text-2xl font-bold tracking-tight text-[#00685f]">
              PetVax
            </span>
          </div>

          {/* LADO DERECHO: Notificaciones + Perfil Circular */}
          <div className="flex items-center gap-4">
            
            {/* Icono de Campana Notificaciones */}
            <button
              type="button"
              onClick={() => setShowNotifications(true)} // Abre el cajón lateral de notificaciones
              className="text-[#141b2b] hover:text-[#00685f] transition-colors flex items-center justify-center p-1 cursor-pointer relative"
            >
              <Bell className="w-6 h-6" strokeWidth={2} />
              {/* Punto indicador de alerta sin leer (opcional) */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#00685f] rounded-full"></span>
            </button>

            {/* Círculo de Foto de Perfil */}
            <div
              onClick={() => setShowProfileMenu(true)} // Abre el menú contextual del perfil
              className="w-9 h-9 rounded-full border-2 border-[#00685f] overflow-hidden flex items-center justify-center cursor-pointer shadow-sm transition-transform active:scale-95"
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#d8e5e2] flex items-center justify-center text-[#00685f]">
                  <User className="w-5 h-5" strokeWidth={2.5} />
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* CONTENIDO PRINCIPAL SCROLLABLE - cada página tiene su propio IonPage */}
      <IonRouterOutlet>
        <Route
          exact
          path="/dashboard"
          render={() => (
            <IonPage>
              <IonContent
                scrollEvents={true}
                style={{ '--background': PetVaxColors.surface } as React.CSSProperties}
              >
                <div className="px-5 py-6 space-y-4 pb-24 max-w-md mx-auto">
                  <Dashboard />
                </div>
              </IonContent>
            </IonPage>
          )}
        />

        <Route
          exact
          path="/pets"
          render={() => (
            <IonPage>
              <IonContent
                scrollEvents={true}
                style={{ '--background': PetVaxColors.surface } as React.CSSProperties}
              >
                <div className="px-5 py-6 space-y-4 pb-24 max-w-md mx-auto">
                  <Pets />
                </div>
              </IonContent>
            </IonPage>
          )}
        />

        <Route
          exact
          path="/reminders"
          render={() => (
            <IonPage>
              <IonContent
                scrollEvents={true}
                style={{ '--background': PetVaxColors.surface } as React.CSSProperties}
              >
                <div className="px-5 py-6 space-y-4 pb-24 max-w-md mx-auto">
                  <Reminders />
                </div>
              </IonContent>
            </IonPage>
          )}
        />

        <Route
          exact
          path="/profile"
          render={() => (
            <IonPage>
              <IonContent
                scrollEvents={true}
                style={{ '--background': PetVaxColors.surface } as React.CSSProperties}
              >
                <div className="px-5 py-6 space-y-4 pb-24 max-w-md mx-auto">
                  <Profile />
                </div>
              </IonContent>
            </IonPage>
          )}
        />

        <Route render={() => <Redirect to="/dashboard" />} />
      </IonRouterOutlet>

      {/* MENÚ INFERIOR */}
      <IonFooter className="ion-no-border fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto z-50">
        <div
          className="h-16 bg-white border-t flex items-center justify-around px-2"
          style={{
            borderColor: PetVaxColors.surfaceContainer,
            boxShadow: '0 -4px 16px rgba(20, 27, 43, 0.03)'
          }}
        >
          {/* TAB: DASHBOARD */}
          <button
            onClick={() => history.push('/dashboard')}
            className="flex flex-col items-center justify-center w-16 h-full gap-0.5 transition-transform active:scale-95 cursor-pointer"
            style={{ color: currentPath === '/dashboard' ? PetVaxColors.primary : PetVaxColors.outline }}
          >
            <Layout className="w-6 h-6" />
            <span className="text-[10px] font-medium">Dashboard</span>
          </button>

          {/* TAB: MASCOTAS */}
          <button
            onClick={() => history.push('/pets')}
            className="flex flex-col items-center justify-center w-16 h-full gap-0.5 transition-transform active:scale-95 cursor-pointer"
            style={{ color: currentPath === '/pets' ? PetVaxColors.primary : PetVaxColors.outline }}
          >
            <PawPrint className="w-6 h-6" />
            <span className="text-[10px] font-medium">Mascotas</span>
          </button>

          {/* TAB: RECORDATORIOS */}
          <button
            onClick={() => history.push('/reminders')}
            className="flex flex-col items-center justify-center w-16 h-full gap-0.5 transition-transform active:scale-95 cursor-pointer"
            style={{ color: currentPath === '/reminders' ? PetVaxColors.primary : PetVaxColors.outline }}
          >
            <Bell className="w-6 h-6" />
            <span className="text-[10px] font-medium">Recordatorios</span>
          </button>

          {/* TAB: PERFIL */}
          <button
            onClick={() => history.push('/profile')}
            className="flex flex-col items-center justify-center w-16 h-full gap-0.5 transition-transform active:scale-95 cursor-pointer"
            style={{ color: currentPath === '/profile' ? PetVaxColors.primary : PetVaxColors.outline }}
          >
            <User className="w-6 h-6" />
            <span className="text-[10px] font-medium">Perfil</span>
          </button>
        </div>
      </IonFooter>
    </div>
  );
};