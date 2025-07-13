import DoctorCard from "@/components/UI/Doctor/DoctorCard";
import ScrollCategory from "@/components/UI/Doctor/ScrollCategory";
import { Doctor } from "@/types/doctor";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Chip,
  Container,
  Divider,
  Fade,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";

interface PropType {
  searchParams: { specialties: string };
}

const Doctors = async ({ searchParams }: PropType) => {
  let res;

  if (searchParams.specialties) {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctor?specialties=${searchParams.specialties}`,
    );
  } else {
    res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctor`);
  }

  const { data } = await res.json();

  // Mock statistics data
  const stats = [
    {
      label: "Certified Doctors",
      value: data?.length || 0,
      icon: MedicalServicesIcon,
    },
    { label: "Specialties", value: "25+", icon: LocalHospitalIcon },
  ];

  return (
    <Box sx={{ bgcolor: "#F7FAFC", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        {/* Hero Section with Search */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            mb: 5,
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
          }}
        >
          <Grid container>
            <Grid size={{ xs: 12, md: 7 }} sx={{ p: { xs: 4, md: 6 } }}>
              <Fade in={true} timeout={1000}>
                <Box>
                  <Typography
                    component="span"
                    sx={{
                      color: "primary.main",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      display: "block",
                      mb: 1,
                    }}
                  >
                    Healthcare Professionals
                  </Typography>

                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      fontSize: { xs: "2rem", md: "2.5rem" },
                      background:
                        "linear-gradient(90deg, #1586FD 0%, #44A4FF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Find Specialists for Your Health Needs
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      mb: 4,
                      fontSize: "1.1rem",
                      color: "text.secondary",
                      maxWidth: "90%",
                    }}
                  >
                    Connect with top-rated healthcare professionals specializing
                    in various medical fields. Book appointments with verified
                    doctors tailored to your specific health requirements.
                  </Typography>

                  {/* Search Bar */}
                  <Paper
                    component="form"
                    sx={{
                      p: "6px 12px",
                      display: "flex",
                      alignItems: "center",
                      width: { xs: "100%", md: "90%" },
                      border: "1px solid #E0E7FF",
                      borderRadius: 8,
                      boxShadow: "0 4px 14px rgba(21, 134, 253, 0.1)",
                      mb: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 6px 20px rgba(21, 134, 253, 0.15)",
                      },
                    }}
                  >
                    <IconButton sx={{ p: "10px" }} aria-label="search">
                      <SearchIcon sx={{ color: "primary.main" }} />
                    </IconButton>
                    <InputBase
                      sx={{ ml: 1, flex: 1, fontSize: "1rem" }}
                      placeholder="Search by doctor name or specialty"
                      inputProps={{ "aria-label": "search doctors" }}
                    />
                  </Paper>

                  {/* Stats */}
                  <Grid container spacing={3} sx={{ mt: 2 }}>
                    {stats.map((stat, index) => (
                      <Grid size={{ xs: 6, sm: 6, md: 6 }} key={index}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: "12px",
                              bgcolor: "rgba(21, 134, 253, 0.1)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <stat.icon
                              sx={{ color: "primary.main", fontSize: 28 }}
                            />
                          </Box>
                          <Box>
                            <Typography
                              variant="h4"
                              fontWeight={700}
                              sx={{ mb: 0.5, color: "primary.main" }}
                            >
                              {stat.value}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {stat.label}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Fade>
            </Grid>

            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Box
                sx={{
                  height: "100%",
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1638202993928-7d113cdf04b9?q=80&w=1887&auto=format&fit=crop)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderTopRightRadius: 12,
                  borderBottomRightRadius: 12,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(135deg, rgba(21, 134, 253, 0.2) 0%, rgba(21, 134, 253, 0.4) 100%)",
                    borderTopRightRadius: 12,
                    borderBottomRightRadius: 12,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Filter by Specialties */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            mb: 4,
            background: "white",
            boxShadow: "0 6px 24px rgba(0,0,0,0.05)",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Filter by Specialty
            </Typography>
            <ScrollCategory specialties={searchParams.specialties} />
          </Box>
        </Paper>

        {/* Results Count & Sorting */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="body1" fontWeight={500}>
            {data?.length || 0} {data?.length === 1 ? "Doctor" : "Doctors"}{" "}
            Found
            {searchParams.specialties && (
              <Chip
                label={`Specialty: ${searchParams.specialties}`}
                size="small"
                variant="outlined"
                color="primary"
                sx={{ ml: 1.5 }}
              />
            )}
          </Typography>
        </Box>

        {/* Doctor Cards */}
        <Box>
          {data?.length > 0 ? (
            <Grid container spacing={3}>
              {data?.map((doctor: Doctor) => (
                <Grid size={{ xs: 12 }} key={doctor.id}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    <DoctorCard doctor={doctor} />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper
              elevation={0}
              sx={{
                p: 5,
                borderRadius: 3,
                textAlign: "center",
                boxShadow: "0 6px 24px rgba(0,0,0,0.05)",
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
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Doctors;
