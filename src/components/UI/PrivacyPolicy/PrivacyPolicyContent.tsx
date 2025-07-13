"use client";
import SectionTitle from "@/components/Shared/SectionTitle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Box,
  Button,
  Card,
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

// Define privacy policy sections and content
const privacySections = [
  {
    id: "information-collection",
    title: "Information We Collect",
    content: `We collect various types of information to provide you with the best healthcare services:

• Personal Information: Name, contact details, address, date of birth, and insurance information.
• Medical Information: Medical history, current medications, allergies, and treatment plans.
• Account Information: Login credentials and account preferences.
• Payment Information: Credit card details and billing information.
• Device Information: IP address, browser type, device type, and operating system.

We collect this information directly from you when you register, book appointments, or use our services. We may also collect information from healthcare providers with your consent.`,
  },
  {
    id: "information-usage",
    title: "How We Use Your Information",
    content: `We use your information for the following purposes:

• Providing Healthcare Services: To schedule appointments, provide medical consultations, and offer personalized healthcare recommendations.
• Account Management: To create and manage your account, authenticate your identity, and process payments.
• Communication: To send appointment reminders, medical updates, and service notifications.
• Service Improvement: To analyze usage patterns, improve our platform, and enhance user experience.
• Legal Compliance: To comply with healthcare regulations, including HIPAA requirements.

Your information helps us deliver high-quality healthcare services tailored to your needs while maintaining the highest standards of privacy and security.`,
  },
  {
    id: "information-sharing",
    title: "Information Sharing and Disclosure",
    content: `We may share your information with:

• Healthcare Providers: Doctors, specialists, and medical staff directly involved in your care.
• Insurance Companies: For billing and claims processing purposes with your authorization.
• Service Providers: Third-party vendors who help us operate our platform (e.g., payment processors, cloud storage providers).
• Legal Authorities: When required by law, court order, or government regulation.

We implement strict data sharing agreements with all third parties to ensure they maintain the confidentiality and security of your information. We never sell your personal information to advertisers or other third parties for marketing purposes.`,
  },
  {
    id: "data-security",
    title: "Data Security",
    content: `We implement robust security measures to protect your information:

• Encryption: All sensitive data is encrypted in transit and at rest.
• Access Controls: Only authorized personnel can access your information on a need-to-know basis.
• Regular Audits: We conduct security audits and vulnerability assessments.
• Employee Training: Our staff receives regular training on privacy and security practices.
• Breach Notification: In the unlikely event of a data breach, we will notify you promptly as required by law.

We are committed to maintaining the security and confidentiality of your information and continuously update our security practices to address emerging threats.`,
  },
  {
    id: "your-rights",
    title: "Your Rights and Choices",
    content: `You have the following rights regarding your information:

• Access: You can request access to your personal information.
• Correction: You can update or correct inaccurate information.
• Deletion: You can request deletion of your account and associated data.
• Restriction: You can limit how we use your information.
• Data Portability: You can request a copy of your data in a structured format.
• Objection: You can object to certain uses of your information.

To exercise these rights, please contact our Privacy Officer at privacy@zendoc.com or through your account settings.`,
  },
  {
    id: "cookies",
    title: "Cookies and Tracking Technologies",
    content: `We use cookies and similar technologies to:

• Maintain your session and preferences.
• Understand how you use our platform.
• Enhance security and prevent fraud.
• Improve our services and user experience.

You can manage cookie preferences through your browser settings. However, disabling certain cookies may limit functionality of our platform.

We do not use cookies for advertising purposes or to track your browsing activity on other websites.`,
  },
  {
    id: "children-privacy",
    title: "Children's Privacy",
    content: `Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.

For patients between 13-18 years old, we require parental consent for the collection and use of their personal information, in accordance with applicable laws.`,
  },
  {
    id: "international-transfers",
    title: "International Data Transfers",
    content: `We primarily store and process your information within the United States. However, we may transfer your information to service providers in other countries for processing, subject to appropriate safeguards.

When transferring data internationally, we ensure compliance with applicable data protection laws and implement appropriate safeguards, such as standard contractual clauses approved by relevant authorities.`,
  },
  {
    id: "policy-changes",
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:

• Posting the updated policy on our website.
• Sending an email notification to the address associated with your account.
• Displaying a notice on our platform.

We encourage you to review this policy periodically for the latest information on our privacy practices.`,
  },
  {
    id: "contact-us",
    title: "Contact Us",
    content: `If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact our Privacy Officer:

Email: privacy@zendoc.com
Phone: (800) 555-1234
Address: 123 Medical Plaza, Suite 200, Healthville, CA 90000

We are committed to addressing your concerns and will respond to your inquiry promptly.`,
  },
];

export default function PrivacyPolicyContent() {
  const theme = useTheme();
  const [activeSection, setActiveSection] = useState("information-collection");

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
          {/* Left sidebar for quick navigation */}
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
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Quick Navigation
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <AccessTimeIcon
                  sx={{ color: "text.secondary", mr: 1, fontSize: 20 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Last updated: June 15, 2025
                </Typography>
              </Box>

              <List sx={{ p: 0 }}>
                {privacySections.map((section) => (
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
                Need assistance with privacy matters?
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
                Contact Privacy Officer
              </Button>
            </Box>
          </Grid>

          {/* Main content */}
          <Grid size={{ xs: 12, md: 9 }}>
            <SectionTitle
              title="Our Privacy Commitment"
              subtitle="We value your trust and are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your information."
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
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
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

            {/* Privacy policy sections */}
            <Box sx={{ mb: 6 }}>
              {privacySections.map((section) => (
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

            {/* Interactive components */}
            <Box sx={{ mt: 8, mb: 6 }}>
              <SectionTitle
                title="Privacy FAQs"
                subtitle="Common questions about our privacy practices"
                size="medium"
                align="left"
                dividerSx={{
                  width: 60,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: theme.palette.primary.main,
                }}
              />

              <Box sx={{ mt: 4 }}>
                {[
                  {
                    question: "How long do you retain my personal information?",
                    answer:
                      "We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, to comply with legal obligations, or as permitted by law. Medical records are typically retained in accordance with state and federal regulations, which is generally 7-10 years from your last interaction with our services.",
                  },
                  {
                    question:
                      "How can I access or correct my personal information?",
                    answer:
                      "You can access and update your personal information through your account settings on our website or mobile app. For medical information or if you need additional assistance, please contact your healthcare provider directly or reach out to our Privacy Officer.",
                  },
                  {
                    question:
                      "Do you share my information with third-party advertisers?",
                    answer:
                      "No, we do not sell or share your personal information with third-party advertisers. We only share your information with healthcare providers involved in your care, and with service providers who help us operate our platform, all subject to strict confidentiality and security requirements.",
                  },
                  {
                    question:
                      "How do you protect my sensitive health information?",
                    answer:
                      "We implement comprehensive security measures that comply with HIPAA regulations, including encryption, access controls, regular security assessments, and staff training. We also maintain detailed audit logs and have incident response procedures in place to address any potential security issues promptly.",
                  },
                ].map((faq, index) => (
                  <Accordion
                    key={index}
                    elevation={0}
                    sx={{
                      mb: 1.5,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      borderRadius: "8px !important",
                      overflow: "hidden",
                      "&:before": {
                        display: "none",
                      },
                      "&.Mui-expanded": {
                        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          sx={{ color: theme.palette.primary.main }}
                        />
                      }
                      sx={{
                        "& .MuiAccordionSummary-content": {
                          margin: "12px 0",
                        },
                      }}
                    >
                      <Typography fontWeight={600}>{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0, pb: 3 }}>
                      <Typography
                        color="text.secondary"
                        sx={{ lineHeight: 1.7 }}
                      >
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Box>

            {/* Compliance section */}
            <Card
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.07)} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                mb: 4,
              }}
            >
              <Typography variant="h5" fontWeight="bold" mb={3}>
                Our Compliance Commitment
              </Typography>

              <Grid container spacing={3}>
                {[
                  {
                    title: "HIPAA Compliance",
                    description:
                      "We follow all Health Insurance Portability and Accountability Act requirements",
                  },
                  {
                    title: "GDPR Standards",
                    description:
                      "We implement General Data Protection Regulation principles for all users",
                  },
                  {
                    title: "Regular Audits",
                    description:
                      "We conduct regular privacy and security audits to ensure compliance",
                  },
                  {
                    title: "Staff Training",
                    description:
                      "All staff members receive regular privacy and security training",
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
            </Card>

            {/* Review section */}
            <Box sx={{ textAlign: "center", mt: 8, mb: 4 }}>
              <Chip
                label="Questions or Concerns?"
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  px: 2,
                  mb: 2,
                }}
              />
              <Typography variant="h5" fontWeight="bold" mb={2}>
                We{"'"}re Here to Help
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 700, mx: "auto", mb: 3 }}
              >
                If you have any questions or concerns about this Privacy Policy
                or your personal information, please don{"'"}t hesitate to
                contact our Privacy Officer.
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
                Contact Privacy Team
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
