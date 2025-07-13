"use client";
import HeroSection from "@/components/Shared/HeroSection";
import { FeatureItem } from "@/components/Shared/HeroSection/HeroSection";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PeopleIcon from "@mui/icons-material/People";

const ServicesHero = () => {
  const features: FeatureItem[] = [
    {
      id: "medical-specialties",
      icon: MedicalServicesIcon,
      title: "25+",
      description: "Medical Specialties",
    },
    {
      id: "expert-doctors",
      icon: PeopleIcon,
      title: "100+",
      description: "Expert Doctors",
    },
    {
      id: "available-support",
      icon: HeadsetMicIcon,
      title: "24/7",
      description: "Available Support",
    },
  ];

  return (
    <HeroSection
      title="Our Healthcare Services"
      subtitle="Comprehensive medical care tailored to your individual needs"
      mainIcon={HealthAndSafetyIcon}
      features={features}
      backgroundPattern={{ type: "radial", opacity: 0.1, animation: false }}
      waveShape="standard"
      textGradient={false}
      iconContainerShape="circle"
      centerIconSize={80}
      featureAnimation={true}
      // additionalContent={searchBar}
    />
  );
};

export default ServicesHero;
