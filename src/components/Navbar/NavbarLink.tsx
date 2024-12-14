"use client";
import React from "react";

import Link from "next/link";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";

const NavbarLink = ({ Home, name, link, path }:any) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Link href={link}>
              <span
                className={`text-gray-700 font-bold text-[20px] ${
                  path === "/" && link === "/"
                    ? "text-green-700 text-[20px]"
                    : path === "/shop" && link === "/shop"
                    ? "text-green-700 text-[20px]"
                    : path === "/shop" && link === "/"
                    ? "text-gray-500 text-[20px]"
                    : ""
                }`}
              >
                {name}
              </span>
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] text-[20px]">
              {Home?.map((component:any) => (
                <li key={component.title}>
                  <NavigationMenuLink asChild>
                    <a
                      href={component.path}
                      className={`block rounded-md p-3 hover:bg-green-100`}
                    >
                      <div className={`font-medium text-[20px]`}>{component.title}</div>
                      <p className="text-sm text-muted-foreground">
                        {component.description}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavbarLink;
