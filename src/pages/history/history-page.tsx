import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useState } from "react";
import { EmailHistoryTable } from "../../features/view-email-history";
import { PushHistoryTable } from "../../features/view-push-history";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`history-tabpanel-${index}`}
      aria-labelledby={`history-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `history-tab-${index}`,
    "aria-controls": `history-tabpanel-${index}`,
  };
};

const HistoryPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "background.paper",
          px: 3,
          pt: 3,
          pb: 1,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          발송 내역
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          이메일과 푸시 알림의 발송 내역을 확인하고 관리할 수 있습니다.
        </Typography>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="history tabs"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              minWidth: 120,
              color: "text.secondary",
              "&.Mui-selected": {
                color: "primary.main",
                fontWeight: 600,
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "primary.main",
              height: 3,
            },
          }}
        >
          <Tab label="이메일 내역" {...a11yProps(0)} />
          <Tab label="푸시 내역" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box sx={{ p: 3 }}>
          <EmailHistoryTable />
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box sx={{ p: 3 }}>
          <PushHistoryTable />
        </Box>
      </TabPanel>
    </Box>
  );
};

export default HistoryPage;
