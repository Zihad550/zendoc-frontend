"use client";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "motion/react";
import React from "react";

// Mock user data - replace with actual user data from your API
const mockUser = {
  id: "1",
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  phone: "+1 (555) 123-4567",
  profilePhoto: "/api/placeholder/150/150",
  joinDate: "March 2023",
  membershipStatus: "Premium Member",
  upcomingAppointments: 2,
  completedAppointments: 15,
};

const ProfileHeader = () => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        bgcolor:
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(255, 255, 255, 0.95)",
        border:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.05)",
        backdropFilter: "blur(20px)",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 16px 32px rgba(0, 0, 0, 0.4)"
            : "0 16px 32px rgba(0, 0, 0, 0.08)",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(33, 150, 243, 0.05) 0%, transparent 50%, rgba(144, 202, 249, 0.03) 100%)"
              : "linear-gradient(135deg, rgba(33, 150, 243, 0.02) 0%, transparent 50%, rgba(144, 202, 249, 0.01) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        },
      }}
    >
      <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
            gap: 4,
          }}
        >
          {/* Avatar Section */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <Box sx={{ position: "relative", textAlign: "center" }}>
              <Avatar
                src={mockUser.profilePhoto}
                alt={mockUser.name}
                sx={{
                  width: 120,
                  height: 120,
                  border: `4px solid ${theme.palette.primary.main}`,
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 8px 24px rgba(33, 150, 243, 0.3)"
                      : "0 8px 24px rgba(33, 150, 243, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 12px 28px rgba(33, 150, 243, 0.4)"
                        : "0 12px 28px rgba(33, 150, 243, 0.3)",
                  },
                }}
              />
              <Chip
                label={mockUser.membershipStatus}
                color="success"
                size="small"
                sx={{
                  position: "absolute",
                  bottom: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 4px 12px rgba(0, 0, 0, 0.3)"
                      : "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Box>
          </motion.div>

          {/* User Info Section */}
          <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color:
                    theme.palette.mode === "dark" ? "#e3f2fd" : "text.primary",
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
                {mockUser.name}
              </Typography>
            </motion.div>

            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Typography
                variant="body1"
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.7)"
                      : "text.secondary",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                {mockUser.email}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.6)"
                      : "text.secondary",
                  mb: 3,
                }}
              >
                Member since {mockUser.joinDate}
              </Typography>
            </motion.div>

            {/* Statistics */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    p: 2,
                    borderRadius: 2,
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(33, 150, 243, 0.1)"
                        : "rgba(33, 150, 243, 0.05)",
                    border:
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(33, 150, 243, 0.3)"
                        : "1px solid rgba(33, 150, 243, 0.2)",
                    minWidth: 100,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color:
                        theme.palette.mode === "dark"
                          ? "#64b5f6"
                          : "primary.main",
                    }}
                  >
                    {mockUser.upcomingAppointments}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.7)"
                          : "text.secondary",
                      fontWeight: 500,
                    }}
                  >
                    Upcoming
                  </Typography>
                </Box>
                <Box
                  sx={{
                    textAlign: "center",
                    p: 2,
                    borderRadius: 2,
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(76, 175, 80, 0.1)"
                        : "rgba(76, 175, 80, 0.05)",
                    border:
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(76, 175, 80, 0.3)"
                        : "1px solid rgba(76, 175, 80, 0.2)",
                    minWidth: 100,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color:
                        theme.palette.mode === "dark"
                          ? "#81c784"
                          : "success.main",
                    }}
                  >
                    {mockUser.completedAppointments}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.7)"
                          : "text.secondary",
                      fontWeight: 500,
                    }}
                  >
                    Completed
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
