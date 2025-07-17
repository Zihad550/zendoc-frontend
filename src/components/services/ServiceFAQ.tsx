"use client";
import { CONTACT } from "@/contants/contact";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

// FAQ data
const faqs = [
  {
    id: 1,
    question: "How do I schedule an appointment?",
    answer:
      "You can schedule an appointment through our online booking system on our website or mobile app. Simply select the type of service you need, choose a doctor, and pick an available time slot that works for you. You can also call our customer service number for assistance with booking.",
  },
  {
    id: 2,
    question: "What insurance plans do you accept?",
    answer:
      "We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, and Medicare. For a complete list of accepted insurance providers, please visit our Insurance page or contact our billing department.",
  },
  {
    id: 3,
    question: "How do virtual consultations work?",
    answer:
      "Virtual consultations are conducted through our secure video platform. Once you schedule a virtual appointment, you'll receive a link via email. At the time of your appointment, click the link to join the video call with your doctor. Make sure you have a stable internet connection and a device with a camera and microphone.",
  },
  {
    id: 4,
    question: "Can I get prescriptions through your service?",
    answer:
      "Yes, our doctors can prescribe medications when medically necessary. Prescriptions are sent electronically to your preferred pharmacy, where you can pick them up at your convenience. Controlled substances may have additional requirements in accordance with state and federal laws.",
  },
  {
    id: 5,
    question: "What should I bring to my first appointment?",
    answer:
      "For your first appointment, please bring a valid ID, your insurance card, a list of current medications, your medical history, and any relevant medical records or test results. Arriving 15 minutes early allows time to complete necessary paperwork.",
  },
  {
    id: 6,
    question: "How quickly can I see a specialist?",
    answer:
      "Depending on the specialty and urgency of your condition, appointments with specialists can typically be scheduled within 1-3 weeks. Urgent cases may be accommodated sooner. Your primary care physician can help expedite referrals when medically necessary.",
  },
  {
    id: 7,
    question: "Do you offer same-day appointments?",
    answer:
      "Yes, we offer same-day appointments for urgent care needs. Availability varies by day, so we recommend checking our online booking system or calling our office as early as possible to secure a same-day appointment.",
  },
  {
    id: 8,
    question: "What is your cancellation policy?",
    answer:
      "We request at least 24 hours' notice for appointment cancellations. Late cancellations (less than 24 hours) or missed appointments may incur a fee. We understand emergencies happen, so please contact us as soon as possible if you need to reschedule.",
  },
];

const ServiceFAQ = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box sx={{ py: 10, backgroundColor: theme.palette.background.paper }}>
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
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              my: 2,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Common Questions About Our Services
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
            Find answers to common questions about our healthcare services and
            processes
          </Typography>
        </Box>

        {/* FAQ Accordions */}
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ mb: 4 }}>
              {faqs.map((faq) => (
                <Accordion
                  key={faq.id}
                  expanded={expanded === `panel${faq.id}`}
                  onChange={handleChange(`panel${faq.id}`)}
                  elevation={0}
                  sx={{
                    mb: 2,
                    border: "1px solid",
                    borderColor:
                      expanded === `panel${faq.id}`
                        ? "primary.main"
                        : theme.palette.grey[200],
                    borderRadius: "8px !important",
                    "&:before": {
                      display: "none",
                    },
                    "&.Mui-expanded": {
                      boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                    },
                    overflow: "hidden",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      backgroundColor:
                        expanded === `panel${faq.id}`
                          ? "rgba(25, 118, 210, 0.05)"
                          : "transparent",
                      "&.Mui-expanded": {
                        minHeight: 56,
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{
                        color:
                          expanded === `panel${faq.id}`
                            ? "primary.main"
                            : "text.primary",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <HelpOutlineIcon fontSize="small" />
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0, pb: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                backgroundColor: "primary.lighter",
                borderRadius: 3,
                p: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h5"
                fontWeight={700}
                mb={2}
                color="primary.dark"
              >
                Have More Questions?
              </Typography>
              <Typography variant="body1" mb={4} color="text.secondary">
                Our customer support team is ready to assist you with any
                additional questions you may have about our services.
              </Typography>
              <Link href="/contact-us" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  Contact Support
                </Button>
              </Link>

              <Typography
                variant="body2"
                mt={3}
                color="text.secondary"
                textAlign="center"
              >
                Or call us at:{" "}
                <Box component="span" fontWeight={700} color="primary.main">
                  {CONTACT.phone}
                </Box>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ServiceFAQ;
