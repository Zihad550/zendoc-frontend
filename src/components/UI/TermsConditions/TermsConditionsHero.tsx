"use client";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import GavelIcon from "@mui/icons-material/Gavel";
import HandshakeIcon from "@mui/icons-material/Handshake";
import HeroSection from "@/components/Shared/HeroSection";
import { FeatureItem } from "@/components/Shared/HeroSection/HeroSection";

export default function TermsConditionsHero() {
  const features: FeatureItem[] = [
    {
      id: "service-agreement",
      icon: FactCheckIcon,
      title: "Service Agreement",
      description: "Legal terms governing the use of our healthcare platform",
    },
    {
      id: "user-responsibilities",
      icon: HandshakeIcon,
      title: "User Responsibilities",
      description: "Your rights and obligations when using our services",
    },
  ];

  return (
    <HeroSection
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using our healthcare services."
      mainIcon={GavelIcon}
      features={features}
      backgroundPattern={{ type: 'dots', opacity: 0.07, animation: true, animationDuration: 60 }}
      waveShape="angular"
      textGradient={true}
      iconContainerShape="square"
      centerIconSize={84}
      heightSize="medium"
      featureAnimation={true}
    />
  );
}
