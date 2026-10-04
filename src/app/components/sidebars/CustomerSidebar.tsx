"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LogoutModal from "../logOutModal";
// import { useApolloClient, useMutation } from "@apollo/client/react";
// import { LOGOUT_MUTATION } from "@/graphql/mutations/auth";
// import { forceLogout } from "@/utils/logout";
import { useAuth } from "@/context/authContext";
import { useNotificationStore } from "@/app/store/notificationStore";

const navItems = [
  {
    name: "My Orders",
    href: "/dashboard/orderHistory",
    imgurl: "/shopping-bag.png",
  },
  { name: "My Profile", href: "/dashboard/myProfile", imgurl: "/user (1).png" },
  {
    name: "Delivery Address",
    href: "/dashboard/deliveryAddress",
    imgurl: "/location (2).png",
  },
  {
    name: "Payment Methods",
    href: "/dashboard/paymentMethods",
    imgurl: "/payment-method.png",
  },
  { name: "Contact Us", href: "/dashboard/contactUs", imgurl: "/phone.png" },
  { name: "Help & FAQs", href: "/dashboard/help&Faqs", imgurl: "/faq.png" },
  {
    name: "Settings",
    href: "/dashboard/settings",
    imgurl: "/settings (1).png",
  },
];

export default function CustomerSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { unreadCount } = useNotificationStore();

  return (
    <aside className="sidebar relative w-64 h-full overflow-y-auto flex flex-col items-start justify-start gap-8 px-4 py-6 bg-[#E95322] text-white">
      <div className="flex items-center gap-x-2">
        <div className="rounded-xl p-2 bg-gradient-to-r from-yellow-500 to-orange-600">
          <Image src="/user (3).png" alt="User" width={25} height={25} />
        </div>
        <div>
          <h2 className="text-xl font-extrabold">{user?.fullName}</h2>
          <p className="text-[12px] text-[#F3E9B5]">{user?.email}</p>
        </div>
      </div>

      <nav className="flex flex-col gap-y-4 w-full">
        <h4 className="text-[10px] uppercase text-gray-300">Main</h4>
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard/restaurant_dash"
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + "/");

          const isNotif = item.href === "/dashboard/notifications";

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-x-3 text-[13px] py-2 px-4 rounded-[8px] transition-colors duration-200 font-semibold ${
                isActive
                  ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Image
                src={item.imgurl}
                alt={item.name}
                width={30}
                height={30}
                className="bg-white p-[5px] rounded-[10px]"
              />
              <span>{item.name}</span>
              {isNotif && unreadCount > 0 && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-[#E95322] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <nav className="fixed bottom-3">
        <div
          onClick={() => setOpen(true)}
          className="flex items-center gap-x-4 text-[13px] py-2 px-4 rounded-[8px] cursor-pointer"
        >
          <Image
            src="/logout.png"
            alt="Logout"
            width={30}
            height={30}
            className="bg-white p-[5px] rounded-[10px]"
          />
          <span className="text-white hover:text-gray-200 font-semibold">
            Log Out
          </span>
        </div>
      </nav>

      <LogoutModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={logout}
        loading={false}
      />
    </aside>
  );
}
