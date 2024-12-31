
"use client";

import { Button } from "@/components/ui/button";
import { useGetAllOrdersQuery } from "@/redux/features/orders/orderApi";

import React, { useState } from "react";


const TransactionLength = () => {
 const { data: orders, isLoading, isError } = useGetAllOrdersQuery({ });

  return (
  <div>
 <Button className="bg-[#80b500]">{orders?.data?.length}</Button>
  </div>
  )
};

export default TransactionLength;
