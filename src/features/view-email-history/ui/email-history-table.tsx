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
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReplayIcon from "@mui/icons-material/Replay";

interface EmailHistory {
  id: number;
  recipient: string;
  subject: string;
  sentAt: string;
  status: "성공" | "실패" | "대기중";
  content: string;
}

// 임시 데이터
const emailHistoryData: EmailHistory[] = [
  {
    id: 1,
    recipient: "test1@example.com",
    subject: "테스트 메일 1",
    sentAt: "2025-01-15 10:30:25",
    status: "성공",
    content: "안녕하세요. 첫 번째 테스트 메일입니다.",
  },
  {
    id: 2,
    recipient: "test2@example.com",
    subject: "테스트 메일 2",
    sentAt: "2025-01-15 11:00:10",
    status: "실패",
    content: "두 번째 테스트 메일 내용입니다.",
  },
  {
    id: 3,
    recipient: "user@company.com",
    subject: "회사 공지사항",
    sentAt: "2025-01-15 14:15:30",
    status: "성공",
    content: "회사 공지사항을 전달드립니다.",
  },
  {
    id: 4,
    recipient: "admin@service.com",
    subject: "시스템 점검 안내",
    sentAt: "2025-01-15 16:45:00",
    status: "대기중",
    content: "시스템 점검 예정 안내 메일입니다.",
  },
  {
    id: 5,
    recipient: "support@example.org",
    subject: "문의사항 답변",
    sentAt: "2025-01-15 18:20:15",
    status: "성공",
    content: "문의해주신 내용에 대한 답변입니다.",
  },
];

type Order = "asc" | "desc";
type OrderBy = keyof EmailHistory;

export const EmailHistoryTable = () => {
  const [data, setData] = useState<EmailHistory[]>(emailHistoryData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<OrderBy>("sentAt");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );

  // 검색 필터링
  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
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

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setPage(0);
    handleFilterClose();
  };

  const handleRefresh = () => {
    // 실제로는 API 호출을 통해 데이터를 새로고침
    console.log("데이터 새로고침");
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

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            발송 내역
          </Typography>

          {/* 검색 및 필터 영역 */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 2, mb: 3 }}
          >
            <TextField
              placeholder="수신자, 제목, 내용으로 검색..."
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
                상태 필터
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
            <MenuItem
              onClick={() => handleStatusFilter("all")}
              selected={statusFilter === "all"}
            >
              전체
            </MenuItem>
            <MenuItem
              onClick={() => handleStatusFilter("성공")}
              selected={statusFilter === "성공"}
            >
              성공
            </MenuItem>
            <MenuItem
              onClick={() => handleStatusFilter("실패")}
              selected={statusFilter === "실패"}
            >
              실패
            </MenuItem>
            <MenuItem
              onClick={() => handleStatusFilter("대기중")}
              selected={statusFilter === "대기중"}
            >
              대기중
            </MenuItem>
          </Menu>
        </Box>

        {/* 테이블 */}
        <TableContainer component={SimpleBar} style={{ maxHeight: 480 }}>
          <Table stickyHeader sx={{ minWidth: 960 }}>
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
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "recipient"}
                    direction={orderBy === "recipient" ? order : "asc"}
                    onClick={() => handleRequestSort("recipient")}
                  >
                    수신자
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "subject"}
                    direction={orderBy === "subject" ? order : "asc"}
                    onClick={() => handleRequestSort("subject")}
                  >
                    제목
                  </TableSortLabel>
                </TableCell>
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
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {row.recipient}
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
                      {row.subject}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(row.sentAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>{getStatusChip(row.status)}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="내용 보기">
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
