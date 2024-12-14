
import { NavItem } from "@/types/modal";
import { BsFileEarmarkPost } from "react-icons/bs";
import { CiCreditCard2, CiShop, CiViewList } from "react-icons/ci";
import { FaRegRectangleList } from "react-icons/fa6";
import { GrServices } from "react-icons/gr";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineReviews } from "react-icons/md";

export const adminLinks: NavItem[] = [
  {
    href: "/dashboard/admin",
    Icon: GrServices,
    title: "Dashboard",
  },
  {
    href: "/dashboard/admin/transactions",
    Icon: CiCreditCard2,
    title: "transactions",
  },
  {
    href: "/dashboard/admin/manage-user",
    Icon: CiViewList,
    title: "Manage Users",
  },
  {
    href: "/dashboard/admin/manage-shops",
    Icon: CiShop,
    title: "Manage Shops",
  },
  {
    href: "/dashboard/admin/manage-categories",
    Icon: BsFileEarmarkPost,
    title: "Manage Categories",
  },
];


export const vendorLinks: NavItem[] = [
  {
    href: "/dashboard/vendor",
    Icon: GrServices,
    title: "Vendor Dashboard",
  },
  {
    href: "/dashboard/vendor/update-shop",
    Icon: GrServices,
    title: "Update Shop",
  },
  {
    href: "/dashboard/vendor/manage-products",
    Icon: FaRegRectangleList,
    title: "Manage Products",
  },
  {
    href: "/dashboard/vendor/manage-orders",
    Icon: LiaShippingFastSolid,
    title: "Manage Orders",
  },
  {
    href: "/dashboard/vendor/manage-reviews",
    Icon: MdOutlineReviews,
    title: "Manage Reviews",
  },
];