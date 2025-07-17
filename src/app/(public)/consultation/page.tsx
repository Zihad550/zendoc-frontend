"use client";

import SectionTitle from "@/components/Shared/SectionTitle";
import ConsultationDetailsStep from "@/components/UI/Consultation/ConsultationDetailsStep";
import ConsultationHero from "@/components/UI/Consultation/ConsultationHero";
import DoctorSelectionStep from "@/components/UI/Consultation/DoctorSelectionStep";
import { ArrowBack, ArrowForward, Check } from "@mui/icons-material";
import {
  alpha,
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
import { motion } from "motion/react";
import { useState } from "react";

const steps = ["Select Doctor", "Schedule Appointment"];

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
          <ConsultationDetailsStep
            doctorId={selectedDoctor.id}
            consultationDetails={consultationDetails}
            setConsultationDetails={setConsultationDetails}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box
      sx={{
        pb: 6,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#0A0E27" : "background.default",
        minHeight: "100vh",
        // Add subtle ambient lighting for dark theme
        backgroundImage: (theme) =>
          theme.palette.mode === "dark"
            ? `radial-gradient(circle at 15% 20%, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 50%),
             radial-gradient(circle at 85% 80%, ${alpha(theme.palette.primary.main, 0.03)} 0%, transparent 50%)`
            : "none",
      }}
    >
      <ConsultationHero />

      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 3,
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #1A1D36 0%, #1E2139 100%)"
                  : "linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95))",
              backdropFilter: "blur(10px)",
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 8px 32px rgba(0, 0, 0, 0.4)"
                  : "0 8px 32px rgba(0, 0, 0, 0.1)",
              border: (theme) =>
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.08)"
                  : "none",
              // Add subtle glow effect for dark theme
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? `radial-gradient(circle at 50% 0%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 50%)`
                    : "none",
                borderRadius: 3,
                zIndex: -1,
                pointerEvents: "none",
              },
              position: "relative",
            }}
          >
            <SectionTitle
              title="Book Your Consultation"
              align="center"
              size="large"
              containerSx={{ mb: 4 }}
            />

            <Stepper
              activeStep={activeStep}
              alternativeLabel={!isMobile}
              orientation={isMobile ? "vertical" : "horizontal"}
              sx={{
                mb: 4,
                // Enhanced stepper styling for dark theme
                "& .MuiStepLabel-root .Mui-completed": {
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.light
                      : "inherit",
                },
                "& .MuiStepLabel-root .Mui-active": {
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.main
                      : "inherit",
                },
                "& .MuiStepConnector-root": {
                  "& .MuiStepConnector-line": {
                    borderColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? alpha(theme.palette.primary.main, 0.3)
                        : "inherit",
                  },
                },
                "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
                  borderColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.main
                      : "inherit",
                },
                "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line":
                  {
                    borderColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? theme.palette.primary.light
                        : "inherit",
                  },
              }}
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
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 4,
                  }}
                >
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    startIcon={<ArrowBack />}
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      py: 1.2,
                      fontWeight: 600,
                      textTransform: "none",
                      // Dark theme button styling
                      ...(theme) =>
                        theme.palette.mode === "dark" && {
                          borderColor: alpha(theme.palette.primary.main, 0.5),
                          color: theme.palette.primary.main,
                          "&:hover": {
                            borderColor: theme.palette.primary.main,
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.08,
                            ),
                          },
                        },
                    }}
                  >
                    Back
                  </Button>
                  {activeStep === 0 && (
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
                        (activeStep === 1 && !selectedSlot)
                      }
                      sx={{
                        borderRadius: 2,
                        px: 4,
                        py: 1.2,
                        fontWeight: 600,
                        textTransform: "none",
                        // Enhanced button styling for dark theme
                        ...(theme) =>
                          theme.palette.mode === "dark" && {
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                            boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                            "&:hover": {
                              background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                              boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                            },
                          },
                      }}
                    >
                      {activeStep === steps.length - 1 ? "" : "Next"}
                    </Button>
                  )}
                </Box>
              </>
            )}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
