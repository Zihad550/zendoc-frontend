'use client';

import { Box, Container, Grid, Typography } from '@mui/material';

const Stats = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          backgroundImage: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #1A1D36, #2A2D4A, #1976D2)'
              : 'linear-gradient(45deg, blue, cyan)',
          borderRadius: { xs: '12px', sm: '16px', md: '20px' },
          margin: { xs: '16px auto', sm: '20px auto', md: '24px auto' },
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 8px 32px rgba(0, 0, 0, 0.4)'
              : '0 8px 24px rgba(0, 0, 0, 0.15)',
          border: (theme) =>
            theme.palette.mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : 'none',
        }}
      >
        <Grid
          container
          spacing={{ xs: 1, sm: 2, md: 3 }}
          textAlign="center"
          sx={{
            p: { xs: 2, sm: 3, md: 4, lg: 5 },
          }}
        >
          <Grid size={{ xs: 6, sm: 6, md: 3 }}>
            <Typography
              variant="h3"
              component="h2"
              fontWeight={500}
              color="white"
              sx={{
                fontSize: {
                  xs: '1.5rem',
                  sm: '2rem',
                  md: '2.5rem',
                  lg: '3rem',
                },
                mb: { xs: 0.5, sm: 1 },
              }}
            >
              180+
            </Typography>
            <Typography
              variant="h6"
              component="p"
              fontWeight={500}
              color="white"
              sx={{
                fontSize: {
                  xs: '0.75rem',
                  sm: '0.875rem',
                  md: '1rem',
                  lg: '1.25rem',
                },
                lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
              }}
            >
              Expert Doctors
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 3 }}>
            <Typography
              variant="h3"
              component="h2"
              fontWeight={500}
              color="white"
              sx={{
                fontSize: {
                  xs: '1.5rem',
                  sm: '2rem',
                  md: '2.5rem',
                  lg: '3rem',
                },
                mb: { xs: 0.5, sm: 1 },
              }}
            >
              26+
            </Typography>
            <Typography
              variant="h6"
              component="p"
              fontWeight={500}
              color="white"
              sx={{
                fontSize: {
                  xs: '0.75rem',
                  sm: '0.875rem',
                  md: '1rem',
                  lg: '1.25rem',
                },
                lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
              }}
            >
              Expert Services
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 3 }}>
            <Typography
              variant="h3"
              component="h2"
              fontWeight={500}
              color="white"
              sx={{
                fontSize: {
                  xs: '1.5rem',
                  sm: '2rem',
                  md: '2.5rem',
                  lg: '3rem',
                },
                mb: { xs: 0.5, sm: 1 },
              }}
            >
              10K+
            </Typography>
            <Typography
              variant="h6"
              component="p"
              fontWeight={500}
              color="white"
              sx={{
                fontSize: {
                  xs: '0.75rem',
                  sm: '0.875rem',
                  md: '1rem',
                  lg: '1.25rem',
                },
                lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
              }}
            >
              Happy Patients
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 3 }}>
            <Typography
              variant="h3"
              component="h2"
              fontWeight={500}
              color="white"
              sx={{
                fontSize: {
                  xs: '1.5rem',
                  sm: '2rem',
                  md: '2.5rem',
                  lg: '3rem',
                },
                mb: { xs: 0.5, sm: 1 },
              }}
            >
              150+
            </Typography>
            <Typography
              variant="h6"
              component="p"
              fontWeight={500}
              color="white"
              sx={{
                fontSize: {
                  xs: '0.75rem',
                  sm: '0.875rem',
                  md: '1rem',
                  lg: '1.25rem',
                },
                lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
              }}
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
