import { ChannelInterface, ChannelType } from "@/services/interface";
import { create } from "zustand";

export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "manageMember"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel";

interface ModalData {
  // server?: ServerInterface | ServerInterfaceForServerSidebar;
  channel?: ChannelInterface;
  channelType?: ChannelType;
}
interface ModelStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModalStore = create<ModelStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type: type, data }),
  onClose: () => set({ isOpen: false, type: null, data: {} }),
}));
