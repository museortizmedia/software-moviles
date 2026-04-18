import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Home from './pages/Home';
import Results from './pages/Results';
import Login from './pages/Login';

import { AppProvider } from './contexts/AppContext';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AppProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login" component={Login} exact />
          <Route path="/" component={Home} exact />
          <Route path="/results" component={Results} />
        </IonRouterOutlet>
      </IonReactRouter>
    </AppProvider>
  </IonApp>
);

export default App;