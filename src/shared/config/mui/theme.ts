import { createTheme } from "@mui/material/styles";
import { components } from "./override";

// 다크 테마 색상 팔레트 정의
const palette = {
  mode: "dark" as const,
  primary: {
    main: "#233043",
    light: "#4882da",
    dark: "#1b2635",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#10B981",
    light: "#34D399",
    dark: "#059669",
    contrastText: "#ffffff",
  },
  error: {
    main: "#EF4444",
    light: "#F87171",
    dark: "#DC2626",
    contrastText: "#ffffff",
  },
  warning: {
    main: "#F59E0B",
    light: "#FBBF24",
    dark: "#D97706",
    contrastText: "#ffffff",
  },
  info: {
    main: "#3B82F6",
    light: "#60A5FA",
    dark: "#2563EB",
    contrastText: "#ffffff",
  },
  success: {
    main: "#10B981",
    light: "#34D399",
    dark: "#059669",
    contrastText: "#ffffff",
  },
  background: {
    default: "#0F172A",
    paper: "#1E293B",
  },
  text: {
    primary: "#F8FAFC",
    secondary: "#CBD5E1",
  },
  divider: "#334155",
  grey: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
  },
};

// MUI 테마 생성
export const theme = createTheme({
  palette,
  typography: {
    fontFamily:
      '"Inter", "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      color: "#F8FAFC",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      color: "#F8FAFC",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      color: "#F8FAFC",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem",
      color: "#F8FAFC",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.125rem",
      color: "#F8FAFC",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1rem",
      color: "#F8FAFC",
    },
    body1: {
      fontSize: "1rem",
      color: "#CBD5E1",
    },
    body2: {
      fontSize: "0.875rem",
      color: "#94A3B8",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    ...components,
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: palette.primary.dark,
          color: "#F8FAFC",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&:focus, &:focus-visible": {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E293B",
          border: "1px solid #334155",
          borderRadius: 12,
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E293B",
          border: "1px solid #334155",
        },
      },
    },
  },
});
