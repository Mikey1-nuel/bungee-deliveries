// src/data/restaurantMeals.ts
import { restaurants } from "./restaurantsEtMeals";
import { cuisineMealMap } from "./restaurantsEtMeals";

export const restaurantMeals = restaurants.flatMap((restaurant, index) => {
  const mealIds = cuisineMealMap[restaurant.cuisine] || [];

  return mealIds.map((mealId, i) => ({
    id: Number(`${restaurant.id}${i}`),
    restaurantId: restaurant.id,
    mealId,
    price: 1500 + (mealId % 5) * 500,
    isAvailable: true,
  }));
});
