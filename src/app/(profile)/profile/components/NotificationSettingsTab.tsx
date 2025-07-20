"use client";

import {
  Check as CheckIcon,
  Email as EmailIcon,
  Notifications as NotificationsIcon,
  PhoneAndroid as PhoneIcon,
  Save as SaveIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Sms as SmsIcon,
} from "@mui/icons-material";
import {
  Alert,
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Snackbar,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "motion/react";
import { useState } from "react";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[8],
    borderColor: alpha(theme.palette.primary.main, 0.2),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

interface NotificationSettings {
  // Email Notifications
  emailEnabled: boolean;
  appointmentReminders: boolean;
  appointmentUpdates: boolean;
  medicalRecords: boolean;
  testResults: boolean;
  prescriptionReminders: boolean;
  newsletterUpdates: boolean;
  promotionalEmails: boolean;

  // SMS Notifications
  smsEnabled: boolean;
  urgentAlerts: boolean;
  appointmentConfirmations: boolean;
  medicationAlerts: boolean;
  emergencyContacts: boolean;

  // Push Notifications
  pushEnabled: boolean;
  realTimeUpdates: boolean;
  chatMessages: boolean;
  systemNotifications: boolean;

  // Security Notifications
  loginAlerts: boolean;
  passwordChanges: boolean;
  accountChanges: boolean;
  suspiciousActivity: boolean;

  // Frequency Settings
  digestFrequency: "daily" | "weekly" | "monthly";
  quietHours: boolean;
  weekendNotifications: boolean;
}

const NotificationSettingsTab = () => {
  const theme = useTheme();
  const [settings, setSettings] = useState<NotificationSettings>({
    // Email Notifications
    emailEnabled: true,
    appointmentReminders: true,
    appointmentUpdates: true,
    medicalRecords: true,
    testResults: true,
    prescriptionReminders: true,
    newsletterUpdates: false,
    promotionalEmails: false,

    // SMS Notifications
    smsEnabled: true,
    urgentAlerts: true,
    appointmentConfirmations: true,
    medicationAlerts: true,
    emergencyContacts: true,

    // Push Notifications
    pushEnabled: true,
    realTimeUpdates: true,
    chatMessages: true,
    systemNotifications: false,

    // Security Notifications
    loginAlerts: true,
    passwordChanges: true,
    accountChanges: true,
    suspiciousActivity: true,

    // Frequency Settings
    digestFrequency: "daily",
    quietHours: true,
    weekendNotifications: false,
  });

  const [originalSettings, setOriginalSettings] =
    useState<NotificationSettings>(settings);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (
    key: keyof NotificationSettings,
    value: boolean | string,
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    setHasChanges(
      JSON.stringify(newSettings) !== JSON.stringify(originalSettings),
    );
  };

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      setOriginalSettings(settings);
      setHasChanges(false);
      setShowSuccess(true);
    }, 500);
  };

  const handleReset = () => {
    setSettings(originalSettings);
    setHasChanges(false);
  };

  const notificationCategories = [
    {
      title: "Email Notifications",
      icon: <EmailIcon />,
      masterKey: "emailEnabled" as keyof NotificationSettings,
      items: [
        {
          key: "appointmentReminders",
          label: "Appointment Reminders",
          description: "Get reminded about upcoming appointments",
        },
        {
          key: "appointmentUpdates",
          label: "Appointment Updates",
          description: "Changes to your scheduled appointments",
        },
        {
          key: "medicalRecords",
          label: "Medical Records",
          description: "Updates to your medical records",
        },
        {
          key: "testResults",
          label: "Test Results",
          description: "When test results are available",
        },
        {
          key: "prescriptionReminders",
          label: "Prescription Reminders",
          description: "Medication refill reminders",
        },
        {
          key: "newsletterUpdates",
          label: "Newsletter Updates",
          description: "Monthly health newsletter",
        },
        {
          key: "promotionalEmails",
          label: "Promotional Emails",
          description: "Special offers and promotions",
        },
      ],
    },
    {
      title: "SMS Notifications",
      icon: <SmsIcon />,
      masterKey: "smsEnabled" as keyof NotificationSettings,
      items: [
        {
          key: "urgentAlerts",
          label: "Urgent Alerts",
          description: "Critical health alerts and emergencies",
        },
        {
          key: "appointmentConfirmations",
          label: "Appointment Confirmations",
          description: "Confirm appointments via SMS",
        },
        {
          key: "medicationAlerts",
          label: "Medication Alerts",
          description: "Time to take your medication",
        },
        {
          key: "emergencyContacts",
          label: "Emergency Contacts",
          description: "Notify emergency contacts when needed",
        },
      ],
    },
    {
      title: "Push Notifications",
      icon: <PhoneIcon />,
      masterKey: "pushEnabled" as keyof NotificationSettings,
      items: [
        {
          key: "realTimeUpdates",
          label: "Real-time Updates",
          description: "Instant notifications for important events",
        },
        {
          key: "chatMessages",
          label: "Chat Messages",
          description: "Messages from healthcare providers",
        },
        {
          key: "systemNotifications",
          label: "System Notifications",
          description: "App updates and maintenance alerts",
        },
      ],
    },
    {
      title: "Security Notifications",
      icon: <SecurityIcon />,
      masterKey: null,
      items: [
        {
          key: "loginAlerts",
          label: "Login Alerts",
          description: "Notify when someone logs into your account",
        },
        {
          key: "passwordChanges",
          label: "Password Changes",
          description: "Confirm password changes",
        },
        {
          key: "accountChanges",
          label: "Account Changes",
          description: "Changes to your account information",
        },
        {
          key: "suspiciousActivity",
          label: "Suspicious Activity",
          description: "Unusual account activity alerts",
        },
      ],
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <NotificationsIcon color="primary" />
            Notification Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Customize how and when you receive notifications to stay informed
            about your health
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {notificationCategories.map((category, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={category.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <StyledCard>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <SectionTitle variant="h6">
                        {category.icon}
                        {category.title}
                      </SectionTitle>
                      {category.masterKey && (
                        <Switch
                          checked={settings[category.masterKey] as boolean}
                          onChange={(e) =>
                            handleSettingChange(
                              category.masterKey!,
                              e.target.checked,
                            )
                          }
                          color="primary"
                        />
                      )}
                    </Box>

                    <List sx={{ py: 0 }}>
                      {category.items.map((item) => (
                        <ListItem key={item.key} sx={{ px: 0, py: 1 }}>
                          <ListItemText
                            primary={item.label}
                            secondary={item.description}
                            primaryTypographyProps={{ fontWeight: 500 }}
                            secondaryTypographyProps={{ fontSize: "0.875rem" }}
                          />
                          <ListItemSecondaryAction>
                            <Switch
                              checked={
                                settings[
                                item.key as keyof NotificationSettings
                                ] as boolean
                              }
                              onChange={(e) =>
                                handleSettingChange(
                                  item.key as keyof NotificationSettings,
                                  e.target.checked,
                                )
                              }
                              disabled={
                                category.masterKey
                                  ? !(settings[category.masterKey] as boolean)
                                  : false
                              }
                              color="primary"
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </StyledCard>
              </motion.div>
            </Grid>
          ))}

          {/* Notification Preferences */}
          <Grid size={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <StyledCard>
                <CardContent>
                  <SectionTitle variant="h6">
                    <SettingsIcon />
                    Notification Preferences
                  </SectionTitle>

                  <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ mb: 2, fontWeight: 600 }}
                      >
                        Digest Frequency
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        {[
                          { value: "daily", label: "Daily Summary" },
                          { value: "weekly", label: "Weekly Summary" },
                          { value: "monthly", label: "Monthly Summary" },
                        ].map((option) => (
                          <Chip
                            key={option.value}
                            label={option.label}
                            variant={
                              settings.digestFrequency === option.value
                                ? "filled"
                                : "outlined"
                            }
                            color={
                              settings.digestFrequency === option.value
                                ? "primary"
                                : "default"
                            }
                            clickable
                            onClick={() =>
                              handleSettingChange(
                                "digestFrequency",
                                option.value,
                              )
                            }
                            sx={{ justifyContent: "flex-start" }}
                          />
                        ))}
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ mb: 2, fontWeight: 600 }}
                      >
                        Timing Preferences
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.quietHours}
                              onChange={(e) =>
                                handleSettingChange(
                                  "quietHours",
                                  e.target.checked,
                                )
                              }
                            />
                          }
                          label="Quiet Hours (9 PM - 7 AM)"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.weekendNotifications}
                              onChange={(e) =>
                                handleSettingChange(
                                  "weekendNotifications",
                                  e.target.checked,
                                )
                              }
                            />
                          }
                          label="Weekend Notifications"
                        />
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ mb: 2, fontWeight: 600 }}
                      >
                        Quick Actions
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            const newSettings = { ...settings };
                            Object.keys(newSettings).forEach((key) => {
                              if (
                                key.includes("Email") ||
                                key.includes("email")
                              ) {
                                (newSettings as any)[key] = false;
                              }
                            });
                            setSettings(newSettings);
                            setHasChanges(true);
                          }}
                          sx={{ justifyContent: "flex-start" }}
                        >
                          Disable All Email
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            const newSettings = { ...settings };
                            Object.keys(newSettings).forEach((key) => {
                              if (key.includes("sms") || key.includes("Sms")) {
                                (newSettings as any)[key] = false;
                              }
                            });
                            setSettings(newSettings);
                            setHasChanges(true);
                          }}
                          sx={{ justifyContent: "flex-start" }}
                        >
                          Disable All SMS
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            const newSettings = { ...settings };
                            Object.keys(newSettings).forEach((key) => {
                              if (
                                typeof newSettings[
                                key as keyof NotificationSettings
                                ] === "boolean"
                              ) {
                                (newSettings as any)[key] = true;
                              }
                            });
                            setSettings(newSettings);
                            setHasChanges(true);
                          }}
                          sx={{ justifyContent: "flex-start" }}
                        >
                          Enable All
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
            </motion.div>
          </Grid>
        </Grid>

        {/* Save Changes Button */}
        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                position: "fixed",
                bottom: 24,
                right: 24,
                zIndex: 1000,
                display: "flex",
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleReset}
                sx={{ borderRadius: 28 }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                startIcon={<SaveIcon />}
                sx={{
                  borderRadius: 28,
                  boxShadow: theme.shadows[8],
                }}
              >
                Save Changes
              </Button>
            </Box>
          </motion.div>
        )}

        {/* Success Snackbar */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={4000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setShowSuccess(false)}
            severity="success"
            variant="filled"
            icon={<CheckIcon />}
            sx={{ borderRadius: 12 }}
          >
            Notification settings updated successfully!
          </Alert>
        </Snackbar>
      </motion.div>
    </Box>
  );
};

export default NotificationSettingsTab;
