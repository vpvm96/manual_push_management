import { type Components } from "@mui/material/styles";

// TextField 컴포넌트의 기본 스타일을 재정의합니다.
export const MuiTextField: Components["MuiTextField"] = {
  defaultProps: {
    variant: "outlined",
    fullWidth: true,
  },
  styleOverrides: {
    root: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
      },
    },
  },
};
