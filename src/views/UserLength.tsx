
"use client";

import { Button } from "@/components/ui/button";
import { useGetAllTypeUsersQuery } from "@/redux/features/users/userApi";
import React, { useState } from "react";


const UserLength = () => {


  
    const { data, isFetching } = useGetAllTypeUsersQuery
    ({  });
  


  return (
  <div>
 <Button className="bg-[#80b500]">{data?.data?.length}</Button>
  </div>
  )
};

export default UserLength;
