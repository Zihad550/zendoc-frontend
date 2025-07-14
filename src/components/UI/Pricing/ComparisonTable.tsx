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
  borderBottom: theme.palette.mode === 'dark' 
    ? `1px solid rgba(255, 255, 255, 0.08)` 
    : `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.01)' 
    : 'transparent',
  color: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.9)' 
    : 'inherit',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.03)' 
      : 'rgba(0, 0, 0, 0.02)',
  },
}));

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)' 
    : theme.palette.background.default,
  fontWeight: 700,
  fontSize: "1rem",
  borderBottom: theme.palette.mode === 'dark' 
    ? `2px solid rgba(33, 150, 243, 0.3)` 
    : `2px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  color: theme.palette.mode === 'dark' 
    ? '#e3f2fd' 
    : 'inherit',
  backdropFilter: theme.palette.mode === 'dark' 
    ? 'blur(10px)' 
    : 'none',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark' 
      ? 'linear-gradient(135deg, rgba(120, 119, 198, 0.05) 0%, transparent 50%, rgba(33, 150, 243, 0.05) 100%)' 
      : 'none',
    pointerEvents: 'none',
  },
}));

const FeatureTableCell = styled(TableCell)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%)' 
    : theme.palette.background.default,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  borderBottom: theme.palette.mode === 'dark' 
    ? `1px solid rgba(255, 255, 255, 0.08)` 
    : `1px solid ${theme.palette.divider}`,
  fontWeight: 500,
  color: theme.palette.mode === 'dark' 
    ? '#e3f2fd' 
    : 'inherit',
  borderRight: theme.palette.mode === 'dark' 
    ? '1px solid rgba(255, 255, 255, 0.05)' 
    : 'none',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark' 
      ? 'linear-gradient(90deg, rgba(120, 119, 198, 0.03) 0%, transparent 100%)' 
      : 'none',
    pointerEvents: 'none',
  },
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
        <CheckIcon 
          sx={{ 
            color: theme.palette.mode === 'dark' ? '#81c784' : "success.main",
            filter: theme.palette.mode === 'dark' 
              ? 'drop-shadow(0 0 4px rgba(129, 199, 132, 0.4))' 
              : 'none',
            fontSize: '1.2rem'
          }} 
        />
      ) : (
        <CloseIcon 
          sx={{ 
            color: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.3)' 
              : "text.disabled",
            fontSize: '1.2rem'
          }} 
        />
      );
    }
    return (
      <Typography 
        variant="body2" 
        sx={{
          color: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.9)' 
            : 'inherit',
          fontWeight: 500
        }}
      >
        {value}
      </Typography>
    );
  };

  // Mobile view with accordions
  if (isMobile) {
    return (
      <Box>
        {Object.entries(categories).map(([category, categoryFeatures]) => (
          <Accordion
            key={category}
            elevation={0}
            sx={{ 
              mb: 2, 
              overflow: "hidden",
              bgcolor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.02)' 
                : 'background.paper',
              border: theme.palette.mode === 'dark' 
                ? '1px solid rgba(255, 255, 255, 0.08)' 
                : `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              '&::before': {
                display: 'none'
              },
              '&.Mui-expanded': {
                bgcolor: theme.palette.mode === 'dark' 
                  ? 'rgba(33, 150, 243, 0.05)' 
                  : 'background.paper',
                border: theme.palette.mode === 'dark' 
                  ? '1px solid rgba(33, 150, 243, 0.2)' 
                  : `1px solid ${theme.palette.divider}`,
              }
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon 
                  sx={{
                    color: theme.palette.mode === 'dark' 
                      ? '#e3f2fd' 
                      : 'inherit'
                  }}
                />
              }
              sx={{
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)' 
                  : theme.palette.background.default,
                borderBottom: theme.palette.mode === 'dark' 
                  ? `1px solid rgba(255, 255, 255, 0.08)` 
                  : `1px solid ${theme.palette.divider}`,
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.06)' 
                    : 'rgba(0, 0, 0, 0.02)',
                }
              }}
            >
              <Typography 
                variant="h6"
                sx={{
                  color: theme.palette.mode === 'dark' 
                    ? '#e3f2fd' 
                    : 'inherit',
                  fontWeight: 600
                }}
              >
                {category}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              {categoryFeatures.map((feature) => (
                <Box
                  key={feature.id}
                  sx={{
                    borderBottom: theme.palette.mode === 'dark' 
                      ? `1px solid rgba(255, 255, 255, 0.05)` 
                      : `1px solid ${theme.palette.divider}`,
                    p: 2,
                    bgcolor: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.01)' 
                      : 'transparent',
                  }}
                >
                  <Typography 
                    variant="subtitle1" 
                    gutterBottom
                    sx={{
                      color: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.9)' 
                        : 'inherit',
                      fontWeight: 500
                    }}
                  >
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
                          borderRadius: 2,
                          border: plan.recommended
                            ? theme.palette.mode === 'dark'
                              ? `2px solid rgba(33, 150, 243, 0.6)`
                              : `2px solid ${theme.palette.primary.main}`
                            : theme.palette.mode === 'dark'
                              ? `1px solid rgba(255, 255, 255, 0.1)`
                              : `1px solid ${theme.palette.divider}`,
                          position: "relative",
                          background: plan.recommended
                            ? theme.palette.mode === 'dark'
                              ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%)'
                              : "primary.light"
                            : theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.03)'
                              : "background.paper",
                          backdropFilter: theme.palette.mode === 'dark' 
                            ? 'blur(10px)' 
                            : 'none',
                          boxShadow: theme.palette.mode === 'dark' && plan.recommended
                            ? '0 4px 20px rgba(33, 150, 243, 0.2)'
                            : 'none',
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
                              bgcolor: theme.palette.mode === 'dark' 
                                ? 'rgba(33, 150, 243, 0.9)' 
                                : 'primary.main',
                              color: '#ffffff',
                              fontWeight: 'bold',
                              boxShadow: theme.palette.mode === 'dark' 
                                ? '0 2px 8px rgba(33, 150, 243, 0.4)' 
                                : 'none',
                            }}
                          />
                        )}
                        <Typography 
                          variant="subtitle2" 
                          align="center"
                          sx={{
                            color: theme.palette.mode === 'dark' 
                              ? 'rgba(255, 255, 255, 0.9)' 
                              : 'inherit',
                            fontWeight: 600
                          }}
                        >
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
      sx={{ 
        borderRadius: 3, 
        overflow: "hidden",
        bgcolor: theme.palette.mode === 'dark' 
          ? 'rgba(255, 255, 255, 0.02)' 
          : 'background.paper',
        border: theme.palette.mode === 'dark' 
          ? '1px solid rgba(255, 255, 255, 0.08)' 
          : 'none',
        backdropFilter: theme.palette.mode === 'dark' 
          ? 'blur(10px)' 
          : 'none',
        boxShadow: theme.palette.mode === 'dark' 
          ? '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)' 
          : undefined,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <HeaderTableCell></HeaderTableCell>
            {plans.map((plan) => (
              <HeaderTableCell key={plan.id} align="center">
                <Box position="relative" py={1} sx={{ zIndex: 1 }}>
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
                        bgcolor: theme.palette.mode === 'dark' 
                          ? 'rgba(33, 150, 243, 0.9)' 
                          : 'primary.main',
                        color: '#ffffff',
                        fontWeight: 'bold',
                        boxShadow: theme.palette.mode === 'dark' 
                          ? '0 2px 8px rgba(33, 150, 243, 0.4)' 
                          : 'none',
                      }}
                    />
                  )}
                  <Typography 
                    variant="h6" 
                    component="div" 
                    fontWeight="bold"
                    sx={{
                      color: theme.palette.mode === 'dark' 
                        ? '#e3f2fd' 
                        : 'inherit',
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    {plan.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    fontWeight="bold"
                    sx={{
                      color: theme.palette.mode === 'dark' 
                        ? '#64b5f6' 
                        : 'primary.main',
                      position: 'relative',
                      zIndex: 1
                    }}
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
                      background: theme.palette.mode === 'dark' 
                        ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.15) 0%, rgba(33, 150, 243, 0.08) 100%)' 
                        : theme.palette.primary.light,
                      fontWeight: "bold",
                      color: theme.palette.mode === 'dark' 
                        ? '#e3f2fd' 
                        : theme.palette.primary.dark,
                      border: theme.palette.mode === 'dark' 
                        ? '1px solid rgba(33, 150, 243, 0.2)' 
                        : 'none',
                      borderLeft: theme.palette.mode === 'dark' 
                        ? '4px solid rgba(33, 150, 243, 0.6)' 
                        : 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontSize: '0.875rem',
                      py: 1.5,
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: theme.palette.mode === 'dark' 
                          ? 'linear-gradient(90deg, rgba(33, 150, 243, 0.1) 0%, transparent 100%)' 
                          : 'none',
                        pointerEvents: 'none',
                      },
                    }}
                  >
                    <Typography 
                      variant="subtitle2" 
                      component="span"
                      sx={{
                        position: 'relative',
                        zIndex: 1,
                        fontWeight: 700
                      }}
                    >
                      {category}
                    </Typography>
                  </TableCell>
                </TableRow>
                {categoryFeatures.map((feature) => (
                  <TableRow 
                    key={feature.id}
                    sx={{
                      '&:hover': {
                        bgcolor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.02)' 
                          : 'rgba(0, 0, 0, 0.01)',
                      },
                      '&:nth-of-type(even)': {
                        bgcolor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.005)' 
                          : 'rgba(0, 0, 0, 0.02)',
                      },
                    }}
                  >
                    <FeatureTableCell>
                      <Typography 
                        variant="body2" 
                        component="span"
                        sx={{
                          position: 'relative',
                          zIndex: 1,
                          fontWeight: 500
                        }}
                      >
                        {feature.name}
                      </Typography>
                    </FeatureTableCell>
                    {plans.map((plan) => (
                      <StyledTableCell
                        key={`${feature.id}-${plan.id}`}
                        align="center"
                        sx={{
                          backgroundColor: plan.recommended
                            ? theme.palette.mode === 'dark'
                              ? "rgba(33, 150, 243, 0.08)"
                              : "rgba(25, 118, 210, 0.04)"
                            : "transparent",
                          borderLeft: plan.recommended && theme.palette.mode === 'dark'
                            ? '2px solid rgba(33, 150, 243, 0.3)'
                            : 'none',
                          position: 'relative',
                          '&::before': plan.recommended && theme.palette.mode === 'dark' ? {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.05) 0%, transparent 100%)',
                            pointerEvents: 'none',
                          } : {},
                        }}
                      >
                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                          {renderValue(feature[plan.id as keyof typeof feature])}
                        </Box>
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
