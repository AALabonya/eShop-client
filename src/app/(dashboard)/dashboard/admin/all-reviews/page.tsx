"use client"
import NotProductFound from "@/components/AllProducts/NotProductFound";
import { useGetAllReviewsQuery } from "@/redux/features/review/reviewsApi";
import { IReview } from "@/types/modal";

import React, { useState } from "react";


const Page = () => {
    const [productId, setProductId] = useState("");
    const { data: reviews, isLoading, isError } = useGetAllReviewsQuery(productId || undefined);

  if (isLoading) return <p>Loading reviews...</p>;
 

  return (
    <div className="p-4">
      {reviews && reviews.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 font-medium">
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Product ID</th>
                <th className="border border-gray-300 px-4 py-2">Rating</th>
                <th className="border border-gray-300 px-4 py-2">Comment</th>
                <th className="border border-gray-300 px-4 py-2">Vendor ID</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review: IReview, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {review.productId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {review.rating}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {review.comment}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {review.vendorId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NotProductFound/>
      )}
    </div>
  );
};

export default Page;
