"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client/react";
import { useSearchParams } from "next/navigation";
import { GET_MY_ORDERS } from "@/graphql/queries/order.queries";
import { UPDATE_ORDER_STATUS } from "@/graphql/mutations/order.mutations";
import { useCart } from "@/app/components/cartContext";
import { UserOrder, MenuType } from "@/app/types/type";

const ORDER_FILTERS = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export default function OrderHistoryPage() {
  const { addItem, cartItems } = useCart();
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("highlight");

  const [activeFilter, setActiveFilter] = useState("all");
  const highlightRef = useRef<HTMLDivElement | null>(null);

  const { data, loading, refetch } = useQuery<{ getMyOrders: UserOrder[] }>(
    GET_MY_ORDERS,
  );
  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS);

  const orders = data?.getMyOrders || [];

  const filteredOrders = useMemo(() => {
    if (activeFilter === "active") {
      return orders.filter((o) =>
        [
          "pending",
          "accepted",
          "preparing",
          "ready_for_pickup",
          "picked_up",
        ].includes(o.status),
      );
    }
    if (activeFilter === "completed")
      return orders.filter((o) => o.status === "delivered");
    if (activeFilter === "cancelled")
      return orders.filter((o) => ["cancelled", "rejected"].includes(o.status));
    return orders;
  }, [activeFilter, orders]);

  // Scroll to highlighted order once data loads
  useEffect(() => {
    if (highlightId && highlightRef.current) {
      highlightRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [highlightId, filteredOrders]);

  const handleCancelOrder = async (orderId: string) => {
    try {
      await updateOrderStatus({ variables: { orderId, status: "cancelled" } });
      toast.success("Order cancelled");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to cancel order");
    }
  };

  const handleReorder = (order: UserOrder) => {
    try {
      const existingRestaurantId = cartItems[0]?.restaurant_id;
      if (
        existingRestaurantId &&
        existingRestaurantId !== order.restaurant.id
      ) {
        toast.error("You already have items from another restaurant in cart");
        return;
      }

      order.items.forEach((item) => {
        addItem({
          id: crypto.randomUUID(),
          restaurant_menu_id: item.restaurant_menu_id,
          restaurant_id: order.restaurant.id,
          restaurant_name: order.restaurant.name,
          menu_name: item.menu.name,
          menu_type: item.menu.type as MenuType,
          menu_image: item.menu.image,
          unit_price: item.unit_price,
          quantity: item.quantity,
          total_price: item.total_price,
        });
      });

      toast.success("Items added to cart");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) return <div className="p-10">Loading orders...</div>;

  return (
    <div className="bg-white rounded-[30px_30px_0_0] p-[35px_45px] flex flex-col gap-6 min-h-screen">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-semibold text-[#391713]">Order History</h2>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {ORDER_FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm capitalize transition ${
              activeFilter === filter.value
                ? "bg-[#E95322] text-white"
                : "bg-[#FFF1EB] text-[#E95322]"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="flex flex-col gap-6">
          {filteredOrders.map((order) => {
            const isHighlighted = order.id === highlightId;
            const canCancel = order.status === "pending";
            const canTrack = [
              "accepted",
              "preparing",
              "ready_for_pickup",
              "picked_up",
            ].includes(order.status);
            const canReorder = ["delivered", "cancelled", "rejected"].includes(
              order.status,
            );

            return (
              <div
                key={order.id}
                ref={isHighlighted ? highlightRef : null}
                className={`border rounded-2xl overflow-hidden transition-all duration-500 ${
                  isHighlighted
                    ? "border-[#E95322] shadow-lg shadow-orange-100 ring-2 ring-[#E95322]/30"
                    : "border-orange-100"
                }`}
              >
                <div className="bg-[#FFF5EE] p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{order.restaurant.name}</h3>
                    <p className="text-xs text-gray-500">
                      {order.deliveryAddress}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(Number(order.createdAt)).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="capitalize text-sm font-medium">
                      {order.status.replace(/_/g, " ")}
                    </span>
                    <p className="font-semibold text-[#E95322]">
                      ₦{order.total.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center"
                      >
                        <div className="flex gap-4">
                          <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={item.menu.image || "/placeholder.png"}
                              alt={item.menu.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold">{item.menu.name}</h4>
                            <p className="text-xs text-gray-400 capitalize">
                              {item.menu.type}
                            </p>
                            <p className="text-sm">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-semibold">
                          ₦{item.totalPrice.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    {canCancel && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-full text-sm"
                      >
                        Cancel Order
                      </button>
                    )}
                    {canTrack && (
                      <button className="bg-[#FFF1EB] text-[#E95322] px-4 py-2 rounded-full text-sm">
                        Track Order
                      </button>
                    )}
                    {canReorder && (
                      <button
                        onClick={() => handleReorder(order)}
                        className="bg-[#E95322] text-white px-4 py-2 rounded-full text-sm"
                      >
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
