import { ServerInterfaceForServerSidebar } from "@/services/interface";
import { create } from "zustand";

interface ServerStore {
  server?: ServerInterfaceForServerSidebar;
  setServer: (server: ServerInterfaceForServerSidebar) => void;
  updateInviteCode: (inviteCode: string) => void;
}

export const useServerStore = create<ServerStore>((set) => ({
  setServer: (server: ServerInterfaceForServerSidebar) => set({ server }),
  updateInviteCode: (inviteCode: string) =>
    set((state) => ({
      server: state.server ? { ...state.server, inviteCode } : undefined,
    })),
}));
