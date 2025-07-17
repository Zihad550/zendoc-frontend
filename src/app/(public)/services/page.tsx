import { AnimatedSection, animationVariants } from '@/components/animation';
import ServiceCategories from '@/components/services/ServiceCategories';
import ServiceCTA from '@/components/services/ServiceCTA';
import ServiceFAQ from '@/components/services/ServiceFAQ';
import ServicesFeatures from '@/components/services/ServicesFeatures';
import ServicesHero from '@/components/services/ServicesHero';
import ServiceTestimonials from '@/components/services/ServiceTestimonials';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Healthcare Services | ZenDoc',
  description:
    'Explore our comprehensive healthcare services ranging from primary care to specialized treatments. Find the right healthcare solution for your needs.',
  keywords:
    'healthcare services, medical services, doctor consultation, primary care, specialized care, healthcare solutions',
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <AnimatedSection variants={animationVariants.slideFromLeft} delay={0}>
        <ServiceCategories />
      </AnimatedSection>
      <AnimatedSection variants={animationVariants.fadeInUp} delay={0}>
        <ServicesFeatures />
      </AnimatedSection>
      <AnimatedSection variants={animationVariants.slideFromRight} delay={0}>
        <ServiceTestimonials />
      </AnimatedSection>
      <AnimatedSection variants={animationVariants.scaleIn} delay={0}>
        <ServiceFAQ />
      </AnimatedSection>
      <AnimatedSection variants={animationVariants.sectionVariants} delay={0}>
        <ServiceCTA />
      </AnimatedSection>
    </>
  );
}
