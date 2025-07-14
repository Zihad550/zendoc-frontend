"use client";
import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import SocialMediaLinks from "../Shared/Links/SocialMediaLinks";

// Founders data
const founders = [
  {
    id: 1,
    name: "Jehad Hossain",
    role: "Founder & Chief Medical Officer",
    bio: "Dr. Jehad Hossain founded ZenDoc in 2010 with a vision to make quality healthcare accessible to all. With over 25 years of experience in internal medicine, she has been instrumental in shaping the patient-first approach that ZenDoc is known for today.",
    image:
      "https://res.cloudinary.com/dlem1hpam/image/upload/v1752375946/personal/jehad_ayhznq.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Co-Founder & Chief Innovation Officer",
    bio: "Dr. Chen joined Dr. Johnson at the inception of ZenDoc, bringing his expertise in medical technology. His pioneering work in integrating digital solutions into healthcare delivery has revolutionized patient care across all our centers.",
    image:
      "https://res.cloudinary.com/dlem1hpam/image/upload/v1752375782/businessman/businessman-3_ggtqit.png",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 3,
    name: "Rebecca Williams",
    role: "Co-Founder & Chief Operations Officer",
    bio: "With a background in healthcare administration, Rebecca has been the driving force behind ZenDoc's operational excellence. Her leadership has enabled the organization to scale effectively while maintaining the highest standards of care.",
    image:
      "https://res.cloudinary.com/dlem1hpam/image/upload/v1752375782/businessman/businessman-2_tgpab4.png",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
];

const HistoryFounders = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 10,
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(255, 255, 255, 0.01)' 
          : theme.palette.grey[50],
        position: "relative",
        overflow: "hidden",
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme.palette.mode === 'dark' 
            ? 'radial-gradient(circle at 15% 20%, rgba(156, 39, 176, 0.05) 0%, transparent 50%), radial-gradient(circle at 85% 80%, rgba(33, 150, 243, 0.04) 0%, transparent 50%)'
            : 'none',
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      {/* Background Decoration */}
      <Box
        sx={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: theme.palette.mode === 'dark' 
            ? 'radial-gradient(circle, rgba(156, 39, 176, 0.1) 0%, transparent 70%)'
            : theme.palette.primary.light,
          opacity: theme.palette.mode === 'dark' ? 0.3 : 0.05,
          top: "-200px",
          left: "-200px",
          zIndex: 0,
          animation: theme.palette.mode === 'dark' 
            ? 'pulse 6s ease-in-out infinite'
            : 'none',
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scale(1)', opacity: 0.3 },
            '50%': { transform: 'scale(1.05)', opacity: 0.15 },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: theme.palette.mode === 'dark' 
            ? 'radial-gradient(circle, rgba(33, 150, 243, 0.08) 0%, transparent 70%)'
            : theme.palette.primary.light,
          opacity: theme.palette.mode === 'dark' ? 0.4 : 0.05,
          bottom: "-100px",
          right: "-100px",
          zIndex: 0,
          animation: theme.palette.mode === 'dark' 
            ? 'pulse 8s ease-in-out infinite reverse'
            : 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Section Title */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            component="span"
            sx={{
              color: theme.palette.mode === 'dark' 
                ? '#ce93d8' 
                : "primary.main",
              fontWeight: 600,
              fontSize: "1.1rem",
              textTransform: "uppercase",
              letterSpacing: 1,
              textShadow: theme.palette.mode === 'dark' 
                ? '0 0 10px rgba(206, 147, 216, 0.4)' 
                : 'none',
            }}
          >
            The Visionaries
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
            Meet Our Founders
          </Typography>
          <Box
            sx={{
              width: 80,
              height: 4,
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, #ce93d8 0%, #9c27b0 100%)' 
                : "primary.main",
              mx: "auto",
              mb: 3,
              borderRadius: 2,
              boxShadow: theme.palette.mode === 'dark' 
                ? '0 2px 8px rgba(156, 39, 176, 0.4)' 
                : 'none',
            }}
          />
          <Typography
            variant="body1"
            sx={{
              maxWidth: "700px",
              mx: "auto",
              fontSize: "1.1rem",
              color: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.8)'
                : theme.palette.text.secondary,
              lineHeight: 1.6,
            }}
          >
            The passionate individuals who brought their expertise and vision
            together to create the healthcare institution we are today.
          </Typography>
        </Box>

        {/* Founders Grid */}
        <Grid container spacing={4} justifyContent="center">
          {founders.map((founder) => (
            <Grid size={{ xs: 12, md: 4 }} key={founder.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: 3,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.04)' 
                    : 'background.paper',
                  border: theme.palette.mode === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.1)' 
                    : 'none',
                  boxShadow: theme.palette.mode === 'dark' 
                    ? '0 8px 24px rgba(0, 0, 0, 0.15)' 
                    : '0 5px 20px rgba(0,0,0,0.05)',
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
                      ? 'linear-gradient(135deg, rgba(156, 39, 176, 0.02) 0%, transparent 50%, rgba(33, 150, 243, 0.01) 100%)' 
                      : 'none',
                    borderRadius: 3,
                    pointerEvents: 'none',
                    zIndex: 0,
                  },
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: theme.palette.mode === 'dark' 
                      ? '0 20px 40px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
                      : '0 15px 30px rgba(0,0,0,0.1)',
                    '&::before': {
                      background: theme.palette.mode === 'dark' 
                        ? 'linear-gradient(135deg, rgba(156, 39, 176, 0.05) 0%, transparent 50%, rgba(33, 150, 243, 0.03) 100%)' 
                        : 'none',
                    },
                  },
                }}
              >
                <Avatar
                  src={founder.image}
                  alt={founder.name}
                  sx={{
                    width: 120,
                    height: 120,
                    mb: 3,
                    border: theme.palette.mode === 'dark' 
                      ? `4px solid #ce93d8`
                      : `4px solid ${theme.palette.primary.main}`,
                    boxShadow: theme.palette.mode === 'dark' 
                      ? '0 0 20px rgba(206, 147, 216, 0.3)' 
                      : 'none',
                    position: 'relative',
                    zIndex: 1,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -8,
                      left: -8,
                      right: -8,
                      bottom: -8,
                      borderRadius: '50%',
                      background: theme.palette.mode === 'dark' 
                        ? 'linear-gradient(135deg, rgba(156, 39, 176, 0.2) 0%, rgba(33, 150, 243, 0.1) 100%)' 
                        : 'none',
                      animation: theme.palette.mode === 'dark' 
                        ? 'rotate 10s linear infinite' 
                        : 'none',
                      '@keyframes rotate': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' },
                      },
                      zIndex: -1,
                    },
                  }}
                />
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 1,
                    color: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.95)' 
                      : 'inherit',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {founder.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ 
                    color: theme.palette.mode === 'dark' 
                      ? '#ce93d8' 
                      : "primary.main",
                    mb: 3, 
                    fontWeight: 600,
                    textShadow: theme.palette.mode === 'dark' 
                      ? '0 0 8px rgba(206, 147, 216, 0.3)' 
                      : 'none',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {founder.role}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ 
                    color: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.75)'
                      : "text.secondary",
                    mb: 3, 
                    lineHeight: 1.6,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {founder.bio}
                </Typography>
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <SocialMediaLinks mt={3} />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HistoryFounders;
