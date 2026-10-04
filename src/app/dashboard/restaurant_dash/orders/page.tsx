"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import OrdersTable from "@/app/components/orders/OrdersTable";
import { GET_RESTAURANT_ORDERS } from "@/graphql/queries/order.queries";
import { GetRestaurantOrdersResponse, OrderStatus } from "@/app/types/type";

export default function RestaurantOrdersPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState<OrderStatus | undefined>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, loading, error, refetch } =
    useQuery<GetRestaurantOrdersResponse>(GET_RESTAURANT_ORDERS, {
      variables: {
        page,
        limit: 20,
        search: debouncedSearch || null,
        status: status || null,
      },
    });

  const pagination = data?.getRestaurantOrders;
  const orders = pagination?.orders ?? [];

  if (error) return <main className="p-10">{error.message}</main>;

  return (
    <main className="bg-white rounded-t-3xl p-8 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#391713]">Orders</h1>
        <p className="text-gray-500">Manage and track all incoming orders</p>
      </div>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search customer or order ID..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E95322]/30"
        />
        <select
          value={status ?? ""}
          onChange={(e) => {
            setPage(1);
            setStatus(
              e.target.value ? (e.target.value as OrderStatus) : undefined,
            );
          }}
          className="border rounded-lg p-3 focus:outline-none"
        >
          <option value="">All Orders</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="preparing">Preparing</option>
          <option value="ready_for_pickup">Ready For Pickup</option>
          <option value="picked_up">Picked Up</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-400">Loading orders...</div>
      ) : (
        <OrdersTable orders={orders} refetch={refetch} />
      )}

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Page {pagination?.page ?? 1} of {pagination?.totalPages ?? 1}
        </p>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="border rounded px-4 py-2 text-sm disabled:opacity-40"
          >
            Previous
          </button>
          <button
            disabled={page >= (pagination?.totalPages ?? 1)}
            onClick={() => setPage((p) => p + 1)}
            className="border rounded px-4 py-2 text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
