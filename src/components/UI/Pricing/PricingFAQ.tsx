import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useTheme,
} from "@mui/material";

const faqs = [
  {
    question: "What does the Family Care plan include?",
    answer:
      "The Family Care plan includes unlimited text consultations, 5 video consultations per month, 24/7 priority support, digital prescriptions, advanced health tracking, family health records, and medication reminders.",
  },
  {
    question: "Can I switch plans at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time through your account settings. Any changes will take effect at the start of your next billing cycle.",
  },
  {
    question: "Are specialist referrals included?",
    answer:
      "Specialist referrals are included in the Premium Care plan. In other plans, referrals can be added on as a service.",
  },
  {
    question: "How does the video consultation feature work?",
    answer:
      "You can schedule video consultations with our healthcare providers through the app. Each video session lasts up to 30 minutes.",
  },
  {
    question: "Do you offer student discounts?",
    answer:
      "Yes, we offer a 10% discount for students with valid proof of enrollment. Contact our support team to apply the discount to your account.",
  },
];

export default function PricingFAQ() {
  const theme = useTheme();

  return (
    <>
      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          elevation={0}
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" color="text.secondary">
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
