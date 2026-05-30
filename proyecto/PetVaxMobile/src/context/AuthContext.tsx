// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabaseService } from '../services/supabase';

// Interface limpia y estricta conectada con tu base de datos
interface User {
  id: string;        // ID único del auth.users de Supabase
  name: string;
  displayName: string;
  email: string;
  photoURL?: string;  // Imagen del avatar del Header
  plan: 'free' | 'premium';
  isGuest?: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;   // Controla el estado mientras Supabase recupera la sesión activa
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    //console.log('AuthProvider state', { user, loading, isAuthenticated: user !== null });
  }, [user, loading]);

  // Sincroniza la tabla 'profiles' de Supabase con el estado de React
  const fetchAndSyncProfile = async (supabaseUser: any) => {
    try {
      const { data: profile, error } = await supabaseService.getProfile(supabaseUser.id);

      const safeName = profile?.full_name || profile?.display_name || supabaseUser.email || 'Usuario PetVax';
      const safeDisplayName = profile?.display_name || safeName;

      setUser({
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: safeName,
        displayName: safeDisplayName,
        photoURL: profile?.profile_pic ?? undefined,
        plan: profile?.plan || 'free'
      });

      if (error && !profile) {
        console.error('Supabase profile fetch error:', error);
      }
    } catch (err) {
      console.error('Error al sincronizar perfil extendido:', err);
      setUser({
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: supabaseUser.email || 'Usuario PetVax',
        displayName: supabaseUser.email || 'Usuario PetVax',
        plan: 'free'
      });
    } finally {
      setLoading(false);
    }
  };

  // Listener global: Atiende los ciclos de vida de autenticación de Supabase
  useEffect(() => {
    const initializeAuth = async () => {
      //console.log('AuthProvider: inicializando conexión Supabase');
      try {
        const { data, error } = await supabaseService.getSession();
        //console.log('AuthProvider: getSession response', { session: data?.session, error });

        if (error) {
          console.error('Error obteniendo sesión de Supabase:', error);
          setUser(null);
          return;
        }

        if (data.session?.user) {
          await fetchAndSyncProfile(data.session.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Error inicializando sesión de Supabase:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const authStateChange = supabaseService.onAuthStateChange(async (event, session) => {
      try {
        if (session?.user) {
          await fetchAndSyncProfile(session.user);
        } else {
          setUser(null);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error en callback onAuthStateChange:', err);
        setUser(null);
        setLoading(false);
      }
    });

    const subscription = authStateChange?.data?.subscription;
    return () => {
      if (subscription?.unsubscribe) {
        subscription.unsubscribe();
      }
    };
  }, []);

  // LOGIN: Tradicional por Correo y Contraseña
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      //console.log('AuthProvider: signInWithPassword', { email });
      const { data, error } = await supabaseService.signIn(email, password);
      //console.log('AuthProvider: signInWithPassword response', { data, error });

      if (error) {
        throw error;
      }

      if (data.session?.user) {
        const supabaseUser = data.session.user;
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          name: supabaseUser.email || 'Usuario PetVax',
          displayName: supabaseUser.email || 'Usuario PetVax',
          plan: 'free',
        });
        await fetchAndSyncProfile(supabaseUser);
      } else {
        console.warn('AuthProvider: signInWithPassword no devolvió sesión ni error');
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // REGISTRO: Crea la cuenta e inyecta la metadata que el Trigger SQL usará para el perfil
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabaseService.signUp(name, email, password);

      if (error) {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE AUTH: OAuth Directo sin pasos intermedios
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const { error } = await supabaseService.signInWithGoogle();
      if (error) {
        throw error;
      }
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // LOGOUT: Limpieza de cookies de sesión en Supabase
  const logout = async () => {
    setUser(null);
    await supabaseService.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: user !== null,
        user,
        loading,
        login,
        register,
        loginWithGoogle,
        logout,
      }}
    >
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-[#f9f9ff] text-[#374151]">
          <span className="text-sm font-medium">Cargando sesión...</span>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
};