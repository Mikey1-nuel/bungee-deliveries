"use client";

import Image from "next/image";

import { GroupedMenu, RestaurantMenu } from "@/app/types/type";

interface Props {
  data: GroupedMenu | RestaurantMenu;

  role?: string;

  onClick?: (
    menu: GroupedMenu | RestaurantMenu,
  ) => void;
}

const MenuCard = ({ data, onClick }: Props) => {
  //
  // CUSTOMER VIEW
  //

  if (data.__typename === "GroupedMenu") {
    return (
      <div
        onClick={() => onClick?.(data)}
        className="
          rounded-2xl
          border
          p-3
          bg-white
          shadow-sm
          cursor-pointer
        "
      >
        <div
          className="
            relative
            w-full
            h-[200px]
            rounded-xl
            overflow-hidden
          "
        >
          <Image
            src={data.image || "/placeholder.png"}
            alt={data.name}
            fill
            className="
              object-cover
            "
          />
        </div>

        <div className="mt-3">
          <h3
            className="
              font-semibold
              text-[#391713]
            "
          >
            {data.name}
          </h3>

          <p
            className="
              text-sm
              text-gray-500
              mt-1
              line-clamp-2
            "
          >
            {data.description}
          </p>

          <p
            className="
              font-semibold
              text-[#FF642F]
              mt-3
            "
          >
            ₦{Number(data.lowest_price).toLocaleString()}
          </p>

          <div
            className="
              mt-2
              text-xs
              text-gray-500
            "
          >
            Available at:
            <span
              className="
                font-medium
                text-[#391713]
                ml-1
              "
            >
              {data.restaurants.map((restaurant) => restaurant.name).join(", ")}
            </span>
          </div>
        </div>
      </div>
    );
  }

  //
  // RESTAURANT VIEW
  //

  return (
    <div
      onClick={() => onClick?.(data)}
      className="
        rounded-2xl
        border
        p-3
        bg-green-100
        border-orange-100
        shadow-sm
        cursor-pointer
        w-full
        h-screen
      "
    >
      <div
        className="
          relative
          w-full
          h-[200px]
          rounded-xl
          overflow-hidden
        "
      >
        <Image
          src={data.menu.image || "/placeholder.png"}
          alt={data.menu.name}
          fill
          className="
            object-cover
          "
        />
      </div>

      <div className="mt-3">
        <h3
          className="
            font-semibold
            text-[#391713]
          "
        >
          {data.menu.name}
        </h3>

        <p
          className="
            text-sm
            text-gray-500
            mt-1
          "
        >
          {data.menu.description}
        </p>

        <p
          className="
            font-semibold
            text-[#FF642F]
            mt-3
          "
        >
          ₦{Number(data.base_price).toLocaleString()}
        </p>

        <div
          className="
            mt-2
            text-xs
            text-gray-500
          "
        >
          Restaurant:
          <span
            className="
              font-medium
              text-[#391713]
              ml-1
            "
          >
            {data.restaurant.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
