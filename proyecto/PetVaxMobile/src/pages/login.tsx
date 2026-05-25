// src/pages/Login.tsx
import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { PetVaxColors } from '../colors';

export const Login: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login();
      history.push('/dashboard');
    }
  };

  return (
    <IonPage>
      <IonContent style={{ '--background': PetVaxColors.surface } as React.CSSProperties}>
        <div className="bg-red-100 min-h-screen flex flex-col justify-center items-center px-6 max-w-md mx-auto"> 
          <div className="w-full bg-white p-8 rounded-3xl border space-y-6 shadow-sm" style={{ borderColor: PetVaxColors.surfaceContainer }}>
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight" style={{ color: PetVaxColors.primary }}>
                Pet<span style={{ color: PetVaxColors.tertiary }}>Vax</span>
              </h1>
              <p className="text-sm" style={{ color: PetVaxColors.onSurfaceVariant }}>
                Ingresa al portal de gestión clínica
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <Input 
                label="Correo Electrónico" 
                type="email" 
                placeholder="ejemplo@veterinaria.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input 
                label="Contraseña" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="submit"
                className="w-full h-12 rounded-lg font-semibold text-white active:opacity-90 mt-2"
                style={{ backgroundColor: PetVaxColors.primary }}
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};