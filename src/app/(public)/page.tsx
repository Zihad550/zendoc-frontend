"use client";
import { AnimatedSection, animationVariants } from "@/components/animation";
import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import HowItWorks from "@/components/UI/HomePage/HowItWorks/HowItWorks";
import Specialist from "@/components/UI/HomePage/Specialist/Specialist";
import Stats from "@/components/UI/HomePage/Stats/Stats";
import TopRatedDoctors from "@/components/UI/HomePage/TopRatedDoctors/TopRatedDoctors";
import WhyUs from "@/components/UI/HomePage/WhyUs/WhyUs";

// Animation variants for scroll-triggered sections

const HomePage = () => {
  return (
    <main
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hero Section - No scroll animation needed as it's the first section */}
      <HeroSection />

      {/* Specialist Section - Slide from left */}
      <AnimatedSection variants={animationVariants.slideFromLeft} delay={0.1}>
        <Specialist />
      </AnimatedSection>

      {/* Top Rated Doctors Section - Fade in up */}
      <AnimatedSection variants={animationVariants.fadeInUp} delay={0.2}>
        <TopRatedDoctors />
      </AnimatedSection>

      {/* Why Us Section - Slide from right */}
      <AnimatedSection variants={animationVariants.slideFromRight} delay={0.1}>
        <WhyUs />
      </AnimatedSection>

      {/* How It Works Section - Scale in */}
      <AnimatedSection variants={animationVariants.scaleIn} delay={0.2}>
        <HowItWorks />
      </AnimatedSection>

      {/* Stats Section - Default section animation */}
      <AnimatedSection variants={animationVariants.sectionVariants} delay={0.3}>
        <Stats />
      </AnimatedSection>
    </main>
  );
};

export default HomePage;
