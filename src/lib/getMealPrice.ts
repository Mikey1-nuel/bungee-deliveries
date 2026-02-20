import { restaurantMeals } from "@/data/restaurantMeals";

/**
 * Returns the price of a meal for a given restaurant.
 * If no restaurant is provided, returns the lowest available price.
 */
export function getMealPrice(
  mealId: number,
  restaurantId?: number
): number | null {
  if (restaurantId) {
    const match = restaurantMeals.find(
      rm =>
        rm.mealId === mealId &&
        rm.restaurantId === restaurantId &&
        rm.isAvailable
    );
    return match?.price ?? null;
  }

  // fallback: cheapest price across all restaurants
  const prices = restaurantMeals
    .filter(rm => rm.mealId === mealId && rm.isAvailable)
    .map(rm => rm.price);

  return prices.length ? Math.min(...prices) : null;
}
