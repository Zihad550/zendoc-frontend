import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useTheme,
} from "@mui/material";

// FAQs data
const faqs = [
  {
    question: "How do I choose the right health plan for me?",
    answer:
      "Consider your current health needs, expected medical expenses, and budget. Our Standard Care plan is a good balance for most individuals, while families may benefit from our Family Plus plan. If you have specific questions, our healthcare advisors are available to help you choose the best plan for your situation.",
  },
  {
    question: "Can I change my plan after enrollment?",
    answer:
      "Yes, you can upgrade or change your plan during the annual open enrollment period. If you experience a qualifying life event (such as marriage, birth of a child, or loss of other coverage), you may also be eligible to change plans outside of the open enrollment period.",
  },
  {
    question:
      "What is the difference between in-network and out-of-network care?",
    answer:
      "In-network providers have contracted with our health plan to provide services at negotiated rates. When you use in-network providers, your costs will typically be lower. Out-of-network providers haven't contracted with us, which may result in higher out-of-pocket costs. All our plans offer access to a wide network of providers.",
  },
  {
    question: "Do the health plans cover pre-existing conditions?",
    answer:
      "Yes, all our health plans cover pre-existing conditions from the start of your coverage. There are no waiting periods or exclusions for pre-existing health conditions.",
  },
  {
    question: "How do I find out if my doctor is in-network?",
    answer:
      "You can search for in-network providers through our online provider directory. Simply enter your doctor's name or specialty to see if they're in our network. You can also call our customer service team for assistance.",
  },
  {
    question: "What prescription medications are covered?",
    answer:
      "Our plans cover a wide range of prescription medications. The specific coverage depends on the plan you choose. You can view our formulary (list of covered medications) on our website or contact customer service for more information about coverage for specific medications.",
  },
  {
    question: "Are dental and vision services included in the health plans?",
    answer:
      "Dental and vision coverage are included in our Premium plans. For Basic and Standard plans, these services can be added as optional coverage for an additional fee. The specific benefits and coverage levels vary by plan.",
  },
  {
    question: "How do I access telemedicine services?",
    answer:
      'All our plans include telemedicine services. You can access virtual care through our mobile app or website. Simply log in to your account, select "Virtual Visit," and choose an available healthcare provider. Virtual visits are available 24/7 for urgent care needs.',
  },
];

export default function PlansFAQ() {
  const theme = useTheme();

  return (
    <>
      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          elevation={0}
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              "&.Mui-expanded": {
                minHeight: "48px",
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
