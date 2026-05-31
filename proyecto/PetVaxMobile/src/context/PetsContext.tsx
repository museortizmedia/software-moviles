import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from './AuthContext';

export interface Pet {
  id: string;
  user_id: string;
  name: string;
  photo: string | null;
  type: 'gato' | 'perro' | 'otro';
  breed: string;
  birth_month: number | null;
  birth_year: number | null;
  weight: number | null;

  last_vaccination_date: string | null;
  last_deworming_date: string | null;
  last_bath_date: string | null;

  vaccination_enabled: boolean;
  deworming_enabled: boolean;
  bath_enabled: boolean;

  created_at: string;
  updated_at: string;
}

interface PetsContextType {
  pets: Pet[];
  loading: boolean;
  refreshPets: () => Promise<void>;
  updatePetReminder: (
    petId: string,
    field:
      | 'vaccination_enabled'
      | 'deworming_enabled'
      | 'bath_enabled',
    value: boolean
  ) => Promise<void>;
}

const PetsContext = createContext<PetsContextType | null>(null);

export const PetsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshPets = async () => {
    if (!user?.id) return;

    setLoading(true);

    const { data } = await supabase
      .from('pets')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setPets((data as Pet[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    refreshPets();
  }, [user?.id]);

const updatePetReminder = async (
  petId: string,
  field: 'vaccination_enabled' | 'deworming_enabled' | 'bath_enabled',
  value: boolean
) => {
  // 1. Optimistic update (UI inmediata)
  setPets(prev =>
    prev.map(p =>
      p.id === petId ? { ...p, [field]: value } : p
    )
  );

  // 2. Persistencia en Supabase
  const { error } = await supabase
    .from('pets')
    .update({ [field]: value })
    .eq('id', petId);

  if (error) {
    // rollback si falla
    refreshPets();
    throw error;
  }
};

  return (
    <PetsContext.Provider value={{ pets, loading, refreshPets, updatePetReminder }}>
      {children}
    </PetsContext.Provider>
  );
};

export const usePets = () => {
  const ctx = useContext(PetsContext);
  if (!ctx) throw new Error('usePets must be used inside PetsProvider');
  return ctx;
};