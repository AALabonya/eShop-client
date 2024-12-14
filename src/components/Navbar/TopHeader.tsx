"use client";

import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { TiSocialFacebook } from "react-icons/ti";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub, FaLinkedin, FaRegUser } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

const TopHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleNotAvailable = () => {
    alert("Sorry!! This functionality is not added yet 😔");
  };

  return (
    <div>
      <div className="hidden lg:flex pt-2 lg:px-12 flex-col lg:flex-row justify-between">
        <div>
          <p className="lg:flex hidden gap-1 items-center mt-2 font-semibold text-[15px] text-gray-500">
            <MdOutlineMarkEmailUnread /> Email: eShop@gmail.com
          </p>
        </div>
        <div className="flex mx-auto md:mx-auto lg:mx-0 gap-2">
          <Link
            href="/register"
            className="flex py-1 gap-1 ml-4 cursor-pointer hover:border-red-500 duration-300 text-[14px] font-semibold items-center border-gray-400 px-2"
          >
            <FaRegUser /> Become a Seller
          </Link>

          <div className="border-r-2 border-gray-300 h-7 flex justify-center items-center mt-2"></div>

          <div className="relative z-10 border-gray-300">
            <button
              onClick={handleDropdownToggle}
              className="flex gap-2 items-center px-4 text-[14px] py-2 rounded focus:outline-none"
            >
              <Image className="w-[20px]" src="/us.png" width={20} height={5} alt="" />{" "}
              English <FaAngleDown />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 text-[14px] w-28 px-2 text-left py-2 h-28 z-[99999999] cursor-pointer bg-white border border-gray-300 rounded shadow-md">
                <p
                  onClick={handleNotAvailable}
                  className="flex hover:bg-gray-200 p-1 hover:shadow-md duration-500 gap-2 mb-1 items-center"
                >
                  <img className="w-[20px]" src="/us.png" width={20} height={5} alt="" />{" "}
                  English{" "}
                </p>
                <p
                  onClick={handleNotAvailable}
                  className="flex hover:bg-gray-200 p-1 hover:shadow-md duration-500 gap-2 mb-1 items-center"
                >
                  <img className="w-[20px]" src="/bd.png" width={20} height={5} alt="" />{" "}
                  বাংলা{" "}
                </p>
              </div>
            )}
          </div>

          <div className="border-r-2 border-gray-300 h-7 flex justify-center items-center mt-2"></div>

          <div className="flex items-center gap-1 lg:gap-2">
            <a target="_blank" href="https://www.facebook.com">
              <TiSocialFacebook className="text-[20px] lg:text-[25px]" />
            </a>
            <a target="_blank" href="https://twitter.com/">
              <BsTwitterX className="text-[14px] lg:text-[17px]" />
            </a>

            <a target="_blank" href="https://linkedin.com/">
              <FaLinkedin className="text-[14px] lg:text-[17px]" />
            </a>

            <a target="_blank" href="https://github.com">
              <FaGithub className=" text-[15px] lg:text-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
