import HeroSection from "@/components/Shared/HeroSection";
import { FeatureItem } from "@/components/Shared/HeroSection/HeroSection";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PeopleIcon from "@mui/icons-material/People";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

export default function ConsultationHero() {
  const features: FeatureItem[] = [
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
    {
      id: "happy-patients",
      icon: SentimentSatisfiedAltIcon,
      title: "5000+",
      description: "Happy Patients",
    },
  ];

  return (
    <HeroSection
      title="Healthcare at Your Fingertips"
      subtitle="Connect with expert doctors for personalized care from the comfort of your home."
      mainIcon={LocalHospitalIcon}
      features={features}
      backgroundPattern={{ type: "radial", opacity: 0.1, animation: false }}
      waveShape="standard"
      textGradient={false}
      iconContainerShape="circle"
      centerIconSize={80}
      featureAnimation={false}
    />
  );
}
