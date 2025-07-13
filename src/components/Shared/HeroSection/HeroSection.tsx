"use client";
import { Box, Container, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";

export type FeatureItem = {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
};

export type BackgroundPattern = {
  type: "dots" | "grid" | "radial" | "custom" | "none";
  customSvg?: string;
  opacity?: number;
  animation?: boolean;
  animationDuration?: number;
};

export type HeroSectionProps = {
  title: string;
  subtitle: string;
  mainIcon?: React.ElementType;
  features?: FeatureItem[];
  backgroundPattern?: BackgroundPattern;
  waveShape?: "standard" | "angular" | "curved" | "none";
  additionalContent?: ReactNode;
  textGradient?: boolean;
  iconContainerShape?: "circle" | "square" | "rounded";
  centerIconSize?: number;
  featureAnimation?: boolean;
};

const HeroSection = ({
  title,
  subtitle,
  mainIcon: MainIcon,
  features = [],
  backgroundPattern = {
    type: "dots",
    opacity: 0.07,
    animation: true,
    animationDuration: 30,
  },
  waveShape = "standard",
  additionalContent,
  textGradient = false,
  iconContainerShape = "circle",
  centerIconSize = 80,
  featureAnimation = true,
}: HeroSectionProps) => {
  const theme = useTheme();

  // Standard medium padding for all hero sections
  const paddingY = { xs: 8, md: 12 };

  // Get the appropriate SVG for the background pattern
  const getBackgroundPattern = () => {
    switch (backgroundPattern.type) {
      case "dots":
        return `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`;
      case "grid":
        return `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`;
      case "radial":
        return "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)";
      case "custom":
        return backgroundPattern.customSvg || "";
      default:
        return "";
    }
  };

  // Get the appropriate clip path for the wave shape
  const getWaveShape = () => {
    switch (waveShape) {
      case "standard":
        return "polygon(0 100%, 100% 100%, 100% 25%, 0 100%)";
      case "angular":
        return "polygon(0 100%, 100% 100%, 100% 0)";
      case "curved":
        return "ellipse(50% 50% at 50% 100%)";
      case "none":
        return "";
      default:
        return "polygon(0 100%, 100% 100%, 100% 25%, 0 100%)";
    }
  };

  // Get the appropriate border radius for the icon container
  const getIconContainerShape = () => {
    switch (iconContainerShape) {
      case "circle":
        return "50%";
      case "square":
        return "16px";
      case "rounded":
        return "30px";
      default:
        return "50%";
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #0A5CB8 100%)`,
        color: "white",
        py: paddingY,
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      {backgroundPattern.type !== "none" && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: backgroundPattern.opacity || 0.07,
            backgroundImage: getBackgroundPattern(),
            backgroundSize:
              backgroundPattern.type === "radial" ? "20px 20px" : "auto",
            ...(backgroundPattern.animation && {
              animation: `slide ${backgroundPattern.animationDuration || 30}s linear infinite`,
              "@keyframes slide": {
                "0%": {
                  backgroundPosition: "0 0",
                },
                "100%": {
                  backgroundPosition:
                    backgroundPattern.type === "dots"
                      ? "100px 100px"
                      : "60px 60px",
                },
              },
            }),
          }}
        />
      )}

      {/* Wave Shape */}
      {waveShape !== "none" && (
        <Box
          sx={{
            position: "absolute",
            bottom: -2,
            left: 0,
            right: 0,
            height: waveShape === "angular" ? "100px" : "120px",
            background: "white",
            clipPath: getWaveShape(),
            zIndex: 1,
          }}
        />
      )}

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "900px",
            mx: "auto",
            px: { xs: 2, md: 0 },
          }}
        >
          {/* Main Icon */}
          {MainIcon && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: centerIconSize,
                  height: centerIconSize,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderRadius: getIconContainerShape(),
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -5,
                    left: -5,
                    right: -5,
                    bottom: -5,
                    borderRadius: getIconContainerShape(),
                    border: "2px solid rgba(255,255,255,0.2)",
                    animation: "pulse 2s infinite",
                  },
                  "@keyframes pulse": {
                    "0%": {
                      transform: "scale(0.95)",
                      opacity: 0.7,
                    },
                    "70%": {
                      transform: "scale(1.05)",
                      opacity: 0.3,
                    },
                    "100%": {
                      transform: "scale(0.95)",
                      opacity: 0.7,
                    },
                  },
                }}
              >
                <MainIcon sx={{ fontSize: centerIconSize / 2 }} />
              </Box>
            </Box>
          )}

          {/* Title */}
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              mb: 2,
              textShadow: "0 2px 10px rgba(0,0,0,0.1)",
              ...(textGradient && {
                background:
                  "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }),
            }}
          >
            {title}
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 400,
              mb: 5,
              opacity: 0.9,
              maxWidth: "800px",
              mx: "auto",
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </Typography>

          {/* Feature Boxes */}
          {features.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                mt: 5,
                justifyContent: "center",
              }}
            >
              {features.map((feature) => {
                const FeatureIcon = feature.icon;
                return (
                  <Box
                    key={feature.id}
                    sx={{
                      p: 3,
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderRadius: 3,
                      backdropFilter: "blur(5px)",
                      maxWidth: "250px",
                      width: "100%",
                      textAlign: "center",
                      ...(featureAnimation && {
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          backgroundColor: "rgba(255,255,255,0.15)",
                        },
                      }),
                      boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", justifyContent: "center", mb: 2 }}
                    >
                      <FeatureIcon sx={{ fontSize: 40 }} />
                    </Box>
                    <Typography variant="h6" fontWeight="bold" mb={1}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2">
                      {feature.description}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          )}

          {/* Additional Content */}
          {additionalContent}
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
