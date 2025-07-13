"use client";

import PrivacyPolicyHero from "@/components/UI/PrivacyPolicy/PrivacyPolicyHero";
import PrivacyPolicyContent from "@/components/UI/PrivacyPolicy/PrivacyPolicyContent";
import { Box, Container, Divider, Typography, useTheme } from "@mui/material";

export default function PrivacyPolicyPage() {
  const theme = useTheme();
  
  return (
    <Box>
      <PrivacyPolicyHero />
      <PrivacyPolicyContent />
      
      {/* Footer notice */}
      <Box sx={{ bgcolor: 'background.paper', py: 4, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="lg">
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} ZenDoc Healthcare. All rights reserved. This Privacy Policy was last updated on June 15, 2025.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
