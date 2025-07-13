import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";

interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  period: string;
  features: string[];
  cta: string;
  popular?: boolean;
  highlight?: boolean;
  color?: "primary" | "secondary" | "default";
  savePercent?: number;
  isAnnual: boolean;
}

export default function PricingCard({
  title,
  description,
  price,
  period,
  features,
  cta,
  popular = false,
  highlight = false,
  color = "default",
  savePercent = 0,
  isAnnual,
}: PricingCardProps) {
  // Determine colors based on variant
  const getColorScheme = () => {
    if (color === "primary") {
      return {
        borderColor: "primary.main",
        headingBg: "primary.main",
        headingColor: "primary.contrastText",
        buttonColor: "primary",
        iconColor: "primary.main",
      };
    } else if (color === "secondary") {
      return {
        borderColor: "secondary.main",
        headingBg: "secondary.main",
        headingColor: "secondary.contrastText",
        buttonColor: "secondary",
        iconColor: "secondary.main",
      };
    } else {
      return {
        borderColor: "grey.300",
        headingBg: "grey.100",
        headingColor: "text.primary",
        buttonColor: "primary",
        iconColor: "success.main",
      };
    }
  };

  const colorScheme = getColorScheme();

  return (
    <Paper
      elevation={highlight ? 5 : 2}
      sx={{
        borderRadius: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        border: highlight ? `2px solid ${colorScheme.borderColor}` : "none",
        transform: highlight ? "scale(1.03)" : "scale(1)",
        "&:hover": {
          transform: highlight ? "scale(1.05)" : "scale(1.02)",
          boxShadow: highlight
            ? "0 10px 30px rgba(0,0,0,0.12)"
            : "0 8px 28px rgba(0,0,0,0.09)",
        },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {popular && (
        <Box
          sx={{
            position: "absolute",
            top: 15,
            right: -35,
            transform: "rotate(45deg)",
            bgcolor: "success.main",
            color: "white",
            py: 0.5,
            width: 150,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "0.8rem",
            zIndex: 1,
          }}
        >
          Most Popular
        </Box>
      )}

      <Box
        sx={{
          bgcolor: colorScheme.headingBg,
          color: colorScheme.headingColor,
          p: 3,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      >
        <Typography variant="h5" fontWeight="bold" align="center">
          {title}
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 1, opacity: 0.9 }}>
          {description}
        </Typography>
      </Box>

      <Box sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3" component="span" fontWeight="bold">
              ${price}
            </Typography>
            <Typography
              variant="body1"
              component="span"
              color="text.secondary"
              ml={1}
            >
              {period}
            </Typography>
          </Box>

          {savePercent > 0 && isAnnual && (
            <Chip
              label={`Save ${savePercent}%`}
              size="small"
              color="success"
              sx={{ mt: 1 }}
            />
          )}
        </Box>

        <List sx={{ mb: 3, flexGrow: 1 }}>
          {features.map((feature, index) => (
            <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircleIcon
                  fontSize="small"
                  sx={{ color: colorScheme.iconColor }}
                />
              </ListItemIcon>
              <ListItemText
                primary={feature}
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.primary",
                }}
              />
            </ListItem>
          ))}
        </List>

        <Button
          component={Link}
          href="/contact-us"
          variant={highlight ? "contained" : "outlined"}
          color={colorScheme.buttonColor as any}
          fullWidth
          size="large"
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontWeight: "bold",
            mt: "auto",
          }}
        >
          {cta}
        </Button>
      </Box>
    </Paper>
  );
}
