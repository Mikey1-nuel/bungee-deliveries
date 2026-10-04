"use client"
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const footItems = [
  {
    name: "Home",
    href: "/dashboard",
    imgurl: "/home (1).png",
  },
  {
    name: "Menu",
    href: "/dashboard/menus",
    imgurl: "/tray.png",
  },
  {
    name: "Restaurants",
    href: "/dashboard/restaurants",
    imgurl: "/dinner2.png",
  },
  {
    name: "Favorites",
    href: "/dashboard/favorites",
    imgurl: "/heart (1).png",
  },
  {
    name: "Support",
    href: "/dashboard/support",
    imgurl: "/support.png",
  },
];

const Footer = () => {
  const pathname = usePathname();
  return (
    <main className="bg-[#E95322] rounded-[30px_30px_0_0] py-[10px] flex justify-center items-center gap-[50px]">
      {footItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-x-4 text-[13px] py-2 px-4 rounded-[8px] transition-colors duration-200 ${
            pathname === item.href
              ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white"
              : "text-white hover:text-gray-200 dark:text-white dark:hover:text-blue-300 font-[600]"
          }`}
          aria-current={pathname === item.href ? "page" : undefined}
        >
          <Image
            src={item.imgurl}
            alt={`${item.name} icon`}
            width={30}
            height={30}
            // className="bg-white p-[5px] rounded-[10px]"
          />
        </Link>
      ))}
    </main>
  );
};

export default Footer;
