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
} from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface EmailData {
  recipients: string[];
  subject: string;
  content: string;
  attachments: File[];
}

export const SendEmailForm = () => {
  const [emailData, setEmailData] = useState<EmailData>({
    recipients: [""],
    subject: "",
    content: "",
    attachments: [],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRecipientChange = (index: number, value: string) => {
    const newRecipients = [...emailData.recipients];
    newRecipients[index] = value;
    setEmailData({ ...emailData, recipients: newRecipients });

    // 유효성 검사
    if (value && !validateEmail(value)) {
      setErrors({
        ...errors,
        [`recipient_${index}`]: "올바른 이메일 형식이 아닙니다.",
      });
    } else {
      const newErrors = { ...errors };
      delete newErrors[`recipient_${index}`];
      setErrors(newErrors);
    }
  };

  const addRecipient = () => {
    setEmailData({ ...emailData, recipients: [...emailData.recipients, ""] });
  };

  const removeRecipient = (index: number) => {
    if (emailData.recipients.length > 1) {
      const newRecipients = emailData.recipients.filter((_, i) => i !== index);
      setEmailData({ ...emailData, recipients: newRecipients });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setEmailData({
      ...emailData,
      attachments: [...emailData.attachments, ...files],
    });
  };

  const removeAttachment = (index: number) => {
    const newAttachments = emailData.attachments.filter((_, i) => i !== index);
    setEmailData({ ...emailData, attachments: newAttachments });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");

    // 유효성 검사
    const newErrors: { [key: string]: string } = {};

    emailData.recipients.forEach((recipient, index) => {
      if (!recipient.trim()) {
        newErrors[`recipient_${index}`] = "수신자 이메일을 입력해주세요.";
      } else if (!validateEmail(recipient)) {
        newErrors[`recipient_${index}`] = "올바른 이메일 형식이 아닙니다.";
      }
    });

    if (!emailData.subject.trim()) {
      newErrors.subject = "제목을 입력해주세요.";
    }

    if (!emailData.content.trim()) {
      newErrors.content = "내용을 입력해주세요.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // 실제 발송 로직이 들어갈 부분
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage("이메일이 성공적으로 발송되었습니다!");
        // 폼 초기화
        setEmailData({
          recipients: [""],
          subject: "",
          content: "",
          attachments: [],
        });
      }, 2000);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
          이메일 발송
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            {/* 수신자 입력 */}
            <Box>
              {emailData.recipients.map((recipient, index) => (
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
                    label={`수신자`}
                    value={recipient}
                    onChange={(e) =>
                      handleRecipientChange(index, e.target.value)
                    }
                    error={!!errors[`recipient_${index}`]}
                    helperText={errors[`recipient_${index}`]}
                    placeholder="example@email.com"
                    variant="outlined"
                    // 포커스 시 테두리 색상 변경
                  />
                  <Box sx={{ ml: 1, display: "flex", gap: 1 }}>
                    {emailData.recipients.length > 1 && (
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

            {/* 제목 입력 */}
            <TextField
              fullWidth
              label="제목"
              value={emailData.subject}
              onChange={(e) =>
                setEmailData({ ...emailData, subject: e.target.value })
              }
              error={!!errors.subject}
              helperText={errors.subject}
              placeholder="이메일 제목을 입력하세요"
              variant="outlined"
            />

            {/* 내용 입력 */}
            <TextField
              fullWidth
              label="내용"
              value={emailData.content}
              onChange={(e) =>
                setEmailData({ ...emailData, content: e.target.value })
              }
              error={!!errors.content}
              helperText={errors.content}
              placeholder="이메일 내용을 입력하세요"
              multiline
              rows={12}
              variant="outlined"
            />

            {/* 첨부파일 */}
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ mr: 2 }}>
                  첨부파일
                </Typography>
                <Button
                  component="label"
                  startIcon={<AttachFileIcon />}
                  variant="outlined"
                  size="small"
                >
                  파일 선택
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={handleFileUpload}
                  />
                </Button>
              </Box>

              {emailData.attachments.length > 0 && (
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {emailData.attachments.map((file, index) => (
                    <Chip
                      key={index}
                      label={file.name}
                      onDelete={() => removeAttachment(index)}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Stack>
              )}
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
                {isLoading ? "발송중..." : "발송하기"}
              </Button>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};
