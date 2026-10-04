"use client";

import { useQuery } from "@apollo/client/react";
import {
  GET_MY_EARNINGS,
  GET_MY_DELIVERIES,
} from "@/graphql/queries/rider.queries";
import {
  GetMyEarningsResponse,
  GetMyDeliveriesResponse,
} from "@/app/types/type";

export default function RiderEarningsPage() {
  const { data: earningsData, loading: earningsLoading } =
    useQuery<GetMyEarningsResponse>(GET_MY_EARNINGS);

  const { data: deliveriesData, loading: deliveriesLoading } =
    useQuery<GetMyDeliveriesResponse>(GET_MY_DELIVERIES);

  const earnings = earningsData?.getMyEarnings;
  const delivered = (deliveriesData?.getMyDeliveries ?? []).filter(
    (o) => o.status === "delivered",
  );

  const loading = earningsLoading || deliveriesLoading;

  const summaryCards = [
    {
      label: "Today's Deliveries",
      value: earnings?.todayDeliveries ?? 0,
      sub: "completed today",
    },
    {
      label: "Today's Earnings",
      value: `₦${(earnings?.todayEarnings ?? 0).toLocaleString()}`,
      sub: "earned today",
    },
    {
      label: "Total Deliveries",
      value: earnings?.totalDeliveries ?? 0,
      sub: "all time",
    },
    {
      label: "Total Earnings",
      value: `₦${(earnings?.totalEarnings ?? 0).toLocaleString()}`,
      sub: "all time",
    },
  ];

  return (
    <main className="bg-white rounded-t-3xl p-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#391713]">Earnings</h1>
        <p className="text-gray-500">Your delivery earnings summary</p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="border border-orange-100 rounded-2xl p-4 bg-[#FFF9F7]"
          >
            {loading ? (
              <div className="h-8 w-20 bg-orange-100 rounded animate-pulse" />
            ) : (
              <>
                <p className="text-xs text-gray-500 mb-1">{card.label}</p>
                <p className="text-xl font-bold text-[#391713]">{card.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* RECENT DELIVERED ORDERS */}
      <div className="mb-4">
        <h2 className="text-base font-semibold text-[#391713]">
          Recent Deliveries
        </h2>
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-400">Loading...</div>
      ) : delivered.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <p className="text-4xl mb-3">💰</p>
          <p className="font-medium text-sm">No completed deliveries yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {delivered.slice(0, 10).map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border border-orange-100 rounded-xl p-4 bg-[#FFF9F7]"
            >
              <div>
                <p className="text-sm font-semibold text-[#391713]">
                  #{order.id.slice(0, 8)}
                </p>
                <p className="text-xs text-gray-500">{order.restaurant.name}</p>
                <p className="text-xs text-gray-400">
                  {order.delivered_at
                    ? new Date(Number(order.delivered_at)).toLocaleString()
                    : new Date(Number(order.created_at)).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-600">
                  ₦{order.total.toLocaleString()}
                </p>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  Delivered
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
