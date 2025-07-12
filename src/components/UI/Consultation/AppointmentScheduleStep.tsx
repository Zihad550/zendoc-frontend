import MultipleSelectFieldChip from "@/app/(dashboard)/dashboard/doctor/schedules/components/MultipleSelectFieldChip";
import { useGetAllDoctorSchedulesQuery } from "@/redux/features/schedule/scheduleApi";
import { Doctor } from "@/types/doctor";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export function getTimeIn12HourFormat(dateTimeString: string): string {
  const date: Date = new Date(dateTimeString);
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  const ampm: string = hours >= 12 ? "PM" : "AM";
  const formattedHours: number = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes: string =
    minutes < 10 ? "0" + minutes : minutes.toString();
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

interface AppointmentScheduleStepProps {
  selectedDoctor: Doctor;
  selectedSlot: any;
  setSelectedSlot: (slot: any) => void;
}

export default function AppointmentScheduleStep({
  selectedDoctor,
  setSelectedSlot,
}: AppointmentScheduleStepProps) {
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).toISOString(),
  );
  const [selectedScheduleIds, setSelectedScheduleIds] = useState<string[]>([]);

  const query: Record<string, any> = {};
  if (!!selectedDate) {
    query["startDate"] = dayjs(selectedDate)
      .hour(0)
      .minute(0)
      .millisecond(0)
      .toISOString();
    query["endDate"] = dayjs(selectedDate)
      .hour(23)
      .minute(59)
      .millisecond(999)
      .toISOString();
  }

  const { data, isLoading } = useGetAllDoctorSchedulesQuery({
    params: query,
    email: selectedDoctor.email,
  });
  const schedules = data?.data || [];

  // Update selectedSlot when selectedScheduleIds changes
  useEffect(() => {
    if (selectedScheduleIds.length > 0 && schedules.length > 0) {
      const selectedSchedule = schedules.find(
        (schedule: any) => schedule.id === selectedScheduleIds[0],
      );
      if (!selectedSchedule) return;

      if (selectedSchedule) {
        setSelectedSlot({
          id: selectedSchedule.id,
          date: dayjs(selectedDate).format("YYYY-MM-DD"),
          time: `${getTimeIn12HourFormat(selectedSchedule.startDate)} - ${getTimeIn12HourFormat(selectedSchedule.endDate)}`,
          startDate: selectedSchedule.startDate,
          endDate: selectedSchedule.endDate,
        });
      }
    } else {
      setSelectedSlot(null);
    }
  }, [selectedScheduleIds, schedules, selectedDate, setSelectedSlot]);

  const handleDateChange = (newValue: any) => {
    setSelectedDate(dayjs(newValue).toISOString());
    setSelectedScheduleIds([]); // Reset selected schedule ids when date changes
  };

  if (!selectedDoctor) {
    return (
      <Typography variant="body1">Please select a doctor first.</Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Schedule with {selectedDoctor.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Select a date and time for your consultation
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ borderRadius: 2, p: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={dayjs(selectedDate)}
                onChange={handleDateChange}
                disablePast
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 2, borderRadius: 2, height: "100%" }}>
            <Typography
              variant="subtitle1"
              sx={{ mb: 2, display: "flex", alignItems: "center" }}
            >
              <AccessTimeIcon sx={{ mr: 1 }} />
              Available Time Slots
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {isLoading ? (
              <Typography variant="body2">
                Loading available slots...
              </Typography>
            ) : schedules && schedules.length > 0 ? (
              <MultipleSelectFieldChip
                schedules={schedules}
                selectedScheduleIds={selectedScheduleIds}
                setSelectedScheduleIds={setSelectedScheduleIds}
              />
            ) : (
              <Typography variant="body2">
                No available slots for the selected date.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
