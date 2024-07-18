import {
  ServerInterface,
  ServerInterfaceForServerSidebar,
} from "@/service/interface";
import { create } from "zustand";

export type ModalType = "createServer" | "invite";

interface ModalData {
  server?: ServerInterface | ServerInterfaceForServerSidebar;
}
interface ModelStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModelStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type: type, data }),
  onClose: () => set({ isOpen: false, type: null, data: {} }),
}));
