"use client";
import * as React from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Menu, Search, ShoppingCart, User, UserRound, X } from "lucide-react";

import { FaArrowRightArrowLeft } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {IoIosArrowForward } from "react-icons/io";
import {
  AiOutlineHeart,

  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CalendarDays } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Navbar from "../Navbar/Navbar";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useState, useEffect, useContext } from "react";


import { FaRegUser } from "react-icons/fa";
import useDebounce from "@/hooks/useDebounce";
import { useGetProductSuggestionQuery } from "@/redux/features/product/product.api";
import { useRouter } from "next/router";
import Cart from "../Navbar/Cart";
import { Button } from "../ui/button";
import { useAppSelector } from "@/redux/hook";
import { DropDown } from "../Navbar/DropdownMenu";

const HeaderSearch = () => {
    const path = usePathname();
    const [showSidebar, setShowSidebar] = useState(false);
    const { user } = useAppSelector((state) => state.auth);
    const { total } = useAppSelector((state) => state.cart);
  return (
    <div className="">
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
                            <Link href="/api/shop">SHOP</Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <Link
                              href="/api/bakery"
                              className={
                                path === "/api/bakery" ? "text-[#dcfce7]" : ""
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
                <div className="relative w-[70%] h-[50px]" >
          <form
    
        className="w-full h-full bg-white overflow-hidden flex items-center justify-between border-[1px] border-input  rounded-[8px]"
      >
        <input
          type="text"
          name="searchTerm"
          placeholder="Search..."
        
          className="w-full bg-transparent h-full outline-none border-none rounded-none pl-[7px]"
        />
        <Button className="bg-main h-full center px-[10px] shrink-0">
          <Search className="text-white" />
        </Button>
      </form>
     
    </div>
    <div className="center w-fit gap-[15px]">
          {user ? (
            <DropDown />
          ) : (
            <Link
              href={"/login"}
              className="flex items-center justify-start gap-[5px]"
            >
              <User height={30} width={35} />
              <span className="flex flex-col items-start justify-start">
                <span className="text-[14px] font-[600]">Login</span> Account
              </span>
            </Link>
          )}

          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="md:hidden flex menuBTn text-main"
          >
            {showSidebar ? <X /> : <Menu />}
          </button>
        </div>
                </div>

                {/* cart section */}
              </div>
              <div>
                <Link href="">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link">
                      {/* onClick={() => setOpenWishlist(true)}  */}
              <div  >
                          <div className="bg-[#fff1ee] w-[45px] relative h-[45px] flex justify-center items-center rounded-full">
                          <Link href="/compare">
                  <FaArrowRightArrowLeft className="text-[21px] text-gray-500 font-bold" />
                </Link>

                          </div>
                        </div>
                        {/* onClick={() => setOpenWishlist(true)} */}
                      <div  >
                          <div className="bg-[#fff1ee] w-[45px] relative h-[45px] flex justify-center items-center rounded-full">
                          <AiOutlineHeart size={60} className="text-gray-600 font-bold"/>
                            
                            <span className="bg-[#7fad39] top-[-2px] right-[-3px] absolute w-[18px] h-[18px] flex justify-center items-center rounded-full text-white">
                               0
                            </span>
                          </div>
                        </div>
                        {/* onClick={() => setOpenCart(true)} */}
                        <div  >
                          <div className="bg-[#fff1ee] w-[45px] relative h-[45px] flex justify-center items-center rounded-full">
                            {/* <AiOutlineShoppingCart className="text-red-400" size={20} /> */}
                            <Link
        href={`/cart`}
        onClick={() => setShowSidebar(false)}
        className={`w-full px-[15px] py-[8px] rounded-[5px] mt-[15px] flex items-center justify-between gap-[15px] text-main`}
      >
        <span className="flex items-center gap-[15px]">
        <Image src="https://goatmoves.com/assets/images/static/cart.svg" width={20} height={10} alt="" className="text-red-200"/>
          <span className="text-[13px] ml-[5px]">Cart</span>
        </span>
        <span>${total.toFixed(2)}</span>
      </Link>
                            <span className="bg-[#7fad39] top-[-2px] right-[-3px] absolute w-[18px] h-[18px] flex justify-center items-center rounded-full text-white">
                               0
                            </span>
                          </div>
                        </div>
                       
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-1">
                       
                          : "No Product Here"
                      </div>
                    </HoverCardContent>
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
      {/* {openCart && <Cart setOpenCart={setOpenCart} openCart={openCart} />} */}
      {/* {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />} */}
    </div>
  );
};

export default HeaderSearch;