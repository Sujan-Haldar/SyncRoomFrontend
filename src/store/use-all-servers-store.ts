import { ServerInterface } from "@/services/interface";
import { create } from "zustand";

interface AllServerrStore {
  servers: Array<ServerInterface>;
  setServers: (servers: Array<ServerInterface>) => void;
  addServer: (server: ServerInterface) => void;
  updateServer: (server: ServerInterface) => void;
}

export const useAllServersStore = create<AllServerrStore>((set) => ({
  servers: [],
  setServers: (servers: Array<ServerInterface>) => set({ servers }),
  addServer: (server: ServerInterface) =>
    set((state) => ({
      servers: [...state.servers, server],
    })),
  updateServer: (server: ServerInterface) =>
    set((state) => ({
      servers: updateServerByIndex(server, state.servers),
    })),
}));

const updateServerByIndex = (
  server: ServerInterface,
  servers: Array<ServerInterface>
): Array<ServerInterface> => {
  const index = servers.findIndex((temp) => temp.id === server.id);
  if (index < servers.length) servers[index] = server;
  return servers;
};
