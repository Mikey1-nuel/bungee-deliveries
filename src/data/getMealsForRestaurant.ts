// src/lib/getMealsForRestaurant.ts
import { meals, restaurants, cuisineMealMap } from "./restaurantsEtMeals";
import { Meal, MealWithPrice } from "@/app/types/type";
import { restaurantMeals } from "@/data/restaurantMeals";

export function getMealsForRestaurant(
  restaurantId: number
): MealWithPrice[] {

  console.log(
    "Restaurant:",
    restaurants.find(r => r.id === restaurantId)
  );

  console.log(
    "Cuisine meals:",
    cuisineMealMap[
      restaurants.find(r => r.id === restaurantId)?.cuisine ?? ""
    ]
  );

  return restaurantMeals
    .filter(
      rm =>
        rm.restaurantId === restaurantId &&
        rm.isAvailable &&
        meals.some(m => m.id === rm.mealId)
    )
    .map(rm => {
      const meal = meals.find(m => m.id === rm.mealId)!;

      return {
        ...meal,
        price: rm.price,
      };
    });
}
