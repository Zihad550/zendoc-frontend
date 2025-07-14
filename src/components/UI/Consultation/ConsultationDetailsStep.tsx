import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  alpha,
} from "@mui/material";

interface ConsultationDetailsStepProps {
  consultationDetails: {
    symptoms: string;
    duration: string;
    previousTreatments: string;
    additionalNotes: string;
  };
  setConsultationDetails: (details: any) => void;
}

export default function ConsultationDetailsStep({
  consultationDetails,
  setConsultationDetails,
}: ConsultationDetailsStepProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setConsultationDetails({
      ...consultationDetails,
      [name]: value,
    });
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setConsultationDetails({
      ...consultationDetails,
      [name]: value,
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Consultation Details
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Please provide information about your symptoms and medical history
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12 }}>
          <TextField
            required
            fullWidth
            id="symptoms"
            name="symptoms"
            label="Describe your symptoms"
            multiline
            rows={4}
            value={consultationDetails.symptoms}
            onChange={handleChange}
            placeholder="Please describe your symptoms in detail"
            helperText="This information helps the doctor prepare for your consultation"
            sx={{
              // Enhanced TextField styling for dark theme
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: (theme) => theme.palette.mode === "dark" 
                  ? alpha(theme.palette.primary.main, 0.05) 
                  : "transparent",
                "& fieldset": {
                  borderColor: (theme) => theme.palette.mode === "dark" 
                    ? alpha(theme.palette.primary.main, 0.3) 
                    : "inherit",
                },
                "&:hover fieldset": {
                  borderColor: (theme) => theme.palette.mode === "dark" 
                    ? alpha(theme.palette.primary.main, 0.5) 
                    : "inherit",
                },
                "&.Mui-focused fieldset": {
                  borderColor: (theme) => theme.palette.mode === "dark" 
                    ? theme.palette.primary.main 
                    : "inherit",
                },
              },
              "& .MuiInputLabel-root": {
                color: (theme) => theme.palette.mode === "dark" ? "text.primary" : "inherit",
              },
              "& .MuiFormHelperText-root": {
                color: (theme) => theme.palette.mode === "dark" ? "text.secondary" : "inherit",
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl 
            fullWidth 
            required
            sx={{
              // Enhanced FormControl styling for dark theme
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: (theme) => theme.palette.mode === "dark" 
                  ? alpha(theme.palette.primary.main, 0.05) 
                  : "transparent",
                "& fieldset": {
                  borderColor: (theme) => theme.palette.mode === "dark" 
                    ? alpha(theme.palette.primary.main, 0.3) 
                    : "inherit",
                },
                "&:hover fieldset": {
                  borderColor: (theme) => theme.palette.mode === "dark" 
                    ? alpha(theme.palette.primary.main, 0.5) 
                    : "inherit",
                },
                "&.Mui-focused fieldset": {
                  borderColor: (theme) => theme.palette.mode === "dark" 
                    ? theme.palette.primary.main 
                    : "inherit",
                },
              },
              "& .MuiInputLabel-root": {
                color: (theme) => theme.palette.mode === "dark" ? "text.primary" : "inherit",
              },
              "& .MuiFormHelperText-root": {
                color: (theme) => theme.palette.mode === "dark" ? "text.secondary" : "inherit",
              },
            }}
          >
            <InputLabel id="duration-label">Duration of symptoms</InputLabel>
            <Select
              labelId="duration-label"
              id="duration"
              name="duration"
              value={consultationDetails.duration}
              label="Duration of symptoms"
              onChange={handleSelectChange}
            >
              <MenuItem value="less-than-week">Less than a week</MenuItem>
              <MenuItem value="one-two-weeks">1-2 weeks</MenuItem>
              <MenuItem value="two-four-weeks">2-4 weeks</MenuItem>
              <MenuItem value="one-three-months">1-3 months</MenuItem>
              <MenuItem value="three-six-months">3-6 months</MenuItem>
              <MenuItem value="more-than-six-months">
                More than 6 months
              </MenuItem>
            </Select>
            <FormHelperText>
              How long have you been experiencing these symptoms?
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            id="previousTreatments"
            name="previousTreatments"
            label="Previous treatments (if any)"
            value={consultationDetails.previousTreatments}
            onChange={handleChange}
            placeholder="List any treatments you've tried"
            sx={{
              // Enhanced TextField styling for dark theme
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: (theme) => theme.palette.mode === "dark" 
                  ? alpha(theme.palette.primary.main, 0.05) 
                  : "transparent",
                "& fieldset": {
                  borderColor: (theme) => theme.palette.mode === "dark" 
                    ? alpha(theme.palette.primary.main, 0.3) 
                    : "inherit",
                },
                "&:hover fieldset": {
                  borderColor: (theme) => theme.palette.mode === "dark" 
                    ? alpha(theme.palette.primary.main, 0.5) 
                    : "inherit",
                },
                "&.Mui-focused fieldset": {
                  borderColor: (theme) => theme.palette.mode === "dark" 
                    ? theme.palette.primary.main 
                    : "inherit",
                },
              },
              "& .MuiInputLabel-root": {
                color: (theme) => theme.palette.mode === "dark" ? "text.primary" : "inherit",
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            id="additionalNotes"
            name="additionalNotes"
            label="Additional notes"
            multiline
            rows={3}
            value={consultationDetails.additionalNotes}
            onChange={handleChange}
            placeholder="Any other information you'd like to share with the doctor"
            helperText="Optional: Include allergies, medications, or other relevant medical history"
            sx={{
              // Enhanced TextField styling for dark theme
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: (theme) => theme.palette.mode === "dark" 
                  ? alpha(theme.palette.primary.main, 0.05) 
                  : "transparent",
                "& fieldset": {
                  borderColor: (theme) => theme.palette.mode === "dark" 
                    ? alpha(theme.palette.primary.main, 0.3) 
                    : "inherit",
                },
                "&:hover fieldset": {
                  borderColor: (theme) => theme.palette.mode === "dark" 
                    ? alpha(theme.palette.primary.main, 0.5) 
                    : "inherit",
                },
                "&.Mui-focused fieldset": {
                  borderColor: (theme) => theme.palette.mode === "dark" 
                    ? theme.palette.primary.main 
                    : "inherit",
                },
              },
              "& .MuiInputLabel-root": {
                color: (theme) => theme.palette.mode === "dark" ? "text.primary" : "inherit",
              },
              "& .MuiFormHelperText-root": {
                color: (theme) => theme.palette.mode === "dark" ? "text.secondary" : "inherit",
              },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
