import { GitHub, LinkedIn } from "@mui/icons-material";
import {
  alpha,
  IconButton,
  Stack,
  useTheme,
  type StackProps,
} from "@mui/material";

const SocialMediaLinks = ({ mt }: { mt?: StackProps["mt"] }) => {
  const theme = useTheme();
  const items = [
    {
      link: "https://www.linkedin.com/in/jehad-hossain",
      icon: <LinkedIn />,
      label: "Linkedin",
    },
    {
      link: "https://github.com/Zihad550",
      icon: <GitHub />,
      label: "Github",
    },
  ];
  return (
    <Stack direction="row" spacing={1} mt={mt}>
      {items.map((item) => (
        <IconButton
          key={item.label}
          component="a"
          href={item.link}
          target="_blank"
          aria-label={item.label}
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
          {item.icon}
        </IconButton>
      ))}
    </Stack>
  );
};

export default SocialMediaLinks;
