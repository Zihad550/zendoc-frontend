"use client";
import { Box, Container, Typography, Divider, useTheme } from "@mui/material";

// Define milestone data
const milestones = [
  { 
    id: 1,
    year: "2010", 
    title: "Founded", 
    description: "ZenDoc was established with a mission to provide accessible healthcare." 
  },
  { 
    id: 2,
    year: "2015", 
    title: "Expansion", 
    description: "Expanded our services to include specialized treatments and telemedicine." 
  },
  { 
    id: 3,
    year: "2018", 
    title: "Technology Integration", 
    description: "Implemented AI-driven diagnosis and treatment recommendation systems." 
  },
  { 
    id: 4,
    year: "2022", 
    title: "Global Reach", 
    description: "Extended our services internationally, helping patients across borders." 
  },
  { 
    id: 5,
    year: "2025", 
    title: "Today", 
    description: "Continuing to innovate and improve healthcare accessibility for all." 
  }
];

const MilestonesSection = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          component="span" 
          sx={{ 
            color: theme.palette.primary.main,
            fontWeight: 600,
            fontSize: '1.1rem'
          }}
        >
          OUR JOURNEY
        </Typography>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700, 
            my: 2,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          Milestones
        </Typography>
        <Divider sx={{ width: 80, height: 4, backgroundColor: theme.palette.primary.main, mb: 3, mx: 'auto' }} />
      </Box>

      <Box sx={{ position: 'relative' }}>
        {/* Vertical line */}
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: { xs: 20, md: '50%' },
            width: 4,
            backgroundColor: theme.palette.primary.light,
            transform: { md: 'translateX(-50%)' },
            display: { xs: 'none', sm: 'block' }
          }}
        />

        {/* Timeline items */}
        {milestones.map((milestone, index) => (
          <Box 
            key={milestone.id}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' },
              mb: 6,
              position: 'relative'
            }}
          >
            <Box 
              sx={{
                flex: 1,
                pr: { md: index % 2 === 0 ? 4 : 0 },
                pl: { md: index % 2 === 1 ? 4 : 0 },
                textAlign: { xs: 'left', md: index % 2 === 0 ? 'right' : 'left' }
              }}
            >
              <Typography 
                variant="h4" 
                color="primary.main" 
                fontWeight={700}
              >
                {milestone.year}
              </Typography>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                {milestone.title}
              </Typography>
              <Typography color="textSecondary">
                {milestone.description}
              </Typography>
            </Box>

            {/* Circle in the middle for desktop */}
            <Box 
              sx={{
                display: { xs: 'none', sm: 'block' },
                position: { md: 'absolute' },
                left: { md: '50%' },
                top: { md: '50%' },
                transform: { md: 'translate(-50%, -50%)' },
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: 'white',
                border: `4px solid ${theme.palette.primary.main}`,
                zIndex: 1
              }}
            />

            <Box sx={{ flex: 1 }} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default MilestonesSection;
