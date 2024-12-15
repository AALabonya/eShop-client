import { ISideBarState } from "@/app/(dashboard)/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUserDetails from "@/hooks/userUser";
import { useAppSelector } from "@/redux/hooks";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMenu } from "react-icons/io5";

const DashboardHeader: React.FC<ISideBarState> = ({ setIsOpen }) => {
  const { userData } = useUserDetails();
  
  console.log(userData?.userData?.role,"userData");
  return (
    <div className="w-full h-[70px] flex items-center justify-between px-[20px]  py-[10px] border-b shrink-0">
      <Link href="/">
        <Image
          width={80}
          height={70}
          src="/favicon.ico.png"
          alt="logo"
          className="w-[90px] md:flex hidden"
        />
      </Link>

      <Button
        className="menuBTn flex md:hidden"
        onClick={() => setIsOpen(true)}
        variant={"ghost"}
      >
        <IoMenu />
      </Button>
      <div className="flex items-center justify-end gap-[8px]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={userData?.userData?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="user avatar" />
              <AvatarFallback>
                <p className="text-muted-foreground uppercase">
            {    userData?.userData?.name}
                 
                </p>
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={"/"}>Home</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
