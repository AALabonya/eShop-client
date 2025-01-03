import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine, RiUserSettingsLine } from "react-icons/ri";
export const userProfileLinks = [
  {
    href: "/profile",
    label: "Profile",
    Icon: CiUser,
  },
  {
    href: "/profile/settings",
    label: "Account setting",
    Icon: RiUserSettingsLine,
  },
  // {
  //   href: "/profile/update-password",
  //   label: "Security",
  //   Icon: RiLockPasswordLine,
  // },
  {
    href: "/profile/my-orders",
    label: "My Orders",
    Icon: RiLockPasswordLine,
  },
  {
    href: "/profile/followed-shop",
    label: "Favourite Shop",
    Icon: RiLockPasswordLine,
  },
];
