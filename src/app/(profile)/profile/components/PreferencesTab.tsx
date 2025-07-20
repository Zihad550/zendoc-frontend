"use client";

import {
    DarkMode as DarkModeIcon,
    DisplaySettings as DisplayIcon,
    Email as EmailIcon,
    Language as LanguageIcon,
    LightMode as LightModeIcon,
    Notifications as NotificationsIcon,
    Palette as PaletteIcon,
    Save as SaveIcon,
    Sms as SmsIcon,
    TextFields as TextFieldsIcon,
} from "@mui/icons-material";
import {
    Alert,
    alpha,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Snackbar,
    Switch,
    Typography,
    useTheme,
} from "@mui/material";
import { motion } from "motion/react";
import React, { useState } from "react";

interface PreferencesData {
  language: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  appointmentReminders: boolean;
  marketingEmails: boolean;
  darkMode: boolean;
  fontSize: string;
  dateFormat: string;
  timeFormat: string;
}

const PreferencesTab = () => {
  const theme = useTheme();
  const [preferences, setPreferences] = useState<PreferencesData>({
    language: "en",
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    marketingEmails: false,
    darkMode: false,
    fontSize: "medium",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handlePreferenceChange = (key: keyof PreferencesData, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    setShowSuccess(true);
    setHasChanges(false);
  };

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const PreferenceCard = ({
    title,
    icon,
    children,
  }: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <motion.div variants={cardVariants}>
      <Card
        sx={{
          height: "100%",
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
          backdropFilter: "blur(10px)",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              sx={{
                mr: 2,
                p: 1,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              {icon}
            </Box>
            <Typography variant="h6" fontWeight="600" color="text.primary">
              {title}
            </Typography>
          </Box>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight="700"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Preferences
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Customize your experience and notification settings
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Language Preferences */}
          <Grid size={{ xs: 12, md: 6 }}>
            <PreferenceCard title="Language & Region" icon={<LanguageIcon />}>
              <FormControl component="fieldset" sx={{ width: "100%" }}>
                <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
                  Select Language
                </FormLabel>
                <RadioGroup
                  value={preferences.language}
                  onChange={(e) =>
                    handlePreferenceChange("language", e.target.value)
                  }
                >
                  {languages.map((lang) => (
                    <FormControlLabel
                      key={lang.code}
                      value={lang.code}
                      control={<Radio />}
                      label={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </Box>
                      }
                      sx={{ mb: 0.5 }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <Divider sx={{ my: 3 }} />

              <FormControl component="fieldset" sx={{ width: "100%" }}>
                <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
                  Date Format
                </FormLabel>
                <RadioGroup
                  value={preferences.dateFormat}
                  onChange={(e) =>
                    handlePreferenceChange("dateFormat", e.target.value)
                  }
                >
                  <FormControlLabel
                    value="MM/DD/YYYY"
                    control={<Radio />}
                    label="MM/DD/YYYY"
                  />
                  <FormControlLabel
                    value="DD/MM/YYYY"
                    control={<Radio />}
                    label="DD/MM/YYYY"
                  />
                  <FormControlLabel
                    value="YYYY-MM-DD"
                    control={<Radio />}
                    label="YYYY-MM-DD"
                  />
                </RadioGroup>
              </FormControl>

              <FormControl component="fieldset" sx={{ width: "100%", mt: 2 }}>
                <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
                  Time Format
                </FormLabel>
                <RadioGroup
                  value={preferences.timeFormat}
                  onChange={(e) =>
                    handlePreferenceChange("timeFormat", e.target.value)
                  }
                >
                  <FormControlLabel
                    value="12"
                    control={<Radio />}
                    label="12-hour (AM/PM)"
                  />
                  <FormControlLabel
                    value="24"
                    control={<Radio />}
                    label="24-hour"
                  />
                </RadioGroup>
              </FormControl>
            </PreferenceCard>
          </Grid>

          {/* Communication Preferences */}
          <Grid size={{ xs: 12, md: 6 }}>
            <PreferenceCard title="Communication" icon={<NotificationsIcon />}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight="600"
                    sx={{
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <EmailIcon fontSize="small" />
                    Email Notifications
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.emailNotifications}
                        onChange={(e) =>
                          handlePreferenceChange(
                            "emailNotifications",
                            e.target.checked,
                          )
                        }
                      />
                    }
                    label="Enable email notifications"
                  />
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight="600"
                    sx={{
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <SmsIcon fontSize="small" />
                    SMS Notifications
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.smsNotifications}
                        onChange={(e) =>
                          handlePreferenceChange(
                            "smsNotifications",
                            e.target.checked,
                          )
                        }
                      />
                    }
                    label="Enable SMS notifications"
                  />
                </Box>

                <Divider />

                <Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight="600"
                    sx={{ mb: 1 }}
                  >
                    Appointment Reminders
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.appointmentReminders}
                        onChange={(e) =>
                          handlePreferenceChange(
                            "appointmentReminders",
                            e.target.checked,
                          )
                        }
                      />
                    }
                    label="Receive appointment reminders"
                  />
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight="600"
                    sx={{ mb: 1 }}
                  >
                    Marketing Communications
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.marketingEmails}
                        onChange={(e) =>
                          handlePreferenceChange(
                            "marketingEmails",
                            e.target.checked,
                          )
                        }
                      />
                    }
                    label="Receive promotional emails"
                  />
                </Box>
              </Box>
            </PreferenceCard>
          </Grid>

          {/* Display Settings */}
          <Grid size={12}>
            <PreferenceCard title="Display Settings" icon={<DisplayIcon />}>
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight="600"
                      sx={{
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {preferences.darkMode ? (
                        <DarkModeIcon fontSize="small" />
                      ) : (
                        <LightModeIcon fontSize="small" />
                      )}
                      Theme
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={preferences.darkMode}
                          onChange={(e) =>
                            handlePreferenceChange("darkMode", e.target.checked)
                          }
                        />
                      }
                      label={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <span>Dark Mode</span>
                          <Chip
                            label={preferences.darkMode ? "On" : "Off"}
                            size="small"
                            color={preferences.darkMode ? "primary" : "default"}
                            variant="outlined"
                          />
                        </Box>
                      }
                    />
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <FormControl component="fieldset" sx={{ width: "100%" }}>
                    <FormLabel
                      component="legend"
                      sx={{
                        mb: 2,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <TextFieldsIcon fontSize="small" />
                      Font Size
                    </FormLabel>
                    <RadioGroup
                      value={preferences.fontSize}
                      onChange={(e) =>
                        handlePreferenceChange("fontSize", e.target.value)
                      }
                    >
                      <FormControlLabel
                        value="small"
                        control={<Radio />}
                        label="Small"
                      />
                      <FormControlLabel
                        value="medium"
                        control={<Radio />}
                        label="Medium"
                      />
                      <FormControlLabel
                        value="large"
                        control={<Radio />}
                        label="Large"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight="600"
                      sx={{
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <PaletteIcon fontSize="small" />
                      Accessibility
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Chip
                        label="High Contrast"
                        variant="outlined"
                        clickable
                        sx={{ justifyContent: "flex-start" }}
                      />
                      <Chip
                        label="Screen Reader Support"
                        variant="outlined"
                        clickable
                        sx={{ justifyContent: "flex-start" }}
                      />
                      <Chip
                        label="Reduced Motion"
                        variant="outlined"
                        clickable
                        sx={{ justifyContent: "flex-start" }}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </PreferenceCard>
          </Grid>
        </Grid>

        {/* Save Button */}
        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSave}
                startIcon={<SaveIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  "&:hover": {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                  },
                }}
              >
                Save Preferences
              </Button>
            </Box>
          </motion.div>
        )}
      </motion.div>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Preferences saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PreferencesTab;
