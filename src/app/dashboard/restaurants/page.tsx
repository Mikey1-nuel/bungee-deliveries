import React from "react";
import Image from "next/image";
import Link from "next/link";
import { restaurants } from "@/data/restaurantsEtMeals";

const Restaurants = () => {
  return (
    <main className="w-full bg-white rounded-[30px_30px_0_0] p-[35px_45px] flex flex-col justify-start items-start">
      <h2 className="font-semibold mb-3">All Available Restaurants</h2>
      <div className="grid grid-cols-4 gap-[20px]">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="rounded-2xl bg-white/20 backdrop-blur-[6px] shadow-sm p-3 w-full flex flex-col justify-center items-center h-full"
          >
            <Link
              href={`/dashboard/restaurants/${restaurant.id}`}
              className="h-full w-full flex flex-col justify-start items-start"
            >
              <div className="rounded-2xl relative w-full h-[150px] overflow-hidden bg-gray-50">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h1 className="font-semibold text-[14px] flex justify-center items-center">
                {restaurant.name}
                <span className="text-[10px] bg-[#E95322] px-[1px] h-[15px] rounded-[8px] font-[300] text-white ml-[10px]">
                  {restaurant.rating}⭐
                </span>
              </h1>
              <p className="text-[14px]">ID: {restaurant.id}</p>
              <p className="text-[14px]">Cuisine: {restaurant.cuisine}</p>
              <p className="text-[14px]">Location: {restaurant.location}</p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Restaurants;
