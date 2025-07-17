"use client";

import { AnimatedContactForm, AnimatedFormField } from "@/components/animation";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import KeyIcon from "@mui/icons-material/Key";
import LockIcon from "@mui/icons-material/Lock";
import SecurityIcon from "@mui/icons-material/Security";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const validationSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    confirmPassword: z.string().min(6, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const PasswordChangeTab = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword] = useState(false);
  const [showNewPassword] = useState(false);
  const [showConfirmPassword] = useState(false);
  const [newPassword] = useState("");

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Password changed successfully!");
    } catch {
      toast.error("Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength calculator
  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    if (/[a-z]/.test(password)) score += 20;
    if (/[A-Z]/.test(password)) score += 20;
    if (/\d/.test(password)) score += 20;
    if (/[@$!%*?&]/.test(password)) score += 10;
    return score;
  };

  const passwordStrength = calculatePasswordStrength(newPassword);
  const getStrengthColor = (strength: number) => {
    if (strength < 40) return "error";
    if (strength < 70) return "warning";
    return "success";
  };

  const getStrengthText = (strength: number) => {
    if (strength < 40) return "Weak";
    if (strength < 70) return "Medium";
    return "Strong";
  };

  const securityTips = [
    "Use a combination of uppercase and lowercase letters",
    "Include numbers and special characters",
    "Make it at least 8 characters long",
    "Don't use easily guessable information",
    "Consider using a password manager",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        flexDirection: { xs: "column", lg: "row" },
      }}
    >
      {/* Password Change Form */}
      <Card
        elevation={0}
        sx={{
          flex: 1,
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
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <KeyIcon
                sx={{
                  fontSize: 48,
                  color: theme.palette.primary.main,
                  mb: 2,
                  filter:
                    theme.palette.mode === "dark"
                      ? "drop-shadow(0 2px 8px rgba(33, 150, 243, 0.4))"
                      : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                }}
              />
            </motion.div>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 1,
                color:
                  theme.palette.mode === "dark" ? "#e3f2fd" : "text.primary",
              }}
            >
              Change Password
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.7)"
                    : "text.secondary",
                mb: 3,
              }}
            >
              Keep your account secure with a strong password
            </Typography>
            <Divider />
          </Box>

          <AnimatedContactForm delay={0.1}>
            <PHForm
              onSubmit={onSubmit}
              defaultValues={{
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              }}
              resolver={zodResolver(validationSchema)}
            >
              <Grid container spacing={3}>
                <Grid size={12}>
                  <AnimatedFormField>
                    <PHInput
                      name="currentPassword"
                      label="Current Password"
                      type={showCurrentPassword ? "text" : "password"}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.05)"
                              : "rgba(255, 255, 255, 0.8)",
                          "& .MuiInputAdornment-root": {
                            "& .MuiIconButton-root": {
                              color:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.7)"
                                  : "text.secondary",
                            },
                          },
                        },
                      }}
                    />
                  </AnimatedFormField>
                </Grid>

                <Grid size={12}>
                  <AnimatedFormField>
                    <PHInput
                      name="newPassword"
                      label="New Password"
                      type={showNewPassword ? "text" : "password"}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.05)"
                              : "rgba(255, 255, 255, 0.8)",
                        },
                      }}
                    />
                  </AnimatedFormField>

                  {/* Password Strength Indicator */}
                  {newPassword && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box sx={{ mt: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 600 }}
                          >
                            Password Strength:
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: `${getStrengthColor(passwordStrength)}.main`,
                              fontWeight: 600,
                            }}
                          >
                            {getStrengthText(passwordStrength)}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={passwordStrength}
                          color={getStrengthColor(passwordStrength)}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor:
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.1)",
                          }}
                        />
                      </Box>
                    </motion.div>
                  )}
                </Grid>

                <Grid size={12}>
                  <AnimatedFormField>
                    <PHInput
                      name="confirmPassword"
                      label="Confirm New Password"
                      type={showConfirmPassword ? "text" : "password"}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.05)"
                              : "rgba(255, 255, 255, 0.8)",
                        },
                      }}
                    />
                  </AnimatedFormField>
                </Grid>

                <Grid size={12}>
                  <Alert
                    severity="info"
                    sx={{
                      borderRadius: 2,
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(33, 150, 243, 0.1)"
                          : "rgba(33, 150, 243, 0.05)",
                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(33, 150, 243, 0.3)"
                          : "1px solid rgba(33, 150, 243, 0.2)",
                      "& .MuiAlert-icon": {
                        color:
                          theme.palette.mode === "dark"
                            ? "#64b5f6"
                            : "primary.main",
                      },
                    }}
                  >
                    <Typography variant="body2">
                      <strong>Security Notice:</strong> Changing your password
                      will log you out of all devices. You{"'"}ll need to log in
                      again.
                    </Typography>
                  </Alert>
                </Grid>

                <Grid size={12}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      justifyContent: "flex-end",
                      mt: 2,
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<LockIcon />}
                      disabled={isLoading}
                      sx={{
                        borderRadius: 2,
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        background:
                          theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)"
                            : "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                        "&:hover": {
                          background:
                            theme.palette.mode === "dark"
                              ? "linear-gradient(135deg, #64b5f6 0%, #2196f3 100%)"
                              : "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
                        },
                      }}
                    >
                      {isLoading ? "Changing Password..." : "Change Password"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </PHForm>
          </AnimatedContactForm>
        </CardContent>
      </Card>

      {/* Security Tips */}
      <Card
        elevation={0}
        sx={{
          width: { xs: "100%", lg: 350 },
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
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <SecurityIcon
              sx={{
                fontSize: 40,
                color:
                  theme.palette.mode === "dark" ? "#81c784" : "success.main",
                mb: 2,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color:
                  theme.palette.mode === "dark" ? "#e3f2fd" : "text.primary",
              }}
            >
              Security Tips
            </Typography>
          </Box>

          <List sx={{ p: 0 }}>
            {securityTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "#81c784"
                            : "success.main",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={tip}
                    primaryTypographyProps={{
                      variant: "body2",
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.8)"
                          : "text.secondary",
                    }}
                  />
                </ListItem>
              </motion.div>
            ))}
          </List>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              mt: 3,
              borderRadius: 2,
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(244, 67, 54, 0.1)"
                  : "rgba(244, 67, 54, 0.05)",
              border:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(244, 67, 54, 0.3)"
                  : "1px solid rgba(244, 67, 54, 0.2)",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.9)"
                    : "text.primary",
                fontWeight: 600,
                mb: 1,
              }}
            >
              Important:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.8)"
                    : "text.secondary",
                lineHeight: 1.6,
              }}
            >
              If you suspect unauthorized access to your account, change your
              password immediately and contact support.
            </Typography>
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PasswordChangeTab;
