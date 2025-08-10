import { Box, Tabs, Tab, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { DashboardOverview } from "../../../widgets/dashboard-overview/dashboard-overview";
import { DashboardStats } from "../../../widgets/dashboard-stats/dashboard-stats";
import { EmailHistoryTable } from "../../view-email-history";
import { PushHistoryTable } from "../../view-push-history";

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
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `dashboard-tab-${index}`,
    "aria-controls": `dashboard-tabpanel-${index}`,
  };
};

export const DashboardManagement = () => {
  const theme = useTheme();
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
          pt: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          대시보드 관리
        </Typography>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="dashboard management tabs"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              minWidth: 120,
              color: "text.secondary",
              borderRadius: 1,
              mx: 0.5,
              px: 1.5,
              "&.Mui-selected": {
                color: "primary.contrastText",
                backgroundColor: "primary.main",
              },
              "&:hover": {
                backgroundColor: "grey.700",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "primary.light",
              height: 3,
              borderRadius: 3,
            },
          }}
        >
          <Tab label="개요" {...a11yProps(0)} />
          <Tab label="통계" {...a11yProps(1)} />
          <Tab label="이메일 내역" {...a11yProps(2)} />
          <Tab label="푸시 내역" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <DashboardOverview />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <DashboardStats />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Box sx={{ p: 3 }}>
          <EmailHistoryTable />
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Box sx={{ p: 3 }}>
          <PushHistoryTable />
        </Box>
      </TabPanel>
    </Box>
  );
};
