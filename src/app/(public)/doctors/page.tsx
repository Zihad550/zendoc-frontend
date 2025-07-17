"use client";
import Spinner from "@/components/Shared/Spinner/Spinner";
import DoctorCard from "@/components/UI/Doctor/DoctorCard";
import { useGetAllDoctorsQuery } from "@/redux/features/doctor/doctorApi";
import { useDebounced } from "@/redux/hooks";
import { Doctor } from "@/types/doctor";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SearchIcon from "@mui/icons-material/Search";
import {
  alpha,
  Box,
  Container,
  Fade,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { motion, Variants } from "motion/react";
import { useRef, useState } from "react";
import NoDoctorsFound from "./components/NoDoctorsFound";

// Animation variants for doctors page
const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const Doctors = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const heroRef = useRef(null);

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) query["searchTerm"] = searchTerm;

  const { data, isLoading } = useGetAllDoctorsQuery(query);

  if (isLoading) return <Spinner />;
  const doctors = data?.data;

  const stats = [
    {
      label: "Certified Doctors",
      value: doctors?.length || 0,
      icon: MedicalServicesIcon,
    },
    { label: "Specialties", value: "25+", icon: LocalHospitalIcon },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={pageVariants}>
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#0A0E27" : "#F7FAFC",
          minHeight: "100vh",
          py: 6,
          // Add subtle gradient background for dark theme
          backgroundImage: (theme) =>
            theme.palette.mode === "dark"
              ? `radial-gradient(circle at 20% 20%, ${alpha(theme.palette.primary.main, 0.06)} 0%, transparent 50%),
               radial-gradient(circle at 80% 80%, ${alpha(theme.palette.primary.main, 0.04)} 0%, transparent 50%)`
              : "none",
        }}
      >
        <Container maxWidth="lg">
          {/* Hero Section with Search */}
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate="visible"
            variants={heroVariants}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                mb: 5,
                overflow: "hidden",
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#161925" : "#ffffff",
                boxShadow: (theme) =>
                  theme.palette.mode === "dark"
                    ? "0 10px 40px rgba(0,0,0,0.2)"
                    : "0 10px 40px rgba(0,0,0,0.06)",
                border: (theme) =>
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.06)"
                    : "none",
              }}
            >
              <Grid container>
                <Grid size={{ xs: 12, md: 7 }} sx={{ p: { xs: 4, md: 6 } }}>
                  <Fade in={true} timeout={1000}>
                    <Box>
                      <Typography
                        component="span"
                        sx={{
                          color: "primary.main",
                          fontWeight: 600,
                          fontSize: "0.95rem",
                          textTransform: "uppercase",
                          letterSpacing: 1,
                          display: "block",
                          mb: 1,
                        }}
                      >
                        Healthcare Professionals
                      </Typography>

                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          fontSize: { xs: "2rem", md: "2.5rem" },
                          background: (theme) =>
                            theme.palette.mode === "dark"
                              ? `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`
                              : "linear-gradient(90deg, #1586FD 0%, #44A4FF 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          textShadow: (theme) =>
                            theme.palette.mode === "dark"
                              ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`
                              : "none",
                        }}
                      >
                        Find Specialists for Your Health Needs
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          mb: 4,
                          fontSize: "1.1rem",
                          color: "text.secondary",
                          maxWidth: "90%",
                        }}
                      >
                        Connect with top-rated healthcare professionals
                        specializing in various medical fields. Book
                        appointments with verified doctors tailored to your
                        specific health requirements.
                      </Typography>

                      {/* Search Bar */}
                      <Paper
                        component="form"
                        sx={{
                          p: "6px 12px",
                          display: "flex",
                          alignItems: "center",
                          width: { xs: "100%", md: "90%" },
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark"
                              ? "#1A1D2E"
                              : "#ffffff",
                          border: (theme) =>
                            theme.palette.mode === "dark"
                              ? "1px solid rgba(255, 255, 255, 0.05)"
                              : "1px solid #E0E7FF",
                          borderRadius: 8,
                          boxShadow: (theme) =>
                            theme.palette.mode === "dark"
                              ? `0 4px 14px ${alpha(theme.palette.primary.main, 0.1)}`
                              : "0 4px 14px rgba(21, 134, 253, 0.1)",
                          mb: 3,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: (theme) =>
                              theme.palette.mode === "dark"
                                ? `0 6px 20px ${alpha(theme.palette.primary.main, 0.15)}`
                                : "0 6px 20px rgba(21, 134, 253, 0.15)",
                            borderColor: (theme) =>
                              theme.palette.mode === "dark"
                                ? alpha(theme.palette.primary.main, 0.15)
                                : "#E0E7FF",
                          },
                        }}
                      >
                        <IconButton sx={{ p: "10px" }} aria-label="search">
                          <SearchIcon sx={{ color: "primary.main" }} />
                        </IconButton>
                        <InputBase
                          sx={{
                            ml: 1,
                            flex: 1,
                            fontSize: "1rem",
                            color: (theme) =>
                              theme.palette.mode === "dark"
                                ? theme.palette.text.primary
                                : "inherit",
                            "& .MuiInputBase-input::placeholder": {
                              color: (theme) =>
                                theme.palette.mode === "dark"
                                  ? alpha(theme.palette.text.primary, 0.5)
                                  : "inherit",
                            },
                          }}
                          placeholder="Search by doctor name"
                          inputProps={{ "aria-label": "search doctors" }}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </Paper>

                      {/* Stats */}
                      <Grid container spacing={3} sx={{ mt: 2 }}>
                        {stats.map((stat, index) => (
                          <Grid size={{ xs: 6, sm: 6, md: 6 }} key={index}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: "12px",
                                  bgcolor: (theme) =>
                                    theme.palette.mode === "dark"
                                      ? alpha(theme.palette.primary.main, 0.08)
                                      : "rgba(21, 134, 253, 0.1)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  border: (theme) =>
                                    theme.palette.mode === "dark"
                                      ? `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                                      : "none",
                                }}
                              >
                                <stat.icon
                                  sx={{ color: "primary.main", fontSize: 28 }}
                                />
                              </Box>
                              <Box>
                                <Typography
                                  variant="h4"
                                  fontWeight={700}
                                  sx={{ mb: 0.5, color: "primary.main" }}
                                >
                                  {stat.value}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {stat.label}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Fade>
                </Grid>

                <Grid
                  size={{ xs: 12, md: 5 }}
                  sx={{ display: { xs: "none", md: "block" } }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      backgroundImage: `url(https://res.cloudinary.com/dlem1hpam/image/upload/v1752303475/file-1752303471304-539084905.png)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderTopRightRadius: 12,
                      borderBottomRightRadius: 12,
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: (theme) =>
                          theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, rgba(21, 134, 253, 0.2) 0%, rgba(21, 134, 253, 0.4) 100%)"
                            : "linear-gradient(135deg, rgba(21, 134, 253, 0.2) 0%, rgba(21, 134, 253, 0.4) 100%)",
                        borderTopRightRadius: 12,
                        borderBottomRightRadius: 12,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </motion.div>

          {/* Filter by Specialties */}
          {/* {searchParams.specialties && (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              mb: 4,
              background: "white",
              boxShadow: "0 6px 24px rgba(0,0,0,0.05)",
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Filter by Specialty
              </Typography>
              <ScrollCategory specialties={searchParams.specialties} />
            </Box>
          </Paper>
        )} */}

          {/* Results Count & Sorting */}
          {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="body1" fontWeight={500}>
            {data?.data?.length || 0}{" "}
            {data?.data?.length === 1 ? "Doctor" : "Doctors"} Found
            {searchParams.specialties && (
              <Chip
                label={`Specialty: ${searchParams.specialties}`}
                size="small"
                variant="outlined"
                color="primary"
                sx={{ ml: 1.5 }}
              />
            )}
          </Typography>
        </Box> */}

          {/* Doctor Cards */}
          <Box>
            <Grid container spacing={3}>
              {doctors?.length ? (
                doctors.map((doctor: Doctor) => (
                  <Grid size={{ xs: 12 }} key={doctor.id}>
                    <Paper
                      elevation={0}
                      sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                        backgroundColor: (theme) =>
                          theme.palette.mode === "dark" ? "#1A1D36" : "#ffffff",
                        border: (theme) =>
                          theme.palette.mode === "dark"
                            ? "1px solid rgba(255, 255, 255, 0.1)"
                            : "none",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: (theme) =>
                            theme.palette.mode === "dark"
                              ? "0 12px 30px rgba(0,0,0,0.4)"
                              : "0 12px 30px rgba(0,0,0,0.08)",
                          transform: "translateY(-3px)",
                          borderColor: (theme) =>
                            theme.palette.mode === "dark"
                              ? alpha(theme.palette.primary.main, 0.3)
                              : "transparent",
                        },
                      }}
                    >
                      <DoctorCard doctor={doctor} />
                    </Paper>
                  </Grid>
                ))
              ) : (
                <NoDoctorsFound />
              )}
            </Grid>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Doctors;
