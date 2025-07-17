"use client";
import {
  AnimatedPricingToggle,
  AnimatedSection,
  animationVariants,
  StaggeredAnimationWrapper,
} from "@/components/animation";
import SectionTitle from "@/components/Shared/SectionTitle";
import ComparisonTable from "@/components/UI/Pricing/ComparisonTable";
import PricingCard from "@/components/UI/Pricing/PricingCard";
import PricingFAQ from "@/components/UI/Pricing/PricingFAQ";
import PricingHero from "@/components/UI/Pricing/PricingHero";
import SpecialtyPricing from "@/components/UI/Pricing/SpecialtyPricing";
import TestimonialCarousel from "@/components/UI/Pricing/TestimonialCarousel";
import {
  Box,
  Container,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  // Basic pricing plans
  const plans = [
    {
      title: "Basic Care",
      description: "Essential healthcare services for individuals",
      price: isAnnual ? 99 : 12.99,
      period: isAnnual ? "/year" : "/month",
      savePercent: isAnnual ? 30 : 0,
      features: [
        "Unlimited text consultations",
        "2 video consultations",
        "24/7 chat support",
        "Digital prescriptions",
        "Basic health tracking",
      ],
      cta: "Contact Us",
      popular: false,
      highlight: false,
      color: "default" as const,
    },
    {
      title: "Family Care",
      description: "Complete healthcare for the whole family",
      price: isAnnual ? 199 : 24.99,
      period: isAnnual ? "/year" : "/month",
      savePercent: isAnnual ? 35 : 0,
      features: [
        "Unlimited text consultations",
        "5 video consultations",
        "24/7 priority support",
        "Digital prescriptions",
        "Advanced health tracking",
        "Family health records",
        "Medication reminders",
      ],
      cta: "Contact Us",
      popular: true,
      highlight: true,
      color: "primary" as const,
    },
    {
      title: "Premium Care",
      description: "Comprehensive healthcare with premium benefits",
      price: isAnnual ? 299 : 39.99,
      period: isAnnual ? "/year" : "/month",
      savePercent: isAnnual ? 38 : 0,
      features: [
        "Unlimited text consultations",
        "Unlimited video consultations",
        "24/7 priority support",
        "Digital prescriptions",
        "Premium health tracking",
        "Family health records",
        "Medication reminders",
        "Specialist referrals",
        "Annual health assessment",
      ],
      cta: "Contact Us",
      popular: false,
      highlight: false,
      color: "secondary" as const,
    },
  ];

  const handlePricingToggle = () => {
    setIsAnnual(!isAnnual);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100vh",
          backgroundImage: (theme) =>
            theme.palette.mode === "dark"
              ? "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.08) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 119, 198, 0.08) 0%, transparent 50%)"
              : "none",
        }}
      >
        {/* Hero Section */}
        <PricingHero />

        {/* Main Pricing Section */}
        <AnimatedSection
          variants={animationVariants.slideInFromTop}
          delay={0.1}
        >
          <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box textAlign="center" mb={6}>
              <SectionTitle
                title="Simple, Transparent Pricing"
                subtitle="Choose the plan that works best for you and your family's healthcare needs"
                size="large"
                containerSx={{ mb: 4 }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 4,
                  p: 2,
                  borderRadius: 3,
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.03)"
                      : "transparent",
                  border: (theme) =>
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.06)"
                      : "none",
                }}
              >
                <AnimatedPricingToggle isActive={!isAnnual}>
                  <Typography
                    variant="body1"
                    color={isAnnual ? "text.secondary" : "text.primary"}
                    sx={{
                      fontWeight: 500,
                      color: (theme) =>
                        theme.palette.mode === "dark" && !isAnnual
                          ? "#e3f2fd"
                          : undefined,
                    }}
                  >
                    Monthly
                  </Typography>
                </AnimatedPricingToggle>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isAnnual}
                      onChange={handlePricingToggle}
                      color="primary"
                      sx={{
                        "& .MuiSwitch-track": {
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.12)"
                              : undefined,
                        },
                      }}
                    />
                  }
                  label=""
                  sx={{ mx: 1 }}
                />
                <AnimatedPricingToggle isActive={isAnnual}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body1"
                      color={isAnnual ? "text.primary" : "text.secondary"}
                      sx={{
                        fontWeight: 500,
                        color: (theme) =>
                          theme.palette.mode === "dark" && isAnnual
                            ? "#e3f2fd"
                            : undefined,
                      }}
                    >
                      Annual
                    </Typography>
                    <Box
                      component="span"
                      sx={{
                        ml: 1,
                        py: 0.5,
                        px: 1,
                        bgcolor: (theme) =>
                          theme.palette.mode === "dark"
                            ? "rgba(76, 175, 80, 0.2)"
                            : "success.light",
                        color: (theme) =>
                          theme.palette.mode === "dark"
                            ? "#81c784"
                            : "success.dark",
                        borderRadius: 1,
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        border: (theme) =>
                          theme.palette.mode === "dark"
                            ? "1px solid rgba(76, 175, 80, 0.3)"
                            : "none",
                      }}
                    >
                      Save up to 38%
                    </Box>
                  </Box>
                </AnimatedPricingToggle>
              </Box>

              <StaggeredAnimationWrapper>
                <Grid container spacing={3} justifyContent="center">
                  {plans.map((plan, index) => (
                    <Grid size={{ xs: 12, md: 4 }} key={index}>
                      <motion.div
                        variants={animationVariants.staggerItem}
                        style={{ height: "100%" }}
                      >
                        <PricingCard {...plan} isAnnual={isAnnual} />
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </StaggeredAnimationWrapper>
            </Box>
          </Container>
        </AnimatedSection>

        {/* Specialty Pricing Section */}
        <AnimatedSection variants={animationVariants.elasticIn} delay={0.2}>
          <Box
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.02)"
                  : "background.paper",
              py: 8,
              borderTop: (theme) =>
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.05)"
                  : "none",
              borderBottom: (theme) =>
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.05)"
                  : "none",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, rgba(120, 119, 198, 0.03) 0%, transparent 50%, rgba(120, 119, 198, 0.03) 100%)"
                    : "none",
                pointerEvents: "none",
              },
            }}
          >
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
              <SectionTitle
                title="Specialty Service Pricing"
                containerSx={{ mb: 6 }}
              />
              <SpecialtyPricing />
            </Container>
          </Box>
        </AnimatedSection>

        {/* Comparison Table */}
        <AnimatedSection variants={animationVariants.flipIn} delay={0.3}>
          <Container
            maxWidth="lg"
            sx={{
              py: 8,
              "& .MuiPaper-root": {
                bgcolor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.02)"
                    : undefined,
                border: (theme) =>
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.08)"
                    : undefined,
                borderRadius: 2,
                backdropFilter: (theme) =>
                  theme.palette.mode === "dark" ? "blur(10px)" : "none",
              },
            }}
          >
            <SectionTitle title="Compare Our Plans" containerSx={{ mb: 6 }} />
            <ComparisonTable isAnnual={isAnnual} />
          </Container>
        </AnimatedSection>

        {/* Testimonials */}
        <AnimatedSection variants={animationVariants.morphIn} delay={0.4}>
          <Box
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.01)"
                  : "background.paper",
              py: 8,
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(33, 150, 243, 0.05) 0%, transparent 50%)"
                    : "none",
                pointerEvents: "none",
              },
              borderTop: (theme) =>
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.05)"
                  : "none",
              borderBottom: (theme) =>
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.05)"
                  : "none",
            }}
          >
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
              <SectionTitle
                title="What Our Patients Say"
                containerSx={{ mb: 6 }}
              />
              <TestimonialCarousel />
            </Container>
          </Box>
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection variants={animationVariants.zigzagIn} delay={0.5}>
          <Container
            maxWidth="lg"
            sx={{
              py: 8,
              "& .MuiAccordion-root": {
                bgcolor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.02)"
                    : undefined,
                border: (theme) =>
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.08)"
                    : undefined,
                borderRadius: "8px !important",
                mb: 1,
                "&::before": {
                  display: "none",
                },
                "&.Mui-expanded": {
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(120, 119, 198, 0.05)"
                      : undefined,
                  border: (theme) =>
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(120, 119, 198, 0.2)"
                      : undefined,
                },
              },
            }}
          >
            <SectionTitle
              title="Frequently Asked Questions"
              containerSx={{ mb: 6 }}
            />
            <PricingFAQ />
          </Container>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection variants={animationVariants.pulseFadeIn} delay={0.2}>
          <Box
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
                  : "primary.main",
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 50%, rgba(15, 52, 96, 0.95) 100%)"
                  : undefined,
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? "#ffffff"
                  : "primary.contrastText",
              py: 8,
              position: "relative",
              overflow: "hidden",
              border: (theme) =>
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "none",
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
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "400px",
                height: "400px",
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "radial-gradient(circle, rgba(76, 175, 80, 0.08) 0%, rgba(76, 175, 80, 0) 70%)"
                    : "none",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />

            <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
              <Box textAlign="center">
                <SectionTitle
                  title="Ready to prioritize your health?"
                  subtitle="Join thousands of satisfied patients who trust us with their healthcare needs"
                  color="white"
                  size="large"
                  withDivider={false}
                  containerSx={{ mb: 4 }}
                />
                <Box
                  component="button"
                  sx={{
                    py: 1.5,
                    px: 4,
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.95)"
                        : "white",
                    color: (theme) =>
                      theme.palette.mode === "dark"
                        ? "#1a1a2e"
                        : "primary.main",
                    border: (theme) =>
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255, 255, 255, 0.2)"
                        : "none",
                    borderRadius: "50px",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    cursor: "pointer",
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
                  <Link
                    href="/contact-us"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Get Started Today
                  </Link>
                </Box>
              </Box>
            </Container>
          </Box>
        </AnimatedSection>
      </Box>
    </main>
  );
}
