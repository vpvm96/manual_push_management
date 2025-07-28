import { Box, Typography, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { SendEmailForm } from "@/features/send-email";
import { EmailHistoryTable } from "@/features/view-email-history";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`email-tabpanel-${index}`}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const EmailNotificationPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 3 }}>
        이메일 알림 관리
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#3182CE",
              height: 3,
            },
            "& .MuiTab-root": {
              color: "#64748B",
              fontWeight: 500,
              fontSize: "0.875rem",
              textTransform: "none",
              minHeight: 48,
              "&:focus": {
                outline: "none",
              },
              "&.Mui-selected": {
                color: "#3182CE",
                fontWeight: 600,
              },
            },
          }}
        >
          <Tab label="이메일 발송" />
          <Tab label="발송 내역" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <SendEmailForm />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <EmailHistoryTable />
      </TabPanel>
    </Box>
  );
};

export default EmailNotificationPage;
