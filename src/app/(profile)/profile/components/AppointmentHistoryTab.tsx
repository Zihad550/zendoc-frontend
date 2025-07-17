"use client";

import { AnimatedSection, animationVariants } from "@/components/animation";
import {
  AccessTime,
  CalendarToday,
  Cancel,
  CheckCircle,
  Download,
  Event,
  LocalHospital,
  LocationOn,
  Person,
  Schedule,
  Search,
  VideoCall,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Pagination,
  Paper,
  Rating,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "motion/react";
import React, { useState } from "react";

// Mock appointment data
const mockAppointments = [
  {
    id: "1",
    date: "2024-01-15",
    time: "10:00 AM",
    doctor: "Dr. Sarah Smith",
    specialty: "Cardiology",
    type: "In-person",
    status: "Completed",
    location: "Main Medical Center",
    duration: "30 min",
    rating: 5,
    notes: "Regular checkup - all results normal",
    prescription: "Continue current medication",
  },
  {
    id: "2",
    date: "2024-01-08",
    time: "2:30 PM",
    doctor: "Dr. Michael Johnson",
    specialty: "General Medicine",
    type: "Video Call",
    status: "Completed",
    location: "Online",
    duration: "20 min",
    rating: 4,
    notes: "Follow-up consultation",
    prescription: "Prescribed new medication",
  },
  {
    id: "3",
    date: "2024-01-20",
    time: "9:00 AM",
    doctor: "Dr. Emily Davis",
    specialty: "Dermatology",
    type: "In-person",
    status: "Upcoming",
    location: "Skin Care Clinic",
    duration: "45 min",
    rating: null,
    notes: "Routine skin examination",
    prescription: null,
  },
  {
    id: "4",
    date: "2024-01-03",
    time: "11:15 AM",
    doctor: "Dr. Robert Wilson",
    specialty: "Orthopedics",
    type: "In-person",
    status: "Cancelled",
    location: "Orthopedic Center",
    duration: "30 min",
    rating: null,
    notes: "Patient requested cancellation",
    prescription: null,
  },
  {
    id: "5",
    date: "2023-12-28",
    time: "3:45 PM",
    doctor: "Dr. Lisa Anderson",
    specialty: "Psychiatry",
    type: "Video Call",
    status: "Completed",
    location: "Online",
    duration: "60 min",
    rating: 5,
    notes: "Monthly therapy session",
    prescription: "Adjusted medication dosage",
  },
];

const AppointmentHistoryTab = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "success";
      case "upcoming":
        return "primary";
      case "cancelled":
        return "error";
      case "rescheduled":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle />;
      case "upcoming":
        return <Schedule />;
      case "cancelled":
        return <Cancel />;
      default:
        return <Event />;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "Video Call" ? <VideoCall /> : <LocalHospital />;
  };

  // Filter appointments based on search and filters
  const filteredAppointments = mockAppointments.filter((appointment) => {
    const matchesSearch =
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || appointment.status === statusFilter;
    const matchesType = typeFilter === "All" || appointment.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
  };

  return (
    <Box>
      {/* Header and Filters */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
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
                          ? "rgba(33, 150, 243, 0.2)"
                          : "rgba(33, 150, 243, 0.1)",
                      color:
                        theme.palette.mode === "dark"
                          ? "#64b5f6"
                          : "primary.main",
                    }}
                  >
                    <CalendarToday />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                      Appointment History
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      View and manage your past and upcoming appointments
                    </Typography>
                  </Box>
                </Box>

                {/* Search and Filters */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="small"
                    sx={{
                      flex: 1,
                      minWidth: 200,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.8)",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusFilter}
                      label="Status"
                      onChange={(e) => setStatusFilter(e.target.value)}
                      sx={{
                        borderRadius: 2,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.8)",
                      }}
                    >
                      <MenuItem value="All">All Status</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Upcoming">Upcoming</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={typeFilter}
                      label="Type"
                      onChange={(e) => setTypeFilter(e.target.value)}
                      sx={{
                        borderRadius: 2,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.8)",
                      }}
                    >
                      <MenuItem value="All">All Types</MenuItem>
                      <MenuItem value="In-person">In-person</MenuItem>
                      <MenuItem value="Video Call">Video Call</MenuItem>
                    </Select>
                  </FormControl>

                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    sx={{
                      borderRadius: 2,
                      borderColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.3)"
                          : "rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    Export
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </AnimatedSection>
        </Grid>
      </Grid>

      {/* Appointments List */}
      <AnimatedSection variants={animationVariants.fadeInUp} delay={0.2}>
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
          <CardContent sx={{ p: 0 }}>
            <List sx={{ p: 0 }}>
              {paginatedAppointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ListItem
                    sx={{
                      p: 4,
                      borderBottom:
                        index < paginatedAppointments.length - 1
                          ? `1px solid ${
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.1)"
                            }`
                          : "none",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 3,
                        }}
                      >
                        {/* Date and Time */}
                        <Box sx={{ minWidth: 120, textAlign: "center" }}>
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
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
                                mb: 0.5,
                              }}
                            >
                              {new Date(appointment.date).getDate()}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ display: "block", mb: 1 }}
                            >
                              {new Date(appointment.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#64b5f6"
                                    : "primary.main",
                              }}
                            >
                              {appointment.time}
                            </Typography>
                          </Paper>
                        </Box>

                        {/* Appointment Details */}
                        <Box sx={{ flex: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 2,
                              mb: 2,
                            }}
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
                                width: 40,
                                height: 40,
                              }}
                            >
                              <Person />
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 700,
                                  mb: 0.5,
                                  color:
                                    theme.palette.mode === "dark"
                                      ? "#e3f2fd"
                                      : "text.primary",
                                }}
                              >
                                {appointment.doctor}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 1 }}
                              >
                                {appointment.specialty}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 1,
                                  flexWrap: "wrap",
                                }}
                              >
                                <Chip
                                  icon={getStatusIcon(appointment.status)}
                                  label={appointment.status}
                                  size="small"
                                  color={getStatusColor(appointment.status)}
                                />
                                <Chip
                                  icon={getTypeIcon(appointment.type)}
                                  label={appointment.type}
                                  size="small"
                                  variant="outlined"
                                />
                              </Box>
                            </Box>
                          </Box>

                          {/* Additional Information */}
                          <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <LocationOn
                                  sx={{
                                    fontSize: 16,
                                    color:
                                      theme.palette.mode === "dark"
                                        ? "rgba(255, 255, 255, 0.7)"
                                        : "text.secondary",
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {appointment.location}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <AccessTime
                                  sx={{
                                    fontSize: 16,
                                    color:
                                      theme.palette.mode === "dark"
                                        ? "rgba(255, 255, 255, 0.7)"
                                        : "text.secondary",
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Duration: {appointment.duration}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>

                          {/* Rating and Notes */}
                          {appointment.status === "Completed" && (
                            <Box sx={{ mt: 2 }}>
                              {appointment.rating && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 1,
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Rating:
                                  </Typography>
                                  <Rating
                                    value={appointment.rating}
                                    readOnly
                                    size="small"
                                  />
                                </Box>
                              )}
                              {appointment.notes && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    fontStyle: "italic",
                                    p: 1,
                                    bgcolor:
                                      theme.palette.mode === "dark"
                                        ? "rgba(255, 255, 255, 0.05)"
                                        : "rgba(0, 0, 0, 0.05)",
                                    borderRadius: 1,
                                  }}
                                >
                                  Notes: {appointment.notes}
                                </Typography>
                              )}
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </ListItem>
                </motion.div>
              ))}
            </List>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="medium"
                />
              </Box>
            )}
          </CardContent>
        </Card>
      </AnimatedSection>
    </Box>
  );
};

export default AppointmentHistoryTab;
