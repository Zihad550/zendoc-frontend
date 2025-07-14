"use client";
import assets from "@/assets";
import { Box, Button, Container, Typography, alpha } from "@mui/material";
import Image from "next/image";

const HeroSection = () => {
  return (
    <Container
      sx={{
        display: "flex",
        direction: "row",
        my: 16,
        position: "relative",
        overflow: "hidden",
        // Add subtle background effects for dark theme
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? `radial-gradient(circle at 30% 20%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 50%),
               radial-gradient(circle at 70% 80%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 50%)`
              : "none",
          zIndex: -1,
          pointerEvents: "none",
        },
      }}
    >
      <Box sx={{ flex: 1, position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            width: "700px",
            left: "-90px",
            top: "-120px",
            opacity: (theme) => (theme.palette.mode === "dark" ? 0.6 : 1),
            filter: (theme) =>
              theme.palette.mode === "dark"
                ? "brightness(0.8) contrast(1.2) hue-rotate(10deg)"
                : "none",
            transition: "all 0.3s ease",
          }}
        >
          <Image src={assets.svgs.grid} alt="background grid" />
        </Box>
        <Typography
          variant="h2"
          component="h1"
          fontWeight={600}
          sx={{
            // Dark mode gradient text
            ...(theme) => theme.palette.mode === "dark" && {
              background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${alpha(theme.palette.text.primary, 0.8)} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            },
            // Light mode normal text
            ...(theme) => theme.palette.mode === "light" && {
              color: theme.palette.text.primary,
            },
          }}
        >
          Healthier Hearts
        </Typography>
        <Typography
          variant="h2"
          component="h1"
          fontWeight={600}
          sx={{
            // Dark mode gradient text
            ...(theme) => theme.palette.mode === "dark" && {
              background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${alpha(theme.palette.text.primary, 0.8)} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            },
            // Light mode normal text
            ...(theme) => theme.palette.mode === "light" && {
              color: theme.palette.text.primary,
            },
          }}
        >
          Come From
        </Typography>
        <Typography
          variant="h2"
          component="h1"
          fontWeight={600}
          sx={{
            position: "relative",
            // Dark mode gradient text
            ...(theme) => theme.palette.mode === "dark" && {
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.4)}`,
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-8px",
                left: 0,
                width: "100%",
                height: "4px",
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.5)} 100%)`,
                borderRadius: "2px",
                opacity: 0.7,
              },
            },
            // Light mode normal text
            ...(theme) => theme.palette.mode === "light" && {
              color: theme.palette.primary.main,
            },
          }}
        >
          Preventive Care
        </Typography>
        <Typography
          sx={{
            my: 4,
            fontSize: "1.1rem",
            lineHeight: 1.7,
            maxWidth: "90%",
            // Dark mode styling
            ...(theme) => theme.palette.mode === "dark" && {
              color: alpha(theme.palette.text.primary, 0.85),
            },
            // Light mode styling
            ...(theme) => theme.palette.mode === "light" && {
              color: theme.palette.text.secondary,
            },
          }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit eum
          iusto consequatur eius, doloribus nesciunt facere aliquid eveniet et.
          Rerum maiores saepe cupiditate repellat recusandae atque sed. Saepe,
          vitae id?
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 5 }}>
          <Button
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
              borderRadius: "12px",
              textTransform: "none",
              transition: "all 0.3s ease",
              // Dark mode styles
              ...(theme) => theme.palette.mode === "dark" && {
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                  boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.5)}`,
                  transform: "translateY(-2px)",
                },
              },
              // Light mode styles
              ...(theme) => theme.palette.mode === "light" && {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                  boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                  transform: "translateY(-2px)",
                },
              },
            }}
          >
            Make appointment
          </Button>
          <Button
            variant="outlined"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
              borderRadius: "12px",
              textTransform: "none",
              borderWidth: 2,
              transition: "all 0.3s ease",
              // Dark mode styles
              ...(theme) => theme.palette.mode === "dark" && {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                "&:hover": {
                  borderColor: theme.palette.primary.light,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
                  transform: "translateY(-2px)",
                },
              },
              // Light mode styles
              ...(theme) => theme.palette.mode === "light" && {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: alpha(theme.palette.primary.main, 0.04),
                  boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.15)}`,
                  transform: "translateY(-2px)",
                },
              },
            }}
          >
            Contact us
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          p: 1,
          flex: 1,
          display: "flex",
          justifyContent: "center",
          position: "relative",
          mt: 0,
          // Add subtle glow effect for dark theme
          "&::before": {
            content: '""',
            position: "absolute",
            top: "10%",
            left: "10%",
            right: "10%",
            bottom: "10%",
            background: (theme) =>
              theme.palette.mode === "dark"
                ? `radial-gradient(ellipse at center, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 70%)`
                : "none",
            borderRadius: "50%",
            zIndex: 0,
            pointerEvents: "none",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: "200px",
            top: "-30px",
            opacity: (theme) => (theme.palette.mode === "dark" ? 0.8 : 1),
            filter: (theme) =>
              theme.palette.mode === "dark"
                ? "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
                : "none",
            transition: "all 0.3s ease",
          }}
        >
          <Image src={assets.svgs.arrow} width={100} height={100} alt="arrow" />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            mt={4}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 8px 32px rgba(0,0,0,0.4)"
                  : "0 4px 16px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: (theme) =>
                  theme.palette.mode === "dark"
                    ? "0 12px 40px rgba(0,0,0,0.5)"
                    : "0 8px 24px rgba(0,0,0,0.15)",
              },
              "& img": {
                filter: (theme) =>
                  theme.palette.mode === "dark"
                    ? "brightness(0.95) contrast(1.1)"
                    : "none",
                transition: "filter 0.3s ease",
              },
            }}
          >
            <Image
              src={assets.images.doctor1}
              width={240}
              height={380}
              alt="doctor1"
            />
          </Box>
          <Box
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 8px 32px rgba(0,0,0,0.4)"
                  : "0 4px 16px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: (theme) =>
                  theme.palette.mode === "dark"
                    ? "0 12px 40px rgba(0,0,0,0.5)"
                    : "0 8px 24px rgba(0,0,0,0.15)",
              },
              "& img": {
                filter: (theme) =>
                  theme.palette.mode === "dark"
                    ? "brightness(0.95) contrast(1.1)"
                    : "none",
                transition: "filter 0.3s ease",
              },
            }}
          >
            <Image
              src={assets.images.doctor2}
              width={240}
              height={350}
              alt="doctor2"
            />
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "220px",
            left: "150px",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 8px 32px rgba(0,0,0,0.4)"
                : "0 4px 16px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px) scale(1.02)",
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 12px 40px rgba(0,0,0,0.5)"
                  : "0 8px 24px rgba(0,0,0,0.15)",
            },
            "& img": {
              filter: (theme) =>
                theme.palette.mode === "dark"
                  ? "brightness(0.95) contrast(1.1)"
                  : "none",
              transition: "filter 0.3s ease",
            },
          }}
        >
          <Image
            src={assets.images.doctor3}
            width={240}
            height={240}
            alt="doctor3"
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "-50px",
            right: 0,
            zIndex: "-1",
            opacity: (theme) => (theme.palette.mode === "dark" ? 0.7 : 1),
            filter: (theme) =>
              theme.palette.mode === "dark"
                ? "drop-shadow(0 4px 16px rgba(0,0,0,0.3)) brightness(0.9)"
                : "none",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "rotate(5deg) scale(1.05)",
              opacity: (theme) => (theme.palette.mode === "dark" ? 0.8 : 1),
            },
          }}
        >
          <Image
            src={assets.images.stethoscope}
            width={180}
            height={180}
            alt="stethoscope"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
