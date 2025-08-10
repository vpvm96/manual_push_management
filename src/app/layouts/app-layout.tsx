import { Box, useTheme } from "@mui/material";
import { AppHeader } from "@/widgets/app-header/app-header";
import { AppSidebar } from "@/widgets/app-sidebar/app-sidebar";
import { Outlet } from "react-router-dom";
import { useLayout } from "@/app/providers/layout-provider";

const DRAWER_WIDTH = 280;

// 앱의 전체적인 레이아웃을 정의합니다.
export const AppLayout = () => {
  const theme = useTheme();
  const { isMobile } = useLayout();

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
          minWidth: isMobile ? "100%" : `calc(100% - ${DRAWER_WIDTH}px)`,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
