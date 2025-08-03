import { type Components, type Theme, alpha } from "@mui/material/styles";

// Button 컴포넌트의 기본 스타일을 재정의합니다.
export const MuiButton: Components<Theme>["MuiButton"] = {
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
    // Outlined 버튼 스타일 추가
    outlined: ({ theme }) => ({
      borderColor: theme.palette.grey[500], // grey.500 - 기본 아웃라인 색상
      color: theme.palette.text.primary, // text.primary와 동일한 색상
      "&:hover": {
        borderColor: theme.palette.grey[400], // grey.400 - 호버 시 더 밝게
        backgroundColor: alpha(theme.palette.grey[400], 0.08), // 호버 시 약간의 배경색
      },
      "&:focus": {
        borderColor: theme.palette.secondary.main, // secondary.main - 포커스 시 초록색
      },
    }),
    outlinedPrimary: ({ theme }) => ({
      borderColor: theme.palette.primary.main, // primary.main
      color: theme.palette.primary.light, // primary.light - 텍스트는 더 밝게
      "&:hover": {
        borderColor: theme.palette.primary.light, // primary.light
        backgroundColor: alpha(theme.palette.primary.light, 0.08),
      },
    }),
    outlinedSecondary: ({ theme }) => ({
      borderColor: theme.palette.secondary.main, // secondary.main
      color: theme.palette.secondary.light, // secondary.light
      "&:hover": {
        borderColor: theme.palette.secondary.light, // secondary.light
        backgroundColor: alpha(theme.palette.secondary.light, 0.08),
      },
    }),
  },
};
