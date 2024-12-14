import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { clearCart } from "@/redux/features/products/productSlice";
import { clearCoupon } from "@/redux/features/coupon/couponSlice";
import { logoutService } from "@/utils/loginService";
import { toast } from "sonner";

export function UserDropDown({ user }: { user: any }) {

    const dispatch = useAppDispatch();
//  console.log(user?.userData?.role,"got use");
 const users= user?.userData

    const handleLogout = () => {
      dispatch(logout());
      dispatch(clearCart());
      dispatch(clearCoupon());
      logoutService();
  
  
      toast.success("Logged out successfully", { duration: 3000 });
    };
  
// console.log(user?.role,"role");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="center p-[5px] rounded-full cursor-pointer">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <Image
              alt="profile"
              src={user?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {users && users.role !== "CUSTOMER" ? (
            <Link
              href={`/dashboard/${user?.userData?.role?.toLowerCase()}`}
              className="cursor-pointer"
            >
              <DropdownMenuItem>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>
          ) : (
            <></>
          )}{" "}
          <Link href={"/profile"}>
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/profile/settings" className="cursor-pointer">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />

              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
