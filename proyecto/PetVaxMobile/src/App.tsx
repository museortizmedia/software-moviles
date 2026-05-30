// src/App.tsx
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import Welcome from './pages/Welcome';
import { AppOverlay } from './components/AppOverlay';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Rutas Públicas */}
          <Route exact path="/login" component={Welcome} />

          {/* Redirección por defecto */}
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>

          {/* Rutas Privadas con layout compartido */}
          <ProtectedRoute
            path={["/dashboard", "/pets", "/reminders", "/profile"]}
            component={AppOverlay}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </AuthProvider>
  </IonApp>
);

export default App;