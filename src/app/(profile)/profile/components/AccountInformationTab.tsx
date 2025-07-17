"use client";

import { AnimatedContactForm, AnimatedFormField } from "@/components/animation";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const validationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "Zip code must be at least 5 characters"),
  emergencyContact: z
    .string()
    .min(10, "Emergency contact must be at least 10 characters"),
  emergencyContactName: z
    .string()
    .min(2, "Emergency contact name must be at least 2 characters"),
});

// Mock user data - replace with actual user data from your API
const mockUserData = {
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah.johnson@example.com",
  phone: "+1 (555) 123-4567",
  dateOfBirth: "1990-05-15",
  gender: "female",
  address: "123 Main Street",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  emergencyContact: "+1 (555) 987-6543",
  emergencyContactName: "John Johnson",
};

const AccountInformationTab = () => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: theme.palette.mode === "dark" ? "#e3f2fd" : "text.primary",
            }}
          >
            Account Information
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
            Update your personal information and contact details
          </Typography>
          <Divider />
        </Box>

        <AnimatedContactForm delay={0.1}>
          <PHForm
            onSubmit={onSubmit}
            defaultValues={mockUserData}
            resolver={zodResolver(validationSchema)}
          >
            <Grid container spacing={3}>
              {/* Personal Information */}
              <Grid size={12}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color:
                      theme.palette.mode === "dark"
                        ? "#bbdefb"
                        : "text.primary",
                  }}
                >
                  Personal Information
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedFormField>
                  <PHInput
                    name="firstName"
                    label="First Name"
                    fullWidth
                    disabled={!isEditing}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.8)",
                        "&.Mui-disabled": {
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.02)"
                              : "rgba(0, 0, 0, 0.02)",
                        },
                      },
                    }}
                  />
                </AnimatedFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedFormField>
                  <PHInput
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    disabled={!isEditing}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.8)",
                        "&.Mui-disabled": {
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.02)"
                              : "rgba(0, 0, 0, 0.02)",
                        },
                      },
                    }}
                  />
                </AnimatedFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedFormField>
                  <PHInput
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    disabled={!isEditing}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.8)",
                        "&.Mui-disabled": {
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.02)"
                              : "rgba(0, 0, 0, 0.02)",
                        },
                      },
                    }}
                  />
                </AnimatedFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedFormField>
                  <PHInput
                    name="phone"
                    label="Phone Number"
                    fullWidth
                    disabled={!isEditing}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.8)",
                        "&.Mui-disabled": {
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.02)"
                              : "rgba(0, 0, 0, 0.02)",
                        },
                      },
                    }}
                  />
                </AnimatedFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedFormField>
                  <PHInput
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    disabled={!isEditing}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.8)",
                        "&.Mui-disabled": {
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.02)"
                              : "rgba(0, 0, 0, 0.02)",
                        },
                      },
                    }}
                  />
                </AnimatedFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedFormField>
                  <PHInput
                    name="gender"
                    label="Gender"
                    fullWidth
                    disabled={!isEditing}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.8)",
                        "&.Mui-disabled": {
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.02)"
                              : "rgba(0, 0, 0, 0.02)",
                        },
                      },
                    }}
                  />
                </AnimatedFormField>
              </Grid>

              {/* Address Information */}
              <Grid size={12}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    mt: 3,
                    color:
                      theme.palette.mode === "dark"
                        ? "#bbdefb"
                        : "text.primary",
                  }}
                >
                  Address Information
                </Typography>
              </Grid>

              <Grid size={12}>
                <AnimatedFormField>
                  <PHInput
                    name="address"
                    label="Street Address"
                    fullWidth
                    disabled={!isEditing}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.8)",
                        "&.Mui-disabled": {
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.02)"
                              : "rgba(0, 0, 0, 0.02)",
                        },
                      },
                    }}
                  />
                </AnimatedFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <AnimatedFormField>
                  <PHInput
                    name="city"
                    label="City"
                    fullWidth
                    disabled={!isEditing}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.8)",
                        "&.Mui-disabled": {
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.02)"
                              : "rgba(0, 0, 0, 0.02)",
                        },
                      },
                    }}
                  />
                </AnimatedFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <AnimatedFormField>
                  <PHInput
                    name="state"
                    label="State"
                    fullWidth
                    disabled={!isEditing}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.8)",
                        "&.Mui-disabled": {
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.02)"
                              : "rgba(0, 0, 0, 0.02)",
                        },
                      },
                    }}
                  />
                </AnimatedFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <AnimatedFormField>
                  <PHInput
                    name="zipCode"
                    label="Zip Code"
                    fullWidth
                    disabled={!isEditing}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.8)",
                        "&.Mui-disabled": {
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.02)"
                              : "rgba(0, 0, 0, 0.02)",
                        },
                      },
                    }}
                  />
                </AnimatedFormField>
              </Grid>

              {/* Emergency Contact */}
              <Grid size={12}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    mt: 3,
                    color:
                      theme.palette.mode === "dark"
                        ? "#bbdefb"
                        : "text.primary",
                  }}
                >
                  Emergency Contact
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedFormField>
                  <PHInput
                    name="emergencyContactName"
                    label="Emergency Contact Name"
                    fullWidth
                    disabled={!isEditing}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.8)",
                        "&.Mui-disabled": {
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.02)"
                              : "rgba(0, 0, 0, 0.02)",
                        },
                      },
                    }}
                  />
                </AnimatedFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AnimatedFormField>
                  <PHInput
                    name="emergencyContact"
                    label="Emergency Contact Phone"
                    fullWidth
                    disabled={!isEditing}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.8)",
                        "&.Mui-disabled": {
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.02)"
                              : "rgba(0, 0, 0, 0.02)",
                        },
                      },
                    }}
                  />
                </AnimatedFormField>
              </Grid>

              {/* Action Buttons */}
              <Grid size={12}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "flex-end",
                    mt: 3,
                  }}
                >
                  {isEditing ? (
                    <>
                      <Button
                        variant="outlined"
                        onClick={() => setIsEditing(false)}
                        disabled={isLoading}
                        sx={{
                          borderRadius: 2,
                          px: 3,
                          py: 1.5,
                          fontWeight: 600,
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        disabled={isLoading}
                        sx={{
                          borderRadius: 2,
                          px: 3,
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
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => setIsEditing(true)}
                      sx={{
                        borderRadius: 2,
                        px: 3,
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
                      Edit Profile
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </PHForm>
        </AnimatedContactForm>
      </CardContent>
    </Card>
  );
};

export default AccountInformationTab;
