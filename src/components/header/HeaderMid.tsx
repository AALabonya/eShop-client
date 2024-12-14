import { useAppSelector } from "@/redux/hook";
import { Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// import ProductSearchBox from "./ProductSearchBox";
import SideBar from "./SideBar";
import HeaderSearch from "./HeaderSearch";

const HeaderMid = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="border-b-[1px] border-input py-[12px]">
      <div className="flex layout_container items-center justify-between gap-[15px]">
        {/* <HeaderSearch/> */}
        {/* <ProductSearchBox /> */}
       

        <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
    </div>
  );
};

export default HeaderMid;
