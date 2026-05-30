import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';

import { Session } from '@supabase/supabase-js';
import { supabaseService } from '../services/supabase';

export interface Profile {
  id: string;

  email: string;

  display_name: string;

  full_name: string;

  profile_pic: string | null;

  phone: string | null;

  plan: 'free' | 'premium';

  created_at: string;

  updated_at: string;
}

interface AuthContextType {
  user: Profile | null;

  session: Session | null;

  loading: boolean;

  isAuthenticated: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => Promise<void>;

  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({
  children,
}: Props) => {
  const [user, setUser] =
    useState<Profile | null>(null);

  const [session, setSession] =
    useState<Session | null>(null);

  const [loading, setLoading] =
    useState(true);

  const loadProfile = useCallback(
    async (userId: string) => {
      const { data, error } =
        await supabaseService.getProfileById(
          userId
        );

      if (error) {
        throw error;
      }

      setUser(data as Profile);
      console.log('Perfil cargado:', data);
    },
    []
  );

  const login = async (
    email: string,
    password: string
  ) => {
    const { data, error } =
      await supabaseService.login(
        email,
        password
      );

    if (error) {
      throw error;
    }

    if (!data.user) {
      throw new Error(
        'No se pudo obtener el usuario.'
      );
    }

    await loadProfile(data.user.id);
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    const { data, error } =
      await supabaseService.register(
        name,
        email,
        password
      );

    if (error) {
      throw error;
    }

    if (!data.user) {
      throw new Error(
        'No se pudo crear el usuario.'
      );
    }

    const { error: profileError } =
      await supabaseService.createProfile({
        id: data.user.id,
        email: data.user.email ?? email,
        display_name: name,
        full_name: name,
      });

    if (profileError) {
      throw profileError;
    }

    await loadProfile(data.user.id);
  };

  const logout = async () => {
    const { error } =
      await supabaseService.logout();

    if (error) {
      throw error;
    }

    setUser(null);
    setSession(null);
  };

  const refreshProfile =
    useCallback(async () => {
      const {
        data: { session },
      } = await supabaseService.getSession();

      const userId = session?.user.id;

      if (!userId) return;

      await loadProfile(userId);
    }, [loadProfile]);

  useEffect(() => {
    let subscription:
      | { unsubscribe: () => void }
      | undefined;

    const initialize = async () => {
      try {
        const {
          data: { session },
        } = await supabaseService.getSession();

        setSession(session);

        if (session?.user) {
          await loadProfile(
            session.user.id
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

      const listener =
        supabaseService.onAuthStateChange(
          async (_event: any, session: any) => {
            setSession(session);

            if (session?.user) {
              try {
                await loadProfile(
                  session.user.id
                );
              } catch (error) {
                console.error(error);
              }
            } else {
              setUser(null);
            }
          }
        );

      subscription =
        listener.data.subscription;
    };

    initialize();

    return () => {
      subscription?.unsubscribe();
    };
  }, [loadProfile]);

  const value = useMemo(
    () => ({
      user,
      session,
      loading,

      login,
      register,
      logout,

      refreshProfile,

      isAuthenticated: !!user,
    }),
    [user, session, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    );
  }

  return context;
};