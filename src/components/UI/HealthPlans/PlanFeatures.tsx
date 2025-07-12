import SectionTitle from "@/components/Shared/SectionTitle";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import BusinessIcon from "@mui/icons-material/Business";
import ElderlyWomanIcon from "@mui/icons-material/ElderlyWoman";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";

interface PlanFeaturesProps {
  category: string;
}

const featuresData = {
  individual: [
    {
      icon: <MedicalServicesIcon sx={{ fontSize: 40 }} />,
      title: "Comprehensive Doctor Visits",
      description:
        "Access to a wide network of primary care physicians and specialists, ensuring you get the care you need.",
      color: "#1586FD",
    },
    {
      icon: <AccessTimeFilledIcon sx={{ fontSize: 40 }} />,
      title: "24/7 Virtual Care",
      description:
        "Connect with healthcare professionals anytime, anywhere through our telemedicine platform.",
      color: "#00C2A8",
    },
    {
      icon: <LocalPharmacyIcon sx={{ fontSize: 40 }} />,
      title: "Prescription Coverage",
      description:
        "Save on prescriptions with our comprehensive prescription drug coverage program.",
      color: "#FF6B6B",
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
      title: "Dedicated Support",
      description:
        "Our care team is available to help you navigate your benefits and find the right care.",
      color: "#FFD166",
    },
  ],
  family: [
    {
      icon: <FamilyRestroomIcon sx={{ fontSize: 40 }} />,
      title: "Family-Focused Care",
      description:
        "Comprehensive coverage for every family member, including pediatric and adult care.",
      color: "#1586FD",
    },
    {
      icon: <VolunteerActivismIcon sx={{ fontSize: 40 }} />,
      title: "Preventive Services",
      description:
        "Regular check-ups, vaccinations, and screenings to keep your entire family healthy.",
      color: "#00C2A8",
    },
    {
      icon: <MedicalServicesIcon sx={{ fontSize: 40 }} />,
      title: "Maternity & Newborn Care",
      description:
        "Comprehensive prenatal, delivery, and postnatal care for expecting families.",
      color: "#FF6B6B",
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
      title: "Family Support Programs",
      description:
        "Access to resources and support for parenting, childcare, and family health education.",
      color: "#FFD166",
    },
  ],
  senior: [
    {
      icon: <ElderlyWomanIcon sx={{ fontSize: 40 }} />,
      title: "Senior-Focused Care",
      description:
        "Specialized healthcare services designed for seniors' unique health needs.",
      color: "#1586FD",
    },
    {
      icon: <MedicalServicesIcon sx={{ fontSize: 40 }} />,
      title: "Chronic Condition Management",
      description:
        "Comprehensive programs to help manage diabetes, heart disease, and other chronic conditions.",
      color: "#00C2A8",
    },
    {
      icon: <LocalPharmacyIcon sx={{ fontSize: 40 }} />,
      title: "Enhanced Prescription Coverage",
      description:
        "Extensive coverage for medications commonly prescribed to seniors.",
      color: "#FF6B6B",
    },
    {
      icon: <VolunteerActivismIcon sx={{ fontSize: 40 }} />,
      title: "In-Home Care Services",
      description:
        "Support services that make it possible to receive quality healthcare at home.",
      color: "#FFD166",
    },
  ],
  corporate: [
    {
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      title: "Workforce Health Solutions",
      description:
        "Comprehensive health benefits tailored to your organization's needs and budget.",
      color: "#1586FD",
    },
    {
      icon: <VolunteerActivismIcon sx={{ fontSize: 40 }} />,
      title: "Wellness Programs",
      description:
        "Employee wellness initiatives that promote healthy lifestyles and reduce healthcare costs.",
      color: "#00C2A8",
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
      title: "HR Support Tools",
      description:
        "Easy-to-use administrative tools to help manage employee health benefits.",
      color: "#FF6B6B",
    },
    {
      icon: <MedicalServicesIcon sx={{ fontSize: 40 }} />,
      title: "Group Discounts",
      description:
        "Special rates and volume discounts for businesses of all sizes.",
      color: "#FFD166",
    },
  ],
};

export default function PlanFeatures({ category }: PlanFeaturesProps) {
  const features =
    featuresData[category as keyof typeof featuresData] ||
    featuresData.individual;

  return (
    <Box sx={{ mb: 8 }}>
      <SectionTitle
        title="Key Plan Features"
        subtitle="Our health plans include comprehensive benefits to keep you and your loved ones healthy"
        containerSx={{ mb: 6 }}
      />

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 2,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: feature.color,
                  width: 64,
                  height: 64,
                  mb: 2,
                }}
              >
                {feature.icon}
              </Avatar>

              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                {feature.title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
