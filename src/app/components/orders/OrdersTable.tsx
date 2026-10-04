"use client";

import { Order } from "@/app/types/type";

import OrderStatusBadge from "./OrderStatusBadge";

import OrderActions from "./OrderActions";

interface Props {
  orders: Order[];

  refetch: () => void;
}

export default function OrdersTable({ orders, refetch }: Props) {
  console.log("orders type:", typeof orders, Array.isArray(orders), orders);
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Order</th>

            <th className="p-4 text-left">Customer</th>

            <th className="p-4 text-left">Items</th>

            <th className="p-4 text-left">Total</th>

            <th className="p-4 text-left">Address</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-left">Date</th>

            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="p-4">#{order.id.slice(0, 8)}</td>

              <td className="p-4">{order.customer?.fullName || "N/A"}</td>

              <td className="p-4">
                <div className="flex flex-col gap-1">
                  {order.items.map((item) => (
                    <div key={item.id}>
                      {item.menu?.name} ({item.quantity})
                    </div>
                  ))}
                </div>
              </td>

              <td className="p-4">₦{order.total.toLocaleString()}</td>

              <td className="p-4">{order.deliveryAddress}</td>

              <td className="p-4">
                <OrderStatusBadge status={order.status} />
              </td>

              <td className="p-4">
                {new Date(Number(order.createdAt)).toLocaleString()}
              </td>

              <td className="p-4">
                <OrderActions
                  orderId={order.id}
                  status={order.status}
                  refetch={refetch}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
