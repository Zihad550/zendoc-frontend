"use client";

import {
  alpha,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

// Icons
import ArticleIcon from "@mui/icons-material/Article";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import HealingIcon from "@mui/icons-material/Healing";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import InfoIcon from "@mui/icons-material/Info";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PhoneIcon from "@mui/icons-material/Phone";
import PolicyIcon from "@mui/icons-material/Policy";
import SendIcon from "@mui/icons-material/Send";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    // Handle newsletter subscription logic here
    console.log(`Subscribing email: ${email}`);
    setEmail("");
    // Add toast notification or confirmation message
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* Wave Shape Separator */}
      <Box
        sx={{
          position: "relative",
          height: 60,
          overflow: "hidden",
          marginBottom: -1,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: theme.palette.background.default,
            clipPath: "polygon(0 0, 100% 0, 100% 20%, 0% 100%)",
            zIndex: 1,
          }}
        />
      </Box>

      {/* Main Footer */}
      <Box
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          pt: 8,
          pb: 4,
          position: "relative",
          overflow: "hidden",
          borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundImage:
              "radial-gradient(circle, rgba(21, 134, 253, 0.6) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            zIndex: 0,
          }}
        />

        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={4}>
            {/* Company Info & Logo */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={3}>
                {/* Logo */}
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocalHospitalIcon
                    color="primary"
                    sx={{
                      fontSize: 36,
                      filter:
                        "drop-shadow(0px 2px 4px rgba(21, 134, 253, 0.3))",
                    }}
                  />
                  <Typography
                    variant="h4"
                    component={Link}
                    href="/"
                    fontWeight={700}
                    color="primary.main"
                    sx={{
                      textDecoration: "none",
                      letterSpacing: "-0.5px",
                      display: "flex",
                      alignItems: "center",
                      fontSize: { xs: "1.75rem", md: "2rem" },
                      textShadow: "0px 2px 4px rgba(21, 134, 253, 0.2)",
                    }}
                  >
                    ZenDoc
                  </Typography>
                </Stack>

                <Typography variant="body1" color="text.secondary">
                  Providing quality healthcare services to help you live a
                  healthier, happier life. Our team of medical professionals is
                  dedicated to your wellbeing.
                </Typography>

                {/* Contact Info */}
                <List disablePadding>
                  <ListItem disableGutters sx={{ pb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <PhoneIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="(555) 123-4567"
                      primaryTypographyProps={{ variant: "body2" }}
                    />
                  </ListItem>
                  <ListItem disableGutters sx={{ pb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <EmailIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="contact@zendoc.com"
                      primaryTypographyProps={{ variant: "body2" }}
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <LocationOnIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="123 Healthcare Ave, Medical District, City, State 12345"
                      primaryTypographyProps={{ variant: "body2" }}
                    />
                  </ListItem>
                </List>
              </Stack>
            </Grid>

            {/* Quick Links */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Typography
                variant="h6"
                fontWeight="600"
                mb={3}
                sx={{
                  position: "relative",
                  display: "inline-block",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "30px",
                    height: "2px",
                    bottom: "-8px",
                    left: "0",
                    backgroundColor: "primary.main",
                    borderRadius: "2px",
                  },
                }}
              >
                Services
              </Typography>
              <List disablePadding sx={{ mt: 2 }}>
                {[
                  {
                    label: "Consultation",
                    href: "/consultation",
                    icon: <MedicalServicesIcon fontSize="small" />,
                  },
                  {
                    label: "Health Plans",
                    href: "/health-plans",
                    icon: <HealthAndSafetyIcon fontSize="small" />,
                  },
                  {
                    label: "Services",
                    href: "/services",
                    icon: <HealingIcon fontSize="small" />,
                  },
                  {
                    label: "Doctors",
                    href: "/doctors",
                    icon: <LocalHospitalIcon fontSize="small" />,
                  },
                ].map((item) => (
                  <ListItem
                    key={item.label}
                    disableGutters
                    disablePadding
                    sx={{ mb: 1.5 }}
                  >
                    <Link
                      href={item.href}
                      style={{ textDecoration: "none", width: "100%" }}
                    >
                      <Box
                        component="div"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          py: 0.75,
                          pl: 0.5,
                          pr: 1,
                          borderRadius: 1,
                          position: "relative",
                          overflow: "hidden",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: "0",
                            borderRadius: "4px 0 0 4px",
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.1,
                            ),
                            transition: "width 0.3s ease",
                          },
                          "&:hover": {
                            "&::before": {
                              width: "100%",
                            },
                            "& .MuiSvgIcon-root": {
                              transform: "translateX(3px)",
                              color: theme.palette.primary.main,
                            },
                            "& .footerLinkText": {
                              color: theme.palette.primary.main,
                              transform: "translateX(3px)",
                            },
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.08,
                            ),
                            borderRadius: "50%",
                            mr: 1.5,
                            transition: "all 0.3s ease",
                          }}
                        >
                          {React.cloneElement(item.icon, {
                            sx: {
                              color: theme.palette.primary.main,
                              fontSize: "16px",
                              transition: "transform 0.3s ease",
                            },
                          })}
                        </Box>
                        <Typography
                          variant="body2"
                          className="footerLinkText"
                          sx={{
                            color: "text.secondary",
                            fontWeight: 500,
                            transition: "all 0.3s ease",
                            zIndex: 1,
                          }}
                        >
                          {item.label}
                        </Typography>
                      </Box>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Company Links */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Typography
                variant="h6"
                fontWeight="600"
                mb={3}
                sx={{
                  position: "relative",
                  display: "inline-block",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "30px",
                    height: "2px",
                    bottom: "-8px",
                    left: "0",
                    backgroundColor: "primary.main",
                    borderRadius: "2px",
                  },
                }}
              >
                Company
              </Typography>
              <List disablePadding sx={{ mt: 2 }}>
                {[
                  {
                    label: "About Us",
                    href: "/about-us",
                    icon: <InfoIcon fontSize="small" />,
                  },
                  {
                    label: "Contact Us",
                    href: "/contact-us",
                    icon: <EmailIcon fontSize="small" />,
                  },
                  {
                    label: "Our History",
                    href: "/history",
                    icon: <ArticleIcon fontSize="small" />,
                  },
                  {
                    label: "Careers",
                    href: "/careers",
                    icon: <HealingIcon fontSize="small" />,
                  },
                ].map((item) => (
                  <ListItem
                    key={item.label}
                    disableGutters
                    disablePadding
                    sx={{ mb: 1.5 }}
                  >
                    <Link
                      href={item.href}
                      style={{ textDecoration: "none", width: "100%" }}
                    >
                      <Box
                        component="div"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          py: 0.75,
                          pl: 0.5,
                          pr: 1,
                          borderRadius: 1,
                          position: "relative",
                          overflow: "hidden",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: "0",
                            borderRadius: "4px 0 0 4px",
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.1,
                            ),
                            transition: "width 0.3s ease",
                          },
                          "&:hover": {
                            "&::before": {
                              width: "100%",
                            },
                            "& .MuiSvgIcon-root": {
                              transform: "translateX(3px)",
                              color: theme.palette.primary.main,
                            },
                            "& .footerLinkText": {
                              color: theme.palette.primary.main,
                              transform: "translateX(3px)",
                            },
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.08,
                            ),
                            borderRadius: "50%",
                            mr: 1.5,
                            transition: "all 0.3s ease",
                          }}
                        >
                          {React.cloneElement(item.icon, {
                            sx: {
                              color: theme.palette.primary.main,
                              fontSize: "16px",
                              transition: "transform 0.3s ease",
                            },
                          })}
                        </Box>
                        <Typography
                          variant="body2"
                          className="footerLinkText"
                          sx={{
                            color: "text.secondary",
                            fontWeight: 500,
                            transition: "all 0.3s ease",
                            zIndex: 1,
                          }}
                        >
                          {item.label}
                        </Typography>
                      </Box>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Newsletter Subscription */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" fontWeight="600" mb={3}>
                Stay Updated
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  backgroundColor: alpha(theme.palette.primary.main, 0.03),
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: alpha(theme.palette.primary.main, 0.1),
                }}
              >
                <Typography variant="body2" mb={2}>
                  Subscribe to our newsletter for the latest health tips,
                  service updates, and special offers.
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{
                    mb: 2,
                    backgroundColor: "white",
                    borderRadius: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: alpha(theme.palette.primary.main, 0.2),
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          color="primary"
                          onClick={handleSubscribe}
                          disabled={!email}
                        >
                          <SendIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  By subscribing, you agree to our{" "}
                  <Link
                    href="/privacy-policy"
                    style={{ color: theme.palette.primary.main }}
                  >
                    Privacy Policy
                  </Link>{" "}
                  and consent to receive updates from ZenDoc.
                </Typography>
              </Paper>

              {/* Social Media Links */}
              <Stack direction="row" spacing={1} mt={3}>
                <IconButton
                  component="a"
                  href="https://facebook.com"
                  target="_blank"
                  aria-label="facebook"
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <FacebookIcon fontSize="small" />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://twitter.com"
                  target="_blank"
                  aria-label="twitter"
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://instagram.com"
                  target="_blank"
                  aria-label="instagram"
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <InstagramIcon fontSize="small" />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://linkedin.com"
                  target="_blank"
                  aria-label="linkedin"
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, opacity: 0.2 }} />

          {/* Bottom Section */}
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="caption" color="text.secondary">
                &copy; {new Date().getFullYear()} ZenDoc Healthcare. All Rights
                Reserved.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2 }}
                justifyContent={{ xs: "flex-start", md: "flex-end" }}
              >
                <Button
                  variant="text"
                  component={Link}
                  href="/privacy-policy"
                  color="inherit"
                  sx={{
                    fontSize: "0.75rem",
                    color: "text.secondary",
                    padding: "2px 8px",
                    minWidth: "auto",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "transparent",
                    },
                  }}
                  startIcon={<PolicyIcon sx={{ fontSize: "16px" }} />}
                >
                  Privacy Policy
                </Button>
                <Button
                  variant="text"
                  component={Link}
                  href="/terms-and-conditions"
                  color="inherit"
                  sx={{
                    fontSize: "0.75rem",
                    color: "text.secondary",
                    padding: "2px 8px",
                    minWidth: "auto",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "transparent",
                    },
                  }}
                  startIcon={<ArticleIcon sx={{ fontSize: "16px" }} />}
                >
                  Terms & Conditions
                </Button>
                <Button
                  variant="text"
                  component={Link}
                  href="/sitemap"
                  color="inherit"
                  sx={{
                    fontSize: "0.75rem",
                    color: "text.secondary",
                    padding: "2px 8px",
                    minWidth: "auto",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "transparent",
                    },
                  }}
                  startIcon={<InfoIcon sx={{ fontSize: "16px" }} />}
                >
                  Sitemap
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
