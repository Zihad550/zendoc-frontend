"use client";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicationIcon from "@mui/icons-material/Medication";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SecurityIcon from "@mui/icons-material/Security";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

// Service features data
const features = [
  {
    id: 1,
    title: "24/7 Online Booking",
    description:
      "Schedule appointments anytime, day or night, with our convenient online booking system.",
    icon: <ScheduleIcon fontSize="large" />,
  },
  {
    id: 2,
    title: "E-Prescriptions",
    description:
      "Get prescriptions sent directly to your preferred pharmacy after your consultation.",
    icon: <MedicationIcon fontSize="large" />,
  },
  {
    id: 3,
    title: "Virtual Consultations",
    description:
      "Connect with healthcare professionals from the comfort of your home via secure video calls.",
    icon: <VideoCameraFrontIcon fontSize="large" />,
  },
  {
    id: 4,
    title: "Comprehensive Care",
    description:
      "Access a wide range of medical services from primary care to specialized treatments.",
    icon: <LocalHospitalIcon fontSize="large" />,
  },
  {
    id: 5,
    title: "Data Security",
    description:
      "Your medical information is protected with advanced encryption and security protocols.",
    icon: <SecurityIcon fontSize="large" />,
  },
  {
    id: 6,
    title: "Transparent Pricing",
    description:
      "Clear pricing information for all services with no hidden fees or unexpected charges.",
    icon: <AccountBalanceWalletIcon fontSize="large" />,
  },
];

const ServicesFeatures = () => {
  const theme = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <Box
        sx={{
          py: 10,
          bgcolor:
            theme.palette.mode === "dark"
              ? theme.palette.background.default
              : theme.palette.grey[50],
        }}
      >
        <Container maxWidth="lg">
          {/* Section Title */}
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              component="span"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                fontSize: "1.1rem",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Why Choose Us
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                my: 2,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Our Healthcare Platform Features
            </Typography>
            <Box
              sx={{
                width: 80,
                height: 4,
                backgroundColor: "primary.main",
                mx: "auto",
                mb: 3,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                maxWidth: "700px",
                mx: "auto",
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
              }}
            >
              Discover what sets our healthcare services apart and why patients
              choose us for their medical needs
            </Typography>
          </Box>

          {/* Features Grid */}
          <Grid container spacing={4}>
            {features.map((feature) => (
              <Grid key={feature.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  style={{ height: "100%" }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: "100%",
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor:
                        theme.palette.mode === "dark"
                          ? theme.palette.grey[800]
                          : theme.palette.grey[200],
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 10px 30px rgba(0,0,0,0.3)"
                            : "0 10px 30px rgba(0,0,0,0.08)",
                        borderColor: "primary.main",
                        transform: "translateY(-5px)",
                        "& .feature-icon": {
                          color: "white",
                          backgroundColor: "primary.main",
                        },
                      },
                    }}
                  >
                    <Box
                      className="feature-icon"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? theme.palette.primary.dark
                            : theme.palette.primary.light,
                        color:
                          theme.palette.mode === "dark"
                            ? theme.palette.primary.light
                            : theme.palette.primary.main,
                        mb: 3,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        fontSize: { xs: "1.25rem", md: "1.5rem" },
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </motion.div>
  );
};

export default ServicesFeatures;
