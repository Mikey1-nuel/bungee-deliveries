"use client";
import { useState } from "react";
import { meals } from "@/data/restaurantsEtMeals";
import MealCard from "@/app/components/mealCard";
import MealDetailsModal from "@/app/components/mealDetailsModal";
import { Meal } from "@/app/types/type";

export default function MealsPage() {
  const [activeMeal, setActiveMeal] = useState<Meal | null>(null);

  return (
    <>
      <main className="bg-white rounded-[30px_30px_0_0] p-[35px_45px]">
        <h2 className="font-semibold mb-3">All Available Meals</h2>
        <div className="grid grid-cols-4 gap-5">

        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} onClick={setActiveMeal} />
        ))}
        </div>
      </main>

      {activeMeal && (
        <MealDetailsModal
          meal={activeMeal}
          onClose={() => setActiveMeal(null)}
        />
      )}
    </>
  );
}
