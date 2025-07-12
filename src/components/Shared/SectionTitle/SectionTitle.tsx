"use client";
import { Box, SxProps, Theme, Typography, useTheme } from "@mui/material";
import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  color?: "primary" | "secondary" | "text" | "white";
  size?: "small" | "medium" | "large";
  withDivider?: boolean;
  withAnimation?: boolean;
  className?: string;
  titleProps?: React.ComponentProps<typeof Typography<"h2">>;
  subtitleProps?: React.ComponentProps<typeof Typography>;
  containerSx?: SxProps<Theme>;
  titleSx?: SxProps<Theme>;
  subtitleSx?: SxProps<Theme>;
  dividerSx?: SxProps<Theme>;
}

/**
 * A reusable component for section titles across the website
 *
 * @param title - Main title text
 * @param subtitle - Optional subtitle text
 * @param align - Text alignment
 * @param color - Color theme for the title
 * @param size - Size variant of the title
 * @param withDivider - Whether to show a decorative divider
 * @param withAnimation - Whether to animate the title on scroll into view
 * @param className - Additional CSS class name
 * @param titleProps - Additional props for the title Typography component
 * @param subtitleProps - Additional props for the subtitle Typography component
 * @param containerSx - Custom SX styles for the container
 * @param titleSx - Custom SX styles for the title
 * @param subtitleSx - Custom SX styles for the subtitle
 * @param dividerSx - Custom SX styles for the divider
 */
export default function SectionTitle({
  title,
  subtitle,
  align = "center",
  color = "primary",
  size = "medium",
  withDivider = true,
  withAnimation = false,
  className,
  titleProps,
  subtitleProps,
  containerSx,
  titleSx,
  subtitleSx,
  dividerSx,
}: SectionTitleProps) {
  const theme = useTheme();

  // Determine title variant based on size
  const getTitleVariant = () => {
    switch (size) {
      case "small":
        return "h5";
      case "large":
        return "h3";
      case "medium":
      default:
        return "h4";
    }
  };

  // Determine subtitle variant based on size
  const getSubtitleVariant = () => {
    switch (size) {
      case "small":
        return "body2";
      case "large":
        return "h6";
      case "medium":
      default:
        return "subtitle1";
    }
  };

  // Determine color based on prop
  const getColor = () => {
    switch (color) {
      case "primary":
        return theme.palette.primary.main;
      case "secondary":
        return theme.palette.secondary.main;
      case "white":
        return "#ffffff";
      case "text":
      default:
        return theme.palette.text.primary;
    }
  };

  // Get subtitle color based on main color
  const getSubtitleColor = () => {
    if (color === "white") return "rgba(255, 255, 255, 0.85)";
    return theme.palette.text.secondary;
  };

  // Animation styles if enabled
  const animationStyles = withAnimation
    ? {
        opacity: 0,
        transform: "translateY(20px)",
        animation: "fadeInUp 0.6s ease forwards",
        "@keyframes fadeInUp": {
          "0%": {
            opacity: 0,
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }
    : {};

  return (
    <Box
      className={`section-title ${className || ""}`}
      sx={{
        textAlign: align,
        mb: subtitle ? 2 : 4,
        ...animationStyles,
        ...containerSx,
      }}
    >
      <Typography
        variant={getTitleVariant()}
        component="h2"
        sx={{
          fontWeight: "bold",
          color: getColor(),
          mb: withDivider ? 1 : subtitle ? 1 : 0,
          position: "relative",
          display: "inline-block",
          ...titleSx,
        }}
        {...titleProps}
      >
        {title}
      </Typography>

      {withDivider && (
        <Box
          sx={{
            width:
              size === "small" ? "40px" : size === "large" ? "80px" : "60px",
            height: "4px",
            backgroundColor: getColor(),
            borderRadius: "2px",
            margin:
              align === "center"
                ? "auto"
                : align === "right"
                  ? "0 0 0 auto"
                  : "0 auto 0 0",
            mb: subtitle ? 2 : 0,
            ...dividerSx,
          }}
        />
      )}

      {subtitle && (
        <Typography
          variant={getSubtitleVariant()}
          sx={{
            mt: withDivider ? 2 : 1,
            color: getSubtitleColor(),
            maxWidth: align === "center" ? "700px" : "none",
            mx: align === "center" ? "auto" : 0,
            ...subtitleSx,
          }}
          {...subtitleProps}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
