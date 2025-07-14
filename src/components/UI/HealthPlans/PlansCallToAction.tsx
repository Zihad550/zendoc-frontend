import SectionTitle from "@/components/Shared/SectionTitle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Container } from "@mui/material";
import Link from "next/link";

export default function PlansCallToAction() {
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
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "radial-gradient(circle, rgba(120, 119, 198, 0.15) 0%, rgba(120, 119, 198, 0) 70%)"
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
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "radial-gradient(circle, rgba(33, 150, 243, 0.15) 0%, rgba(33, 150, 243, 0) 70%)"
              : "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
          borderRadius: "50%",
          transform: "translate(-30%, 30%)",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Box textAlign="center">
          <SectionTitle
            title="Ready to Secure Your Health?"
            subtitle="Enroll in one of our health plans today and start enjoying comprehensive healthcare coverage for you and your loved ones."
            color="white"
            size="large"
            withDivider={false}
            containerSx={{ mb: 4 }}
          />
          <Button
            component={Link}
            href="/contact-us"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.95)"
                  : "white",
              color: (theme) =>
                theme.palette.mode === "dark" ? "#1a1a2e" : "primary.main",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              borderRadius: "50px",
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)"
                  : "0 4px 20px rgba(0,0,0,0.1)",
              backdropFilter: (theme) =>
                theme.palette.mode === "dark" ? "blur(10px)" : "none",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: (theme) =>
                  theme.palette.mode === "dark"
                    ? "0 8px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.2)"
                    : "0 6px 25px rgba(0,0,0,0.15)",
                bgcolor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 1)"
                    : undefined,
              },
            }}
          >
            Talk to an advisor
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
