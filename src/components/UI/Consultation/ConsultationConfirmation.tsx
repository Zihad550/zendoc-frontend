import { Doctor } from "@/types/doctor";
import { AccessTime, Event, Info, MedicalServices } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

interface ConsultationConfirmationProps {
  doctor: Doctor;
  appointmentSlot: {
    id: string;
    time: string;
    date: string;
    startDate?: string;
    endDate?: string;
  };
  details: {
    symptoms: string;
    duration: string;
    previousTreatments: string;
    additionalNotes: string;
  };
}

// Function to convert duration code to readable text
const formatDuration = (durationCode: string): string => {
  const durationMap: Record<string, string> = {
    "less-than-week": "Less than a week",
    "one-two-weeks": "1-2 weeks",
    "two-four-weeks": "2-4 weeks",
    "one-three-months": "1-3 months",
    "three-six-months": "3-6 months",
    "more-than-six-months": "More than 6 months",
  };

  return durationMap[durationCode] || durationCode;
};

export default function ConsultationConfirmation({
  doctor,
  appointmentSlot,
  details,
}: ConsultationConfirmationProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Confirm Your Consultation
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Please review the details of your consultation before confirming
      </Typography>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mt: 2, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }} display="flex" alignItems="center" gap={2}>
            <Avatar
              src={doctor.profilePhoto}
              alt={doctor.name}
              sx={{ width: 60, height: 60 }}
            />
            <Box>
              <Typography variant="h6">{doctor.name}</Typography>
              <Chip
                label={doctor.designation}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          <Grid
            size={{ xs: 12, sm: 6 }}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Event color="primary" />
            <Typography variant="body1">{appointmentSlot.date}</Typography>
          </Grid>

          <Grid
            size={{ xs: 12, sm: 6 }}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <AccessTime color="primary" />
            <Typography variant="body1">{appointmentSlot.time}</Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, display: "flex", alignItems: "center" }}
            >
              <MedicalServices sx={{ mr: 1 }} fontSize="small" />
              Consultation Information
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Paper
              variant="outlined"
              sx={{ p: 2, backgroundColor: "background.default" }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Symptoms
              </Typography>
              <Typography variant="body1" paragraph>
                {details.symptoms}
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Duration
                  </Typography>
                  <Typography variant="body1">
                    {formatDuration(details.duration)}
                  </Typography>
                </Grid>

                {details.previousTreatments && (
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Previous Treatments
                    </Typography>
                    <Typography variant="body1">
                      {details.previousTreatments}
                    </Typography>
                  </Grid>
                )}
              </Grid>

              {details.additionalNotes && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Additional Notes
                  </Typography>
                  <Typography variant="body1">
                    {details.additionalNotes}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              sx={{ backgroundColor: "info.light", p: 2, borderRadius: 1 }}
            >
              <Info color="info" />
              <Typography variant="body2">
                By confirming this appointment, you agree to our terms of
                service and cancellation policy.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
