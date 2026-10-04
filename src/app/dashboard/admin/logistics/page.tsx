"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ADMIN_LOGISTICS } from "@/graphql/queries/admin.queries";
import {
  AdminLogisticsResponse,
  AdminLogisticsCompany,
} from "@/app/types/type";
import AdminSearchBar from "@/app/components/admin/AdminSearchBar";
import AdminPagination from "@/app/components/admin/AdminPagination";

export default function AdminLogisticsPage() {
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

  const { data, loading } = useQuery<AdminLogisticsResponse>(
    GET_ADMIN_LOGISTICS,
    {
      variables: { page, limit: 20, search: debounced || null },
    },
  );

  const companies = data?.getAdminLogistics.logistics ?? [];
  const pagination = data?.getAdminLogistics.pagination;

  return (
    <main className="bg-white rounded-t-3xl p-8 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#391713]">
          Logistics Companies
        </h1>
        <p className="text-gray-500">
          {pagination?.total ?? 0} companies registered
        </p>
      </div>

      <div className="mb-4">
        <AdminSearchBar
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Search by company name or phone..."
        />
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-400">Loading...</div>
      ) : companies.length === 0 ? (
        <div className="py-10 text-center text-gray-400">
          <p className="text-4xl mb-3">🏢</p>
          <p className="font-medium text-sm">No logistics companies yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {companies.map((lc: AdminLogisticsCompany) => (
            <div
              key={lc.id}
              className="border border-gray-100 rounded-2xl p-4 bg-white"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm text-[#391713]">
                    {lc.name}
                  </p>
                  {lc.contactPhone && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {lc.contactPhone}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    Registered {new Date(Number(lc.createdAt)).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-3 text-center shrink-0">
                  <div className="flex gap-2 text-center shrink-0 flex-wrap">
                    <div className="bg-[#FFF9F7] border border-orange-100 rounded-xl px-3 py-2">
                      <p className="text-lg font-bold text-[#391713]">
                        {lc.totalRiders}
                      </p>
                      <p className="text-[10px] text-gray-500">Total</p>
                    </div>
                    <div className="bg-green-50 border border-green-100 rounded-xl px-3 py-2">
                      <p className="text-lg font-bold text-green-700">
                        {lc.onlineRiders}
                      </p>
                      <p className="text-[10px] text-gray-500">Online</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">
                      <p className="text-lg font-bold text-blue-700">
                        {lc.availableRiders}
                      </p>
                      <p className="text-[10px] text-gray-500">Available</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-100 rounded-xl px-3 py-2">
                      <p className="text-lg font-bold text-orange-700">
                        {lc.busyRiders}
                      </p>
                      <p className="text-[10px] text-gray-500">Busy</p>
                    </div>
                  </div>
                </div>
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
