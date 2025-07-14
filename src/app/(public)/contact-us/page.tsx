"use client";
import assets from "@/assets";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { FieldValues } from "react-hook-form";
import { validationSchema } from "./contact";

const ContactUsPage = () => {
  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  const theme = useTheme();

  const onSubmit = (values: FieldValues) => {
    // Logic to handle form submission
    console.log(values);
    alert("Thank you for reaching out! We'll get back to you soon.");
  };

  const contactInfo = [
    {
      id: 1,
      icon: <EmailIcon sx={{ fontSize: 28 }} />,
      title: "Email Us",
      description: "Get in touch via email",
      value: "support@zendoc.com",
      color: "#2196f3",
    },
    {
      id: 2,
      icon: <PhoneIcon sx={{ fontSize: 28 }} />,
      title: "Call Us",
      description: "24/7 support hotline",
      value: "+1 (555) 123-4567",
      color: "#4caf50",
    },
    {
      id: 3,
      icon: <LocationOnIcon sx={{ fontSize: 28 }} />,
      title: "Visit Us",
      description: "Our main office",
      value: "123 Healthcare Ave, Medical City",
      color: "#ff9800",
    },
    {
      id: 4,
      icon: <AccessTimeIcon sx={{ fontSize: 28 }} />,
      title: "Working Hours",
      description: "We're here to help",
      value: "Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-5PM",
      color: "#9c27b0",
    },
  ];

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
        // Add subtle background patterns
        "&::before": {
          content: "'",
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
        "&::after": {
          content: "'",
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background:
            theme.palette.mode === "dark"
              ? `url(${assets.svgs.healthPattern})`
              : "none",
          opacity: 0.02,
          animation: "float 20s ease-in-out infinite",
          zIndex: 0,
          pointerEvents: "none",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
            "50%": { transform: "translateY(-20px) rotate(2deg)" },
          },
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 8 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Box sx={{ mb: 3 }}>
            <Image
              src={assets.svgs.logo}
              width={80}
              height={80}
              alt="ZenDoc Logo"
              style={{
                filter:
                  theme.palette.mode === "dark"
                    ? "drop-shadow(0 4px 8px rgba(33, 150, 243, 0.3))"
                    : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
              }}
            />
          </Box>
          <Typography
            component="span"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? "#64b5f6"
                  : theme.palette.primary.main,
              fontWeight: 600,
              fontSize: "1.1rem",
              textShadow:
                theme.palette.mode === "dark"
                  ? "0 0 10px rgba(100, 181, 246, 0.4)"
                  : "none",
            }}
          >
            CONNECT WITH US
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              my: 2,
              fontSize: { xs: "2.5rem", md: "3rem" },
              color: theme.palette.mode === "dark" ? "#e3f2fd" : "inherit",
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
            Get in Touch
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: "600px",
              mx: "auto",
              color:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.75)"
                  : "text.secondary",
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            We{"'"}re here to help you with your healthcare needs. Reach out to
            us anytime, and we{"'"}ll respond as quickly as possible.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Information Cards */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: theme.palette.mode === "dark" ? "#e3f2fd" : "inherit",
                }}
              >
                Contact Information
              </Typography>
              <Grid container spacing={3}>
                {contactInfo.map((info) => (
                  <Grid size={{ xs: 12, sm: 6, lg: 12 }} key={info.id}>
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
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow:
                            theme.palette.mode === "dark"
                              ? "0 8px 25px rgba(0, 0, 0, 0.3)"
                              : "0 8px 25px rgba(0, 0, 0, 0.1)",
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.08)"
                              : "rgba(255, 255, 255, 1)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: alpha(info.color, 0.1),
                            color: info.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {info.icon}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              mb: 0.5,
                              color:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.95)"
                                  : "inherit",
                            }}
                          >
                            {info.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.6)"
                                  : "text.secondary",
                              mb: 1,
                            }}
                          >
                            {info.description}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.85)"
                                  : "text.primary",
                              fontWeight: 500,
                            }}
                          >
                            {info.value}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Emergency Contact */}
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(244, 67, 54, 0.1)"
                    : "rgba(244, 67, 54, 0.05)",
                border:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(244, 67, 54, 0.3)"
                    : "1px solid rgba(244, 67, 54, 0.2)",
                textAlign: "center",
              }}
            >
              <LocalHospitalIcon
                sx={{
                  fontSize: 48,
                  color: "#f44336",
                  mb: 2,
                  filter: "drop-shadow(0 2px 4px rgba(244, 67, 54, 0.3))",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.95)"
                      : "inherit",
                }}
              >
                Emergency Contact
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.7)"
                      : "text.secondary",
                  mb: 2,
                }}
              >
                For medical emergencies, please call:
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#f44336",
                  textShadow:
                    theme.palette.mode === "dark"
                      ? "0 0 8px rgba(244, 67, 54, 0.5)"
                      : "none",
                }}
              >
                911
              </Typography>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 4,
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
                    ? "0 16px 40px rgba(0, 0, 0, 0.4)"
                    : "0 16px 40px rgba(0, 0, 0, 0.08)",
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
                      ? "linear-gradient(135deg, rgba(33, 150, 243, 0.02) 0%, transparent 50%, rgba(144, 202, 249, 0.01) 100%)"
                      : "linear-gradient(135deg, rgba(33, 150, 243, 0.01) 0%, transparent 50%, rgba(144, 202, 249, 0.005) 100%)",
                  pointerEvents: "none",
                  zIndex: 0,
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Box sx={{ mb: 4, textAlign: "center" }}>
                  <HeadsetMicIcon
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
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color:
                        theme.palette.mode === "dark" ? "#e3f2fd" : "inherit",
                    }}
                  >
                    Send us a Message
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.75)"
                          : "text.secondary",
                      maxWidth: "400px",
                      mx: "auto",
                      lineHeight: 1.6,
                    }}
                  >
                    Fill out the form below and we{"'"}ll get back to you within
                    24 hours.
                  </Typography>
                </Box>

                <Divider
                  sx={{
                    mb: 4,
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.1)",
                    height: 2,
                    borderRadius: 1,
                  }}
                />

                <PHForm
                  onSubmit={onSubmit}
                  defaultValues={defaultValues}
                  resolver={zodResolver(validationSchema)}
                >
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <PHInput
                        name="name"
                        label="Full Name"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor:
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.05)"
                                : "rgba(255, 255, 255, 0.8)",
                            "& fieldset": {
                              borderColor:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.2)"
                                  : "rgba(0, 0, 0, 0.1)",
                            },
                            "&:hover fieldset": {
                              borderColor:
                                theme.palette.mode === "dark"
                                  ? alpha(theme.palette.primary.main, 0.5)
                                  : theme.palette.primary.main,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: theme.palette.primary.main,
                              borderWidth: 2,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <PHInput
                        name="email"
                        label="Email Address"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor:
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.05)"
                                : "rgba(255, 255, 255, 0.8)",
                            "& fieldset": {
                              borderColor:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.2)"
                                  : "rgba(0, 0, 0, 0.1)",
                            },
                            "&:hover fieldset": {
                              borderColor:
                                theme.palette.mode === "dark"
                                  ? alpha(theme.palette.primary.main, 0.5)
                                  : theme.palette.primary.main,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: theme.palette.primary.main,
                              borderWidth: 2,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <PHInput
                        name="phone"
                        label="Phone Number"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor:
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.05)"
                                : "rgba(255, 255, 255, 0.8)",
                            "& fieldset": {
                              borderColor:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.2)"
                                  : "rgba(0, 0, 0, 0.1)",
                            },
                            "&:hover fieldset": {
                              borderColor:
                                theme.palette.mode === "dark"
                                  ? alpha(theme.palette.primary.main, 0.5)
                                  : theme.palette.primary.main,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: theme.palette.primary.main,
                              borderWidth: 2,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <PHInput
                        name="subject"
                        label="Subject"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor:
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.05)"
                                : "rgba(255, 255, 255, 0.8)",
                            "& fieldset": {
                              borderColor:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.2)"
                                  : "rgba(0, 0, 0, 0.1)",
                            },
                            "&:hover fieldset": {
                              borderColor:
                                theme.palette.mode === "dark"
                                  ? alpha(theme.palette.primary.main, 0.5)
                                  : theme.palette.primary.main,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: theme.palette.primary.main,
                              borderWidth: 2,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <PHInput
                        name="message"
                        label="Your Message"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor:
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.05)"
                                : "rgba(255, 255, 255, 0.8)",
                            "& fieldset": {
                              borderColor:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.2)"
                                  : "rgba(0, 0, 0, 0.1)",
                            },
                            "&:hover fieldset": {
                              borderColor:
                                theme.palette.mode === "dark"
                                  ? alpha(theme.palette.primary.main, 0.5)
                                  : theme.palette.primary.main,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: theme.palette.primary.main,
                              borderWidth: 2,
                            },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    fullWidth
                    sx={{
                      mt: 4,
                      py: 2,
                      px: 4,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      borderRadius: 3,
                      textTransform: "none",
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)"
                          : "linear-gradient(135deg, #1586FD 0%, #1976d2 100%)",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 4px 16px rgba(33, 150, 243, 0.4)"
                          : "0 4px 16px rgba(21, 134, 253, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background:
                          theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, #64b5f6 0%, #2196f3 100%)"
                            : "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 6px 20px rgba(33, 150, 243, 0.5)"
                            : "0 6px 20px rgba(21, 134, 253, 0.4)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </PHForm>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactUsPage;
