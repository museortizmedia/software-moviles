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

interface UpdateProfileDto {
  full_name?: string;
  display_name?: string;
  phone?: string | null;
  profile_pic?: string | null;
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

  updateProfile: (
    data: UpdateProfileDto
  ) => Promise<void>;

  uploadProfileImage: (
    file: File,
  ) => Promise<string>;
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
    await supabaseService.logout();

    setUser(null);
    setSession(null);

    console.log('logout completo');
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

  const updateProfile = async (
    data: UpdateProfileDto
  ) => {
    if (!user) {
      throw new Error(
        'Usuario no autenticado'
      );
    }

    const { error } =
      await supabaseService.updateProfile(
        user.id,
        data as any
      );

    if (error) {
      throw error;
    }

    await refreshProfile();
  };

  const uploadProfileImage = async (
    file: File,
  ) => {
    if (!user) {
      throw new Error(
        'Usuario no autenticado'
      );
    }

    const imageUrl =
      await supabaseService.uploadProfileImage(
        user.id,
        file,
        'profiles'
      );

    await updateProfile({
      profile_pic: imageUrl,
    });

    return imageUrl;
  };

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
          async (
            _event,
            session
          ) => {
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
      updateProfile,
      uploadProfileImage,

      isAuthenticated: !!user,
    }),
    [
      user,
      session,
      loading,
    ]
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