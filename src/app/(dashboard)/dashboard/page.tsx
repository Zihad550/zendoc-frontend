"use client";
import assets from "@/assets";
import {
  AccessTime,
  ArrowForward,
  Assignment,
  CalendarToday,
  MedicalServices,
  MoreVert,
  People,
  VideoCall,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

const DashboardHomePage = () => {
  const currentTime = new Date();
  const theme = useTheme();

  // Mock data for demonstration
  const statsData = [
    {
      id: 1,
      title: "Total Appointments",
      value: "247",
      change: "+12%",
      icon: CalendarToday,
      color: "#2196f3",
      bgColor: "rgba(33, 150, 243, 0.1)",
      trend: "up",
    },
    {
      id: 2,
      title: "Total Patients",
      value: "1,429",
      change: "+8%",
      icon: People,
      color: "#4caf50",
      bgColor: "rgba(76, 175, 80, 0.1)",
      trend: "up",
    },
    {
      id: 3,
      title: "Active Sessions",
      value: "32",
      change: "+24%",
      icon: VideoCall,
      color: "#ff9800",
      bgColor: "rgba(255, 152, 0, 0.1)",
      trend: "up",
    },
    {
      id: 4,
      title: "Pending Reviews",
      value: "18",
      change: "-5%",
      icon: Assignment,
      color: "#f44336",
      bgColor: "rgba(244, 67, 54, 0.1)",
      trend: "down",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "appointment",
      title: "New appointment scheduled",
      description: "Dr. Sarah Johnson with John Doe",
      time: "2 minutes ago",
      icon: CalendarToday,
      color: "#2196f3",
    },
    {
      id: 2,
      type: "consultation",
      title: "Video consultation completed",
      description: "Dr. Michael Chen with Jane Smith",
      time: "15 minutes ago",
      icon: VideoCall,
      color: "#4caf50",
    },
    {
      id: 3,
      type: "prescription",
      title: "Prescription updated",
      description: "New medication added for patient #1247",
      time: "1 hour ago",
      icon: MedicalServices,
      color: "#ff9800",
    },
    {
      id: 4,
      type: "report",
      title: "Lab results available",
      description: "Blood work completed for Emma Wilson",
      time: "2 hours ago",
      icon: Assignment,
      color: "#9c27b0",
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: "John Doe",
      doctor: "Dr. Sarah Johnson",
      time: "10:00 AM",
      type: "Cardiology",
      status: "confirmed",
      avatar: assets.avatars.avatar1,
    },
    {
      id: 2,
      patient: "Jane Smith",
      doctor: "Dr. Michael Chen",
      time: "11:30 AM",
      type: "General",
      status: "pending",
      avatar: assets.avatars.avatar2,
    },
    {
      id: 3,
      patient: "Emma Wilson",
      doctor: "Dr. Emily Rodriguez",
      time: "2:00 PM",
      type: "Pediatrics",
      status: "confirmed",
      avatar: assets.avatars.avatar3,
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: "Schedule Appointment",
      icon: CalendarToday,
      color: "#2196f3",
      path: "/dashboard/appointments/new",
    },
    {
      id: 2,
      title: "Video Consultation",
      icon: VideoCall,
      color: "#4caf50",
      path: "/dashboard/consultations",
    },
    {
      id: 3,
      title: "Patient Records",
      icon: Assignment,
      color: "#ff9800",
      path: "/dashboard/patients",
    },
    {
      id: 4,
      title: "Prescriptions",
      icon: MedicalServices,
      color: "#9c27b0",
      path: "/dashboard/prescriptions",
    },
  ];

  const healthMetrics = [
    {
      id: 1,
      title: "Patient Satisfaction",
      value: 94,
      unit: "%",
      color: "#4caf50",
    },
    {
      id: 2,
      title: "Appointment Completion",
      value: 87,
      unit: "%",
      color: "#2196f3",
    },
    {
      id: 3,
      title: "Response Time",
      value: 73,
      unit: "%",
      color: "#ff9800",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.mode === "dark" ? "#0A0E27" : "#f8f9fa",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: "'",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(circle at 20% 20%, rgba(33, 150, 243, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(144, 202, 249, 0.08) 0%, transparent 50%)"
              : "radial-gradient(circle at 20% 20%, rgba(33, 150, 243, 0.05) 0%, transparent 50%)",
          pointerEvents: "none",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, py: 3 }}>
        {/* Welcome Header */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color:
                      theme.palette.mode === "dark" ? "#e3f2fd" : "inherit",
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)"
                        : "inherit",
                    backgroundClip:
                      theme.palette.mode === "dark" ? "text" : "inherit",
                    WebkitBackgroundClip:
                      theme.palette.mode === "dark" ? "text" : "inherit",
                    WebkitTextFillColor:
                      theme.palette.mode === "dark" ? "transparent" : "inherit",
                  }}
                >
                  Welcome back, {"User"}!
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.7)"
                        : "text.secondary",
                    fontWeight: 400,
                  }}
                >
                  Here{"'"}s what{"'"}s happening with your healthcare today.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(255, 255, 255, 0.9)",
                  border:
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.1)"
                      : "1px solid rgba(0, 0, 0, 0.05)",
                  backdropFilter: "blur(10px)",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    mb: 0.5,
                  }}
                >
                  {currentTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.7)"
                        : "text.secondary",
                  }}
                >
                  {currentTime.toLocaleDateString([], {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statsData.map((stat) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.id}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(255, 255, 255, 0.9)",
                  border:
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.1)"
                      : "1px solid rgba(0, 0, 0, 0.05)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 8px 25px rgba(0, 0, 0, 0.3)"
                        : "0 8px 25px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: stat.bgColor,
                        color: stat.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <stat.icon sx={{ fontSize: 24 }} />
                    </Box>
                    <Chip
                      label={stat.change}
                      size="small"
                      sx={{
                        bgcolor:
                          stat.trend === "up"
                            ? "rgba(76, 175, 80, 0.1)"
                            : "rgba(244, 67, 54, 0.1)",
                        color: stat.trend === "up" ? "#4caf50" : "#f44336",
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 0.5,
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.95)"
                          : "inherit",
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.6)"
                          : "text.secondary",
                    }}
                  >
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Quick Actions */}
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(255, 255, 255, 0.9)",
                border:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.05)",
                backdropFilter: "blur(10px)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                    color:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.95)"
                        : "inherit",
                  }}
                >
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  {quickActions.map((action) => (
                    <Grid size={{ xs: 6 }} key={action.id}>
                      <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          borderColor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.1)",
                          color:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.8)"
                              : "text.primary",
                          flexDirection: "column",
                          height: "80px",
                          "&:hover": {
                            borderColor: action.color,
                            bgcolor: alpha(action.color, 0.1),
                          },
                        }}
                      >
                        <action.icon
                          sx={{ fontSize: 24, mb: 1, color: action.color }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 500,
                            textAlign: "center",
                            lineHeight: 1.2,
                          }}
                        >
                          {action.title}
                        </Typography>
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Health Metrics */}
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(255, 255, 255, 0.9)",
                border:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.05)",
                backdropFilter: "blur(10px)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                    color:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.95)"
                        : "inherit",
                  }}
                >
                  Health Metrics
                </Typography>
                <Stack spacing={3}>
                  {healthMetrics.map((metric) => (
                    <Box key={metric.id}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color:
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.8)"
                                : "text.primary",
                          }}
                        >
                          {metric.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: metric.color,
                          }}
                        >
                          {metric.value}
                          {metric.unit}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={metric.value}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.1)",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 4,
                            bgcolor: metric.color,
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Activity */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(255, 255, 255, 0.9)",
                border:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.05)",
                backdropFilter: "blur(10px)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.95)"
                          : "inherit",
                    }}
                  >
                    Recent Activity
                  </Typography>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>
                <Stack spacing={2}>
                  {recentActivities.map((activity) => (
                    <Box
                      key={activity.id}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2,
                        p: 2,
                        borderRadius: 2,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.03)"
                            : "rgba(0, 0, 0, 0.02)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.05)"
                              : "rgba(0, 0, 0, 0.05)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 1.5,
                          bgcolor: alpha(activity.color, 0.1),
                          color: activity.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <activity.icon sx={{ fontSize: 18 }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            mb: 0.5,
                            color:
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.9)"
                                : "text.primary",
                          }}
                        >
                          {activity.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.6)"
                                : "text.secondary",
                            display: "block",
                            mb: 0.5,
                          }}
                        >
                          {activity.description}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.5)"
                                : "text.disabled",
                          }}
                        >
                          {activity.time}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Upcoming Appointments */}
        <Card
          elevation={0}
          sx={{
            mt: 3,
            borderRadius: 3,
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(255, 255, 255, 0.9)",
            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.05)",
            backdropFilter: "blur(10px)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.95)"
                      : "inherit",
                }}
              >
                Today{"'"}s Appointments
              </Typography>
              <Button
                variant="outlined"
                size="small"
                endIcon={<ArrowForward />}
                sx={{
                  borderColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(0, 0, 0, 0.2)",
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.8)"
                      : "text.primary",
                }}
              >
                View All
              </Button>
            </Box>
            <Grid container spacing={2}>
              {upcomingAppointments.map((appointment) => (
                <Grid size={{ xs: 12, md: 4 }} key={appointment.id}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.03)"
                          : "rgba(255, 255, 255, 0.5)",
                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255, 255, 255, 0.05)"
                          : "1px solid rgba(0, 0, 0, 0.05)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 4px 15px rgba(0, 0, 0, 0.2)"
                            : "0 4px 15px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Avatar
                        src={appointment.avatar}
                        alt={appointment.patient}
                        sx={{ width: 40, height: 40 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color:
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.9)"
                                : "text.primary",
                          }}
                        >
                          {appointment.patient}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.6)"
                                : "text.secondary",
                          }}
                        >
                          {appointment.doctor}
                        </Typography>
                      </Box>
                      <Chip
                        label={appointment.status}
                        size="small"
                        sx={{
                          bgcolor:
                            appointment.status === "confirmed"
                              ? "rgba(76, 175, 80, 0.1)"
                              : "rgba(255, 152, 0, 0.1)",
                          color:
                            appointment.status === "confirmed"
                              ? "#4caf50"
                              : "#ff9800",
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                    <Divider
                      sx={{
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.1)"
                            : "rgba(0, 0, 0, 0.1)",
                        my: 2,
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AccessTime
                          sx={{
                            fontSize: 16,
                            color:
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.6)"
                                : "text.secondary",
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.8)"
                                : "text.primary",
                            fontWeight: 500,
                          }}
                        >
                          {appointment.time}
                        </Typography>
                      </Box>
                      <Chip
                        label={appointment.type}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.2)"
                              : "rgba(0, 0, 0, 0.2)",
                          color:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.8)"
                              : "text.primary",
                        }}
                      />
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default DashboardHomePage;
