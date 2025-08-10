import { AppBar, Toolbar, Box, IconButton, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useLayout } from "@/app/providers/layout-provider";

const DRAWER_WIDTH = 280;

export const AppHeader = () => {
  const theme = useTheme();
  const { isMobile, toggleSidebar } = useLayout();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: isMobile ? "100%" : `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: isMobile ? 0 : `${DRAWER_WIDTH}px`,
        boxShadow: "none",
        backgroundColor: theme.palette.primary.dark,
        backgroundImage: "none",
        border: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            aria-label="open sidebar"
            onClick={toggleSidebar}
            sx={{
              color: theme.palette.text.secondary,
              mr: 1,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
                color: theme.palette.text.primary,
              },
            }}
          >
            <NotificationsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
