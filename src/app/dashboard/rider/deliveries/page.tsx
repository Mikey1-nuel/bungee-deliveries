"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import { GET_MY_DELIVERIES } from "@/graphql/queries/rider.queries";
import { UPDATE_ORDER_STATUS } from "@/graphql/mutations/order.mutations";
import { GetMyDeliveriesResponse, RiderDelivery } from "@/app/types/type";
import DeliveryCard from "@/app/components/shared/DeliveryCard";
import toast from "react-hot-toast";

const ACTIVE_STATUSES = ["ready_for_pickup", "picked_up"];

export default function RiderDeliveriesPage() {
  const { data, loading, refetch } =
    useQuery<GetMyDeliveriesResponse>(GET_MY_DELIVERIES);

  const [updateStatus] = useMutation(UPDATE_ORDER_STATUS);

  const deliveries = (data?.getMyDeliveries ?? []).filter((o) =>
    ACTIVE_STATUSES.includes(o.status),
  );

  const handleAction = async (orderId: string, status: string) => {
    try {
      await updateStatus({ variables: { orderId, status } });
      toast.success("Status updated");
      refetch();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  if (loading)
    return <main className="p-10 text-gray-400">Loading deliveries...</main>;

  return (
    <main className="bg-white rounded-t-3xl p-8 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#391713]">Active Deliveries</h1>
        <p className="text-gray-500">{deliveries.length} active</p>
      </div>

      {deliveries.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">🛵</p>
          <p className="font-medium">No active deliveries</p>
          <p className="text-sm">You're all caught up!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {deliveries.map((order: RiderDelivery) => (
            <DeliveryCard
              key={order.id}
              order={order}
              actions={
                <>
                  {order.status === "ready_for_pickup" && (
                    <button
                      onClick={() => handleAction(order.id, "picked_up")}
                      className="flex-1 bg-[#E95322] text-white py-2 rounded-full text-sm font-semibold"
                    >
                      Mark Picked Up
                    </button>
                  )}
                  {order.status === "picked_up" && (
                    <button
                      onClick={() => handleAction(order.id, "delivered")}
                      className="flex-1 bg-green-500 text-white py-2 rounded-full text-sm font-semibold"
                    >
                      Mark Delivered
                    </button>
                  )}
                </>
              }
            />
          ))}
        </div>
      )}
    </main>
  );
}
