import { Box, Typography, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { SendPushForm } from "@/features/send-push";
import { PushHistoryTable } from "@/features/view-push-history";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`push-tabpanel-${index}`}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const PushNotificationPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 3 }}>
        PUSH 알림 관리
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
          <Tab label="PUSH 발송" />
          <Tab label="발송 내역" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <SendPushForm />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <PushHistoryTable />
      </TabPanel>
    </Box>
  );
};

export default PushNotificationPage;
