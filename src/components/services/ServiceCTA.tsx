"use client";
import assets from "@/assets";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ServiceCTARegisterButton from "./ServiceCTAButton";

const ServiceCTA = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 10, md: 12 },
        position: "relative",
        overflow: "hidden",
        backgroundImage:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 25%, #1e3a8a 50%, #312e81 75%, #1a1a1a 100%)"
            : "linear-gradient(135deg, #1976d2 0%, #115293 100%)",
        color: "white",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)"
              : "none",
          pointerEvents: "none",
          zIndex: 1,
        },
        "& > *": {
          position: "relative",
          zIndex: 2,
        },
      }}
    >
      {/* Background pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: assets.svgs.healthPattern,
          backgroundSize: "300px",
        }}
      />

      {/* Wave shape */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "120px",
          background:
            theme.palette.mode === "dark"
              ? theme.palette.background.default
              : "white",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)",
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              component="span"
              sx={{
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
                opacity: 0.9,
              }}
            >
              Ready to Experience Better Healthcare?
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                my: 3,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                lineHeight: 1.2,
                textShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              Start Your Healthcare Journey With Us Today
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                mb: 5,
                opacity: 0.9,
                maxWidth: "600px",
              }}
            >
              Join thousands of satisfied patients who have chosen our
              healthcare platform for their medical needs. Book your first
              appointment in minutes.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexWrap: { xs: "wrap", sm: "nowrap" },
              }}
            >
              <ServiceCTARegisterButton />
              <Link
                href="/doctors"
                style={{ textDecoration: "none", flexGrow: 1 }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  sx={{
                    py: 1.8,
                    px: 4,
                    color: "white",
                    borderColor: "rgba(255,255,255,0.5)",
                    fontWeight: 600,
                    fontSize: "1rem",
                    textTransform: "none",
                    borderRadius: 2,
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                    minWidth: { xs: "100%", sm: 200 },
                  }}
                >
                  Browse Doctors
                </Button>
              </Link>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 5,
                flexWrap: "wrap",
                gap: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                  }}
                >
                  <Typography variant="h4" fontWeight="bold">
                    1
                  </Typography>
                </Box>
                <Typography>Create Account</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                  }}
                >
                  <Typography variant="h4" fontWeight="bold">
                    2
                  </Typography>
                </Box>
                <Typography>Select Service</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                  }}
                >
                  <Typography variant="h4" fontWeight="bold">
                    3
                  </Typography>
                </Box>
                <Typography>Book Appointment</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Box
              sx={{
                position: "relative",
                height: 500,
                width: "100%",
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                transform: "perspective(1000px) rotateY(5deg)",
                transition: "all 0.5s ease",
                "&:hover": {
                  transform: "perspective(1000px) rotateY(0deg)",
                },
              }}
            >
              <Image
                src={assets.images.medicalConsultation}
                alt="Doctor Consultation"
                fill
                style={{
                  objectFit: "cover",
                }}
                priority
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ServiceCTA;
