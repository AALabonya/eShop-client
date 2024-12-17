"use client";
import Loading from "@/app/loading";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { IProduct } from "@/types/modal";
import { useEffect, useState } from "react";
import HomePageProductCard from "../HomePage/HomePageProductCard";
import Link from "next/link";

const FlashSale = () => {
  const [dataPerPage, setDataPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page or slide
  const [queryObj, setQueryObj] = useState({
    flashSale: true,
    limit: dataPerPage,
  });

  const {
    data: allProductsResponse,
    isLoading,
  } = useGetAllProductsQuery(queryObj);

  const updateDataPerPage = () => {
    const width = window.innerWidth;

    if (width >= 1280) {
      setDataPerPage(8);
    } else if (width >= 768 && width < 1280) {
      setDataPerPage(6);
    } else {
      setDataPerPage(4);
    }
  };

  useEffect(() => {
    updateDataPerPage();
    window.addEventListener("resize", updateDataPerPage);

    return () => {
      window.removeEventListener("resize", updateDataPerPage);
    };
  }, []);

  // Handle slide change logic
  const handleSlideChange = (direction: "left" | "right") => {
    if (direction === "left") {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Go left, but don't go below 1
    } else {
      const totalPages = Math.ceil((allProductsResponse?.meta?.total || 0) / dataPerPage);
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages)); // Go right, but don't go beyond total pages
    }
  };

  const startIndex = (currentPage - 1) * dataPerPage;
  const currentProducts = allProductsResponse?.data?.slice(startIndex, startIndex + dataPerPage);

  return (
    <div className="py-5 lg:px-0 px-2">
    <div className="lg:pt-8 pb-5 ">
      <div className="lg:items-end lg:justify-between flex justify-center">
        <h2 className="lg:text-4xl text-2xl font-bold tracking-tight text-gray-900 lg:text-start text-center ">
            Flash Sale Products
          </h2>

          <div className="flex gap-4 lg:mt-0 lg:block hidden">
            {/* Left Button */}
            <button
              aria-label="Previous slide"
              onClick={() => handleSlideChange("left")}
              className="rounded-md border border-4 border-[#80b500] hover:bg-[#80b500] px-3 py-1 transition bg-[#80b500] text-white"
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

            {/* Right Button */}
            <button
              aria-label="Next slide"
              onClick={() => handleSlideChange("right")}
              className="rounded-md border-4 border-[#80b500] hover:bg-[#80b500] px-3 py-1 transition text-black hover:text-white"
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

      {/* Product Grid */}
      <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {isLoading
          ? Array.from({ length: dataPerPage }).map((_, index) => (
              <div key={index}>
                <Loading />
              </div>
            ))
          : currentProducts?.map((singleProduct: IProduct) => (
              <div key={singleProduct.id}>
                <HomePageProductCard singleProduct={singleProduct} />
              </div>
            ))}
      </div>

      {/* View All Flash Sale Button */}
      <Link href={"/flashSale"}>
        <div className="flex justify-center items-center">
          <button className="relative h-12 w-30 origin-top transform rounded-lg border-4 border-[#80b500] hover:bg-[#80b500] before:duration-500 hover:text-white uppercase font-bold px-3">
            View All Flash Sale
          </button>
        </div>
      </Link>
    </div>
  );
};

export default FlashSale;
