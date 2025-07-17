'use client';
import femaleDocImg from '@/assets/how-it-works-img.png';
import appointmentIcon from '@/assets/icons/appointment-icon.png';
import charityIcon from '@/assets/icons/charity-icon.png';
import doctorIcon from '@/assets/icons/doctor-icon.png';
import searchIcon from '@/assets/icons/search-icon.png';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';

const HowItWorks = () => {
  const theme = useTheme();

  const stepCardStyle = {
    backgroundColor: theme.palette.mode === 'dark' ? '#1E2139' : '#fff',
    border:
      theme.palette.mode === 'dark'
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid lightgray',
    borderRadius: '10px',
    padding: { xs: '16px', sm: '20px' },
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 4px 20px rgba(0, 0, 0, 0.3)'
        : '0 2px 8px rgba(0, 0, 0, 0.1)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        {/* Header Section */}
        <Box
          sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 6 } }}
        >
          <Typography
            component="p"
            sx={{
              fontSize: { xs: 16, sm: 18, md: 20 },
              fontWeight: 400,
              color: 'primary.main',
              mb: 1.3,
            }}
          >
            How it Works
          </Typography>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' },
              mb: 2,
            }}
          >
            4 Easy Steps to Get Your Solution
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: { xs: 14, sm: 16, md: 18 },
              fontWeight: 400,
              lineHeight: 1.6,
              maxWidth: { md: '600px' },
            }}
          >
            Access to expert physicians and surgeons, advanced technologies and
            top-quality surgery facilities right here.
          </Typography>
        </Box>

        {/* Content Section */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Image Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: '300px', sm: '400px', md: '500px' },
                mb: { xs: 4, md: 0 },
              }}
            >
              <Image
                src={femaleDocImg}
                alt="doctor image"
                fill
                style={{
                  objectFit: 'cover',
                  borderRadius: '12px',
                }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Box>
          </Grid>

          {/* Steps Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={stepCardStyle}>
                  <Box sx={{ mb: 2 }}>
                    <Image
                      src={searchIcon}
                      alt="search-icon"
                      width={40}
                      height={40}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 500,
                      mb: 1,
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    }}
                  >
                    Search Doctor
                  </Typography>
                  <Typography
                    component="p"
                    sx={{
                      fontSize: { xs: 13, sm: 14 },
                      fontWeight: 400,
                      lineHeight: 1.5,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    Dolor sit amet consectetur. Scelerisque in eu mauris
                    volutpat Ornare.
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={stepCardStyle}>
                  <Box sx={{ mb: 2 }}>
                    <Image
                      src={doctorIcon}
                      alt="doctor-icon"
                      width={40}
                      height={40}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 500,
                      mb: 1,
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    }}
                  >
                    Check Doctor Profile
                  </Typography>
                  <Typography
                    component="p"
                    sx={{
                      fontSize: { xs: 13, sm: 14 },
                      fontWeight: 400,
                      lineHeight: 1.5,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    Dolor sit amet consectetur. Scelerisque in eu mauris
                    volutpat Ornare.
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={stepCardStyle}>
                  <Box sx={{ mb: 2 }}>
                    <Image
                      src={appointmentIcon}
                      alt="appointment-icon"
                      width={40}
                      height={40}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 500,
                      mb: 1,
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    }}
                  >
                    Schedule Appointment
                  </Typography>
                  <Typography
                    component="p"
                    sx={{
                      fontSize: { xs: 13, sm: 14 },
                      fontWeight: 400,
                      lineHeight: 1.5,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    Dolor sit amet consectetur. Scelerisque in eu mauris
                    volutpat Ornare.
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={stepCardStyle}>
                  <Box sx={{ mb: 2 }}>
                    <Image
                      src={charityIcon}
                      alt="solution-icon"
                      width={40}
                      height={40}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 500,
                      mb: 1,
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    }}
                  >
                    Get Your Solution
                  </Typography>
                  <Typography
                    component="p"
                    sx={{
                      fontSize: { xs: 13, sm: 14 },
                      fontWeight: 400,
                      lineHeight: 1.5,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    Dolor sit amet consectetur. Scelerisque in eu mauris
                    volutpat Ornare.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HowItWorks;
