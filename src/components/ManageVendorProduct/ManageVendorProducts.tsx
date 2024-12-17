// "use client";
// import ProductTable from "@/components/ManageProducts/ProductTable";
//
// import { NextPagination } from "@/components/uiElements/NextPagination";
// import useUserDetails from "@/hooks/userUser";
// import { useGetAllProductsQuery } from "@/redux/features/products/productApi";

// import { PenIcon, Plus } from "lucide-react";
// import Link from "next/link";
// import { useState, useEffect } from "react";

// const ManageVendorProducts = () => {
//   const [page, setPage] = useState(1); 
//   const [limit] = useState(5); 
//   const { userData } = useUserDetails();

//   const queryObj = {
//     customerId: userData?.userData?.id,
//     page, 
//     limit, 
//   };


//   const { data: vendorData, isLoading, isFetching } = useGetAllProductsQuery(queryObj, {
//     skip: !userData?.userData, 
//   });

 
//   useEffect(() => {
//     setPage(1);
//   }, [userData?.userData?.id]);

//   return (
//     <div>
//       {/* Heading */}
//       <DashboardHeading
//         title="Manage Products"
//         description="Create a new product and add it to your store"
//         className="mb-[20px]"
//       />

//       {/* Create Product Button */}
//       <div className="w-full h-full flex items-center justify-end gap-[5px] mb-[23px]">
//         <Link
//           href="/dashboard/vendor/create-product"
//           className="inline-block bg-[#7fad39] text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300"
//         >
//           Create Product <PenIcon className="inline-block ml-2" />
//         </Link>
//       </div>

//       {/* Product Table */}
//       <ProductTable products={vendorData?.data || []} isLoading={isFetching} />

//       {/* Pagination */}
//       <NextPagination
//         totalDocs={vendorData?.meta.totalDoc || 0}
//         limit={10}
//         onPageChange={setPage}
//         showText
//       />
//     </div>
//   );
// };

// export default ManageVendorProducts;
"use client";

import Loading from "@/app/loading";
import DashboardHeading from "@/components/uiElements/DashboardHeading";
import { Pagination } from "@nextui-org/pagination";

import ProductTable from "@/components/ManageProducts/ProductTable";

import { PenIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import useUserDetails from "@/hooks/userUser";

const ManageVendorProducts = () => {
  const { userData: vendorData, isFetching } = useUserDetails();
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;

  // Page Change Handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate Pagination Data
  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const paginatedProducts =
    vendorData?.userData?.products?.slice(startIndex, endIndex) || [];
  const totalProducts = vendorData?.userData?.products?.length || 0;
  const totalPages = Math.ceil(totalProducts / dataPerPage);

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
          className="inline-block bg-[#7fad39] text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300 hover:bg-[#6a9c32]"
        >
          Create Product <PenIcon className="inline-block ml-2" />
        </Link>
      </div>

      {/* Product Table */}
      <ProductTable products={paginatedProducts} isLoading={isFetching} />

      {/* Pagination */}
      {totalProducts > 0 && (
        <div className="flex justify-center items-center mt-8">
          <div className="flex items-center space-x-2">
            {/* Left Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full transition-all duration-300 text-white 
              ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 hover:bg-[#80b500]"}`}
            >
              {"<"}
            </button>
            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-full transition-all duration-300 
                ${currentPage === index + 1 ? "bg-[#80b500] text-white" : "bg-gray-200 text-rose-600 hover:bg-[#80b500] hover:text-white"}`}
              >
                {index + 1}
              </button>
            ))}
            {/* Right Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full transition-all duration-300 text-white 
              ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 hover:bg-[#80b500]"}`}
            >
              {">"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageVendorProducts;
