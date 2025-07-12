"use client";

import AppointmentScheduleStep from "@/components/UI/Consultation/AppointmentScheduleStep";
import ConsultationConfirmation from "@/components/UI/Consultation/ConsultationConfirmation";
import ConsultationDetailsStep from "@/components/UI/Consultation/ConsultationDetailsStep";
import ConsultationHero from "@/components/UI/Consultation/ConsultationHero";
import DoctorSelectionStep from "@/components/UI/Consultation/DoctorSelectionStep";
import { ArrowBack, ArrowForward, Check } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const steps = [
  "Select Doctor",
  "Schedule Appointment",
  "Consultation Details",
  "Confirmation",
];

export default function ConsultationPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [consultationDetails, setConsultationDetails] = useState<any>({
    symptoms: "",
    duration: "",
    previousTreatments: "",
    additionalNotes: "",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedDoctor(null);
    setSelectedSlot(null);
    setConsultationDetails({
      symptoms: "",
      duration: "",
      previousTreatments: "",
      additionalNotes: "",
    });
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <DoctorSelectionStep
            selectedDoctor={selectedDoctor}
            setSelectedDoctor={setSelectedDoctor}
          />
        );
      case 1:
        return (
          <AppointmentScheduleStep
            selectedDoctor={selectedDoctor}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />
        );
      case 2:
        return (
          <ConsultationDetailsStep
            consultationDetails={consultationDetails}
            setConsultationDetails={setConsultationDetails}
          />
        );
      case 3:
        return (
          <ConsultationConfirmation
            doctor={selectedDoctor}
            appointmentSlot={selectedSlot}
            details={consultationDetails}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box sx={{ pb: 6, bgcolor: "background.default" }}>
      <ConsultationHero />

      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 2,
            background:
              "linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95))",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "primary.main",
              mb: 4,
            }}
          >
            Book Your Consultation
          </Typography>

          <Stepper
            activeStep={activeStep}
            alternativeLabel={!isMobile}
            orientation={isMobile ? "vertical" : "horizontal"}
            sx={{ mb: 4 }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h5" gutterBottom>
                Thank you for your booking!
              </Typography>
              <Typography variant="body1" paragraph>
                Your consultation has been scheduled. You will receive a
                confirmation email shortly.
              </Typography>
              <Button
                onClick={handleReset}
                variant="contained"
                color="primary"
                startIcon={<ArrowBack />}
                sx={{ mt: 2 }}
              >
                Book Another Consultation
              </Button>
            </Box>
          ) : (
            <>
              <Box sx={{ py: 2 }}>{getStepContent(activeStep)}</Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
              >
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  startIcon={<ArrowBack />}
                  variant="outlined"
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={
                    activeStep === steps.length - 1
                      ? () => setActiveStep(steps.length)
                      : handleNext
                  }
                  endIcon={
                    activeStep === steps.length - 1 ? (
                      <Check />
                    ) : (
                      <ArrowForward />
                    )
                  }
                  disabled={
                    (activeStep === 0 && !selectedDoctor) ||
                    (activeStep === 1 && !selectedSlot) ||
                    (activeStep === 2 && !consultationDetails.symptoms)
                  }
                >
                  {activeStep === steps.length - 1 ? "Confirm Booking" : "Next"}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
