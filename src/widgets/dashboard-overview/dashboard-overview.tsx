import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Stack,
} from "@mui/material";
import {
  Email,
  NotificationsActive,
  TrendingUp,
  Schedule,
  CheckCircle,
  Error,
  Warning,
} from "@mui/icons-material";
import { QuickActions } from "../quick-actions/quick-actions";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, icon, color, trend }: StatCardProps) => (
  <Card
    sx={{
      height: "180px", // 고정된 높이로 균등하게 맞춤
      display: "flex",
      flexDirection: "column",
    }}
  >
    <CardContent
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            backgroundColor: `${color}.main`,
            color: "white",
            mr: 1.5,
            minWidth: 40,
            minHeight: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ fontSize: "0.9rem" }}
        >
          {title}
        </Typography>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, mb: 1, fontSize: "2rem" }}
        >
          {value}
        </Typography>
      </Box>

      {trend && (
        <Box sx={{ display: "flex", alignItems: "center", mt: "auto" }}>
          <TrendingUp
            sx={{
              fontSize: 16,
              color: trend.isPositive ? "success.main" : "error.main",
              transform: trend.isPositive ? "none" : "rotate(180deg)",
              mr: 0.5,
            }}
          />
          <Typography
            variant="body2"
            color={trend.isPositive ? "success.main" : "error.main"}
            sx={{ fontSize: "0.8rem" }}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}%
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ ml: 0.5, fontSize: "0.8rem" }}
          >
            전일 대비
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

interface RecentActivityProps {
  activities: {
    id: number;
    type: "email" | "push";
    message: string;
    timestamp: string;
    status: "success" | "error" | "pending";
  }[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => (
  <Card
    sx={{
      height: "400px", // 고정 높이
      display: "flex",
      flexDirection: "column",
    }}
  >
    <CardContent
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        p: 2.5,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        최근 활동
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          pr: 1, // 스크롤바 여백
        }}
      >
        <Stack spacing={1.5}>
          {activities.map((activity) => (
            <Box
              key={activity.id}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1.5,
                backgroundColor: "background.paper",
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box sx={{ mr: 1.5, minWidth: 24 }}>
                {activity.type === "email" ? (
                  <Email color="primary" sx={{ fontSize: 20 }} />
                ) : (
                  <NotificationsActive
                    color="secondary"
                    sx={{ fontSize: 20 }}
                  />
                )}
              </Box>

              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    fontSize: "0.85rem",
                    lineHeight: 1.4,
                    mb: 0.5,
                  }}
                >
                  {activity.message}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem" }}
                >
                  {activity.timestamp}
                </Typography>
              </Box>

              <Box sx={{ ml: 1, flexShrink: 0 }}>
                <Chip
                  size="small"
                  icon={
                    activity.status === "success" ? (
                      <CheckCircle sx={{ fontSize: "12px !important" }} />
                    ) : activity.status === "error" ? (
                      <Error sx={{ fontSize: "12px !important" }} />
                    ) : (
                      <Warning sx={{ fontSize: "12px !important" }} />
                    )
                  }
                  label={
                    activity.status === "success"
                      ? "성공"
                      : activity.status === "error"
                      ? "실패"
                      : "대기중"
                  }
                  color={
                    activity.status === "success"
                      ? "success"
                      : activity.status === "error"
                      ? "error"
                      : "warning"
                  }
                  variant="outlined"
                  sx={{
                    height: 24,
                    fontSize: "0.7rem",
                    "& .MuiChip-label": {
                      px: 1,
                    },
                  }}
                />
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </CardContent>
  </Card>
);

interface DeliveryRateProps {
  emailRate: number;
  pushRate: number;
}

const DeliveryRateCard = ({ emailRate, pushRate }: DeliveryRateProps) => (
  <Card
    sx={{
      height: "400px", // 고정 높이로 최근 활동 카드와 동일하게
      display: "flex",
      flexDirection: "column",
    }}
  >
    <CardContent
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2.5,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        전송 성공률
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Stack spacing={4}>
          <Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 500,
                }}
              >
                <Email sx={{ mr: 1.5, fontSize: 20 }} />
                이메일
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "primary.main" }}
              >
                {emailRate}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={emailRate}
              sx={{
                height: 12,
                borderRadius: 6,
                backgroundColor: "grey.800",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "primary.main",
                  borderRadius: 6,
                },
              }}
            />
          </Box>

          <Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 500,
                }}
              >
                <NotificationsActive sx={{ mr: 1.5, fontSize: 20 }} />
                푸시 알림
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "secondary.main" }}
              >
                {pushRate}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={pushRate}
              sx={{
                height: 12,
                borderRadius: 6,
                backgroundColor: "grey.800",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "secondary.main",
                  borderRadius: 6,
                },
              }}
            />
          </Box>
        </Stack>
      </Box>
    </CardContent>
  </Card>
);

export const DashboardOverview = () => {
  // 실제 프로젝트에서는 API에서 데이터를 가져와야 합니다.
  const statsData = [
    {
      title: "총 이메일 발송",
      value: "1,234",
      icon: <Email />,
      color: "primary" as const,
      trend: { value: 12.5, isPositive: true },
    },
    {
      title: "총 푸시 발송",
      value: "856",
      icon: <NotificationsActive />,
      color: "secondary" as const,
      trend: { value: 8.3, isPositive: true },
    },
    {
      title: "성공률",
      value: "94.2%",
      icon: <CheckCircle />,
      color: "success" as const,
      trend: { value: 2.1, isPositive: true },
    },
    {
      title: "대기중",
      value: "23",
      icon: <Schedule />,
      color: "warning" as const,
      trend: { value: 5.7, isPositive: false },
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "email" as const,
      message: "마케팅 이메일이 1,250명에게 발송되었습니다.",
      timestamp: "5분 전",
      status: "success" as const,
    },
    {
      id: 2,
      type: "push" as const,
      message: "긴급 공지 푸시가 발송 대기 중입니다.",
      timestamp: "15분 전",
      status: "pending" as const,
    },
    {
      id: 3,
      type: "email" as const,
      message: "주간 뉴스레터 발송이 완료되었습니다.",
      timestamp: "1시간 전",
      status: "success" as const,
    },
    {
      id: 4,
      type: "push" as const,
      message: "일부 디바이스로 푸시 발송에 실패했습니다.",
      timestamp: "2시간 전",
      status: "error" as const,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        대시보드
      </Typography>

      <Grid container spacing={3}>
        {/* 통계 카드들 */}
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}

        {/* 전송 성공률 */}
        <Grid item xs={12} lg={4}>
          <DeliveryRateCard emailRate={94} pushRate={89} />
        </Grid>

        {/* 최근 활동 */}
        <Grid item xs={12} lg={8}>
          <RecentActivity activities={recentActivities} />
        </Grid>

        {/* 빠른 작업 */}
        <Grid item xs={12}>
          <QuickActions />
        </Grid>
      </Grid>
    </Box>
  );
};
