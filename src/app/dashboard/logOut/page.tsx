"use client";

import Image from "next/image";

import { MenuResult } from "@/app/types/type";

interface Props {
  menu: MenuResult;

  onClose: () => void;
}

const MenuDetailsModal = ({ menu, onClose }: Props) => {
  const isGrouped = menu.__typename === "GroupedMenu";

  return (
    // <div
    //   className="
    //     fixed
    //     inset-0
    //     bg-black/50
    //     flex
    //     items-center
    //     justify-center
    //     z-50
    //   "
    // >
    //   <div
    //     className="
    //       bg-white
    //       rounded-2xl
    //       p-6
    //       w-[500px]
    //     "
    //   >
    //     <button
    //       onClick={onClose}
    //       className="
    //         float-right
    //         text-red-500
    //       "
    //     >
    //       Close
    //     </button>

    //     <div
    //       className="
    //         relative
    //         w-full
    //         h-[250px]
    //         rounded-xl
    //         overflow-hidden
    //         mt-5
    //       "
    //     >
    //       <Image
    //         src={
    //           isGrouped
    //             ? menu.image || "/placeholder.png"
    //             : menu.menu.image || "/placeholder.png"
    //         }
    //         alt={isGrouped ? menu.name : menu.menu.name}
    //         fill
    //         className="
    //           object-cover
    //         "
    //       />
    //     </div>

    //     <h2
    //       className="
    //         text-2xl
    //         font-bold
    //         mt-4
    //       "
    //     >
    //       {isGrouped ? menu.name : menu.menu.name}
    //     </h2>

    //     <p className="mt-3">
    //       {isGrouped ? menu.description : menu.menu.description}
    //     </p>

    //     <p
    //       className="
    //         mt-4
    //         font-semibold
    //         text-[#FF642F]
    //       "
    //     >
    //       ₦
    //       {isGrouped
    //         ? Number(menu.lowest_price).toLocaleString()
    //         : Number(menu.base_price).toLocaleString()}
    //     </p>
    //   </div>
    // </div>

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.6)] backdrop-blur">
      <div className="bg-white rounded-2xl w-full max-w-[800px] p-5 relative grid grid-cols-[1.5fr_2fr] gap-[10px]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500"
        >
          ✕
        </button>

        {/* LEFT */}

        <div>
          <div className="relative w-[300px] h-[300px] mb-4 overflow-hidden rounded-2xl">
            <Image
              src={
                isGrouped
                  ? menu.image || "/placeholder.png"
                  : menu.menu.image || "/placeholder.png"
              }
              alt={isGrouped ? menu.name : menu.menu.name}
              fill
              className="
              object-cover
            "
            />
          </div>

          <h2 className="text-xl font-semibold">
            {isGrouped ? menu.name : menu.menu.name}
          </h2>

          <select
            className="border rounded-lg p-2 w-full mt-4"
            value={selectedRestaurantId || ""}
            onChange={(e) => setSelectedRestaurantId(e.target.value)}
          >
            <option value="">Select a restaurant</option>

            {availableRestaurantMenus.map((rm) => (
              <option key={rm.id} value={rm.restaurant.id}>
                {rm.restaurant.name} — ₦{Number(rm.base_price).toLocaleString()}
              </option>
            ))}
          </select>

          {selectedRestaurant && (
            <div className="mt-4 text-sm text-gray-600">
              <p>📍 {selectedRestaurant.location}</p>
            </div>
          )}
        </div>

        {/* RIGHT */}

        <div className="relative h-full">
          <p className="text-[14px] text-gray-700">
            {isGrouped ? menu.description : menu.menu.description}
          </p>

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
              Order • ₦
              {isGrouped
                ? Number(menu.lowest_price).toLocaleString()
                : Number(menu.base_price).toLocaleString()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetailsModal;





"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import toast from "react-hot-toast";

import { useCart } from "./cartContext";

import {
  Menu,
  RestaurantMenu,
  GetRestaurantMenusByMenuResponse,
} from "@/app/types/type";

import { GET_MENU_RESTAURANTS } from "@/graphql/queries/restaurant.queries";

interface Props {
  restaurantMenu: RestaurantMenu;

  onClose: () => void;
}

const MenuDetailsModal = ({
  menu,
  restaurantId,
  onClose,
}: Props) => {
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);

  const {
    data,
    loading,
    error,
  } = useQuery<GetRestaurantMenusByMenuResponse>(
    GET_MENU_RESTAURANTS,
    {
      variables: {
        menuId: menu.id,
      },
    }
  );

  const availableRestaurantMenus =
    data?.getRestaurantMenusByMenu?.filter(
      (rm) => rm.is_available
    ) || [];

  const [selectedRestaurantId, setSelectedRestaurantId] =
    useState<string | undefined>(restaurantId);

  const selectedRestaurantMenu = useMemo(() => {
    return availableRestaurantMenus.find(
      (rm) =>
        rm.restaurant.id === selectedRestaurantId
    );
  }, [
    availableRestaurantMenus,
    selectedRestaurantId,
  ]);

  const selectedRestaurant =
    selectedRestaurantMenu?.restaurant;

  const basePrice =
    selectedRestaurantMenu?.base_price || 0;

  const totalPrice = basePrice * quantity;

  const handleOrder = () => {
    if (!selectedRestaurantMenu) {
      toast.error(
        "Please select a restaurant"
      );

      return;
    }

    addItem({
      id: selectedRestaurantMenu.id,

      restaurantMenuId:
        selectedRestaurantMenu.id,

      menuId: menu.id,

      menuName: menu.name,

      restaurantId:
        selectedRestaurant.id,

      restaurantName:
        selectedRestaurant.name,

      quantity,

      basePrice,

      totalPrice,

      image: menu.image,
    });

    toast.success("Added to cart ✅");

    onClose();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white p-5 rounded-xl">
          Loading menu details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white p-5 rounded-xl">
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.6)] backdrop-blur">
      <div className="bg-white rounded-2xl w-full max-w-[800px] p-5 relative grid grid-cols-[1.5fr_2fr] gap-[10px]">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500"
        >
          ✕
        </button>

        {/* LEFT */}

        <div>
          <div className="relative w-[300px] h-[300px] mb-4 overflow-hidden rounded-2xl">
            <Image
              src={
                menu.image ||
                "/placeholder.png"
              }
              alt={menu.name}
              fill
              className="object-cover rounded-2xl"
            />
          </div>

          <h2 className="text-xl font-semibold">
            {menu.name}
          </h2>

          <select
            className="border rounded-lg p-2 w-full mt-4"
            value={
              selectedRestaurantId || ""
            }
            onChange={(e) =>
              setSelectedRestaurantId(
                e.target.value
              )
            }
          >
            <option value="">
              Select a restaurant
            </option>

            {availableRestaurantMenus.map(
              (rm) => (
                <option
                  key={rm.id}
                  value={rm.restaurant.id}
                >
                  {rm.restaurant.name} —
                  ₦
                  {Number(
                    rm.base_price
                  ).toLocaleString()}
                </option>
              )
            )}
          </select>

          {selectedRestaurant && (
            <div className="mt-4 text-sm text-gray-600">
              <p>
                📍{" "}
                {
                  selectedRestaurant.location
                }
              </p>
            </div>
          )}
        </div>

        {/* RIGHT */}

        <div className="relative h-full">
          <p className="text-[14px] text-gray-700">
            {menu.description}
          </p>

          <div className="absolute bottom-0 left-0 w-full">

            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={() =>
                  setQuantity((q) =>
                    Math.max(1, q - 1)
                  )
                }
                className="w-8 h-8 rounded-full border"
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity((q) => q + 1)
                }
                className="w-8 h-8 rounded-full border"
              >
                +
              </button>
            </div>

            <button
              onClick={handleOrder}
              className="w-full mt-5 bg-[#391713] text-white py-3 rounded-lg"
            >
              Order • ₦
              {totalPrice.toLocaleString()}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetailsModal;

