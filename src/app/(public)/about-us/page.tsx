"use client";
import {
  CoreValuesSection,
  CtaSection,
  HeroSection,
  MilestonesSection,
  MissionVisionSection,
  TeamSection,
} from "@/components/about-us";
import { Box } from "@mui/material";

const AboutUsPage = () => {
  return (
    <Box>
      <HeroSection />
      <MissionVisionSection />
      <CoreValuesSection />
      <MilestonesSection />
      <TeamSection />
      <CtaSection />
    </Box>
  );
};

export default AboutUsPage;
