"use client";
import React, { useContext, useEffect, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";



const Navbar = () => {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  

  // useEffect(() => {
  //   if (data) {
  //     console.log('Categories:', data?.data);
  //   }
  //   if (error) {
  //     console.log('Error:', error);
  //   }
  // }, [data, error]);
  // useEffect(() => {
  //   const handleOutsideClick = (event: MouseEvent) => {
  //     // event target
  //     const target = event.target as HTMLElement;
  //     // screent width
  //     // return if the user click on the drawer or the navbar
  //     if (target.closest("")) {
  //       return;
  //     }

  //     setOpen(false);
  //   };

  //   // hide sidebar on clicking outside
  //   if (open) {
  //     document.body.addEventListener("mousedown", handleOutsideClick);
  //   } else {
  //     document.body.removeEventListener("mousedown", handleOutsideClick);
  //   }

  //   return () => {
  //     document.body.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, [open, setOpen]);

  // Handle categories loading and error states
  // if (isLoading) {
  //   return <div>Loading categories...</div>;
  // }

  // if (error) {
  //   return <div>Error fetching categories</div>;
  // }
  return (
    <div className={path === "/dashboard" ? "hidden" : ""}>
      <div className={`md:flex hidden items-center justify-between`}>
        <div>
          <Select >
            <SelectTrigger className="w-[220px] px-4 bg-[#80b500] text-white rounded-lg">
            <BiMenuAltLeft
              size={30} />
              <SelectValue placeholder="ALL CATEGORIES" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>CATEGORIES</SelectLabel>
                {/* {data?.data.map((category:any) => (
          <li key={category.id}>
            <img src={category.image} alt={category.name} width={50} />
            <p>{category.name}</p>
          </li>
        ))} */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex md:flex-wrap items-center gap-2 text-[18px]">
        <Link
            href="/"
            className={path === "/" ? "bg-gray-200 font-bold rounded-lg" : ""}
          >
            <button className="text-[18px] font-bold   hover:bg-gray-200 flex text-gray-700 items-center gap-2 px-[15px] py-[5px] uppercase rounded-lg">
              <span>
               
              </span>{" "}
            HOME
            </button>
          </Link>
          <Link
            href="/all-products"
            className={path === "/all-products" ? "bg-gray-200 font-bold" : ""}
          >
            <button className="text-[18px] font-bold hover:bg-gray-200 flex text-gray-700 items-center gap-2 px-[15px]  py-[5px] uppercase rounded-md">
              <span>
               
              </span>{" "}
           PRODUCTS
            </button>
          </Link>
          <Link
            href="/shop"
            className={path === "/about" ? "bg-gray-200 font-bold" : ""}
          >
            <button className="text-[18px] font-bold hover:bg-gray-200 flex text-gray-700 items-center gap-2 px-[15px] py-[5px]  uppercase rounded-md">
              <span>
               
              </span>{" "}
           Shop
            </button>
          </Link>

          {/* <Link
            href="/flashSale"
            className={path === "/flashSale" ? "bg-gray-200 font-bold" : ""}
          >
            <button className="text-[18px] font-bold hover:bg-gray-200 flex text-gray-700 items-center gap-2 px-[15px] py-[5px] uppercase rounded-md">
              <span>
              
              </span>{" "}
         Flash Sale
            </button>
          </Link> */}

          <Link
            href="/news"
            className={path === "/news" ? "bg-gray-200 font-bold" : ""}
          >
            <button className="text-[18px] font-bold hover:bg-gray-200 text-gray-700  px-[15px] py-[5px]  uppercase rounded-md">
              News
            </button>
          </Link>

          <Link
            href="/blog"
            className={path === "/blog" ? "bg-gray-200 font-bold" : ""}
          >
            <button className="text-[18px] font-bold hover:bg-gray-200 px-[15px] text-gray-700 py-[5px] uppercase rounded-md">
              Blog
            </button>
          </Link>
          <Link
            href="/contact"
            className={path === "/contact" ? "bg-gray-200 font-bold" : ""}
          >
            <button className="text-[18px] font-bold hover:bg-gray-200 px-[15px] text-gray-700 py-[5px] uppercase rounded-md">
              Contact
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
