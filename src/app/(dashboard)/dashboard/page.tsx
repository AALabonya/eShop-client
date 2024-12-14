"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Cookies from "js-cookie";
import { useAppSelector } from "@/redux/hooks";
import useUserDetails from "@/hooks/userUser";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";

const DashboardRoot = () => {
  const router = useRouter();
  const { userData, isLoading } = useUserDetails();
  const token = useAppSelector(selectCurrentToken);
  useEffect(() => {
    if (!userData?.userData || !token) {
      router.push("/login");
      Cookies.set("redirect", "/dashboard");
      return;
    }
    if (userData?.userData?.role === "CUSTOMER") {
      router.replace("/");
    } else {
      router.replace(`/dashboard/${userData?.userData?.role?.toLowerCase()}`);
    }
  }, [userData?.userData, router, token]);
  return <div></div>;
};

export default DashboardRoot;
