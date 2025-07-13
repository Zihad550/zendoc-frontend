"use client";
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
    <Box sx={{ backgroundColor: "background.default" }}>
      {/* Hero Section */}
      <PricingHero />

      {/* Main Pricing Section */}
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
            }}
          >
            <Typography
              variant="body1"
              color={isAnnual ? "text.secondary" : "text.primary"}
            >
              Monthly
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={isAnnual}
                  onChange={handlePricingToggle}
                  color="primary"
                />
              }
              label=""
              sx={{ mx: 1 }}
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body1"
                color={isAnnual ? "text.primary" : "text.secondary"}
              >
                Annual
              </Typography>
              <Box
                component="span"
                sx={{
                  ml: 1,
                  py: 0.5,
                  px: 1,
                  bgcolor: "success.light",
                  color: "success.dark",
                  borderRadius: 1,
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                }}
              >
                Save up to 38%
              </Box>
            </Box>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {plans.map((plan, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <PricingCard {...plan} isAnnual={isAnnual} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Specialty Pricing Section */}
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="lg">
          <SectionTitle
            title="Specialty Service Pricing"
            containerSx={{ mb: 6 }}
          />
          <SpecialtyPricing />
        </Container>
      </Box>

      {/* Comparison Table */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <SectionTitle title="Compare Our Plans" containerSx={{ mb: 6 }} />
        <ComparisonTable isAnnual={isAnnual} />
      </Container>

      {/* Testimonials */}
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="lg">
          <SectionTitle title="What Our Patients Say" containerSx={{ mb: 6 }} />
          <TestimonialCarousel />
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <SectionTitle
          title="Frequently Asked Questions"
          containerSx={{ mb: 6 }}
        />
        <PricingFAQ />
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          py: 8,
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
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
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
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
            borderRadius: "50%",
            transform: "translate(-30%, 30%)",
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
                bgcolor: "white",
                color: "primary.main",
                border: "none",
                borderRadius: "50px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
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
    </Box>
  );
}
