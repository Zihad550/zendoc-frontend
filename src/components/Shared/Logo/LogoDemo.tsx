'use client';

import { Box, FormControlLabel, Grid, Paper, Switch, Typography } from '@mui/material';
import React from 'react';
import { ZenDocFavicon } from './ZenDocFavicon';
import { ZenDocIcon } from './ZenDocIcon';
import { ZenDocLogo } from './ZenDocLogo';

/**
 * Logo Demo Component
 * 
 * Visual demonstration of all logo variants, sizes, and themes.
 * Useful for testing and showcasing the logo system.
 */
export const LogoDemo: React.FC = () => {
  const [isDark, setIsDark] = React.useState(false);
  const theme = isDark ? 'dark' : 'light';
  
  return (
    <Box sx={{ p: 4, bgcolor: isDark ? '#121212' : '#ffffff', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom color={isDark ? 'white' : 'black'}>
        ZenDoc Logo System Demo
      </Typography>
      
      <FormControlLabel
        control={
          <Switch
            checked={isDark}
            onChange={(e) => setIsDark(e.target.checked)}
          />
        }
        label="Dark Theme"
        sx={{ mb: 4, color: isDark ? 'white' : 'black' }}
      />
      
      <Grid container spacing={4}>
        {/* Full Logo Variants */}
        <Grid size={12}>
          <Paper sx={{ p: 3, bgcolor: isDark ? '#1e1e1e' : '#ffffff' }}>
            <Typography variant="h6" gutterBottom color={isDark ? 'white' : 'black'}>
              Full Logo - Different Sizes
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
              <ZenDocLogo size="small" theme={theme} />
              <ZenDocLogo size="medium" theme={theme} />
              <ZenDocLogo size="large" theme={theme} />
              <ZenDocLogo size={80} theme={theme} />
            </Box>
          </Paper>
        </Grid>
        
        {/* Compact Logo */}
        <Grid size={12}>
          <Paper sx={{ p: 3, bgcolor: isDark ? '#1e1e1e' : '#ffffff' }}>
            <Typography variant="h6" gutterBottom color={isDark ? 'white' : 'black'}>
              Compact Logo - Different Sizes
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
              <ZenDocLogo variant="compact" size="small" theme={theme} />
              <ZenDocLogo variant="compact" size="medium" theme={theme} />
              <ZenDocLogo variant="compact" size="large" theme={theme} />
              <ZenDocLogo variant="compact" size={60} theme={theme} />
            </Box>
          </Paper>
        </Grid>
        
        {/* Icon Only */}
        <Grid size={12}>
          <Paper sx={{ p: 3, bgcolor: isDark ? '#1e1e1e' : '#ffffff' }}>
            <Typography variant="h6" gutterBottom color={isDark ? 'white' : 'black'}>
              Icon Only - Different Sizes
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
              <ZenDocIcon size={16} theme={theme} />
              <ZenDocIcon size={24} theme={theme} />
              <ZenDocIcon size={32} theme={theme} />
              <ZenDocIcon size={48} theme={theme} />
              <ZenDocIcon size={64} theme={theme} />
            </Box>
          </Paper>
        </Grid>
        
        {/* Favicon */}
        <Grid size={12}>
          <Paper sx={{ p: 3, bgcolor: isDark ? '#1e1e1e' : '#ffffff' }}>
            <Typography variant="h6" gutterBottom color={isDark ? 'white' : 'black'}>
              Favicon - Different Sizes
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
              <ZenDocFavicon size={16} theme={theme} />
              <ZenDocFavicon size={32} theme={theme} />
              <ZenDocFavicon size={48} theme={theme} />
            </Box>
          </Paper>
        </Grid>
        
        {/* Custom Colors */}
        <Grid size={12}>
          <Paper sx={{ p: 3, bgcolor: isDark ? '#1e1e1e' : '#ffffff' }}>
            <Typography variant="h6" gutterBottom color={isDark ? 'white' : 'black'}>
              Custom Colors
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
              <ZenDocLogo size="medium" color="#FF5722" />
              <ZenDocLogo size="medium" color="#4CAF50" />
              <ZenDocLogo size="medium" color="#9C27B0" />
              <ZenDocIcon size={40} color="#FF9800" />
              <ZenDocIcon size={40} color="#E91E63" />
            </Box>
          </Paper>
        </Grid>
        
        {/* Interactive Examples */}
        <Grid size={12}>
          <Paper sx={{ p: 3, bgcolor: isDark ? '#1e1e1e' : '#ffffff' }}>
            <Typography variant="h6" gutterBottom color={isDark ? 'white' : 'black'}>
              Interactive (Clickable)
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
              <ZenDocLogo 
                size="medium" 
                theme={theme} 
                onClick={() => alert('Full logo clicked!')}
              />
              <ZenDocIcon 
                size={40} 
                theme={theme} 
                onClick={() => alert('Icon clicked!')}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LogoDemo;