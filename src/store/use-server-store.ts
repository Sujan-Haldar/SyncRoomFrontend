import {
  ChannelInterface,
  MemberInterface,
  MemberRole,
  ServerInterfaceForServerSidebar,
} from "@/services/interface";
import { create } from "zustand";

interface ServerStore {
  id?: string;
  name?: string;
  imageUrl?: string;
  inviteCode?: string;
  user?: { id: string };
  members?: Array<MemberInterface>;
  channels?: Array<ChannelInterface>;
  // -------------------------------------
  // server?: ServerInterfaceForServerSidebar;
  setServer: (server: ServerInterfaceForServerSidebar) => void;
  setName: (name: string) => void;
  setImageUrl: (imageUrl: string) => void;
  setInviteCode: (inviteCode: string) => void;
  setUser: (user: { id: string }) => void;
  setMembers: (members: Array<MemberInterface>) => void;
  addMember: (members: MemberInterface) => void;
  updateMember: (members: MemberInterface) => void;
  deleteMember: (id: string) => void;
  setChannels: (channels: Array<ChannelInterface>) => void;
  addChannel: (channel: ChannelInterface) => void;
  deleteChannel: (id: string) => void;
  removeServerInfo: () => void;
}

export const useServerStore = create<ServerStore>((set) => ({
  setServer: (server: ServerInterfaceForServerSidebar) => set({ ...server }),
  setName: (name: string) => set({ name }),
  setImageUrl: (imageUrl: string) => set({ imageUrl }),
  setInviteCode: (inviteCode: string) => set({ inviteCode }),
  setUser: (user: { id: string }) => set({ user }),
  setMembers: (members: Array<MemberInterface>) =>
    set({ members: sortMembers(members) }),
  addMember: (member: MemberInterface) =>
    set((state) => ({
      members: state.members
        ? sortMembers([...state.members, member])
        : undefined,
    })),
  updateMember: (member: MemberInterface) =>
    set((state) => ({
      members: state.members
        ? sortMembers([
            ...state.members.filter((temp) => temp.id != member.id),
            member,
          ])
        : undefined,
    })),
  deleteMember: (id: string) =>
    set((state) => ({
      members: state.members
        ? state.members.filter((member) => member.id != id)
        : undefined,
    })),
  setChannels: (channels: Array<ChannelInterface>) => set({ channels }),
  addChannel: (channel: ChannelInterface) =>
    set((state) => ({
      channels: state.channels ? [...state.channels, channel] : undefined,
    })),
  deleteChannel: (id: string) =>
    set((state) => ({
      channels: state.channels
        ? state.channels.filter((member) => member.id != id)
        : undefined,
    })),

  removeServerInfo: () =>
    set({
      id: undefined,
      name: undefined,
      imageUrl: undefined,
      inviteCode: undefined,
      user: undefined,
      members: undefined,
      channels: undefined,
    }),
}));

const sortMembers = (
  members: Array<MemberInterface>
): Array<MemberInterface> => {
  members.sort((first, second) => {
    let fistRole, secondRole;
    fistRole = first.role;
    secondRole = second.role;
    if (first.role == MemberRole.MODERATOR) fistRole = "C";
    if (second.role == MemberRole.MODERATOR) fistRole = "C";
    return fistRole.charCodeAt(0) - secondRole.charCodeAt(0);
  });
  return members;
};
