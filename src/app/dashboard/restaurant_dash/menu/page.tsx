"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_RESTAURANT_MENUS } from "@/graphql/queries/menu.queries";
import { GetRestaurantMenusResponse, RestaurantMenu } from "@/app/types/type";
import Image from "next/image";
import CreateMenuModal from "@/app/components/createMenuForm";

export default function RestaurantMenuPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const { data, loading, refetch } =
    useQuery<GetRestaurantMenusResponse>(GET_RESTAURANT_MENUS);

  const menus = (data?.getRestaurantMenus ?? []).filter(
    (item): item is RestaurantMenu => item.__typename === "RestaurantMenu",
  );

  return (
    <main className="bg-white rounded-t-3xl p-8 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#391713]">Menu</h1>
          <p className="text-gray-500">Manage your restaurant menu items</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#E95322] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#d14a1e] transition"
        >
          + Add Item
        </button>
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-400">Loading menu...</div>
      ) : menus.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">🍽️</p>
          <p className="font-medium">No menu items yet</p>
          <p className="text-sm">Click "+ Add Item" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {menus.map((item) => (
            <div
              key={item.id}
              className="border border-orange-100 rounded-2xl overflow-hidden bg-[#FFF9F7]"
            >
              <div className="relative w-full h-48 bg-gray-100">
                <Image
                  src={item.menu?.image || "/placeholder.png"}
                  alt={item.menu?.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-[#391713]">
                      {item.menu?.name}
                    </h3>
                    <p className="text-xs text-gray-400 capitalize mt-0.5">
                      {item.menu?.type}
                    </p>
                  </div>
                  <p className="font-bold text-[#E95322]">
                    ₦{Number(item.base_price).toLocaleString()}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      item.is_available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.is_available ? "Available" : "Unavailable"}
                  </span>
                  <button className="text-xs text-[#E95322] hover:underline font-medium">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateMenuModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          setModalOpen(false);
          refetch();
        }}
      />
    </main>
  );
}
