"use client";
import assets from "@/assets";
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";

export default function ConsultationHero() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "primary.main",
        color: "white",
        py: { xs: 6, md: 10 },
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: -2,
          left: 0,
          right: 0,
          height: "150px",
          background: "white",
          clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)",
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                mb: 2,
                textShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              Healthcare at Your Fingertips
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 400,
                mb: 3,
                opacity: 0.9,
                maxWidth: "600px",
              }}
            >
              Connect with expert doctors for personalized care from the comfort
              of your home.
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mt: 4,
              }}
            >
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 2,
                  backdropFilter: "blur(5px)",
                  maxWidth: "160px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  100+
                </Typography>
                <Typography variant="body2">Expert Doctors</Typography>
              </Box>

              <Box
                sx={{
                  p: 2,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 2,
                  backdropFilter: "blur(5px)",
                  maxWidth: "160px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  24/7
                </Typography>
                <Typography variant="body2">Available Support</Typography>
              </Box>

              <Box
                sx={{
                  p: 2,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 2,
                  backdropFilter: "blur(5px)",
                  maxWidth: "160px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  5000+
                </Typography>
                <Typography variant="body2">Happy Patients</Typography>
              </Box>
            </Box>
          </Grid>

          {!isMobile && (
            <Grid size={{ xs: 12, md: 6 }} sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "relative",
                  height: "400px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    backgroundColor: "background.paper",
                    borderRadius: "16px",
                    p: 2,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    width: "300px",
                    height: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.primary",
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >
                  <Image
                    src={assets.images.doctor3}
                    fill
                    alt="Doctor consultation"
                    style={{ objectFit: "cover", borderRadius: "14px" }}
                  />
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    right: 0,
                    bottom: 20,
                    backgroundColor: "background.paper",
                    borderRadius: "16px",
                    p: 2,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    width: "200px",
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.primary",
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >
                  <Image
                    src={assets.images.familyOnBeach}
                    alt="Patient on video call"
                    fill
                    style={{ objectFit: "cover", borderRadius: "14px" }}
                  />
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
