"use client";
import SectionTitle from "@/components/Shared/SectionTitle";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DateRangeIcon from "@mui/icons-material/DateRange";
import {
  alpha,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

// Define terms and conditions sections and content
const termsSections = [
  {
    id: "introduction",
    title: "Introduction",
    content: `Welcome to ZenDoc's terms and conditions. By accessing or using our services, you agree to comply with these terms. Please read them carefully to ensure you understand your rights and obligations while using our healthcare platform.`,
  },
  {
    id: "eligibility",
    title: "Eligibility",
    content: `Our services are available to users who are at least 18 years old or have parental consent. By using our platform, you represent and warrant that you meet this eligibility criteria.`,
  },
  {
    id: "account-responsibility",
    title: "Account Responsibility",
    content: `You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized access or use of your account. ZenDoc will not be liable for any loss or damage resulting from your failure to safeguard your information.`,
  },
  {
    id: "prohibited-activities",
    title: "Prohibited Activities",
    content: `While using our services, you agree not to engage in any activities that:

• Violate any applicable laws or regulations.
• Infringe upon the rights of others, including privacy and intellectual property rights.
• Introduce viruses, malware, or harmful code to our platform.
• Engage in any form of unauthorized data harvesting or collection activities.
• Interfere with or disrupt the security or integrity of our services.

We reserve the right to terminate access to our services for any violations.`,
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: `All content, logos, and trademarks displayed on ZenDoc's platform are the property of ZenDoc or our licensors. You may not use, reproduce, or distribute any of our intellectual property without our prior written consent.`,
  },
  {
    id: "disclaimer",
    title: "Disclaimer and Liability",
    content: `Our services are provided on an 'as is' and 'as available' basis. While we strive to provide high-quality services, we do not warrant that our platform will meet your expectations or be error-free. To the fullest extent permitted by law, ZenDoc disclaims all warranties and liability for any damages arising from your use of our services.`,
  },
  {
    id: "changes",
    title: "Changes to Terms",
    content: `We may update these terms from time to time to reflect changes in our services or legal requirements. We will notify you of significant changes by email or through a notice on our platform. Your continued use of our services following such changes constitutes your acceptance of the new terms.`,
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: `These terms shall be governed by and construed in accordance with the laws of the State of California without regard to its conflict of law principles. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the state and federal courts located in California.`,
  },
  {
    id: "contact",
    title: "Contact Information",
    content: `If you have any questions or concerns about these terms, please feel free to contact our legal department:

Email: legal@zendoc.com
Phone: (800) 555-9876
Address: 123 Medical Plaza, Suite 300, Healthville, CA 90000

We will be happy to assist you with any inquiries related to our terms and conditions.`,
  },
];

export default function TermsConditionsContent() {
  const theme = useTheme();
  const [activeSection, setActiveSection] = useState("introduction");

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    // Scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Grid container spacing={4}>
          {/* Sidebar for navigation */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              component={Paper}
              elevation={0}
              sx={{
                position: { md: "sticky" },
                top: { md: 100 },
                p: 3,
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                backgroundColor: alpha(theme.palette.secondary.light, 0.8),
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Quick Navigation
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <AssignmentIcon
                  sx={{ color: "text.secondary", mr: 1, fontSize: 20 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Last reviewed: June 15, 2025
                </Typography>
              </Box>

              <List sx={{ p: 0 }}>
                {termsSections.map((section) => (
                  <ListItemButton
                    key={section.id}
                    disableGutters
                    onClick={() => handleSectionClick(section.id)}
                    sx={{
                      py: 1,
                      px: 2,
                      mb: 0.5,
                      borderRadius: 1.5,
                      backgroundColor:
                        activeSection === section.id
                          ? alpha(theme.palette.primary.main, 0.1)
                          : "transparent",
                      color:
                        activeSection === section.id
                          ? theme.palette.primary.main
                          : "text.primary",
                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.07,
                        ),
                      },
                      transition: "all 0.2s ease",
                      ml: -2,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 28,
                        color:
                          activeSection === section.id
                            ? theme.palette.primary.main
                            : "text.secondary",
                      }}
                    >
                      <ArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={section.title}
                      primaryTypographyProps={{
                        fontSize: "0.9rem",
                        fontWeight: activeSection === section.id ? 600 : 400,
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>

              <Divider sx={{ my: 3 }} />

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Have legal questions?
              </Typography>

              <Button
                fullWidth
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Contact Legal Team
              </Button>
            </Box>
          </Grid>

          {/* Main content */}
          <Grid size={{ xs: 12, md: 9 }}>
            <SectionTitle
              title="ZenDoc Terms"
              subtitle="These terms govern your access and use of our services."
              size="medium"
              align="left"
              titleSx={{
                fontWeight: 700,
                fontSize: { xs: "1.75rem", md: "2rem" },
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #0A5CB8 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              dividerSx={{
                width: 60,
                height: 4,
                borderRadius: 2,
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, #0A5CB8 100%)`,
              }}
              containerSx={{ mb: 5 }}
            />

            {/* Effective date and PDF download */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 5,
                gap: 2,
                p: 3,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.secondary.light, 0.5),
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DateRangeIcon sx={{ color: "text.secondary", mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  <strong>Effective Date:</strong> July 1, 2025
                </Typography>
              </Box>

              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 6,
                  fontWeight: 600,
                  px: 2,
                }}
              >
                Download PDF Version
              </Button>
            </Box>

            {/* Terms sections */}
            <Box sx={{ mb: 6 }}>
              {termsSections.map((section) => (
                <Box
                  key={section.id}
                  id={section.id}
                  sx={{
                    mb: 5,
                    scrollMarginTop: "100px",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      color: "text.primary",
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: -16,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 6,
                        height: 24,
                        borderRadius: 8,
                        backgroundColor: theme.palette.primary.main,
                        display: { xs: "none", md: "block" },
                      },
                    }}
                  >
                    {section.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "pre-line",
                      lineHeight: 1.7,
                      color: alpha(theme.palette.text.primary, 0.85),
                    }}
                  >
                    {section.content}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Compliance and Support section */}
            <Box sx={{ mt: 8, mb: 6 }}>
              <SectionTitle
                title="Support and Compliance"
                subtitle="How we ensure adherence to these terms"
                size="medium"
                align="left"
                dividerSx={{
                  width: 60,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: theme.palette.primary.main,
                }}
              />

              <Grid container spacing={3} sx={{ mt: 4 }}>
                {[
                  {
                    title: "Ongoing Support",
                    description: "Our support team is here to help you 24/7",
                  },
                  {
                    title: "Legal Compliance",
                    description:
                      "Adhering to state, federal, and international regulations",
                  },
                  {
                    title: "Security Measures",
                    description:
                      "Continuous monitoring to protect your interests",
                  },
                  {
                    title: "Transparency",
                    description:
                      "Clear communication about changes and updates",
                  },
                ].map((item, index) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={index}>
                    <Box sx={{ display: "flex" }}>
                      <CheckCircleOutlineIcon
                        sx={{
                          color: theme.palette.primary.main,
                          mr: 1.5,
                          fontSize: 22,
                          mt: 0.3,
                        }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          mb={0.5}
                        >
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Contact section */}
            <Box sx={{ textAlign: "center", mt: 8, mb: 4 }}>
              <Chip
                label="Need Legal Assistance?"
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  px: 2,
                  mb: 2,
                }}
              />
              <Typography variant="h5" fontWeight="bold" mb={2}>
                We{"'"}re Here to Assist
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 700, mx: "auto", mb: 3 }}
              >
                If you have any questions about these terms or need further
                assistance, please reach out to our Legal Team.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  py: 1.2,
                  px: 4,
                  borderRadius: 2,
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #0A5CB8 100%)`,
                  boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.3)}`,
                  "&:hover": {
                    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                  },
                }}
              >
                Contact Legal Team
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
