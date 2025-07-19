import HeroSection from '@/components/Shared/HeroSection';
import { FeatureItem } from '@/components/Shared/HeroSection/HeroSection';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';

export default function PricingHero() {
  const features: FeatureItem[] = [
    {
      id: '24-7-access',
      icon: AccessTimeIcon,
      title: '24/7',
      description: 'Access to Care',
    },
    {
      id: 'specialists',
      icon: PeopleIcon,
      title: '100+',
      description: 'Specialists',
    },
    {
      id: 'setup-fee',
      icon: MoneyOffIcon,
      title: '$0',
      description: 'Setup Fee',
    },
  ];

  return (
    <HeroSection
      title="Healthcare Plans for Every Need"
      subtitle="Transparent pricing with quality care at every level"
      mainIcon={PaidIcon}
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
