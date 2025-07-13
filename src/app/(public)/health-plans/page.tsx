"use client";

import SectionTitle from "@/components/Shared/SectionTitle";
import HealthPlansHero from "@/components/UI/HealthPlans/HealthPlansHero";
import PlanCard from "@/components/UI/HealthPlans/PlanCard";
import PlanComparison from "@/components/UI/HealthPlans/PlanComparison";
import PlanFeatures from "@/components/UI/HealthPlans/PlanFeatures";
import PlansCallToAction from "@/components/UI/HealthPlans/PlansCallToAction";
import PlansFAQ from "@/components/UI/HealthPlans/PlansFAQ";
import PlansTestimonials from "@/components/UI/HealthPlans/PlansTestimonials";
import {
  Box,
  Container,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { healthPlans, planCategories } from "./health-plans.data";

// Plan categories

export default function HealthPlansPage() {
  const [selectedCategory, setSelectedCategory] = useState("individual");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleCategoryChange = (
    event: React.SyntheticEvent,
    newValue: string,
  ) => {
    setSelectedCategory(newValue);
  };

  const currentPlans =
    healthPlans[selectedCategory as keyof typeof healthPlans];

  return (
    <Box sx={{ backgroundColor: "background.default" }}>
      {/* Hero Section */}
      <HealthPlansHero />

      {/* Plans Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <SectionTitle
          title="Health Plans for Every Stage of Life"
          subtitle="Choose the perfect plan for you and your loved ones with our comprehensive coverage options"
          size="large"
          containerSx={{ mb: 6 }}
        />

        {/* Category Tabs */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mb: 6,
          }}
        >
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : undefined}
            allowScrollButtonsMobile
            centered={!isMobile}
            sx={{
              "& .MuiTab-root": {
                fontSize: { xs: "0.875rem", md: "1rem" },
                fontWeight: 500,
                minWidth: { xs: "auto", md: 160 },
                px: { xs: 2, md: 3 },
              },
              "& .Mui-selected": {
                fontWeight: 600,
              },
            }}
          >
            {planCategories.map((category) => (
              <Tab
                key={category.id}
                label={category.label}
                value={category.id}
              />
            ))}
          </Tabs>
        </Box>

        {/* Plan Cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            mb: 8,
          }}
        >
          {currentPlans.map((plan) => (
            <PlanCard key={plan.key} plan={plan} />
          ))}
        </Box>

        {/* Plan Features */}
        <PlanFeatures category={selectedCategory} />
      </Container>

      {/* Plan Comparison */}
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="lg">
          <SectionTitle
            title="Compare Our Health Plans"
            subtitle="Find the perfect plan by comparing features side by side"
            containerSx={{ mb: 6 }}
          />
          <PlanComparison plans={currentPlans} />
        </Container>
      </Box>

      {/* Testimonials */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <SectionTitle
          title="What Our Members Say"
          subtitle="Read about the experiences of people who have chosen our health plans"
          containerSx={{ mb: 6 }}
        />
        <PlansTestimonials />
      </Container>

      {/* FAQ Section */}
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="lg">
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our health plans"
            containerSx={{ mb: 6 }}
          />
          <PlansFAQ />
        </Container>
      </Box>

      {/* Call to Action */}
      <PlansCallToAction />
    </Box>
  );
}
