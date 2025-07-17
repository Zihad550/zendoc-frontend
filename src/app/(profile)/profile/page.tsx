"use client";

import { AnimatedSection, animationVariants } from "@/components/animation";
import {
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import AccountInformationTab from "./components/AccountInformationTab";
import AppointmentHistoryTab from "./components/AppointmentHistoryTab";
import MedicalRecordsTab from "./components/MedicalRecordsTab";
import NotificationSettingsTab from "./components/NotificationSettingsTab";
import PasswordChangeTab from "./components/PasswordChangeTab";
import PreferencesTab from "./components/PreferencesTab";
import ProfileHeader from "./components/ProfileHeader";

// Tab content interface
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ width: "100%" }}>
          <AnimatedSection variants={animationVariants.fadeInUp} delay={0.1}>
            {children}
          </AnimatedSection>
        </Box>
      )}
    </div>
  );
}

const ProfilePage = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();

  // Tab configuration
  const tabs = [
    { label: "Account Information", icon: "👤" },
    { label: "Medical Records", icon: "📋" },
    { label: "Appointment History", icon: "📅" },
    { label: "Change Password", icon: "🔐" },
    { label: "Preferences", icon: "⚙️" },
    { label: "Notifications", icon: "🔔" },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #0A0E27 0%, #1A1D36 50%, #0A0E27 100%)"
            : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)",
        position: "relative",
        padding: "2rem 0",
      }}
    >
      <Container maxWidth="xl">
        <AnimatedSection
          variants={animationVariants.slideInFromTop}
          delay={0.1}
        >
          <ProfileHeader />
        </AnimatedSection>

        <AnimatedSection
          variants={animationVariants.slideFromBottom}
          delay={0.2}
        >
          <Paper
            elevation={0}
            sx={{
              mt: 4,
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
                  ? "0 20px 40px rgba(0, 0, 0, 0.4)"
                  : "0 20px 40px rgba(0, 0, 0, 0.08)",
              minHeight: "70vh",
            }}
          >
            <Grid container sx={{ height: "100%" }}>
              {/* Sidebar */}
              <Grid
                size={{ xs: 12, md: 3 }}
                sx={{
                  borderRight: {
                    md:
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255, 255, 255, 0.1)"
                        : "1px solid rgba(0, 0, 0, 0.08)",
                  },
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.02)"
                      : "rgba(0, 0, 0, 0.02)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color:
                        theme.palette.mode === "dark"
                          ? "#e3f2fd"
                          : "text.primary",
                      mb: 2,
                      px: 2,
                    }}
                  >
                    Profile Settings
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <List sx={{ p: 0 }}>
                    {tabs.map((tab, index) => (
                      <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                          selected={value === index}
                          onClick={() => setValue(index)}
                          sx={{
                            borderRadius: 2,
                            py: 1.5,
                            px: 2,
                            transition: "all 0.2s ease-in-out",
                            "&.Mui-selected": {
                              bgcolor:
                                theme.palette.mode === "dark"
                                  ? "rgba(33, 150, 243, 0.15)"
                                  : "rgba(25, 118, 210, 0.08)",
                              color:
                                theme.palette.mode === "dark"
                                  ? "#64b5f6"
                                  : "primary.main",
                              "&:hover": {
                                bgcolor:
                                  theme.palette.mode === "dark"
                                    ? "rgba(33, 150, 243, 0.2)"
                                    : "rgba(25, 118, 210, 0.12)",
                              },
                            },
                            "&:hover": {
                              bgcolor:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.05)"
                                  : "rgba(0, 0, 0, 0.04)",
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 40,
                              color: "inherit",
                              fontSize: "1.2rem",
                            }}
                          >
                            {tab.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={tab.label}
                            primaryTypographyProps={{
                              fontSize: "0.95rem",
                              fontWeight: value === index ? 600 : 500,
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>

              {/* Content Area */}
              <Grid
                size={{ xs: 12, md: 9 }}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Box sx={{ p: 4, flexGrow: 1 }}>
                  <CustomTabPanel value={value} index={0}>
                    <AccountInformationTab />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    <MedicalRecordsTab />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={2}>
                    <AppointmentHistoryTab />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={3}>
                    <PasswordChangeTab />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={4}>
                    <PreferencesTab />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={5}>
                    <NotificationSettingsTab />
                  </CustomTabPanel>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </AnimatedSection>
      </Container>
    </main>
  );
};

export default ProfilePage;
