import { type Components } from "@mui/material/styles";

// Button 컴포넌트의 기본 스타일을 재정의합니다.
export const MuiButton: Components["MuiButton"] = {
  styleOverrides: {
    root: {
      fontWeight: 600,
      textTransform: "none",
      borderRadius: "8px",
      boxShadow: "none",
      "&:hover": {
        boxShadow: "none",
      },
    },
    containedPrimary: {
      color: "#fff",
    },
  },
};
