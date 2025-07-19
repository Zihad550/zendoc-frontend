'use client';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ElderlyIcon from '@mui/icons-material/Elderly';
import HealingIcon from '@mui/icons-material/Healing';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import PsychologyIcon from '@mui/icons-material/Psychology';
import {
  Box,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import { AnimatePresence, motion, useInView } from 'motion/react';
import Image from 'next/image';
import { useRef, useState } from 'react';

// Service category data
const categories = [
  {
    id: 'primary-care',
    name: 'Primary Care',
    icon: <MedicalServicesIcon fontSize="large" />,
    services: [
      {
        id: 1,
        name: 'Annual Check-ups',
        description:
          'Comprehensive yearly physical examinations to monitor your overall health.',
      },
      {
        id: 2,
        name: 'Preventive Care',
        description:
          'Services aimed at preventing illnesses, disease screenings, and immunizations.',
      },
      {
        id: 3,
        name: 'Chronic Disease Management',
        description:
          'Ongoing care for conditions like diabetes, hypertension, and asthma.',
      },
      {
        id: 4,
        name: 'Urgent Care',
        description: 'Immediate care for non-emergency illnesses and injuries.',
      },
    ],
    image:
      'https://res.cloudinary.com/dlem1hpam/image/upload/v1752399817/zen-doc/medical-consultation_kqxxgz.png',
  },
  {
    id: 'specialized-care',
    name: 'Specialized Care',
    icon: <HealingIcon fontSize="large" />,
    services: [
      {
        id: 1,
        name: 'Cardiology',
        description:
          'Diagnosis and treatment of heart conditions and vascular diseases.',
      },
      {
        id: 2,
        name: 'Dermatology',
        description: 'Care for skin, hair, and nail conditions and diseases.',
      },
      {
        id: 3,
        name: 'Orthopedics',
        description:
          'Treatment for bone and joint injuries, disorders, and diseases.',
      },
      {
        id: 4,
        name: 'Neurology',
        description:
          'Care for conditions affecting the brain, spinal cord, and nervous system.',
      },
    ],
    image:
      'https://res.cloudinary.com/dlem1hpam/image/upload/v1752379304/zen-doc/future_czzkg6.png',
  },
  {
    id: 'diagnostic',
    name: 'Diagnostic Services',
    icon: <MonitorHeartIcon fontSize="large" />,
    services: [
      {
        id: 1,
        name: 'Laboratory Testing',
        description:
          'Blood tests, urinalysis, and other diagnostic laboratory services.',
      },
      {
        id: 2,
        name: 'Imaging Services',
        description:
          'X-rays, CT scans, MRIs, and ultrasounds for diagnostic purposes.',
      },
      {
        id: 3,
        name: 'Cardiac Diagnostics',
        description:
          'ECGs, stress tests, and other heart function assessments.',
      },
      {
        id: 4,
        name: 'Genetic Testing',
        description:
          'Analysis of genes, chromosomes, and proteins to identify genetic conditions.',
      },
    ],
    image:
      'https://res.cloudinary.com/dlem1hpam/image/upload/v1752400389/zen-doc/Diagnostic_Services_vffilq.png',
  },
  {
    id: 'pediatric',
    name: 'Pediatric Care',
    icon: <ChildCareIcon fontSize="large" />,
    services: [
      {
        id: 1,
        name: 'Well-Child Visits',
        description:
          'Regular check-ups to monitor growth, development, and overall health.',
      },
      {
        id: 2,
        name: 'Pediatric Immunizations',
        description: 'Vaccines to protect children against serious diseases.',
      },
      {
        id: 3,
        name: 'Developmental Assessments',
        description:
          'Evaluations of physical, cognitive, and emotional development.',
      },
      {
        id: 4,
        name: 'Pediatric Urgent Care',
        description:
          'Immediate care for non-emergency pediatric illnesses and injuries.',
      },
    ],
    image:
      'https://res.cloudinary.com/dlem1hpam/image/upload/v1752400390/zen-doc/pediatric-care_bfoylx.png',
  },
  {
    id: 'mental-health',
    name: 'Mental Health',
    icon: <PsychologyIcon fontSize="large" />,
    services: [
      {
        id: 1,
        name: 'Psychological Counseling',
        description: 'Therapy sessions for various mental health concerns.',
      },
      {
        id: 2,
        name: 'Psychiatric Services',
        description: 'Diagnosis and treatment of mental health disorders.',
      },
      {
        id: 3,
        name: 'Addiction Treatment',
        description: 'Support and treatment for substance abuse and addiction.',
      },
      {
        id: 4,
        name: 'Stress Management',
        description:
          'Techniques and therapies to help manage stress and anxiety.',
      },
    ],
    image:
      'https://res.cloudinary.com/dlem1hpam/image/upload/v1752400390/zen-doc/mental-health_qzkot6.png',
  },
  {
    id: 'geriatric',
    name: 'Geriatric Care',
    icon: <ElderlyIcon fontSize="large" />,
    services: [
      {
        id: 1,
        name: 'Geriatric Assessments',
        description:
          "Comprehensive evaluations of elderly patients' health status.",
      },
      {
        id: 2,
        name: 'Chronic Disease Management',
        description:
          'Care for age-related conditions like arthritis and osteoporosis.',
      },
      {
        id: 3,
        name: 'Memory Care',
        description:
          "Support for patients with Alzheimer's and other forms of dementia.",
      },
      {
        id: 4,
        name: 'Fall Prevention',
        description:
          'Assessment and interventions to reduce fall risk in older adults.',
      },
    ],
    image:
      'https://res.cloudinary.com/dlem1hpam/image/upload/v1752400389/zen-doc/Geriatric_Care_mcr3gj.png',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const tabVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
};

const serviceCardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
    },
  }),
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: -5,
    transition: {
      duration: 0.8,
    },
  },
};

