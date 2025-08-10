import { Card, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// 차트 데이터 타입 정의
interface ChartData {
  name: string;
  value: number;
  email?: number;
  push?: number;
}

// 차트 색상 팔레트
const CHART_COLORS = {
  primary: "#233043",
  secondary: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
  success: "#10B981",
};

const PIE_COLORS = ["#233043", "#10B981", "#EF4444", "#F59E0B"];

interface WeeklyStatsChartProps {
  data: ChartData[];
}

const WeeklyStatsChart = ({ data }: WeeklyStatsChartProps) => (
  <Card
    sx={{
      height: "420px", // 고정 높이
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
        주간 발송 통계
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          minHeight: 0, // flexbox에서 overflow 처리를 위함
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#CBD5E1", fontSize: 12 }}
              axisLine={{ stroke: "#334155" }}
            />
            <YAxis
              tick={{ fill: "#CBD5E1", fontSize: 12 }}
              axisLine={{ stroke: "#334155" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#F8FAFC",
              }}
            />
            <Bar
              dataKey="email"
              fill={CHART_COLORS.primary}
              name="이메일"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="push"
              fill={CHART_COLORS.secondary}
              name="푸시"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </CardContent>
  </Card>
);

interface TrendChartProps {
  data: ChartData[];
}

const TrendChart = ({ data }: TrendChartProps) => (
  <Card
    sx={{
      height: "420px", // 고정 높이
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
        발송량 추이
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          minHeight: 0,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#CBD5E1", fontSize: 12 }}
              axisLine={{ stroke: "#334155" }}
            />
            <YAxis
              tick={{ fill: "#CBD5E1", fontSize: 12 }}
              axisLine={{ stroke: "#334155" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#F8FAFC",
              }}
            />
            <Line
              type="monotone"
              dataKey="email"
              stroke={CHART_COLORS.primary}
              strokeWidth={3}
              name="이메일"
              dot={{ fill: CHART_COLORS.primary, strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: CHART_COLORS.primary }}
            />
            <Line
              type="monotone"
              dataKey="push"
              stroke={CHART_COLORS.secondary}
              strokeWidth={3}
              name="푸시"
              dot={{ fill: CHART_COLORS.secondary, strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: CHART_COLORS.secondary }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </CardContent>
  </Card>
);

interface StatusDistributionProps {
  data: ChartData[];
}

const StatusDistribution = ({ data }: StatusDistributionProps) => {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight={500}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card
      sx={{
        height: "420px", // 고정 높이로 주간 통계와 동일하게
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
          발송 상태 분포
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flexGrow: 1, minHeight: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius="70%"
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          {/* 범례 */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              mt: 1,
              pt: 1,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            {data.map((entry, index) => (
              <Box
                key={entry.name}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mr: 2,
                  mb: 0.5,
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: PIE_COLORS[index % PIE_COLORS.length],
                    borderRadius: 1,
                    mr: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.8rem" }}
                >
                  {entry.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export const DashboardStats = () => {
  // 실제 프로젝트에서는 API에서 데이터를 가져와야 합니다.
  const weeklyData: ChartData[] = [
    { name: "월", email: 120, push: 80, value: 120 },
    { name: "화", email: 150, push: 95, value: 150 },
    { name: "수", email: 180, push: 110, value: 180 },
    { name: "목", email: 200, push: 125, value: 200 },
    { name: "금", email: 175, push: 105, value: 175 },
    { name: "토", email: 90, push: 60, value: 90 },
    { name: "일", email: 70, push: 45, value: 70 },
  ];

  const trendData: ChartData[] = [
    { name: "1주전", email: 1200, push: 800, value: 1200 },
    { name: "6일전", email: 1350, push: 920, value: 1350 },
    { name: "5일전", email: 1180, push: 760, value: 1180 },
    { name: "4일전", email: 1420, push: 980, value: 1420 },
    { name: "3일전", email: 1600, push: 1100, value: 1600 },
    { name: "2일전", email: 1750, push: 1250, value: 1750 },
    { name: "1일전", email: 1580, push: 1080, value: 1580 },
    { name: "오늘", email: 1234, push: 856, value: 1234 },
  ];

  const statusData: ChartData[] = [
    { name: "성공", value: 1856 },
    { name: "실패", value: 234 },
    { name: "대기중", value: 23 },
    { name: "취소", value: 15 },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {/* 주간 발송 통계 */}
        <Grid item xs={12} lg={6}>
          <WeeklyStatsChart data={weeklyData} />
        </Grid>

        {/* 발송 상태 분포 */}
        <Grid item xs={12} lg={6}>
          <StatusDistribution data={statusData} />
        </Grid>

        {/* 발송량 추이 */}
        <Grid item xs={12}>
          <TrendChart data={trendData} />
        </Grid>
      </Grid>
    </Box>
  );
};
