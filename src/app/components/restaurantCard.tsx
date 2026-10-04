"use client";

import Image from "next/image";

import Link from "next/link";

import {
  RestaurantCardProps,
} from "../types/type";

const RestaurantCard = ({
  restaurant,
}: RestaurantCardProps) => {
  return (
    <div className="rounded-2xl border p-4 flex flex-col justify-between gap-3 bg-white shadow-sm hover:shadow-md transition">

      <div>

        {/* IMAGE */}

        <div className="rounded-2xl relative w-full h-[180px] overflow-hidden bg-gray-50">

          <Image
            src={
              restaurant.image ||
              "/placeholder.png"
            }
            alt={
              restaurant.name
            }
            fill
            className="object-cover"
          />

        </div>

        {/* NAME */}

        <h3 className="font-semibold text-[#391713] mt-3">

          {restaurant.name}

        </h3>

        {/* LOCATION */}

        {restaurant.location && (
          <p className="text-sm text-gray-500 mt-1">

            📍{" "}
            {
              restaurant.location
            }

          </p>
        )}

        {/* RATING */}

        {restaurant.rating !==
          undefined && (
          <p className="text-sm text-gray-500 mt-1">

            ⭐ {restaurant.rating}

          </p>
        )}

      </div>

      {/* CTA */}

      <Link
        href={`/dashboard/restaurants/${restaurant.id}`}
        className="w-full"
      >

        <button className="w-full mt-2 border border-[#391713] text-[#391713] rounded-lg py-2 text-sm hover:bg-[#391713] hover:text-white transition">

          View Restaurant

        </button>

      </Link>
    </div>
  );
};

export default RestaurantCard;
