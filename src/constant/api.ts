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
    createServer: "/api/v1/servers",
  },
};
