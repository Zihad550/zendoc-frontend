"use client";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ElderlyIcon from "@mui/icons-material/Elderly";
import HealingIcon from "@mui/icons-material/Healing";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import PsychologyIcon from "@mui/icons-material/Psychology";
import {
  Box,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

// Service category data
const categories = [
  {
    id: "primary-care",
    name: "Primary Care",
    icon: <MedicalServicesIcon fontSize="large" />,
    services: [
      {
        id: 1,
        name: "Annual Check-ups",
        description:
          "Comprehensive yearly physical examinations to monitor your overall health.",
      },
      {
        id: 2,
        name: "Preventive Care",
        description:
          "Services aimed at preventing illnesses, disease screenings, and immunizations.",
      },
      {
        id: 3,
        name: "Chronic Disease Management",
        description:
          "Ongoing care for conditions like diabetes, hypertension, and asthma.",
      },
      {
        id: 4,
        name: "Urgent Care",
        description: "Immediate care for non-emergency illnesses and injuries.",
      },
    ],
    image:
      "https://res.cloudinary.com/dlem1hpam/image/upload/v1752399817/zen-doc/medical-consultation_kqxxgz.png",
  },
  {
    id: "specialized-care",
    name: "Specialized Care",
    icon: <HealingIcon fontSize="large" />,
    services: [
      {
        id: 1,
        name: "Cardiology",
        description:
          "Diagnosis and treatment of heart conditions and vascular diseases.",
      },
      {
        id: 2,
        name: "Dermatology",
        description: "Care for skin, hair, and nail conditions and diseases.",
      },
      {
        id: 3,
        name: "Orthopedics",
        description:
          "Treatment for bone and joint injuries, disorders, and diseases.",
      },
      {
        id: 4,
        name: "Neurology",
        description:
          "Care for conditions affecting the brain, spinal cord, and nervous system.",
      },
    ],
    image:
      "https://res.cloudinary.com/dlem1hpam/image/upload/v1752379304/zen-doc/future_czzkg6.png",
  },
  {
    id: "diagnostic",
    name: "Diagnostic Services",
    icon: <MonitorHeartIcon fontSize="large" />,
    services: [
      {
        id: 1,
        name: "Laboratory Testing",
        description:
          "Blood tests, urinalysis, and other diagnostic laboratory services.",
      },
      {
        id: 2,
        name: "Imaging Services",
        description:
          "X-rays, CT scans, MRIs, and ultrasounds for diagnostic purposes.",
      },
      {
        id: 3,
        name: "Cardiac Diagnostics",
        description:
          "ECGs, stress tests, and other heart function assessments.",
      },
      {
        id: 4,
        name: "Genetic Testing",
        description:
          "Analysis of genes, chromosomes, and proteins to identify genetic conditions.",
      },
    ],
    image:
      "https://res.cloudinary.com/dlem1hpam/image/upload/v1752400389/zen-doc/Diagnostic_Services_vffilq.png",
  },
  {
    id: "pediatric",
    name: "Pediatric Care",
    icon: <ChildCareIcon fontSize="large" />,
    services: [
      {
        id: 1,
        name: "Well-Child Visits",
        description:
          "Regular check-ups to monitor growth, development, and overall health.",
      },
      {
        id: 2,
        name: "Pediatric Immunizations",
        description: "Vaccines to protect children against serious diseases.",
      },
      {
        id: 3,
        name: "Developmental Assessments",
        description:
          "Evaluations of physical, cognitive, and emotional development.",
      },
      {
        id: 4,
        name: "Pediatric Urgent Care",
        description:
          "Immediate care for non-emergency pediatric illnesses and injuries.",
      },
    ],
    image:
      "https://res.cloudinary.com/dlem1hpam/image/upload/v1752400390/zen-doc/pediatric-care_bfoylx.png",
  },
  {
    id: "mental-health",
    name: "Mental Health",
    icon: <PsychologyIcon fontSize="large" />,
    services: [
      {
        id: 1,
        name: "Psychological Counseling",
        description: "Therapy sessions for various mental health concerns.",
      },
      {
        id: 2,
        name: "Psychiatric Services",
        description: "Diagnosis and treatment of mental health disorders.",
      },
      {
        id: 3,
        name: "Addiction Treatment",
        description: "Support and treatment for substance abuse and addiction.",
      },
      {
        id: 4,
        name: "Stress Management",
        description:
          "Techniques and therapies to help manage stress and anxiety.",
      },
    ],
    image:
      "https://res.cloudinary.com/dlem1hpam/image/upload/v1752400390/zen-doc/mental-health_qzkot6.png",
  },
  {
    id: "geriatric",
    name: "Geriatric Care",
    icon: <ElderlyIcon fontSize="large" />,
    services: [
      {
        id: 1,
        name: "Geriatric Assessments",
        description:
          "Comprehensive evaluations of elderly patients' health status.",
      },
      {
        id: 2,
        name: "Chronic Disease Management",
        description:
          "Care for age-related conditions like arthritis and osteoporosis.",
      },
      {
        id: 3,
        name: "Memory Care",
        description:
          "Support for patients with Alzheimer's and other forms of dementia.",
      },
      {
        id: 4,
        name: "Fall Prevention",
        description:
          "Assessment and interventions to reduce fall risk in older adults.",
      },
    ],
    image:
      "https://res.cloudinary.com/dlem1hpam/image/upload/v1752400389/zen-doc/Geriatric_Care_mcr3gj.png",
  },
];

const ServiceCategories = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ py: 8, backgroundColor: theme.palette.background.paper }}>
      <Container maxWidth="lg">
        {/* Section Title */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            component="span"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              fontSize: "1.1rem",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Explore Our Services
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              my: 2,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Comprehensive Healthcare Solutions
          </Typography>
          <Box
            sx={{
              width: 80,
              height: 4,
              backgroundColor: "primary.main",
              mx: "auto",
              mb: 3,
            }}
          />
          <Typography
            variant="body1"
            sx={{
              maxWidth: "700px",
              mx: "auto",
              color: theme.palette.text.secondary,
            }}
          >
            Browse through our wide range of medical services designed to meet
            your healthcare needs
          </Typography>
        </Box>

        {/* Category Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="service categories tabs"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "primary.main",
                height: 3,
              },
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                minWidth: 120,
                "&.Mui-selected": {
                  color: "primary.main",
                },
              },
            }}
          >
            {categories.map((category) => (
              <Tab
                key={category.id}
                label={category.name}
                id={`tab-${category.id}`}
                aria-controls={`tabpanel-${category.id}`}
                icon={category.icon}
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Box>

        {/* Category Content */}
        {categories.map((category, index) => (
          <Box
            key={category.id}
            role="tabpanel"
            hidden={activeTab !== index}
            id={`tabpanel-${category.id}`}
            aria-labelledby={`tab-${category.id}`}
          >
            {activeTab === index && (
              <Grid container spacing={4} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      position: "relative",
                      height: { xs: 300, md: 400 },
                      width: "100%",
                      borderRadius: 3,
                      overflow: "hidden",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      transform: "perspective(1000px) rotateY(-5deg)",
                      transition: "all 0.5s ease",
                      "&:hover": {
                        transform: "perspective(1000px) rotateY(0deg)",
                      },
                    }}
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      priority
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="h4"
                    sx={{ mb: 3, fontWeight: 700, color: "primary.main" }}
                  >
                    {category.name}
                  </Typography>
                  <Grid container spacing={2}>
                    {category.services.map((service) => (
                      <Grid size={{ xs: 12 }} key={service.id}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: theme.palette.grey[200],
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                              borderColor: "primary.light",
                              transform: "translateY(-5px)",
                            },
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight={600}
                            gutterBottom
                          >
                            {service.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {service.description}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 3,
                      py: 1.5,
                      px: 4,
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: "1rem",
                    }}
                  >
                    Learn More About {category.name}
                  </Button> */}
                </Grid>
              </Grid>
            )}
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default ServiceCategories;
