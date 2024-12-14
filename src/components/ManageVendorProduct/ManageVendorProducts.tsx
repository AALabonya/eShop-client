"use client";
import ProductTable from "@/components/ManageProducts/ProductTable";
import DashboardHeading from "@/components/uiElements/DashboardHeading";
import { NextPagination } from "@/components/uiElements/NextPagination";
import useUserDetails from "@/hooks/userUser";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";

import { PenIcon, Plus } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const ManageVendorProducts = () => {
  const [page, setPage] = useState(1); 
  const [limit] = useState(5); 
  const { userData } = useUserDetails();

  const queryObj = {
    customerId: userData?.userData?.id,
    page, 
    limit, 
  };


  const { data: vendorData, isLoading, isFetching } = useGetAllProductsQuery(queryObj, {
    skip: !userData?.userData, 
  });

 
  useEffect(() => {
    setPage(1);
  }, [userData?.userData?.id]);

  return (
    <div>
      {/* Heading */}
      <DashboardHeading
        title="Manage Products"
        description="Create a new product and add it to your store"
        className="mb-[20px]"
      />

      {/* Create Product Button */}
      <div className="w-full h-full flex items-center justify-end gap-[5px] mb-[23px]">
        <Link
          href="/dashboard/vendor/create-product"
          className="inline-block bg-[#7fad39] text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300"
        >
          Create Product <PenIcon className="inline-block ml-2" />
        </Link>
      </div>

      {/* Product Table */}
      <ProductTable products={vendorData?.data || []} isLoading={isFetching} />

      {/* Pagination */}
      <NextPagination
        totalDocs={vendorData?.meta.totalDoc || 0}
        limit={10}
        onPageChange={setPage}
        showText
      />
    </div>
  );
};

export default ManageVendorProducts;
