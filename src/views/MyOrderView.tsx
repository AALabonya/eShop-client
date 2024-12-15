"use client";


import { useState } from "react";

const MyOrderView = () => {
  const [page, setPage] = useState(1);


  return (
    <div className="w-full ">
      <h2 className="text-2xl font-bold mb-[28px]">You orders</h2>
      <div className="max-h-[50vh] overflow-auto smoothBar w-full">
       
      </div>

    </div>
  );
};

export default MyOrderView;
