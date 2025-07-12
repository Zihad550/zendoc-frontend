import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box sx={{ mb: 4 }}>
      {faqs.map((faq, index) => (
        <Accordion
          key={`faq-${index}`}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          sx={{
            mb: 2,
            borderRadius: "8px !important",
            overflow: "hidden",
            boxShadow:
              expanded === `panel${index}`
                ? "0 8px 24px rgba(0,0,0,0.12)"
                : "0 2px 8px rgba(0,0,0,0.05)",
            border: "1px solid",
            borderColor:
              expanded === `panel${index}` ? "primary.light" : "divider",
            "&:before": {
              display: "none",
            },
            transition: "all 0.3s ease",
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                color={expanded === `panel${index}` ? "primary" : "inherit"}
              />
            }
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
            sx={{
              backgroundColor:
                expanded === `panel${index}`
                  ? "rgba(21, 134, 253, 0.05)"
                  : "transparent",
              "&.Mui-expanded": {
                minHeight: "48px",
              },
              "& .MuiAccordionSummary-content.Mui-expanded": {
                margin: "12px 0",
              },
              padding: "0 16px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <QuestionAnswerOutlinedIcon
                sx={{
                  mr: 2,
                  color:
                    expanded === `panel${index}`
                      ? "primary.main"
                      : "text.secondary",
                  fontSize: "1.2rem",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1rem",
                  fontWeight: expanded === `panel${index}` ? 600 : 500,
                  color:
                    expanded === `panel${index}`
                      ? "primary.main"
                      : "text.primary",
                }}
              >
                {faq.question}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: "0 16px 16px 54px",
              backgroundColor:
                expanded === `panel${index}`
                  ? "rgba(21, 134, 253, 0.03)"
                  : "transparent",
            }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.7 }}
            >
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
