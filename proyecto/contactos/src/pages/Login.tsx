import {
    IonPage,
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList
} from '@ionic/react';

import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
    const { login, register } = useAuth();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                console.log("Campos vacíos");
                return;
            }

            await login(email, password);

            console.log("Login correcto");
            history.replace('/home');

        } catch (error: any) {
            console.error("Error login:", error.message);
        }
    };

    const handleRegister = async () => {
        try {
            if (!email || !password) {
                console.log("Campos vacíos");
                return;
            }

            await register(email, password);

            console.log("Usuario creado");
            history.replace('/home');

        } catch (error: any) {
            console.error("Error registro:", error.message);
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

                <IonList>
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
                </IonList>

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