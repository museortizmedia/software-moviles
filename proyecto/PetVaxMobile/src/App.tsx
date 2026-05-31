import React from 'react';
import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { AuthProvider } from './context/AuthContext';
import { PetsProvider } from './context/PetsContext';
import { AppRoutes } from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';

setupIonicReact();

export default function App() {
  return (
    <IonApp>
      <AuthProvider>
        <PetsProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </PetsProvider>
      </AuthProvider>
    </IonApp>
  );
}