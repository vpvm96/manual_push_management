import { Paper, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

// DataGrid의 컬럼 정의
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "recipient", headerName: "수신자", width: 200 },
  { field: "title", headerName: "제목", width: 300 },
  { field: "sentAt", headerName: "발송일시", width: 180 },
  { field: "status", headerName: "상태", width: 120 },
];

// 임시 데이터
const rows = [
  {
    id: 1,
    recipient: "test1@example.com",
    title: "테스트 메일 1",
    sentAt: "2025-07-12 10:30",
    status: "성공",
  },
  {
    id: 2,
    recipient: "test2@example.com",
    title: "테스트 메일 2",
    sentAt: "2025-07-12 11:00",
    status: "실패",
  },
];

export const EmailHistoryTable = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        발송 내역
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
        />
      </div>
    </Paper>
  );
};
