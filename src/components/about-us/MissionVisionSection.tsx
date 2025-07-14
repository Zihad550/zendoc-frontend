"use client";
import assets from "@/assets";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const MissionVisionSection = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
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
            ? 'radial-gradient(circle at 30% 20%, rgba(33, 150, 243, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(120, 119, 198, 0.04) 0%, transparent 50%)'
            : 'none',
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}
        >
          <Box
            sx={{
              width: "80%",
              height: 500,
              position: "relative",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: theme.palette.mode === 'dark' 
                ? '0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)' 
                : theme.shadows[5],
              border: theme.palette.mode === 'dark' 
                ? '1px solid rgba(255, 255, 255, 0.1)' 
                : 'none',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, transparent 50%, rgba(120, 119, 198, 0.08) 100%)'
                  : 'none',
                pointerEvents: 'none',
                zIndex: 1,
              },
            }}
          >
            <Image
              src={assets.images.medicalConsultation}
              alt="Medical consultation"
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              component="span"
              sx={{
                color: theme.palette.mode === 'dark' 
                  ? '#64b5f6' 
                  : theme.palette.primary.main,
                fontWeight: 600,
                fontSize: "1.1rem",
                textShadow: theme.palette.mode === 'dark' 
                  ? '0 0 10px rgba(100, 181, 246, 0.3)' 
                  : 'none',
              }}
            >
              ABOUT ZENDOC
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
              Redefining Healthcare Experience
            </Typography>
            <Divider
              sx={{
                width: 80,
                height: 4,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(135deg, #64b5f6 0%, #2196f3 100%)' 
                  : theme.palette.primary.main,
                mb: 3,
                borderRadius: 2,
                boxShadow: theme.palette.mode === 'dark' 
                  ? '0 2px 8px rgba(33, 150, 243, 0.4)' 
                  : 'none',
              }}
            />
          </Box>

          <Box sx={{ display: "flex", mb: 4 }}>
            <Button
              onClick={() => setActiveTab("mission")}
              sx={{
                mr: 2,
                px: 3,
                color:
                  activeTab === "mission"
                    ? 'rgba(255, 255, 255, 0.9)'
                    : theme.palette.text.primary,
                backgroundColor:
                  activeTab === "mission"
                    ? theme.palette.mode === 'dark' 
                      ? 'rgba(33, 150, 243, 0.6)' 
                      : theme.palette.primary.main
                    : "transparent",
                border: theme.palette.mode === 'dark' 
                  ? '1px solid rgba(33, 150, 243, 0.8)' 
                  : 'none',
                borderRadius: 2,
                boxShadow: theme.palette.mode === 'dark' 
                  ? '0 2px 8px rgba(33, 150, 243, 0.4)' 
                  : 'none',
                "&:hover": {
                  backgroundColor:
                    activeTab === "mission"
                      ? theme.palette.primary.dark
                      : theme.palette.grey[100],
                  color: activeTab !== "mission" 
                    ? theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.8)' 
                      : theme.palette.text.primary
                    : 'inherit',
                },
              }}
            >
              Our Mission
            </Button>
            <Button
              onClick={() => setActiveTab("vision")}
              sx={{
                px: 3,
                color:
                  activeTab === "vision"
                    ? 'rgba(255, 255, 255, 0.9)'
                    : theme.palette.text.primary,
                backgroundColor:
                  activeTab === "vision"
                    ? theme.palette.mode === 'dark' 
                      ? 'rgba(33, 150, 243, 0.6)' 
                      : theme.palette.primary.main
                    : "transparent",
                border: theme.palette.mode === 'dark' 
                  ? '1px solid rgba(33, 150, 243, 0.8)' 
                  : 'none',
                borderRadius: 2,
                boxShadow: theme.palette.mode === 'dark' 
                  ? '0 2px 8px rgba(33, 150, 243, 0.4)' 
                  : 'none',
                "&:hover": {
                  backgroundColor:
                    activeTab === "vision"
                      ? theme.palette.primary.dark
                      : theme.palette.grey[100],
                  color: activeTab !== "vision" 
                    ? theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.8)' 
                      : theme.palette.text.primary
                    : 'inherit',
                },
              }}
            >
              Our Vision
            </Button>
          </Box>

          {activeTab === "mission" && (
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.02)' 
                  : 'transparent',
                border: theme.palette.mode === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.05)' 
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
                    ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.03) 0%, transparent 100%)' 
                    : 'none',
                  borderRadius: 2,
                  pointerEvents: 'none',
                },
              }}
            >
              <Typography 
                paragraph 
                sx={{ 
                  fontSize: "1.1rem", 
                  mb: 3,
                  color: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.9)' 
                    : 'inherit',
                  position: 'relative',
                  zIndex: 1,
                  lineHeight: 1.7,
                }}
              >
                At ZenDoc, our mission is to provide high-quality,
                patient-centered healthcare services that are accessible to all.
                We believe that healthcare should be personalized, convenient,
                and focused on your unique needs.
              </Typography>
              <Typography 
                paragraph 
                sx={{ 
                  fontSize: "1.1rem",
                  color: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.85)' 
                    : 'inherit',
                  position: 'relative',
                  zIndex: 1,
                  lineHeight: 1.7,
                }}
              >
                Through innovation, compassion, and excellence in medical
                practice, we strive to improve the health and well-being of the
                communities we serve. Our team of dedicated healthcare
                professionals is committed to delivering exceptional care with
                integrity and respect.
              </Typography>
            </Box>
          )}

          {activeTab === "vision" && (
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.02)' 
                  : 'transparent',
                border: theme.palette.mode === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.05)' 
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
                    ? 'linear-gradient(135deg, rgba(120, 119, 198, 0.03) 0%, transparent 100%)' 
                    : 'none',
                  borderRadius: 2,
                  pointerEvents: 'none',
                },
              }}
            >
              <Typography 
                paragraph 
                sx={{ 
                  fontSize: "1.1rem", 
                  mb: 3,
                  color: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.9)' 
                    : 'inherit',
                  position: 'relative',
                  zIndex: 1,
                  lineHeight: 1.7,
                }}
              >
                Our vision is to become the leading healthcare provider,
                recognized for excellence in patient care, technological
                innovation, and community health improvement. We envision a
                future where quality healthcare is available to everyone,
                regardless of location or circumstances.
              </Typography>
              <Typography 
                paragraph 
                sx={{ 
                  fontSize: "1.1rem",
                  color: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.85)' 
                    : 'inherit',
                  position: 'relative',
                  zIndex: 1,
                  lineHeight: 1.7,
                }}
              >
                By integrating cutting-edge technology with compassionate care,
                we aim to create a healthcare ecosystem that addresses the
                evolving needs of our patients, while setting new standards in
                medical service delivery and patient experience.
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MissionVisionSection;
