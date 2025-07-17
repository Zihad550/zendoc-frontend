import { USER_ROLE } from "@/contants/role";
import { DrawerItem, UserRole } from "@/types";

//icons
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import KeyIcon from "@mui/icons-material/Key";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import PersonIcon from "@mui/icons-material/Person";
import TryIcon from "@mui/icons-material/Try";

export const drawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  // const defaultMenus = [
  //   {
  //     title: "Profile",
  //     path: `${role}/profile`,
  //     icon: PersonIcon,
  //   },
  // ];

  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Manage Users",
          path: `${role}/manage-users`,
          icon: GroupIcon,
        },
      );
      break;

    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Specialties",
          path: `${role}/specialties`,
          icon: TryIcon,
        },
        {
          title: "Doctors",
          path: `${role}/doctors`,
          icon: MedicalInformationIcon,
        },
        {
          title: "Schedules",
          path: `${role}/schedules`,
          icon: CalendarMonthIcon,
        },
        {
          title: "Appointments",
          path: `${role}/appointments`,
          icon: BookOnlineIcon,
        },
        // {
        //   title: "Reviews",
        //   path: `${role}/reviews`,
        //   icon: ReviewsIcon,
        // },
        {
          title: "Change Password",
          path: `change-password`,
          icon: KeyIcon,
        },
      );
      break;

    case USER_ROLE.DOCTOR:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Profile",
          path: `${role}/profile`,
          icon: PersonIcon,
        },
        {
          title: "Schedules",
          path: `${role}/schedules`,
          icon: CalendarMonthIcon,
        },
        {
          title: "Appointments",
          path: `${role}/appointment`,
          icon: BookOnlineIcon,
        },
        {
          title: "Change Password",
          path: `change-password`,
          icon: KeyIcon,
        },
      );
      break;

    case USER_ROLE.PATIENT:
      roleMenus.push(
        {
          title: "Appointments",
          path: `${role}/appointments`,
          icon: BookOnlineIcon,
        },
        // {
        //   title: "Prescriptions",
        //   path: `${role}/prescriptions`,
        //   icon: ReceiptLongIcon,
        // },
        // {
        //   title: "Payment History",
        //   path: `${role}/payment-history`,
        //   icon: AttachMoneyIcon,
        // },
        {
          title: "Change Password",
          path: `change-password`,
          icon: KeyIcon,
        },
      );
      break;

    default:
      break;
  }

  // return [...roleMenus, ...defaultMenus];
  return [...roleMenus];
};
