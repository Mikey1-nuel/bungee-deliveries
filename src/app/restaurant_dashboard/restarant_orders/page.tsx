"use client";

import { useState } from "react";

import { useQuery } from "@apollo/client/react";

import OrdersTable from "@/app/components/orders/OrdersTable";

import { GET_RESTAURANT_ORDERS } from "@/graphql/queries/order.queries";

import { GetRestaurantOrdersResponse, OrderStatus } from "@/app/types/type";

export default function RestaurantOrdersPage() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<OrderStatus | undefined>();

  const { data, loading, error, refetch } =
    useQuery<GetRestaurantOrdersResponse>(GET_RESTAURANT_ORDERS, {
      variables: {
        page,
        limit: 20,
        search: search || null,
        status: status || null,
      },
    });

    console.log(data?.getRestaurantOrders);

  const pagination = data?.getRestaurantOrders;

  const orders = pagination?.orders ?? [];

  console.log("pagination:", pagination);
console.log("orders:", orders);  // Add this — what does it print?

  if (loading) {
    return <main className="p-10">Loading orders...</main>;
  }

  if (error) {
    return <main className="p-10">{error.message}</main>;
  }

  return (
    <main
      className="
        bg-white
        rounded-t-3xl
        p-8
        min-h-screen
      "
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Restaurant Orders</h1>

        <p className="text-gray-500">Manage incoming orders</p>
      </div>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search customer or order ID..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="
            flex-1
            border
            rounded-lg
            p-3
          "
        />

        <select
          value={status ?? ""}
          onChange={(e) => {
            setPage(1);

            setStatus(
              e.target.value ? (e.target.value as OrderStatus) : undefined,
            );
          }}
          className="
            border
            rounded-lg
            p-3
          "
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

      <OrdersTable orders={orders} refetch={refetch} />

      <div
        className="
          mt-6
          flex
          items-center
          justify-between
        "
      >
        <div>
          Page {pagination?.page ?? 1}
          {" of "}
          {pagination?.totalPages ?? 1}
        </div>

        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="
              border
              rounded
              px-4
              py-2
            "
          >
            Previous
          </button>

          <button
            disabled={page >= (pagination?.totalPages ?? 1)}
            onClick={() => setPage((prev) => prev + 1)}
            className="
              border
              rounded
              px-4
              py-2
            "
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
