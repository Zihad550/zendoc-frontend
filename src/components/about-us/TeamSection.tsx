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
            THE EXPERTS
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              my: 2,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Meet Our Team
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
          {teamMembers.map((member) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={member.id}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: theme.shadows[10],
                  },
                }}
              >
                <Box sx={{ position: "relative", height: 280 }}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography color="primary.main" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
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
