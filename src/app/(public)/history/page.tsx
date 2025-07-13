"use client";
import { Box } from "@mui/material";
import { HistoryHero, HistoryTimeline, HistoryFounders } from "@/components/history";

const HistoryPage = () => {
  return (
    <Box>
      <HistoryHero />
      <HistoryTimeline />
      <HistoryFounders />
    </Box>
  );
};

export default HistoryPage;

