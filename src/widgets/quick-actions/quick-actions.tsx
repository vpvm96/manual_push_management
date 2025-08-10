import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { Email, NotificationsActive, History } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { RoutesConfig } from "@/shared/router/config/routes.config";
import type React from "react";

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions: Array<{
    label: string;
    description: string;
    to: string;
    color: "primary" | "secondary" | "success" | "error" | "warning" | "info";
    icon: React.ReactNode;
  }> = [
    {
      label: "이메일 발송",
      description: "이메일 전송 폼으로 이동",
      to: RoutesConfig.MAIN.NOTIFICATIONS.EMAIL,
      color: "primary",
      icon: <Email />,
    },
    {
      label: "푸시 발송",
      description: "푸시 전송 폼으로 이동",
      to: RoutesConfig.MAIN.NOTIFICATIONS.PUSH,
      color: "secondary",
      icon: <NotificationsActive />,
    },
    {
      label: "히스토리 보기",
      description: "전송 히스토리 열람",
      to: RoutesConfig.MAIN.HISTORY,
      color: "info",
      icon: <History />,
    },
  ];

  return (
    <Card>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          빠른 작업
        </Typography>

        <Grid container spacing={2}>
          {actions.map((action) => (
            <Grid item xs={12} sm={6} md={4} key={action.label}>
              <Button
                fullWidth
                variant="contained"
                color={action.color}
                onClick={() => navigate(action.to)}
                startIcon={
                  <Box
                    component="span"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {action.icon}
                  </Box>
                }
                sx={{
                  height: 56,
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 2,
                }}
                aria-label={action.label}
              >
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    {action.label}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    {action.description}
                  </Typography>
                </Box>
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};
