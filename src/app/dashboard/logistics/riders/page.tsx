"use client";

import { useQuery } from "@apollo/client/react";
import { GET_LOGISTICS_RIDERS } from "@/graphql/queries/logistics.queries";
import { GetLogisticsRidersResponse, RiderWithStats } from "@/app/types/type";

const formatLastSeen = (lastSeen?: string): string => {
  if (!lastSeen) return "Never";
  const diff = Date.now() - new Date(lastSeen).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

export default function LogisticsRidersPage() {
  const { data, loading } = useQuery<GetLogisticsRidersResponse>(
    GET_LOGISTICS_RIDERS,
    {
      pollInterval: 30000, // refresh every 30s so online status stays current
    },
  );

  const riders = data?.getLogisticsRiders ?? [];

  if (loading)
    return <main className="p-10 text-gray-400">Loading riders...</main>;

  return (
    <main className="bg-white rounded-t-3xl p-8 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#391713]">Riders</h1>
        <p className="text-gray-500">{riders.length} riders in your fleet</p>
      </div>

      {riders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">🛵</p>
          <p className="font-medium">No riders yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {riders.map((rider: RiderWithStats) => (
            <div
              key={rider.id}
              className="flex items-center justify-between border border-orange-100 rounded-2xl p-4 bg-[#FFF9F7]"
            >
              <div className="min-w-0">
                <p className="font-semibold text-sm text-[#391713]">
                  {rider.fullName}
                </p>
                <p className="text-xs text-gray-500">{rider.phone}</p>
                <p className="text-xs text-gray-400">
                  {rider.totalDeliveries} deliveries · Last seen:{" "}
                  {formatLastSeen(rider.lastSeen)}
                </p>
              </div>

              {/* Two separate badges — online presence vs manual availability */}
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    rider.isOnline
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100  text-gray-500"
                  }`}
                >
                  {rider.isOnline ? "🟢 Online" : "⚫ Offline"}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    rider.isAvailable
                      ? "bg-blue-100  text-blue-700"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {rider.isAvailable ? "Available" : "Busy"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
