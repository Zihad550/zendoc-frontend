import ChildCareIcon from "@mui/icons-material/ChildCare";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import PregnantWomanIcon from "@mui/icons-material/PregnantWoman";
import PsychologyIcon from "@mui/icons-material/Psychology";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";

export default function SpecialtyPricing() {
  const theme = useTheme();

  const specialties = [
    {
      id: "cardiology",
      name: "Cardiology",
      icon: <MonitorHeartIcon sx={{ fontSize: 24 }} />,
      description: "Heart and cardiovascular health",
      pricePerSession: 149,
      discountedPrice: 129,
      color: "#ef5350",
    },
    {
      id: "mental-health",
      name: "Mental Health",
      icon: <PsychologyIcon sx={{ fontSize: 24 }} />,
      description: "Psychological and emotional well-being",
      pricePerSession: 129,
      discountedPrice: 99,
      color: "#7e57c2",
    },
    {
      id: "pediatrics",
      name: "Pediatrics",
      icon: <ChildCareIcon sx={{ fontSize: 24 }} />,
      description: "Child healthcare and development",
      pricePerSession: 119,
      discountedPrice: 89,
      color: "#29b6f6",
    },
    {
      id: "general-medicine",
      name: "General Medicine",
      icon: <MedicalServicesIcon sx={{ fontSize: 24 }} />,
      description: "Primary healthcare services",
      pricePerSession: 99,
      discountedPrice: 79,
      color: "#66bb6a",
    },
    {
      id: "internal-medicine",
      name: "Internal Medicine",
      icon: <FavoriteIcon sx={{ fontSize: 24 }} />,
      description: "Comprehensive adult healthcare",
      pricePerSession: 129,
      discountedPrice: 99,
      color: "#ff7043",
    },
    {
      id: "obstetrics",
      name: "Obstetrics & Gynecology",
      icon: <PregnantWomanIcon sx={{ fontSize: 24 }} />,
      description: "Women's healthcare and pregnancy",
      pricePerSession: 139,
      discountedPrice: 109,
      color: "#ec407a",
    },
  ];

  return (
    <Box>
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ maxWidth: "700px", mx: "auto", mb: 4 }}
      >
        Our specialty care services are available as add-ons to any plan or as
        standalone services
      </Typography>

      <Grid container spacing={3}>
        {specialties.map((specialty) => (
          <Grid size={{ xs: 1, sm: 6, md: 4 }} key={specialty.id}>
            <Paper
              elevation={2}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                height: "100%",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 20px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: specialty.color,
                    color: "white",
                    mr: 2,
                    height: 40,
                    width: 40,
                  }}
                >
                  {specialty.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6">{specialty.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {specialty.description}
                  </Typography>
                </Box>
              </Box>

              <Box p={2}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Per Session
                  </Typography>
                  <Box>
                    <Typography
                      component="span"
                      sx={{
                        textDecoration: "line-through",
                        color: "text.disabled",
                        mr: 1,
                        fontSize: "0.875rem",
                      }}
                    >
                      ${specialty.pricePerSession}
                    </Typography>
                    <Typography
                      component="span"
                      variant="h6"
                      color="primary"
                      fontWeight="bold"
                    >
                      ${specialty.discountedPrice}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    Plan Discount
                  </Typography>
                  <Chip
                    label="Up to 20% off"
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
