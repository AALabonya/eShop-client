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
    role: "vendor",
  });

  const { page, limit, searchTerm, role, isBlackListed } = query;

  
  const { data, isFetching, error } = useGetAllTypeUsersQuery({
    page,
    limit,
    searchTerm,
    role,
    isBlackListed,
  });

  // Filter vendors from the fetched data
  const vendorData = data?.data?.filter(user => user.role === "VENDOR");

  console.log(vendorData, "Filtered vendors");

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Shop Management</CardTitle>
      </CardHeader>
      <CardContent>
        <NextSearchBox
          className="mb-4"
          placeholder="Search by shop name"
          onValueChange={(searchTerm) => {
            setQuery({ ...query, searchTerm });
          }}
        />

      

        {/* Display the filtered vendors in a table */}
        <ShopsTable shops={vendorData as unknown as IVendor[]} isLoading={isFetching} onDelete={function (userId: string): void {
          throw new Error("Function not implemented.");
        } } />


     
      </CardContent>
    </Card>
  );
};

export default MangeShop;
