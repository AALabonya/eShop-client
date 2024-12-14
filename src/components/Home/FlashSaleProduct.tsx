// // "use server";

// // import { baseUrl1 } from "@/redux/api/appSlice";
// // import { Separator } from "../ui/separator";
// // import { IProduct } from "@/types/modal";
// // import { CiShoppingCart } from "react-icons/ci";
// // import { PiEyeLight, PiArrowsLeftRight } from "react-icons/pi";
// // import { getDiscountPrice } from "@/utils/product";

// // const FlashProduct = async () => {
// //   const res = await fetch(`${baseUrl1}/product/get?limit=10`, {
// //     next: {
// //       revalidate: 20 * 60, // 20 minutes
// //     },
// //   });

// //   const data = (await res.json()) as { data: IProduct[] };
// // //   / Filter products with discount > 0
// //   const DiscountProducts = data?.data?.filter(
// //     (product) => product.discount > 0
// //   );

// //   // console.log(DiscountProducts, "Discounted Products");

// //   return (
// //     <div className="w-full mt-[50px]">
// //       <h4 className="text-[25px] font-[700] text-mainTxt">Flash Sale Products</h4>
// //       <Separator className="my-[25px]" />
// //       <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
// //         {DiscountProducts?.map((product) => (
// //           <div
// //             key={product.id}
// //             className="group relative w-72 bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
// //           >
// //             <div className="relative h-64 w-full">
// //               <img
// //                 className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
// //                 src={product.images[0]}
// //                 alt={product.name}
// //               />
// //                <div className="absolute top-5 left-2">
// //   {product.discount&& (
// //       <span className="bg-red-600 text-white px-4 text-base py-1 rounded-tl-[15px] rounded-tr-none rounded-bl-none rounded-br-[15px]">
// //         {product.discount}% off
// //       </span>
// //     )}
// // </div>
// //             </div>

// //             <div className="p-4">
// //               <button className="text-white text-sm font-medium bg-[#7fad39] px-2 py-1 rounded-lg">
// //                 {product.categoryInfo?.name || "Unknown Category"}
// //               </button>
// //               <h1 className="text-lg font-semibold text-gray-800 mt-2">
// //                 {product.name}
// //               </h1>
// //               <div className="flex items-center gap-2 mb-1">
// //             <span className="text-red-500 text-lg font-bold">
// //               ${getDiscountPrice(product.price, product.discount)}
// //             </span>
// //             {product.discount > 0 && (
// //               <>
// //                 <span className="text-sm text-muted-foreground line-through">
// //                   ${product.price}
// //                 </span>
// //                 <span className="text-sm text-green-600">
// //                   {product.discount}% off
// //                 </span>
// //               </>
// //             )}
// //           </div>
// //             </div>

// //             <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// //               <div className="flex space-x-4">
// //                 <button className="flex items-center justify-center w-12 h-12 bg-white text-gray-800 rounded-full shadow-lg hover:bg-[#7fad39] hover:text-white transition">
// //                   <CiShoppingCart size={24} />
// //                 </button>

// //                 <button className="flex items-center justify-center w-12 h-12 bg-white text-gray-800 rounded-full shadow-lg hover:bg-[#7fad39] hover:text-white transition">
// //                   <PiEyeLight size={24} />
// //                 </button>

// //                 <button className="flex items-center justify-center w-12 h-12 bg-white text-gray-800 rounded-full shadow-lg hover:bg-[#7fad39] hover:text-white transition">
// //                   <PiArrowsLeftRight size={24} />
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default FlashProduct;
// "use client";

// import { Key, useEffect, useState } from "react";
// import {
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
// } from "@nextui-org/dropdown";
// import { Button } from "@nextui-org/button";

