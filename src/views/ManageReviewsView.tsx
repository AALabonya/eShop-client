"use client";




import { useState } from "react";

const ManageReviewsView = () => {
  const [page, setPage] = useState(1);


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product Reviews</h1>
      <div className="flex flex-col w-full gap-[15px] mb-[15px]">
 
      </div>

    </div>
  );
};

export default ManageReviewsView;
