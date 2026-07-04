import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  role: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setRole: (role: string | null) => void;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
  
  initialize: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      const user = session?.user ?? null;
      set({ user });
      
      if (user) {
        // Fetch role from public.users table
        const { data } = await supabase.from('users').select('role').eq('id', user.id).single();
        set({ role: data?.role || 'customer' });
      } else {
        set({ role: null });
      }
    } catch (e) {
      console.error("Auth init error:", e);
    } finally {
      set({ isLoading: false });
    }

    // Set up real-time listener
    supabase.auth.onAuthStateChange(async (event, session) => {
      const user = session?.user ?? null;
      set({ user });
      
      if (user) {
        const { data } = await supabase.from('users').select('role').eq('id', user.id).single();
        set({ role: data?.role || 'customer' });
      } else {
        set({ role: null });
      }
    });
  },
  
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, role: null });
  }
}));
