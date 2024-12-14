// "use server";

// import { baseUrl1 } from "@/redux/api/appSlice";
// import ProductCard from "../card/ProductCard";
// import { Separator } from "../ui/separator";
// import { IProduct } from "@/types/modal";
// import HomeProductCard from "../card/ProductCard";

// const Products = async () => {
//   const res = await fetch(`${baseUrl1}/product/get?limit=10`, {
//     next: {
//       revalidate: 20 * 60, // 20 minutes
//     },
//   });

//   const data = (await res.json()) as { data: IProduct[] };

//   // Filter products with discount === 0
//   const zeroDiscountProducts = data?.data?.filter(
//     (product) => product.discount === 0
//   );

//   // console.log(zeroDiscountProducts, "Zero Discount Products");

//   return (
//     <div className="w-full mt-[50px]">
//       <h4 className="text-[25px] font-[700] text-mainTxt">Latest Products</h4>
//       <Separator className="" />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
//         {zeroDiscountProducts?.map((product) => (
//           <HomeProductCard product={product} key={product.id} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;
"use client";



import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/pagination";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import Loading from "@/app/loading";
import { IProduct } from "@/types/modal";
import HomePageProductCard from "./HomePageProductCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addCompareProducts, removeFromComparison, selectCompareProducts } from "@/redux/features/productCompare/compareSlice";
import { toast } from "sonner";


const AllProducts = () => {
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
    <div className="pb-14">
      {/* <SectionTitle sub="Shop The Best" heading="Explore Our Collection" /> */}
  <div className="">
    <div className="items-end justify-between sm:flex">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
      Latest Products
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

      <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
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

      {/* <div>
        {allProductsResponse?.data?.length > 0 && (
          <div className="flex justify-center items-center mt-4">
            <Pagination
              total={totalPages}
              initialPage={1}
              page={currentPage}
              onChange={handlePageChange}
              showControls
            />
          </div>
        )}
      </div> */}
    </div>
  );
};

export default AllProducts;