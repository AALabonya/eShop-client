
"use client";
import * as React from "react";
import Image from "next/image";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaArrowRightArrowLeft, FaRegUser } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Navbar from "../Navbar/Navbar";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useState, useEffect, useContext } from "react";

import Cart from "../Navbar/Cart";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import {  useAppSelector } from "@/redux/hooks";
import { totalProductsCount } from "@/redux/features/products/productSlice";
import NavSearchProductCard from "../Home/NavSearchCard";
import { IProduct } from "@/types/modal";
import Loading from "@/app/loading";
import ProductComparison from "../productComparison/ProductComparison";
import { selectCompareProducts } from "@/redux/features/productCompare/compareSlice";
import useUserDetails from "@/hooks/userUser";
import { UserDropDown } from "../Navbar/UserDropDown";

const Header = () => {

  const path = usePathname();

  const { userData } = useUserDetails();
  console.log(userData?.userData?.role,"check role");
  
  const totalProductInCart = useAppSelector(totalProductsCount);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const productsForComparison = useAppSelector(selectCompareProducts);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { data: allProductsResponse, isLoading } = useGetAllProductsQuery(
    {
      searchTerm: debouncedSearchTerm,
    },
    {
      skip: !debouncedSearchTerm,
    }
  );

  // Debounce implementation using setTimeout for search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  console.log(allProductsResponse);
  const handleClickOutside = (event: MouseEvent) => {
    const searchInput = document.querySelector("#search-input");
    
    // Check if the click is outside the search input and close search if true
    if (searchInput && !searchInput.contains(event.target as Node)) {
      setSearchTerm(""); // Clear search term
      setIsSearchOpen(false); // Close search dropdown
    }
  };
  
  useEffect(() => {
    // Add event listener to detect clicks outside
    document.addEventListener("click", handleClickOutside);
  
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); 
  
  
  
  
  return (
    <div className={path === "/api/dashboard" ? "hidden" : ""}>
      <div className="px-2 md:px-0">
        <div className="border-b-[1px] border-t-[1px] pb-3 md:pb-3  pt-1">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex gap-12 items-center">
                  <div className="flex gap-2 items-center cursor-pointer">
                    <div className="md:hidden lg:hidden flex">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild className="border-none">
                          <Button variant="outline">
                            <Menu className="text-gray-600" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Link href="/">HOME</Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <Link
                              href="/contact"
                              className={
                                path === "/contact" ? "text-[#dcfce7]" : ""
                              }
                            >
                              <button className="text-[14px]  text-gray-700  uppercase ">
                               Contact
                              </button>
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            {" "}
                            <Link
                              href="/api/beverages"
                              className={
                                path === "/api/beverages"
                                  ? "text-[#dcfce7]"
                                  : ""
                              }
                            >
                              <button className="text-[14px]   text-gray-700 uppercase ">
                                About
                              </button>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              href="/api/foodDrinks"
                              className={
                                path === "/api/foodDrinks"
                                  ? "text-[#dcfce7]"
                                  : ""
                              }
                            >
                              <button className="text-[14px] text-gray-700   uppercase ">
                                News
                              </button>
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <Link
                              href="/api/blog"
                              className={
                                path === "/api/blog" ? "text-[#dcfce7]" : ""
                              }
                            >
                              <button className="text-[14px] text-gray-700 uppercase ">
                                Blog
                              </button>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              href="/api/contact"
                              className={
                                path === "/api/contact" ? "text-[#dcfce7]" : ""
                              }
                            >
                              <button className="text-[14px] text-gray-700  uppercase ">
                                Contact
                              </button>
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="md:flex hidden">
                      <Image
                        src="/favicon.ico.png"
                        className="md:w-[100px] w-[100px] pt-2"
                        width={170}
                        height={50}
                        alt="logo"
                      />
                    </div>
                    <div>
                      <h2 className="md:text-2xl text-[16px] font-bold">
                       eShop
                      </h2>
                      <p className="text-sm text-gray-400 hidden md:flex">
                        Online Shopping
                      </p>
                    </div>
                  </div>
                 
                </div>
                <div className="lg:flex  items-center hidden ml-[100px] gap-6">
                  <div>
              
                    <div className="relative search-container">
                    <input
  id="search-input"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  onFocus={() => setIsSearchOpen(true)}
  onClick={(e) => e.stopPropagation()}  // Prevent click from propagating
  className="bg-[#f3f4f7] outline-none px-8 py-3 rounded-md md:w-[440px] xl:w-[600px]"
  type="text"
  placeholder="Search for products..."
/>

   <div className="absolute right-6 cursor-pointer top-4">
                        <Search className="text-gray-600" />
                      </div>
  {isSearchOpen && (
    <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-10">
      <div className="grid grid-cols-1 gap-1 justify-center items-center">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <Loading />
              </div>
            ))
          : allProductsResponse?.data?.map((singleProduct: IProduct) => (
              <div key={singleProduct.id}>
                <NavSearchProductCard singleProduct={singleProduct} />
              </div>
            ))}
      </div>
    </div>
  )}
</div>

                  </div>
               
                </div>

                {/* cart section */}
              </div>
              <div>
                <Link href="">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="flex justify-center items-center gap-6">
                      <div>
                   {isLoading ? (
              <div className="animate-pulse w-10 h-10 rounded-full bg-gray-400" />
            ) : userData ? (
              <UserDropDown user={userData} />
            ) : (
              <Link href="/login">
                <div className="hidden md:block">
               <div className=" flex  justify-center items-center gap-2 border-4 border-[#80b500] rounded-lg px-2 py-1.5">
               <div>
               <FaRegUser className="hover:text-red-400 font-semibold duration-300" />
               </div>
               <div className="font-bold">  Login</div>
               </div>
                </div>
              </Link>
            )}
                  </div>
                <div  onClick={() => setOpenWishlist(true)}>
                          <div    className="bg-[#fff1ee] w-[45px] relative h-[45px] flex justify-center items-center rounded-full">
                          {/* <Link href={"/"}>     </Link> */}
                  <FaArrowRightArrowLeft className="text-[21px] text-gray-500 font-bold" />
                  <span className="bg-[#7fad39] top-[-2px] right-[-3px] absolute w-[18px] h-[18px] flex justify-center items-center rounded-full text-white">
               {productsForComparison.length}
                            </span>
           
                         
                          </div>
                        </div>
                   
                        <div  onClick={() => setOpenCart(true)}>
                          <div className="bg-[#fff1ee] w-[45px] relative h-[45px] flex justify-center items-center rounded-full">
                     
                            <Image src="https://goatmoves.com/assets/images/static/cart.svg" width={20} height={10} alt="" className="text-red-200"/>
                            {totalProductInCart > 0 && (
                            <span className="bg-[#7fad39] top-[-2px] right-[-3px] absolute w-[18px] h-[18px] flex justify-center items-center rounded-full text-white">
                            {totalProductInCart}
                            </span>
                            )}
                          </div>
                        </div>

                      </div>
                    </HoverCardTrigger>
                    {/* <HoverCardContent className="w-80">
                      <div className="space-y-1">
                       
                          : "No Product Here"
                      </div>
                    </HoverCardContent> */}
                  </HoverCard>
                </Link>
              </div>
            </div>
            <div className="mt-0 lg:mt-4">
              <Navbar />
            </div>
          </div>
        </div>
      </div>
      {openCart && <Cart setOpenCart={setOpenCart} openCart={openCart} />}
       {openWishlist && <ProductComparison setOpenWishlist={setOpenWishlist} openWishlist={openWishlist} />} 
    </div>
  );
};

export default Header;