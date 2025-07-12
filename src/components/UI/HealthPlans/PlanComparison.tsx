import { healthComparisonFeatures } from "@/app/(public)/health-plans/health-plans.data";
import {
  IHealthPlan,
  THealthPlanType,
} from "@/app/(public)/health-plans/health-plans.type";
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
  Stack,
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

// Styled components for the table
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

interface PlanComparisonProps {
  plans: IHealthPlan[];
}

export default function PlanComparison({ plans }: PlanComparisonProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const planTypes = plans.map((plan) => {
    const nameWords = plan.name.split(" ");
    return nameWords[0] as THealthPlanType;
  });

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
        {(
          Object.keys(
            healthComparisonFeatures,
          ) as (keyof typeof healthComparisonFeatures)[]
        ).map((feature) => (
          <Accordion
            key={feature}
            elevation={0}
            sx={{ mb: 1.5, overflow: "hidden" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: theme.palette.background.default,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="subtitle1" fontWeight="medium">
                {feature}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Stack
                direction="row"
                spacing={2}
                sx={{ p: 2, overflowX: "auto" }}
              >
                {planTypes.map((planType, index) => (
                  <Paper
                    key={planType}
                    elevation={1}
                    sx={{
                      p: 2,
                      minWidth: 120,
                      borderRadius: 1,
                      bgcolor:
                        index === 1
                          ? "rgba(25, 118, 210, 0.04)"
                          : "transparent",
                      border:
                        index === 1
                          ? `1px solid ${theme.palette.primary.main}`
                          : `1px solid ${theme.palette.divider}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    {index === 1 && (
                      <Chip
                        label="Recommended"
                        size="small"
                        color="primary"
                        sx={{
                          position: "absolute",
                          top: -12,
                          fontSize: "0.625rem",
                          height: 24,
                        }}
                      />
                    )}
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      sx={{ mb: 1 }}
                    >
                      {plans[index].name}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {feature in healthComparisonFeatures &&
                        renderValue(
                          healthComparisonFeatures[feature][planType],
                        )}
                    </Box>
                  </Paper>
                ))}
              </Stack>
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
            {planTypes.map((planType, index) => (
              <HeaderTableCell key={planType} align="center">
                <Box position="relative" py={1}>
                  {index === 1 && (
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
                    {plans[index].name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    fontWeight="bold"
                  >
                    ${plans[index].price}
                    {plans[index].period}
                  </Typography>
                </Box>
              </HeaderTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {Object.entries(healthComparisonFeatures).map(([feature, values]) => (
            <TableRow key={feature}>
              <FeatureTableCell>{feature}</FeatureTableCell>
              {planTypes.map((planType, index) => (
                <StyledTableCell
                  key={`${feature}-${planType}`}
                  align="center"
                  sx={{
                    backgroundColor:
                      index === 1 ? "rgba(25, 118, 210, 0.04)" : "transparent",
                  }}
                >
                  {planType in values && renderValue(values[planType])}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
