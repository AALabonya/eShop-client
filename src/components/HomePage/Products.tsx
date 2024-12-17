
"use client";

import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import Loading from "@/app/loading";
import { IProduct } from "@/types/modal";
import HomePageProductCard from "./HomePageProductCard";
import { Pagination } from "@nextui-org/pagination";

const HomeProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(4);
  
  const [queryObj, setQueryObj] = useState({
    flashSale: false,
    page: currentPage,
    limit: dataPerPage,
  });

  const {
    data: allProductsResponse,
    isLoading,
    refetch,
  } = useGetAllProductsQuery(queryObj);

  const totalPages = Math.ceil(
    (allProductsResponse?.meta?.total || 0) / dataPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

  useEffect(() => {
    setQueryObj((prev) => ({
      ...prev,
      page: currentPage,
      limit: dataPerPage,
    }));

    // Refetch data whenever queryObj changes
    refetch();
  }, [currentPage, dataPerPage, refetch]);

  return (
    <div className="lg:pt-8 pb-5 ">
      <div className="lg:items-end lg:justify-between flex justify-center">
        <h2 className="lg:text-4xl text-2xl font-bold tracking-tight text-gray-900 lg:text-start text-center ">
          Latest Products
        </h2>
        <div className="flex gap-4 lg:mt-0 lg:block hidden">
          {/* Left Button */}
          <button
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className="rounded-md border border-4 border-[#80b500] hover:bg-[#80b500] px-3 py-1 transition text-black hover:text-white"
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
            onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
            disabled={currentPage === totalPages}
            className="rounded-md border border-4 border-[#80b500] hover:bg-[#80b500] px-3 py-1 transition text-black hover:text-white"

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

      <div className="py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {isLoading
          ? Array.from({ length: dataPerPage }).map((_, index) => (
              <div key={index}>
                <Loading />
              </div>
            ))
          : allProductsResponse?.data?.map((singleProduct: IProduct) => (
              <div key={singleProduct.id}>
                <HomePageProductCard singleProduct={singleProduct} />
              </div>
            ))}
      </div>

      <div>
        {allProductsResponse?.data?.length > 0 && (
          <div className="flex justify-center items-center mt-8">
            <div className="flex items-center space-x-2">
              {/* Custom Pagination Buttons */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${
                  currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
                } p-2 bg-gray-300 rounded-full hover:bg-[#80b500] text-white`}
              >
                <span className="font-bold text-lg">{"<"}</span>
              </button>
              {/* Page Numbers */}
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`${
                    currentPage === index + 1
                      ? "bg-[#80b500] text-white"
                      : "bg-white text-rose-600"
                  } px-4 py-2 rounded-full transition duration-200 hover:bg-[#80b500] hover:text-white`}
                >
                  {index + 1}
                </button>
              ))}
              {/* Right Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${
                  currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
                } p-2 bg-gray-300 rounded-full hover:bg-[#80b500] text-white`}
              >
                <span className="font-bold text-lg">{">"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeProducts;
