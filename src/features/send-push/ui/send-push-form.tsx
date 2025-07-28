import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  Chip,
  IconButton,
  Stack,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";

interface PushData {
  recipients: string[];
  title: string;
  message: string;
  priority: "low" | "normal" | "high";
  category: string;
  data?: Record<string, string>;
}

export const SendPushForm = () => {
  const [pushData, setPushData] = useState<PushData>({
    recipients: [""],
    title: "",
    message: "",
    priority: "normal",
    category: "",
    data: {},
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateDeviceToken = (token: string) => {
    // 간단한 디바이스 토큰 검증 (실제로는 더 복잡한 검증이 필요)
    return token.length >= 32;
  };

  const handleRecipientChange = (index: number, value: string) => {
    const newRecipients = [...pushData.recipients];
    newRecipients[index] = value;
    setPushData({ ...pushData, recipients: newRecipients });

    // 유효성 검사
    if (value && !validateDeviceToken(value)) {
      setErrors({
        ...errors,
        [`recipient_${index}`]: "올바른 디바이스 토큰 형식이 아닙니다.",
      });
    } else {
      const newErrors = { ...errors };
      delete newErrors[`recipient_${index}`];
      setErrors(newErrors);
    }
  };

  const addRecipient = () => {
    setPushData({ ...pushData, recipients: [...pushData.recipients, ""] });
  };

  const removeRecipient = (index: number) => {
    if (pushData.recipients.length > 1) {
      const newRecipients = pushData.recipients.filter((_, i) => i !== index);
      setPushData({ ...pushData, recipients: newRecipients });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");

    // 유효성 검사
    const newErrors: { [key: string]: string } = {};

    pushData.recipients.forEach((recipient, index) => {
      if (!recipient.trim()) {
        newErrors[`recipient_${index}`] = "디바이스 토큰을 입력해주세요.";
      } else if (!validateDeviceToken(recipient)) {
        newErrors[`recipient_${index}`] =
          "올바른 디바이스 토큰 형식이 아닙니다.";
      }
    });

    if (!pushData.title.trim()) {
      newErrors.title = "제목을 입력해주세요.";
    }

    if (!pushData.message.trim()) {
      newErrors.message = "메시지를 입력해주세요.";
    }

    if (!pushData.category.trim()) {
      newErrors.category = "카테고리를 선택해주세요.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // 실제 PUSH 발송 로직이 들어갈 부분
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage("PUSH 알림이 성공적으로 발송되었습니다!");
        // 폼 초기화
        setPushData({
          recipients: [""],
          title: "",
          message: "",
          priority: "normal",
          category: "",
          data: {},
        });
      }, 2000);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <NotificationsIcon sx={{ mr: 2, fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            PUSH 알림 발송
          </Typography>
        </Box>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            {/* 수신자 디바이스 토큰 */}
            <Box>
              <Typography variant="h6" gutterBottom>
                수신자 디바이스 토큰
              </Typography>
              {pushData.recipients.map((recipient, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    label={`디바이스 토큰 ${index + 1}`}
                    value={recipient}
                    onChange={(e) =>
                      handleRecipientChange(index, e.target.value)
                    }
                    error={!!errors[`recipient_${index}`]}
                    helperText={errors[`recipient_${index}`]}
                    placeholder="디바이스 토큰을 입력하세요"
                    variant="outlined"
                  />
                  <Box sx={{ ml: 1, display: "flex", gap: 1 }}>
                    {pushData.recipients.length > 1 && (
                      <IconButton
                        onClick={() => removeRecipient(index)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={addRecipient}
                variant="outlined"
                size="small"
              >
                수신자 추가
              </Button>
            </Box>

            <Divider />

            {/* 제목 */}
            <TextField
              fullWidth
              label="제목"
              value={pushData.title}
              onChange={(e) =>
                setPushData({ ...pushData, title: e.target.value })
              }
              error={!!errors.title}
              helperText={errors.title}
              placeholder="PUSH 알림 제목을 입력하세요"
              variant="outlined"
            />

            {/* 메시지 */}
            <TextField
              fullWidth
              label="메시지"
              value={pushData.message}
              onChange={(e) =>
                setPushData({ ...pushData, message: e.target.value })
              }
              error={!!errors.message}
              helperText={errors.message}
              placeholder="PUSH 알림 메시지를 입력하세요"
              multiline
              rows={4}
              variant="outlined"
            />

            {/* 우선순위 및 카테고리 */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>우선순위</InputLabel>
                <Select
                  value={pushData.priority}
                  label="우선순위"
                  onChange={(e) =>
                    setPushData({
                      ...pushData,
                      priority: e.target.value as "low" | "normal" | "high",
                    })
                  }
                >
                  <MenuItem value="low">낮음</MenuItem>
                  <MenuItem value="normal">보통</MenuItem>
                  <MenuItem value="high">높음</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth error={!!errors.category}>
                <InputLabel>카테고리</InputLabel>
                <Select
                  value={pushData.category}
                  label="카테고리"
                  onChange={(e) =>
                    setPushData({ ...pushData, category: e.target.value })
                  }
                >
                  <MenuItem value="general">일반</MenuItem>
                  <MenuItem value="promotion">프로모션</MenuItem>
                  <MenuItem value="alert">긴급</MenuItem>
                  <MenuItem value="update">업데이트</MenuItem>
                </Select>
                {errors.category && (
                  <FormHelperText>{errors.category}</FormHelperText>
                )}
              </FormControl>
            </Box>

            {/* 발송 버튼 */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SendIcon />}
                disabled={isLoading}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                {isLoading ? "발송중..." : "PUSH 발송"}
              </Button>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};
