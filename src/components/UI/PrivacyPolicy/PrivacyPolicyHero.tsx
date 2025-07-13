"use client";
import LockIcon from "@mui/icons-material/Lock";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import HeroSection from "@/components/Shared/HeroSection";
import { FeatureItem } from "@/components/Shared/HeroSection/HeroSection";

export default function PrivacyPolicyHero() {
  const features: FeatureItem[] = [
    {
      id: "data-security",
      icon: SecurityIcon,
      title: "Data Security",
      description: "We use advanced encryption to protect your data",
    },
    {
      id: "hipaa-compliant",
      icon: VerifiedUserIcon,
      title: "HIPAA Compliant",
      description: "Our services follow all healthcare privacy laws",
    },
  ];

  return (
    <HeroSection
      title="Privacy Policy"
      subtitle="At ZenDoc, we are committed to protecting your privacy and ensuring the security of your personal information."
      mainIcon={LockIcon}
      features={features}
      backgroundPattern={{ type: 'grid', opacity: 0.07, animation: true, animationDuration: 30 }}
      waveShape="standard"
      textGradient={true}
      iconContainerShape="circle"
      centerIconSize={80}
      heightSize="medium"
      featureAnimation={true}
    />
  );
}
