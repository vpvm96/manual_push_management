import { RoutesConfig } from "./routes.config";

// 라우트 설정만 export (컴포넌트 import는 app 레이어에서 처리)
export const routesConfig = [
  {
    path: RoutesConfig.MAIN.DASHBOARD,
    // app 레이어에서 실제 컴포넌트를 주입받도록 함
    layoutKey: "AppLayout",
    children: [
      {
        index: true,
        pageKey: "DashboardPage",
      },
      {
        path: RoutesConfig.MAIN.PUSH_EMAIL,
        pageKey: "PushEmailPage",
      },
      {
        path: RoutesConfig.MAIN.HISTORY,
        pageKey: "HistoryPage",
      },
    ],
  },
];
