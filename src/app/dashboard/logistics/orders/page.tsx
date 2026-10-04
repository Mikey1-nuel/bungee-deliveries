"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_RESTAURANT_ORDERS } from "@/graphql/queries/order.queries";
import {
  GET_LOGISTICS_RIDERS,
  ASSIGN_RIDER_TO_ORDER,
} from "@/graphql/queries/logistics.queries";
import {
  GetRestaurantOrdersResponse,
  GetLogisticsRidersResponse,
  RiderWithStats,
  Order,
} from "@/app/types/type";
import DeliveryCard from "@/app/components/shared/DeliveryCard";
import toast from "react-hot-toast";

export default function LogisticsOrdersPage() {
  const [assigningOrderId, setAssigningOrderId] = useState<string | null>(null);

  const {
    data: ordersData,
    loading,
    refetch,
  } = useQuery<GetRestaurantOrdersResponse>(GET_RESTAURANT_ORDERS, {
    variables: { page: 1, limit: 50, status: "ready_for_pickup", search: null },
  });

  const { data: ridersData } =
    useQuery<GetLogisticsRidersResponse>(GET_LOGISTICS_RIDERS);

  const [assignRider] = useMutation(ASSIGN_RIDER_TO_ORDER);

  const orders = ordersData?.getRestaurantOrders?.orders ?? [];
  const riders = (ridersData?.getLogisticsRiders ?? []).filter(
    (r: RiderWithStats) => r.isAvailable,
  );

  const handleAssign = async (orderId: string, riderId: string) => {
    try {
      await assignRider({ variables: { orderId, riderId } });
      toast.success("Rider assigned");
      setAssigningOrderId(null);
      refetch();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  if (loading)
    return <main className="p-10 text-gray-400">Loading orders...</main>;

  return (
    <main className="bg-white rounded-t-3xl p-8 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#391713]">Assign Orders</h1>
        <p className="text-gray-500">{orders.length} orders ready for pickup</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">📦</p>
          <p className="font-medium">No orders ready for assignment</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order: Order) => (
            <DeliveryCard
              key={order.id}
              order={order}
              actions={
                assigningOrderId === order.id ? (
                  <div className="flex flex-col gap-2 w-full">
                    <p className="text-xs text-gray-500 font-medium">
                      Select an available rider:
                    </p>
                    {riders.length === 0 ? (
                      <p className="text-xs text-red-400">
                        No riders available
                      </p>
                    ) : (
                      riders.map((rider: RiderWithStats) => (
                        <button
                          key={rider.id}
                          onClick={() => handleAssign(order.id, rider.id)}
                          className="flex items-center justify-between bg-[#FFF1EB] border border-orange-200 rounded-xl px-3 py-2 text-sm hover:bg-orange-100 transition"
                        >
                          <span className="font-medium text-[#391713]">
                            {rider.fullName}
                          </span>
                          <span className="text-xs text-green-600 font-semibold">
                            Assign →
                          </span>
                        </button>
                      ))
                    )}
                    <button
                      onClick={() => setAssigningOrderId(null)}
                      className="text-xs text-gray-400 hover:text-gray-600 mt-1 text-left"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setAssigningOrderId(order.id)}
                    className="flex-1 bg-[#E95322] text-white py-2 rounded-full text-sm font-semibold"
                  >
                    Assign Rider
                  </button>
                )
              }
            />
          ))}
        </div>
      )}
    </main>
  );
}
