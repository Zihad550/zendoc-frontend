"use client";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";

// Define core values data structure
const coreValues = [
  {
    id: 1,
    title: "Excellence",
    description:
      "We strive for excellence in every aspect of our service, ensuring the highest standards of medical care.",
    icon: <MedicalServicesIcon sx={{ fontSize: 48 }} />,
  },
  {
    id: 2,
    title: "Integrity",
    description:
      "We uphold the highest ethical standards, ensuring transparency and honesty in all our interactions.",
    icon: <HealthAndSafetyIcon sx={{ fontSize: 48 }} />,
  },
  {
    id: 3,
    title: "Compassion",
    description:
      "We treat every patient with empathy and kindness, understanding their unique needs and concerns.",
    icon: <FavoriteIcon sx={{ fontSize: 48 }} />,
  },
  {
    id: 4,
    title: "Collaboration",
    description:
      "We work together with patients, families, and healthcare partners to achieve the best outcomes.",
    icon: <PeopleIcon sx={{ fontSize: 48 }} />,
  },
];

const CoreValuesSection = () => {
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
            ? 'radial-gradient(circle at 20% 30%, rgba(76, 175, 80, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(156, 39, 176, 0.04) 0%, transparent 50%)'
            : 'none',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            component="span"
            sx={{
              color: theme.palette.mode === 'dark' 
                ? '#81c784' 
                : theme.palette.primary.main,
              fontWeight: 600,
              fontSize: "1.1rem",
              textShadow: theme.palette.mode === 'dark' 
                ? '0 0 10px rgba(129, 199, 132, 0.3)' 
                : 'none',
            }}
          >
            WHAT DRIVES US
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
            Our Core Values
          </Typography>
          <Divider
            sx={{
              width: 80,
              height: 4,
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, #81c784 0%, #4caf50 100%)' 
                : theme.palette.primary.main,
              mb: 3,
              mx: "auto",
              borderRadius: 2,
              boxShadow: theme.palette.mode === 'dark' 
                ? '0 2px 8px rgba(76, 175, 80, 0.4)' 
                : 'none',
            }}
          />
        </Box>

        <Grid container spacing={4}>
          {coreValues.map((value) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={value.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: 3,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.04)' 
                    : 'background.paper',
                  border: theme.palette.mode === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.1)' 
                    : 'none',
                  boxShadow: theme.palette.mode === 'dark' 
                    ? '0 8px 24px rgba(0, 0, 0, 0.15)' 
                    : theme.shadows[2],
                  backdropFilter: theme.palette.mode === 'dark' 
                    ? 'blur(10px)' 
                    : 'none',
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: theme.palette.mode === 'dark' 
                      ? '0 12px 32px rgba(0, 0, 0, 0.25)' 
                      : theme.shadows[10],
                  },
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    color: theme.palette.primary.main,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {value.icon}
                </Box>
                <Typography
                  variant="h5"
                  align="center"
                  fontWeight={600}
                  gutterBottom
                >
                  {value.title}
                </Typography>
                <Typography align="center" color="textSecondary">
                  {value.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CoreValuesSection;
