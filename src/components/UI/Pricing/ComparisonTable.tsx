import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 500,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  fontWeight: 700,
  fontSize: "1rem",
  borderBottom: `2px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const FeatureTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontWeight: 500,
}));

interface ComparisonTableProps {
  isAnnual: boolean;
}

export default function ComparisonTable({ isAnnual }: ComparisonTableProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const plans = [
    {
      id: "basic",
      name: "Basic Care",
      price: isAnnual ? "$99/year" : "$12.99/month",
    },
    {
      id: "family",
      name: "Family Care",
      price: isAnnual ? "$199/year" : "$24.99/month",
      recommended: true,
    },
    {
      id: "premium",
      name: "Premium Care",
      price: isAnnual ? "$299/year" : "$39.99/month",
    },
  ];

  const features = [
    {
      id: "text-consultations",
      name: "Text Consultations",
      basic: "Unlimited",
      family: "Unlimited",
      premium: "Unlimited",
      category: "Consultations",
    },
    {
      id: "video-consultations",
      name: "Video Consultations",
      basic: "2 / month",
      family: "5 / month",
      premium: "Unlimited",
      category: "Consultations",
    },
    {
      id: "response-time",
      name: "Doctor Response Time",
      basic: "Within 24 hours",
      family: "Within 12 hours",
      premium: "Within 4 hours",
      category: "Support",
    },
    {
      id: "chat-support",
      name: "24/7 Chat Support",
      basic: true,
      family: true,
      premium: true,
      category: "Support",
    },
    {
      id: "priority-support",
      name: "Priority Support",
      basic: false,
      family: true,
      premium: true,
      category: "Support",
    },
    {
      id: "digital-prescriptions",
      name: "Digital Prescriptions",
      basic: true,
      family: true,
      premium: true,
      category: "Services",
    },
    {
      id: "health-tracking",
      name: "Health Tracking",
      basic: "Basic",
      family: "Advanced",
      premium: "Premium",
      category: "Services",
    },
    {
      id: "family-records",
      name: "Family Health Records",
      basic: false,
      family: true,
      premium: true,
      category: "Services",
    },
    {
      id: "medication-reminders",
      name: "Medication Reminders",
      basic: false,
      family: true,
      premium: true,
      category: "Services",
    },
    {
      id: "specialist-referrals",
      name: "Specialist Referrals",
      basic: false,
      family: false,
      premium: true,
      category: "Services",
    },
    {
      id: "health-assessment",
      name: "Annual Health Assessment",
      basic: false,
      family: false,
      premium: true,
      category: "Services",
    },
  ];

  // Group features by category
  const categories = features.reduce(
    (acc, feature) => {
      const { category } = feature;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(feature);
      return acc;
    },
    {} as Record<string, typeof features>,
  );

  // Render a checkmark or cross for boolean values
  const renderValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <CheckIcon sx={{ color: "success.main" }} />
      ) : (
        <CloseIcon sx={{ color: "text.disabled" }} />
      );
    }
    return value;
  };

  // Mobile view with accordions
  if (isMobile) {
    return (
      <Box>
        {Object.entries(categories).map(([category, categoryFeatures]) => (
          <Accordion
            key={category}
            elevation={0}
            sx={{ mb: 2, overflow: "hidden" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: theme.palette.background.default,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="h6">{category}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              {categoryFeatures.map((feature) => (
                <Box
                  key={feature.id}
                  sx={{
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    p: 2,
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    {feature.name}
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}
                  >
                    {plans.map((plan) => (
                      <Box
                        key={plan.id}
                        sx={{
                          flex: "1 0 30%",
                          minWidth: "100px",
                          p: 1.5,
                          borderRadius: 1,
                          border: plan.recommended
                            ? `2px solid ${theme.palette.primary.main}`
                            : `1px solid ${theme.palette.divider}`,
                          position: "relative",
                          backgroundColor: plan.recommended
                            ? "primary.light"
                            : "background.paper",
                        }}
                      >
                        {plan.recommended && (
                          <Chip
                            label="Recommended"
                            color="primary"
                            size="small"
                            sx={{
                              position: "absolute",
                              top: -12,
                              left: "50%",
                              transform: "translateX(-50%)",
                              fontSize: "0.625rem",
                              height: 24,
                            }}
                          />
                        )}
                        <Typography variant="subtitle2" align="center">
                          {plan.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: 40,
                            mt: 1,
                          }}
                        >
                          {renderValue(
                            feature[plan.id as keyof typeof feature],
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  }

  // Desktop view with table
  return (
    <TableContainer
      component={Paper}
      elevation={2}
      sx={{ borderRadius: 2, overflow: "hidden" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <HeaderTableCell></HeaderTableCell>
            {plans.map((plan) => (
              <HeaderTableCell key={plan.id} align="center">
                <Box position="relative" py={1}>
                  {plan.recommended && (
                    <Chip
                      label="Recommended"
                      color="primary"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "0.625rem",
                        height: 24,
                      }}
                    />
                  )}
                  <Typography variant="h6" component="div" fontWeight="bold">
                    {plan.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    fontWeight="bold"
                  >
                    {plan.price}
                  </Typography>
                </Box>
              </HeaderTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {Object.entries(categories).map(
            ([category, categoryFeatures], categoryIndex) => (
              <React.Fragment key={categoryIndex}>
                <TableRow>
                  <TableCell
                    colSpan={4}
                    sx={{
                      backgroundColor: theme.palette.primary.light,
                      fontWeight: "bold",
                      color: theme.palette.primary.dark,
                    }}
                  >
                    {category}
                  </TableCell>
                </TableRow>
                {categoryFeatures.map((feature) => (
                  <TableRow key={feature.id}>
                    <FeatureTableCell>{feature.name}</FeatureTableCell>
                    {plans.map((plan) => (
                      <StyledTableCell
                        key={`${feature.id}-${plan.id}`}
                        align="center"
                        sx={{
                          backgroundColor: plan.recommended
                            ? "rgba(25, 118, 210, 0.04)"
                            : "transparent",
                        }}
                      >
                        {renderValue(feature[plan.id as keyof typeof feature])}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                ))}
              </React.Fragment>
            ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
