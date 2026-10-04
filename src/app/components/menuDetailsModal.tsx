"use client";

import Image from "next/image";

import { useMemo, useState } from "react";

import { useQuery } from "@apollo/client/react";

import toast from "react-hot-toast";

import { useCart } from "./cartContext";

import {
  MenuResult,
  RestaurantMenu,
  GetRestaurantMenusByMenuResponse,
} from "@/app/types/type";

import { GET_MENU_RESTAURANTS } from "@/graphql/queries/restaurant.queries";

interface Props {
  menu: MenuResult;
  onClose: () => void;
}

export default function MenuDetailsModal({ menu, onClose }: Props) {
  const { addItem } = useCart();

  const isGrouped = menu.__typename === "GroupedMenu";

  //
  // NORMALIZED VALUES
  //

  const menuSlug = isGrouped ? menu.slug : menu.menu.name;

  const menuName = isGrouped ? menu.name : menu.menu.name;

  const menuDescription = isGrouped ? menu.description : menu.menu.description;

  const menuImage = isGrouped ? menu.image : menu.menu.image;

  //
  // FETCH RESTAURANTS OFFERING MENU
  //

  const { data, loading, error } = useQuery<GetRestaurantMenusByMenuResponse>(
    GET_MENU_RESTAURANTS,
    {
      skip: !isGrouped,

      variables: {
        slug: menuSlug,
      },
    },
  );

  const availableRestaurantMenus =
    data?.getRestaurantMenusBySlug?.filter((rm) => rm.is_available) || [];

  //
  // STATE
  //

  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");

  const [quantity, setQuantity] = useState(1);

  //
  // SELECTED RESTAURANT MENU
  //

  const selectedRestaurantMenu: RestaurantMenu | undefined = useMemo(() => {
    //
    // OWNER VIEW
    //

    if (!isGrouped) {
      return menu as RestaurantMenu;
    }

    //
    // CUSTOMER VIEW
    //

    return availableRestaurantMenus.find(
      (rm) => rm.restaurant.id === selectedRestaurantId,
    );
  }, [isGrouped, menu, availableRestaurantMenus, selectedRestaurantId]);

  const selectedRestaurant = selectedRestaurantMenu?.restaurant;

  const basePrice = Number(selectedRestaurantMenu?.base_price || 0);

  const totalPrice = basePrice * quantity;

  //
  // ORDER
  //

  const handleOrder = () => {
    if (!selectedRestaurantMenu || !selectedRestaurant) {
      toast.error("Please select a restaurant");

      return;
    }

    // UPDATED addItem() LOGIC

    addItem({
      id: crypto.randomUUID(),

      restaurant_menu_id: selectedRestaurantMenu.id,

      restaurant_id: selectedRestaurant.id,

      restaurant_name: selectedRestaurant.name,

      menu_name: selectedRestaurantMenu.menu.name,

      menu_type: selectedRestaurantMenu.menu.type,

      menu_image: selectedRestaurantMenu.menu.image,

      unit_price: basePrice,

      quantity,

      total_price: basePrice * quantity,
    });

    toast.success("Added to cart ✅");

    onClose();
  };

  //
  // LOADING
  //

  if (loading && isGrouped) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white p-5 rounded-xl">Loading menu details...</div>
      </div>
    );
  }

  //
  // ERROR
  //

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white p-5 rounded-xl">{error.message}</div>
      </div>
    );
  }

  //
  // UI
  //

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.6)] backdrop-blur">
      <div className="bg-white rounded-2xl w-full max-w-[800px] p-5 relative grid grid-cols-[1.5fr_2fr] gap-[10px]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500"
        >
          ✕
        </button>

        <div>
          <div className="relative w-[300px] h-[300px] mb-4 overflow-hidden rounded-2xl">
            <Image
              src={menuImage || "/placeholder.png"}
              alt={menuName}
              fill
              className="object-cover rounded-2xl"
            />
          </div>

          <h2 className="text-xl font-semibold">{menuName}</h2>

          {isGrouped && (
            <select
              className="border rounded-lg p-2 w-full mt-4"
              value={selectedRestaurantId}
              onChange={(e) => setSelectedRestaurantId(e.target.value)}
            >
              <option value="">Select a restaurant</option>

              {availableRestaurantMenus.map((rm) => (
                <option key={rm.id} value={rm.restaurant.id}>
                  {rm.restaurant.name}
                  {" — "}₦{Number(rm.base_price).toLocaleString()}
                </option>
              ))}
            </select>
          )}

          {selectedRestaurant && (
            <div className="mt-4 text-sm text-gray-600">
              <p>📍 {selectedRestaurant.location}</p>
            </div>
          )}
        </div>

        <div className="relative h-full">
          <p className="text-[14px] text-gray-700">{menuDescription}</p>

          <div className="absolute bottom-0 left-0 w-full">
            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full border"
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-full border"
              >
                +
              </button>
            </div>

            <button
              onClick={handleOrder}
              className="w-full mt-5 bg-[#391713] text-white py-3 rounded-lg"
            >
              Order • ₦{totalPrice.toLocaleString()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
