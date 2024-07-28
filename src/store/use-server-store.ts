import {
  ChannelInterface,
  MemberInterface,
  MemberRole,
  ServerInterfaceForServerSidebar,
} from "@/services/interface";
import { create } from "zustand";

interface ServerStore {
  server?: ServerInterfaceForServerSidebar;
  setServer: (server?: ServerInterfaceForServerSidebar) => void;
  updateInviteCode: (inviteCode: string) => void;
  updateName: (name: string) => void;
  updateImageUrl: (imageUrl: string) => void;
  updateMembers: (members: Array<MemberInterface>) => void;
  addChannel: (channel: ChannelInterface) => void;
}

export const useServerStore = create<ServerStore>((set) => ({
  setServer: (server?: ServerInterfaceForServerSidebar) => set({ server }),
  updateInviteCode: (inviteCode: string) =>
    set((state) => ({
      server: state.server ? { ...state.server, inviteCode } : undefined,
    })),
  updateName: (name: string) =>
    set((state) => ({
      server: state.server ? { ...state.server, name } : undefined,
    })),
  updateImageUrl: (imageUrl: string) =>
    set((state) => ({
      server: state.server ? { ...state.server, imageUrl } : undefined,
    })),
  updateMembers: (members: Array<MemberInterface>) =>
    set((state) => ({
      server: state.server ? sortMembers(members, state.server) : undefined,
    })),
  addChannel: (channel: ChannelInterface) =>
    set((state) => ({
      server: state.server
        ? { ...state.server, channels: [...state.server.channels, channel] }
        : undefined,
    })),
}));

const sortMembers = (
  members: Array<MemberInterface>,
  server: ServerInterfaceForServerSidebar
): ServerInterfaceForServerSidebar => {
  members.sort((first, second) => {
    let fistRole, secondRole;
    fistRole = first.role;
    secondRole = second.role;
    if (first.role == MemberRole.MODERATOR) fistRole = "C";
    if (second.role == MemberRole.MODERATOR) fistRole = "C";
    return fistRole.charCodeAt(0) - secondRole.charCodeAt(0);
  });
  return { ...server, members };
};
