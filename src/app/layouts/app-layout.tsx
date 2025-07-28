import { Box, useTheme } from "@mui/material";
import { AppHeader } from "@/widgets/app-header/app-header";
import { AppSidebar } from "@/widgets/app-sidebar/app-sidebar";
import { Outlet } from "react-router-dom";

const DRAWER_WIDTH = 280;

// 앱의 전체적인 레이아웃을 정의합니다.
export const AppLayout = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.palette.primary.dark,
        minHeight: "100vh",
      }}
    >
      <AppHeader />
      <AppSidebar />
      <Box
        component="main"
        sx={{
          marginTop: "64px",
          flexGrow: 1,
          backgroundColor: theme.palette.primary.dark,
          minHeight: "100vh",
          minWidth: `calc(100% - ${DRAWER_WIDTH}px)`, // 전체 너비에서 사이드바 너비 제외
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
