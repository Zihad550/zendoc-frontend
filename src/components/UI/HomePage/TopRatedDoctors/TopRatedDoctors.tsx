"use client";
import assets from "@/assets";
import SectionTitle from "@/components/Shared/SectionTitle";
import { theme } from "@/lib/theme/theme";
import { useGetAllDoctorsQuery } from "@/redux/features/doctor/doctorApi";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
  alpha,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const TopRatedDoctors = () => {
  // const theme = useTheme();
  const { data } = useGetAllDoctorsQuery({ limit: 3 });
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctor?page=1&limit=3`,
  // );
  // const { data: doctors } = (await res.json()) as IResponse<Doctor[]>;
  return (
    <Box
      sx={{
        my: 10,
        py: 20,
        position: "relative",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? alpha(theme.palette.primary.main, 0.08)
            : alpha(theme.palette.primary.main, 0.03),
        backgroundImage: (theme) =>
          theme.palette.mode === "dark"
            ? `
            radial-gradient(circle at 20% 90%, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 30%),
            radial-gradient(circle at 80% 10%, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 40%)
          `
            : `
            radial-gradient(circle at 20% 90%, ${alpha(theme.palette.primary.main, 0.07)} 0%, transparent 30%),
            radial-gradient(circle at 80% 10%, ${alpha(theme.palette.primary.main, 0.07)} 0%, transparent 40%)
          `,
        clipPath: "polygon(0 0, 100% 10%, 100% 100%, 0 90%)",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: assets.svgs.subtlePattern,
          backgroundRepeat: "repeat",
          opacity: (theme) => (theme.palette.mode === "dark" ? 0.08 : 0.05),
          zIndex: 0,
        },
      }}
    >
      <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <SectionTitle
          title="Our Top Rated Doctors"
          subtitle="Access to expert physicians and surgeons, advanced technologies and top-quality surgery facilities right here."
          size="large"
          containerSx={{ mb: 6 }}
          titleSx={{
            fontWeight: 800,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #0A5CB8 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
          subtitleSx={{
            maxWidth: 700,
            mx: "auto",
            opacity: 0.8,
            fontSize: "1.1rem",
          }}
          dividerSx={{
            width: 100,
            height: 5,
            borderRadius: 10,
            background: (theme) =>
              `linear-gradient(90deg, ${theme.palette.primary.main} 0%, #0A5CB8 100%)`,
            mb: 3,
            boxShadow: (theme) =>
              `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
          }}
        />
      </Box>

      <Container sx={{ margin: "30px auto", position: "relative", zIndex: 1 }}>
        <Grid container spacing={3}>
          {data?.data
            ? data.data.map((doctor) => (
                <Grid size={{ xs: 12, md: 4 }} key={doctor.id}>
                  <Card
                    sx={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: (theme) =>
                        theme.palette.mode === "dark"
                          ? "0 8px 32px rgba(0,0,0,0.3)"
                          : "0 8px 24px rgba(0,0,0,0.08)",
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "#1E2139" : "#ffffff",
                      border: (theme) =>
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255, 255, 255, 0.1)"
                          : "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: (theme) =>
                          theme.palette.mode === "dark"
                            ? "0 16px 40px rgba(0,0,0,0.4)"
                            : "0 12px 30px rgba(0,0,0,0.12)",
                      },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                    }}
                  >
                    {/* Doctor specialties chip displayed over the image */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        zIndex: 10,
                      }}
                    >
                      <Chip
                        icon={<VerifiedIcon sx={{ fontSize: 16 }} />}
                        label="Top Rated"
                        size="small"
                        sx={{
                          bgcolor: "white",
                          color: (theme) => theme.palette.primary.main,
                          fontWeight: 600,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                      />
                    </Box>

                    {/* Doctor image with styling */}
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: 280,
                        overflow: "hidden",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          height: "30%",
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
                          zIndex: 1,
                        },
                        "& img": {
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "all 0.5s ease",
                          filter: "brightness(0.95)",
                        },
                        "&:hover img": {
                          transform: "scale(1.05)",
                          filter: "brightness(1)",
                        },
                      }}
                    >
                      <Image
                        src={doctor.profilePhoto}
                        alt={doctor.name}
                        width={500}
                        height={500}
                        priority
                      />

                      {/* Doctor rating displayed on the image */}
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 16,
                          left: 16,
                          zIndex: 2,
                          display: "flex",
                          alignItems: "center",
                          bgcolor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "20px",
                          py: 0.5,
                          px: 1.5,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                      >
                        <Rating
                          value={doctor.averageRating}
                          readOnly
                          precision={0.1}
                          size="small"
                          icon={
                            <StarIcon
                              fontSize="inherit"
                              sx={{ color: "#FFB400" }}
                            />
                          }
                          emptyIcon={
                            <StarIcon
                              fontSize="inherit"
                              sx={{ color: "#FFB400", opacity: 0.3 }}
                            />
                          }
                        />
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          sx={{ ml: 0.5 }}
                        >
                          {doctor.averageRating}
                        </Typography>
                      </Box>
                    </Box>
                    <CardContent sx={{ pb: 0, pt: 2.5, px: 2.5, flexGrow: 1 }}>
                      {/* Doctor name with verified badge */}
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{
                            fontWeight: 700,
                            color: "text.primary",
                            mr: 0.5,
                            fontSize: "1.25rem",
                          }}
                        >
                          {doctor.name}
                        </Typography>
                      </Box>

                      {/* Doctor qualifications */}
                      <Typography
                        variant="subtitle2"
                        color="primary.main"
                        fontWeight="600"
                        sx={{ mb: 1.5 }}
                      >
                        {doctor.qualification}, {doctor.designation}
                      </Typography>

                      {/* Doctor specialties */}
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}
                      >
                        {doctor.doctorSpecialties.map((specialty, index) => (
                          <Chip
                            key={index}
                            label={specialty.specialties.title}
                            size="small"
                            sx={{
                              borderRadius: "6px",
                              bgcolor: (theme) =>
                                alpha(theme.palette.primary.main, 0.1),
                              color: (theme) => theme.palette.primary.main,
                              fontWeight: 500,
                              fontSize: "0.75rem",
                            }}
                          />
                        ))}
                      </Stack>

                      <Divider sx={{ my: 1.5 }} />

                      {/* Doctor info */}
                      <Stack spacing={1.5} sx={{ mt: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <LocationOnIcon
                            sx={{
                              fontSize: 20,
                              color: "text.secondary",
                              mr: 1,
                            }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {doctor.address}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <MedicalServicesIcon
                            sx={{
                              fontSize: 20,
                              color: "text.secondary",
                              mr: 1,
                            }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {doctor.experience} years experience
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                    <CardActions
                      sx={{
                        justifyContent: "space-between",
                        px: 2.5,
                        pb: 2.5,
                        pt: 1.5,
                        mt: "auto",
                      }}
                    >
                      <Link href={`/doctors/${doctor?.id}`}>
                        <Button
                          startIcon={<CalendarMonthIcon />}
                          sx={{
                            borderRadius: "8px",
                            py: 1,
                            background: (theme) =>
                              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #0A5CB8 100%)`,
                            boxShadow: (theme) =>
                              `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                            fontWeight: 600,
                            "&:hover": {
                              boxShadow: (theme) =>
                                `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                              transform: "translateY(-2px)",
                            },
                            transition: "all 0.3s ease",
                          }}
                          type="button"
                        >
                          Book Now
                        </Button>
                      </Link>
                      <Button
                        variant="outlined"
                        sx={{
                          borderRadius: "8px",
                          py: 1,
                          borderColor: (theme) => theme.palette.primary.main,
                          fontWeight: 600,
                          "&:hover": {
                            borderColor: (theme) => theme.palette.primary.main,
                            backgroundColor: (theme) =>
                              alpha(theme.palette.primary.main, 0.05),
                          },
                        }}
                      >
                        View Profile
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            : "No doctors available at the time"}
        </Grid>
        <Box
          sx={{
            textAlign: "center",
            mt: 6,
          }}
        >
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderRadius: "30px",
              py: 1.2,
              px: 4,
              borderWidth: 2,
              borderColor: (theme) => theme.palette.primary.main,
              fontWeight: 600,
              "&:hover": {
                borderWidth: 2,
                borderColor: (theme) => theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                transform: "translateY(-2px)",
                boxShadow: (theme) =>
                  `0 6px 16px ${alpha(theme.palette.primary.main, 0.15)}`,
              },
              transition: "all 0.3s ease",
            }}
            component={Link}
            href="/doctors"
          >
            View All Doctors
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TopRatedDoctors;
