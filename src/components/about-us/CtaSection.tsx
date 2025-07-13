"use client";
import { Box, Container, Typography, Button, useTheme } from "@mui/material";

const CtaSection = () => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        py: 8, 
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        backgroundImage: 'linear-gradient(120deg, rgba(0,120,212,0.9) 0%, rgba(20,157,201,0.9) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background pattern */}
      <Box 
        sx={{ 
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/patterns/medical-pattern.png")', // Add this pattern to public/patterns folder
          opacity: 0.1,
          backgroundSize: '300px',
          zIndex: 0 
        }}
      />
      
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          fontWeight={700} 
          gutterBottom
          sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
        >
          Ready to Experience Better Healthcare?
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
          Join thousands of satisfied patients who trust us with their health
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          sx={{ 
            backgroundColor: 'white', 
            color: theme.palette.primary.main,
            py: 1.5,
            px: 4,
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: theme.palette.grey[100]
            }
          }}
        >
          Book an Appointment
        </Button>
      </Container>
    </Box>
  );
};

export default CtaSection;
