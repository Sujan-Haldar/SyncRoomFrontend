const SOCKET = {
  currentEnv: process.env.NEXT_PUBLIC_NEXT_APP_SERVER,
  socketURL: {
    dev: process.env.NEXT_PUBLIC_NEXT_APP_SOCKET_URL_DEV,
    prod: process.env.NEXT_PUBLIC_NEXT_APP_SOCKET_URL_PROD,
  },
};

export const SOCKETURL =
  SOCKET.socketURL[SOCKET.currentEnv as keyof typeof SOCKET.socketURL];
