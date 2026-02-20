"use client";
import Image from "next/image";
import Link from "next/link";

import { RestaurantWithOrderCount, RestaurantCardProps } from "../types/type";

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <div className="rounded-2xl border p-4 flex flex-col justify-between gap-2 bg-white shadow-sm">
      <div>
        {/* Name */}
        <div className="rounded-2xl relative w-full h-[150px] overflow-hidden bg-gray-50">
          <Image
            src={restaurant.image ?? "/placeholder.png"}
            alt={restaurant.name}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="font-semibold text-[#391713]">{restaurant.name}</h3>

        {/* Cuisine & rating */}
        <p className="text-sm text-gray-500">
          {restaurant.cuisine} • ⭐ {restaurant.rating}
        </p>

        {/* Popularity */}
        <p className="text-sm text-gray-500">
          🔥 Ordered {restaurant.orderCount} times
        </p>
      </div>

      {/* CTA */}
      <Link
        href={`/dashboard/restaurants/${restaurant.id}`}
        className="w-full flex flex-col justify-start items-start w-full"
      >
        <button className="w-full mt-2 border border-[#391713] text-[#391713] rounded-lg py-2 text-sm hover:bg-[#391713] hover:text-white">
          View restaurant
        </button>
      </Link>
    </div>
  );
};

export default RestaurantCard;
