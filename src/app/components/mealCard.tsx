"use client";
import Image from "next/image";
import { getMealPrice } from "@/lib/getMealPrice";
import { MealCardProps } from "@/app/types/type";

const MealCard = ({ meal, restaurantId, onClick }: MealCardProps) => {
  const price =
    restaurantId !== undefined
      ? getMealPrice(meal.id, restaurantId)
      : meal.price ?? null;

  return (
    <div
      onClick={() => onClick?.(meal)}
      className="rounded-2xl border p-3 bg-white shadow-sm cursor-pointer hover:shadow-md transition"
    >
      <div className="relative w-full h-[200px] bg-gray-50 rounded-xl overflow-hidden">
        <Image
          src={meal.image ?? "/placeholder.png"}
          alt={meal.name}
          width={300}
          height={300}
          className="object-contain w-full"
        />
      </div>

      <h3 className="mt-2 font-semibold text-[#391713]">
        {meal.name}
      </h3>

      {price !== null && (
        <p className="text-sm font-medium text-[#391713]">
          ₦{price.toLocaleString()}
        </p>
      )}

      {meal.orderCount !== undefined && (
        <p className="text-xs text-gray-500">
          🔥 Ordered {meal.orderCount} times
        </p>
      )}
    </div>
  );
};

export default MealCard;
