export const RoutesConfig = {
  MAIN: {
    DASHBOARD: "/",
    NOTIFICATIONS: {
      EMAIL: "/notifications/email",
      PUSH: "/notifications/push",
    },
  },
  NOT_FOUND: {
    ALL: "*",
  },
} as const;
