"use client";

import TermsConditionsHero from "@/components/UI/TermsConditions/TermsConditionsHero";
import TermsConditionsContent from "@/components/UI/TermsConditions/TermsConditionsContent";
import { Box, Container, Divider, Typography, useTheme } from "@mui/material";

export default function TermsConditionsPage() {
  const theme = useTheme();
  
  return (
    <Box>
      <TermsConditionsHero />
      <TermsConditionsContent />
      
      {/* Footer notice */}
      <Box sx={{ bgcolor: 'background.paper', py: 4, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="lg">
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} ZenDoc Healthcare. All rights reserved. These Terms &amp; Conditions were last updated on June 15, 2025.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
