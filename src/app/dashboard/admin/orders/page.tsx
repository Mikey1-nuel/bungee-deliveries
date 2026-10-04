// src/app/dashboard/admin/orders/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ADMIN_ORDERS } from "@/graphql/queries/admin.queries";
import { GET_ADMIN_RIDERS } from "@/graphql/queries/admin.queries";
import {
  AdminOrdersResponse,
  AdminOrder,
  AdminRidersResponse,
  OrderStatus,
} from "@/app/types/type";
import AdminSearchBar from "@/app/components/admin/AdminSearchBar";
import AdminPagination from "@/app/components/admin/AdminPagination";
import AdminOrderActions from "@/app/components/admin/AdminOrderActions";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-blue-100   text-blue-700",
  preparing: "bg-orange-100 text-orange-700",
  ready_for_pickup: "bg-purple-100 text-purple-700",
  picked_up: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100  text-green-700",
  cancelled: "bg-red-100    text-red-600",
  rejected: "bg-gray-100   text-gray-600",
};

export default function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debounced, setDebounced] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "">("");

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const { data, loading, refetch } = useQuery<AdminOrdersResponse>(
    GET_ADMIN_ORDERS,
    {
      variables: {
        page,
        limit: 20,
        search: debounced || null,
        status: statusFilter || null,
      },
    },
  );

  const { data: ridersData } = useQuery<AdminRidersResponse>(GET_ADMIN_RIDERS, {
    variables: { page: 1, limit: 100, search: null },
  });

  const orders = data?.getAdminOrders.orders ?? [];
  const pagination = data?.getAdminOrders.pagination;
  const riders = ridersData?.getAdminRiders.riders ?? [];

  return (
    <main className="bg-white rounded-t-3xl p-8 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#391713]">All Orders</h1>
        <p className="text-gray-500">{pagination?.total ?? 0} total orders</p>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="flex-1">
          <AdminSearchBar
            value={searchInput}
            onChange={setSearchInput}
            placeholder="Search by customer name or order ID..."
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as OrderStatus | "");
            setPage(1);
          }}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="preparing">Preparing</option>
          <option value="ready_for_pickup">Ready for Pickup</option>
          <option value="picked_up">Picked Up</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-400">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="py-10 text-center text-gray-400">No orders found</div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order: AdminOrder) => (
            <div
              key={order.id}
              className="border border-gray-100 rounded-2xl p-4 bg-white"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-semibold text-sm text-[#391713]">
                      #{order.id.slice(0, 8)}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${
                        statusStyles[order.status] ??
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    🍽️ {order.restaurant.name}
                    <span className="mx-1.5 text-gray-300">·</span>
                    👤 {order.customer.fullName}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {order.deliveryAddress}
                  </p>
                  <p className="text-xs text-gray-400">
                    {order.createdAt
                      ? new Date(Number(order.createdAt)).toLocaleString()
                      : "—"}
                  </p>
                  <p className="text-sm font-bold text-[#E95322] mt-1">
                    ₦{order.total.toLocaleString()}
                  </p>
                </div>

                <AdminOrderActions
                  orderId={order.id}
                  currentStatus={order.status}
                  assignedRider={order.rider ?? null} // ← pass rider
                  riders={riders}
                  onUpdate={refetch}
                />
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
