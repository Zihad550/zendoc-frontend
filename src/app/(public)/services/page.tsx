import ServiceCategories from "@/components/services/ServiceCategories";
import ServiceCTA from "@/components/services/ServiceCTA";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import ServicesFeatures from "@/components/services/ServicesFeatures";
import ServicesHero from "@/components/services/ServicesHero";
import ServiceTestimonials from "@/components/services/ServiceTestimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Services | ZenDoc",
  description:
    "Explore our comprehensive healthcare services ranging from primary care to specialized treatments. Find the right healthcare solution for your needs.",
  keywords:
    "healthcare services, medical services, doctor consultation, primary care, specialized care, healthcare solutions",
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
