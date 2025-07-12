import assets from "@/assets";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";

// Sample testimonial data
// TODO: integrate the user rating api
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: assets.avatars.avatar1,
    role: "Mother of two",
    quote:
      "The family plan has been a lifesaver for our busy household. Being able to consult with doctors remotely has saved us countless trips to the clinic.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: assets.avatars.avatar2,
    role: "Business professional",
    quote:
      "As someone who travels frequently for work, having 24/7 access to healthcare professionals gives me peace of mind no matter where I am.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: assets.avatars.avatar3,
    role: "Yoga instructor",
    quote:
      "The specialist consultations have been incredibly helpful for managing my chronic condition. The doctors are knowledgeable and take time to listen.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Williams",
    avatar: assets.avatars.avatar4,
    role: "Retired teacher",
    quote:
      "The medication reminder feature has been incredibly helpful. I never miss a dose now, and my health has improved significantly as a result.",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Adjust visible count based on screen size
  useEffect(() => {
    if (isMobile) {
      setVisibleCount(1);
    } else if (isTablet) {
      setVisibleCount(2);
    } else {
      setVisibleCount(3);
    }
  }, [isMobile, isTablet]);

  const handleNext = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex + 1) % (testimonials.length - visibleCount + 1),
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - visibleCount : prevIndex - 1,
    );
  };

  // Generate stars for rating
  const renderRating = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  // Get visible testimonials
  const visibleTestimonials = testimonials.slice(
    activeIndex,
    activeIndex + visibleCount,
  );

  return (
    <Box>
      {/* testimonials */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
        }}
      >
        <IconButton
          onClick={handlePrev}
          disabled={activeIndex === 0}
          sx={{
            color: "primary.main",
            opacity: activeIndex === 0 ? 0.5 : 1,
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            width: "100%",
            overflowX: "hidden",
            px: 2,
          }}
        >
          {visibleTestimonials.map((testimonial) => (
            <Paper
              key={testimonial.id}
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 2,
                flex: `0 0 calc(${100 / visibleCount}% - ${visibleCount > 1 ? "16px" : "0px"})`,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                },
              }}
            >
              <FormatQuoteIcon
                sx={{
                  color: "primary.light",
                  fontSize: 40,
                  position: "absolute",
                  top: 16,
                  right: 16,
                  opacity: 0.3,
                }}
              />

              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  minHeight: { xs: "auto", md: "120px" },
                  fontStyle: "italic",
                }}
              >
                {`"${testimonial.quote}"`}
              </Typography>

              <Box
                sx={{
                  mt: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt={testimonial.name}
                  sx={{
                    width: 50,
                    height: 50,
                    mr: 2,
                    bgcolor: "primary.main", // Fallback if image fails to load
                  }}
                >
                  {testimonial.name.charAt(0)}
                </Avatar>

                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {testimonial.role}
                  </Typography>
                  <Typography
                    sx={{
                      color: "warning.main",
                      fontSize: "0.875rem",
                    }}
                  >
                    {renderRating(testimonial.rating)}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>

        <IconButton
          onClick={handleNext}
          disabled={activeIndex >= testimonials.length - visibleCount}
          sx={{
            color: "primary.main",
            opacity:
              activeIndex >= testimonials.length - visibleCount ? 0.5 : 1,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* Pagination dots */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {Array.from({ length: testimonials.length - visibleCount + 1 }).map(
          (_, index) => (
            <Box
              key={index}
              onClick={() => setActiveIndex(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: activeIndex === index ? "primary.main" : "grey.300",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            />
          ),
        )}
      </Box>
    </Box>
  );
}
