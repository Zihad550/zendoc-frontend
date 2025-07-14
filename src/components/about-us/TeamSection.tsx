"use client";
import assets from "@/assets";
import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";

// Mock data for team members
const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Chief Medical Officer",
    image: assets.images.doctor1, // These should be added to the public/team folder
    bio: "Dr. Johnson has over 15 years of experience in internal medicine and healthcare management.",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Head of Cardiology",
    image: assets.images.doctor2,
    bio: "Specializing in cardiovascular health, Dr. Chen has pioneered several treatment methodologies.",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Pediatric Specialist",
    image: assets.images.doctor3,
    bio: "With a gentle approach, Dr. Rodriguez ensures the best care for our youngest patients.",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    role: "Neurologist",
    image: assets.images.doctor4,
    bio: "Dr. Wilson combines traditional practices with cutting-edge research in neurology.",
  },
];

const TeamSection = () => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(255, 255, 255, 0.01)' 
          : theme.palette.grey[100], 
        py: 8,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme.palette.mode === 'dark' 
            ? 'radial-gradient(circle at 25% 25%, rgba(33, 150, 243, 0.08) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(144, 202, 249, 0.05) 0%, transparent 50%)'
            : 'none',
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            component="span"
            sx={{
              color: theme.palette.mode === 'dark' 
                ? '#64b5f6' 
                : theme.palette.primary.main,
              fontWeight: 600,
              fontSize: "1.1rem",
              textShadow: theme.palette.mode === 'dark' 
                ? '0 0 10px rgba(100, 181, 246, 0.4)' 
                : 'none',
            }}
          >
            THE EXPERTS
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              my: 2,
              fontSize: { xs: "2rem", md: "2.5rem" },
              color: theme.palette.mode === 'dark' 
                ? '#e3f2fd' 
                : 'inherit',
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' 
                : 'inherit',
              backgroundClip: theme.palette.mode === 'dark' 
                ? 'text' 
                : 'inherit',
              WebkitBackgroundClip: theme.palette.mode === 'dark' 
                ? 'text' 
                : 'inherit',
              WebkitTextFillColor: theme.palette.mode === 'dark' 
                ? 'transparent' 
                : 'inherit',
            }}
          >
            Meet Our Team
          </Typography>
          <Divider
            sx={{
              width: 80,
              height: 4,
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, #64b5f6 0%, #2196f3 100%)' 
                : theme.palette.primary.main,
              mb: 3,
              mx: "auto",
              borderRadius: 2,
              boxShadow: theme.palette.mode === 'dark' 
                ? '0 2px 8px rgba(33, 150, 243, 0.4)' 
                : 'none',
            }}
          />
        </Box>

        <Grid container spacing={4}>
          {teamMembers.map((member) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={member.id}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.03)' 
                    : 'background.paper',
                  border: theme.palette.mode === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.08)' 
                    : 'none',
                  boxShadow: theme.palette.mode === 'dark' 
                    ? '0 8px 24px rgba(0, 0, 0, 0.2)' 
                    : theme.shadows[2],
                  backdropFilter: theme.palette.mode === 'dark' 
                    ? 'blur(10px)' 
                    : 'none',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: theme.palette.mode === 'dark' 
                      ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.02) 0%, transparent 50%, rgba(144, 202, 249, 0.01) 100%)' 
                      : 'none',
                    pointerEvents: 'none',
                    zIndex: 0,
                    borderRadius: 2,
                  },
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: theme.palette.mode === 'dark' 
                      ? '0 16px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
                      : theme.shadows[10],
                    '&::before': {
                      background: theme.palette.mode === 'dark' 
                        ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.05) 0%, transparent 50%, rgba(144, 202, 249, 0.03) 100%)' 
                        : 'none',
                    },
                  },
                }}
              >
                <Box 
                  sx={{ 
                    position: "relative", 
                    height: 280,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: theme.palette.mode === 'dark' 
                        ? 'linear-gradient(180deg, transparent 0%, rgba(10, 14, 39, 0.1) 100%)' 
                        : 'none',
                      pointerEvents: 'none',
                      zIndex: 1,
                    },
                  }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ 
                      objectFit: "cover",
                      filter: theme.palette.mode === 'dark' 
                        ? 'brightness(0.95) contrast(1.05)' 
                        : 'none',
                    }}
                  />
                </Box>
                <Box 
                  sx={{ 
                    p: 3,
                    position: 'relative',
                    zIndex: 1,
                    background: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.02)' 
                      : 'transparent',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: theme.palette.mode === 'dark' 
                        ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.02) 0%, transparent 100%)' 
                        : 'none',
                      pointerEvents: 'none',
                      zIndex: 0,
                    },
                  }}
                >
                  <Typography 
                    variant="h6" 
                    fontWeight={600} 
                    gutterBottom
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                      color: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.95)' 
                        : 'inherit',
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Typography 
                    gutterBottom
                    sx={{
                      color: theme.palette.mode === 'dark' 
                        ? '#64b5f6' 
                        : 'primary.main',
                      position: 'relative',
                      zIndex: 1,
                      fontWeight: 500,
                      textShadow: theme.palette.mode === 'dark' 
                        ? '0 0 8px rgba(100, 181, 246, 0.3)' 
                        : 'none',
                    }}
                  >
                    {member.role}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{
                      color: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.75)' 
                        : 'textSecondary',
                      position: 'relative',
                      zIndex: 1,
                      lineHeight: 1.6,
                    }}
                  >
                    {member.bio}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TeamSection;
