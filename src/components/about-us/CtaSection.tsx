"use client";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import Link from "next/link";

const CtaSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor:
          theme.palette.mode === "dark"
            ? "#0A0E27"
            : theme.palette.primary.main,
        color: "white",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #0A0E27 0%, #1A1D36 25%, rgba(33, 150, 243, 0.9) 100%)"
            : "linear-gradient(120deg, rgba(0,120,212,0.9) 0%, rgba(20,157,201,0.9) 100%)",
        position: "relative",
        overflow: "hidden",
        // Enhanced dark theme overlay
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(circle at 30% 20%, rgba(33, 150, 243, 0.15) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(144, 202, 249, 0.1) 0%, transparent 60%)"
              : "none",
          zIndex: 1,
          pointerEvents: "none",
        },
      }}
    >
      {/* Background pattern */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: theme.palette.mode === "dark" ? 0.03 : 0.1,
          backgroundSize: "300px",
          zIndex: 0,
          // Add subtle animation for dark theme
          ...(theme.palette.mode === "dark" && {
            animation: "float 20s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0px)" },
              "50%": { transform: "translateY(-10px)" },
            },
          }),
        }}
      />

      {/* Additional dark theme background elements */}
      {theme.palette.mode === "dark" && (
        <>
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              left: "10%",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(100, 181, 246, 0.1) 0%, transparent 70%)",
              zIndex: 1,
              animation: "pulse 4s ease-in-out infinite",
              "@keyframes pulse": {
                "0%, 100%": { transform: "scale(1)", opacity: 0.1 },
                "50%": { transform: "scale(1.1)", opacity: 0.05 },
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "15%",
              right: "15%",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(144, 202, 249, 0.08) 0%, transparent 70%)",
              zIndex: 1,
              animation: "pulse 6s ease-in-out infinite reverse",
            }}
          />
        </>
      )}

      <Container
        maxWidth="md"
        sx={{ position: "relative", zIndex: 2, textAlign: "center" }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
          sx={{
            fontSize: { xs: "2rem", md: "2.5rem" },
            // Dark theme gradient text
            ...(theme.palette.mode === "dark" && {
              background: "linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 4px 8px rgba(0,0,0,0.3)",
            }),
            // Light theme normal text
            ...(theme.palette.mode === "light" && {
              color: "white",
              textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }),
          }}
        >
          Ready to Experience Better Healthcare?
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            opacity: theme.palette.mode === "dark" ? 0.85 : 0.9,
            color:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.85)"
                : "white",
            textShadow:
              theme.palette.mode === "dark"
                ? "0 2px 4px rgba(0,0,0,0.3)"
                : "0 1px 2px rgba(0,0,0,0.1)",
            maxWidth: "600px",
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Join thousands of satisfied patients who trust us with their health
        </Typography>
        <Button
          component={Link}
          href="/consultation"
          variant="contained"
          size="large"
          sx={{
            // Dark theme button styles
            ...(theme.palette.mode === "dark" && {
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)",
              color: "#0A0E27",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(227, 242, 253, 0.95) 100%)",
                boxShadow:
                  "0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2)",
                transform: "translateY(-2px)",
              },
            }),
            // Light theme button styles
            ...(theme.palette.mode === "light" && {
              backgroundColor: "white",
              color: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.grey[100],
              },
            }),
            py: 1.5,
            px: 4,
            fontSize: "1rem",
            fontWeight: 600,
            borderRadius: "12px",
            textTransform: "none",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
            // Add subtle glow effect for dark theme
            ...(theme.palette.mode === "dark" && {
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(135deg, rgba(100, 181, 246, 0.1) 0%, transparent 100%)",
                opacity: 0,
                transition: "opacity 0.3s ease",
              },
              "&:hover::before": {
                opacity: 1,
              },
            }),
          }}
        >
          Book an Appointment
        </Button>
      </Container>
    </Box>
  );
};

export default CtaSection;
