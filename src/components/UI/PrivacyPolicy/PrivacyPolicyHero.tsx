"use client";
import LockIcon from "@mui/icons-material/Lock";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Box, Container, Typography, useTheme } from "@mui/material";

export default function PrivacyPolicyHero() {
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
      {/* Animated background pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.07,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
          animation: "slide 30s linear infinite",
          "@keyframes slide": {
            "0%": {
              backgroundPosition: "0 0",
            },
            "100%": {
              backgroundPosition: "60px 60px",
            },
          },
        }}
      />

      {/* Wave Shape */}
      <Box
        sx={{
          position: "absolute",
          bottom: -1,
          left: 0,
          right: 0,
          height: "120px",
          background: "white",
          clipPath: "polygon(0 100%, 100% 100%, 100% 25%, 0 100%)",
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
          {/* Lock Icon */}
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
                width: 80,
                height: 80,
                backgroundColor: "rgba(255,255,255,0.15)",
                borderRadius: "50%",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -5,
                  left: -5,
                  right: -5,
                  bottom: -5,
                  borderRadius: "50%",
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
              <LockIcon sx={{ fontSize: 40 }} />
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
            Privacy Policy
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
            At ZenDoc, we are committed to protecting your privacy and ensuring
            the security of your personal information.
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
                <SecurityIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                Data Security
              </Typography>
              <Typography variant="body2">
                We use advanced encryption to protect your data
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
                <VerifiedUserIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                HIPAA Compliant
              </Typography>
              <Typography variant="body2">
                Our services follow all healthcare privacy laws
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
