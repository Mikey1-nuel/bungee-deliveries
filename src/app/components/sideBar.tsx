"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LogoutModal from "./logOutModal";
import { useRouter } from "next/navigation";

import {
  useApolloClient,
  useMutation,
} from "@apollo/client/react";

import { LOGOUT_MUTATION } from "@/graphql/mutations/auth";

import { forceLogout } from "@/utils/logout";
import { useAuth } from "@/context/authContext";
import "../globals.css";

const navItems = [
  {
    name: "My Orders",
    href: "/dashboard/orderHistory",
    imgurl: "/shopping-bag.png",
    imgurl2: "/shopping-bag.png",
  },
  {
    name: "My Profile",
    href: "/dashboard/myProfile",
    imgurl: "/user (1).png",
    imgurl2: "/user (1).png",
  },
  {
    name: "Delivery Address",
    href: "/dashboard/deliveryAddress",
    imgurl: "/location (2).png",
    imgurl2: "/location (2).png",
  },
  {
    name: "Payment Methods",
    href: "/dashboard/paymentMethods",
    imgurl: "/payment-method.png",
    imgurl2: "/payment-method.png",
  },
  {
    name: "Contact Us",
    href: "/dashboard/contactUs",
    imgurl: "/phone.png",
    imgurl2: "/phone.png",
  },
  {
    name: "Help & FAQs",
    href: "/dashboard/help&Faqs",
    imgurl: "/faq.png",
    imgurl2: "/faq.png",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    imgurl: "/settings (1).png",
    imgurl2: "/settings (1).png",
  },
];

const navLogout = [
  {
    name: "Log Out",
    action: "logout",
    imgurl: "/logout.png",
    imgurl2: "/logout.png",
  },
];

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const client = useApolloClient();

  const [logoutMutation, { loading }] =
    useMutation(LOGOUT_MUTATION);

  const handleLogout =
  async () => {
    try {
      await logoutMutation();
    } catch (err) {
      console.error(
        "LOGOUT ERROR:",
        err
      );
    }

    await forceLogout();
  };

  return (
    <aside className="sidebar relative w-64 h-full overflow-y-auto flex flex-col items-start justify-start gap-8 px-4 py-6 bg-[#E95322] dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="flex items-center gap-x-2">
        <div className="rounded-xl p-2 bg-gradient-to-r from-yellow-500 to-orange-600">
          <Image src="/user (3).png" alt="User icon" width={25} height={25} />
        </div>
        <div className="text-white">
          <h2 className="text-xl font-extrabold">{user?.fullName}</h2>
          <p className="text-[12px] text-[#F3E9B5]">{user?.email}</p>
        </div>
      </div>
      <nav className="flex flex-col gap-y-4 text-gray-500">
        <h4 className="text-[10px] uppercase text-gray-300">Main</h4>
        {navItems.map((item) => (
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
              src={pathname === item.href ? item.imgurl2 : item.imgurl}
              alt={`${item.name} icon`}
              width={30}
              height={30}
              className="bg-white p-[5px] rounded-[10px]"
            />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <nav className="fixed bottom-3 flex flex-col gap-y-4 text-gray-500">
        {navLogout.map((item) => (
          <div
            key={item.name}
            onClick={() => setOpen(true)}
            className="flex items-center gap-x-4 text-[13px] py-2 px-4 rounded-[8px] transition-colors duration-200 cursor-pointer"
          >
            <Image
              src={item.imgurl}
              alt={`${item.name} icon`}
              width={30}
              height={30}
              className="bg-white p-[5px] rounded-[10px]"
            />
            <span className="text-white hover:text-gray-200 dark:text-white dark:hover:text-blue-300 font-[600]">{item.name}</span>
          </div>
        ))}
      </nav>

      <LogoutModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleLogout}
        loading={loading}
      />
    </aside>
  );
}
