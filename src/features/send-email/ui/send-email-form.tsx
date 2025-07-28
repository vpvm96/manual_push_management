
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

export const SendEmailForm = () => {
  return (
    <Paper sx={{ p: 3, maxWidth: 720, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        이메일 발송
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="수신자 이메일"
          margin="normal"
        />
        <TextField
          label="제목"
          margin="normal"
        />
        <TextField
          label="내용"
          margin="normal"
          multiline
          rows={10}
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary">
            발송하기
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
