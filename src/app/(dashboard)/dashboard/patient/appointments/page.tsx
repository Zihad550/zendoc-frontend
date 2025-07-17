"use client";
import PhChips from "@/components/Shared/PhChip/PhChips";
import { useGetMyAppointmentsQuery } from "@/redux/features/appointment/appointmentApi";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import Link from "next/link";

const PatientAppointmentsPage = () => {
  const { data, isLoading } = useGetMyAppointmentsQuery({});
  const appointments = data?.data;

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Doctor Name",
      flex: 1,
      renderCell: ({ row }) => {
        return row.doctor.name;
      },
    },
    {
      field: "appointmentDate",
      headerName: "Appointment Date",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return dayjs(row.schedule.startDate).format("hh:mm a");
      },
    },
    {
      field: "appointmentTime",
      headerName: "Appointment Time",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return dayjs(row.schedule.startDate).format("hh:mm a");
      },
    },

    {
      field: "paymentStatus",
      headerName: "Payment Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return row.paymentStatus === "PAID" ? (
          <PhChips label={row.paymentStatus} type="success" />
        ) : (
          <PhChips label={row.paymentStatus} type="error" />
        );
      },
    },
    {
      field: "action",
      headerName: "Join",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton
            component={Link}
            href={`/video?videoCallingId=${row?.videoCallingId}`}
            // disabled={row.paymentStatus === "UNPAID"}
          >
            <VideocamIcon
              sx={{
                color: row.paymentStatus === "PAID" ? "primary.main" : "",
              }}
            />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid
            rows={appointments ?? []}
            columns={columns}
            loading={isLoading}
          />
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
    </Box>
  );
};

export default PatientAppointmentsPage;
