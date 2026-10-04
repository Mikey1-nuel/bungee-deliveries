"use client";

import { useQuery } from "@apollo/client/react";
import { GET_ADMIN_STATS } from "@/graphql/queries/admin.queries";
import { GetAdminStatsResponse } from "@/app/types/type";
import Link from "next/link";

const statCards = [
  {
    key: "totalUsers",
    label: "Total Users",
    icon: "👥",
    href: "/dashboard/admin/users",
  },
  {
    key: "totalRestaurants",
    label: "Total Restaurants",
    icon: "🍽️",
    href: "/dashboard/admin/restaurants",
  },
  {
    key: "totalOrders",
    label: "Total Orders",
    icon: "📦",
    href: "/dashboard/admin/orders",
  },
  {
    key: "pendingOrders",
    label: "Pending Orders",
    icon: "⏳",
    href: "/dashboard/admin/orders",
  },
  {
    key: "deliveredToday",
    label: "Delivered Today",
    icon: "✅",
    href: "/dashboard/admin/orders",
  },
  {
    key: "newUsersToday",
    label: "New Users Today",
    icon: "🆕",
    href: "/dashboard/admin/users",
  },
];

export default function AdminOverviewPage() {
  const { data, loading } = useQuery<GetAdminStatsResponse>(GET_ADMIN_STATS);
  const stats = data?.getAdminStats;

  return (
    <main className="bg-white rounded-t-3xl p-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#391713]">Admin Overview</h1>
        <p className="text-gray-500">Platform-wide statistics</p>
      </div>

      {/* REVENUE BANNER */}
      <div className="bg-gradient-to-r from-[#E95322] to-orange-400 rounded-2xl p-6 mb-6 text-white">
        <p className="text-sm font-medium opacity-80">Total Platform Revenue</p>
        {loading ? (
          <div className="h-9 w-36 bg-white/20 rounded animate-pulse mt-1" />
        ) : (
          <p className="text-3xl font-bold mt-1">
            ₦{(stats?.totalRevenue ?? 0).toLocaleString()}
          </p>
        )}
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="border border-orange-100 rounded-2xl p-4 bg-[#FFF9F7] hover:border-[#E95322] transition"
          >
            <p className="text-xl mb-1">{card.icon}</p>
            <p className="text-xs text-gray-500">{card.label}</p>
            {loading ? (
              <div className="h-7 w-12 bg-orange-100 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-2xl font-bold text-[#391713] mt-0.5">
                {stats?.[card.key as keyof typeof stats] ?? 0}
              </p>
            )}
          </Link>
        ))}
      </div>

      {/* QUICK NAV */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Manage Users", href: "/dashboard/admin/users", icon: "👥" },
          {
            label: "Manage Restaurants",
            href: "/dashboard/admin/restaurants",
            icon: "🍽️",
          },
          {
            label: "View All Orders",
            href: "/dashboard/admin/orders",
            icon: "📦",
          },
          {
            label: "Manage Riders",
            href: "/dashboard/admin/riders",
            icon: "🛵",
          },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 border border-orange-100 rounded-2xl px-4 py-3 text-sm font-semibold text-[#391713] hover:bg-[#FFF1EB] transition"
          >
            <span className="text-lg">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
