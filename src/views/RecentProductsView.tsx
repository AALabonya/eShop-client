// "use client";

// import useGetRecentProducts from "@/hooks/useGetRecentProducts";
// import ProductCard from "../card/ProductCard";
// import ProductSkeleton from "../skeleton/ProductSkeleton";
// import { Separator } from "../ui/separator";
// const RecentrlyViewProducts = () => {
//   const { products, isLoading } = useGetRecentProducts();

//   if (!isLoading && !products?.length) {
//     return <></>;
//   }
//   return (
//     <div className="py-[20px]">
//       <h4 className="text-[25px] font-[700] text-mainTxt">
//         Recently viewed Products
//       </h4>
//       <Separator className="my-[25px]" />
//       <div className="gridResponsive gap-[15px]">
//         {products.map((product) => (
//           <ProductCard product={product} key={product.id} />
//         ))}

//         {isLoading ? (
//           <>
//             <ProductSkeleton />
//             <ProductSkeleton />
//             <ProductSkeleton />
//             <ProductSkeleton />
//           </>
//         ) : (
//           ""
//         )}
//       </div>
//     </div>
//   );
// };

// export default RecentrlyViewProducts;
"use client";

import { useState } from "react";

import Image from "next/image";
import { PiStarFourFill } from "react-icons/pi";

import Link from "next/link";
import { Pagination } from "@nextui-org/pagination";
import { useDeleteRecentProductMutation, useGetRecentViewProductsQuery } from "@/redux/features/products/productApi";
import { toast } from "sonner";
import Loading from "@/app/loading";
import { IRecentProductView } from "@/types/modal";


const RecentViewProducts = () => {
  const { data: recentViewedProducts, isLoading } =
    useGetRecentViewProductsQuery(undefined);
console.log(recentViewedProducts,"recent");

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

  const handleDeletRecentViewedProduct = async (id: string) => {
    await toast.promise(deleteRecentProduct({ productId: id }).unwrap(), {
      loading: "Removing...",
      success: "Removed from Recent Viewed!",
      error: "Failed to remove product",
    });
  };

  return (
    <div>
      {isLoading ? (
        <Loading/>
      ) : (
        <div>
          <div className="">
          <div className="">
    <div className="items-end justify-between sm:flex">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
      Recent View Products
      </h2>

      <div className=" flex gap-4 lg:mt-0">
        <button
          aria-label="Previous slide"
          id="keen-slider-previous"
          className="rounded-md border border-rose-600 px-3 py-1 text-rose-600 transition hover:bg-rose-600 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 rtl:rotate-180"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button
          aria-label="Next slide"
          id="keen-slider-next"
          className="rounded-md border border-rose-600 px-3 py-1 text-rose-600 transition hover:bg-rose-600 hover:text-white"
        >
          <svg
            className="size-5 rtl:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
</div>
          </div>

          <div>
            {totalProducts === 0 ? (
              <div>
                <div className="max-w-lg mx-auto my-[83px]">
                  <div className="flex justify-center items-center">
                    {/* <Image src="/us.png" alt="Product" width={200} height={200} /> */}
                  </div>
                  <p className="text-2xl font-semibold text-center mt-3 text-black">
                    No  View Products Yet.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="my-14 grid grid-cols-1 lg:grid-cols-2 gap-5 w-[95%] mx-auto">
                  {paginatedProducts.map(
                    (singleProduct: IRecentProductView) => {
                      const discountPercentage =
                        (singleProduct?.product.discount ?? 0) / 100;
                      const discountAmount =
                        singleProduct.product.price * discountPercentage;
                      const discountedPrice = singleProduct?.product.flashSale
                        ? singleProduct.product.price - discountAmount
                        : singleProduct.product.price;

                      const params = new URLSearchParams();
                      params.set("product", singleProduct.product.id);

                      return (
                        <div
                          key={singleProduct.id}
                          className="card card-side bg-base-100 shadow-xl relative"
                        >
                          <span
                            onClick={() =>
                              handleDeletRecentViewedProduct(
                                singleProduct.product.id
                              )
                            }
                            className="absolute right-3 top-2 w-9 h-9 border-2 border-primary rounded-full text-center p-1 font-bold text-primary cursor-pointer hover:bg-primary hover:text-white"
                          >
                            X
                          </span>
                          <figure>
                            <img
                              src={singleProduct.product.image[0]}
                              alt="Product"
                              className="w-32 md:w-52 h-[340px] md:h-[260px] lg:h-[320px] lg:w-44 xl:w-48 xl:h-[275px] object-cover rounded-l-lg"
                            />
                          </figure>
                          <div className="card-body">
                            <h2 className="card-title text-white text-2xl">
                              {singleProduct.product.name}
                            </h2>
                            <p className="max-w-md text-sm">
                              {singleProduct.product.description?.slice(0, 90)}
                              ...
                            </p>
                            <div className="flex gap-2 items-center">
                              <span className="font-medium md:text-xl lg:text-lg xl:text-xl text-white">
                                Price:
                              </span>
                              <h2
                                className={`font-medium md:text-xl lg:text-lg xl:text-xl text-white ${
                                  singleProduct?.product.flashSale &&
                                  "line-through"
                                }`}
                              >
                                <span>$</span>
                                {singleProduct.product.price}
                              </h2>
                              {singleProduct?.product.flashSale && (
                                <h2 className="font-medium md:text-xl lg:text-lg xl:text-xl text-primary">
                                  <span>$</span>
                                  {discountedPrice}
                                </h2>
                              )}
                            </div>
                            <div>
                              {singleProduct.product.flashSale && (
                                <div className="inline-block px-3 py-1 text-sm font-medium text-white bg-primary rounded-full animate-blink">
                                  Flash Sale On!
                                </div>
                              )}
                            </div>
                            <div className="card-actions justify-start md:justify-end mt-2">
                              <Link
                                href={`/productDetails?${params.toString()}`}
                              >
                                <button className="relative h-10 w-full origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3 text-sm">
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

                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-4 pb-16">
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
        </div>
      )}
    </div>
  );
};

export default RecentViewProducts;
