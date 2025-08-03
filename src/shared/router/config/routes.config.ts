export const RoutesConfig = {
  MAIN: {
    DASHBOARD: "/",
    HISTORY: "/history",
    NOTIFICATIONS: {
      EMAIL: "/notifications/email",
      PUSH: "/notifications/push",
    },
  },
  NOT_FOUND: {
    ALL: "*",
  },
} as const;
