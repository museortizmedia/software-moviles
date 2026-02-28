import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonCard,
    IonCardContent
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const Login: React.FC = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            setError('Por favor completa todos los campos');
            return;
        }

        // Simulación de login
        if (email === 'user@mail.com' && password === '123') {
            localStorage.setItem('isLogged', 'true');
            setError('');
            history.replace('/home');
        } else {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding" fullscreen>
                <IonCard style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
                    <IonCardContent>
                        <IonItem>
                            <IonLabel position="floating">Correo</IonLabel>
                            <IonInput
                                type="email"
                                value={email}
                                onIonInput={(e: any) => setEmail(e.target.value)}
                            />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Contraseña</IonLabel>
                            <IonInput
                                type="password"
                                value={password}
                                onIonInput={(e: any) => setPassword(e.target.value)}
                            />
                        </IonItem>

                        {error && (
                            <IonText color="danger">
                                <p>{error}</p>
                            </IonText>
                        )}

                        <IonButton expand="block" className="ion-margin-top" onClick={handleLogin}>
                            Iniciar sesión
                        </IonButton>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Login;