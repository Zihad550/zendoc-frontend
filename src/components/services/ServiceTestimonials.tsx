"use client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import StarIcon from "@mui/icons-material/Star";
import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/testimonials/avatar1.jpg",
    role: "Patient",
    content:
      "The online booking system made scheduling my appointments so convenient. I was able to see all available slots and choose one that perfectly fit my schedule. The doctors are knowledgeable and take time to listen to my concerns.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Brown",
    avatar: "/testimonials/avatar2.jpg",
    role: "Patient",
    content:
      "Virtual consultations have been a game-changer for me. Being able to speak with my doctor from home has saved me so much time and stress. The video quality is excellent, and I never feel rushed during appointments.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Davis",
    avatar: "/testimonials/avatar3.jpg",
    role: "Patient",
    content:
      "The specialist referral process was seamless. My primary care doctor coordinated everything, and I was able to see a specialist much faster than expected. The care coordination between departments is impressive.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Wilson",
    avatar: "/testimonials/avatar4.jpg",
    role: "Patient",
    content:
      "I appreciate the transparent pricing. Before any procedure, I know exactly what to expect in terms of cost. The e-prescription service is also very convenient - my medications are ready for pickup when I arrive at the pharmacy.",
    rating: 5,
  },
];

const ServiceTestimonials = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const displayedTestimonials =
    window.innerWidth >= 960 ? 3 : window.innerWidth >= 600 ? 2 : 1;

  // Handle navigation
  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0
        ? testimonials.length - displayedTestimonials
        : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - displayedTestimonials
        ? 0
        : prevIndex + 1,
    );
  };

  // Get visible testimonials
  const getVisibleTestimonials = () => {
    const visibleItems = [];
    for (let i = 0; i < displayedTestimonials; i++) {
      const index = (activeIndex + i) % testimonials.length;
      visibleItems.push(testimonials[index]);
    }
    return visibleItems;
  };

  return (
    <Box
      sx={{
        py: 10,
        backgroundImage: theme.palette.mode === 'dark' 
          ? "linear-gradient(to bottom, #0a0e27, #1a1a2e)"
          : "linear-gradient(to bottom, #f5f9ff, white)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: theme.palette.mode === 'dark'
            ? "radial-gradient(circle, rgba(66, 165, 245, 0.08) 0%, rgba(66, 165, 245, 0) 70%)"
            : "radial-gradient(circle, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0) 70%)",
          top: -150,
          left: -150,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: theme.palette.mode === 'dark'
            ? "radial-gradient(circle, rgba(66, 165, 245, 0.08) 0%, rgba(66, 165, 245, 0) 70%)"
            : "radial-gradient(circle, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0) 70%)",
          bottom: -200,
          right: -200,
        }}
      />

      <Container maxWidth="lg">
        {/* Section Title */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
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
            Patient Stories
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              my: 2,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            What Our Patients Say
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
              color: theme.palette.text.secondary,
            }}
          >
            Real experiences from patients who have used our healthcare services
          </Typography>
        </Box>

        {/* Testimonials Carousel */}
        <Grid container spacing={3}>
          {getVisibleTestimonials().map((testimonial) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={testimonial.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: theme.palette.mode === 'dark'
                    ? "0 10px 30px rgba(0,0,0,0.3)"
                    : "0 10px 30px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition: "all 0.3s ease",
                  border: "1px solid",
                  borderColor: theme.palette.mode === 'dark' ? "rgba(255,255,255,0.1)" : "transparent",
                  backgroundColor: theme.palette.mode === 'dark' ? "rgba(255,255,255,0.05)" : "background.paper",
                  "&:hover": {
                    borderColor: "primary.light",
                    transform: "translateY(-5px)",
                    boxShadow: theme.palette.mode === 'dark'
                      ? "0 15px 35px rgba(0,0,0,0.4)"
                      : "0 15px 35px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <FormatQuoteIcon
                  sx={{
                    color: "primary.light",
                    fontSize: 60,
                    opacity: 0.5,
                    position: "absolute",
                    top: 20,
                    right: 20,
                  }}
                />

                <Box sx={{ display: "flex", mb: 3, alignItems: "center" }}>
                  <Avatar
                    // src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{
                      width: 60,
                      height: 60,
                      boxShadow: theme.palette.mode === 'dark'
                        ? "0 5px 15px rgba(0,0,0,0.5)"
                        : "0 5px 15px rgba(0,0,0,0.1)",
                      border: theme.palette.mode === 'dark'
                        ? "3px solid rgba(255,255,255,0.1)"
                        : "3px solid white",
                    }}
                  />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                    <Box sx={{ display: "flex", mt: 0.5 }}>
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          fontSize="small"
                          sx={{
                            color:
                              i < testimonial.rating
                                ? "warning.main"
                                : "grey.300",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    flex: 1,
                    fontStyle: "italic",
                  }}
                >
                  {'"'}
                  {testimonial.content}
                  {'"'}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Navigation Controls */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            gap: 2,
          }}
        >
          <IconButton
            onClick={handlePrev}
            sx={{
              bgcolor: theme.palette.mode === 'dark' ? "rgba(255,255,255,0.1)" : "white",
              color: theme.palette.mode === 'dark' ? "text.primary" : "inherit",
              boxShadow: theme.palette.mode === 'dark'
                ? "0 5px 15px rgba(0,0,0,0.3)"
                : "0 5px 15px rgba(0,0,0,0.08)",
              "&:hover": {
                bgcolor: "primary.main",
                color: "white",
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              bgcolor: theme.palette.mode === 'dark' ? "rgba(255,255,255,0.1)" : "white",
              color: theme.palette.mode === 'dark' ? "text.primary" : "inherit",
              boxShadow: theme.palette.mode === 'dark'
                ? "0 5px 15px rgba(0,0,0,0.3)"
                : "0 5px 15px rgba(0,0,0,0.08)",
              "&:hover": {
                bgcolor: "primary.main",
                color: "white",
              },
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default ServiceTestimonials;
