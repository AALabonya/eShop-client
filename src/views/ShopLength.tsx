"use client";

import { Button } from "@/components/ui/button";
import { useGetAllTypeUsersQuery } from "@/redux/features/users/userApi";
import React, { useState } from "react";


const ShopLength = () => {

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
    
      const shops= data?.data?.length

      console.log(shops,"length");
      

  return (
  <div>
 <Button className="bg-[#80b500]">{data?.data?.length}</Button>
  </div>
  )
};

export default ShopLength;