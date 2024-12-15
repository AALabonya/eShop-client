"use client";

import { logout } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { userProfileLinks } from "@/utils/profileSidebarLinks";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { logoutService } from "@/utils/loginService";
import { clearCoupon } from "@/redux/features/coupon/couponSlice";
import { clearCart } from "@/redux/features/products/productSlice";
const ProfileSidebar = () => {
  const path = usePathname();
  const { user } = useAppSelector((state) => state.auth);

  const router = useRouter();
  const dispatch = useDispatch();
 

  const handleGoBack = () => {
    router.back();
  };
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearCoupon());
    logoutService();


    toast.success("Logged out successfully", { duration: 3000 });
// Redirect to /home after logout
router.push("/login");
  };
  return (
    <div className="flex flex-col gap-[15px] w-full md:w-fit">
      <button
        className="flex items-center justify-start gap-[10px]"
        onClick={handleGoBack}
      >
        <FaArrowLeft /> Go Back
      </button>
      {user &&
        userProfileLinks.map(({ Icon, href, label }, i) => (
          <Link
            href={href}
            key={"profile" + i}
            className={`w-full md:w-[240px] border-[1px]  py-[12px] rounded-[5px] flex items-center justify-start gap-[5px] font-[500] pl-[20px] ${
              path === href
                ? "bg-[#7fad39] text-white border-transparent"
                : "bg-transparent text-black border-borderColor"
            }`}
          >
            <Icon /> {label}
          </Link>
        ))}

      <Button
        className="w-[240px] border-[1px] border-borderColor py-[12px] rounded-[5px] flex items-center justify-start gap-[5px] font-[500] pl-[20px] hover:bg-[#7fad39] text-white mt-[50px]"
        onClick={handleLogout}
      >
        Logout<CiLogout />
      </Button>
    </div>
  );
};

export default ProfileSidebar;
