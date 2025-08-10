import { createElement } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { type RouteObject } from "react-router-dom";
import { theme } from "@/shared/config/mui/theme";
import { CustomRouter } from "@/shared/router";
import { routesConfig } from "@/shared/router/config/routes";
import { AppLayout } from "@/app/layouts/app-layout";
import { LayoutProvider } from "@/app/providers/layout-provider";
import {
  DashboardPage,
  EmailNotificationPage,
  PushNotificationPage,
} from "@/pages";

// 컴포넌트 맵핑
const componentMap = {
  AppLayout,
  EmailNotificationPage,
  PushNotificationPage,
  DashboardPage,
} as const;

// 라우트 설정을 실제 RouteObject로 변환
const routes: RouteObject[] = routesConfig.map((route) => ({
  path: route.path,
  element: createElement(componentMap.AppLayout),
  children: route.children?.map((child) => ({
    index: child.index,
    path: child.path,
    element: createElement(
      componentMap[child.pageKey as keyof typeof componentMap]
    ),
  })),
}));

export const AppProvider = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LayoutProvider>
        <CustomRouter routes={routes} />
      </LayoutProvider>
    </ThemeProvider>
  );
};
