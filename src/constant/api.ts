export const API = {
  currentEnv: process.env.NEXT_PUBLIC_NEXT_APP_SERVER,
  baseURL: {
    dev: process.env.NEXT_PUBLIC_NEXT_APP_API_URL_DEV,
    prod: process.env.NEXT_PUBLIC_NEXT_APP_API_URL_PROD,
  },
  noAuthUrls: {
    accessToken: "/api/v1/auth/access-token",
    isAuthenticated: "/api/v1/auth/is-login",
    signUp: "/api/v1/auth/sign-up",
    signIn: "/api/v1/auth/sign-in",
    forgetPassword: "/api/v1/auth/forget-password",
    otp: "/api/v1/auth/otp",
  },
  auth_urls: {
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
    signOut: "/api/v1/auth/sign-out",
  },
};

export const APIURL = API.baseURL[API.currentEnv as keyof typeof API.baseURL];
