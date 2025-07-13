"use client";
import assets from "@/assets";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "primary.main",
        color: "white",
        py: { xs: 8, md: 12 },
        overflow: "hidden",
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
          opacity: 0.1,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Wave Shape */}
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
            <Box>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  textShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                We Care About Your Health
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 400,
                  mb: 4,
                  opacity: 0.9,
                  maxWidth: "600px",
                }}
              >
                Providing exceptional healthcare services for over a decade
              </Typography>

              {/* Stats Cards */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  mt: 5,
                  mb: 5,
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 2,
                    backdropFilter: "blur(5px)",
                    maxWidth: "180px",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h4" fontWeight="bold">
                    15+
                  </Typography>
                  <Typography variant="body2">Years Experience</Typography>
                </Box>

                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 2,
                    backdropFilter: "blur(5px)",
                    maxWidth: "180px",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h4" fontWeight="bold">
                    50+
                  </Typography>
                  <Typography variant="body2">Expert Doctors</Typography>
                </Box>

                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 2,
                    backdropFilter: "blur(5px)",
                    maxWidth: "180px",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h4" fontWeight="bold">
                    100%
                  </Typography>
                  <Typography variant="body2">Patient Satisfaction</Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "white",
                  color: "primary.main",
                  py: 1.5,
                  px: 4,
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.9)",
                  },
                }}
              >
                Book an Appointment
              </Button>
            </Box>
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "90%",
                height: 450,
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                transform: "perspective(1000px) rotateY(-5deg)",
                transition: "transform 0.5s ease",
                "&:hover": {
                  transform: "perspective(1000px) rotateY(0deg)",
                },
              }}
            >
              <Image
                src={assets.images.doctor4}
                alt="Healthcare professionals"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
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

export default HeroSection;
