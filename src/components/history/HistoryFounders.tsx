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
        backgroundColor: theme.palette.grey[50],
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decoration */}
      <Box
        sx={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          backgroundColor: theme.palette.primary.light,
          opacity: 0.05,
          top: "-200px",
          left: "-200px",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          backgroundColor: theme.palette.primary.light,
          opacity: 0.05,
          bottom: "-100px",
          right: "-100px",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Section Title */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            component="span"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              fontSize: "1.1rem",
              textTransform: "uppercase",
              letterSpacing: 1,
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
            }}
          >
            Meet Our Founders
          </Typography>
          <Box
            sx={{
              width: 80,
              height: 4,
              backgroundColor: "primary.main",
              mx: "auto",
              mb: 3,
            }}
          />
          <Typography
            variant="body1"
            sx={{
              maxWidth: "700px",
              mx: "auto",
              fontSize: "1.1rem",
              color: theme.palette.text.secondary,
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
                  boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
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
                    border: `4px solid ${theme.palette.primary.main}`,
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  {founder.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="primary.main"
                  sx={{ mb: 3, fontWeight: 600 }}
                >
                  {founder.role}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3, lineHeight: 1.6 }}
                >
                  {founder.bio}
                </Typography>
                <SocialMediaLinks mt={3} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HistoryFounders;
