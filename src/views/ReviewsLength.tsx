"use client";

import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { IReview } from "@/types/modal";

import React, { useState } from "react";


const ReviewsLength = () => {

      const { data: allProductsResponse, isLoading } = useGetAllProductsQuery({

      });
    
      // Extract and flatten all reviews from product data
      const allReviews: IReview[] =
        allProductsResponse?.data?.flatMap((product: any) => product.reviews || []) ||
        [];
    
      // Pagination Logic
      const totalReviews = allReviews.length;
      

  return (
  <div>
 <Button className="bg-[#80b500]">{totalReviews }</Button>
  </div>
  )
};

export default ReviewsLength;