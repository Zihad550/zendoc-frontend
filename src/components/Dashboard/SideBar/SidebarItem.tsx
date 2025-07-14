import { DrawerItem } from "@/types";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  alpha,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

type IProps = {
  item: DrawerItem;
};

const SidebarItem = ({ item }: IProps) => {
  const linkPath = `/dashboard/${item.path}`;
  const pathname = usePathname();
  const isActive = pathname === linkPath;
  const theme = useTheme();

  return (
    <Link href={linkPath} style={{ textDecoration: "none", color: "inherit" }}>
      <ListItem
        disablePadding
        sx={{
          mb: 1,
          borderRadius: 2,
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? alpha("#ffffff", 0.08)
                : alpha("#1a202c", 0.08),
            transform: "translateX(4px)",
          },
          ...(isActive && {
            backgroundColor:
              theme.palette.mode === "dark"
                ? alpha("#1586FD", 0.2)
                : alpha("#1586FD", 0.1),
            borderLeft: "4px solid #1586FD",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? alpha("#1586FD", 0.25)
                  : alpha("#1586FD", 0.15),
            },
          }),
        }}
      >
        <ListItemButton
          sx={{
            py: 1.5,
            px: 2,
            borderRadius: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: isActive
                ? "#1586FD"
                : theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.7)"
                : "rgba(26, 32, 44, 0.7)",
              minWidth: 40,
              transition: "color 0.3s ease",
            }}
          >
            {item.icon && <item.icon sx={{ fontSize: 22 }} />}
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            sx={{
              "& .MuiListItemText-primary": {
                color: isActive
                  ? theme.palette.mode === "dark"
                    ? "#ffffff"
                    : "#1a202c"
                  : theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(26, 32, 44, 0.9)",
                fontWeight: isActive ? 600 : 400,
                fontSize: "0.95rem",
                transition: "all 0.3s ease",
              },
            }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItem;
