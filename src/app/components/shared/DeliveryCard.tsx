"use client";

import { OrderStatus } from "@/app/types/type";

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

interface DeliveryCardOrder {
  id: string;
  status: OrderStatus;
  total: number;
  deliveryAddress: string;
  createdAt: string;
  restaurant: { name: string };
  customer?: { fullName: string; phone?: string }; // ← optional
  items: { menu: { name: string }; quantity: number }[];
}

interface DeliveryCardProps {
  order: DeliveryCardOrder;
  actions?: React.ReactNode;
}

export default function DeliveryCard({ order, actions }: DeliveryCardProps) {
  return (
    <div className="border border-orange-100 rounded-2xl bg-[#FFF9F7] overflow-hidden">
      <div className="bg-[#FFF5EE] px-4 py-3 flex justify-between items-center">
        <div>
          <p className="font-semibold text-sm text-[#391713]">
            #{order.id.slice(0, 8)}
          </p>
          <p className="text-xs text-gray-500">{order.restaurant.name}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${
              statusStyles[order.status] ?? "bg-gray-100 text-gray-600"
            }`}
          >
            {order.status.replace(/_/g, " ")}
          </span>
          <p className="text-sm font-bold text-[#E95322]">
            ₦{order.total.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="px-4 py-3 space-y-1">
        <p className="text-xs text-gray-500">📍 {order.deliveryAddress}</p>

        {order.customer && (
          <p className="text-xs text-gray-500">
            👤 {order.customer.fullName}
            {order.customer.phone && ` · ${order.customer.phone}`}
          </p>
        )}

        <p className="text-xs text-gray-400">
          {order.items.map((i) => `${i.menu.name} (${i.quantity})`).join(", ")}
        </p>

        <p className="text-xs text-gray-400">
          {new Date(Number(order.createdAt)).toLocaleString(undefined, {
            weekday: "short",
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {actions && <div className="px-4 pb-4 flex gap-2">{actions}</div>}
    </div>
  );
}
