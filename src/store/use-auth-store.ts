import { UserInterface } from "@/services/interface";
import { create } from "zustand";

interface AuthStore {
  accessToken?: string;
  isAuthenticated: boolean;
  id?: string;
  user?: UserInterface;
  setAccessToken: (accessToken: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUserId: (id: string) => void;
  setUser: (user: UserInterface) => void;
  removeAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  setAccessToken: (accessToken: string) => set({ accessToken }),
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setUserId: (id: string) => set({ id }),
  setUser: (user: UserInterface) => set({ user }),
  removeAuth: () =>
    set({
      accessToken: undefined,
      isAuthenticated: false,
      id: undefined,
      user: undefined,
    }),
}));
