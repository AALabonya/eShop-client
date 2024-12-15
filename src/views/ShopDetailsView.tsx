"use client";

import { NextPagination } from "@/components/uiElements/NextPagination";
import NextSearchBox from "@/components/uiElements/NextSearchBox";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";

import { useState } from "react";
const ShopDetailsView = ({ shopId }: { shopId: string }) => {
  const [query, setQuery] = useState({ page: 1, searchTerm: "", shopId });
  const { data, isFetching } = useGetAllProductsQuery(query);

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-full mt-[30px] bg-white px-4 py-6 rounded-[15px]">
        <div className="grid gap-6">
          <div className="flex justify-between items-start">
            <div className="flex-1 max-w-3xl">
          
            </div>
            <div className="w-72"></div>
          </div>
          <NextSearchBox
            onValueChange={(value) => setQuery({ ...query, searchTerm: value })}
          />
          {/* <ProductGrid products={products} /> */}
      
          <NextPagination
            totalDocs={data?.meta.totalDoc || 0}
            limit={12}
            onPageChange={(page) => setQuery({ ...query, page })}
            showText
          />
        </div>
      </div>
    </div>
  );
};

export default ShopDetailsView;
