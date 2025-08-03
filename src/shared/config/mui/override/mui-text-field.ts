import { type Components, type Theme } from "@mui/material/styles";

// TextField 컴포넌트의 기본 스타일을 재정의합니다.
export const MuiTextField: Components<Theme>["MuiTextField"] = {
  defaultProps: {
    variant: "outlined",
    fullWidth: true,
  },
  styleOverrides: {
    // 입력 필드 스타일
    root: ({ theme }) => ({
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        // 기본 상태의 아웃라인 색상 (회색 계열로 잘 보이게)
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.grey[500], // grey.500 - 다크 배경에서 잘 보이는 회색
        },
        // 호버 상태의 아웃라인 색상
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.grey[400], // grey.400 - 호버 시 조금 더 밝게
        },
        // 포커스 상태의 아웃라인 색상
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.secondary.main, // secondary.main - 포커스 시 초록색으로 강조
          borderWidth: "2px",
        },
        // 에러 상태의 아웃라인 색상
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.error.main, // 빨간색으로 에러 표시
        },
        "&.Mui-error:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.error.dark,
        },
        "&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.error.dark,
        },
      },
      // 레이블 스타일
      "& .MuiFormLabel-root": {
        color: theme.palette.text.secondary, // text.secondary와 동일한 색상
        "&.Mui-focused": {
          color: theme.palette.secondary.main, // 포커스 시 초록색
        },
        "&.Mui-error": {
          color: theme.palette.error.main, // 에러 시 빨간색
        },
      },
    }),
  },
};
