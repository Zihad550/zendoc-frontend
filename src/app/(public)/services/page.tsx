import React from 'react';
import { Metadata } from 'next';
import ServicesHero from '@/components/services/ServicesHero';
import ServiceCategories from '@/components/services/ServiceCategories';
import ServicesFeatures from '@/components/services/ServicesFeatures';
import ServiceTestimonials from '@/components/services/ServiceTestimonials';
import ServiceFAQ from '@/components/services/ServiceFAQ';
import ServiceCTA from '@/components/services/ServiceCTA';

export const metadata: Metadata = {
  title: 'Healthcare Services | ZenDoc',
  description: 'Explore our comprehensive healthcare services ranging from primary care to specialized treatments. Find the right healthcare solution for your needs.',
  keywords: 'healthcare services, medical services, doctor consultation, primary care, specialized care, healthcare solutions',
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceCategories />
      <ServicesFeatures />
      <ServiceTestimonials />
      <ServiceFAQ />
      <ServiceCTA />
    </>
  );
}
