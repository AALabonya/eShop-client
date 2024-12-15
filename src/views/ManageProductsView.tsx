"use client";

import DashboardHeading from "@/components/uiElements/DashboardHeading";


import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
const ManageProductsView = () => {
  const [page, setPage] = useState(1);



  return (
    <div>
      <DashboardHeading
        title="Manage Products"
        description="Create a new product and add it to your store"
        className="mb-[20px]"
      />
      <div className="w-full h-full flex items-center justify-end gap-[5px] mb-[23px]">
        <Link
          href="/dashboard/vendor/create-product"
          className="inline-block bg-main text-white font-semibold px-4 py-2 rounded-md hover:bg-mainHover transition-colors duration-300"
        >
          Create Product <Plus className="inline-block ml-2" />
        </Link>
      </div>
     
      
    </div>
  );
};

export default ManageProductsView;
