'use client';
import {
  CoreValuesSection,
  CtaSection,
  HeroSection,
  MilestonesSection,
  MissionVisionSection,
  TeamSection,
} from '@/components/about-us';
import { AnimatedSection, animationVariants } from '@/components/animation';
import { Box } from '@mui/material';

const AboutUsPage = () => {
  return (
    <Box>
      <HeroSection />
      <AnimatedSection variants={animationVariants.slideFromLeft} delay={0}>
        <MissionVisionSection />
      </AnimatedSection>
      <AnimatedSection variants={animationVariants.fadeInUp} delay={0}>
        <CoreValuesSection />
      </AnimatedSection>
      <AnimatedSection variants={animationVariants.slideFromRight} delay={0}>
        <MilestonesSection />
      </AnimatedSection>
      <AnimatedSection variants={animationVariants.scaleIn} delay={0}>
        <TeamSection />
      </AnimatedSection>
      <AnimatedSection variants={animationVariants.fadeInUp} delay={0}>
        <CtaSection />
      </AnimatedSection>
    </Box>
  );
};

export default AboutUsPage;
