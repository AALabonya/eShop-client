
import BotomToTop from "@/components/Home/BottomToUpper";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <div className="mt-0 sticky top-0 left-0 w-full bg-white z-50">
     <Header />
     </div>
     <div className="mt-0 sticky top-[100px] left-0 w-full z-50  mt-2">
                            <Navbar />
                        </div>
      <main className="w-full  min-h-screen">
        <div className="lg:container lg:mx-auto lg:px-4 px-2">{children}</div>
      </main>
      {/* <BotomToTop/> */}
      <Footer/>
    </>
  );
};

export default layout;
