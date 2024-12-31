"use client";
import Loading from "@/app/loading";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { IProduct } from "@/types/modal";
import { useEffect, useState } from "react";
import HomePageProductCard from "../HomePage/HomePageProductCard";
import Link from "next/link";
import PageTitleForHome from "../shared/PageTitle";

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
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); 
    } else {
      const totalPages = Math.ceil((allProductsResponse?.meta?.total || 0) / dataPerPage);
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages)); 
    }
  };

  const startIndex = (currentPage - 1) * dataPerPage;
  const currentProducts = allProductsResponse?.data?.slice(startIndex, startIndex + dataPerPage);

  return (
    <div className="py-9">
   
      <div className="justify-between flex  lg:flex-row flex-col items-center justify-center py-5 md:py-0">
        <h2 className="lg:text-4xl text-3xl font-bold tracking-tight text-gray-900 lg:text-start text-center ">
            Flash Sale Products
          </h2>

  {/* View All Flash Sale Button */}
  <Link href="/flashSale" className="hidden md:block">
  <div className="flex justify-center items-center ">
    <button className="relative h-12 w-44 bg-[#80b500] text-white font-bold  uppercase rounded-full border-4 border-[#80b500] overflow-hidden transform transition duration-300 ease-in-out hover:bg-transparent hover:text-white font-bold hover:border-[#80b500] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#80b500] before:scale-0 before:transition-transform before:duration-500 hover:before:scale-100">
      <span className="relative z-10 px-2 py-2">View All Flash Sale</span>
    </button>
  </div>
</Link>

        </div>
 

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
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

      <Link href="/flashSale" className="block md:hidden mt-5">
  <div className="flex justify-center items-center ">
    <button className="relative h-12 w-44 bg-[#80b500] text-white font-bold  uppercase rounded-full border-4 border-[#80b500] overflow-hidden transform transition duration-300 ease-in-out hover:bg-transparent hover:text-white font-bold hover:border-[#80b500] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#80b500] before:scale-0 before:transition-transform before:duration-500 hover:before:scale-100">
      <span className="relative z-10 px-2 py-2">View All Flash Sale</span>
    </button>
  </div>
</Link>

    </div>
  );
};

export default FlashSale;
