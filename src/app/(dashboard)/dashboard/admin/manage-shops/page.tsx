"use client";

import ShopsTable from "@/components/MangeShops/ShopsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NextSearchBox from "@/components/uiElements/NextSearchBox";
import { useGetAllTypeUsersQuery } from "@/redux/features/users/userApi";
import { IVendor } from "@/types/modal";
import { useState } from "react";

const MangeShop = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    isBlackListed: "",
    searchTerm: "",
    role: "VENDOR",
  });

  const { page, limit, searchTerm, role, isBlackListed } = query;

  const { data, isFetching } = useGetAllTypeUsersQuery({
    page,
    limit,
    searchTerm,
    role,
    isBlackListed,
  });


  const vendorData = data?.data?.filter((user) => user.role === "VENDOR");


  const totalVendors = data?.meta?.total || 0; 
  const totalPages = Math.ceil(totalVendors / limit);


  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setQuery({ ...query, page: newPage });
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Shop Management</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Display the filtered vendors in a table */}
        <ShopsTable
          shops={vendorData as unknown as IVendor[]}
          isLoading={isFetching}
          onDelete={function (userId: string): void {
            throw new Error("Function not implemented.");
          }}
        />

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 border rounded ${
                page === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MangeShop;
