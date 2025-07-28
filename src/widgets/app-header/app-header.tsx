import { AppBar, Toolbar, Box, IconButton, useTheme } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const DRAWER_WIDTH = 280;

export const AppHeader = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
        boxShadow: "none",
        backgroundColor: theme.palette.primary.dark,
        backgroundImage: "none",
        border: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box></Box>

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
