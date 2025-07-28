import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  ListItemIcon,
  useTheme,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import HistoryIcon from "@mui/icons-material/History";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PagesIcon from "@mui/icons-material/Description";
import WorkIcon from "@mui/icons-material/Work";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TaskIcon from "@mui/icons-material/Task";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import WidgetsIcon from "@mui/icons-material/Widgets";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TableChartIcon from "@mui/icons-material/TableChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";

const DRAWER_WIDTH = 280;

// 메인 페이지 메뉴
const pagesMenuItems = [
  { text: "대시보드", path: "/", icon: <DashboardIcon /> },
  { text: "이메일 발송", path: "/push-email", icon: <EmailIcon /> },
  { text: "발송내역", path: "/history", icon: <HistoryIcon /> },
];

// 대시보드 하위 메뉴
const dashboardSubItems = [
  { text: "Default", path: "/dashboard/default" },
  { text: "Analytics", path: "/dashboard/analytics" },
  { text: "SaaS", path: "/dashboard/saas" },
];

// 기타 메뉴 항목들
// const otherMenuItems = [
//   { text: "Pages", icon: <PagesIcon />, hasDropdown: true },
//   { text: "Projects", icon: <WorkIcon />, badge: "8" },
// ];

export const AppSidebar = () => {
  const location = useLocation();
  const theme = useTheme();
  const [dashboardExpanded, setDashboardExpanded] = useState(false);

  const handleDashboardToggle = () => {
    setDashboardExpanded(!dashboardExpanded);
  };

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          backgroundColor: theme.palette.primary.main,
          border: "none",
          color: "#E2E8F0",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* 브랜드 로고 영역 */}
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              backgroundColor: "#3182CE",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: "#63B3ED",
                borderRadius: "50%",
                mr: "2px",
              }}
            />
            <Box
              sx={{
                width: 8,
                height: 8,
                backgroundColor: "#90CDF4",
                borderRadius: "50%",
              }}
            />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: "#F7FAFC",
                fontWeight: 700,
                fontSize: "1.125rem",
                lineHeight: 1.2,
              }}
            >
              Email Push
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* PAGES 섹션 */}
      <Box sx={{ pt: 3, pb: 2 }}>
        <Typography
          variant="body2"
          sx={{
            color: "#A0AEC0",
            fontWeight: 600,
            mb: 2,
            px: 3,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          PAGES
        </Typography>

        <List sx={{ px: 2, py: 0 }}>
          {/* 대시보드 - 확장 가능한 메뉴 */}
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={handleDashboardToggle}
              sx={{
                borderRadius: "8px",
                color: "#CBD5E1",
                "&:hover": {
                  backgroundColor: "#4A5568",
                },
                "& .MuiListItemIcon-root": {
                  color: "#CBD5E1",
                  minWidth: 40,
                },
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  },
                }}
              />
              {dashboardExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>

          {/* 대시보드 하위 메뉴 */}
          <Collapse in={dashboardExpanded} timeout="auto" unmountOnExit>
            <List sx={{ pl: 4, py: 0 }}>
              {dashboardSubItems.map((item) => (
                <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    sx={{
                      borderRadius: "6px",
                      color: "#94A3B8",
                      fontSize: "0.875rem",
                      py: 1,
                      "&:hover": {
                        backgroundColor: "#4A5568",
                      },
                    }}
                  >
                    <ListItemText
                      primary={item.text}
                      sx={{
                        "& .MuiListItemText-primary": {
                          fontSize: "0.875rem",
                          fontWeight: 400,
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>

          {/* 기존 이메일 관련 메뉴들 */}
          {pagesMenuItems.slice(1).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: isActive
                      ? theme.palette.primary.light
                      : "transparent",
                    color: isActive ? "#F7FAFC" : "#CBD5E1",
                    "&:hover": {
                      backgroundColor: isActive
                        ? theme.palette.primary.light
                        : "#4A5568",
                    },
                    "& .MuiListItemIcon-root": {
                      color: isActive ? "#F7FAFC" : "#CBD5E1",
                      minWidth: 40,
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "0.875rem",
                        fontWeight: isActive ? 600 : 500,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};
