"use client";

import { BiMenuAltLeft } from "react-icons/bi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { ICategory } from "@/types/modal";



const Navbar = () => {
  const path = usePathname();
  const { data: allCategories, } = useGetAllCategoriesQuery(undefined);
// console.log(allCategories,"llll");
  const params = new URLSearchParams();
 
  return (
    <div className={path === "/dashboard" ? "hidden" : ""}>
      <div className={`md:flex hidden items-center justify-between`}>
        <div>
          <Select >
            <SelectTrigger className="w-[220px] px-4 bg-[#80b500] text-white font-bold rounded-lg">
            <BiMenuAltLeft
              size={30}  className="text-white font-bold"/>
              <SelectValue placeholder="ALL CATEGORIES" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>CATEGORIES</SelectLabel>
               {allCategories?.map((category:ICategory) => (
                                            <Link
                                                key={category?.id}
                                             href={`/allProducts?${params.toString()}`}
                                                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                                            >
                                                {category?.name}
                                            </Link>
                                        ))
                                      }
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
            href="/flashSale"
            className={path === "/about" ? "bg-gray-200 font-bold" : ""}
          >
            <button className="text-[18px] font-bold hover:bg-gray-200 flex text-gray-700 items-center gap-2 px-[15px] py-[5px]  uppercase rounded-md">
              <span>
               
              </span>{" "}
           Flash Sale
            </button>
          </Link>

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
