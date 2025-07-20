"use client";

import { AnimatedSection, animationVariants } from "@/components/animation";
import {
  Assignment,
  Download,
  Medication,
  TrendingUp,
  Visibility,
  Warning,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "motion/react";

// Mock medical data
const mockMedicalData = {
  vitals: {
    bloodPressure: {
      value: "120/80",
      status: "normal",
      lastChecked: "2024-01-10",
    },
    heartRate: { value: "72 bpm", status: "normal", lastChecked: "2024-01-10" },
    weight: { value: "65 kg", status: "normal", lastChecked: "2024-01-08" },
    temperature: {
      value: "36.5°C",
      status: "normal",
      lastChecked: "2024-01-10",
    },
  },
  allergies: [
    {
      name: "Penicillin",
      severity: "High",
      reaction: "Rash, breathing difficulty",
    },
    { name: "Peanuts", severity: "Medium", reaction: "Swelling, hives" },
  ],
  medications: [
    {
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribed: "2024-01-05",
    },
    {
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribed: "2023-12-15",
    },
  ],
  labResults: [
    {
      test: "Complete Blood Count",
      date: "2024-01-10",
      status: "Normal",
      downloadable: true,
    },
    {
      test: "Lipid Panel",
      date: "2024-01-08",
      status: "High Cholesterol",
      downloadable: true,
    },
    {
      test: "Glucose Test",
      date: "2024-01-05",
      status: "Normal",
      downloadable: true,
    },
  ],
  appointments: [
    {
      date: "2024-01-15",
      doctor: "Dr. Smith",
      specialty: "Cardiology",
      status: "Upcoming",
    },
    {
      date: "2024-01-08",
      doctor: "Dr. Johnson",
      specialty: "General Medicine",
      status: "Completed",
    },
  ],
};

const MedicalRecordsTab = () => {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "normal":
        return "success";
      case "high":
      case "high cholesterol":
        return "warning";
      case "critical":
        return "error";
      default:
        return "default";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Vital Signs */}
      <Grid size={12}>
        <AnimatedSection variants={animationVariants.fadeInUp} delay={0.1}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.02)"
                  : "rgba(255, 255, 255, 0.8)",
              border:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.08)"
                  : "1px solid rgba(0, 0, 0, 0.08)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <Avatar
                  sx={{
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(76, 175, 80, 0.2)"
                        : "rgba(76, 175, 80, 0.1)",
                    color:
                      theme.palette.mode === "dark"
                        ? "#81c784"
                        : "success.main",
                  }}
                >
                  <TrendingUp />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Vital Signs
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your latest health metrics
                  </Typography>
                </Box>
              </Box>
              <Grid container spacing={2}>
                {Object.entries(mockMedicalData.vitals).map(([key, vital]) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={key}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          textAlign: "center",
                          borderRadius: 2,
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.05)"
                              : "rgba(255, 255, 255, 0.6)",
                          border:
                            theme.palette.mode === "dark"
                              ? "1px solid rgba(255, 255, 255, 0.1)"
                              : "1px solid rgba(0, 0, 0, 0.05)",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color:
                              theme.palette.mode === "dark"
                                ? "#e3f2fd"
                                : "text.primary",
                            mb: 1,
                          }}
                        >
                          {vital.value}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            textTransform: "capitalize",
                            mb: 1,
                            color:
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.8)"
                                : "text.secondary",
                          }}
                        >
                          {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                        </Typography>
                        <Chip
                          label={vital.status}
                          size="small"
                          color={getStatusColor(vital.status)}
                          sx={{ mb: 1 }}
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          Last checked: {vital.lastChecked}
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </AnimatedSection>
      </Grid>
      {/* Allergies & Medications */}
      <Grid size={{ xs: 12, md: 6 }}>
        <AnimatedSection variants={animationVariants.slideFromLeft} delay={0.2}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.02)"
                  : "rgba(255, 255, 255, 0.8)",
              border:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.08)"
                  : "1px solid rgba(0, 0, 0, 0.08)",
              backdropFilter: "blur(10px)",
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <Avatar
                  sx={{
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(244, 67, 54, 0.2)"
                        : "rgba(244, 67, 54, 0.1)",
                    color:
                      theme.palette.mode === "dark" ? "#ef5350" : "error.main",
                  }}
                >
                  <Warning />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Allergies
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Known allergic reactions
                  </Typography>
                </Box>
              </Box>
              <List sx={{ p: 0 }}>
                {mockMedicalData.allergies.map((allergy, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ListItem
                      sx={{
                        px: 0,
                        py: 2,
                        borderBottom:
                          index < mockMedicalData.allergies.length - 1
                            ? `1px solid ${
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.1)"
                                  : "rgba(0, 0, 0, 0.1)"
                              }`
                            : "none",
                      }}
                    >
                      <ListItemIcon>
                        <Warning
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#ef5350"
                                : "error.main",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 600 }}
                            >
                              {allergy.name}
                            </Typography>
                            <Chip
                              label={allergy.severity}
                              size="small"
                              color={getSeverityColor(allergy.severity)}
                            />
                          </Box>
                        }
                        secondary={allergy.reaction}
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </CardContent>
          </Card>
        </AnimatedSection>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <AnimatedSection
          variants={animationVariants.slideFromRight}
          delay={0.2}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.02)"
                  : "rgba(255, 255, 255, 0.8)",
              border:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.08)"
                  : "1px solid rgba(0, 0, 0, 0.08)",
              backdropFilter: "blur(10px)",
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <Avatar
                  sx={{
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(33, 150, 243, 0.2)"
                        : "rgba(33, 150, 243, 0.1)",
                    color:
                      theme.palette.mode === "dark"
                        ? "#64b5f6"
                        : "primary.main",
                  }}
                >
                  <Medication />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Current Medications
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active prescriptions
                  </Typography>
                </Box>
              </Box>
              <List sx={{ p: 0 }}>
                {mockMedicalData.medications.map((medication, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ListItem
                      sx={{
                        px: 0,
                        py: 2,
                        borderBottom:
                          index < mockMedicalData.medications.length - 1
                            ? `1px solid ${
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.1)"
                                  : "rgba(0, 0, 0, 0.1)"
                              }`
                            : "none",
                      }}
                    >
                      <ListItemIcon>
                        <Medication
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#64b5f6"
                                : "primary.main",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {medication.name}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {medication.dosage} - {medication.frequency}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Prescribed: {medication.prescribed}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </CardContent>
          </Card>
        </AnimatedSection>
      </Grid>
      {/* Lab Results */}
      <Grid size={12}>
        <AnimatedSection variants={animationVariants.fadeInUp} delay={0.3}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.02)"
                  : "rgba(255, 255, 255, 0.8)",
              border:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.08)"
                  : "1px solid rgba(0, 0, 0, 0.08)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <Avatar
                  sx={{
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(156, 39, 176, 0.2)"
                        : "rgba(156, 39, 176, 0.1)",
                    color:
                      theme.palette.mode === "dark"
                        ? "#ba68c8"
                        : "secondary.main",
                  }}
                >
                  <Assignment />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Lab Results
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Recent test results and reports
                  </Typography>
                </Box>
              </Box>
              <List sx={{ p: 0 }}>
                {mockMedicalData.labResults.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ListItem
                      sx={{
                        px: 0,
                        py: 2,
                        borderBottom:
                          index < mockMedicalData.labResults.length - 1
                            ? `1px solid ${
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.1)"
                                  : "rgba(0, 0, 0, 0.1)"
                              }`
                            : "none",
                      }}
                    >
                      <ListItemIcon>
                        <Assignment
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#ba68c8"
                                : "secondary.main",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 600 }}
                            >
                              {result.test}
                            </Typography>
                            <Chip
                              label={result.status}
                              size="small"
                              color={getStatusColor(result.status)}
                            />
                          </Box>
                        }
                        secondary={`Date: ${result.date}`}
                      />
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          size="small"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#64b5f6"
                                : "primary.main",
                          }}
                        >
                          <Visibility />
                        </IconButton>
                        {result.downloadable && (
                          <IconButton
                            size="small"
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "#81c784"
                                  : "success.main",
                            }}
                          >
                            <Download />
                          </IconButton>
                        )}
                      </Box>
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </CardContent>
          </Card>
        </AnimatedSection>
      </Grid>
    </Grid>
  );
};

export default MedicalRecordsTab;
