// src/components/AppOverlay.tsx
import React from 'react';
import { IonHeader, IonContent, IonFooter, IonToolbar } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { PetVaxColors } from '../colors';

interface AppOverlayProps {
  children: React.ReactNode;
  petAvatar?: React.ReactNode;
}

export const AppOverlay: React.FC<AppOverlayProps> = ({ children, petAvatar }) => {
  const history = useHistory();
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <>
      {/* MENÚ SUPERIOR (Header de Ionic) */}
      <IonHeader className="ion-no-border">
        <IonToolbar 
          className="px-4 h-16 flex items-center justify-between"
          style={{ 
            '--background': '#ffffff',
            '--border-color': PetVaxColors.surfaceContainer,
            borderBottom: `1px solid ${PetVaxColors.surfaceContainer}`
          } as React.CSSProperties}
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xl font-bold tracking-tight" style={{ color: PetVaxColors.primary }}>
              Pet<span style={{ color: PetVaxColors.tertiary }}>Vax</span>
            </span>
            {petAvatar && <div className="cursor-pointer">{petAvatar}</div>}
          </div>
        </IonToolbar>
      </IonHeader>

      {/* CONTENIDO PRINCIPAL SCROLLABLE (Nativo de Ionic) */}
      <IonContent 
        scrollEvents={true}
        style={{ '--background': PetVaxColors.surface } as React.CSSProperties}
      >
        <div className="px-5 py-6 space-y-4 pb-24 max-w-md mx-auto">
          {children}
        </div>
      </IonContent>

      {/* MENÚ INFERIOR (Footer de Ionic unificado) */}
      <IonFooter className="ion-no-border fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50">
        <div 
          className="h-16 bg-white border-t flex items-center justify-around px-2"
          style={{ 
            borderColor: PetVaxColors.surfaceContainer,
            boxShadow: '0 -4px 16px rgba(20, 27, 43, 0.03)'
          }}
        >
          <button 
            onClick={() => history.push('/dashboard')}
            className="flex flex-col items-center justify-center w-16 h-full gap-0.5 transition-transform active:scale-95"
            style={{ color: currentPath === '/dashboard' ? PetVaxColors.primary : PetVaxColors.outline }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-[10px] font-medium">Inicio</span>
          </button>

          <button 
            onClick={() => history.push('/records')}
            className="flex flex-col items-center justify-center w-16 h-full gap-0.5 transition-transform active:scale-95"
            style={{ color: currentPath === '/records' ? PetVaxColors.primary : PetVaxColors.outline }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <span className="text-[10px] font-medium">Historial</span>
          </button>
        </div>
      </IonFooter>
    </>
  );
};