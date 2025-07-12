import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VideocamIcon from '@mui/icons-material/Videocam';
import PaymentIcon from '@mui/icons-material/Payment';
import MedicationIcon from '@mui/icons-material/Medication';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

interface Category {
  id: string;
  label: string;
}

interface FaqCategoriesProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (event: React.SyntheticEvent, newValue: string) => void;
}

export default function FaqCategories({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: FaqCategoriesProps) {
  
  // Get appropriate icon for each category
  const getCategoryIcon = (categoryId: string) => {
    switch(categoryId) {
      case 'general':
        return <HelpOutlineIcon />;
      case 'appointments':
        return <CalendarTodayIcon />;
      case 'consultations':
        return <VideocamIcon />;
      case 'billing':
        return <PaymentIcon />;
      case 'prescriptions':
        return <MedicationIcon />;
      case 'technical':
        return <SettingsSuggestIcon />;
      default:
        return <HelpOutlineIcon />;
    }
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2 }}>
      <List component="nav" aria-label="FAQ categories" sx={{ p: 0 }}>
        {categories.map((category) => (
          <ListItem 
            key={category.id} 
            disablePadding
            divider
            sx={{
              borderLeft: '3px solid',
              borderLeftColor: selectedCategory === category.id 
                ? 'primary.main' 
                : 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <ListItemButton
              selected={selectedCategory === category.id}
              onClick={(event) => onCategoryChange(event, category.id)}
              sx={{
                py: 1.5,
                '&.Mui-selected': {
                  bgcolor: 'rgba(21, 134, 253, 0.08)',
                },
                '&:hover': {
                  bgcolor: 'rgba(21, 134, 253, 0.05)',
                },
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 40,
                color: selectedCategory === category.id ? 'primary.main' : 'text.secondary',
              }}>
                {getCategoryIcon(category.id)}
              </ListItemIcon>
              <ListItemText 
                primary={category.label} 
                primaryTypographyProps={{
                  fontWeight: selectedCategory === category.id ? 600 : 400,
                  color: selectedCategory === category.id ? 'primary.main' : 'text.primary',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
