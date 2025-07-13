import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import HeroSection from '@/components/Shared/HeroSection';
import { FeatureItem } from '@/components/Shared/HeroSection/HeroSection';

export default function HealthPlansHero() {
  const features: FeatureItem[] = [
    {
      id: "customer-support",
      icon: AccessTimeIcon,
      title: "24/7",
      description: "Customer Support",
    },
    {
      id: "health-services",
      icon: MedicalServicesIcon,
      title: "100+",
      description: "Health Services",
    },
    {
      id: "enroll-fee",
      icon: MoneyOffIcon,
      title: "$0",
      description: "Enroll Fee",
    },
  ];

  return (
    <HeroSection
      title="Discover Our Health Plans"
      subtitle="Quality healthcare plans for every stage of life."
      mainIcon={HealthAndSafetyIcon}
      features={features}
      backgroundPattern={{ type: 'radial', opacity: 0.1, animation: false }}
      waveShape="standard"
      textGradient={false}
      iconContainerShape="circle"
      centerIconSize={80}
      featureAnimation={false}
    />
  );
}
