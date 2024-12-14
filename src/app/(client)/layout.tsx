
import TopHeader from "@/components/Navbar/TopHeader";
import Header from "@/components/shared/Header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <TopHeader/>
      <Header />
      <main className="w-full bg-[#f4f4f4] min-h-screen">
        <div className="layout_container">{children}</div>
      </main>
    </>
  );
};

export default layout;
