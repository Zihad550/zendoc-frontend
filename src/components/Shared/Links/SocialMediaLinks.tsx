import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  alpha,
  IconButton,
  Stack,
  useTheme,
  type StackProps,
} from "@mui/material";

const SocialMediaLinks = ({ mt }: { mt?: StackProps["mt"] }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={1} mt={mt}>
      <IconButton
        component="a"
        href="https://facebook.com"
        target="_blank"
        aria-label="facebook"
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          color: "primary.main",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "white",
          },
          transition: "all 0.3s ease",
        }}
      >
        <FacebookIcon fontSize="small" />
      </IconButton>
      <IconButton
        component="a"
        href="https://twitter.com"
        target="_blank"
        aria-label="twitter"
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          color: "primary.main",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "white",
          },
          transition: "all 0.3s ease",
        }}
      >
        <TwitterIcon fontSize="small" />
      </IconButton>
      <IconButton
        component="a"
        href="https://instagram.com"
        target="_blank"
        aria-label="instagram"
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          color: "primary.main",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "white",
          },
          transition: "all 0.3s ease",
        }}
      >
        <InstagramIcon fontSize="small" />
      </IconButton>
      <IconButton
        component="a"
        href="https://linkedin.com"
        target="_blank"
        aria-label="linkedin"
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          color: "primary.main",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "white",
          },
          transition: "all 0.3s ease",
        }}
      >
        <LinkedInIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};

export default SocialMediaLinks;
