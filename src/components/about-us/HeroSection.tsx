import ReusableHeroSection from "@/components/Shared/HeroSection";
import { FeatureItem } from "@/components/Shared/HeroSection/HeroSection";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import PeopleIcon from "@mui/icons-material/People";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const HeroSection = () => {
  const features: FeatureItem[] = [
    {
      id: "years-experience",
      icon: HourglassTopIcon,
      title: "15+",
      description: "Years Experience",
    },
    {
      id: "expert-doctors",
      icon: PeopleIcon,
      title: "50+",
      description: "Expert Doctors",
    },
    {
      id: "patient-satisfaction",
      icon: ThumbUpIcon,
      title: "100%",
      description: "Patient Satisfaction",
    },
  ];

  // Custom additional content with image and button - optimized for smaller height

  return (
    <ReusableHeroSection
      title="We Care About Your Health"
      subtitle="Providing exceptional healthcare services for over a decade"
      mainIcon={MedicalInformationIcon}
      features={features}
      backgroundPattern={{ type: "radial", opacity: 0.1, animation: false }}
      waveShape="standard"
      textGradient={false}
      iconContainerShape="circle"
      centerIconSize={70}
      featureAnimation={true}
    />
  );
};

export default HeroSection;
