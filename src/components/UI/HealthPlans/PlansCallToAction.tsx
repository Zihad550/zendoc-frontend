import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";

export default function PlansCallToAction() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        py: { xs: 6, md: 8 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Patterns */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "300px",
          height: "300px",
          background: (theme) => theme.palette.mode === 'dark'
            ? "radial-gradient(circle, rgba(10,14,39,0.1) 0%, rgba(10,14,39,0) 70%)"
            : "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
          borderRadius: "50%",
          transform: "translate(30%, -30%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "200px",
          height: "200px",
          background: (theme) => theme.palette.mode === 'dark'
            ? "radial-gradient(circle, rgba(10,14,39,0.1) 0%, rgba(10,14,39,0) 70%)"
            : "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
          borderRadius: "50%",
          transform: "translate(-30%, 30%)",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          <Box sx={{ maxWidth: "600px" }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Ready to Secure Your Health?
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
              Enroll in one of our health plans today and start enjoying
              comprehensive healthcare coverage for you and your loved ones.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mt: 4, flexWrap: "wrap" }}>
              <Button
                component={Link}
                href="contact-us"
                variant="contained"
                color="secondary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? "rgba(30,33,57,0.95)" : "white",
                  color: "primary.main",
                  fontWeight: "bold",
                  px: 4,
                  py: 1.5,
                  borderRadius: "50px",
                  "&:hover": {
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? "rgba(255,255,255,0.85)" : "white",
                    opacity: 0.9,
                    transform: "translateY(-3px)",
                    boxShadow: (theme) => theme.palette.mode === 'dark' ? "0 6px 15px rgba(0,0,0,0.3)" : "0 6px 15px rgba(0,0,0,0.1)",
                  },
                }}
              >
                Talk to an advisor
              </Button>
            </Box>
          </Box>

          {!isMobile && (
            <Box
              sx={{
                bgcolor: (theme) => theme.palette.mode === 'dark' ? "rgba(30,33,57,0.05)" : "rgba(255,255,255,0.1)",
                p: 3,
                borderRadius: 4,
                backdropFilter: "blur(5px)",
                maxWidth: "300px",
                border: (theme) => theme.palette.mode === 'dark' ? "1px solid rgba(30,33,57,0.2)" : "none",
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Need Help Choosing?
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Our healthcare advisors can help you find the perfect plan based
                on your:
              </Typography>
              <ul style={{ color: "white", paddingLeft: "1.5rem", margin: 0 }}>
                <li>Healthcare needs</li>
                <li>Family situation</li>
                <li>Budget constraints</li>
                <li>Preferred doctors</li>
              </ul>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Schedule a free consultation today.
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
