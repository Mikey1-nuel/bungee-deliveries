"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { restaurants } from "@/data/restaurantsEtMeals";
import { getMealsForRestaurant } from "@/data/getMealsForRestaurant";
import MealCard from "@/app/components/mealCard";
import MealDetailsModal from "@/app/components/mealDetailsModal";
import { Meal } from "@/app/types/type"; // ✅ FIX 1

const RestaurantPage = () => {
  const { id } = useParams<{ id: string }>();
  const restaurantId = Number(id);

  const [activeMeal, setActiveMeal] = useState<Meal | null>(null);

  const restaurant = restaurants.find(r => r.id === restaurantId);
  const restaurantMeals = getMealsForRestaurant(restaurantId);

  if (!restaurant) {
    return <div className="p-6">Restaurant not found</div>;
  }

  return (
    <>
      <main className="grid grid-cols-4 gap-4 bg-white rounded-[30px_30px_0_0] p-[35px_45px]">
        {restaurantMeals.length === 0 && (
          <p className="col-span-4 text-center text-gray-500">
            No meals available for this restaurant
          </p>
        )}

        {restaurantMeals.map(meal => (
          <MealCard
            key={meal.id}
            meal={meal}
            restaurantId={restaurantId}
            onClick={() => setActiveMeal(meal)} // ✅ opens modal
          />
        ))}
      </main>

      {/* ✅ FIX 3 */}
      {activeMeal && (
        <MealDetailsModal
          meal={activeMeal}
          restaurantId={restaurantId}
          onClose={() => setActiveMeal(null)}
        />
      )}
    </>
  );
};

export default RestaurantPage;
