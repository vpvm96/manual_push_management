import { Box, useTheme } from "@mui/material";
import { AppHeader } from "@/widgets/app-header/app-header";
import { AppSidebar } from "@/widgets/app-sidebar/app-sidebar";
import { Outlet } from "react-router-dom";

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
          flexGrow: 1,
          p: 3,
          mt: `64px`,
          backgroundColor: theme.palette.primary.dark,
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
