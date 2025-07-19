import { IHealthPlan } from '@/app/(public)/health-plans/health-plans.type';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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
  useTheme,
} from '@mui/material';
import Link from 'next/link';

interface PlanCardProps {
  plan: IHealthPlan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  const theme = useTheme();

  // Determine colors based on variant
  const getColorScheme = () => {
    if (plan.color === 'primary') {
      return {
        borderColor: 'primary.main',
        headingBg: 'primary.main',
        headingColor: 'primary.contrastText',
        buttonColor: 'primary',
        iconColor: 'primary.main',
      };
    } else if (plan.color === 'secondary') {
      return {
        borderColor: 'secondary.main',
        headingBg: 'secondary.main',
        headingColor: 'secondary.contrastText',
        buttonColor: 'secondary',
        iconColor: 'secondary.main',
      };
    } else {
      return {
        borderColor: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.300',
        headingBg: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
        headingColor: 'text.primary',
        buttonColor: 'primary',
        iconColor: 'success.main',
      };
    }
  };

  const colorScheme = getColorScheme();

  return (
    <Paper
      elevation={plan.popular ? 5 : 2}
      sx={{
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        border: plan.popular ? `2px solid` : 'none',
        borderColor: plan.popular ? colorScheme.borderColor : 'transparent',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.03)'
            : 'background.paper',
        transform: plan.popular ? 'scale(1.03)' : 'scale(1)',
        '&:hover': {
          transform: plan.popular ? 'scale(1.05)' : 'scale(1.02)',
          boxShadow: (theme) =>
            plan.popular
              ? theme.palette.mode === 'dark'
                ? '0 10px 30px rgba(0,0,0,0.4)'
                : '0 10px 30px rgba(0,0,0,0.12)'
              : theme.palette.mode === 'dark'
              ? '0 8px 28px rgba(0,0,0,0.3)'
              : '0 8px 28px rgba(0,0,0,0.09)',
        },
        position: 'relative',
        overflow: 'hidden',
        flex: 1,
      }}
    >
      {plan.popular && (
        <Box
          sx={{
            position: 'absolute',
            top: 15,
            right: -35,
            transform: 'rotate(45deg)',
            bgcolor: 'success.main',
            color: 'white',
            py: 0.5,
            width: 150,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            zIndex: 1,
          }}
        >
          Most Popular
        </Box>
      )}

      <Box
        sx={{
          bgcolor: colorScheme.headingBg,
          borderBottom: (theme) =>
            theme.palette.mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : 'none',
          color: colorScheme.headingColor,
          p: 3,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      >
        <Typography variant="h5" fontWeight="bold" align="center">
          {plan.name}
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 1, opacity: 0.9 }}>
          {plan.description}
        </Typography>
      </Box>

      <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h3" component="span" fontWeight="bold">
              ${plan.price}
            </Typography>
            <Typography
              variant="body1"
              component="span"
              color="text.secondary"
              ml={1}
            >
              {plan.period}
            </Typography>
          </Box>

          {plan.coverage && (
            <Chip
              label={plan.coverage}
              size="small"
              color="success"
              sx={{ mt: 1 }}
            />
          )}
        </Box>

        <List sx={{ mb: 3, flexGrow: 1 }}>
          {plan.benefits.map((benefit, index) => (
            <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircleIcon
                  fontSize="small"
                  sx={{ color: colorScheme.iconColor }}
                />
              </ListItemIcon>
              <ListItemText
                primary={benefit}
                primaryTypographyProps={{
                  variant: 'body2',
                  color: 'text.primary',
                }}
              />
            </ListItem>
          ))}
        </List>

        <Button
          variant={plan.popular ? 'contained' : 'outlined'}
          color={colorScheme.buttonColor as 'primary' | 'secondary'}
          fullWidth
          size="large"
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontWeight: 'bold',
            mt: 'auto',
          }}
          component={Link}
          href="contact-us"
        >
          {/* Choose Plan */}
          Contact us
        </Button>
      </Box>
    </Paper>
  );
}
