"use client";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import TimelineIcon from '@mui/icons-material/Timeline';
import HeroSection from '@/components/Shared/HeroSection';
import { FeatureItem } from '@/components/Shared/HeroSection/HeroSection';

const HistoryHero = () => {
  const features: FeatureItem[] = [
    {
      id: "founded",
      icon: CalendarTodayIcon,
      title: "2010",
      description: "Founded",
    },
    {
      id: "patients-served",
      icon: EmojiPeopleIcon,
      title: "15K+",
      description: "Patients Served",
    },
    {
      id: "global-centers",
      icon: LocationCityIcon,
      title: "5",
      description: "Global Centers",
    },
  ];

  return (
    <HeroSection
      title="Our Journey Through Time"
      subtitle="From humble beginnings to becoming a leading healthcare provider"
      mainIcon={TimelineIcon}
      features={features}
      backgroundPattern={{ type: 'radial', opacity: 0.1, animation: false }}
      waveShape="standard"
      textGradient={false}
      iconContainerShape="circle"
      centerIconSize={80}
      featureAnimation={true}
    />
  );
};

export default HistoryHero;
