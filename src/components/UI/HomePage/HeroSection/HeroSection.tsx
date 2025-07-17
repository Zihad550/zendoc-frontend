"use client";
import assets from "@/assets";
import { animationVariants } from "@/components/animation";
import {
  alpha,
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  Variants,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

// Enhanced animation variants for healthcare-themed animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
      duration: 0.8,
    },
  },
};

const heroTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const subtitleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

const buttonContainerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const imageGroupVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const doctorImageVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 60,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const backgroundVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut",
    },
  },
};

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const theme = useTheme();

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  // Motion values for interactive animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      ref={ref}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Animated Background */}
      <motion.div
        variants={backgroundVariants}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          background:
            "radial-gradient(circle at 30% 20%, rgba(25, 118, 210, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(25, 118, 210, 0.06) 0%, transparent 50%)",
        }}
      />

      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "center",
          py: { xs: 4, md: 6, lg: 8 },
          px: { xs: 2, sm: 3, md: 4 },
          position: "relative",
          overflow: "hidden",
          gap: { xs: 4, lg: 0 },
        }}
      >
        {/* Left Content Section */}
        <Box
          sx={{
            flex: 1,
            position: "relative",
            zIndex: 1,
            textAlign: { xs: "center", lg: "left" },
            order: { xs: 2, lg: 1 },
          }}
        >
          {/* Background Grid Animation */}
          {isDesktop && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 0.6, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              style={{
                position: "absolute",
                width: "700px",
                left: "-90px",
                top: "-120px",
                zIndex: -1,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image src={assets.svgs.grid} alt="background grid" />
              </motion.div>
            </motion.div>
          )}

          {/* Hero Text Animation */}
          <motion.div variants={heroTextVariants}>
            <Typography
              variant="h2"
              component="h1"
              fontWeight={600}
              sx={{
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.2rem",
                  md: "2.8rem",
                  lg: "3.5rem",
                },
                lineHeight: { xs: 1.3, md: 1.2 },
                mb: { xs: 0.5, md: 1 },
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? `linear-gradient(135deg, ${
                        theme.palette.text.primary
                      } 0%, ${alpha(theme.palette.text.primary, 0.8)} 100%)`
                    : `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              Healthier Hearts
            </Typography>
          </motion.div>

          <motion.div variants={heroTextVariants}>
            <Typography
              variant="h2"
              component="h1"
              fontWeight={600}
              sx={{
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.2rem",
                  md: "2.8rem",
                  lg: "3.5rem",
                },
                lineHeight: { xs: 1.3, md: 1.2 },
                mb: { xs: 0.5, md: 1 },
                color: (theme) => theme.palette.text.primary,
              }}
            >
              Come From
            </Typography>
          </motion.div>

          <motion.div variants={heroTextVariants}>
            <Typography
              variant="h2"
              component="h1"
              fontWeight={600}
              sx={{
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.2rem",
                  md: "2.8rem",
                  lg: "3.5rem",
                },
                lineHeight: { xs: 1.3, md: 1.2 },
                mb: { xs: 2, md: 4 },
                position: "relative",
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: `0 2px 8px ${alpha("#1976d2", 0.3)}`,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: { xs: "-4px", md: "-8px" },
                  left: { xs: "50%", lg: 0 },
                  transform: { xs: "translateX(-50%)", lg: "none" },
                  width: { xs: "80%", lg: "100%" },
                  height: { xs: "3px", md: "4px" },
                  background: (theme) =>
                    `linear-gradient(90deg, ${
                      theme.palette.primary.main
                    } 0%, ${alpha(theme.palette.primary.main, 0.5)} 100%)`,
                  borderRadius: "2px",
                  opacity: 0.7,
                },
              }}
            >
              Preventive Care
            </Typography>
          </motion.div>

          <motion.div variants={subtitleVariants}>
            <Typography
              sx={{
                my: { xs: 2, md: 4 },
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                lineHeight: { xs: 1.6, md: 1.7 },
                maxWidth: { xs: "100%", lg: "90%" },
                color: (theme) => theme.palette.text.secondary,
                opacity: 0.9,
                px: { xs: 1, lg: 0 },
              }}
            >
              Experience world-class healthcare with our dedicated team of
              professionals. We provide comprehensive medical services with
              cutting-edge technology and compassionate care to ensure your
              well-being.
            </Typography>
          </motion.div>

          {/* Animated Buttons */}
          <motion.div
            variants={buttonContainerVariants}
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "16px",
              marginTop: "32px",
              alignItems: "center",
              justifyContent: isDesktop ? "flex-start" : "center",
            }}
          >
            <motion.div
              variants={animationVariants.buttonVariants}
              whileHover={{
                scale: 1.05,
                y: -3,
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
            >
              <Button
                component={Link}
                href="/consultation"
                size="large"
                fullWidth={isMobile}
                sx={{
                  px: { xs: 3, md: 4 },
                  py: { xs: 1.2, md: 1.5 },
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  fontWeight: 600,
                  borderRadius: "12px",
                  textTransform: "none",
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  boxShadow: (theme) =>
                    `0 4px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                  "&:hover": {
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                    boxShadow: (theme) =>
                      `0 6px 20px ${alpha(theme.palette.primary.main, 0.5)}`,
                  },
                }}
              >
                Book Appointment
              </Button>
            </motion.div>

            <motion.div
              variants={animationVariants.buttonVariants}
              whileHover={{
                scale: 1.05,
                y: -3,
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
            >
              <Button
                component={Link}
                href="/contact-us"
                variant="outlined"
                size="large"
                fullWidth={isMobile}
                sx={{
                  px: { xs: 3, md: 4 },
                  py: { xs: 1.2, md: 1.5 },
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  fontWeight: 600,
                  borderRadius: "12px",
                  textTransform: "none",
                  borderWidth: 2,
                  minWidth: { xs: "200px", sm: "auto" },
                  borderColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.primary.main,
                  "&:hover": {
                    borderColor: (theme) => theme.palette.primary.main,
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.08),
                    boxShadow: (theme) =>
                      `0 4px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
                  },
                }}
              >
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        </Box>

        {/* Right Image Section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            position: "relative",
            mt: { xs: 2, lg: 0 },
            order: { xs: 1, lg: 2 },
            width: "100%",
            maxWidth: { xs: "100%", sm: "500px", lg: "none" },
          }}
        >
          {/* Floating Arrow */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: -10 }}
              animate={{ opacity: 0.8, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              style={{
                position: "absolute",
                left: isTablet ? "60%" : "200px",
                top: isTablet ? "-20px" : "-30px",
                zIndex: 1,
              }}
            >
              <motion.div
                animate={{
                  y: [-8, 8, -8],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={assets.svgs.arrow}
                  width={isTablet ? 60 : 100}
                  height={isTablet ? 60 : 100}
                  alt="arrow"
                />
              </motion.div>
            </motion.div>
          )}

          {/* Doctor Images Group */}
          <motion.div
            variants={imageGroupVariants}
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "12px" : "16px",
              position: "relative",
              zIndex: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Doctor 1 */}
            <motion.div
              variants={doctorImageVariants}
              whileHover={{
                scale: 1.02,
                y: -8,
                transition: { duration: 0.3 },
              }}
              style={{
                marginTop: isMobile ? "0px" : "32px",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}
            >
              <motion.div
                style={{
                  x: isTablet ? 0 : springX,
                  y: isTablet ? 0 : springY,
                }}
              >
                <Image
                  src={assets.images.doctor1}
                  width={isMobile ? 180 : isTablet ? 200 : 240}
                  height={isMobile ? 280 : isTablet ? 320 : 380}
                  alt="doctor1"
                  style={{
                    objectFit: "cover",
                    borderRadius: "16px",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Doctor 2 */}
            {!isMobile && (
              <motion.div
                variants={doctorImageVariants}
                whileHover={{
                  scale: 1.02,
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                }}
              >
                <motion.div
                  style={{
                    x: isTablet ? 0 : springX,
                    y: isTablet ? 0 : springY,
                  }}
                >
                  <Image
                    src={assets.images.doctor2}
                    width={isTablet ? 200 : 240}
                    height={isTablet ? 300 : 350}
                    alt="doctor2"
                    style={{
                      objectFit: "cover",
                      borderRadius: "16px",
                    }}
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Floating Doctor 3 */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                style={{
                  position: "absolute",
                  top: isTablet ? "180px" : "220px",
                  left: isTablet ? "100px" : "150px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                  zIndex: 3,
                }}
              >
                <motion.div
                  animate={{
                    y: [-5, 5, -5],
                    rotate: [0, 1, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={assets.images.doctor3}
                    width={isTablet ? 160 : 240}
                    height={isTablet ? 160 : 240}
                    alt="doctor3"
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Floating Stethoscope */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                animate={{ opacity: 0.7, scale: 1, rotate: 0 }}
                transition={{ duration: 1.5, delay: 1.5 }}
                style={{
                  position: "absolute",
                  bottom: isMobile ? "-30px" : "-50px",
                  right: isMobile ? "10px" : "0px",
                  zIndex: 1,
                }}
              >
                <motion.div
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 10,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Image
                    src={assets.images.stethoscope}
                    width={isTablet ? 120 : 180}
                    height={isTablet ? 120 : 180}
                    alt="stethoscope"
                  />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </Box>
      </Container>
    </motion.div>
  );
};

export default HeroSection;
