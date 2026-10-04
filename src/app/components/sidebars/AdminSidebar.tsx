"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutModal from "../logOutModal";
import { useAuth } from "@/context/authContext";
import { useNotificationStore } from "@/app/store/notificationStore";
import CreateUserModal from "../admin/CreateUserModal";

const navItems = [
  { name: "Overview", href: "/dashboard/admin", icon: "📊" },
  { name: "Users", href: "/dashboard/admin/users", icon: "👥" },
  { name: "Restaurants", href: "/dashboard/admin/restaurants", icon: "🍽️" },
  { name: "Orders", href: "/dashboard/admin/orders", icon: "📦" },
  { name: "Riders", href: "/dashboard/admin/riders", icon: "🛵" },
  { name: "Logistics", href: "/dashboard/admin/logistics", icon: "🏢" },
  { name: "Dispatch", href: "/dashboard/admin/dispatch", icon: "🚀" },
  { name: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
  { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
];

export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [createUser, setCreateUser] = useState(false);
  const { unreadCount } = useNotificationStore();

  return (
    <aside className="sidebar relative w-64 h-full overflow-y-auto flex flex-col gap-6 px-4 py-6 bg-[#E95322] text-white">
      <div>
        <h2 className="text-xl font-extrabold">{user?.fullName}</h2>
        <p className="text-[11px] text-[#F3E9B5]">Admin Dashboard</p>
      </div>

      {/* CREATE USER BUTTON */}
      <button
        onClick={() => setCreateUser(true)}
        className="w-full bg-white/15 hover:bg-white/25 text-white text-sm font-semibold py-2 px-4 rounded-xl transition flex items-center gap-2"
      >
        <span>➕</span>
        <span>Create Account</span>
      </button>

      <nav className="flex flex-col gap-y-1 w-full">
        <h4 className="text-[10px] uppercase text-white/60 mb-1">
          Admin Panel
        </h4>
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard/admin"
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
              <span className="text-lg">{item.icon}</span>
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

      <div className="fixed bottom-3">
        <div
          onClick={() => setOpen(true)}
          className="flex items-center gap-x-3 text-[13px] py-2 px-4 cursor-pointer hover:bg-white/10 rounded-[8px]"
        >
          <span className="text-lg">🚪</span>
          <span className="font-semibold">Log Out</span>
        </div>
      </div>

      <LogoutModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={logout}
        loading={false}
      />

      <CreateUserModal
        open={createUser}
        onClose={() => setCreateUser(false)}
        onSuccess={() => {
          setCreateUser(false);
        }}
      />
    </aside>
  );
}
