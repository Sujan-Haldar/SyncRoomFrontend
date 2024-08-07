"use client";
import { SOCKETURL } from "@/constant";
import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO, Socket } from "socket.io-client";

interface SocketContextInterface {
  socket?: Socket;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextInterface>({
  isConnected: false,
});

export const useSocket = (): SocketContextInterface => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  useEffect(() => {
    const socketInstance: Socket = new (ClientIO as any)(SOCKETURL);
    socketInstance.on("connect", () => {
      setIsConnected(true);
    });
    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });
    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
