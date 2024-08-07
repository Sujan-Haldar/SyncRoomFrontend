export const API = {
  currentEnv: process.env.NEXT_PUBLIC_NEXT_APP_SERVER,
  baseURL: {
    dev: process.env.NEXT_PUBLIC_NEXT_APP_API_URL_DEV,
    prod: process.env.NEXT_PUBLIC_NEXT_APP_API_URL_PROD,
  },
  socketURL: {
    dev: process.env.NEXT_PUBLIC_NEXT_APP_SOCKET_URL_DEV,
    prod: process.env.NEXT_PUBLIC_NEXT_APP_SOCKET_URL_PROD,
  },
  noAuthUrls: {},
  auth_urls: {
    accessToken: "/api/v1/access-token",
    isAuthenticated: "/api/v1/is-login",
    getServerByProfileId: "/api/v1/servers/member",
    getMultipleServerByUserId: "/api/v1/servers/user",
    getServerByUserIdandServerId: "/api/v1/servers/server-and-userid",
    server: "/api/v1/servers",
    serverInvite: "/api/v1/servers/invite",
    member: "/api/v1/member",
    channel: "/api/v1/channel",
    leaveServer: "/api/v1/servers/leave",
    conversation: "/api/v1/conversation",
    message: "/api/v1/message",
    directMessage: "/api/v1/direct-message",
  },
};
