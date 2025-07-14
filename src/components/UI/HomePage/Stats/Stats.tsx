"use client";

import { Box, Container, Grid, Typography } from "@mui/material";

const Stats = () => {
  return (
    <Container>
      <Box
        sx={{
          backgroundImage: (theme) => theme.palette.mode === "dark" 
            ? "linear-gradient(45deg, #1A1D36, #2A2D4A, #1976D2)"
            : "linear-gradient(45deg, blue, cyan)",
          borderRadius: "20px",
          margin: "50px auto",
          boxShadow: (theme) => theme.palette.mode === "dark" 
            ? "0 8px 32px rgba(0, 0, 0, 0.4)"
            : "0 8px 24px rgba(0, 0, 0, 0.15)",
          border: (theme) => theme.palette.mode === "dark" 
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "none",
        }}
      >
        <Grid container spacing={2} textAlign="center" p={5}>
          <Grid size={{ xs: 3 }}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight={500}
              color="white"
            >
              180+
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              fontWeight={500}
              color="white"
            >
              Expert Doctors
            </Typography>
          </Grid>
          <Grid size={{ xs: 3 }}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight={500}
              color="white"
            >
              26+
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              fontWeight={500}
              color="white"
            >
              Expert Services
            </Typography>
          </Grid>
          <Grid size={{ xs: 3 }}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight={500}
              color="white"
            >
              10K+
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              fontWeight={500}
              color="white"
            >
              Happy Patients
            </Typography>
          </Grid>
          <Grid size={{ xs: 3 }}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight={500}
              color="white"
            >
              150+
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              fontWeight={500}
              color="white"
            >
              Best Award Winners
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Stats;
