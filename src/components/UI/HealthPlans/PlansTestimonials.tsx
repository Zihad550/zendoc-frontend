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
const testimonials = [
  {
    id: 1,
    name: "Jennifer Lawrence",
    plan: "Family Plus Plan",
    quote:
      "Switching to the Family Plus plan was the best decision for our growing family. The coverage is comprehensive, and the pediatric care options are excellent.",
    rating: 5,
  },
  {
    id: 2,
    name: "Robert Miller",
    plan: "Senior Plus Plan",
    quote:
      "The Senior Plus plan has made managing my chronic conditions much easier. The prescription coverage and specialist access have been invaluable.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophia Garcia",
    plan: "Standard Care Plan",
    quote:
      "As a young professional, the Standard Care plan gives me peace of mind knowing I\'m covered for both preventive care and emergencies at an affordable price.",
    rating: 4,
  },
  {
    id: 4,
    name: "Marcus Johnson",
    plan: "Team Plus Plan",
    quote:
      "Our company switched to the Team Plus plan last year, and our employees have been very satisfied with the coverage and easy access to care.",
    rating: 5,
  },
  {
    id: 5,
    name: "Elena Rodriguez",
    plan: "Family Premium Plan",
    quote:
      "The comprehensive coverage of the Family Premium plan, especially the dental and vision benefits, has been a game-changer for our family of five.",
    rating: 5,
  },
];

export default function PlansTestimonials() {
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
                  // src={testimonial.avatar}
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
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    {testimonial.plan}
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
