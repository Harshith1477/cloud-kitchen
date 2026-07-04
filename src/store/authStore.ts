import { create } from 'zustand';

interface User {
  email?: string;
  user_metadata?: { full_name?: string };
}

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
  isLoading: false,
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
  
  initialize: async () => {
    // No-op: no backend auth in prototype mode
    set({ isLoading: false });
  },
  
  signOut: async () => {
    set({ user: null, role: null });
  }
}));
