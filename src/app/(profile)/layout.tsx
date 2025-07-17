"use client";

import {
  ArrowBack,
  Dashboard,
  KeyboardArrowRight,
  Logout,
  Notifications,
  Person,
  Settings,
  Support,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Container,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

// Mock user data
const mockUser = {
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  avatar: "/api/placeholder/40/40",
  role: "Patient",
  notifications: 3,
};

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    router.push("/login");
    handleClose();
  };

  const getBreadcrumbs = () => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Profile", href: "/profile" },
    ];

    if (pathSegments.length > 1) {
      breadcrumbs.push({
        label: pathSegments[pathSegments.length - 1]
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        href: pathname,
      });
    }

    return breadcrumbs;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #0A0E27 0%, #1A1D36 50%, #0A0E27 100%)"
            : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(circle at 20% 30%, rgba(33, 150, 243, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(144, 202, 249, 0.08) 0%, transparent 50%)"
              : "radial-gradient(circle at 20% 30%, rgba(33, 150, 243, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(144, 202, 249, 0.03) 0%, transparent 50%)",
          zIndex: 0,
          pointerEvents: "none",
        },
      }}
    >
      {/* Navigation Header */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)"
          }`,
          zIndex: 1000,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ px: 0, py: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconButton
                  onClick={() => router.push("/")}
                  sx={{
                    mr: 2,
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.05)",
                    "&:hover": {
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <ArrowBack />
                </IconButton>
              </motion.div>

              <Box sx={{ flex: 1 }}>
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
                  Profile Settings
                </Typography>
                <Breadcrumbs
                  separator={<KeyboardArrowRight fontSize="small" />}
                  sx={{
                    "& .MuiBreadcrumbs-separator": {
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.6)"
                          : "text.secondary",
                    },
                  }}
                >
                  {getBreadcrumbs().map((breadcrumb, index) => (
                    <Link
                      key={index}
                      href={breadcrumb.href}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(breadcrumb.href);
                      }}
                      sx={{
                        color:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.8)"
                            : "text.secondary",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        "&:hover": {
                          color:
                            theme.palette.mode === "dark"
                              ? "#64b5f6"
                              : "primary.main",
                        },
                      }}
                    >
                      {breadcrumb.label}
                    </Link>
                  ))}
                </Breadcrumbs>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* Notifications */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconButton
                  onClick={handleNotificationClick}
                  sx={{
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.05)",
                    "&:hover": {
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <Badge
                    badgeContent={mockUser.notifications}
                    color="error"
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      },
                    }}
                  >
                    <Notifications />
                  </Badge>
                </IconButton>
              </motion.div>

              {/* User Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Box
                  onClick={handleAvatarClick}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    p: 1,
                    borderRadius: 2,
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.05)",
                    "&:hover": {
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <Avatar
                    src={mockUser.avatar}
                    alt={mockUser.name}
                    sx={{
                      width: 32,
                      height: 32,
                      border: `2px solid ${theme.palette.primary.main}`,
                    }}
                  />
                  <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.9)"
                            : "text.primary",
                      }}
                    >
                      {mockUser.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.6)"
                            : "text.secondary",
                      }}
                    >
                      {mockUser.role}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Notification Menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 320,
            maxHeight: 400,
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(30, 30, 30, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Notifications
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You have {mockUser.notifications} new notifications
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemText
            primary="Appointment Reminder"
            secondary="You have an appointment tomorrow at 2:00 PM"
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemText
            primary="Lab Results Ready"
            secondary="Your recent lab results are now available"
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemText
            primary="Payment Confirmation"
            secondary="Your payment has been processed successfully"
          />
        </MenuItem>
      </Menu>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 220,
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(30, 30, 30, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {mockUser.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {mockUser.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem
          onClick={() => {
            router.push("/dashboard");
            handleClose();
          }}
        >
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/profile");
            handleClose();
          }}
        >
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Support />
          </ListItemIcon>
          <ListItemText primary="Support" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>

      {/* Main Content */}
      <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
    </Box>
  );
};

export default ProfileLayout;
