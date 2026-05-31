import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';

export type TableFilter = Record<string, unknown>;

export interface QueryOptions {
  select?: string;
  filters?: TableFilter;
  orderBy?: {
    column: string;
    ascending?: boolean;
  };
  range?: [number, number];
  limit?: number;
}

const buildQuery = <T = unknown>(
  table: string,
  options: QueryOptions
) => {
  const select = options.select ?? '*';

  let query = supabase.from(table).select(select);

  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        query = query.in(key, value as never[]);
      } else if (value === null) {
        query = query.is(key, null);
      } else {
        query = query.eq(key, value as never);
      }
    });
  }

  if (options.orderBy) {
    query = query.order(options.orderBy.column, {
      ascending: options.orderBy.ascending ?? true,
    });
  }

  if (options.range) {
    query = query.range(options.range[0], options.range[1]);
  } else if (options.limit) {
    query = query.limit(options.limit);
  }

  return query;
};

export interface CreateProfileDto {
  id: string;
  email: string;
  display_name: string;
  full_name: string;
}

export const supabaseService = {
  // ==========================
  // AUTH
  // ==========================

  getSession: () => supabase.auth.getSession(),

  onAuthStateChange: (
    callback: (
      event: AuthChangeEvent,
      session: Session | null
    ) => void
  ) => supabase.auth.onAuthStateChange(callback),

  login: (email: string, password: string) =>
    supabase.auth.signInWithPassword({
      email,
      password,
    }),

  register: (
    name: string,
    email: string,
    password: string
  ) =>
    supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          full_name: name,
        },
      },
    }),

  logout: () => supabase.auth.signOut(),

  signInWithGoogle: () =>
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    }),

  // ==========================
  // CRUD
  // ==========================
  create: <T>(table: string, data: T) =>
    supabase.from(table).insert(data as any),

  update: <T>(
    table: string,
    id: string,
    data: Partial<T>
  ) =>
    supabase.from(table).update(data as any).eq('id', id),

  remove: (table: string, id: string) =>
    supabase.from(table).delete().eq('id', id),

  // ==========================
  // PROFILES
  // ==========================

  createProfile: (data: CreateProfileDto) =>
    supabase.from('profiles').insert({
      id: data.id,
      email: data.email,
      display_name: data.display_name,
      full_name: data.full_name,
      profile_pic: null,
      phone: null,
      plan: 'free',
    }),

  getProfileById: (userId: string) =>
    supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single(),

  updateProfile: (
    userId: string,
    data: Record<string, unknown>
  ) =>
    supabase
      .from('profiles')
      .update(data)
      .eq('id', userId),

  // ==========================
  // GENERIC QUERIES
  // ==========================

  queryTable: <T = unknown>(
    table: string,
    options: QueryOptions = {}
  ) => buildQuery<T>(table, options),

  searchTable: <T = unknown>(
    table: string,
    options: QueryOptions = {}
  ) => buildQuery<T>(table, options),

  // ==========================
  // STORAGE
  // ==========================
  uploadProfileImage: async (userId: string, file: File, storageBucket: string) => {
    const extension = file.name.split('.').pop();
    const fileName = `${userId}/pets/${crypto.randomUUID()}.${extension}`;

    const { error } = await supabase.storage
      .from(storageBucket)
      .upload(fileName, file, {
        upsert: true,
        cacheControl: '3600',
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from(storageBucket)
      .getPublicUrl(fileName);

    return data.publicUrl;
  },

  updatePetReminderSettings: async (
    petId: string,
    data: {
      vaccination_enabled?: boolean;
      deworming_enabled?: boolean;
      bath_enabled?: boolean;
    }
  ) => {
    const { data: updated, error } = await supabase
      .from('pets')
      .update(data)
      .eq('id', petId)
      .select()
      .single();

    if (error) throw error;

    return updated;
  },

};