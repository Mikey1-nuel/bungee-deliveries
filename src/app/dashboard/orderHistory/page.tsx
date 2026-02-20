"use client";
import { useState } from "react";
import Image from "next/image";

interface OrderItem {
  id: number;
  mealName: string;
  restaurantName: string;
  image?: string;
  quantity: number;
  price: number;
  timestamp: string;
  status: "active" | "completed" | "cancelled";
}

export default function OrderHistoryPage() {
  const [activeTab, setActiveTab] = useState<
    "active" | "completed" | "cancelled"
  >("active");

  // Example data (replace with real orders from backend)
  const orders: OrderItem[] = [
    {
      id: 1,
      mealName: "Jollof Rice",
      restaurantName: "Ntachi-Osa",
      image: "/Screenshot (283).png",
      quantity: 2,
      price: 2500,
      timestamp: "2026-02-13 12:30 PM",
      status: "active",
    },
    {
      id: 2,
      mealName: "Jollof Rice",
      restaurantName: "Ntachi-Osa",
      image: "/Screenshot (283).png",
      quantity: 2,
      price: 2500,
      timestamp: "2026-02-13 12:30 PM",
      status: "completed",
    },
    {
      id: 3,
      mealName: "Jollof Rice",
      restaurantName: "Ntachi-Osa",
      image: "/Screenshot (283).png",
      quantity: 2,
      price: 2500,
      timestamp: "2026-02-13 12:30 PM",
      status: "cancelled",
    },
    {
      id: 4,
      mealName: "Pizza Margherita",
      restaurantName: "Foodopolis Enugu",
      image: "/Screenshot (294).png",
      quantity: 1,
      price: 4000,
      timestamp: "2026-02-12 7:00 PM",
      status: "active",
    },
    {
      id: 5,
      mealName: "Pizza Margherita",
      restaurantName: "Foodopolis Enugu",
      image: "/Screenshot (294).png",
      quantity: 1,
      price: 4000,
      timestamp: "2026-02-12 7:00 PM",
      status: "completed",
    },
    {
      id: 6,
      mealName: "Pizza Margherita",
      restaurantName: "Foodopolis Enugu",
      image: "/Screenshot (294).png",
      quantity: 1,
      price: 4000,
      timestamp: "2026-02-12 7:00 PM",
      status: "cancelled",
    },
    {
      id: 7,
      mealName: "Beans & Plantain",
      restaurantName: "OceanEventsNG",
      image: "/Screenshot (288).png",
      quantity: 1,
      price: 2000,
      timestamp: "2026-02-10 2:00 PM",
      status: "active",
    },
    {
      id: 8,
      mealName: "Beans & Plantain",
      restaurantName: "OceanEventsNG",
      image: "/Screenshot (288).png",
      quantity: 1,
      price: 2000,
      timestamp: "2026-02-10 2:00 PM",
      status: "completed",
    },
    {
      id: 9,
      mealName: "Beans & Plantain",
      restaurantName: "OceanEventsNG",
      image: "/Screenshot (288).png",
      quantity: 1,
      price: 2000,
      timestamp: "2026-02-10 2:00 PM",
      status: "cancelled",
    },
  ];

  const filteredOrders = orders.filter((order) => order.status === activeTab);

  return (
    <div className="bg-white rounded-[30px_30px_0_0] p-[35px_45px] flex flex-col gap-[20px] h-screen">
      <h2 className="text-2xl font-semibold text-[#391713]">Order History</h2>

      {/* Toggle buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-1 rounded-[20px] font-[500] ${activeTab === "active" ? "bg-[#E95322] text-white" : "bg-[#FFDECF] text-[#E95322]"}`}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-1 rounded-[20px] font-[500] ${activeTab === "completed" ? "bg-[#E95322] text-white" : "bg-[#FFDECF] text-[#E95322]"}`}
        >
          Completed
        </button>
        <button
          onClick={() => setActiveTab("cancelled")}
          className={`px-4 py-1 rounded-[20px] font-[500] ${activeTab === "cancelled" ? "bg-[#E95322] text-white" : "bg-[#FFDECF] text-[#E95322]"}`}
        >
          Cancelled
        </button>
      </div>

      {/* Orders list */}
      <div className="w-full">
        {filteredOrders.length === 0 ? (
          <p className="text-gray-500">No {activeTab} orders</p>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-start border-b border-orange-100 rounded-lg p-4 mb-2"
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                  <Image
                    src={order.image ?? "/placeholder.png"}
                    alt={order.mealName}
                    fill
                    className="object-contain rounded-[10px]"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{order.mealName}</h3>
                  <p className="text-xs text-gray-500">
                    {order.restaurantName}
                  </p>
                  <p className="text-sm font-medium">Qty: {order.quantity}</p>
                  <p className="text-xs text-gray-400">{order.timestamp}</p>
                </div>
              </div>

              <div className="flex flex-col items-end h-full">
                <p className="font-semibold text-[#E95322]">
                  ₦{order.price.toLocaleString()}
                </p>

                {/* Actions based on status */}
                {order.status === "active" && (
                  <div className="flex gap-2 mt-2">
                    <button className="bg-[#E95322] text-white px-3 py-1 rounded-[20px] text-sm">
                      Cancel Order
                    </button>
                    <button className="bg-[#FFDECF] text-[#E95322] px-3 py-1 rounded-[20px] text-sm">
                      Track Driver
                    </button>
                  </div>
                )}

                {order.status === "completed" && (
                  <div className="flex flex-col items-end gap-2 mt-2">
                    <span className="text-[#E95322] text-sm flex justify-center items-center gap-[5px]">
                      <Image
                        src="/check (5).png"
                        alt="Delete Icon"
                        width={15}
                        height={15}
                      />
                      Order Delivered
                    </span>
                    <div className="flex gap-[10px] font-[500]">
                      <button className="bg-[#E95322] text-white px-3 py-1 rounded-[20px] text-sm">
                        Leave a Review
                      </button>
                      <button className="bg-[#FFDECF] text-[#E95322] px-3 py-1 rounded-[20px] text-sm">
                        Order Again
                      </button>
                    </div>
                  </div>
                )}

                {order.status === "cancelled" && (
                  <span className="text-red-500 text-sm mt-2">
                    Order Cancelled
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
