"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

// Timeline data
const timelineEvents = [
  {
    id: 1,
    year: "2010",
    title: "Foundation",
    description:
      "ZenDoc was established with a mission to revolutionize healthcare accessibility. Our first clinic opened its doors with just 5 doctors and a small support team.",
    image:
      "https://res.cloudinary.com/dlem1hpam/image/upload/v1752379305/zen-doc/foundation_ieojwz.png",
    achievement: "Served 500+ patients in the first year",
  },
  {
    id: 2,
    year: "2012",
    title: "Technology Integration",
    description:
      "We pioneered the integration of digital health records and telemedicine services, setting new standards for healthcare delivery in the region.",
    image:
      "https://res.cloudinary.com/dlem1hpam/image/upload/v1752379306/zen-doc/technology_tmndlv.png",
    achievement: "Reduced wait times by 40%",
  },
  {
    id: 3,
    year: "2015",
    title: "Expansion Phase",
    description:
      "With growing patient trust, we expanded our services to include specialized treatments across multiple disciplines and opened two additional centers.",
    image:
      "https://res.cloudinary.com/dlem1hpam/image/upload/v1752379309/zen-doc/expansion_lrd8vq.png",
    achievement: "Added 20+ medical specialties",
  },
  {
    id: 4,
    year: "2018",
    title: "Research & Innovation",
    description:
      "We established our research department, focusing on developing innovative healthcare solutions and participating in global medical studies.",
    image:
      "https://res.cloudinary.com/dlem1hpam/image/upload/v1752379306/zen-doc/research_jb2eur.png",
    achievement: "Published 30+ research papers",
  },
  {
    id: 5,
    year: "2022",
    title: "Global Outreach",
    description:
      "ZenDoc expanded internationally, bringing quality healthcare to underserved communities across borders through partnerships and telemedicine.",
    image:
      "https://res.cloudinary.com/dlem1hpam/image/upload/v1752379308/zen-doc/global_ghomdz.png",
    achievement: "Present in 5 countries",
  },
  {
    id: 6,
    year: "2025",
    title: "Future Forward",
    description:
      "Today, we continue to evolve, implementing AI-driven diagnostics and personalized treatment plans while maintaining our core values of compassionate care.",
    image:
      "https://res.cloudinary.com/dlem1hpam/image/upload/v1752379304/zen-doc/future_czzkg6.png",
    achievement: "Serving 15,000+ patients annually",
  },
];

const HistoryTimeline = () => {
  const theme = useTheme();
  const [activeEvent, setActiveEvent] = useState(timelineEvents[0]);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ py: 10, backgroundColor: theme.palette.background.paper }}>
      <Container maxWidth="lg">
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
            Our Timeline
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              my: 2,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            The Evolution of ZenDoc
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
        </Box>

        {/* Timeline Navigation */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 6,
            overflowX: "auto",
            pb: 2,
            "&::-webkit-scrollbar": {
              height: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: theme.palette.grey[100],
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.primary.light,
              borderRadius: "3px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              position: "relative",
              minWidth: isMobile ? "auto" : "700px",
            }}
          >
            {/* Timeline Bar */}
            <Box
              sx={{
                position: "absolute",
                height: "4px",
                backgroundColor: theme.palette.grey[300],
                width: "100%",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 0,
              }}
            />

            {/* Timeline Points */}
            {timelineEvents.map((event) => (
              <Box
                key={event.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  zIndex: 1,
                  px: { xs: 1.5, sm: 2, md: 3 },
                }}
              >
                <Button
                  onClick={() => setActiveEvent(event)}
                  sx={{
                    minWidth: "auto",
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor:
                      activeEvent.id === event.id ? "primary.main" : "white",
                    border: `2px solid ${activeEvent.id === event.id ? theme.palette.primary.main : theme.palette.grey[400]}`,
                    mb: 1,
                    "&:hover": {
                      backgroundColor: "primary.main",
                      opacity: 0.8,
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  fontWeight={activeEvent.id === event.id ? 700 : 400}
                  color={
                    activeEvent.id === event.id
                      ? "primary.main"
                      : "text.secondary"
                  }
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.875rem" },
                  }}
                >
                  {event.year}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Event Details */}
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                backgroundColor: theme.palette.grey[50],
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                variant="h4"
                color="primary.main"
                sx={{ mb: 2, fontWeight: 700 }}
              >
                {activeEvent.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, fontSize: "1.1rem", lineHeight: 1.6 }}
              >
                {activeEvent.description}
              </Typography>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "primary.main",
                  color: "white",
                  borderRadius: 2,
                  display: "inline-flex",
                  alignItems: "center",
                  mt: "auto",
                  width: "fit-content",
                }}
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  Key Achievement: {activeEvent.achievement}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                height: { xs: 300, md: 400 },
                width: "100%",
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                transform: "perspective(1000px) rotateY(-5deg)",
                transition: "all 0.5s ease",
                "&:hover": {
                  transform: "perspective(1000px) rotateY(0deg)",
                },
              }}
            >
              <Image
                src={activeEvent.image}
                alt={activeEvent.title}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                priority
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HistoryTimeline;
