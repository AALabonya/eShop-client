"use client";

import ProfileSidebar from "@/components/shared/ProfileSidebar";
import { useAppSelector } from "@/redux/hooks";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const router = useRouter();
    const { user, token } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!user || !token) {
            Cookies.set("redirect", "/profile");
            router.push("/login");

            return;
        }

        if (user.role === "ADMIN") {
            router.push("/dashboard ");
        }
    }, [token, router, user]);

    return (
        <div className="w-full min-h-screen flex items-start justify-center py-12 overflow-hidden">
            {/* Wrapper Container */}
            <div className="flex flex-col md:flex-row w-full gap-5 p-4 md:p-6 rounded-lg shadow-lg bg-white">
                <ProfileSidebar />
                {/* Main Content Area */}
                <main className="overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