// import { GrCompare } from "react-icons/gr";
// import { BiFilterAlt } from "react-icons/bi";
// import { ImCross } from "react-icons/im";
// import Slider from "react-slider";
// ;
// import { Pagination } from "@nextui-org/pagination";
// import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
// import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
// import { ICategory, IProduct } from "@/types/modal";
// import Loading from "@/app/loading";
// import HomePageProductCard from "../HomePage/HomePageProductCard";


// const FlashProduct = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [dataPerPage, setDataPerPage] = useState(4);
//   const [queryObj, setQueryObj] = useState({
//     flashSale: false,
//     page: currentPage,
//     limit: dataPerPage,
//   });

//   const {
//     data: allProductsResponse,
//     isLoading,
//     refetch,
//   } = useGetAllProductsQuery(queryObj);

//   const totalPages = Math.ceil(
//     (allProductsResponse?.meta?.total || 0) / dataPerPage
//   );

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const updateDataPerPage = () => {
//     const width = window.innerWidth;

//     if (width >= 1280) {
//       setDataPerPage(8);
//     } else if (width >= 768 && width < 1280) {
//       setDataPerPage(6);
//     } else {
//       setDataPerPage(4);
//     }
//   };

//   useEffect(() => {
//     updateDataPerPage();
//     window.addEventListener("resize", updateDataPerPage);

//     return () => {
//       window.removeEventListener("resize", updateDataPerPage);
//     };
//   }, []);

//   useEffect(() => {
//     setQueryObj((prev) => ({
//       ...prev,
//       page: currentPage,
//       limit: dataPerPage,
//     }));

//     // Refetch data whenever queryObj changes
//     refetch();
//   }, [currentPage, dataPerPage, refetch]);

//   return (
//     <div className="pb-14 px-8">
//      <div className="">
//     <div className="items-end justify-between sm:flex">
//       <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
//      Flash Sale Products
//       </h2>

//       <div className=" flex gap-4 lg:mt-0">
//         <button
//           aria-label="Previous slide"
//           id="keen-slider-previous"
//           className="rounded-md border border-rose-600 px-3 py-1 text-rose-600 transition hover:bg-rose-600 hover:text-white"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="size-5 rtl:rotate-180"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//           </svg>
//         </button>

//         <button
//           aria-label="Next slide"
//           id="keen-slider-next"
//           className="rounded-md border border-rose-600 px-3 py-1 text-rose-600 transition hover:bg-rose-600 hover:text-white"
//         >
//           <svg
//             className="size-5 rtl:rotate-180"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M9 5l7 7-7 7"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
// </div>


//       <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
//         {isLoading
//           ? Array.from({ length: dataPerPage }).map((_, index) => (
//               <div key={index}>
//                 <Loading />
//               </div>
//             ))
//           : allProductsResponse?.data?.map((singleProduct: IProduct) => (
//               <div key={singleProduct.id}>
//                 <HomePageProductCard singleProduct={singleProduct} />
//               </div>
//             ))}
//       </div>

//       <div>
//         {allProductsResponse?.data?.length > 0 && (
//           <div className="flex justify-center items-center mt-4">
//             <Pagination
//               total={totalPages}
//               initialPage={1}
//               page={currentPage}
//               onChange={handlePageChange}
//               showControls
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default FlashProduct;
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";


import Loading from "@/app/loading";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { IProduct } from "@/types/modal";
import { useEffect, useState } from "react";
import HomePageProductCard from "../HomePage/HomePageProductCard";

const FlashSale = () => {
  const [dataPerPage, setDataPerPage] = useState(4);
  const [queryObj, setQueryObj] = useState({
    flashSale: true,
    limit: dataPerPage,
  });

  const {
    data: allProductsResponse,
    isLoading,
    refetch,
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

  return (
    <div className="pb-14 px-8">
         <div className="">
    <div className="items-end justify-between sm:flex">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
     Flash Sale Products
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

      <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
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

      <div className="flex justify-center items-center">
        <button className="relative h-12 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3">
          View All Flash Sale
        </button>
      </div>
    </div>
  );
};

export default FlashSale;
