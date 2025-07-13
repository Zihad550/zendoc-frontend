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
    <Box sx={{ backgroundColor: theme.palette.grey[100], py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            component="span"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              fontSize: "1.1rem",
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
            }}
          >
            Our Core Values
          </Typography>
          <Divider
            sx={{
              width: 80,
              height: 4,
              backgroundColor: theme.palette.primary.main,
              mb: 3,
              mx: "auto",
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
                  borderRadius: 2,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: theme.shadows[10],
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
