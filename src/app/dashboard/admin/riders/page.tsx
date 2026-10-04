"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ADMIN_RIDERS } from "@/graphql/queries/admin.queries";
import { AdminRidersResponse, AdminRider } from "@/app/types/type";
import AdminSearchBar from "@/app/components/admin/AdminSearchBar";
import AdminPagination from "@/app/components/admin/AdminPagination";

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

export default function AdminRidersPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const { data, loading } = useQuery<AdminRidersResponse>(GET_ADMIN_RIDERS, {
    variables: { page, limit: 20, search: debounced || null },
    pollInterval: 30000, // refresh every 30s so online status stays current
  });

  const riders = data?.getAdminRiders.riders ?? [];
  const pagination = data?.getAdminRiders.pagination;

  return (
    <main className="bg-white rounded-t-3xl p-8 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#391713]">Riders</h1>
        <p className="text-gray-500">{pagination?.total ?? 0} total riders</p>
      </div>

      <div className="mb-4">
        <AdminSearchBar
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Search by name or phone..."
        />
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-400">Loading riders...</div>
      ) : riders.length === 0 ? (
        <div className="py-10 text-center text-gray-400">No riders found</div>
      ) : (
        <div className="flex flex-col gap-3">
          {riders.map((rider: AdminRider) => (
            <div
              key={rider.id}
              className="border border-gray-100 rounded-2xl p-4 bg-white flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="font-semibold text-sm text-[#391713]">
                  {rider.fullName}
                </p>
                <p className="text-xs text-gray-500">
                  {rider.phone} · {rider.email}
                </p>
                {rider.logisticsCompany && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    🏢 {rider.logisticsCompany.name}
                  </p>
                )}
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
                      ? "bg-blue-100 text-blue-700"
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

      <AdminPagination
        page={page}
        totalPages={pagination?.totalPages ?? 1}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />
    </main>
  );
}
