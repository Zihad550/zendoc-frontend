import { Chip, Divider, Paper, Typography } from "@mui/material";

const NoDoctorsFound = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 5,
        borderRadius: 3,
        textAlign: "center",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A1D36" : "#ffffff",
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0 6px 24px rgba(0,0,0,0.3)"
            : "0 6px 24px rgba(0,0,0,0.05)",
        border: (theme) =>
          theme.palette.mode === "dark"
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "none",
      }}
    >
      <Typography variant="h6" color="text.secondary">
        No doctors found matching the selected specialty
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
        Try selecting a different specialty or clear your filters
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Chip
        label="View All Doctors"
        color="primary"
        component="a"
        href="/doctors"
        clickable
        sx={{ mt: 1 }}
      />
    </Paper>
  );
};

export default NoDoctorsFound;
