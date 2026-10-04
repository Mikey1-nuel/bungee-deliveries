"use client";

import { useQuery } from "@apollo/client/react";
import { GET_LOGISTICS_OVERVIEW } from "@/graphql/queries/logistics.queries";
import { GetLogisticsOverviewResponse } from "@/app/types/type";
import Link from "next/link";

export default function LogisticsOverviewPage() {
  const { data, loading } = useQuery<GetLogisticsOverviewResponse>(
    GET_LOGISTICS_OVERVIEW,
  );

  const overview = data?.getLogisticsOverview;

  const cards = [
    { label: "Total Riders", value: overview?.totalRiders ?? 0 },
    { label: "Online Riders", value: overview?.onlineRiders ?? 0 },
    { label: "Total Deliveries", value: overview?.totalDeliveries ?? 0 },
    { label: "Pending Assignments", value: overview?.pendingAssignments ?? 0 },
  ];

  return (
    <main className="bg-white rounded-t-3xl p-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#391713]">
          Logistics Overview
        </h1>
        <p className="text-gray-500">Fleet and delivery management</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="border border-orange-100 rounded-2xl p-4 h-20 animate-pulse bg-orange-50"
              />
            ))
          : cards.map((card) => (
              <div
                key={card.label}
                className="border border-orange-100 rounded-2xl p-4 bg-[#FFF9F7]"
              >
                <p className="text-xs text-gray-500 mb-1">{card.label}</p>
                <p className="text-xl font-bold text-[#391713]">{card.value}</p>
              </div>
            ))}
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href="/dashboard/logistics/riders"
          className="flex items-center justify-between bg-[#E95322] text-white px-5 py-4 rounded-2xl font-semibold"
        >
          <span>🛵 Manage Riders</span>
          <span>→</span>
        </Link>
        <Link
          href="/dashboard/logistics/orders"
          className="flex items-center justify-between border border-orange-100 text-[#391713] px-5 py-4 rounded-2xl font-semibold"
        >
          <span>📦 Assign Orders</span>
          <span>→</span>
        </Link>
      </div>
    </main>
  );
}
