"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO, Socket } from "socket.io-client";

type SocketContext = {
  // socket: any | null;
  socket: Socket | null;
  isConnected: boolean;
};

const socketContext = createContext<SocketContext>({
  socket: null,
  isConnected: false
});

export const useSocket = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // TODO: set NEXT_PUBLIC_SITE_URL!

  useEffect(() => {
    // TODO: get rid of ts ignore if possible
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const socketInstance: Socket = new (ClientIO as unknown)(process.env.NEXT_PUBLIC_SITE_URL!, {
      path: "/api/socket/io",
      addTrailingSlash: false
    });

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
    <socketContext.Provider value={{ socket, isConnected }}>{children}</socketContext.Provider>
  );
};
