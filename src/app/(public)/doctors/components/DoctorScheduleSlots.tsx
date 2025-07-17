"use client";
import { useCreateAppointmentMutation } from "@/redux/features/appointment/appointmentApi";
import { useGetAllDocSchedulesQuery } from "@/redux/features/doctorSchedule/doctorScheduleApi";
import { useInitialPaymentMutation } from "@/redux/features/payment/paymentApi";
import { DoctorSchedule } from "@/types/doctorSchedules";

import { dateFormatter } from "@/utils/dateFormatter";

import { alpha, Box, Button, Stack, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
dayjs.extend(utc);

const DoctorScheduleSlots = ({ id }: { id: string }) => {
  const theme = useTheme();
  const [scheduleId, setScheduleId] = useState("");

  const router = useRouter();

  const query: Record<string, any> = {};

  query["doctorId"] = id;
  query["isBooked"] = false;

  query["startDate"] = dayjs(new Date())
    .utc()
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .toISOString();

  query["endDate"] = dayjs(new Date())
    .utc()
    .hour(23)
    .minute(59)
    .second(59)
    .millisecond(999)
    .toISOString();

  const { data, isLoading } = useGetAllDocSchedulesQuery({ ...query });

  const currentDate = new Date();
  const today = currentDate.toLocaleDateString("en-US", { weekday: "long" });

  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);

  // query params for next date
  query.startDate = dayjs(nextDate)
    .utc()
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .toISOString();

  query.endDate = dayjs(nextDate)
    .utc()
    .hour(23)
    .minute(59)
    .second(59)
    .millisecond(999)
    .toISOString();

  // const { data: nextDoctorSchedules, isLoading: loading } =
  //   useGetAllDocSchedulesQuery({
  //     ...query,
  //   });

  const todaySchedules = data?.data || [];
  // const tomorrowSchedules = nextDoctorSchedules?.data;

  const [createAppointment] = useCreateAppointmentMutation();
  const [initialPayment] = useInitialPaymentMutation();

  const handleBookAppointment = async () => {
    const toastId = toast.loading("Booking appointment...");
    try {
      if (id && scheduleId) {
        const res = await createAppointment({
          doctorId: id,
          scheduleId,
        }).unwrap();

        if (res.data.id) {
          toast.success("Appointment booked successfully!", { id: toastId });
          const response = await initialPayment(res.data.id).unwrap();

          if (response.paymentUrl) {
            router.push(response.paymentUrl);
          }
        }
      }
    } catch {
      toast.error("Failed to book appointment!", { id: toastId });
    }
  };

  return (
    <Box mb={5}>
      <Box
        sx={{
          bgcolor:
            theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : "white",
          p: 3,
          mt: 1,
          borderRadius: 2,
          border:
            theme.palette.mode === "dark"
              ? `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              : "none",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 12px rgba(0, 0, 0, 0.15)"
              : "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" mb={3} color="primary.main">
          Availability
        </Typography>
        <Typography variant="h6" fontSize={16}>
          <b>Today: {dateFormatter(currentDate.toISOString()) + " " + today}</b>
        </Typography>
        <Box
          sx={{
            borderBottom:
              theme.palette.mode === "dark"
                ? `2px dashed ${alpha(theme.palette.primary.main, 0.3)}`
                : "2px dashed #d0d0d0",
            mt: 2,
            mb: 3,
          }}
        />
        <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
          {todaySchedules?.length ? (
            isLoading ? (
              "Loading..."
            ) : (
              todaySchedules?.map((doctorSchedule: DoctorSchedule) => {
                const formatted = `${dayjs(
                  doctorSchedule?.schedule?.startDateTime,
                ).format("hh:mm a")} - ${dayjs(
                  doctorSchedule?.schedule?.endDateTime,
                ).format("hh:mm a")}`;

                return (
                  <Button
                    key={doctorSchedule?.scheduleId}
                    color="primary"
                    onClick={() => setScheduleId(doctorSchedule?.scheduleId)}
                    variant={`${
                      doctorSchedule?.scheduleId === scheduleId
                        ? "contained"
                        : "outlined"
                    }`}
                  >
                    {formatted}
                  </Button>
                );
              })
            )
          ) : (
            <Typography
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.error.light
                    : "red",
                fontStyle: "italic",
                p: 2,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.error.main, 0.1)
                    : alpha("#ff0000", 0.05),
                borderRadius: 1,
                border:
                  theme.palette.mode === "dark"
                    ? `1px solid ${alpha(theme.palette.error.main, 0.2)}`
                    : `1px solid ${alpha("#ff0000", 0.1)}`,
              }}
            >
              No Schedule is Available Today!
            </Typography>
          )}
        </Stack>
        {/* <Typography variant="h6" fontSize={16} mt={5}>
          <b>
            Tomorrow: {dateFormatter(nextDate.toISOString()) + " " + tomorrow}
          </b>
        </Typography> */}
        <Box
          sx={{
            borderBottom:
              theme.palette.mode === "dark"
                ? `2px dashed ${alpha(theme.palette.primary.main, 0.3)}`
                : "2px dashed #d0d0d0",
            mt: 2,
            mb: 3,
          }}
        />
        {/* tomorrow schedules */}
        {/* <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
          {tomorrowSchedules?.length ? (
            isLoading ? (
              "Loading..."
            ) : (
              tomorrowSchedules?.map((doctorSchedule: DoctorSchedule) => {
                const formatted = `${dayjs(doctorSchedule?.schedule?.startDate).format("hh:mm a")} - ${dayjs(doctorSchedule?.schedule?.endDate).format("hh:mm a")}`;

                return (
                  <Button
                    key={doctorSchedule?.scheduleId}
                    color="primary"
                    onClick={() => setScheduleId(doctorSchedule?.scheduleId)}
                    variant={`${
                      doctorSchedule?.scheduleId === scheduleId
                        ? "contained"
                        : "outlined"
                    }`}
                  >
                    {formatted}
                  </Button>
                );
              })
            )
          ) : (
            <span style={{ color: "red" }}>
              No Schedule is Available Today!
            </span>
          )}
        </Stack> */}
      </Box>

      <Button
        onClick={handleBookAppointment}
        sx={{ display: "block", mx: "auto" }}
        disabled={!todaySchedules.length}
      >
        Book Appointment Now
      </Button>
    </Box>
  );
};

export default DoctorScheduleSlots;
