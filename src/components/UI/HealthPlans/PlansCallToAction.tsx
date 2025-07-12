import { Box, Container, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function PlansCallToAction() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box 
      sx={{ 
        bgcolor: 'primary.main', 
        color: 'primary.contrastText',
        py: { xs: 6, md: 8 },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Patterns */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%',
          transform: 'translate(30%, -30%)'
        }}
      />
      <Box 
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%',
          transform: 'translate(-30%, 30%)'
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4
          }}
        >
          <Box sx={{ maxWidth: '600px' }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Ready to Secure Your Health?
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
              Enroll in one of our health plans today and start enjoying comprehensive healthcare coverage for you and your loved ones.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 4, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.main',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  borderRadius: '50px',
                  '&:hover': {
                    bgcolor: 'white',
                    opacity: 0.9,
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 15px rgba(0,0,0,0.1)'
                  }
                }}
              >
                Enroll Now
              </Button>
              
              <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  color: 'white',
                  borderColor: 'white',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  borderRadius: '50px',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Talk to an Advisor
              </Button>
            </Box>
          </Box>
          
          {!isMobile && (
            <Box 
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.1)',
                p: 3,
                borderRadius: 4,
                backdropFilter: 'blur(5px)',
                maxWidth: '300px'
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Need Help Choosing?
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Our healthcare advisors can help you find the perfect plan based on your:
              </Typography>
              <ul style={{ color: 'white', paddingLeft: '1.5rem', margin: 0 }}>
                <li>Healthcare needs</li>
                <li>Family situation</li>
                <li>Budget constraints</li>
                <li>Preferred doctors</li>
              </ul>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Schedule a free consultation today.
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
