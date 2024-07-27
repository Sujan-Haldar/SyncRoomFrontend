export const API = {
  currentEnv: process.env.NEXT_PUBLIC_NEXT_APP_SERVER,
  baseURL: {
    dev: process.env.NEXT_PUBLIC_NEXT_APP_API_URL_DEV,
    prod: process.env.NEXT_PUBLIC_NEXT_APP_API_URL_PROD,
  },
  noAuthUrls: {},
  auth_urls: {
    accessToken: "/api/v1/access-token",
    isAuthenticated: "/api/v1/is-login",
    getServerByProfileId: "/api/v1/servers/member",
    getMultipleServerByUserId: "/api/v1/servers/user",
    getServerByUserIdandServerId: "/api/v1/servers/server-and-userid",
    createServer: "/api/v1/servers",
    updateServerInviteCode: "/api/v1/servers/invite-code",
    serverInvite: "/api/v1/servers/invite",
  },
};
