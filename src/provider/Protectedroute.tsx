"use client";
import Loader from "@/components/shared/Loader";
import useUserDetails from "@/hooks/userUser";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { TRole } from "@/types/modal";

import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
interface IProps {
  role: TRole | "*";
  children: React.ReactNode;
}

const Protectedroute: React.FC<IProps> = ({ role, children }) => {
  const token = useAppSelector(selectCurrentToken);
  const router = useRouter();
  const path = usePathname();
const {userData} =useUserDetails()
  // if (isLoading) {
  //   return <Loader className="!h-screen" />;
  // }

  if (!userData?.userData || !token) {
    Cookies.set("redirect", path);
    router.push("/login");
    return <></>;
  }

  if (userData?.userData?.role !== role && role !== "*") {
    router.push("/");
    return <></>;
  }

  if (userData?.userData?.isDeleted) {
    router.push("/suspended");
    return <></>;
  }

  return children;
};

export default Protectedroute;
