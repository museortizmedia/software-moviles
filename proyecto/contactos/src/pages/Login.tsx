import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/react';

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const { login, register } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      await register(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e: any) => setEmail(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e: any) => setPassword(e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="block" onClick={handleLogin}>
          Login
        </IonButton>

        <IonButton expand="block" fill="outline" onClick={handleRegister}>
          Crear cuenta
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;