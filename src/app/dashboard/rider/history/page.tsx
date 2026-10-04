"use client";

import { useQuery } from "@apollo/client/react";
import { GET_MY_DELIVERIES } from "@/graphql/queries/rider.queries";
import { GetMyDeliveriesResponse, RiderDelivery } from "@/app/types/type";
import DeliveryCard from "@/app/components/shared/DeliveryCard";

const DONE_STATUSES = ["delivered", "cancelled"];

export default function RiderHistoryPage() {
  const { data, loading } =
    useQuery<GetMyDeliveriesResponse>(GET_MY_DELIVERIES);

  const history = (data?.getMyDeliveries ?? []).filter((o) =>
    DONE_STATUSES.includes(o.status),
  );

  if (loading)
    return <main className="p-10 text-gray-400">Loading history...</main>;

  return (
    <main className="bg-white rounded-t-3xl p-8 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#391713]">Delivery History</h1>
        <p className="text-gray-500">{history.length} completed</p>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">📋</p>
          <p className="font-medium">No delivery history yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {history.map((order: RiderDelivery) => (
            <DeliveryCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </main>
  );
}
