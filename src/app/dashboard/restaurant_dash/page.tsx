"use client";

import { useQuery } from "@apollo/client/react";
import {
  GET_RESTAURANT_ORDERS,
  GET_RESTAURANT_ORDER_STATS,
} from "@/graphql/queries/order.queries";
import {
  GetRestaurantOrdersResponse,
  GetRestaurantOrderStatsResponse,
} from "@/app/types/type";
import Link from "next/link";

const statCards = [
  {
    key: "pending",
    label: "Pending",
    color: "bg-yellow-50  border-yellow-200  text-yellow-700",
  },
  {
    key: "accepted",
    label: "Accepted",
    color: "bg-blue-50    border-blue-200    text-blue-700",
  },
  {
    key: "preparing",
    label: "Preparing",
    color: "bg-orange-50  border-orange-200  text-orange-700",
  },
  {
    key: "readyForPickup",
    label: "Ready for Pickup",
    color: "bg-purple-50  border-purple-200  text-purple-700",
  },
  {
    key: "deliveredToday",
    label: "Delivered Today",
    color: "bg-green-50   border-green-200   text-green-700",
  },
  {
    key: "revenueToday",
    label: "Revenue Today",
    color: "bg-red-50     border-red-200     text-[#E95322]",
    isRevenue: true,
  },
];

export default function RestaurantOverviewPage() {
  const { data: statsData, loading: statsLoading } =
    useQuery<GetRestaurantOrderStatsResponse>(GET_RESTAURANT_ORDER_STATS);

  const { data: ordersData, loading: ordersLoading } =
    useQuery<GetRestaurantOrdersResponse>(GET_RESTAURANT_ORDERS, {
      variables: { page: 1, limit: 5, search: null, status: null },
    });

  const stats = statsData?.getRestaurantOrderStats;
  const recentOrders = ordersData?.getRestaurantOrders?.orders ?? [];

  return (
    <main className="bg-white rounded-t-3xl p-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#391713]">Overview</h1>
        <p className="text-gray-500">Your restaurant at a glance</p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {statCards.map((card) => (
          <div
            key={card.key}
            className={`border rounded-2xl p-5 ${card.color}`}
          >
            <p className="text-sm font-medium mb-1">{card.label}</p>
            {statsLoading ? (
              <div className="h-7 w-12 bg-gray-200 rounded animate-pulse" />
            ) : (
              <p className="text-2xl font-bold">
                {card.isRevenue
                  ? `₦${(stats?.[card.key as keyof typeof stats] ?? 0).toLocaleString()}`
                  : (stats?.[card.key as keyof typeof stats] ?? 0)}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* RECENT ORDERS */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#391713]">Recent Orders</h2>
        <Link
          href="/dashboard/restaurant_dash/orders"
          className="text-sm text-[#E95322] hover:underline font-medium"
        >
          View all →
        </Link>
      </div>

      {ordersLoading ? (
        <div className="py-10 text-center text-gray-400">Loading...</div>
      ) : recentOrders.length === 0 ? (
        <p className="text-gray-400 text-sm">No orders yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border border-orange-100 rounded-xl p-4 bg-[#FFF9F7]"
            >
              <div>
                <p className="font-semibold text-sm text-[#391713]">
                  #{order.id.slice(0, 8)}
                </p>
                <p className="text-xs text-gray-500">
                  {order.customer?.fullName}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(Number(order.createdAt)).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "accepted"
                        ? "bg-blue-100   text-blue-700"
                        : order.status === "preparing"
                          ? "bg-orange-100 text-orange-700"
                          : order.status === "delivered"
                            ? "bg-green-100  text-green-700"
                            : order.status === "cancelled"
                              ? "bg-red-100    text-red-600"
                              : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.status.replace(/_/g, " ")}
                </span>
                <p className="text-sm font-bold text-[#E95322]">
                  ₦{order.total.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
