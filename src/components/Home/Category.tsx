"use client"
import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Import your icon library
import Link from "next/link";
import Image from "next/image";



import { ICategory } from "@/types/modal";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import PageTitleForHome from "../shared/PageTitle";

const CustomPrevArrow = ({ onClick }: any) => (
  <div
    className="prev-arrow absolute bg-[#80b500] rounded-full top-1/2 z-40 transform -translate-y-1/2 left-0 cursor-pointer"
    onClick={onClick}
  >
    <FiChevronLeft color="white" size={24} />
  </div>
);

const CustomNextArrow = ({ onClick }: any) => (
  <div
    className="next-arrow absolute bg-[#80b500] rounded-full top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
    onClick={onClick}
  >
    <FiChevronRight color="white" size={24} />
  </div>
);

const Category = () => {
  const { data: allCategories, isLoading } =useGetAllCategoriesQuery(undefined);
  console.log(allCategories,"aalll");
  // const data = [
  //   {
  //     category: "Electronics",
  //     image: "https://img.freepik.com/free-vector/wireless-technology-devices-isometric-icons-set_1284-15264.jpg?t=st=1733306230~exp=1733309830~hmac=f9c396a8b412eedca46dce7efb91a8205c7bdfb687ae816808736475c7f3e4a4&w=740",
  //   },
  //   {
  //     category: "Fashion",
  //     image: "https://img.freepik.com/free-photo/portrait-young-woman-black-floppy-hat-isolated-white-wall_231208-1310.jpg?t=st=1733306106~exp=1733309706~hmac=207ae9bee8e9f9e3c7b20709b454d8efa2617e190c4c5ad33df4ffe4b048b817&w=900",
  //   },
  //   {
  //     category: "Home Decor",
  //     image: "https://img.freepik.com/free-photo/calming-room-design-with-green-plants_23-2149155790.jpg?t=st=1733305879~exp=1733309479~hmac=ccc890188e587e3a01f3f6c609160279a0634c54da3d7557220cda5e8c01d091&w=900",
  //   },
  //   {
  //     category: "Books",
  //     image: "https://img.freepik.com/free-vector/watercolor-world-book-day-concept_52683-36016.jpg?t=st=1733306026~exp=1733309626~hmac=f72950c590cb33374bf60818406be025d359e8d7b6810c2af92af76fbf9f1460&w=740",
  //   },
  //   {
  //     category: "Toys",
  //     image: "https://img.freepik.com/premium-vector/various-childrens-toys-inside-outside-toy-box_110279-499.jpg?w=740",
  //   },
  //   {
  //     category: "Beauty",
  //     image: "https://img.freepik.com/premium-photo/flower-hair-woman-beauty-skin-hair_431835-1442.jpg?w=900",
  //   },
  //   {
  //     category: "Groceries",
  //     image: "https://img.freepik.com/free-photo/basket-full-vegetables_1112-316.jpg?ga=GA1.1.925241992.1713107280&semt=ais_hybrid",
  //   },
  // ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7, // Set the number of products to show by default
    slidesToScroll: 2,
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 940,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
 <div className="py-12">
     <header className="flex flex-col md:flex-row items-center justify-between">
                        <h2 className="lg:text-4xl text-3xl md:mb-10 font-bold tracking-tight text-gray-900 lg:text-start text-center ">
                            Our Categories
                        </h2>
                    </header>
       <div className="bg-gray-100 pt-5">
        
        <div className="py-4 px-2 lg:px-16 overflow-hidden">
          <Slider
            className="grid bg-gray-200 px-2 py-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-7"
            {...settings}
          >
            {allCategories?.map((category: ICategory, index: number) => (
              <Link
                key={index}
                className="bg-slate-100 p-4"
                href={`/shop?category=${category.label}`}
              >
                <div>
                  <div className="bg-[#fff] relative shadow-md hover:border-4 hover:border-[#80b500] hover:duration-300 border h-[140px] w-[90%] rounded-md">
                    <div className="text-center mx-auto w-[90]">
                      <Image
                      width={100}
                      height={200}
                        className="w-[130px] opacity-90 hover:opacity-100 h-[110px] object-cover rounded-md mt-3 mx-auto hover:duration-700 transition-all hover:scale-110"
                        src={category.image}
                        alt={category.label}
                      />
                    </div>
                  </div>
                  <p className="text-center font-medium mt-1">
                    {category.label}
                  </p>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
 </div>
  );
};

export default Category;
