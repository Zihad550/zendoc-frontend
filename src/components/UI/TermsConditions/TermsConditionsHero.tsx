"use client";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import GavelIcon from "@mui/icons-material/Gavel";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { Box, Container, Typography, useTheme } from "@mui/material";

export default function TermsConditionsHero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #0A5CB8 100%)`,
        color: "white",
        py: { xs: 8, md: 12 },
        overflow: "hidden",
      }}
    >
      {/* Animated background dots */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.07,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
          animation: "float 60s linear infinite",
          "@keyframes float": {
            "0%": {
              backgroundPosition: "0 0",
            },
            "100%": {
              backgroundPosition: "100px 100px",
            },
          },
        }}
      />

      {/* Angular Wave Shape */}
      <Box
        sx={{
          position: "absolute",
          bottom: -2,
          left: 0,
          right: 0,
          height: "100px",
          background: "white",
          clipPath: "polygon(0 100%, 100% 100%, 100% 0)",
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "900px",
            mx: "auto",
            px: { xs: 2, md: 0 },
          }}
        >
          {/* Gavel Icon */}
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
                width: 84,
                height: 84,
                backgroundColor: "rgba(255,255,255,0.15)",
                borderRadius: "16px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                position: "relative",
                transform: "rotate(-5deg)",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  borderRadius: "16px",
                  padding: "2px",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.1))",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, " +
                    "linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                },
              }}
            >
              <GavelIcon sx={{ fontSize: 40 }} />
            </Box>
          </Box>

          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              mb: 2,
              textShadow: "0 2px 10px rgba(0,0,0,0.1)",
              background:
                "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Terms & Conditions
          </Typography>

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
            Please read these terms carefully before using our healthcare
            services.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              mt: 5,
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                p: 3,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 3,
                backdropFilter: "blur(5px)",
                maxWidth: "250px",
                width: "100%",
                textAlign: "center",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  backgroundColor: "rgba(255,255,255,0.15)",
                },
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <FactCheckIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                Service Agreement
              </Typography>
              <Typography variant="body2">
                Legal terms governing the use of our healthcare platform
              </Typography>
            </Box>

            <Box
              sx={{
                p: 3,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 3,
                backdropFilter: "blur(5px)",
                maxWidth: "250px",
                width: "100%",
                textAlign: "center",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  backgroundColor: "rgba(255,255,255,0.15)",
                },
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <HandshakeIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                User Responsibilities
              </Typography>
              <Typography variant="body2">
                Your rights and obligations when using our services
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
