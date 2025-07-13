"use client";
import { Box, Container, Typography, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ServicesHero = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: 'primary.main',
        color: 'white',
        py: { xs: 8, md: 12 },
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Wave Shape */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -2,
          left: 0,
          right: 0,
          height: '150px',
          background: 'white',
          clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)',
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto',
            px: { xs: 2, md: 0 },
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 2,
              textShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            Our Healthcare Services
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 400,
              mb: 5,
              opacity: 0.9,
              maxWidth: '700px',
              mx: 'auto',
            }}
          >
            Comprehensive medical care tailored to your individual needs
          </Typography>

          {/* Search Bar */}
          <Box
            sx={{
              display: 'flex',
              maxWidth: '600px',
              mx: 'auto',
              mb: 6,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 0 },
            }}
          >
            <TextField
              fullWidth
              placeholder="Search for a service..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'rgba(0,0,0,0.54)' }} />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: 'white',
                  borderRadius: '4px 0 0 4px',
                  '& fieldset': { 
                    borderColor: 'transparent',
                    borderRight: { xs: '1px solid transparent', sm: 'none' },
                    borderRadius: { xs: '4px', sm: '4px 0 0 4px' },
                  },
                }
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: 'secondary.main',
                color: 'white',
                px: 4,
                borderRadius: { xs: '4px', sm: '0 4px 4px 0' },
                '&:hover': {
                  bgcolor: 'secondary.dark',
                },
              }}
            >
              Search
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                p: 2,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 2,
                backdropFilter: 'blur(5px)',
                maxWidth: '180px',
                width: '100%',
                textAlign: 'center',
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                25+
              </Typography>
              <Typography variant="body2">Medical Specialties</Typography>
            </Box>

            <Box
              sx={{
                p: 2,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 2,
                backdropFilter: 'blur(5px)',
                maxWidth: '180px',
                width: '100%',
                textAlign: 'center',
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
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 2,
                backdropFilter: 'blur(5px)',
                maxWidth: '180px',
                width: '100%',
                textAlign: 'center',
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                24/7
              </Typography>
              <Typography variant="body2">Available Support</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ServicesHero;
