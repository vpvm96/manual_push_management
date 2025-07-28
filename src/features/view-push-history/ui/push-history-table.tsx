import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Stack,
  TableSortLabel,
  Menu,
  MenuItem,
  Button,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReplayIcon from "@mui/icons-material/Replay";
import NotificationsIcon from "@mui/icons-material/Notifications";

interface PushHistory {
  id: number;
  deviceToken: string;
  title: string;
  message: string;
  priority: "low" | "normal" | "high";
  category: string;
  sentAt: string;
  status: "성공" | "실패" | "대기중";
}

// 임시 데이터
const pushHistoryData: PushHistory[] = [
  {
    id: 1,
    deviceToken: "abc123...xyz789",
    title: "새로운 메시지",
    message: "새로운 메시지가 도착했습니다.",
    priority: "normal",
    category: "general",
    sentAt: "2025-01-15 10:30:25",
    status: "성공",
  },
  {
    id: 2,
    deviceToken: "def456...uvw012",
    title: "긴급 알림",
    message: "긴급 상황이 발생했습니다.",
    priority: "high",
    category: "alert",
    sentAt: "2025-01-15 11:00:10",
    status: "실패",
  },
  {
    id: 3,
    deviceToken: "ghi789...rst345",
    title: "프로모션 안내",
    message: "특별 할인 이벤트를 확인하세요.",
    priority: "low",
    category: "promotion",
    sentAt: "2025-01-15 14:15:30",
    status: "성공",
  },
  {
    id: 4,
    deviceToken: "jkl012...opq678",
    title: "업데이트 알림",
    message: "새로운 버전이 출시되었습니다.",
    priority: "normal",
    category: "update",
    sentAt: "2025-01-15 16:45:00",
    status: "대기중",
  },
];

type Order = "asc" | "desc";
type OrderBy = keyof PushHistory;

export const PushHistoryTable = () => {
  const [data, setData] = useState<PushHistory[]>(pushHistoryData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<OrderBy>("sentAt");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );

  // 검색 필터링
  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.deviceToken.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || item.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // 정렬
  const sortedData = [...filteredData].sort((a, b) => {
    let aValue = a[orderBy];
    let bValue = b[orderBy];

    if (orderBy === "sentAt") {
      aValue = new Date(aValue as string).getTime();
      bValue = new Date(bValue as string).getTime();
    }

    if (order === "asc") {
      return aValue < bValue ? -1 : 1;
    }
    return aValue > bValue ? -1 : 1;
  });

  // 페이지네이션 적용
  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleRefresh = () => {
    console.log("PUSH 데이터 새로고침");
  };

  const getStatusChip = (status: string) => {
    const statusConfig = {
      성공: { color: "success" as const, label: "성공" },
      실패: { color: "error" as const, label: "실패" },
      대기중: { color: "warning" as const, label: "대기중" },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Chip
        label={config.label}
        color={config.color}
        size="small"
        variant="outlined"
      />
    );
  };

  const getPriorityChip = (priority: string) => {
    const priorityConfig = {
      low: { color: "default" as const, label: "낮음" },
      normal: { color: "primary" as const, label: "보통" },
      high: { color: "error" as const, label: "높음" },
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return (
      <Chip
        label={config.label}
        color={config.color}
        size="small"
        variant="outlined"
      />
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateToken = (token: string) => {
    return `${token.substring(0, 8)}...${token.substring(token.length - 8)}`;
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <NotificationsIcon sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              PUSH 알림 내역
            </Typography>
          </Box>

          {/* 검색 및 필터 영역 */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 2, mb: 3 }}
          >
            <TextField
              placeholder="디바이스 토큰, 제목, 메시지로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
              sx={{ minWidth: 300 }}
            />

            <Stack direction="row" spacing={1}>
              <Button
                startIcon={<FilterListIcon />}
                onClick={handleFilterClick}
                variant="outlined"
                size="small"
              >
                필터
              </Button>
              <Button
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
                variant="outlined"
                size="small"
              >
                새로고침
              </Button>
            </Stack>
          </Stack>

          {/* 필터 메뉴 */}
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterClose}
          >
            <MenuItem disabled>
              <Typography variant="subtitle2">상태</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setStatusFilter("all");
                setPage(0);
              }}
              selected={statusFilter === "all"}
            >
              전체
            </MenuItem>
            <MenuItem
              onClick={() => {
                setStatusFilter("성공");
                setPage(0);
              }}
              selected={statusFilter === "성공"}
            >
              성공
            </MenuItem>
            <MenuItem
              onClick={() => {
                setStatusFilter("실패");
                setPage(0);
              }}
              selected={statusFilter === "실패"}
            >
              실패
            </MenuItem>
            <MenuItem
              onClick={() => {
                setStatusFilter("대기중");
                setPage(0);
              }}
              selected={statusFilter === "대기중"}
            >
              대기중
            </MenuItem>
          </Menu>
        </Box>

        {/* 테이블 */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "id"}
                    direction={orderBy === "id" ? order : "asc"}
                    onClick={() => handleRequestSort("id")}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>디바이스 토큰</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "title"}
                    direction={orderBy === "title" ? order : "asc"}
                    onClick={() => handleRequestSort("title")}
                  >
                    제목
                  </TableSortLabel>
                </TableCell>
                <TableCell>메시지</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "priority"}
                    direction={orderBy === "priority" ? order : "asc"}
                    onClick={() => handleRequestSort("priority")}
                  >
                    우선순위
                  </TableSortLabel>
                </TableCell>
                <TableCell>카테고리</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "sentAt"}
                    direction={orderBy === "sentAt" ? order : "asc"}
                    onClick={() => handleRequestSort("sentAt")}
                  >
                    발송일시
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "status"}
                    direction={orderBy === "status" ? order : "asc"}
                    onClick={() => handleRequestSort("status")}
                  >
                    상태
                  </TableSortLabel>
                </TableCell>
                <TableCell>작업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: "monospace" }}
                    >
                      {truncateToken(row.deviceToken)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        maxWidth: 150,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontWeight: 500,
                      }}
                    >
                      {row.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.message}
                    </Typography>
                  </TableCell>
                  <TableCell>{getPriorityChip(row.priority)}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.category}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(row.sentAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>{getStatusChip(row.status)}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="상세 보기">
                        <IconButton size="small">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {row.status === "실패" && (
                        <Tooltip title="재발송">
                          <IconButton size="small" color="primary">
                            <ReplayIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 페이지네이션 */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="페이지당 행 수:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} / 총 ${count}개`
          }
        />
      </CardContent>
    </Card>
  );
};
