// src/App.tsx
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { Login } from './pages/login';
import { Dashboard } from './pages/Dashboard';

/* Core CSS requerido por Ionic para que funcionen las vistas nativas */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import './App.css'

setupIonicReact({
  mode: 'md' // Forzamos el modo Material Design para mantener la estética uniforme
});

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Rutas Públicas */}
          <Route exact path="/login" component={Login} />

          {/* Rutas Privadas / Protegidas con el AppOverlay dinámico */}
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          

          {/* Redirección por defecto */}
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </AuthProvider>
  </IonApp>
);

export default App;