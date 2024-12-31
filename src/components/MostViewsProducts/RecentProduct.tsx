
"use client";

import {
  useDeleteRecentProductMutation,
  useGetRecentViewProductsQuery,
} from "@/redux/features/products/productApi";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { IRecentProductView } from "@/types/modal";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

const Loading = dynamic(() => import("@/app/loading"), {
  ssr: false,
});

const RecentProduct = () => {
  const { data: recentViewedProducts, isLoading } =useGetRecentViewProductsQuery(undefined);

  const { data: allCategories} =useGetAllCategoriesQuery(undefined);
  console.log(allCategories,"aalll");

  const [deleteRecentProduct] = useDeleteRecentProductMutation();
  const [currentPage, setCurrentPage] = useState(1);

  const dataPerPage = 8;
  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;

  const paginatedProducts =
    recentViewedProducts?.slice(startIndex, endIndex) || [];
  const totalProducts = recentViewedProducts?.length || 0;
  const totalPages = Math.ceil(totalProducts / dataPerPage);


  console.log(recentViewedProducts, "ggggggggggggg");
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [pImg, setPImg] = useState(paginatedProducts[0]?.product);

  const handleDeleteProduct = async (id: string | null) => {
    if (!id) {
      toast.error("You need to be logged in to remove recently viewed products.");
      return;
    }

    try {
      await toast.promise(deleteRecentProduct({ productId: id }).unwrap(), {
        loading: "Removing...",
        success: "Product removed from recently viewed!",
        error: `Failed to remove product. You need to be logged in.`,
      });
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="section-margin-top">
      <header className="flex flex-col md:flex-row items-center justify-between">
        <h2 className="lg:text-4xl text-2xl mb-10 font-bold tracking-tight text-gray-900 lg:text-start text-center">
          Recently Viewed Products
        </h2>
      </header>
      {isLoading ? (
        <Loading />
      ) : totalProducts === 0 ? (
        <div className="flex flex-col items-center lg:mt-10">
          <img
            src="/favicon.ico.png"
            alt="No Products Found"
            width={200}
            height={200}
          />
          <p className="text-xl text-gray-700 mt-6">
            No products viewed yet.
          </p>
        </div>
      ) : (
        <div>
          <div className="lg:flex gap-5 items-center">
            {/* Product Image and Name */}
            <div className="lg:w-1/3 relative">
              <img
                className="w-full lg:h-[600px] h-[350px] object-cover overflow-auto"
                src={pImg?.image}
                alt={pImg?.name}
              />
              <h2 className="text-4xl font-bold bg-green-700/30 backdrop-blur-lg w-full text-center py-5 text-white absolute bottom-0 z-40">
                {pImg?.name}
              </h2>
            </div>

            {/* Product List */}
            <div className="h-[600px] lg:w-2/3 ml-auto overflow-hidden hover:overflow-y-auto overflow-x-auto  hover:transition-all hover:duration-300 custom-scrollbar">
              <Table>
                <TableHeader className="h-[100px]">
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Serial</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>StockQuantity</TableHead>
                    <TableHead>Sale</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.map(
                    (product: IRecentProductView, i: number) => (
                      <TableRow
                        key={product?.product?.id}
                        onMouseEnter={() => setPImg(product?.product)}
                      >
                        <TableCell>
                          <img
                            src={product?.product?.image[0]}
                            alt={product?.product?.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{i + 1}</TableCell>
                        <TableCell className="uppercase flex flex-col">
                          <h5 className="text-md font-bold mb-1">
                            {product?.product?.name}
                          </h5>
                          <p className="mini-active bg-gray-200 rounded-lg px-2 py-1">
                            {product?.product?.category?.id}
                          </p>
                        </TableCell>
                        <TableCell className="uppercase w-16">
                          {product?.product?.description}
                        </TableCell>
                        <TableCell
                          className={
                            product?.product?.stockQuantity === 0
                              ? "text-red-500"
                              : ""
                          }
                        >
                          {product?.product?.stockQuantity}
                        </TableCell>
                        <TableCell>
                        <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-white rounded" 
      style={{ backgroundColor: product.product?.flashSale ? '#DC2626' : '#80b500' }}>
  {product.product?.flashSale ? 'Flash Sale' : 'New Arrival'}
</span>



                        </TableCell>
                        <TableCell>
                          ${product?.product?.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/single-product/${product?.product?.id}`}>
                            <Button className="hover:bg-black bg-[#7fad39]">
                              View Items
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentProduct;
