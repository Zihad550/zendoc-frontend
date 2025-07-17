"use client";
import { animationVariants } from "@/components/animation";
import StaggeredAnimationWrapper from "@/components/animation/AnimatedComponents";
import { useGetAllSpecialtiesQuery } from "@/redux/features/specialties/specialtiesApi";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
  alpha,
} from "@mui/material";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const Specialist = () => {
  const { data } = useGetAllSpecialtiesQuery(undefined);

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: (theme) =>
          theme.palette.mode === "dark"
            ? `linear-gradient(135deg, ${alpha(
                theme.palette.primary.dark,
                0.05,
              )} 0%, ${alpha(theme.palette.secondary.dark, 0.05)} 100%)`
            : `linear-gradient(135deg, ${alpha(
                theme.palette.primary.light,
                0.03,
              )} 0%, ${alpha(theme.palette.secondary.light, 0.03)} 100%)`,
      }}
    >
      <Container maxWidth="xl">
        <StaggeredAnimationWrapper>
          {/* Header Section */}
          <motion.div variants={animationVariants.titleVariants}>
            <Box textAlign="center" mb={8}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={2}
              >
                <LocalHospitalIcon
                  sx={{
                    fontSize: 32,
                    color: "primary.main",
                    mr: 1,
                  }}
                />
                <Chip
                  label="Medical Specialties"
                  variant="outlined"
                  sx={{
                    borderColor: "primary.main",
                    color: "primary.main",
                    fontWeight: 600,
                  }}
                />
              </Box>

              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "3rem" },
                  fontWeight: 700,
                  background: (theme) =>
                    theme.palette.mode === "dark"
                      ? "linear-gradient(45deg, #fff 30%, #e0e0e0 90%)"
                      : "linear-gradient(45deg, #1a1a1a 30%, #333 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                Expert Care Across
                <br />
                All Medical Specialties
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  maxWidth: 600,
                  mx: "auto",
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  lineHeight: 1.6,
                }}
              >
                Connect with experienced specialists and receive personalized
                treatment tailored to your specific health needs
              </Typography>
            </Box>
          </motion.div>

          {/* Specialties Grid */}
          <Grid container spacing={3} mb={6}>
            {data?.data?.slice(0, 6).map((specialty: any, index: number) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={specialty.id}>
                <motion.div
                  variants={animationVariants.cardVariants}
                  custom={index}
                  whileHover={{
                    y: -12,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: { duration: 0.1 },
                  }}
                >
                  <Card
                    component={Link}
                    href={`/doctors?specialties=${specialty.title}`}
                    sx={{
                      border: "none",
                      height: "100%",
                      textDecoration: "none",
                      background: (theme) =>
                        theme.palette.mode === "dark"
                          ? "linear-gradient(145deg, #1e1e2e 0%, #252540 100%)"
                          : "linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)",
                      overflow: "hidden",
                      position: "relative",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        boxShadow: (theme) =>
                          theme.palette.mode === "dark"
                            ? `0 20px 40px ${alpha(
                                theme.palette.primary.main,
                                0.15,
                              )}`
                            : `0 20px 40px ${alpha(
                                theme.palette.primary.main,
                                0.1,
                              )}`,
                        "& .specialty-icon": {
                          transform: "scale(1.1) rotate(5deg)",
                        },
                        "& .specialty-arrow": {
                          transform: "translateX(4px)",
                          opacity: 1,
                        },
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 4,
                        textAlign: "center",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      {/* Icon Container */}
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          background: (theme) =>
                            `linear-gradient(135deg, ${alpha(
                              theme.palette.primary.main,
                              0.1,
                            )} 0%, ${alpha(
                              theme.palette.primary.main,
                              0.05,
                            )} 100%)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 3,
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={specialty.icon}
                          width={40}
                          height={40}
                          alt={`${specialty.title} icon`}
                          className="specialty-icon"
                          style={{
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            zIndex: 1,
                            position: "relative",
                          }}
                        />
                      </Box>

                      {/* Title */}
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          fontSize: "1.1rem",
                          color: "text.primary",
                          mb: 1,
                          lineHeight: 1.3,
                          textAlign: "center",
                        }}
                      >
                        {specialty.title}
                      </Typography>

                      {/* Arrow Icon */}
                      <ArrowForwardIcon
                        className="specialty-arrow"
                        sx={{
                          fontSize: 20,
                          color: "primary.main",
                          opacity: 0,
                          transition: "all 0.3s ease",
                          mt: 1,
                        }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </StaggeredAnimationWrapper>
      </Container>
    </Box>
  );
};

export default Specialist;
