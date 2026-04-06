import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import PageContactsCreator from './pages/PageContactsCreator';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>

        <PublicRoute exact path="/" component={Login} />

        <ProtectedRoute exact path="/home" component={Home} />

        <ProtectedRoute exact path="/form" component={PageContactsCreator} />

        <ProtectedRoute exact path="/form/:id" component={PageContactsCreator} />

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;