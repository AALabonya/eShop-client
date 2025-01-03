"use client";

import {
  useDeleteRecentProductMutation,
  useGetRecentViewProductsQuery,
} from "@/redux/features/products/productApi";
import { Pagination } from "@nextui-org/pagination";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { IRecentProductView } from "@/types/modal";
import dynamic from "next/dynamic";
const Loading = dynamic(() => import("@/app/loading"), {
    ssr: false,
});

// Dynamically import Image to avoid SSR issues (next/image can cause SSR issues)
const DynamicImage = dynamic(() => import("next/image"), { ssr: false });

const RecentViewProducts = () => {
    const { data: recentViewedProducts, isLoading } =
        useGetRecentViewProductsQuery(undefined);
console.log(recentViewedProducts,"check recent");

    const [deleteRecentProduct] = useDeleteRecentProductMutation();
    const [currentPage, setCurrentPage] = useState(1);

    const dataPerPage = 8;
    const startIndex = (currentPage - 1) * dataPerPage;
    const endIndex = startIndex + dataPerPage;

    const paginatedProducts =
        recentViewedProducts?.slice(startIndex, endIndex) || [];
    const totalProducts = recentViewedProducts?.length || 0;
    const totalPages = Math.ceil(totalProducts / dataPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // const handleDeleteProduct = async (id: string) => {
    //     await toast.promise(deleteRecentProduct({ productId: id }).unwrap(), {
    //         loading: "Removing...",
    //         success: "Product removed from recently viewed!",
    //         error: "Failed to remove product.",
    //     });
    // };
    const handleDeleteProduct = async (id: string | null) => {
        if (!id) {
          toast.error("You need to be logged in to remove recently viewed products.");
          return;
        }
      
        try {
          await toast.promise(deleteRecentProduct({ productId: id }).unwrap(), {
            loading: "Removing...",
            success: "Product removed from recently viewed!",
            error: `Id do not match. You need to be logged in to remove recently viewed products.`,
          });
        } catch (error) {
          console.error("Error removing product:", error);
          toast.error("An unexpected error occurred.");
        }
      };
      
    return (
        <div className="">
            <header className="flex flex-col md:flex-row items-center justify-between">
                        <h2 className="lg:text-4xl text-2xl mb-10 font-bold tracking-tight text-gray-900 lg:text-start text-center ">
                            Recently Viewed Products
                        </h2>
                    </header>
            {isLoading ? (
                <Loading />
            ) : (
                <div>
                    {totalProducts === 0 ? (
                        <div className="flex flex-col items-center lg:mt-10">
                            <Image
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
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {paginatedProducts.map(
                                    (product: IRecentProductView) => {
                                        const discountPercentage =
                                            (product?.product.discount ?? 0) /
                                            100;
                                        const discountAmount =
                                            product.product.price *
                                            discountPercentage;
                                        const discountedPrice = product?.product
                                            .flashSale
                                            ? product.product.price -
                                              discountAmount
                                            : product.product.price;

                                        const params = new URLSearchParams();
                                        params.set(
                                            "product",
                                            product.product.id
                                        );

                                        return (
                                            <div
                                                key={product.id}
                                                className="relative bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
                                            >
                                                <button
                                                    onClick={() =>
                                                        handleDeleteProduct(
                                                            product.product.id
                                                        )
                                                    }
                                                    className="absolute top-3 right-3 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold hover:bg-red-700"
                                                >
                                                    ✕
                                                </button>
                                                <Image
                                                    src={
                                                        product.product.image[0]
                                                    }
                                                    alt={product.product.name}
                                                    width={300}
                                                    height={200}
                                                    className="w-full h-52 object-cover"
                                                />
                                                <div className="p-4">
                                                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                                                        {product.product.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mt-2">
                                                        {product.product.description?.slice(
                                                            0,
                                                            80
                                                        )}
                                                        ...
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-4">
                                                        <span
                                                            className={`text-base font-semibold ${
                                                                product?.product
                                                                    .flashSale
                                                                    ? "line-through text-gray-500"
                                                                    : "text-black"
                                                            }`}
                                                        >
                                                            $
                                                            {product.product.price.toFixed(
                                                                2
                                                            )}
                                                        </span>
                                                        {product?.product
                                                            .flashSale && (
                                                            <span className="text-base font-semibold text-green-600">
                                                                $
                                                                {discountedPrice.toFixed(
                                                                    2
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {product.product
                                                        .flashSale && (
                                                        <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-white bg-red-500 rounded">
                                                            Flash Sale
                                                        </span>
                                                    )}
                                                    <div className="mt-4">
                                                        <Link
                                                            href={`/all-products?${params.toString()}`}
                                                        >
                                                            <button className="w-full py-2 text-sm font-bold text-white bg-[#7fad39] rounded hover:bg-[#7fad39]">
                                                                View Details
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>

                            <div className="flex justify-center mt-10">
                                <Pagination
                                    total={totalPages}
                                    initialPage={1}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    showControls
                                />
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default RecentViewProducts;