const ServiceCategories = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      ref={containerRef}
      sx={{ py: 8, backgroundColor: theme.palette.background.paper }}
    >
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                component="span"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  textTransform: 'uppercase',
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
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Comprehensive Healthcare Solutions
              </Typography>
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: 80 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Box
                  sx={{
                    height: 4,
                    backgroundColor: 'primary.main',
                    mx: 'auto',
                    mb: 3,
                  }}
                />
              </motion.div>
              <Typography
                variant="body1"
                sx={{
                  maxWidth: '700px',
                  mx: 'auto',
                  color: theme.palette.text.secondary,
                }}
              >
                Browse through our wide range of medical services designed to
                meet your healthcare needs
              </Typography>
            </Box>
          </motion.div>

          {/* Category Tabs */}
          <motion.div variants={itemVariants}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="service categories tabs"
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: 'primary.main',
                    height: 3,
                  },
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    minWidth: 120,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      color: 'primary.main',
                    },
                    '&.Mui-selected': {
                      color: 'primary.main',
                    },
                  },
                }}
              >
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    variants={tabVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Tab
                      label={category.name}
                      id={`tab-${category.id}`}
                      aria-controls={`tabpanel-${category.id}`}
                      icon={category.icon}
                      iconPosition="start"
                      onClick={() => setSelectedTab(index)}
                    />
                  </motion.div>
                ))}
              </Tabs>
            </Box>
          </motion.div>

          {/* Category Content */}
          <AnimatePresence mode="wait">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                role="tabpanel"
                hidden={selectedTab !== index}
                id={`tabpanel-${category.id}`}
                aria-labelledby={`tab-${category.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  selectedTab === index
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {selectedTab === index && (
                  <Grid container spacing={4} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                      <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        key={`image-${category.id}`}
                      >
                        <motion.div
                          whileHover={{
                            scale: 1.02,
                            rotateY: 0,
                            transition: { duration: 0.3 },
                          }}
                        >
                          <Box
                            sx={{
                              position: 'relative',
                              height: { xs: 300, md: 400 },
                              width: '100%',
                              borderRadius: 3,
                              overflow: 'hidden',
                              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                              transform: 'perspective(1000px) rotateY(-5deg)',
                              transition: 'all 0.5s ease',
                            }}
                          >
                            <Image
                              src={category.image}
                              alt={category.name}
                              fill
                              style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                              }}
                              priority
                            />
                          </Box>
                        </motion.div>
                      </motion.div>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <Typography
                          variant="h4"
                          sx={{ mb: 3, fontWeight: 700, color: 'primary.main' }}
                        >
                          {category.name}
                        </Typography>
                      </motion.div>
                      <Grid container spacing={2}>
                        {category.services.map((service, serviceIndex) => (
                          <Grid size={{ xs: 12 }} key={service.id}>
                            <motion.div
                              variants={serviceCardVariants}
                              initial="hidden"
                              animate="visible"
                              custom={serviceIndex}
                              key={`service-${category.id}-${service.id}`}
                            >
                              <motion.div
                                whileHover={{
                                  scale: 1.02,
                                  y: -5,
                                  transition: { duration: 0.2 },
                                }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Paper
                                  elevation={0}
                                  sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    border: '1px solid',
                                    borderColor: theme.palette.grey[200],
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    '&:hover': {
                                      boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
                                      borderColor: 'primary.light',
                                      backgroundColor:
                                        'rgba(25, 118, 210, 0.02)',
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
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {service.description}
                                  </Typography>
                                </Paper>
                              </motion.div>
                            </motion.div>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ServiceCategories;
