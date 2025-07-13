import HeroSection from "@/components/Shared/HeroSection";
import { FeatureItem } from "@/components/Shared/HeroSection/HeroSection";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function FaqHero() {
  const features: FeatureItem[] = [
    {
      id: "24-7-support",
      icon: AccessTimeIcon,
      title: "24/7",
      description: "Support Available",
    },
    {
      id: "200-answered",
      icon: QuestionAnswerIcon,
      title: "200+",
      description: "Answered Questions",
    },
    {
      id: "clear-info",
      icon: VerifiedIcon,
      title: "100%",
      description: "Clear Information",
    },
  ];

  return (
    <HeroSection
      title="Frequently Asked Questions"
      subtitle="Find answers to common questions about our healthcare services"
      mainIcon={HelpOutlineIcon}
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
