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
  const getColorScheme = (theme: any) => {
    const isDark = theme.palette.mode === "dark";

    if (color === "primary") {
      return {
        borderColor: isDark ? "rgba(33, 150, 243, 0.8)" : "primary.main",
        headingBg: isDark
          ? "linear-gradient(135deg, rgba(33, 150, 243, 0.9) 0%, rgba(25, 118, 210, 0.9) 100%)"
          : "primary.main",
        headingColor: isDark ? "#ffffff" : "primary.contrastText",
        buttonColor: "primary",
        iconColor: isDark ? "#64b5f6" : "primary.main",
        cardBg: isDark ? "rgba(255, 255, 255, 0.03)" : "background.paper",
        cardBorder: isDark ? "1px solid rgba(33, 150, 243, 0.3)" : "none",
      };
    } else if (color === "secondary") {
      return {
        borderColor: isDark ? "rgba(156, 39, 176, 0.8)" : "secondary.main",
        headingBg: isDark
          ? "linear-gradient(135deg, rgba(156, 39, 176, 0.9) 0%, rgba(123, 31, 162, 0.9) 100%)"
          : "secondary.main",
        headingColor: isDark ? "#ffffff" : "secondary.contrastText",
        buttonColor: "secondary",
        iconColor: isDark ? "#ce93d8" : "secondary.main",
        cardBg: isDark ? "rgba(255, 255, 255, 0.03)" : "background.paper",
        cardBorder: isDark ? "1px solid rgba(156, 39, 176, 0.3)" : "none",
      };
    } else {
      return {
        borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "grey.300",
        headingBg: isDark
          ? "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)"
          : "grey.100",
        headingColor: isDark ? "#e3f2fd" : "text.primary",
        buttonColor: "primary",
        iconColor: isDark ? "#81c784" : "success.main",
        cardBg: isDark ? "rgba(255, 255, 255, 0.02)" : "background.paper",
        cardBorder: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
      };
    }
  };

  return (
    <Paper
      elevation={highlight ? 5 : 2}
      sx={{
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        bgcolor: (theme) => getColorScheme(theme).cardBg,
        border: (theme) =>
          highlight
            ? `2px solid ${getColorScheme(theme).borderColor}`
            : getColorScheme(theme).cardBorder,
        transform: highlight ? "scale(1.03)" : "scale(1)",
        backdropFilter: (theme) =>
          theme.palette.mode === "dark" ? "blur(10px)" : "none",
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? highlight
              ? "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)"
              : "0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)"
            : undefined,
        "&:hover": {
          transform: highlight ? "scale(1.05)" : "scale(1.02)",
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? highlight
                ? "0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.15)"
                : "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)"
              : highlight
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
            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)"
                : "success.main",
            color: "white",
            py: 0.5,
            width: 150,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "0.8rem",
            zIndex: 1,
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 2px 8px rgba(76, 175, 80, 0.4)"
                : "none",
          }}
        >
          Most Popular
        </Box>
      )}

      <Box
        sx={{
          background: (theme) => getColorScheme(theme).headingBg,
          color: (theme) => getColorScheme(theme).headingColor,
          p: 3,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: (theme) =>
              theme.palette.mode === "dark" && color !== "default"
                ? "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)"
                : "none",
            pointerEvents: "none",
          },
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          align="center"
          sx={{
            position: "relative",
            zIndex: 1,
            textShadow: (theme) =>
              theme.palette.mode === "dark" && color !== "default"
                ? "0 1px 2px rgba(0,0,0,0.3)"
                : "none",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 1,
            opacity: 0.9,
            position: "relative",
            zIndex: 1,
            textShadow: (theme) =>
              theme.palette.mode === "dark" && color !== "default"
                ? "0 1px 2px rgba(0,0,0,0.3)"
                : "none",
          }}
        >
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
              p: 2,
              borderRadius: 2,
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.02)"
                  : "transparent",
              border: (theme) =>
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.05)"
                  : "none",
            }}
          >
            <Typography
              variant="h3"
              component="span"
              fontWeight="bold"
              sx={{
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)"
                    : "inherit",
                backgroundClip: (theme) =>
                  theme.palette.mode === "dark" ? "text" : "inherit",
                WebkitBackgroundClip: (theme) =>
                  theme.palette.mode === "dark" ? "text" : "inherit",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "transparent" : "inherit",
              }}
            >
              ${price}
            </Typography>
            <Typography
              variant="body1"
              component="span"
              color="text.secondary"
              ml={1}
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.7)"
                    : "text.secondary",
              }}
            >
              {period}
            </Typography>
          </Box>

          {savePercent > 0 && isAnnual && (
            <Chip
              label={`Save ${savePercent}%`}
              size="small"
              color="success"
              sx={{
                mt: 1,
                bgcolor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(76, 175, 80, 0.2)"
                    : "success.light",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#81c784" : "success.dark",
                border: (theme) =>
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(76, 175, 80, 0.4)"
                    : "none",
                fontWeight: "bold",
              }}
            />
          )}
        </Box>

        <List sx={{ mb: 3, flexGrow: 1 }}>
          {features.map((feature, index) => (
            <ListItem
              key={index}
              disableGutters
              sx={{
                py: 0.5,
                px: 1,
                borderRadius: 1,
                transition: "background-color 0.2s ease",
                "&:hover": {
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.03)"
                      : "rgba(0, 0, 0, 0.02)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircleIcon
                  fontSize="small"
                  sx={{
                    color: (theme) => getColorScheme(theme).iconColor,
                    filter: (theme) =>
                      theme.palette.mode === "dark"
                        ? "drop-shadow(0 0 2px rgba(129, 199, 132, 0.3))"
                        : "none",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={feature}
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.primary",
                  sx: {
                    color: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.9)"
                        : "text.primary",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>

        <Button
          component={Link}
          href="/contact-us"
          variant={highlight ? "contained" : "outlined"}
          // color={colorScheme.buttonColor as any}
          fullWidth
          size="large"
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontWeight: "bold",
            mt: "auto",
            transition: "all 0.3s ease",
            border: (theme) =>
              theme.palette.mode === "dark" && !highlight
                ? `1px solid ${getColorScheme(theme).iconColor}`
                : undefined,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" && highlight
                ? `${getColorScheme(theme).iconColor}20`
                : undefined,
            backdropFilter: (theme) =>
              theme.palette.mode === "dark" ? "blur(10px)" : "none",
            boxShadow: (theme) =>
              theme.palette.mode === "dark" && highlight
                ? `0 4px 20px ${getColorScheme(theme).iconColor}40`
                : undefined,
            "&:hover": {
              bgcolor: (theme) =>
                theme.palette.mode === "dark" && highlight
                  ? `${getColorScheme(theme).iconColor}30`
                  : undefined,
              borderColor: (theme) =>
                theme.palette.mode === "dark" && !highlight
                  ? getColorScheme(theme).iconColor
                  : undefined,
              boxShadow: (theme) =>
                theme.palette.mode === "dark" && highlight
                  ? `0 6px 25px ${getColorScheme(theme).iconColor}60`
                  : undefined,
              transform: "translateY(-2px)",
            },
          }}
        >
          {cta}
        </Button>
      </Box>
    </Paper>
  );
}
