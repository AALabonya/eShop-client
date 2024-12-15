"use client";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { SetStateAction, useEffect } from "react";
import { Button } from "../ui/button";
import { DashboardNav } from "./DashboardNav";
import { adminLinks, vendorLinks } from "@/routes/admin.route";
import { useAppDispatch } from "@/redux/hooks";
import { logoutService } from "@/utils/loginService";
import useUserDetails from "@/hooks/userUser";
import { toast } from "sonner";
import { clearCoupon } from "@/redux/features/coupon/couponSlice";
import { clearCart } from "@/redux/features/products/productSlice";
import { logout } from "@/redux/features/auth/authSlice";

import { useRouter } from "next/navigation";
type SidebarProps = {
  className?: string;
  setIsopen: React.Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};

export default function Sidebar({
  className,
  isOpen,
  setIsopen,
}: SidebarProps) {
  const { userData } = useUserDetails();
  const dispatch = useAppDispatch();
  const router = useRouter();
console.log(userData,"userData");

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const screen = window.screen.width;

    
      if (screen > 1024) {
        return;
      }


      if (target.closest(".sidebar") || target.closest(".menuBTn")) {
        return;
      }

      setIsopen(false);
    };

   
    if (isOpen) {
      document.body.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, setIsopen]);

  const toggleStyle = {
    left: isOpen ? "277px" : "10px",
    rotate: isOpen ? "0deg" : "180deg",
  };

  const handleCloseBar = () => {
    const width = window.screen.width;

    width > 767 ? "" : setIsopen(false);
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
    <aside
      style={{
        transition: "0.3s",
        width: `${isOpen ? "287px" : "0px"}`,
        display: "flex",
      }}
      className={cn(
        `md:relative fixed top-0 left-0  h-full border-r bg-card transition-[width] duration-500 md:block
        w-72 shrink-0 overflow-hidden z-[30] sidebar flex flex-col gap-[20px] justify-between pb-[20px] bg-white md:bg-transparent`,
        className
      )}
    >
      <div className="w-full">
        <ArrowLeft
          className={cn(
            "fixed z-20 top-[18%] cursor-pointer rounded-full border bg-background text-3xl text-foreground md:flex hidden bg-white"
          )}
          style={{
            transition: "0.3s",
            ...toggleStyle,
          }}
          onClick={() => setIsopen(!isOpen)}
        />

        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="mt-3 space-y-1" onClick={handleCloseBar}>
              <DashboardNav
                navLinks={
                  userData ? (userData?.userData?.role == "ADMIN" ?  adminLinks : vendorLinks) : []
                }
              />
            </div>
          </div>
        </div>
      </div>
     
     <Button
       onClick={handleLogout}
        className="w-[90%] mx-auto hover:bg-[#7fad39]"
       
      >
        Logout
      </Button>
    </aside>
  );
}
