import { create } from "zustand";

interface AuthStore {
  accessToken?: string;
  isAuthenticated: boolean;
  id?: string;
  setAccessToken: (accessToken: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUserId: (id: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  setAccessToken: (accessToken: string) => set({ accessToken }),
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setUserId: (id: string) => set({ id }),
}));
