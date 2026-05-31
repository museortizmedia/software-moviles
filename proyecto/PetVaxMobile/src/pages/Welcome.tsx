import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonContent,
  IonIcon,
} from '@ionic/react';
import { arrowForward, paw, shieldCheckmark } from 'ionicons/icons';
import { Input } from '../components/Input';
import { useAuth } from '../context/AuthContext';
import { supabaseService } from '../services/supabase';
import GoogleImage from '../assets/GoogleLogo.webp';
import BgPattern from '../assets/bg-pattern.png';
import { initPush } from '../services/push';
import { supabase } from '../supabaseClient';

const Welcome: React.FC = () => {
  const history = useHistory();
  const { login, user } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'confirm-email'>('login');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    if (user) {
      history.replace('/dashboard');
    }
  }, [user, history]);

    const registerDeviceAfterLogin = async () => {
    const { data } = await supabase.auth.getSession();
    const sessionUser = data.session?.user;

    if (sessionUser?.id) {
      await initPush(sessionUser.id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!email.trim() || !password.trim() || (mode === 'register' && !name.trim())) {
      setError('Por favor completa todos los campos.');
      setLoading(false);
      return;
    }

    if (mode === 'register' && password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'login') {
        await login(email.trim(), password.trim());
        await registerDeviceAfterLogin();
        history.replace('/dashboard');
      } else {
        const { error } = await supabaseService.register(name.trim(), email.trim(), password.trim());
        if (error) {
          throw error;
        }
        setMode('confirm-email');
        setMessage(`Hemos enviado un correo a ${email.trim()}. Confirma tu cuenta antes de iniciar sesión.`);
        setName('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err: any) {
      const fallbackMessage =
        err?.message ||
          err?.error_description ||
          err?.status === 400
          ? 'Credenciales inválidas o no se pudo crear la cuenta. Revisa los datos e intenta de nuevo.'
          : 'Ocurrió un error en la autenticación.';

      setError(fallbackMessage);
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const { error } = await supabaseService.signInWithGoogle();
      if (error) {
        throw error;
      }
    } catch (err: any) {
      setError(err?.message || 'No se pudo iniciar sesión con Google.');
      console.error('Google auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage style={{ display: 'flex', width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* 1. INYECCIÓN CSS CRÍTICA DE ALTA PRIORIDAD */}
      <style>{`
        ion-content {
          --background: transparent !important; /* Permitir que el fondo nativo sea transparente */
          background: transparent !important;
          height: 100vh !important;
          display: flex !important;
        }
        .inner-scroll {
          height: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          background: transparent !important;
        }
      `}</style>

      {/* 2. IMAGEN DE FONDO ABSOLUTA REAL (Se traslada detrás de todo el viewport) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0, /* Enviado al fondo absoluto */
          pointerEvents: 'none'
        }}
      >
        <img
          alt="Background pattern"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          src={BgPattern}
        />
        {/* Capa de tinte sutil opcional para controlar contraste si la imagen es muy brillante */}
        <div className="absolute inset-0 bg-[#f9f9ff]/70" />
      </div>

      {/* 3. CONTENEDOR DE CONTENIDO DE IONIC */}
      <IonContent scrollY={true}>

        {/* 4. CONTENEDOR INTERNO */}
        <div
          className="w-full max-w-md mx-auto flex flex-col justify-between px-6 py-8"
          style={{
            position: 'relative',
            zIndex: 10,
            minHeight: '100vh',
            boxSizing: 'border-box'
          }}
        >

          {/* Bloque Superior (Header + Tarjeta) */}
          <div className="flex-grow flex flex-col justify-center">

            {/* Header */}
            <header className="flex flex-col items-center justify-center mb-6">
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4 shadow-md backdrop-blur-xs"
                style={{ backgroundColor: 'rgba(0, 131, 120, 0.12)', color: '#00685f' }}
              >
                <IonIcon icon={paw} style={{ fontSize: '40px' }} />
              </div>
              <h1 className="text-3xl font-bold text-[#141b2b] tracking-tight text-center">PetVax</h1>
              <p className="text-sm text-[#3d4947] text-center mt-2 px-2 max-w-xs">
                Your pet's health records, vaccine schedules, and wellness journey in one place.
              </p>
            </header>

            {/* Tarjeta con Transparencia Estilizada (bg-white/80 + blur) */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md border border-white/40 w-full" style={{ boxSizing: 'border-box' }}>
              <div className="mb-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#141b2b]">
                    {mode === 'login'
                      ? 'Iniciar sesión'
                      : mode === 'register'
                        ? 'Crear cuenta'
                        : 'Confirma tu correo'}
                  </h2>
                </div>
                <p className="text-sm text-[#3d4947]">
                  {mode === 'login'
                    ? 'Usa tu correo y contraseña para ingresar a tu panel.'
                    : mode === 'register'
                      ? 'Regístrate para comenzar a administrar los datos de tus mascotas.'
                      : 'Revisa tu bandeja de entrada y confirma el correo antes de iniciar sesión.'}
                </p>
              </div>

              {mode === 'confirm-email' ? (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-emerald-50/90 border border-emerald-100 p-6 text-center">
                    <p className="text-sm font-semibold text-[#065f46]">Confirma tu correo</p>
                    <p className="text-sm text-[#134e4a] mt-2">{message}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setMessage('');
                      setPassword('');
                      setConfirmPassword('');
                    }}
                    className="w-full h-12 bg-white/60 backdrop-blur-xs border border-gray-200 text-[#141b2b] font-semibold text-sm rounded-lg hover:bg-white/90 transition"
                  >
                    Volver a iniciar sesión
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'register' && (
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#3d4947] px-1 block">Nombre</label>
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                        required={mode === 'register'}
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#3d4947] px-1 block">Correo electrónico</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hola@petowner.com"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#3d4947] px-1 block">Contraseña</label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  {mode === 'register' && (
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#3d4947] px-1 block">Confirmar contraseña</label>
                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repite tu contraseña"
                        required
                      />
                    </div>
                  )}

                  {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-[#00685f]/90 text-white font-semibold text-sm rounded-lg shadow-sm hover:bg-[#00685f] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {mode === 'login' ? 'Acceder' : 'Registrarme'}
                    <IonIcon icon={arrowForward} style={{ fontSize: '18px' }} />
                  </button>
                </form>
              )}

              <div className="mt-4 flex flex-col gap-4">

                {/* DIVISOR VISUAL CON TEXTO EN EL MEDIO */}
                <div className="relative flex py-2 items-center justify-center">
                  {/* La línea gris de fondo */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  {/* El texto contenedor con el mismo fondo esmerilado de tu tarjeta */}
                  <span className="relative flex-shrink-0 px-3 text-xs font-semibold text-[#3d4947] bg-white/10 backdrop-blur-md rounded-full">
                    o conéctate con
                  </span>
                </div>

                {/* BOTÓN CON CONEXIÓN REAL A GOOGLE AUTH DESDE TU SERVICIO */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full h-12 border border-gray-200 bg-white/70 hover:bg-white text-[#141b2b] font-semibold text-sm rounded-lg flex items-center justify-center gap-3 transition-colors active:scale-[0.98]"
                >
                  <img
                    src={GoogleImage}
                    alt="Google Logo"
                    className="w-5 h-5 object-contain"
                  />
                  Continuar con Google
                </button>
              </div>
            </div>

            {/* Alternar Modos */}
            <div className="text-center pt-6">
              <p className="text-sm text-[#3d4947]">
                {mode === 'login' ? '¿Aún no tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
                <button
                  type="button"
                  className="text-[#00685f] font-bold hover:underline"
                  onClick={() => {
                    setMode(mode === 'login' ? 'register' : 'login');
                    setError('');
                    setMessage('');
                  }}
                >
                  {mode === 'login' ? 'Crea una ahora' : 'Inicia sesión'}
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-auto pt-4 flex flex-col items-center gap-2">
            <p className="text-xs text-[#3d4947]/70 text-center">
              By continuing, you agree to PetVax's <a className="underline" href="#terms">Terms of Service</a> and <a className="underline" href="#privacy">Privacy Policy</a>.
            </p>
          </footer>

        </div>

        {/* Pro Tip flotante de escritorio */}
        <div className="hidden md:flex fixed right-10 bottom-10 w-64 p-4 bg-white/90 backdrop-blur-md shadow-xl rounded-xl border border-white/20 items-center gap-3 z-50">
          <div className="w-10 h-10 rounded-full bg-[#d8e5e2] flex items-center justify-center flex-shrink-0">
            <IonIcon icon={shieldCheckmark} className="text-[#00685f] text-xl" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#141b2b]">Pro Tip</p>
            <p className="text-xs text-[#3d4947]">Keep your vaccination history at your fingertips.</p>
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Welcome;