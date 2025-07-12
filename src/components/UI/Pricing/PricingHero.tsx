import { Box, Container, Typography } from "@mui/material";

export default function PricingHero() {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "primary.main",
        color: "white",
        py: { xs: 6, md: 10 },
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: -2,
          left: 0,
          right: 0,
          height: "150px",
          background: "white",
          clipPath: "polygon(0 100%, 100% 100%, 100% 30%, 0 100%)",
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
            px: { xs: 2, md: 0 },
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              mb: 2,
              textShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            Healthcare Plans for Every Need
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 400,
              mb: 3,
              opacity: 0.9,
              maxWidth: "700px",
              mx: "auto",
            }}
          >
            Transparent pricing with quality care at every level
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              mt: 4,
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                p: 2,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 2,
                backdropFilter: "blur(5px)",
                maxWidth: "180px",
                width: "100%",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                24/7
              </Typography>
              <Typography variant="body2">Access to Care</Typography>
            </Box>

            <Box
              sx={{
                p: 2,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 2,
                backdropFilter: "blur(5px)",
                maxWidth: "180px",
                width: "100%",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                100+
              </Typography>
              <Typography variant="body2">Specialists</Typography>
            </Box>

            <Box
              sx={{
                p: 2,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 2,
                backdropFilter: "blur(5px)",
                maxWidth: "180px",
                width: "100%",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                $0
              </Typography>
              <Typography variant="body2">Setup Fee</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
